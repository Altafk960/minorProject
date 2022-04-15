import classes from './UploadContent.module.css';
import { saveAs } from 'file-saver';

const UploadContent = (props) => {

  const url = `https://ipfs.infura.io/ipfs/${props.hash}`;
  const fileName = props.name;
  // var month = props.date.getMonth() + 1; //months from 1-12
  // var day = props.date.getDate();
  //   var year = props.date.getFullYear();
    
  //   var newDate = day + "/" + month + "/" + year;

  const saveFile = () => {
    saveAs(url, fileName);
  };

  return (
    <div className={classes.contentCard}>
      <div className={classes.fileDetails}>
        <div className={classes.userDetails}>
          <p>
            posted by {props.userId} on {props.date}
          </p>{" "}
        </div>
        <div className={classes.fileName}>
          <h2>{props.name}</h2>
        </div>
      </div>

      <div className={classes.download}>
        <button onClick={saveFile}>Download File</button>
      </div>
    </div>
  );
}

export default UploadContent;