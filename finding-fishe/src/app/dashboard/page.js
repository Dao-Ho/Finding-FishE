"use client";
import { useRef } from "react";

export default function Dashboard() {
  const fileInput = useRef(null);

  const handleUpload = () => {
    console.log("Button clicked!");
    // trigger the click event of the file input
    fileInput.current.click();
  };

  return (
    <html>
        <div className="w-screen h-screen bg-[#ecf2fc]">
          <div
            id="uploadContainer"
            className="flex h-[90vh] w-[20vw] rounded-[1vw] bg-white translate-x-[77.5vw] translate-y-[5vh] justify-center"
          >
            <button
              onClick={handleUpload}
              className="bg-[#164e86] w-[17vw] h-[17vw] mt-[3vh] rounded-[1vw] text-white"
            >
              upload
            </button>
            <input type="file" ref={fileInput} style={{ display: "none" }} />
          </div>
        </div>
    </html>
  );
}
