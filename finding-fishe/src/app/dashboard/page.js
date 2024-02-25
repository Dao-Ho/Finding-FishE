"use client";
import { useRef, useState, useEffect } from "react";
import axios from "axios";
import { RiUpload2Fill } from "react-icons/ri";
import logo from "../../../public/text copy.png";
import Image from "next/image";
import { createClient } from "@supabase/supabase-js";
import Link from "next/link";

export default function Dashboard() {
  const [receipts, setReceipts] = useState([]);
  //state to store the file
  const fileInputReceipt = useRef(null);
  const fileInputPolicy = useRef(null);

  const supabaseUrl = "https://ozaymeocdtfecytksppu.supabase.co";
  const supabaseKey =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im96YXltZW9jZHRmZWN5dGtzcHB1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDg4NDgxMTAsImV4cCI6MjAyNDQyNDExMH0.RaPchR8AGzUv8HPzRhcICIkOme8x3kZOODcZ3i-MpqI";

  const supabase = createClient(supabaseUrl, supabaseKey);
  // State to store the base64
  const [base64, setBase64] = useState(null);

  useEffect(() => {
    // Fetch data from Supabase when the component mounts
    fetchReceiptsFromSupabase();
  }, []);

  const fetchReceiptsFromSupabase = async () => {
    try {
      const { data, error } = await supabase.from("receipts").select("*");
      console.log("Fetched data:", data); // Log the fetched data
      if (error) {
        console.error("Error fetching receipts from Supabase:", error);
      } else {
        setReceipts(data);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleUploadReceipt = () => {
    console.log("Button clicked!");
    // trigger the click event of the file input
    fileInputReceipt.current.click();
  };

  const handleUploadPolicy = () => {
    console.log("Button clicked!");
    // trigger the click event of the file input
    fileInputPolicy.current.click();
  };

  const handleFileChangeReceipt = async (e) => {
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

        sendReceiptToBackend(jsonString);
      };

      reader.readAsDataURL(file);
    }
  };

  const handleFileChangePolicy = async (e) => {
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

        sendPolicyToBackend(jsonString);
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
    <div className="w-screen h-screen bg-[#ecf2fc] overscroll-contain">
      {/* sidebar component */}
      <div
        id="uploadContainer"
        className="absolute z-10 flex-row h-[90vh] w-[20vw] rounded-[1vw] bg-white translate-x-[77.5vw] translate-y-[5vh] justify-center space-y-[2vh]"
      >
        <div className="flex w-full h-inline justify-center">
          <button
            onClick={() => handleUploadReceipt()}
            className="bg-[#f5f9fd] w-[17vw] h-[17vw] mt-[3vh] rounded-[1vw] flex items-center justify-center text-[#2770d6]
            font-bold text-[1vw] hover:bg-[#e4eefc] hover:text-[#2f69fd] transition duration-300 ease-in-out relative"
          >
            <input
              ref={fileInputReceipt}
              type="file"
              style={{ display: "none" }}
              onChange={handleFileChangeReceipt}
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
        <div
          id="company policy"
          className="flex w-full justify-center font-bold text-[1.2vw]"
        >
          <h1>Company Policy</h1>
        </div>
        <div className="flex w-full justify-center">
          <button
            onClick={() => handleUploadPolicy()}
            className="bg-[#2770d6] w-[17vw] h-[10vh] flex items-center justify-center rounded-xl cursor-pointer relative overflow-hidden transition-all duration-300 ease-in-out shadow-md hover:scale-105 hover:shadow-lg before:absolute before:top-0 before:-left-full before:w-full before:h-full before:bg-gradient-to-r before:from-[#06367a] before:to-[#052758] before:transition-all before:duration-500 before:ease-in-out before:z-[-1] before:rounded-xl hover:before:left-0 text-[#fff]"
          >
            <input
              ref={fileInputPolicy}
              type="file"
              style={{ display: "none" }}
              onChange={handleFileChangePolicy}
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
              Reupload your new policy with a click of a button above! Don't
              worry, we got the rest :)
            </h1>
          </div>
        </div>
      </div>

      {/* search bar /logo */}
      <div className="flex h-[15vh] w-[77.5vw]  justify-center items-center">
        <div className="w-[15vw] h-auto -translate-x-[4vw] translate-y-[1.5vh]">
          <Image src={logo} alt="logo" />
        </div>
        <form>
          <input
            type="text"
            placeholder="Search"
            className="px-[1vw] w-[50vw] h-[6vh] text-medium bg-[#e4eaf2] focus:ring border border-[light-grey] translate-y-[1.5vh] rounded-[2vw] placeholder:font-bold outline-none border-lightgray placeholder:text-gray-500/40  "
          />
        </form>
      </div>

      {/* categories */}
      <div className="flex w-full h-[30vh] overflow-x-auto pb-[1vh]">
        <div className="absolute inline-flex h-[3vh]">
          <h1 className="font-bold text-[1.5vw] ml-[2vw]">
            Expense Categories
          </h1>
        </div>
        <div className="flex w-full overflow-x-auto mt-[6vh]">
          {receipts.map((receipt, index) => (
            <div
              key={index}
              className="flex-none h-[20vh] w-[15vw] ml-[2vw] rounded-[1.5vw] bg-[#2770d6]"
            >
              <div className="p-[2vw] text-[1.5vw] text-white font-bold">
                {/* Debugging: Log categories for each receipt */}
                {console.log(receipt.categories)}

                {/* Render category-specific information if receipt.categories is not null */}
                {receipt.categories &&
                  receipt.categories.map((category, categoryIndex) => (
                    <p key={categoryIndex}>{category}</p>
                  ))}
              </div>
            </div>
          ))}
          <div className="absolute z-1 h-[24vh] bg-[#ecf2fc] w-[15vw] right-0"></div>
        </div>
      </div>

      {/* past receipts */}
      <div className="flex-row bg-[#ecf2fc] h-[55vh] w-[77.5vw]">
        <div className="inline-flex h-[2vh]">
          <h1 className="font-bold text-[1.5vw] ml-[2vw]">
            Past Receipts
          </h1>
        </div>
        <div className="flex bg-[#ecf2fc] h-[45vh] w-[77.5vw] overflow-y-scroll justify-center">
          <div className="flex-row space-y-[2vh] justify-center">
            {receipts.map((receipt, index) => (
              <Link
                key={index}
                href={{ pathname: "/receipt", query: { index: index } }}
              >
                <button
                  className="flex ml-[1.5vw] h-[10vh] w-[73vw] rounded-[1vw] text-black mt-[2vh] justify-center items-center hover:bg-[#e4eefc]"
                  style={{
                    backgroundColor:
                      receipt.status === 0
                        ? "#bfe4ec"
                        : receipt.status === 1
                        ? "#fff5c4"
                        : "#f7dae7",
                  }}
                >
                  <div className="flex h-full w-[71.5vw] hover:bg-[#e4eefc] bg-[#ffffff]  space-x-[20vw] justify-center items-center font-bold text-[1.25vw]">
                    {/* Render the content of each receipt based on its attributes */}
                    <p>ID: {receipt.id}</p>
                    <p>{receipt.date}</p>
                    <p>
                      Status:{" "}
                      {receipt.status === 0
                        ? "Approved"
                        : receipt.status === 1
                        ? "Pending"
                        : "Rejected"}
                    </p>
                    {/* Add more content or components based on other attributes in the receipt */}
                  </div>
                </button>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
