import { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import Navbar from "./components/navbar";

function App() {
  const [todos, settodos] = useState([]);
  const [todo, settodo] = useState("");

  useEffect(() => {
    let todoString = localStorage.getItem("todos");
    if (todoString) {
      let todos = JSON.parse(localStorage.getItem("todos"));
      settodos(todos);
    }
  }, []);

  useEffect(() => {
    if (todos.length > 0) {
      localStorage.setItem("todos", JSON.stringify(todos));
    }
  }, [todos]);

  const handleAdd = () => {
    settodos([...todos, { id: uuidv4(), todo, isComplete: false }]);
    settodo("");
    saveToLS();
  };

  const handleEdit = (e, id) => {
    let edittodos = todos.filter((item) => item.id === id);
    settodo(edittodos[0].todo);
    let newtodos = todos.filter((item) => {
      return item.id !== id;
    });
    settodos(newtodos);
    saveToLS();
  };

  const handleDelete = (e, id) => {
    alert("Are you sure you want to delete the todo");
    let newtodos = todos.filter((item) => {
      return item.id !== id;
    });
    settodos(newtodos);
    saveToLS();
  };

  const handleChange = (e) => {
    settodo(e.target.value);
  };

  const handleCheckbox = (e) => {
    let id = e.target.name;
    console.log(`id is ${id}`);
    let idx = todos.findIndex((item) => {
      return item.id === id;
    });
    let newtodos = [...todos];
    newtodos[idx].isComplete = !newtodos[idx].isComplete;
    settodos(newtodos);
    saveToLS();
  };

  return (
    <>
      <Navbar />
      <div className="text-white w-[9900px] md:w-full">
        <div className=" ml-100  md:ml-150 mt-30 ">
          <h1 className=" text-[100px] mt-20 md:mt-0 md:text-[30px]">
            Welcome User!!
          </h1>
          <div className="flex md:block">
            <input
              onChange={handleChange}
              value={todo}
              className="border-white border-2 mt-5 md:mt-2 p-3 md:text-xl  text-8xl h-[150px] w-[800px] md:h-7 md:px-2 md:py-1  md:w-2/4"
              placeholder="type here....."
              type="text"
            />
            <button
              onClick={handleAdd}
              className="bg-indigo-700 p-3 my-3 px-9 ml-7  rounded-2xl md:bg-indigo-700 md:ml-3 md:w-1/20 md:p-1  md:rounded cursor-pointer"
            >
              {" "}
              Save{" "}
            </button>
          </div>
        </div>
        <div className="m-5  p-2">
          <h1 className=" text-9xl md:text-[25px] md:ml-143 md:mt-0 mt-10 ml-90 font-bold">
            Your ToDos
          </h1>
          <div className="h-[1px] ml-140 mt-1 w-[550px] items-center bg-gray-700"></div>
          {todos.length < 1 && (
            <div className="md:ml-140 ml-5 mt-5 text-2xl">
              {" "}
              No todos to display
            </div>
          )}
          <div className="h-10 mt-10 md:ml-145 ml-100">
            {todos.map((item) => {
              return (
                <div key={item.id} className="flex md:mt-3  ">
                  <input
                    name={item.id}
                    onChange={handleCheckbox}
                    type="checkbox"
                    value={item.isComplete}
                    className="w-4 h-4 mt-1 rounded-sm bg-gray-500"
                  />
                  <p
                    className={
                      item.isComplete
                        ? "px-3 w-1/2 md:text-[18px] line-through"
                        : "px-3 w-1/2 md:text-[18px]"
                    }
                  >
                    {item.todo}
                  </p>
                  <button
                    onClick={(e) => handleEdit(e, item.id)}
                    className="bg-indigo-700 md:ml-3 md:w-1/20 h-1/2 p-1 md:text-[15px]  text- rounded cursor-pointer"
                  >
                    Edit
                  </button>
                  <button
                    onClick={(e) => handleDelete(e, item.id)}
                    className="bg-indigo-700 ml-3 md:w-1/16 h-1/2 p-1  md:text-[15px] rounded cursor-pointer"
                  >
                    Delete
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
