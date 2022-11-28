import React, { useEffect, useState } from "react";
import "./goals.css";
import styled, { keyframes } from "styled-components";

const Progressdiv = styled.div`
  height: 100%;
  background-color: ${(props) =>
    props.reach < 33 ? (props.reach < 66 ? "yellow" : "red") : "green"};
  width: ${(props) => props.reach}%;
`;

const Goal = (props) => {
    const [extend, setExtend] = useState(false);

    useEffect(() => {
        
    }, [])

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
                <button className="donebtn">Done</button>
                <button className="extendbtn" onClick={() => {
                    setExtend(!extend)
                }}>Extend</button>
                <div className={extend ? "extenddiv extend" : "extenddiv hidden"}>
                    <input type={"date"} className="extendinput" />
                    <button onClick={() => {
                        setExtend(false)
                    }}>Save</button>
                </div>
              </div>
              
            ) : null}
          </div>
    )
}

export default Goal;