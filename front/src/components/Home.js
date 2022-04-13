import React, { useState, useEffect } from "react";
import Web3 from 'web3';
import ipfs from "../ipfs";
import classes from "./Home.module.css";
import Meme from '../abis/Meme.json';

const Home = () => {
  const [buffer, setBuffer] = useState("");
  const [memeHash, setMemeHash] = useState("");
  const [account, setAccount] = useState(null);
  const [contract, setContract] = useState(null);
  const [web3, setWeb3] = useState(null);


  useEffect(() => {
    loadWeb3();
    loadBlockchainData();
  });

  async function loadWeb3() {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum)
      await window.ethereum.enable()
    }
    else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider)
    }
    else {
      window.alert('Non-Ethereum browser detected. You should consider trying MetaMask!')
    }
  }

  async function loadBlockchainData() {
    const web3 = window.web3
    // Load account
    const accounts = await web3.eth.getAccounts()
    // this.setState({ account: accounts[0] })
    setAccount(accounts[0]);
    const networkId = await web3.eth.net.getId()
    const networkData = Meme.networks[networkId]
    if(networkData) {
      const contract = new web3.eth.Contract(Meme.abi, networkData.address)
      // this.setState({ contract })
      setContract(contract);
      const memeHash = await contract.methods.get().call()
      setMemeHash(memeHash);
    } else {
      window.alert('Smart contract not deployed to detected network.')
    }
  }

  // THIS PART REQUIRE ATTENTION

  const fileSubmitHandler =async (event) => {
    event.preventDefault();
    const res = await ipfs.add(buffer)
    console.log(res.path);
    ;
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
