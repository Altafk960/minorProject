import React, { useEffect, useState } from "react";
import UploadContent from "./UploadContent";
import Card from "./Card";
import NavBar from './NavBar';
import classes from "./MyUploads.module.css";

const MyUploads = () => {
  const [uploads, setUploads] = useState([]);
  useEffect(() => {
    fetch("http://localhost:8080/myUploads", {
      method: "GET",
      headers: { Authorization: localStorage.getItem("token") },
    })
      .then((res) => {
        return res.json();
      })
      .then((response) => {
        setUploads(response);
      });
  }, []);

  // const uploads = [{_id:1, fileName:'hello.txt',date:'12/12/12',userId:'12',mimeType:'text/plain'}]


  return (
    <div className={classes.bgImg}>
      {/* {uploads.map(upload => {
        return   <p> {upload.hash}   </p>
    })} */}
    <NavBar></NavBar>
      <Card >
        {uploads.length > 0 &&
          uploads.map((upload) => {
            return <UploadContent key={upload._id} name={upload.fileName} hash={upload.hash} date={upload.date} userId={upload.userId} mimeType={upload.fileType}></UploadContent>;
          })}
        {uploads.length === 0 && <h2 className={classes.noData}>No FIles Uploaded</h2>}
      </Card>
    </div>
  );
};

export default MyUploads;
