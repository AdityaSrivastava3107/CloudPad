import React from 'react'
import axios from 'axios'
import { useState } from 'react';
const AddNoteForm = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [tag, setTag] = useState('');
  const token = localStorage.getItem('auth-token');

  const headers = {
    Authorization: `Bearer ${token}`
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    axios.post('http://localhost:5000/api/notes/addnote', { title, description, tag }, { headers })
      .then((response) => {
        // Handle the response from the backend API
        localStorage.setItem('authtoken', response.data.authtoken);
        console.log(response.data);
      })
      .catch((error) => {
        // Handle any errors that occur during the request
        console.error(error);
      });
  }
  return (
    <form onSubmit={handleSubmit}>
        <div className="mb-3" >
          <label htmlFor="exampleInputEmail1" className="form-label">Add a new Note.</label>
          <textarea className="form-control" rows="10"></textarea>
          </div>
        <button type="button" className="btn btn-outline-primary my-1" onClick={handleSubmit} style={{ textAlign: 'center' }}>Add</button>
        </form>
  )
}

export default AddNoteForm
