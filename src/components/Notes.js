import React, { useEffect, useRef } from "react";
import { useContext , useState } from "react";
import NoteContext from "../context/notes/NoteContext";
import AddNotes from "./AddNotes";
import NoteItem from "./NoteItem";

const Notes = () => {
  const context = useContext(NoteContext);
  const { notes, getNotes , addNote , editNote}  = context;

  const [note, setNote] = useState({id:"",etitle:"", edescription:"", etag : ""})

  useEffect(() => {
    getNotes();
    // eslint-disable-next-line
  }, []);

  const updatenote = (currentNote) => {
    ref.current.click();
    setNote({id : currentNote._id,etitle:currentNote.title, edescription : currentNote.description , etag : currentNote.tag});
  };

  const ref = useRef(null);
  const refClose = useRef(null);

  const handleClick = (e) => {
    editNote(note.id,note.etitle,note.edescription,note.etag);
   refClose.current.click();
    // addNote(note.title, note.description, note.tag);
  };
  const onChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  };

  return (
    <>
      <AddNotes />

      <button
        type="button"
        className="btn btn-primary d-none"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
        ref={ref}
          >
          Launch
      </button>

      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Edit Note
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <form>
                <div className="mb-3">
                  <label htmlFor="title" className="form-label">
                    Title
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="etitle"
                    name="etitle"
                    aria-describedby="emailHelp"
                    onChange={onChange}
                    value={note.etitle}
                    
                  />
                </div>
                <div className="mb-3">
                  <label
                    htmlFor="description"
                    className="form-label"
                    onChange={onChange}
                  >
                    Description
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="edescription"
                    name="edescription"
                    onChange={onChange}
                    value={note.edescription}
                    minLength={5}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label
                    htmlFor="tag"
                    className="form-label"
                    onChange={onChange}
                  >
                    Tag
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="etag"
                    name="etag"
                    onChange={onChange}
                    value={note.etag}
                  />
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
                ref={refClose}
              >
                Close
              </button>
              <button  disabled={note.etitle.length<5 || note.edescription.length<5} type="button" className="btn btn-primary" onClick={handleClick} onChange={onChange}>
                Update Note
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="row my-3">
        <h1>Your Notes</h1>
        <div className="container mx-2">
          {notes.length === 0 && 'No notes to display'}
        </div>
        {notes.map((note) => {
          return (
            <NoteItem key={note._id} updatenote={updatenote} note={note} />
          );
        })}
      </div>
    </>
  );
};

export default Notes;
