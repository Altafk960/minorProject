import React, { useEffect, useState } from "react";
import UploadContent from "./UploadContent";
import Card from "./Card";

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


  return (
    <>
      {/* {uploads.map(upload => {
        return   <p> {upload.hash}   </p>
    })} */}
      <Card>
        {uploads.length > 0 &&
          uploads.map((upload) => {
            return <UploadContent key={upload._id} name={upload.fileName} hash={upload.hash} date={upload.date} userId={upload.userId} mimeType={upload.fileType}></UploadContent>;
          })}
        {uploads.length === 0 && <p>do not exist</p>}
      </Card>
    </>
  );
};

export default MyUploads;
