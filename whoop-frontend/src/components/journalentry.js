import React from "react";
import "./journalentry.css"

const JournalEntry = (props) => {

    return (
        <div className="JournalEntryDiv">
            <textarea className="JournalEntryInput" ></textarea>
            <button className="PostJournalBtn">Post</button>
        </div>
    )
}

export default JournalEntry;