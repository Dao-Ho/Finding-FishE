"use client";
import React, { useEffect, useState } from 'react';
import axios from "axios";
import Link from 'next/link';
import logo from '../../public/fish.png'
import text_logo from '../../public/text copy.png'
import turtle from '../../public/turtle.png'
import puffer from '../../public/puffer.png'
import Image from "next/image";




export default function Home() {
  const [data, setData] = useState(null);

  useEffect(() => {
      const fetchData = async () => {
          const res = await axios.get("http://localhost:8080/api/home");
          const data = await res.data
          setData(data.message);
      }

      fetchData()
  }, []);

  return (
    <div className="w-screen h-screen bg-white">
      <div className="flex flex-col h-full w-full items-center justify-center h-screen bg-gradient-to-b from-blue-200 to-white-600">
        <div className="flex flex-col w-full h-full items-center justify-center">
          <Image class="w-[55vw] h-auto mb-10" src={text_logo} ></Image> 
          <p class="text-base text-[#5b5b5b] md:text-[3.5vw] leading-6 mb-2">
          Fishing out suspicious expenses for small businesses
          </p>
        </div> 
        <div className="absolute w-full h-[30vh] items-center justify-center ml-[80vw] mt-[20vh]">
        <Link  href='/dashboard'> 
        <button class="items-center shadow text-[2vw] font-bold bg-[#f06f5c] w-[20vw] py-[3vh] rounded-xl text-white h-auto font-roboto transition-all duration-300 hover:scale-110 hover:shadow-md">
          Get started
        </button> </Link>
        </div>
          <div className="flex w-full h-full items-center justify-center mt-[30vh]"> 
            <div className="absolute inline-flex-[50vh]"> 
              <Image className="w-[15vw] h-auto mr-[40vw] mb-[15vw]" src={turtle} ></Image> 
            </div>
            <div className="absolute inline-flex-[50vh]"> 
              <Image className="w-[15vw] h-auto ml-[40vw] mb-[15vw]" src={puffer} ></Image> 
            </div>
          </div>
          {/* <div className = "flex w-[40vw] h-auto justify-center items-center">
          <div className="abosolute w-[40vw] h-[30vh] items-center p-4 max-w-md mx-auto my-4">
            <p class="text-base text-center text-[#5b5b5b] items-center shadow text-[2vw] font-bold bg-[#44c3ca] w-[20vw] py-[3vh] rounded-xl text-white h-auto font-roboto hover:scale-110">
              Upload your company requirements and we will take it from there! 
            </p>
          </div>
          <div className="absolute w-[40vw] h-[30vh] items-center p-4 max-w-md mx-auto my-4">
            <p class="text-base text-center text-[#5b5b5b] items-center shadow text-[2vw] font-bold bg-[#44c3ca] w-[20vw] py-[3vh] rounded-xl text-white h-auto font-roboto hover:scale-110">
              Flag suspicious reciepts as fraud and limit non-bussiness expenses purchased with your company's earnings 
            </p>
          </div>
          <div className="w-[40vw] h-[30vh] items-center p-4 max-w-md mx-auto my-4 ml-[40vw]">
            <p class="text-base text-center text-[#5b5b5b] items-center shadow text-[2vw] font-bold bg-[#44c3ca] w-[20vw] py-[3vh] rounded-xl text-white h-auto font-roboto hover:scale-110">
              Reupload company requirements anytime to reflect any changes in acceptable spending categories. 
            </p>
          </div>
          </div> */}
        </div>
      </div>
  );
}
