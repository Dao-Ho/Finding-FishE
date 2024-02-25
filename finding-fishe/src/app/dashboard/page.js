"use client";
import { useRef, useState } from "react";
import axios from "axios";
import { RiUpload2Fill } from "react-icons/ri";

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

  const handleFileChange = async (e, intValue) => {
    const file = e.target.files[0];

    if (file) {
      const reader = new FileReader();

      reader.onloadend = () => {
        // Convert the image to base64
        const base64String = reader.result.split(",")[1];

        // Update state with the encoded string
        setBase64(base64String);

        // Create a JSON object with the base64 data and the int value
        const jsonData = {
          imageName: file.name,
          imageBase64: base64String,
        };

        // Convert the JSON object to a JSON string
        const jsonString = JSON.stringify(jsonData);

        // You can now use the jsonString as needed, for example, send it to a server.
        console.log(jsonString);
        
        if (intValue === 1) {
        sendReceiptToBackend(jsonString);
        } else {
          sendPolicyToBackend(jsonString);
        }
      }; 

      reader.readAsDataURL(file);
    }
  };

  const sendReceiptToBackend = async (jsonString) => {
    try {
      const response = await axios.post("http://localhost:8080/receipt_json", {
        jsonData: jsonString,
      });

      console.log("receipt JSON sent successfully:", response.data.yourData);
    } catch (error) {
      console.error("Error sending JSON data:", error);
    }
  };

  const sendPolicyToBackend = async (jsonString) => {
    try {
      const response = await axios.post("http://localhost:8080/policy_json", {
        jsonData: jsonString,
      });

      console.log("policy JSON data sent successfully:", response.data);
    } catch (error) {
      console.error("Error sending JSON data:", error);
    }
  };

  return (
    <div className="w-screen h-screen bg-[#ecf2fc]">
      <div
        id="uploadContainer"
        className="flex-row h-[90vh] w-[20vw] rounded-[1vw] bg-white translate-x-[77.5vw] translate-y-[5vh] justify-center space-y-[2vh]"
      >
        <div className="flex w-full h-inline justify-center">
          <button
            onClick={() => handleUpload(1)}
            className="bg-[#f5f9fd] w-[17vw] h-[17vw] mt-[3vh] rounded-[1vw] text-white flex items-center justify-center text-[#2770d6]
            font-bold text-[1vw] hover:bg-[#e4eefc] hover:text-[#2f69fd] transition duration-300 ease-in-out relative"
          >
            <input
              ref={fileInput}
              type="file"
              style={{ display: "none" }}
              onChange={handleFileChange}
            />
            <RiUpload2Fill
              size={100}
              color="#2770d6"
              className="absolute -translate-y-[1vh]"
            />
            <h1 className="translate-y-[7vh]">Add new receipt</h1>
          </button>
        </div>
        <div id="disclaimer div" className="w-full px-[1.5vw]">
          <div
            id="disclaimer box"
            className="w-full bg-[#f5f9fd] rounded-[1vw]"
          >
            <h1 className="text-[0.9vw] font-bold text-[#2770d6] px-[1vw] pt-[1vw]">
              Disclaimer
            </h1>
            <h1 className="text-[0.75vw] font-medium text-[black] px-[1vw] pb-[1vw]">
              please upload a receipt that is legible and in sufficient lighting
            </h1>
          </div>
        </div>
        <div id="company policy" className="flex w-full justify-center font-bold text-[1.2vw]">
        <h1>
          Company Policy
        </h1>
        </div>
        <div className="flex w-full justify-center">
          <button
            onClick={() => handleUpload(2)}
            className="bg-[#2770d6] w-[17vw] h-[10vh] flex items-center justify-center rounded-xl cursor-pointer relative overflow-hidden transition-all duration-300 ease-in-out shadow-md hover:scale-105 hover:shadow-lg before:absolute before:top-0 before:-left-full before:w-full before:h-full before:bg-gradient-to-r before:from-[#06367a] before:to-[#052758] before:transition-all before:duration-500 before:ease-in-out before:z-[-1] before:rounded-xl hover:before:left-0 text-[#fff]"
          >
            <input
              ref={fileInput}
              type="file"
              style={{ display: "none" }}
              onChange={handleFileChange}
            />
            <h1 className="font-bold">Upload Company Policy</h1>
          </button>
        </div>
        <div id="disclaimer div" className="w-full px-[1.5vw] pt-[1vh]">
          <div
            id="disclaimer box"
            className="w-full bg-[#f5f9fd] rounded-[1vw]"
          >
            <h1 className="text-[0.9vw] font-bold text-[#2770d6] px-[1vw] pt-[1vw]">
              Changed Your Spending Policy?
            </h1>
            <h1 className="text-[0.75vw] font-medium text-[black] px-[1vw] pb-[1vw] pt-[1.5vh]">
              Reupload your new policy with a click of a button above! Don't worry, we got the rest :)
            </h1>
          </div>
        </div>
      </div>
    </div>
  );
}
