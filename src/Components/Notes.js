import React from 'react'
import { useContext } from 'react'
import noteContext from '../context/notes/noteContext'
import Noteitem from './Noteitem'
const Notes = () => {
    const context = useContext(noteContext)
    const { notes } = context
    console.log(notes)
    return (
        <div className="row my-3">
            <label htmlFor="exampleInputPassword1" className="form-label my-2">Your previous Notes.</label>
            {notes.map((note) => {
                return <Noteitem key = {note._id} note={note} />
            })}
        </div>
    )
}

export default Notes


