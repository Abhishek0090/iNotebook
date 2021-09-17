import React, { useEffect } from "react";
import { useContext } from "react";
import NoteContext from "../context/notes/NoteContext";
import AddNotes from "./AddNotes";
import NoteItem from "./NoteItem";

const Notes = () => {
  const context = useContext(NoteContext);
  const { notes , getNotes } = context;
  useEffect(()=>{
    getNotes(); 
  },[])
  return (
      <>
        <AddNotes />
    <div className="row my-3">
      <h1>Your Notes</h1>
      {notes.map((note) => {
        return <NoteItem key = {note._id} note={note} />;
      })}
    </div>
    </>
  );
};

export default Notes;
