import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import TodoServices from "../services/TodoServices";

const UpdateEmployee = () => {
  const { id } = useParams();

  const navigate = useNavigate();

  const [todo, setEmployee] = useState({
    id: id,
    title: "",
    description: "",
    emailId: "",
    status: "",
  });

  const handleChange = (e) => {
    const value = e.target.value;
    setEmployee({ ...todo, [e.target.name]: value });
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await TodoServices.getTodoById(id);
        setEmployee(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  const updateTodo = (e) => {
    e.preventDefault();
    TodoServices.updateTodo(todo, id)
      .then((response) => {
        navigate("/todoList");
      })
      .catch((error) => {
        console.log("Error in updating Todo", error);
      });
  };

  return (
    <div className="w-full h-[80vh] flex align-middle items-center justify-center pt-40">
      <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-1/3 relative z-10">
        <h2 className="text-xl font-semibold text-gray-700 mb-4">
          Update Employee
        </h2>
        <div className="relative z-0 w-full mb-5 group">
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
          <label
            htmlFor="floating_email"
            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Title
          </label>
        </div>
        <div className="relative z-0 w-full mb-5 group">
          <input
            id="description"
            type="description"
            name="description"
            value={todo.description}
            onChange={(e) => handleChange(e)}
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" "
            required
          />
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
          <label
            htmlFor="floating_repeat_password"
            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Email ID
          </label>
        </div>
        <div className="relative z-0 w-full mb-5 group">
          <input
            id="status"
            type="status"
            name="status"
            value={todo.status}
            onChange={(e) => handleChange(e)}
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" "
            required
          />
          <label
            htmlFor="floating_repeat_password"
            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Status
          </label>
        </div>

        <div className="flex gap-2 items-center justify-between">
          <button
            onClick={updateTodo}
            className="w-1/2 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 text-white font-bold py-2 rounded focus:outline-none focus:shadow-outline"
            type="button"
          >
            Update
          </button>
          <button
            onClick={() => navigate("/todoList")}
            className="w-1/2 bg-red-500 hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 text-white font-bold py-2 rounded focus:outline-none focus:shadow-outline"
            type="button"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdateEmployee;
