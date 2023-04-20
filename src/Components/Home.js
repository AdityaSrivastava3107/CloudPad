import React from 'react'
import Notes from './Notes'

const Home = () => {
  return (
    <div className="container my-2" style={{ textAlign: 'center' }}>
      <h2 >Welcome to CloudPad!</h2>
      <form>
        <div className="mb-3" >
          <label htmlFor="exampleInputEmail1" className="form-label">Add a new Note.</label>
          <textarea className="form-control" rows="10"></textarea>
          </div>
        <button type="button" className="btn btn-outline-primary my-1" style={{ textAlign: 'center' }}>Add</button>
        <Notes/>
        </form>
    </div>
  )
}

export default Home
