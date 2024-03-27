import { useState, useRef } from "react";
import { createAiCard } from "../../api/board";
import { useSelector } from "react-redux";
import { MentionsInput, Mention } from "react-mentions";
import classNames from "../../components/Chat/mention.module.css";
import { FaRegCirclePlay } from "react-icons/fa6";
import axios from "axios";
import { useDispatch } from "react-redux";
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

console.log(formattedDate);
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

function parseInputString(inputString) {
  // Regular expressions to match desired patterns
  const titleRegex = /<Title>(.*?)<\/Title>/g;
  const descriptionRegex = /<Description>(.*?)<\/Description>/g;
  const subTaskRegex = /<SubTask>(.*?)<\/SubTask>/g;
  const assigneeRegex = /<Assigne>(.*?)<\/Assigne>/g;
  const timeRegex = /<Time>(.*?)<\/Time>/g;
  const startRegex = /<Start>(.*?)<\/Start>/g;
  const endRegex = /<End>(.*?)<\/End>/g;

  // Array to store parsed objects
  let result = [];

  // Match titles
  let titles = [...inputString.matchAll(titleRegex)];

  // Iterate through each title
  titles.forEach((titleMatch, index) => {
    let titleObj = {};
    titleObj.title = titleMatch[1].trim();

    // Match description
    let descriptionMatch = descriptionRegex.exec(inputString);
    if (descriptionMatch) {
      titleObj.description = descriptionMatch[1].trim();
    }

    // Match subtasks
    let subTasks = [];
    let subTaskMatch;
    while ((subTaskMatch = subTaskRegex.exec(inputString)) !== null) {
      subTasks.push(subTaskMatch[1].trim());
    }
    titleObj.checklist = { subTasks };

    // Match assignees
    let assignees = [];
    let assigneeMatch;
    while ((assigneeMatch = assigneeRegex.exec(inputString)) !== null) {
      assignees.push(assigneeMatch[1].trim());
    }
    titleObj.assignees = assignees;

    // Match time
    let timeMatch = timeRegex.exec(inputString);
    if (timeMatch) {
      titleObj.time = timeMatch[1].trim();
    }

    // Match start date
    let startMatch = startRegex.exec(inputString);
    if (startMatch) {
      titleObj.calendar = { start: startMatch[1].trim() };
    }

    // Match end date
    let endMatch = endRegex.exec(inputString);
    if (endMatch) {
      if (!titleObj.calendar) {
        titleObj.calendar = {};
      }
      titleObj.calendar.end = endMatch[1].trim();
    }

    result.push(titleObj);
  });

  return result;
}

const AIMessageBox = ({
  selectedSpace,
  setMsg,
  members,
  listId,
  reload,
  setReload,
}) => {
  const dispatch = useDispatch();
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const inputRef = useRef();
  const [tasks, setTasks] = useState([]); // State to store tasks
  const [loading, setLoading] = useState(false);
  const projectInfo = generateProjectDetails(selectedSpace, members);
console.log('first',listId)
console.log('ff',selectedSpace)
  const sendMessage = async () => {
    setLoading(true);
    if (input === "") {
      return;
    }

    const userMessage = `${formattedDate} ${input}`;

    setInput("");
    setMessages([...messages, { text: userMessage, sender: "user" }]);
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
      console.log(updateData);
      setTasks(updateData);
      const promises = updateData.map((task) => {
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
          assignUser: assigneeIds,
          checkList: task.checklist.subTasks,
        };

        return dispatch(
          createAiCard({
            spaceId: selectedSpace?._id,
            listId: listId?._id,
            data: taskData,
          })
        );
      });

      Promise.all(promises)
        .then((responses) => {
          console.log(responses);
          setLoading(false);
          setReload(!reload);
        })
        .catch((error) => {
          console.error("Error creating AI cards:", error);
          setLoading(false);
          setReload(!reload);

        });

      setMessages((prevMessages) => [
        ...prevMessages,
        { text: gptResponse, sender: "gpt" },
      ]);

      setMsg(messages);
    } catch (error) {
      console.log(error);
      setLoading(false);
      setReload(!reload);

    }
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
            height: messages?.length ? "400px" : "400px",
          }}
          className="overflow-y-auto"
        >
          <div className="flex justify-end flex-col items-end">
            {messages
              .filter((dt) => dt.sender === "user")
              .map((dt, index) => (
                <div
                  key={index}
                  className="bg-white px-4 text-[#818892] py-2 m-2 max-w-[200px] rounded-lg"
                >
                  <div className="max-w-[200px]">{dt.text}</div>
                  <span className="flex justify-end">5.00 am</span>
                </div>
              ))}
          </div>
        </div>
        <div className="px-3 mt-[10px] relative text-gray-300 flex flex-col  w-full">
          <div className="w-full h-full flex  justify-center align-middle">
            <div className="w-full flex items-stretch justify-between relative font-inter  bg-white rounded-t-[20px] px-3">
              <MentionsInput
                value={input}
                placeholder="Write message"
                onChange={(e) => setInput(e.target.value)}
                // singleLine={input.length >= 50 ? false : true}
                //   onKeyDown={(e) =>
                //     e.key === "Enter" ? sendMessage() : null
                //   }
                classNames={classNames}
                customSuggestionsContainer={(children) => (
                  <div className="bg-white font-inter absolute bottom-6 min-w-[300px] shadow-sm rounded-lg">
                    {children}
                  </div>
                )}
                // allowSuggestionsAboveCursor={true}
                inputRef={inputRef}
                autoFocus
              >
                <Mention
                  className={classNames.mentions__mention}
                  trigger="@"
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
                />
              </MentionsInput>
            </div>
          </div>
          <div className="flex justify-end bg-white rounded-b-[20px] px-2 py-2">
            <button
              onClick={sendMessage}
              className="bg-[#6576ff] rounded-[10px] text-white py-1 px-4 flex items-center gap-2"
            >
              <FaRegCirclePlay />
              {loading ? "Creating Card" : "Run"}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default AIMessageBox;
