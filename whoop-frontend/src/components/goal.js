import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import "./goals.css";
import styled, { keyframes } from "styled-components";
import { extendGoal, markAsComplete } from "../store/goalsSlice";

const Progressdiv = styled.div`
  height: 100%;
  background-color: ${(props) =>
    props.reach < 33 ? (props.reach < 66 ? "yellow" : "red") : "green"};
  width: ${(props) => props.reach}%;
`;

const Goal = (props) => {
  const dispatch = useDispatch()
  const userid = useSelector((state) => state.Auth.userid)
  const [extend, setExtend] = useState(false);
  const [NewEndDt, setNewEndDt] = useState("");

  const extendEndDate = () => {
    dispatch(extendGoal({
      userid: userid,
      dtend: NewEndDt,
      hmy: props.item.hmy
    }))
  }

  const complete = () => {
    dispatch(markAsComplete({
      userid: userid,
      hmy: props.item.hmy
    }))
  }

  useEffect(() => {}, []);

  return (
    <div
      className={
        props.item.bcompleted ? "goaldiv complete" : "goaldiv incomplete"
      }
    >
      <p className="goalname">{props.item.sname}</p>
      {!props.item.bcompleted ? (
        <div className="goalactionsdiv">
          <p className="daystogo">{props.item.daystogo} days left</p>
          <div className="progressbardiv">
            <div className="scalediv">
              <Progressdiv
                reach={Math.round(props.item.daystogo / props.item.totaldays)}
              ></Progressdiv>
            </div>
            <p className="progresspercent">
              {Math.round(props.item.daystogo / props.item.totaldays)}%
            </p>
          </div>
          <button className="donebtn" onClick={complete}>Done</button>
          <button
            className="extendbtn"
            onClick={() => {
              setExtend(!extend);
            }}
          >
            Extend
          </button>
          <div className={extend ? "extenddiv extend" : "extenddiv hidden"}>
            <input
              type={"date"}
              className="extendinput"
              value={NewEndDt}
              onChange={(e) => setNewEndDt(e.target.value)}
            />
            <button
              onClick={() => {
                extendEndDate()
                setExtend(false);
              }}
            >
              Save
            </button>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default Goal;
