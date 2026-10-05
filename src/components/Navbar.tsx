"use client";
import { usePathname } from "next/navigation";

import { usePlan } from "@/context/PlanContext";
import Link from "next/link";
import { useState } from "react";
import  logo  from "@/assets/logo.png";
import Image from "next/image";

export default function Navbar() {
  const { plan, saved } = usePlan();
  const [isOpen, setIsOpen] = useState(false);
 const pathname = usePathname();

  return (
    <div className=" p-5 sticky top-0 bg-[#15171d] z-50 border-b border-gray-800">
      <div className="container mx-auto">
      <div className="flex justify-between">

         <div className="flex gap-2 items-center">
      <Image
        src={logo}
        alt="FITLOG logo"
        width={32}
        height={32}
        className="h-8 w-8 object-contain"
      />
       <p className="text-3xl font-bold">FITLOG</p>
     
    </div>
       

         
        <div className="hidden md:flex ">
          
          <div className="flex items-center gap-5">
      <Link
        href="/"
        className={`font-bold ${pathname === "/" ? "text-[#ccff00] rounded-2xl px-5 py-1 bg-[#273009]" : "text-gray-400"}`}
      >
        Workouts
      </Link>

      <Link
        href="/my-plan"
        className={`font-bold ${pathname === "/my-plan" ? "text-[#ccff00] rounded-2xl px-5 py-1 bg-[#273009]" : "text-gray-400"}`}
      >
        My Plan
      </Link>
        </div>
        </div>

        
        <div className="hidden md:flex gap-5">
          <Link className="font-bold" href="/my-plan">
            Plan { <span className="ml-1 rounded-full bg-[#ccff00]  px-2 py-1 text-xs font-bold text-black">{plan.length}</span>}
          </Link>

          <Link className="font-bold" href="/my-plan">
            Saved { <span className="ml-1 rounded-full border border-gray-500 px-2 py-1 text-xs font-bold ">{saved.length}</span>}
          </Link>
        </div>

    
        
          
        
        <label className="btn btn-circle swap swap-rotate md:hidden">
  <input
    type="checkbox"
    checked={isOpen}
    onChange={() => setIsOpen((prev) => !prev)}
    aria-label="Toggle menu"
  />

  
  <svg
    className="swap-off fill-current"
    xmlns="http://www.w3.org/2000/svg"
    width="32"
    height="32"
    viewBox="0 0 512 512"
  >
    <path d="M64,384H448V341.33H64Zm0-106.67H448V234.67H64ZM64,128v42.67H448V128Z" />
  </svg>

  
  <svg
    className="swap-on fill-current"
    xmlns="http://www.w3.org/2000/svg"
    width="32"
    height="32"
    viewBox="0 0 512 512"
  >
    <polygon points="400 145.49 366.51 112 256 222.51 145.49 112 112 145.49 222.51 256 112 366.51 145.49 400 256 289.49 366.51 400 400 366.51 289.49 256 400 145.49" />
  </svg>
</label>
        
      </div>

    
      {isOpen && (
        <div className="mt-5 flex flex-col gap-4 md:hidden">
          <Link href="/" className={`${pathname === "/" ? "text-[#ccff00] rounded px-5 py-1 bg-[#273009]" : "text-gray-400"}`} onClick={() => setIsOpen(false)}>
            Workouts
          </Link>

          <Link href="/my-plan"  className={`${pathname === "/my-plan" ? "text-[#ccff00] rounded px-5 py-1 bg-[#273009]" : "text-gray-400"}`} onClick={() => setIsOpen(false)}>
            My Plan
          </Link>

          <Link href="/my-plan" onClick={() => setIsOpen(false)}>
            Plan { <span className="ml-1 rounded-full bg-[#ccff00]  px-2 py-1 text-xs font-bold text-black">{plan.length}</span>}
          </Link>

          <Link href="/my-plan" onClick={() => setIsOpen(false)}>
            Saved{ <span className="ml-1 rounded-full border border-gray-500 px-2 py-1 text-xs font-bold text-gray-400">{saved.length}</span>}
          </Link>
        </div>
      )}
    </div>
    </div>
  );
}