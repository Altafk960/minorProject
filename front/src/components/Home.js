import React, { useState } from "react";
import ipfs from "../ipfs";
import classes from "./Home.module.css";

const Home = () => {
    const [buffer, setBuffer] = useState("");
    
    // THIS PART REQUIRE ATTENTION 

    const fileSubmitHandler = (event) => {
      event.preventDefault();
      ipfs.files.add(this.state.buffer, (error, result) => {
        if (error) {
          console.error(error);
          return;
        }
        this.simpleStorageInstance
          .set(result[0].hash, { from: this.state.account })
          .then((r) => {
            return this.setState({ ipfsHash: result[0].hash });
            console.log("ifpsHash", this.state.ipfsHash);
          });
      });
  };

  const captureFile = (event) => {
event.preventDefault();
const file = event.target.files[0];
const reader = new window.FileReader();
    
 reader.readAsArrayBuffer(file);
 reader.onloadend = () => {
    
     console.log(reader.result);
     setBuffer(reader.result);
 
 };
  };

  return (
    <>
      <div className={classes.fileForm}>
        <form onSubmit={fileSubmitHandler} encType="multipart/form-data">
          <label> Upload your file</label>
          <input type="file" onChange={captureFile}></input>
          <button type="submit">Upload</button>
        </form>
      </div>
    </>
  );
};

export default Home;
