import './App.css';
import { Routes, Route } from "react-router-dom";
import NavBar from './components/NavBar';
import Login from './components/Login';
import Signup from './components/Signup';
import Home from './components/Home';

function App() {

  return (
    <>
      <NavBar></NavBar>
      <Routes>
        <Route path="/login" element={<Login></Login>} ></Route>
        <Route path="/signup" element={<Signup></Signup>}></Route>
        <Route path="/home" element={<Home />}></Route>
      </Routes>
      <main></main>
    </>
  );

}

export default App;
