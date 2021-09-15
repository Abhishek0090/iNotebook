import React,{ useContext, useEffect } from 'react'
import NoteContext from '../context/notes/NoteContext'


export default function About() {
    const a = useContext(NoteContext)
    useEffect(() => {
      a.update();
       // eslint-disable-next-line
    }, [])
    return (
        <div>
            This is about {a.state.name} and He is the best {a.state.class}
        </div>
    )
}
