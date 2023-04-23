import './App.css';
import {
  BrowserRouter as Router,
  Route,
  Routes
} from "react-router-dom";
import About from './Components/About';
import Home from './Components/Home';
import Navbar from './Components/Navbar';
import Login from './Components/Login';
import NoteState from './context/notes/NoteState';
import Signup from './Components/Signup';
import Alert from './Components/Alert';
import { useContext } from 'react';
import noteContext from './context/notes/noteContext';
function App() {
 
  return (
    <>
      <NoteState>
        <Router>
          <Navbar />
          <Alert/>
          <div className="container">
          <Routes>
            <Route exact path="/" element={<Home/>} />
            <Route exact path="/about" element={<About />} />
            <Route exact path="/login" element={<Login/>} />
            <Route exact path="/signup" element={<Signup/>} />
          </Routes>
          </div>
        </Router>
      </NoteState>
    </>
  );
}

export default App;
