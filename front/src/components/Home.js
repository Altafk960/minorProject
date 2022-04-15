import React, { useState, useEffect } from "react";
import Web3 from "web3";
import ipfs from "../ipfs";
import classes from "./Home.module.css";
import Meme from "../abis/Meme.json";

const Home = () => {
  const [buffer, setBuffer] = useState("");
  const [fileName, setFileName] = useState("");
  const [memeHash, setMemeHash] = useState("");
  const [account, setAccount] = useState(null);
  const [contract, setContract] = useState(null);

  useEffect(() => {
    async function load() {
      const web3 = new Web3(Web3.givenProvider || "http://localhost:7545");
      const accounts = await web3.eth.requestAccounts();
      setAccount(accounts[0]);
      console.log(accounts);
      const networkId = await web3.eth.net.getId();
      console.log(networkId);
      const networkData = Meme.networks[networkId];
      console.log(networkData);
      if (networkData) {
        const contract = new web3.eth.Contract(Meme.abi, networkData.address);
        setContract(contract);
        const memeHash = await contract.methods.get().call();
        setMemeHash(memeHash);
        console.log(memeHash);
      } else {
        window.alert("Smart contract not deployed to detected network.");
      }
    }
    load();
  }, []);

  const fileSubmitHandler = async (event) => {
    event.preventDefault();
    const result = await ipfs.add(buffer);
    console.log(result);
    contract.methods
      .set(result.path)
      .send({ from: account })
      .then((r) => {
        setMemeHash(result.path);
      });
    
    
    console.log(fileName);
    console.log(memeHash);
    
    // console.log(localStorage.getItem("user"));

    // console.log(body);
     
    fetch("http://localhost:8080/myUploads", {
      method: "POST",
      body: JSON.stringify({
      fileName: fileName,
      hash: memeHash,
      userId: localStorage.getItem("user"),
    }),
      headers: {
        "Authorization": localStorage.getItem("token"),
        "Content-Type": "application/json"
      }
    }).then(res => {
      console.log(res);
    })
   
    
  };

  const captureFile = (event) => {
    event.preventDefault();
  
    const fileName = event.target.files[0].name;
    const file = event.target.files[0];
    
    const reader = new window.FileReader();
    reader.readAsArrayBuffer(file);
    reader.onloadend = () => {
      console.log(reader.result);
      const buff = new Uint8Array(reader.result);
      setBuffer(buff);
      setFileName(fileName);
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
