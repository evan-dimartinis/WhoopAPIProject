import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./goals.css";
import styled, { keyframes } from "styled-components";
import Goal from "./goal";
import { insertNewGoal } from "../store/goalsSlice";

const Goals = (props) => {
  const mygoals = useSelector((state) => state.Goals.goals);
  const userid = useSelector((state) => state.Auth.userid);
  const dispatch = useDispatch();
  const [newgoalname, setNewgoalname] = useState("");
  const [newgoalenddate, setNewgoalenddate] = useState("");
  const [isValidToCreate, setIsValidToCreate] = useState(false);

  const createnewgoal = () => {
    dispatch(
      insertNewGoal({
        userid: userid,
        sname: newgoalname,
        dtend: newgoalenddate,
      })
    );
    setNewgoalname("");
    setNewgoalenddate("");
    setIsValidToCreate(false);
  };

  return (
    <div className="GoalsDiv">
      <div className="goalslistdiv">
        {mygoals.map((item) => {
          return <Goal key={item.hmy} item={item} />;
        })}
      </div>
      <div className="addgoaldiv">
        <input
          type={"text"}
          className="newgoalname"
          value={newgoalname}
          placeholder="New goal..."
          onChange={(e) => {
            setNewgoalname(e.target.value);
            setIsValidToCreate(
              e.target.value !== "" && newgoalenddate.length > 0
            );
          }}
        />
        <input
          type={"date"}
          className="newgoalenddate"
          value={newgoalenddate}
          onChange={(e) => {
            setNewgoalenddate(e.target.value);
            setIsValidToCreate(e.target.value !== "" && newgoalname.length > 0);
          }}
          required
        />
        <button
          className={isValidToCreate ? "CreateBtn" : "CreateBtn invalid"}
          onClick={createnewgoal}
          disabled={isValidToCreate}
        >
          Create
        </button>
      </div>
    </div>
  );
};

export default Goals;
