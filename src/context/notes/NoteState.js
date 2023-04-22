import NoteContext from "./noteContext";
import { useState, useEffect } from "react";
import axios from 'axios';
const NoteState = (props) => {
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response  = await axios.get('http://localhost:5000/api/notes/fetchallnotes', { headers: { 'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjQzZWFmZDg5ZTg5YzI5YzBmMjA0ZDc2In0sImlhdCI6MTY4MTgyOTg2NH0.5M1KC3RHcKxaURz-QEETIChLhhEXs3MFfS-P5kAvQUk' } })
      setNotes(response.data)
      } catch (error) {
        console.log(error);
      }
      
    }
    fetchData()
  }, []);
  return (
    <NoteContext.Provider value={{ notes, setNotes }}>
      {props.children}
    </NoteContext.Provider>
  )
}

export default NoteState;                                        
