import React from 'react'
import axios from 'axios'
import { useState } from 'react';
const AddNoteForm = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [tag, setTag] = useState('');
  const [notes, setNotes] = useState([]);

  const token = localStorage.getItem('auth-token');

  const headers = {
    'auth-token': token
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    

    axios.post('http://localhost:5000/api/notes/addnote', { title, description, tag }, { headers })
      .then((response) => {
        const newNote = response.data;
        setNotes([...notes, newNote]);
        setTitle('');
        setDescription('');
        setTag('');
      })
      .catch((error) => {
        // Handle any errors that occur during the request
        console.error(error);
      });
  }
  return (
    <form onSubmit={handleSubmit}>
      <div className="container my-2" style={{ width: '500px' }}>
        <label htmlFor="title">Title:</label>
        <input type="text" id="title" name="title" value={title} onChange={(event) => setTitle(event.target.value)}  style={{ width: '300px' }}/>
      </div>

      <div className="container my-2"  style={{ width: '1000px' }}>
        <label htmlFor="description">Description:</label>
        <textarea id="description " rows='10' name="description" value={description} onChange={(event) => setDescription(event.target.value)}  style={{ width: '1000px' }}/>
      </div>

      <div className="container my-2" style={{ width: '500px' }}>
        <label htmlFor="tag">Tag:</label>
        <input type="text" id="tag" name="tag" value={tag} onChange={(event) => setTag(event.target.value)}  style={{ width: '300px' }}/>
      </div>


      <button type="button" onClick= {handleSubmit} class="btn btn-outline-primary">Add Note</button>
    </form>
  )
}

export default AddNoteForm
