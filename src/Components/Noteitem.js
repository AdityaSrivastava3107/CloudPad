import React from 'react'
import axios from 'axios'

const Noteitem = (props) => {
    const token = localStorage.getItem('token');

    const headers = {
      Authorization: `Bearer ${token}`
    };
    const { note } = props
    const delNote = async () => {
        try {
            await axios.delete(`http://localhost:5000/api/notes/deletenote/${note._id}`, { headers })

        } catch (error) {
            console.log(error);
        }

    }
    return (
        <div className="container col-md-3 my-2">
            <div className="card my-3" >
                <div className="card-body">
                    <h5 className="card-title">{note.title}</h5>
                    <h6 className="card-subtitle mb-2 text-body-secondary">{note.tag}</h6>
                    <p className="card-text">{note.description} </p>
                    <div class="d-flex justify-content-between">
                        <a href="/" className="card-link"><i className="fa-solid fa-pen-to-square"></i></a>
                        <a href="/" className="card-link" onClick={delNote}><i className="fa-solid fa-trash-can"></i></a>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Noteitem
