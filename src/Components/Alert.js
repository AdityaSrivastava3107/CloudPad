import React from 'react'
import { useContext } from 'react'
import noteContext from '../context/notes/noteContext'
const Alert = () => {
    const context = useContext(noteContext)
    console.log(context)
    const { alert, showAlert } = context ?? ""

    const handleCloseAlert=()=>{
        showAlert("")
    }
    return (
       alert && <div className="alert alert-info" role="alert">
            {alert.msg}
            <button type="button" onClick={handleCloseAlert} class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        </div>
    )
}

export default Alert

