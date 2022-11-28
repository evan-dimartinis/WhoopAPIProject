import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./goals.css";
import styled, { keyframes } from "styled-components";
import Goal from "./goal";
import { insertNewGoal } from "../store/goalsSlice";

const Goals = (props) => {
  const mygoals = useSelector((state) => state.Goals.goals);
  const userid = useSelector((state) => state.Auth.userid)
  const dispatch = useDispatch()
  const [newgoalname, setNewgoalname] = useState('')
  const [newgoalenddate, setNewgoalenddate] = useState('')
  const [goals, setgoals] = useState([])

  useEffect(() => {
    setgoals(mygoals)
  }, [])

  const createnewgoal = () => {
    dispatch(insertNewGoal({
        userid: userid,
        sname: newgoalname,
        dtend: newgoalenddate
    }))
    setNewgoalname('')
    setNewgoalenddate('')
  }

  return (
    <div className="GoalsDiv">
        <div className="goalslistdiv">
            {goals.map((item) => {
        return (
          <Goal key={item.hmy} item={item} />
        );
      })}
        </div>
      <div className="addgoaldiv">
        <input type={"text"} className="newgoalname" value={newgoalname} placeholder="New goal..." onChange={(e) => {
            setNewgoalname(e.target.value)
        }} />
        <input type={"date"} className="newgoalenddate" value={newgoalenddate} onChange={(e) => {
            setNewgoalenddate(e.target.value)
        }} />
        <button onClick={createnewgoal}>Create</button>
      </div>
    </div>
  );
};

export default Goals;
