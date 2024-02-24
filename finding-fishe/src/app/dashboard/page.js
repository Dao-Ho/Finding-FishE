"use client";
import { useRef, useState } from "react";
import axios from 'axios';

export default function Dashboard() {
  //state to store the file
  const fileInput = useRef(null);

  // State to store the base64
  const [base64, setBase64] = useState(null);


  const handleUpload = () => {
    console.log("Button clicked!");
    // trigger the click event of the file input
    fileInput.current.click();
  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];

    if (file) {
      const reader = new FileReader();

      reader.onloadend = () => {
        // Convert the image to base64
        const base64String = reader.result.split(",")[1];

        // Update state with the encoded string
        setBase64(base64String);

        // Create a JSON object with the base64 data
        const jsonData = {
          imageName: file.name,
          imageBase64: base64String,
        };

        // Convert the JSON object to a JSON string
        const jsonString = JSON.stringify(jsonData);

        // You can now use the jsonString as needed, for example, send it to a server.
        console.log(jsonString);

        sendJsonToBackend(jsonString);
      };

      reader.readAsDataURL(file);
    }
  };

  const sendJsonToBackend = async (jsonString) => {
    try {
      const response = await axios.post('/receive_json', {
        jsonData: jsonString,
      });

      console.log('JSON data sent successfully:', response.data);
    } catch (error) {
      console.error('Error sending JSON data:', error);
    }
  };


  return (
    <div className="w-screen h-screen bg-[#ecf2fc]">
      <div
        id="uploadContainer"
        className="flex h-[90vh] w-[20vw] rounded-[1vw] bg-white translate-x-[77.5vw] translate-y-[5vh] justify-center"
      >
          <button
            onClick={handleUpload}
            className="bg-[#164e86] w-[17vw] h-[17vw] mt-[3vh] rounded-[1vw] text-white"
          >
          <input
            ref={fileInput}
            type="file"
            style={{ display: "none" }}
            onChange={handleFileChange}
          />
            upload
          </button>
      </div>
    </div>
  );
}
