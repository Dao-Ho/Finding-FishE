"use client";
import { useRef, useState, useEffect } from "react";
import axios from "axios";
import { RiUpload2Fill } from "react-icons/ri";
import logo from "../../../public/text copy.png";
import Image from "next/image";
import { createClient } from "@supabase/supabase-js";
import { useRouter } from "next/router";
import Link from "next/link";

export default function Receipt({ searchParams }) {
  const [receipts, setReceipts] = useState([]);
  //state to store the file
  const fileInput = useRef(null);

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

  const handleResponse = async (status) => {
    try {
      const updatedStatus = status === "Yes" ? 0 : status === "No" ? 2 : 1;
      if (updatedStatus !== null) {
        const { data, error } = await supabase
          .from("receipts")
          .update({ status: updatedStatus })
          .eq("id", receipts[searchParams.index].id);
        if (error) {
          console.error("Error updating status in Supabase:", error);
        } else {
          // Update local state if successful
          const updatedReceipts = [...receipts];
          updatedReceipts[searchParams.index].status = updatedStatus;
          setReceipts(updatedReceipts);
        }
      }
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  return (
    <div className="flex-row bg-[#ecf2fc] w-screen h-full">
    <Link href="/dashboard">
      <button className="absolute w-[25vw] h-[10vh] translate-x-[68.5vw] translate-y-[8vh]">
        <Image src={logo} alt="logo" />
      </button> </Link>
      {/* Render the content based on the index */}
      {searchParams.index !== undefined &&
        searchParams.index < receipts.length && (
          <div>
            <div className="flex w-[70vw] h-screen items-center justify-center">
              <Image
                className="border border-[#2770d6] border-[0.35vw] rounded-[0.25vw] mt-[30vh]"
                src={`data:image/png;base64,${
                  receipts[searchParams.index].image.imageBase64
                }`}
                alt=""
                width={500}
                height={500}
              />
            </div>
            <div className="flex-row w-[30vw] h-screen translate-x-[66.5vw] -translate-y-[70vh] justify-center ">
              <div
                id="disclaimer box"
                className="w-[fullvw] h-[15vh] bg-[#f5f9fd] rounded-[1vw]"
              >
                <h1 className="text-[1.75vw] font-bold text-[#2770d6] px-[1vw] py-[1vw] pb-[1vw]">
                  Does this seem like a valid business expense?
                </h1>
              </div>
              <div className="flex w-full mt-[5vh]">
              <Link href="/dashboard">
                <button
                onClick={() => handleResponse("Yes")} 
                className="bg-[#2770d6] w-[13vw] h-[10vh] flex items-center justify-center rounded-xl cursor-pointer relative overflow-hidden transition-all duration-100 ease-in-out shadow-md hover:scale-105 hover:shadow-lg before:absolute before:top-0 before:-left-full before:w-full before:h-full before:bg-gradient-to-r before:from-[#06367a] before:to-[#052758] before:transition-all before:duration-500 before:ease-in-out before:z-[-1] before:rounded-xl hover:before:left-0 text-[#fff]">
                  <h1 className="font-bold text-[2vw]">Yes</h1>
                </button> </Link>
                <Link href="/dashboard" ><button onClick={() => handleResponse("No")}
                className="ml-[4vw] bg-[#2770d6] w-[13vw] h-[10vh] flex items-center justify-center rounded-xl cursor-pointer relative overflow-hidden transition-all duration-100 ease-in-out shadow-md hover:scale-105 hover:shadow-lg before:absolute before:top-0 before:-left-full before:w-full before:h-full before:bg-gradient-to-r before:from-[#06367a] before:to-[#052758] before:transition-all before:duration-500 before:ease-in-out before:z-[-1] before:rounded-xl hover:before:left-0 text-[#fff]">
                  <h1 className="font-bold text-[2vw]">No</h1>
                </button></Link>
              </div>
            </div>
          </div>
        )}
    </div>
  );
}
