import './App.css';
import { Routes, Route } from "react-router-dom";
import NavBar from './components/NavBar';
import Login from './components/Login';
import Signup from './components/Signup';
import Home from './components/Home';
import Protected from './components/Protected';
import MyUploads from './components/MyUploads';
import {useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";
import { loginActions } from './components/store/store';


function App() {
  // const navigate = useNavigate();
  // const dispatch = useDispatch();
  // const isLoggedIn = useSelector((state) => state.login.isLoggedIn);
  // console.log(isLoggedIn);

  // useEffect(() => {
  //   const authentication = async() => {
  //     const token = localStorage.getItem('token');

  //       const response = await fetch('http://localhost:8080/auth', {
  //         method: 'GET',
  //         headers: {
  //           'Content-Type': 'application/json',
  //           'Authorization': token
  //         }
  //       });
  //       const data = await response.json();
  //       console.log(data);
  //       if(data.message!=="INVALID_TOKEN" && data.message!=="TOKEN_AUTHENTICATION_FAILED"){
  //          console.log("hello")         
  //         dispatch(loginActions.onLogin())
  //         navigate('/home');
  //       }
      
  //   }
  //   authentication();},[])
  

  return (
    <>
      {/* <NavBar></NavBar> */}
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
