"use client";
import React, { useEffect, useState } from 'react';
import axios from "axios";
import Link from 'next/link';


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
      <div className="flex h-full w-full items-center justify-center">
        <h1 className="text-black text-[2vw] font-bold">Finding FishE</h1>
        <Link href='/dashboard'>
          <button className="shadow text-[1.5vw] font-bold bg-[#2f69fd] w-[20vw] py-[1.5vh] rounded text-white font-roboto">
            Dashboard
          </button>
            <span>
                Data: {data}
            </span>
        </Link>
      </div>
    </div>
  );
}
