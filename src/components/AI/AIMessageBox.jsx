import React, { useState, useRef, useEffect } from "react";
import { createAiCard } from "../../api/board";
import { MentionsInput, Mention } from "react-mentions";
import classNames from "../../components/Chat/mention.module.css";
import { FaRegCirclePlay } from "react-icons/fa6";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { AddAiMessage, getAllAiMessages } from "../../store/slice/ai";
import moment from "moment";
import parseInputString from "../../util/parseInputString";
import { get_mentionable_users } from "../../api/message";

const today = new Date();
const options = {
  weekday: "long",
  year: "numeric",
  month: "long",
  day: "numeric",
};
const formattedDate = `Today’s Date - ${today.toLocaleDateString(
  "en-GB",
  options
)}`;

// Function to generate project details
function generateProjectDetails(project, users) {
  let projectInfo = `Project Name: ${project.name}\n`;
  projectInfo += `Project Stack: ${project.description}\n`;
  projectInfo += "Team -\n";

  users.forEach((user, index) => {
    projectInfo += `${index + 1}. ${user.fullName} - ${user.role}\n`;
  });

  return projectInfo;
}

const AIMessageBox = ({
  selectedSpace,
  members,
  listId,
  reload,
  setReload,
}) => {
  const dispatch = useDispatch();
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const inputRef = useRef();
  const messagesEndRef = useRef(null); // Reference to the last message element

  const [tasks, setTasks] = useState([]); // State to store tasks
  const [loading, setLoading] = useState(false);
  const projectInfo = generateProjectDetails(selectedSpace, members);
  const [currentTime, setCurrentTime] = useState("");
  const { AiMessages } = useSelector((state) => state.AiMessageList);
  const [msgReload, setMagReload] = useState(false);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const updateTime = () => {
      const date = new Date(); // Get the current date and time
      let hours = date.getHours();
      const minutes = date.getMinutes();
      let period = "am";

      // Convert hours to 12-hour format and determine period (am/pm)
      if (hours >= 12) {
        period = "pm";
        hours = hours === 12 ? 12 : hours - 12;
      }

      // Ensure hours and minutes are always two digits
      const formattedHours = String(hours).padStart(2, "0");
      const formattedMinutes = String(minutes).padStart(2, "0");

      setCurrentTime(`${formattedHours}.${formattedMinutes} ${period}`);
    };

    // Update the time every minute
    const intervalId = setInterval(updateTime, 60000);

    // Call updateTime immediately to set the initial time
    updateTime();

    // Clear the interval on component unmount
    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    dispatch(getAllAiMessages({ spaceId: selectedSpace?._id }));
  }, [dispatch, selectedSpace?._id, msgReload]);


 
  // load user
  useEffect(() => {
    if (Boolean(selectedSpace?._id)) {
      const loadUsers = async () => {
        try {
          const { data } = await get_mentionable_users(selectedSpace?._id);

          const arr = data?.users?.map((user) => ({
            id: user._id,
            display: user.fullName,
          }));

          setUsers(arr);
        } catch (error) {
          console.log(error);
        }
      };

      loadUsers();
    }
  }, [selectedSpace?._id]);

  // Update input state with mentioned users' names only if mentions exist

  const handleInputChange = (e, newValue, newPlainTextValue, mentions) => {
    let updatedInput = newPlainTextValue;

    // Filter out duplicate mentions
    const uniqueMentions = [];
    const uniquePlainTextValue = newPlainTextValue.replace(
      /\{\{([^{}]+?)\}\}/g,
      (match, mention) => {
        if (!uniqueMentions.includes(mention)) {
          uniqueMentions.push(mention);
          return match;
        }
        return "";
      }
    );

    setInput(uniquePlainTextValue);
  };

  // submit message and call ai
  const sendMessage = async () => {
    setLoading(true);
    if (input === "") {
      return;
    }
    const userInput = `${input}`;
    const userMessage = `${formattedDate} ${input}`;

    setInput("");
    setMessages([
      ...messages,
      { text: userMessage, sender: "user", time: currentTime },
    ]);
    try {
      const response = await axios.post(
        "https://api.openai.com/v1/chat/completions",
        {
          model: "gpt-3.5-turbo",
          stream: false,
          messages: [
            {
              role: "system",
              content: ` You are an AI task manager.
              ${projectInfo}
              I will give you a list of task and todays date.
              I will provide the people working on the project with their name and roles.
              You will add a title and solutions/description (Based on the task) to each task, and provide a list of people who will assign to that task.
              If testing needed for that task assigned the tester from the team.
              You will provide Estimated the time needed to complete task task.
              You will provide task calendar as -
              Start Date - Today’s Date
              End Date - Based on the complexity of that task.
              If needed break the task into subtask and provide the subtask list
              Solutions/description (Based on the task)  should be straight forward and short. You will describe the work to the team.
              You can assign multiple person to a task if needed.
              Please make sure to use easy to understand and simple english.
              Provide all the responses on template. Here’s a guide.
              
              <Title>Short</Title>
              <Description> Description/Solution</Description>
              <Checklist>
                <SubTask>Sub task 1</SubTask>
                <SubTask>Sub task 2</SubTask>
                <SubTask>Sub task 3</SubTask>
              </Checklist>
              <Assignes>
                <Assigne>Assigne 1</Assigne>
                <Assigne>Assigne 2</Assigne>
              </Assignes>
              <Time>Estimated Time In hours</Time>
              <Calendar>
                <Start>Start Date</Start>
                <End>End Date</End>
              </Calendar>
              `,
            },
            {
              role: "user",
              content: userMessage,
            },
          ],
        },
        {
          headers: {
            Authorization: `Bearer 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`,
            "Content-Type": "application/json",
            // 'OpenAI-Beta': 'assistants=v1'
          },
        }
      );

      const gptResponse = response.data.choices[0].message.content;

      const updateData = parseInputString(gptResponse);
      setTasks(updateData);

      // Changes start here
      const taskPromises = updateData.map((task) => {
        const assigneeIds = task?.assignees.map((assigneeName) => {
          const member = members?.find(
            (member) => member?.fullName === assigneeName
          );
          return member?._id;
        });

        const taskData = {
          name: task.title,
          description: task.description,
          startDate: task.calendar.start,
          endDate: task.calendar.end,
          assignUser: members ? assigneeIds : [""],
          checkList: task.checklist.subTasks,
          estimatedTime: task.time,
        };
        return dispatch(
          createAiCard({
            spaceId: selectedSpace?._id,
            listId: listId?._id,
            data: taskData,
          })
        );
      });

      Promise.all(taskPromises)
        .then((responses) => {
          const successes = [];
          const failures = [];
          const successMessages = [];
          const failedMessage = [];

          // Separate successful and failed responses
          responses.forEach((response, index) => {
            if (response?.meta?.requestStatus === "fulfilled") {
              successMessages.push({
                aiResponse: JSON.stringify(updateData[index]),
                message: updateData[index].title,
              });

              successes.push(updateData[index].title); // Push only the title of successful tasks
            } else {
              failedMessage.push({
                aiResponse: JSON.stringify(updateData[index]),
                message: updateData[index].title,
              }); // Push only the title of failed tasks
            }
          });

          if (
            successMessages.length > 0 ||
            failedMessage.length > 0 ||
            (failedMessage.length > 0 && failedMessage.length > 0)
          ) {
            const data = {
              message: userInput,
              successMessage: successMessages,
              failedMessage: failedMessage,
            };

            dispatch(AddAiMessage({ spaceId: selectedSpace?._id, data: data }))
              .then((r) => {
                if (r) {
                  setMagReload(!msgReload);
                }
              })
              .catch((error) => {
                console.error("Error dispatching AddAiMessage:", error);
              });
          } else {
            // Handle if both successMessages and failedMessages are empty
            setLoading(false);
            setReload(!reload);
          }
          const successMessage =
            successes.length > 0
              ? "SuccessfulTasks:\n" +
                successes.map((success) => `• ${success.title}`).join("\n")
              : "";
          const failureMessage =
            failures.length > 0
              ? "FailedTasks:\n" +
                failures.map((failure) => `• ${failure.title}`).join("\n")
              : "";

          // Combine success and failure messages
          const gptResponseWithStatus = `${gptResponse}\n\n${successMessage}\n${failureMessage}`;

          // Add success and failure messages to messages state
          setMessages((prevMessages) => [
            ...prevMessages,
            {
              text: gptResponseWithStatus,
              sender: "gpt",
              success: successes,
              failure: failures,
            },
          ]);

          setLoading(false);
          setReload(!reload);
        })
        .catch((error) => {
          setLoading(false);
          setReload(!reload);
        });
      // Changes end here
    } catch (error) {
      console.log(error);
      setLoading(false);
      setReload(!reload);
    }
    setReload(!reload);
  };
  const groupedMessages = AiMessages?.reduce((acc, message) => {
    const date = moment(message.createdAt).format("YYYY-MM-DD");
    if (!acc[date]) {
      acc[date] = [];
    }
    acc[date].push(message);
    return acc;
  }, {});

  // Sort dates in descending order
  const sortedDates = Object.keys(groupedMessages)?.sort(
    (a, b) => moment(b) - moment(a)
  );
  useEffect(() => {
    scrollToBottom();
  }, [groupedMessages]);

  // Scroll to bottom of the messages container
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <div
        style={{
          height: "97%",
        }}
        className={`border w-full  border-[#ECECEC] pb-3 rounded-lg custom-shadow   flex flex-col bg-[#F5F5F5]`}
      >
        <div
          style={{
            height: messages?.length ? "900px" : "900px",
          }}
          className="overflow-y-auto"
        >
          {sortedDates?.map((date) => (
            <div key={date}>
              <div className="text-center flex justify-center mx-auto w-20  rounded-[10px] text-[#818892] bg-white my-2 p-1">
                <p className="">
                  {moment(date).calendar(null, {
                    sameDay: "[Today]",
                    nextDay: "[Tomorrow]",
                    lastDay: "[Yesterday]",
                    lastWeek: "[Last] dddd",
                    sameElse: "DD/MM/YYYY",
                  })}
                </p>
              </div>
              {groupedMessages[date]?.reverse()?.map((dt, index) => {
                const lines = dt?.message
                  ?.split("\n")
                  .filter((line) => line.trim() !== "");
                return (
                  //  ref={index === 0 ? messagesEndRef : null}
                  <div key={index}      
                  >
                    <div className="bg-white px-4 text-[#818892] py-2 ml-auto m-2 w-[300px] justify-start rounded-lg">
                      <div>
                        <ul>
                          {lines?.map((line, i) => (
                            <li key={i}>{line}</li>
                          ))}
                        </ul>
                      </div>
                      <span className="flex justify-end">
                        {" "}
                        {moment(dt?.createdAt).format("LT")}
                      </span>
                    </div>

                    {/* Render success list */}

                    <>
                      <>
                        {dt?.successMessage?.length > 0 && (
                          <div className="bg-[#54CC7C] px-4 text-white py-2 m-2 w-[300px] mr-auto justify-end rounded-lg">
                            <div>Successfully Created Card List:</div>

                            {dt?.successMessage?.map((success, i) => (
                              <>
                                <div key={i}>
                                  {i + 1}. {success.message}
                                </div>
                              </>
                            ))}
                          </div>
                        )}
                      </>
                    </>
                    <>
                      <>
                        {dt?.failedMessage?.length > 0 && (
                          <>
                            <div className="bg-[#ef4444] px-4 text-white py-2 m-2 mr-auto w-[300px] justify-end rounded-lg">
                              <div>UnSuccessful Created Card List:</div>

                              {dt?.failedMessage?.map((fail, i) => (
                                <div key={i}>
                                  {i + 1}. {fail.message}
                                </div>
                              ))}
                            </div>
                          </>
                        )}
                      </>
                    </>
                  </div>
                );
              })}
            </div>
          ))}
        </div>
        <div className="px-3 mt-[10px] relative text-gray-300 flex flex-col  w-full">
          <div className="w-full h-full flex  justify-center align-middle">
            <div className="w-full flex items-stretch justify-between relative font-inter  bg-white rounded-t-[20px] px-3">
              <MentionsInput
                value={input}
                placeholder="Write message"
                onChange={handleInputChange} // Update input on change including mentions
                classNames={classNames}
                customSuggestionsContainer={(children) => (
                  <div className="bg-white font-inter absolute bottom-1 min-w-[300px] shadow-sm rounded-lg">
                    {children}
                  </div>
                )}
                inputRef={inputRef}
                autoFocus
              >
                <Mention
                  className={classNames.mentions__mention}
                  trigger="@"
                  data={users}
                  markup="{{__id__}}"
                  renderSuggestion={(entry) => {
                    return (
                      <h1
                        className={
                          "bg-white text-sm px-5 py-2 hover:bg-blue-500 hover:text-white border-[0.2px] border-gray-300"
                        }
                      >
                        {entry.display}
                      </h1>
                    );
                  }}
                  displayTransform={(id) =>
                    users.find((user) => user.id === id).display
                  }
                />
              </MentionsInput>
            </div>
          </div>
          <div className="flex justify-end bg-white rounded-b-[20px] px-2 py-2">
            {loading ? (
              <button
                onClick={sendMessage}
                className="bg-[#6576ff] rounded-[10px] text-white py-1 px-4 flex items-center gap-2"
              >
                <div role="status">
                  <svg
                    aria-hidden="true"
                    class="inline w-4 h-4 text-gray-200 animate-spin dark:text-white fill-[#ef4444]"
                    viewBox="0 0 100 101"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                      fill="currentColor"
                    />
                    <path
                      d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                      fill="currentFill"
                    />
                  </svg>
                  <span class="sr-only">Loading...</span>
                </div>
                Creating Task
              </button>
            ) : (
              <button
                onClick={sendMessage}
                className="bg-[#6576ff] rounded-[10px] text-white py-1 px-4 flex items-center gap-2"
              >
                <FaRegCirclePlay />
                Run
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default AIMessageBox;
