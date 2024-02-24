import Link from 'next/link';

export default function Home() {
  return (
    <div className="w-screen h-screen bg-white">
      <div className="flex h-full w-full items-center justify-center">
        <h1 className="text-black text-[2vw] font-bold">Finding FishE</h1>
        <h1 className="text-black text-[2vw] font-bold">Finding FishE</h1>

        {/* <Link  href={{
                    pathname: '/dashboard',
                  }}> 
        <button class="shadow text-[1.5vw] font-bold bg-[#2f69fd] w-[20vw] py-[1.5vh] rounded w-[20vw] text-white h-auto font-roboto">
          Dashboard
        </button> </Link> */}
      </div>
    </div>
  );
}

