
import NoteContext from "./NoteContext";
import { useState } from "react";

const NoteState = (props)=>{
   const notesInitial = [
    {
      "_id": "613f43728e91cc1619953a2e",
      "user": "613f26690f20ea610b232aab",
      "title": "Death note",
      "description": "L vs Light",
      "tag": "General",
      "Date": "2021-09-13T12:26:26.576Z",
      "__v": 0
    },
    {
      "_id": "613f5dad650f41f4c504f82a",
      "user": "613f26690f20ea610b232aab",
      "title": "jujustsu Kaisen",
      "description": "Gojo Satoru and Sukuna",
      "tag": "You r Weak",
      "Date": "2021-09-13T14:18:21.912Z",
      "__v": 0
    },
    {
      "_id": "613f68183185566440f5bbfd",
      "user": "613f26690f20ea610b232aab",
      "title": "Attack on Titan",
      "description": "Eren Yaegar And Levi Ackerman",
      "tag": "Tatakae and  Fidget Spinner",
      "Date": "2021-09-13T15:02:48.670Z",
      "__v": 0
    },
    {
      "_id": "613f68183185566440f5bbfd",
      "user": "613f26690f20ea610b232aab",
      "title": "Attack on Titan",
      "description": "Eren Yaegar And Levi Ackerman",
      "tag": "Tatakae and  Fidget Spinner",
      "Date": "2021-09-13T15:02:48.670Z",
      "__v": 0
    },
    {
      "_id": "613f68183185566440f5bbfd",
      "user": "613f26690f20ea610b232aab",
      "title": "Attack on Titan",
      "description": "Eren Yaegar And Levi Ackerman",
      "tag": "Tatakae and  Fidget Spinner",
      "Date": "2021-09-13T15:02:48.670Z",
      "__v": 0
    }
  ]
  const [notes, setNotes] = useState(notesInitial)
 
    return(
        <NoteContext.Provider value={{notes,setNotes}}>
            {props.children}
        </NoteContext.Provider>
    )   
}

export default NoteState;