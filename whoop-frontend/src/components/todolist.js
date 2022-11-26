import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addNewTodo, markAsComplete, removeTodo } from "../store/todosSlice";
import TrashIcon from "@iconscout/react-unicons/icons/uil-trash";
import "./todolist.css";
import "../App.css";

function TodoList(props) {
  const todolist = useSelector((state) => state.Todos.todos);
  const dispatch = useDispatch();
  const userid = useSelector((state) => state.Auth.userid);
  const [newTodoTitle, setNewTodoTitle] = useState("");

  const addTodo = async () => {
    dispatch(
      addNewTodo({
        userid: userid,
        stitle: newTodoTitle,
      })
    );
    setNewTodoTitle("");
  };

  const todoComplete = (hmy) => {
    dispatch(
      markAsComplete({
        hmy: hmy,
        userid: userid,
      })
    );
  };

  const deleteTodo = (hmy) => {
    dispatch(
      removeTodo({
        userid: userid,
        hmy: hmy,
      })
    );
  };

  const onenter = (event) => {
    addTodo()
    event.preventDefault();
  };

  return (
    <div className="tasksectioncontainer">
      <h1 className="sectiontitle">Today's To Do List</h1>
      <div className="todoslistdiv">
        {todolist.map((item) => {
          return (
            <div
              key={item.hmy.toString()}
              className={item.bcompleted ? "todorow complete" : "todorow"}
            >
              <p className="todotitle">{item.stitle}</p>
              {item.bcompleted ? (
                <p className="done_msg">Complete!</p>
              ) : (
                <div className="todooptionsdiv">
                  <button
                    onClick={() => {
                      todoComplete(item.hmy);
                    }}
                    className="tododone_btn"
                  >
                    Done
                  </button>
                  <TrashIcon
                    color={"white"}
                    size={20}
                    onClick={() => {
                      deleteTodo(item.hmy);
                    }}
                  />
                </div>
              )}
            </div>
          );
        })}
        <div className="newtododiv">
          <form onSubmit={onenter}>
            <input
              className="newtodoinput"
              type={"text"}
              value={newTodoTitle}
              onChange={(e) => setNewTodoTitle(e.target.value)}
            />
          </form>

          <button className="addnewtodobtn" onClick={addTodo}>
            +
          </button>
        </div>
      </div>
    </div>
  );
}

export default TodoList;
