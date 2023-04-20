import React from 'react'

const Noteitem = (props) => {
    const { note } = props
    return (
        <div className="container my-2">
            <div class="card" >
                <div class="card-body">
                    <h5 class="card-title">{note.title}</h5>
                    <h6 class="card-subtitle mb-2 text-body-secondary">{note.tag}</h6>
                    <p class="card-text">{note.description}</p>
                    <a href="/" class="card-link">Update Note</a>
                    <a href="/" class="card-link">Delete Note</a>
                </div>
            </div>
        </div>
    )
}

export default Noteitem
