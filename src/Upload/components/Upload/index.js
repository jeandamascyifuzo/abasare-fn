import CloudinaryUploadWidget from "./components/CloudinaryUploadWidget";

import "./style.css";

export default function Cloudinary(props) {
  return (
    <div className="App">
      <CloudinaryUploadWidget docName ={props.docName}/>
    </div>
  );
}
