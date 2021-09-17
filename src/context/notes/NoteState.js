import NoteContext from "./NoteContext";
import { useState } from "react";

const NoteState = (props) => {
  const host = "http://localhost:5000";
  const notesInitial = [];
  const [notes, setNotes] = useState(notesInitial);

  //Get all notes
  const getNotes = async () => {
    //API call
    const response = await fetch(`${host}/api/notes/fetchallnotes`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjEzZjI2NjkwZjIwZWE2MTBiMjMyYWFiIn0sImlhdCI6MTYzMTUzMjM5OH0.iJ9grpr_7_YTODAXmNX1-rwyLX5GFX3ybOPedTgeXNw",
      },
    });
    const json = await response.json();
    console.log(json);
    setNotes(json)
  };

  //Add a note
  const addNote = async (title, description, tag) => {
    //API call
    const response = await fetch(`${host}/api/notes/addnote`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjEzZjI2NjkwZjIwZWE2MTBiMjMyYWFiIn0sImlhdCI6MTYzMTUzMjM5OH0.iJ9grpr_7_YTODAXmNX1-rwyLX5GFX3ybOPedTgeXNw",
      },
      body: JSON.stringify({title,description,tag}),
    });
    const json = await response.json();
    console.log(json)

    console.log("Adding a new note");
    const note = {
      _id: "613f68183185566440f5bbfd1",
      user: "613f26690f20ea610b232aab",
      title: title,
      description: description,
      tag: tag,
      Date: "2021-09-13T15:02:48.670Z",
      __v: 0,
    };
    setNotes(notes.concat(note)); //returns an array
  };

  //Delete a note
  const deleteNote = async (id) => {
    //API call
    const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjEzZjI2NjkwZjIwZWE2MTBiMjMyYWFiIn0sImlhdCI6MTYzMTUzMjM5OH0.iJ9grpr_7_YTODAXmNX1-rwyLX5GFX3ybOPedTgeXNw",
      },
    });
    const json = await response.json();
    console.log(json)
    const newNotes = notes.filter((note) => {
      return note._id !== id;
    });
    setNotes(newNotes);
  };

  //Edit a note
  const editNote = async (id, title, description, tag) => {
    //API call
    const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjEzZjI2NjkwZjIwZWE2MTBiMjMyYWFiIn0sImlhdCI6MTYzMTUzMjM5OH0.iJ9grpr_7_YTODAXmNX1-rwyLX5GFX3ybOPedTgeXNw",
      },
      body: JSON.stringify({title,description,tag})
    });
    const json = await response.json();
    console.log(json)

    let newNotes = JSON.parse(JSON.stringify(notes))

    //Logic to edit in client
    for (let index = 0; index < newNotes.length; index++) {
      const element = newNotes[index];
      if (element._id === id) { 
        newNotes[index].title = title;
        newNotes[index].description = description;
        newNotes[index].tag = tag;
        break;
      }
    }
    setNotes(newNotes);
  };

  return (
    <NoteContext.Provider value={{ notes, addNote, deleteNote, editNote ,getNotes}}>
      {props.children}
    </NoteContext.Provider>
  );
};

export default NoteState;
