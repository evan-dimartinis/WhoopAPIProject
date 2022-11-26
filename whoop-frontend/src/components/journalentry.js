import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { postJournalEntry } from "../store/journalentrySlice";
import "./journalentry.css";

const JournalEntry = (props) => {
  const journaldata = useSelector((state) => state.JournalEntry);
  const userid = useSelector((state) => state.Auth.userid)
  const dispatch = useDispatch()
  const [bcompleted, setBcompleted] = useState(false);
  const [stext, setStext] = useState("");

  useEffect(() => {
    setStext(journaldata.stext);
    setBcompleted(journaldata.bcompleted);
  }, [journaldata.stext, journaldata.bcompleted]);

  const post = () => {
    dispatch(postJournalEntry({
        userid: userid,
        stext: stext.split("'").join('><!')
    }))
  }

  return (
    <div className="JournalEntryDiv">
      <textarea className="JournalEntryInput" value={stext} onChange={(e) => setStext(e.target.value)}></textarea>
      <button className="PostJournalBtn" onClick={post}>Post</button>
    </div>
  );
};

export default JournalEntry;
