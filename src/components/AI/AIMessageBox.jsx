import { useEffect, useState, useRef } from "react";
import { get_mentionable_users } from "../../api/message";
import { useSelector } from "react-redux";
import { MentionsInput, Mention } from "react-mentions";
import classNames from "../../components/Chat/mention.module.css";
import { FaRegCirclePlay } from "react-icons/fa6";
import axios from "axios";
import { useDispatch } from "react-redux";

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

// Function to parse task string
const parseXMLToJSON = (xmlString) => {
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(xmlString, "text/xml");
    const tasks = Array.from(xmlDoc.getElementsByTagName("Task")).map(
      (taskNode) => {
        const title = taskNode.querySelector("Title").textContent;
        const description = taskNode.querySelector("Description").textContent;
        
        // Check if Assignees section exists
        const assigneesNode = taskNode.querySelector("Assignees");
        const assignees = assigneesNode ? Array.from(
          assigneesNode.querySelectorAll("Assignee")
        ).map((assigneeNode) => assigneeNode.textContent) : [];
        
        // Check if Checklist section exists
        const checklistNode = taskNode.querySelector("Checklist");
        const checklist = checklistNode ? Array.from(
          checklistNode.querySelectorAll("SubTask")
        ).map((subTaskNode) => subTaskNode.textContent) : [];
        
        const estimatedTime = taskNode.querySelector("EstimatedTime").textContent;
        const start = taskNode.querySelector("Calendar > Start").textContent;
        const end = taskNode.querySelector("Calendar > End").textContent;
  
        return {
          Title: title,
          Description: description,
          Assignees: assignees,
          Checklist: checklist,
          EstimatedTime: estimatedTime,
          Calendar: {
            Start: start,
            End: end,
          },
        };
      }
    );
  
    return tasks;
  };
  
const AIMessageBox = ({ selectedSpace, setMsg, members }) => {
  const dispatch = useDispatch();
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const inputRef = useRef();
  const [a, setA] = useState(null);

  const projectInfo = generateProjectDetails(selectedSpace, members);

  const sendMessage = async () => {
    if (input === "") {
      return;
    }

    const userMessage = input;
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
                Provide all the responses on template. Here’s a guide.<Title> Plain Text. Short </Title>
                <Description> Description/Solution: </Description>
                <Checklist>Checklist/SubTask: </Checklist>
                <Assignes>
                <Assigne “Assigne 1” />
                <Assigne “Assigne 2" />
                </Assigne>
                <Time>Estimated Time: In hours.</Time>
                <Calendar>
                <Start “Start Date” />
                <End “End Date” />
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
      setA(gptResponse);
      const parsedData = parseXMLToJSON(gptResponse); // Parse the XML response
      console.log("lates Task Data:", parsedData)
      if (gptResponse!==null) {
        const d = parseXMLToJSON(`${a}`);
        console.log("d", d);
        const dddd = parseXMLToJSON(gptResponse);
        console.log("d", dddd);
      }
      console.log("gptResponse", gptResponse);
      setMessages((prevMessages) => [
        ...prevMessages,
        { text: gptResponse, sender: "gpt" },
      ]);
      setMsg(messages);
    } catch (error) {
      console.log(error);
    }
  };

  // Access the last message
  const lastMessage = messages[messages.length - 1];
  const textOfLastMessage = lastMessage?.text;

  // Parse the tasks from the last message
  const data = parseXMLToJSON(`${a}`);

  console.log("Parsed Task Data:", data);
  // Sample response string

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
            <div className="w-full flex items-stretch justify-between relative   bg-white rounded-t-[20px] px-3">
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
                  <div className="bg-white absolute bottom-6 min-w-[300px] shadow-sm rounded-lg">
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
              Run
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default AIMessageBox;
