import React from 'react'
import Notes from './Notes'
import AddNoteForm from './AddNoteForm'
const Home = () => {
  return (
    <div className="container my-2" style={{ textAlign: 'center' }}>
      <h2 >Welcome to CloudPad!</h2>
      <AddNoteForm />
      <Notes />
    </div>
  )
}

export default Home
