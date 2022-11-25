import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import "./whoop.css";
import styled, { keyframes } from "styled-components";

const extendwhoopbardiv = (reach) => keyframes`
    from {
      width: 0
    }  

    to {
      width: ${reach}%
    }
  `;

const Recoverydiv = styled.div`
  height: 3%;
  background-color: ${(props) =>
    props.reach < 33 ? (props.reach < 66 ? "yellow" : "red") : "green"};
  animation: ${(props) => extendwhoopbardiv(props.reach)} 0.5s linear 1 0.5s;
  animation-fill-mode: both;
`;

const StrainDiv = styled.div`
  height: 3%;
  background: ${(props) =>
    props.reach < 33 ? "lightblue" : props.reach < 66 ? "blue" : "darkblue"};
  animation: ${(props) => extendwhoopbardiv(props.reach)} 0.5s linear 1 0.5s;
  animation-fill-mode: both;
`;

const Whoop = (props) => {
  const whoopdata = useSelector((state) => state.Whoop);

  return (
    <div className="whoopcontainer">
      <h1>Recovery: {whoopdata.recovery}</h1>
      <Recoverydiv reach={whoopdata.recovery / 2}></Recoverydiv>
      <h1>Strain: {Math.round(whoopdata.strain * 100) / 100}</h1>
      <StrainDiv reach={whoopdata.strain * 2.38} />
      <h1>Hours of Sleep:</h1>
      <p className="sleepTime">{Math.round(whoopdata.minutesAsleep / 60)}:{(Math.round(whoopdata.minutesAsleep % 60) < 10 ? "0" : "") + Math.round(whoopdata.minutesAsleep % 60)}</p>
    </div>
  );
};

export default Whoop;
