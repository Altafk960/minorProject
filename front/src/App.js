import './App.css';
import { Routes, Route } from "react-router-dom";
import NavBar from './components/NavBar';
import Login from './components/Login';
import Signup from './components/Signup';
import Home from './components/Home';
import Protected from './components/Protected';
import MyUploads from './components/MyUploads';

function App() {

  return (
    <>
      <NavBar></NavBar>
      <Routes>
        <Route path="/login" element={<Login></Login>}></Route>
        <Route path="/signup" element={<Signup></Signup>}></Route>
        <Route path="/myUploads" element={<MyUploads></MyUploads>} ></Route>
        <Route
          path="/home"
          element={
            <Protected>
              <Home />
            </Protected>
          }
        ></Route>
      </Routes>
      <main></main>
    </>
  );

}

export default App;
