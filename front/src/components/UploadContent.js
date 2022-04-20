import classes from "./UploadContent.module.css";
import { saveAs } from "file-saver";
// const fs = require("fs");
const {  decrypt } = require('./crypto');

function UploadContent(props) {


  const url = `https://ipfs.infura.io/ipfs/${props.hash}`;
  const fileName = props.name;
  const mimeType = props.mimeType;

  const downloadURL = (data, fileName) => {
    const a = document.createElement("a");
    a.href = data;
    a.download = fileName;
    document.body.appendChild(a);
    a.style.display = "none";
    a.click();
    a.remove();
  };

  const downloadBlob = (data, fileName, mimeType) => {
    const blob = new Blob([data], {
      type: mimeType,
    });

    const url = window.URL.createObjectURL(blob);

    downloadURL(url, fileName);

    setTimeout(() => window.URL.revokeObjectURL(url), 1000);
  };





  const saveFile = async () => {
    console.log(props.hash);
    const res = await fetch(url);
    console.log(res);
    const response = await res.text();
    // console.log(response);
   //   const buff = await response.arrayBuffer();
    console.log(response.length);
  //   console.log(response);
   // saveAs(url, fileName);
    const text = decrypt(response);
    downloadBlob(text, fileName, mimeType);
  };

  return (
    <div >
      <div className={classes.contentCard}>
        <div className={classes.fileDetails}>

          

          <div className={classes.fileName}>
            <h2>{props.name}</h2>
          </div>
          <div className={classes.userDetails}>
            <p>
              Posted by: {props.userId}
            </p>
            <p> Date: {props.date}</p>{" "}
          </div>
        </div>

        <div className={classes.download}>
          <button className={classes.btnDownload} onClick={saveFile}>Download File</button>
        </div>
      </div>
    </div>
  );
}

export default UploadContent;
