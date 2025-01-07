import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import TodoServices from "../services/TodoServices";
import { chatWithModel } from "../services/chatService";
import deleteIcon from "../assets/delete.svg";
import plusIcon from "../assets/plus.svg";

const Todo = ({ employee, deleteTodo }) => {
  const [airesponse, setAIResponse] = useState("");
  const [display, setDisplay] = useState("hidden");
  const handleSendMessage = async () => {
    const payload = {
      messages: [
        {
          role: "system",
          content:
            "Generate a concise, well-structured list with short bullet points (separated by only '|') based on the input.",
        },
        { role: "user", content: employee.description },
      ],
      model: "gpt-4o-mini",
      temperature: 1,
      max_tokens: 50,
      top_p: 1,
    };

    try {
      const apiResponse = await chatWithModel(payload);
      // Extract the message content
      const messageContent =
        apiResponse.choices && apiResponse.choices[0]?.message?.content;
      setAIResponse(messageContent || "No response received");
    } catch (error) {
      setAIResponse("Error communicating with the server.");
    }
    setDisplay("block");
  };

  // ----------------------------------------------------------------------------------------------------------------

  const [todo] = useState({
    id: employee.id || "", // Ensure `id` has a default value
    title: employee.title || "",
    description: employee.description || "",
    emailId: employee.emailId || "",
    status: employee.status || "",
    aiDescription: employee.aiDescription || "", // Initial empty value for description
  });

  const updateAIDescription = (e) => {
    e.preventDefault();

    // Ensure `airesponse` and `todo.id` are available
    if (!airesponse || !todo.id) {
      console.error("AI response or ID is missing");
      return;
    }

    // Create the payload for the API call
    const updatedData = {
      id: todo.id,
      title: todo.title,
      description: todo.description,
      emailId: todo.emailId,
      status: todo.status,
      aiDescription: airesponse,
    };

    // Call the service to update the AI description
    TodoServices.updateAIDescription(updatedData, todo.id)
      .then((response) => {
        // Update the state while preserving other fields
        // setTodo({ ...todo, aiDescription: response.data.aiDescription });
        console.log("AI Description Updated:", response.data);
        setDisplay("hidden");
      })
      .catch((error) => {
        console.error("Error updating AI Description:", error);
      });
  };

  // ----------------------------------------------------------------------------------------------------------------

  const [pointsObject, setPointsObject] = useState({});

  useEffect(() => {
    // Define a function to process the input string
    const processString = (inputString) => {
      return inputString
        .split("|")
        .map((point) => point.trim())
        .filter((point) => point.startsWith("-"))
        .reduce((acc, point, index) => {
          acc[`point${index + 1}`] = point.slice(1).trim();
          return acc;
        }, {});
    };

    // Use `airesponse` if available, fallback to `employee.aiDescription`
    const inputString = airesponse || employee.aiDescription || "";
    const processedPoints = processString(inputString);

    setPointsObject(processedPoints);
  }, [airesponse, employee.aiDescription]);

  const [newPoint, setNewPoint] = useState("");

  const handleAddPoint = () => {
    if (!newPoint.trim()) {
      alert("Point cannot be empty");
      return;
    }

    // Add the new point to the object
    const newKey = `point${Object.keys(pointsObject).length + 1}`;
    const updatedPoints = {
      ...pointsObject,
      [newKey]: newPoint.trim(),
    };
    setPointsObject(updatedPoints);
    setNewPoint(""); // Clear the input field

    // Convert the updated points object back to a string
    const updatedAiDescription = Object.values(updatedPoints)
      .map((value) => `- ${value}`)
      .join(" | ");

    // Save the updated description to the server
    const updatedData = {
      ...employee,
      aiDescription: updatedAiDescription,
    };

    TodoServices.updateAIDescription(updatedData, employee.id)
      .then((response) => {
        console.log("AI Description Updated:", response.data);
      })
      .catch((error) => {
        console.error("Error updating AI Description:", error);
      });
  };

  const handleDeletePoint = (key) => {
    // Remove the point from the object
    const updatedPoints = { ...pointsObject };
    delete updatedPoints[key];
    setPointsObject(updatedPoints);

    // Convert the updated points object back to a string
    const updatedAiDescription = Object.values(updatedPoints)
      .map((value) => `- ${value}`)
      .join(" | ");

    // Save the updated description to the server
    const updatedData = {
      ...employee,
      aiDescription: updatedAiDescription,
    };

    TodoServices.updateAIDescription(updatedData, employee.id)
      .then((response) => {
        console.log("AI Description Updated:", response.data);
      })
      .catch((error) => {
        console.error("Error updating AI Description:", error);
      });
  };

  // ---------------------------------------------------------------

  const navigate = useNavigate();

  const editTodo = (e, id) => {
    e.preventDefault();
    navigate(`/editTodo/${id}`);
  };

  return (
    <div
      key={employee.id}
      className="flex flex-col gap-2 max-w-xs dark:bg-gray-800 dark:border-gray-700"
    >
      <div className="relative min-h-40 bg-white rounded-lg border-2 border-gray-200 shadow-2xl md:flex">
        <button onClick={(e, id) => deleteTodo(e, employee.id)}>
          <img
            className="w-10 h-10 absolute -right-4 -top-4 rounded-full cursor-pointer scale-90 hover:scale-100 opacity-50 hover:opacity-100"
            src={require("../assets/close.png")}
            alt="close"
          />
        </button>
        <img
          src={employee.image}
          className="md:w-1/3 rounded-lg object-cover"
          alt="ai logo"
        />
        <div className="p-4 min-h-full w-full flex flex-col">
          <h2 className="flex-none font-bold text-2xl md:text-xl text-gray-800 hover:text-gray-700 mb-1">
            {employee.title}
          </h2>
          <div className="min-w-full flex justify-between gap-4 items-center my-2">
            <p className="flex text-gray-600">{employee.description}</p>

            <button onClick={handleSendMessage} className="group relative outline-0 bg-sky-200 [--sz-btn:30px] [--space:calc(var(--sz-btn)/5.5)] [--gen-sz:calc(var(--space)*2)] [--sz-text:calc(var(--sz-btn)-var(--gen-sz))] h-[var(--sz-btn)] min-w-[var(--sz-btn)] border border-solid  rounded-xl flex items-center justify-center aspect-square cursor-pointer transition-transform duration-200 active:scale-[0.95] bg-[linear-gradient(45deg,#1b1b1a,#bfbfbf)] [box-shadow:#3c40434d_0_1px_2px_0,#3c404326_0_2px_6px_2px,#0000004d_0_30px_60px_-30px,#34343459_0_-2px_6px_0_inset]">
              <svg
                className="animate-pulse absolute z-10 overflow-visible transition-all duration-300 text-[#ffffff] group-hover:text-white top-[calc(var(--sz-text)/7)] left-[calc(var(--sz-text)/7)] h-[var(--gen-sz)] w-[var(--gen-sz)] group-hover:h-[var(--sz-text)] group-hover:w-[var(--sz-text)] group-hover:left-[calc(var(--sz-text)/4)] group-hover:top-[calc(calc(var(--gen-sz))/2)]"
                stroke="none"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M9 4.5a.75.75 0 01.721.544l.813 2.846a3.75 3.75 0 002.576 2.576l2.846.813a.75.75 0 010 1.442l-2.846.813a3.75 3.75 0 00-2.576 2.576l-.813 2.846a.75.75 0 01-1.442 0l-.813-2.846a3.75 3.75 0 00-2.576-2.576l-2.846-.813a.75.75 0 010-1.442l2.846-.813A3.75 3.75 0 007.466 7.89l.813-2.846A.75.75 0 019 4.5zM18 1.5a.75.75 0 01.728.568l.258 1.036c.236.94.97 1.674 1.91 1.91l1.036.258a.75.75 0 010 1.456l-1.036.258c-.94.236-1.674.97-1.91 1.91l-.258 1.036a.75.75 0 01-1.456 0l-.258-1.036a2.625 2.625 0 00-1.91-1.91l-1.036-.258a.75.75 0 010-1.456l1.036-.258a2.625 2.625 0 001.91-1.91l.258-1.036A.75.75 0 0118 1.5zM16.5 15a.75.75 0 01.712.513l.394 1.183c.15.447.5.799.948.948l1.183.395a.75.75 0 010 1.422l-1.183.395c-.447.15-.799.5-.948.948l-.395 1.183a.75.75 0 01-1.422 0l-.395-1.183a1.5 1.5 0 00-.948-.948l-1.183-.395a.75.75 0 010-1.422l1.183-.395c.447-.15.799-.5.948-.948l.395-1.183A.75.75 0 0116.5 15z"
                ></path>
              </svg>
              <span className="[font-size:var(--sz-text)-5px] font-extrabold leading-none text-white transition-all duration-200 group-hover:opacity-0">
                AI
              </span>
            </button>
          </div>
          <div className="h-full w-full flex gap-2 justify-end items-end">
            <p className="w-1/2 py-2 px-4 text-[#090909] text-md cursor-pointer border transition-all duration-[0.3s] shadow-[6px_6px_12px_#c5c5c5,-6px_-6px_12px_#ffffff] rounded-md border-solid border-[#e8e8e8] hover:border hover:border-solid hover:border-[white] active:shadow-[4px_4px_12px_#c5c5c5,-4px_-4px_12px_#ffffff]; background: #e8e8e8; text-center">
              {employee.status}
            </p>
            <button
              onClick={(e, id) => {
                editTodo(e, employee.id);
              }}
              className="w-1/2 py-2 px-4 bg-gray-200 text-[#090909] text-md cursor-pointer border transition-all duration-[0.3s] shadow-[6px_6px_12px_#c5c5c5,-6px_-6px_12px_#ffffff] rounded-md border-solid border-[#e8e8e8] hover:border hover:border-solid hover:border-[white] active:shadow-[4px_4px_12px_#c5c5c5,-4px_-4px_12px_#ffffff]; background: #e8e8e8; text-center"
            >
              Edit
            </button>
          </div>
        </div>
      </div>
      <div className=" flex flex-col gap-1 dark:bg-gray-900 dark:border-gray-700">
        <div>
          {Object.entries(pointsObject).map(([key, value]) => (
            <div
              key={key}
              className="text-black-100 bg-white shadow-md rounded-md py-2 px-4 border my-2 flex justify-between items-center"
            >
              <span>{value}</span>
              <button
                onClick={() => handleDeletePoint(key)}
                className=""
              ><img className="w-6 h-6 stroke-red-500 hover:stroke-red-700" src={deleteIcon} alt="" />
              </button>
            </div>
          ))}
          <div className="relative">
            <input
              type="text"
              value={newPoint}
              onChange={(e) => setNewPoint(e.target.value)}
              className="block w-full shadow-md rounded-md py-2 px-4 border p-4  rounded my-2 text-sm text-gray-900 border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-300 focus:border-blue-300"
              placeholder="Enter your point"
              required
            />
            <button
              type="submit"
              onClick={handleAddPoint}
              className="text-green-500 hover:text-green-700  absolute end-0 -bottom-2 rounded-lg p-4"
            >
              <img className="w-6 h-6" src={plusIcon} alt="" />
            </button>
          </div>
        </div>

        <div className={display}>
          <button
            className="w-full shadow-md rounded-md py-2 px-4 border p-2 rounded my-2 text-sm cursor-pointer text-white bg-green-500 hover:bg-green-400 hover:text-white transition duration-200"
            onClick={updateAIDescription}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default Todo;
