
import NoteContext from "./NoteContext";
import { useState } from "react";

const NoteState = (props)=>{
    const s1 = {
        "name" :  "Abhishek",
        "class" :  "Hacker"
    }
    const [state, setstate] = useState(s1)
    const update = ()=>{
        setTimeout(() => {
            setstate({
                "name" :  "Ackerman",
                "class" :  "Soldier"
            })
        }, 1000);
    }
    return(
        <NoteContext.Provider value={{state,update}}>
            {props.children}
        </NoteContext.Provider>
    )   
}

export default NoteState;