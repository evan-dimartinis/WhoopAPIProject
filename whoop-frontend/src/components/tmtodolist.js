import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./todolist.css";
import "../App.css";
import { addNewTomorrowTodo, removeTomorrowTodo } from "../store/tmtodosSlice";
import TrashIcon from "@iconscout/react-unicons/icons/uil-trash";

function TomorrowTodoList(props) {
  const dispatch = useDispatch();
  const userid = useSelector((state) => state.Auth.userid);
  const [newTodoTitle, setNewTodoTitle] = useState("");
  const todolist = useSelector((state) => state.TomorrowTodos.tmtodos);

  const addTmTD = () => {
    dispatch(
      addNewTomorrowTodo({
        userid: userid,
        stitle: newTodoTitle,
      })
    );
    setNewTodoTitle("");
  };

  const removeTmTD = (hmy) => {
    dispatch(
      removeTomorrowTodo({
        userid: userid,
        hmy: hmy,
      })
    );
  };

  const onenter = (event) => {
    addTmTD();
    event.preventDefault();
  };

  return (
    <div className="tasksectioncontainer">
      <h1 className="sectiontitle">Tomorrow's To Do List</h1>
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
                  <TrashIcon
                    color={"white"}
                    size={20}
                    onClick={() => {
                      removeTmTD(item.hmy);
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
          <button className="addnewtodobtn" onClick={addTmTD}>
            +
          </button>
        </div>
      </div>
    </div>
  );
}

export default TomorrowTodoList;
