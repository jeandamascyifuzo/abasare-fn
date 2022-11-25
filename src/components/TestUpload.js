import { useState } from "react";

// import cloudinary from 'cloudinary'
const TestUpload = () =>{

  const [image, setImage] = useState([])
  const [imageToRemove, setImageToRemove] = useState(null)

  const handleUpload = () =>{
    var myWidget = window.cloudinary.createUploadWidget({
      cloudName: 'mychelon', 
      uploadPreset: 'bjng9mru'}, (error, result) => { 
        if (!error && result && result.event === "success") { 
          console.log('Done! Here is the image info: ', result.info); 
          setImage((prev)=> [...prev, {url: result.info.url, public_id: result.info.public_id}])
        }
      }
    )
    myWidget.open()
  }
  return(
    <div className="justify-center items-center">
      <h1 className="text-center uppercase">Upload Image using Widget</h1>
      <div className="justify-center items-center">
      {/* <button className="rounded-lg p-2 bg-blue-600 text-white" onClick={()=>handleUpload()}>upload</button> */}
      <button id="upload_widget" class="cloudinary-button" onClick={()=>handleUpload()}>Upload files</button>
      </div>
      </div>
  )
}
export default TestUpload