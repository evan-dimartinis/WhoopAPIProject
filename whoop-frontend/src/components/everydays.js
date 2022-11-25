import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addNewEveryday, deleteEveryday, markAsComplete } from "../store/everydaysSlice";
import styledcomponent, { keyframes } from 'styled-components'
import TrashIcon from '@iconscout/react-unicons/icons/uil-trash';
import "./everydays.css";
import '../App.css'

const addeverydaykeyframe = (from, to) => keyframes`
  from {
    height: ${from}
  }

  to {
    height: 
  }
`

const AddEverydayDiv = styledcomponent.div`
height: 0px;
overflow: auto;
background-color: rgba(128, 128, 128, 0.273);
`

function EverydaysComponent(props) {
  const everydays = useSelector((state) => state.Everydays.everydays);
  const userid = useSelector((state) => state.Auth.userid);
  const dispatch = useDispatch();
  const [ShowAddEveryday, setShowAddEveryday] = useState(false);
  const [enddate, setEnddate] = useState("12-31-2099");
  const [newEverydayName, setNewEverydayName] = useState("");

  const addEveryday = async () => {
    dispatch(
      addNewEveryday({
        sname: newEverydayName,
        dtend: enddate,
        userid: userid,
      })
    );
    setEnddate("12-31-2099");
    setNewEverydayName("");
    setShowAddEveryday(false);
  };

  const markComplete = async (hmy) => {
    dispatch(
      markAsComplete({
        hmy: hmy,
        userid: userid,
      })
    );
  };

  const DeleteMyEveryday = (hmy) => {
    dispatch(deleteEveryday({
      userid: userid,
      hmy: hmy
    }))
  }

  return (
    <div className="tasksectioncontainer">
      <h1 className="sectiontitle">Everydays</h1>
      <div className="everydaysdiv">
        {/* <button
          onClick={() => setShowAddEveryday(!ShowAddEveryday)}
          className="addeverydaybtn"
        >
          Add Everyday Task
        </button>
        <div
          className={
            ShowAddEveryday ? "addEverydayDiv active" : "addEverydayDiv"
          }
        >
          <input
            className="everydaytitleinput"
            type={"text"}
            id="name"
            placeholder="Task name"
            onChange={(e) => setNewEverydayName(e.target.value)}
            required
          />
          <div className="enddatediv">
            <input
              className="enddateinput"
              type={"date"}
              id="enddate"
              placeholder="End Date"
              onChange={(e) => setEnddate(e.target.value)}
            />
            <label>End date (not required)</label>
          </div>
          <button className="addbtn" onClick={addEveryday}>
            Add
          </button>
        </div> */}
        {everydays.map((item) => {
          return (
            <div
              key={item.hmy.toString()}
              className={
                item.bcompleted ? "everydayrow complete" : "everydayrow"
              }
            >
              <p className="everydaytitle">{item.sname}</p>
              {item.bcompleted ? (
                <p className="done_msg">Complete!</p>
              ) : (
                <div className="todooptionsdiv">
                <button
                  onClick={() => {
                    markComplete(item.hmy);
                  }}
                  className="done_btn"
                >
                  Done
                </button>
                <TrashIcon
                color={"white"}
                size={20}
                onClick={() => {
                  DeleteMyEveryday(item.everydayshmy)
                }}
              />
              </div>
              )}
            </div>
          );
        })}
        <div className="newtododiv">
          <input
            className="newtodoinput"
            type={"text"}
            value={newEverydayName}
            onChange={(e) => setNewEverydayName(e.target.value)}
          />
          <button className="addnewtodobtn" onClick={addEveryday}>
            +
          </button>
        </div>
      </div>
    </div>
  );
}

export default EverydaysComponent;
