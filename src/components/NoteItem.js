import React, { useContext } from "react";
import NoteContext from "../context/notes/NoteContext";


const NoteItem = (props) => {
    const Context = useContext(NoteContext)
    const {deleteNote} = Context;
  const { note } = props;
  return (
    <div className="col-md-3">
      <div className="card my-2">
        <div className="card-body">
          <div className="d-flex align-item-center">
            <h5 className="card-title">{note.title}</h5>
            <i className="fas fa-trash-alt mx-2" onClick={()=>{deleteNote(note._id)}}></i>{" "}
            <i className="far fa-edit"></i>
          </div>
          <p className="card-text">{note.description}</p>
        </div>
      </div>
    </div>
  );
};

export default NoteItem;
