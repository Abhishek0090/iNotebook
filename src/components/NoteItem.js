import React, { useContext } from "react";
import NoteContext from "../context/notes/NoteContext";


const NoteItem = (props) => {
  const {showAlert} = props;
    const Context = useContext(NoteContext)
    const {deleteNote} = Context;
  const { note , updatenote} = props;
  return (
    <div className="col-md-3">
      <div className="card my-2">
        <div className="card-body">
          <div className="d-flex align-item-center">
            <h5 className="card-title">{note.title}</h5>
            <i className="fas fa-trash-alt mx-2" onClick={()=>{deleteNote(note._id);showAlert("Deleted Successfully","success")}}></i>{" "}
            <i className="far fa-edit" onClick={()=>{updatenote(note)}}></i>
          </div>
          <p className="card-text">{note.description}</p>
        </div>
      </div>
    </div>
  );
};

export default NoteItem;
