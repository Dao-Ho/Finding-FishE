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
        <div className="flex w-full h-[30vh] items-center justify-center">
        <Link  href='/dashboard'> 
        <button class="items-center shadow text-[2vw] font-bold bg-[#f06f5c] w-[20vw] py-[3vh] rounded-xl w-[20vw] text-white h-auto font-roboto transition-all duration-300 hover:scale-110 hover:shadow-md">
          Get started
        </button> </Link>
        </div>
          <div className="flex w-full h-full items-center justify-center"> 
            <div className="absolute inline-flex-[50vh]"> 
              <Image className="w-[15vw] h-auto mr-[35vw] mb-[15vw]" src={turtle} ></Image> 
            </div>
            <div className="absolute inline-flex-[50vh]"> 
              <Image className="w-[15vw] h-auto ml-[35vw] mb-[15vw]" src={puffer} ></Image> 
            </div>
          </div>
          <div className="flex w-full h-[30vh] items-center">
          <p class = "text-base text-[#5b5b5b] md:text-[3.5vw] leading-6 mb-2 bg-[#7ccbd2]">
            Upload your company requirements! What spending categories are acceptable and what are prohibited?
          </p>
          </div>
        </div>
      </div>
  );
}
