import React, { useState, useContext } from 'react';
import axios from 'axios';
import './CloudinaryUploadWidget.css'
const ImageUpload = (props) => {
  const [docName, setDocName] = useState()
  const showWidget = () => {

    let widget = window.cloudinary.createUploadWidget({
      cloudName: `mychelon`,
      uploadPreset: `bjng9mru`
    },
      (error, result) => {
        let jsonInfo = {}
        if (!error && result && result.event === "success") {
          console.log("docName:", props.docName);
          switch (props.docName) {
            case "profilePicture":
          jsonInfo["profilePicture"] = result.info.url

              break;
            case "fontSide":
              jsonInfo["fontSide"] = result.info.url
              break;
            case "backSide":
              jsonInfo["backSide"] = result.info.url
              break;
            default:
              break;
          }
console.log(jsonInfo)
          let url = "https://akagera-center.herokuapp.com/upload/"
          axios({
            method: "POST",
            url,
            data: jsonInfo
          })
            .then(function (response) {
              console.log("response", response)
            })
            .catch(function (err) {
              console.log("err", err)
            })
        }
      });
    widget.open()
  }
  return (<div>
    <button onClick={showWidget} id="upload_widget" className="cloudinary-button cloudinary-btn"> Uploa File </button>
  </div>
  );
}

export default ImageUpload;