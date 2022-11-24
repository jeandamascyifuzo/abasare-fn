import "./Upload.css";
import React, { useState, useContext } from "react";
import Cloudinary from "./components/Upload/";

function FileUpload() {
  const [passport, setPassport] = useState(""); // storing the uploaded file
  const [pass, setPass] = useState(""); // storing the uploaded passport file
  const [highCert, setHighCert] = useState(""); // storing the uploaded Highschool file
  const [bacDegree, setBacDegree] = useState(""); // storing the uploaded Bachelors degree file
  const [bachDeg, setBachDeg] = useState("");
  const [transcript, setTranscript] = useState(""); // storing the uploaded transcript file
  const [cv, setCv] = useState(""); // storing the uploaded German lang certificate file
  const [germCert, setGermCert] = useState(""); // storing the uploaded German lang certificate file

  const [motivation, setMotivation] = useState("");
  const [otherLang, setOtherLang] = useState("");

  // storing the recived files from backend
  const [progressPassport, setProgessPassport] = useState(0); // progess bar
  const [progressHighCert, setProgessHighCert] = useState(0); // progess bar
  const [progressBacDegree, setProgessBacDegree] = useState("");
  const [progressOtherLang, setProgessOtherLang] = useState(""); // progess bar
  const [progressTranscript, setProgessTranscript] = useState(0); // progess bar
  const [progressCv, setProgressCv] = useState(0); // progess bar
  const [progressMotivation, setProgessMotivation] = useState(0); // progess bar
  const [progressGermCert, setProgressGermCert] = useState(0); // progess bar
  return (
    <div>
      <div className="file-upload">
        <b style={{ textAlign: "left" }}>Profile picture</b>
        <Cloudinary docName="profilePicture" />
        <br />
        <hr />
        <b style={{ textAlign: "left" }}>License Image frontSide</b>
        <Cloudinary docName="fontSide" />
        <br />
        <hr />
        <b style={{ textAlign: "left" }}> License Image backSide</b>
        <Cloudinary docName="backSide" />
        <br />
        <hr />
      </div>
    </div>
  );
}

export default FileUpload;
