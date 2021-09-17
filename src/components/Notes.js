import React, { useEffect, useRef } from "react";
import { useContext , useState } from "react";
import NoteContext from "../context/notes/NoteContext";
import AddNotes from "./AddNotes";
import NoteItem from "./NoteItem";

const Notes = () => {
  const context = useContext(NoteContext);
  const { notes, getNotes , addNote} = context;

  const [note, setNote] = useState({etitle:"", edescription:"", etag : ""})

  useEffect(() => {
    getNotes();
    // eslint-disable-next-line
  }, []);

  const updatenote = (currentNote) => {
    ref.current.click();
    setNote({etitle:currentNote.title, edescription : currentNote.description , etag : currentNote.tag});
  };

  const ref = useRef(null);

  const handleClick = (e) => {
    console.log("updating the note", note)
    e.preventDefault();
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
          Launch demo modal
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
              >
                Close
              </button>
              <button type="button" className="btn btn-primary" onClick={handleClick} onChange={onChange}>
                Update Note
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="row my-3">
        <h1>Your Notes</h1>
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
