import React, { useContext, useEffect, useState } from "react";
import TodoServices from "../services/TodoServices";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../services/AuthContext";
import axios from "axios";
import todoImg from "../assets/todo.jpg";

const AddTodo = () => {

  const { user } = useContext(AuthContext);

  const [todo, setTodo] = useState({
    id: "",
    title: "",
    description: "",
    emailId: "",
    status: "Started",
    sub: "",
    image: todoImg,
  });

  useEffect(() => {
    if (user) {
        setTodo(prev => ({
            ...prev,
            sub: user.sub
        }));
    }
}, [user]);



  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTodo({ ...todo, [name]: value });
  };

  const validateForm = () => {
    const newErrors = {};

    if (!todo.title.trim()) newErrors.title = "Title is required.";
    if (!todo.description.trim()) {
      newErrors.description = "Description is required.";
    } else if (todo.description.length < 10 || todo.description.length > 100) {
      newErrors.description =
        "Description must be between 20 and 40 characters.";
    }
    if (!todo.emailId.trim()) {
      newErrors.emailId = "Email ID is required.";
    } else if (!/\S+@\S+\.\S+/.test(todo.emailId)) {
      newErrors.emailId = "Invalid email format.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; // Return true if no errors
  };

  const saveTodo = (e) => {
    e.preventDefault();

    // Validate before submission
    if (!validateForm()) {
      return;
    }

    TodoServices.saveTodo(todo)
      .then((res) => {
        console.log("Todo created successfully", res);
        navigate("/todoList");
      })
      .catch((err) => {
        console.log("Error in creating todo", err);
        console.log(todo);
      });
  };

  const reset = (e) => {
    e.preventDefault();
    setTodo({
      id: "",
      title: "",
      description: "",
      emailId: "",
      status: "",
      image: "",
    });
  };

  const [image, setImage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    setLoading(true); // Start loading
    setImage(""); // Reset previous image
    try {
      const response = await axios.post(
        "http://localhost:8080/api/ai/generate",
        {
          prompt: todo.title,
        }
      );
      console.log("API Response:", response.data); // Log the entire response
      setImage(`data:image/png;base64,${response.data.image}`);
      todo.image = `data:image/png;base64,${response.data.image}`;
    } catch (error) {
      console.error("Error generating image:", error);
    } finally {
      setLoading(false); // Stop loading
    }
  };

  return (
    <div className="w-full h-[80vh] flex align-middle items-center justify-center pt-40">
      <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-1/3 relative z-10">
        <h2 className="text-xl font-semibold text-gray-700 mb-4">
          Add New Todo
        </h2>
        <div className="relative z-0 w-full mb-5 group flex justify-between items-baseline">
          <input
            id="title"
            name="title"
            value={todo.title}
            onChange={(e) => handleChange(e)}
            type="text"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" "
            required
          />
          {errors.title && (
            <p className="text-red-500 text-xs absolute right-1 bottom-1">
              {errors.title}
            </p>
          )}
          <label
            htmlFor="floating_email"
            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Title
          </label>
          <button
            onClick={handleGenerate}
            disabled={loading}
            className="group relative outline-0 bg-sky-200 [--sz-btn:30px] [--space:calc(var(--sz-btn)/5.5)] [--gen-sz:calc(var(--space)*2)] [--sz-text:calc(var(--sz-btn)-var(--gen-sz))] h-[var(--sz-btn)] min-w-[var(--sz-btn)] border border-solid  rounded-xl flex items-center justify-center aspect-square cursor-pointer transition-transform duration-200 active:scale-[0.95] bg-[linear-gradient(45deg,#1b1b1a,#bfbfbf)] [box-shadow:#3c40434d_0_1px_2px_0,#3c404326_0_2px_6px_2px,#0000004d_0_30px_60px_-30px,#34343459_0_-2px_6px_0_inset]"
          >
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
          <div className="absolute -right-2/4 bottom-2/4 translate-y-1/2 flex justify-center items-end">
            {image && (
              <img
                src={image}
                className="w-32 rounded-md"
                alt="Generated AI Art"
              />
            )}
            {loading && (
              <div className="">
                <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                <p>Generating...</p>
              </div>
            )}
          </div>
        </div>
        <div className="relative z-0 w-full mb-5 group">
          <textarea
            id="description"
            type="description"
            name="description"
            value={todo.description}
            onChange={(e) => handleChange(e)}
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" "
            required
          />
          {errors.description && (
            <p className="text-red-500 text-xs absolute right-1 bottom-1">
              {errors.description}
            </p>
          )}
          <label
            htmlFor="floating_repeat_password"
            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Description
          </label>
        </div>
        <div className="relative z-0 w-full mb-5 group">
          <input
            id="emailId"
            type="email"
            name="emailId"
            value={todo.emailId}
            onChange={(e) => handleChange(e)}
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" "
            required
          />
          {errors.emailId && (
            <p className="text-red-500 text-xs absolute right-1 bottom-1">
              {errors.emailId}
            </p>
          )}
          <label
            htmlFor="floating_repeat_password"
            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Email ID
          </label>
        </div>
        <div className="relative z-0 w-full mb-5 group">
          <select
            id="status"
            name="status"
            value={todo.status}
            onChange={handleChange}
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            required
          >
            <option value="Started">Started Task</option>
            <option value="Inc priority">Increase Priority</option>
            <option value="Dec priority">Decrease Priority</option>
            <option value="Done">Task Done</option>
          </select>
        </div>

        <div className="flex gap-2 items-center justify-between">
          <button
            onClick={saveTodo}
            className="w-1/2 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-blue-800 text-white font-bold py-2 rounded focus:outline-none focus:shadow-outline"
            type="button"
          >
            Save
          </button>
          <button
            onClick={reset}
            className="w-1/2 bg-red-500 hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 text-white font-bold py-2 rounded focus:outline-none focus:shadow-outline"
            type="button"
          >
            Clear
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddTodo;
