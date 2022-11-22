import React, { Component, useState, useCallback, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Outlet, Link, useNavigate } from "react-router-dom";
import "../App.css";
import EverydaysComponent from "../components/everydays";
import TodoList from "../components/todolist";
import { validateRefreshToken } from "../store/authSlice";
import { getUserEverydays } from "../store/everydaysSlice";
import { getUserTodos } from "../store/todosSlice";
import { getTomorrowUserTodos } from "../store/tmtodosSlice";
import TomorrowTodoList from "../components/tmtodolist";
import Whoop from "../components/whoop";
import { getRecoveryData } from "../store/whoopSlice";
import DailyJournal from "../components/dailyjournal";
import { getUserJournal } from "../store/dailyjournalSlice";

export default function Dashboard(props) {
  const userdata = useSelector((state) => state.Auth);
  const everydays = useSelector((state) => state.Everydays.everydays);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (!userdata.isAuthenticated) {
      navigate("/", { replace: true });
    }
    async function getData() {
      if (userdata.userid > 0) {
        await dispatch(getUserEverydays(userdata.userid));
        await dispatch(getUserTodos(userdata.userid));
        await dispatch(getTomorrowUserTodos(userdata.userid));
        await dispatch(getRecoveryData(userdata.userid));
        await dispatch(
          getUserJournal({ userid: userdata.userid, daysprior: 0 })
        );
      }
    }
    getData();
  }, [userdata.userid, dispatch, navigate]);

  const logstuff = () => {};

  return (
    <div className="DashboardContainer">
      <div className="toprow-container">
        <EverydaysComponent />
        <TodoList />
        <TomorrowTodoList />
      </div>
      <div className="bottomcontainer">
        <DailyJournal />
        <Whoop />
      </div>
    </div>
  );
}
