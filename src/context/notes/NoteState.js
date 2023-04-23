import NoteContext from "./noteContext";
import { useState, useEffect } from "react";
import axios from 'axios';
const NoteState = (props) => {
  const [notes, setNotes] = useState([]);
  const token = localStorage.getItem('auth-token');
  
  const [alert, setAlert] = useState(null)
   
  const showAlert=(message)=>{
       setAlert({
        msg : message
       })
  }
  
  useEffect(() => {
    const fetchData = async () => {
      
    const headers = {
      'auth-token' :  token
    };

      try {
        const response  = await axios.get('http://localhost:5000/api/notes/fetchallnotes', { headers } )
      setNotes(response.data)
      } catch (error) {
        console.log(error);
      }
      
    }
    fetchData()
  }, []);

  
  return (
    <NoteContext.Provider value={{ notes, setNotes, alert, showAlert }}>
      {props.children}
    </NoteContext.Provider>
  )
}

export default NoteState;                                        
