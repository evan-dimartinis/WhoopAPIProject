import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Switch, Select, MenuItem, createTheme } from "@mui/material";
import { styled } from "@mui/material/styles";
import "./dailyjournal.css";
import {
  getUserJournal,
  insertUserJournal,
  updateUserJournal,
} from "../store/dailyjournalSlice";

const CustomizedSelect = styled(Select)`
  color: #1976d2;

  :hover {
    color: #42a5f5;
  }
`;

const DailyJournal = (props) => {
  const dispatch = useDispatch();
  const [balcohol, setBalcohol] = useState(false);
  const [bmarijuana, setBmarijuana] = useState(false);
  const [bwfh, setBwfh] = useState(false);
  const [bsocial, setBsocial] = useState(false);
  const [imentalwellness, setImentalwellness] = useState(1);
  const [iproductivity, setIproductivity] = useState(1);
  const [iworkouttype, setIworkouttype] = useState(1);
  const [btraveling, setBtraveling] = useState(false);
  const [dtofentry, setDtofentry] = useState(
    new Date().toISOString().split("T")[0]
  );
  const [journalCompleted, setJournalCompleted] = useState(false)
  const journaldata = useSelector((state) => state.DailyJournal.result);
  const completed = useSelector((state) => state.DailyJournal.completed);
  const whoopdata = useSelector((state) => state.Whoop);
  const userid = useSelector((state) => state.Auth.userid);

  useEffect(() => {
    setBsocial(journaldata.bsocial);
    setBwfh(journaldata.bwfh);
    setBmarijuana(journaldata.bmarijuana);
    setBalcohol(journaldata.balcohol);
    setImentalwellness(journaldata.imentalwellness);
    setIproductivity(journaldata.iproductivity);
    setIworkouttype(journaldata.iworkouttype);
    setBtraveling(journaldata.btraveling);
    setJournalCompleted(completed)
    setDtofentry(new Date(journaldata.dtofentry).toISOString().split("T")[0]);
  }, [
    journaldata.balcohol,
    journaldata.bmarijuana,
    journaldata.bwfh,
    journaldata.bsocial,
    journaldata.imentalwellness,
    journaldata.iproductivity,
    journaldata.iworkouttype,
    journaldata.btraveling,
    journaldata.dtofentry,
  ]);

  const handleDateChange = (newdate) => {
    const today = new Date(
      new Date(new Date() - new Date().getTimezoneOffset() * 60000)
        .toISOString()
        .split("T")[0]
    );
    newdate = new Date(newdate);
    const datediff = Math.ceil((today - newdate) / (1000 * 60 * 60 * 24));
    dispatch(
      getUserJournal({
        userid: userid,
        daysprior: datediff,
      })
    );
    setDtofentry(new Date(newdate).toISOString().split("T")[0]);
  };

  const postUserJournal = () => {
    const data = {
      dtofentry: new Date(dtofentry).toISOString(),
      balcohol: balcohol,
      bmarijuana: bmarijuana,
      irecovery: whoopdata.recovery,
      dstrain: whoopdata.strain,
      iminutesofsleep: whoopdata.minutesAsleep,
      bwfh: bwfh,
      bsocial: bsocial,
      imentalwellness: imentalwellness,
      iproductivity: iproductivity,
      bworkout: false,
      iworkouttype: iworkouttype,
      btraveling: btraveling,
      iwhoopcycleid: whoopdata.cycleid,
      userid: userid,
    };
    if (completed) {
      dispatch(updateUserJournal(data));
    } else {
      dispatch(insertUserJournal(data));
    }
    setJournalCompleted(true)
  };

  return (
    <div className="dailyjournalcontainer">
      <input
        type={"date"}
        value={dtofentry}
        onChange={(e) => {
          handleDateChange(e.target.value);
        }}
        className="dailyentrydatepicker"
        max={
          new Date(new Date() - new Date().getTimezoneOffset() * 60000)
            .toISOString()
            .split("T")[0]
        }
      />
      <div className="journalentryrow">
        <p className="entrylabel">Alcohol</p>
        <Switch
          checked={balcohol}
          onChange={(e) => {
            setBalcohol(e.target.checked);
          }}
        />
      </div>
      <div className="journalentryrow">
        <p className="entrylabel">Marijuana</p>
        <Switch
          checked={bmarijuana}
          onChange={(e) => {
            setBmarijuana(e.target.checked);
          }}
        />
      </div>
      <div className="journalentryrow">
        <p className="entrylabel">WFH</p>
        <Switch
          checked={bwfh}
          onChange={(e) => {
            setBwfh(e.target.checked);
          }}
        />
      </div>
      <div className="journalentryrow">
        <p className="entrylabel">Social</p>
        <Switch
          checked={bsocial}
          className="numberselect"
          onChange={(e) => {
            setBsocial(e.target.checked);
          }}
        />
      </div>
      <div className="journalentryrow">
        <p className="entrylabel">Mental Wellness</p>
        <CustomizedSelect
          size="small"
          value={imentalwellness}
          onChange={(e) => setImentalwellness(e.target.value)}
        >
          <MenuItem value={1}>1</MenuItem>
          <MenuItem value={2}>2</MenuItem>
          <MenuItem value={3}>3</MenuItem>
          <MenuItem value={4}>4</MenuItem>
          <MenuItem value={5}>5</MenuItem>
          <MenuItem value={6}>6</MenuItem>
          <MenuItem value={7}>7</MenuItem>
          <MenuItem value={8}>8</MenuItem>
          <MenuItem value={9}>9</MenuItem>
          <MenuItem value={10}>10</MenuItem>
        </CustomizedSelect>
      </div>
      <div className="journalentryrow">
        <p className="entrylabel">Productivity</p>
        <CustomizedSelect
          size="small"
          value={iproductivity}
          onChange={(e) => setIproductivity(e.target.value)}
        >
          <MenuItem value={1}>1</MenuItem>
          <MenuItem value={2}>2</MenuItem>
          <MenuItem value={3}>3</MenuItem>
          <MenuItem value={4}>4</MenuItem>
          <MenuItem value={5}>5</MenuItem>
          <MenuItem value={6}>6</MenuItem>
          <MenuItem value={7}>7</MenuItem>
          <MenuItem value={8}>8</MenuItem>
          <MenuItem value={9}>9</MenuItem>
          <MenuItem value={10}>10</MenuItem>
        </CustomizedSelect>
      </div>
      <div className="journalentryrow">
        <p className="entrylabel">Workout</p>
        <CustomizedSelect
          size="small"
          value={iworkouttype}
          onChange={(e) => setIworkouttype(e.target.value)}
        >
          <MenuItem value={1}>None</MenuItem>
          <MenuItem value={2}>Weight</MenuItem>
          <MenuItem value={3}>Cardio</MenuItem>
          <MenuItem value={4}>Athletic</MenuItem>
        </CustomizedSelect>
      </div>
      <div className="journalentryrow">
        <p className="entrylabel">Traveling</p>
        <Switch
          checked={btraveling}
          onChange={(e) => {
            setBtraveling(e.target.checked);
          }}
        />
      </div>
      <button onClick={postUserJournal} className="postdailyentrybtn">
        {journalCompleted ? "Update" : "Post"} Entry
      </button>
    </div>
  );
};

export default DailyJournal;
