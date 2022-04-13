import React, { useState, useEffect } from "react";
import Web3 from 'web3';
import ipfs from "../ipfs";
import classes from "./Home.module.css";
import Meme from '../abis/Meme.json';

const Home =  () => {

  const [buffer, setBuffer] = useState("");
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
           // this.setState({ contract })
           setContract(contract);
        //   console.log(contract);
           const memeHash = await contract.methods.get().call();
           setMemeHash(memeHash);
           console.log(memeHash);
         } else {
           window.alert("Smart contract not deployed to detected network.");
       }
    }
    load();
  },[]);
   


  // async function loadWeb3() {
  //   if (window.ethereum) {
  //     window.web3 = new Web3(window.ethereum)
  //     await window.ethereum.enable();
  //   }
  //   else if (window.web3) {
  //     window.web3 = new Web3(window.web3.currentProvider)
  //   }
  //   else {
  //     window.alert('Non-Ethereum browser detected. You should consider trying MetaMask!')
  //   }
  // }

 

  // THIS PART REQUIRE ATTENTION

  const fileSubmitHandler =async (event) => {
    event.preventDefault();
    const result = await ipfs.add(buffer);
    console.log(result);
   contract.methods
     .set(result.path)
     .send({ from: account })
     .then((r) => {
       setMemeHash(result.path);
     });
};
    


  const captureFile = (event) => {
    event.preventDefault();
    const file = event.target.files[0];
    const reader = new window.FileReader();

    reader.readAsArrayBuffer(file);
    reader.onloadend = () => {
      console.log(reader.result);
      const buff = new Uint8Array(reader.result);
      setBuffer(buff);
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
