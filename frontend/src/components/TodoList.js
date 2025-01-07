import React, { useEffect, useState, useContext } from "react";
import TodoServices from "../services/TodoServices";
import Todo from "./Todo";
import { AuthContext } from "../services/AuthContext";
import googleLogo from "../assets/google.svg";

const TodoList = () => {
  const { user, login } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const [employees, setEmployees] = useState(null);
  const [error, setError] = useState(null); // State for handling errors

  useEffect(() => {
    const fetchData = async () => {
      if (user?.sub) {
        setLoading(true);
        setError(null); // Reset error state on new request
        try {
          const response = await TodoServices.getTodo(user.sub);
          setEmployees(response.data);
        } finally {
          setLoading(false); // Set loading to false when the request is finished
        }
      }
    };
    fetchData();

    // Cleanup function to handle component unmounting
    return () => {
      setEmployees(null);
      setError(null);
    };
  }, [user]);

  const deleteTodo = (e, id) => {
    e.preventDefault();
    TodoServices.deleteTodo(id).then((res) => {
      if (employees) {
        setEmployees((prevEmployees) =>
          prevEmployees.filter((employee) => employee.id !== id)
        );
      }
    });
  };

  return (
    <div className="container mx-auto my-8 pt-40">
      <div className="relative overflow-x-auto  sm:rounded-lg">
        <div className="w-full text-sm  text-gray-500 dark:text-gray-400 p-4">
          {loading && <div>Loading...</div>} {/* Loading Indicator */}
          {error && <div className="text-red-500">{error}</div>}{" "}
          {/* Display error message */}
          {!loading && !error && employees && employees.length > 0 ? (
            <div className="flex flex-wrap gap-8 gap-x-16 justify-center">
              {employees.map((employee) => (
                <Todo
                  key={employee.id}
                  employee={employee}
                  deleteTodo={deleteTodo}
                />
              ))}
            </div>
          ) : (
            !loading &&
            !error && (
              <div className="w-3/4 text-center m-auto flex flex-col items-center justify-center gap-4 h-[60vh]">
                <h1 className="text-6xl uppercase font-extrabold ">
                  Your Internet is your canvas
                </h1>
                {!user ? (
                  <>
                    <p className=" border-gray-200 px-6 py-2 font-semibold text-base">
                      Login to get started
                    </p>
                    <button
                      onClick={login}
                      className="max-w-xs flex text-sm leading-5 font-bold text-center uppercase align-middle items-center border gap-3 text-[rgb(65,63,63)] bg-white cursor-pointer transition-all duration-[0.6s] ease-[ease] px-[1.4rem] py-2 rounded-full border-solid border-[rgba(0,0,0,0.25)] hover:scale-[1.02];"
                    >
                      <img src={googleLogo} alt="Logo" className="w-6 h-6" />
                      Continue with Google
                    </button>
                  </>
                ) : (
                  ""
                )}
              </div>
            )
          )}
        </div>
      </div>
      <div></div>
    </div>
  );
};

export default TodoList;
