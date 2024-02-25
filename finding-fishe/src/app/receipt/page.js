"use client";
import { useRef, useState, useEffect } from "react";
import axios from "axios";
import { RiUpload2Fill } from "react-icons/ri";
import logo from "../../../public/text copy.png";
import Image from "next/image";
import { createClient } from "@supabase/supabase-js";
import { useRouter } from 'next/router';
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


  return (
    <div className="bg-[#ecf2fc] w-screen h-screen">
      <h1>Receipt</h1>
      {/* Render the content based on the index */}
        {searchParams.index !== undefined && searchParams.index < receipts.length && (
        <div>
            <p>Receipt Date: {receipts[searchParams.index].date}</p>
            <p>Receipt ID: {receipts[searchParams.index].id}</p>
            <p>Receipt Status: {receipts[searchParams.index].status}</p>
            <Image
                src={`data:image/png;base64,${receipts[searchParams.index].image.imageBase64}`}
                alt=""
                width={500}
                height={500}
                />
             
        </div>
    )}
    </div>
  );
}
