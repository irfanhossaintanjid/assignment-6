"use client";

import Link from "next/link";
import { useState } from "react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="container mx-auto p-5 sticky top-0 bg-[#15171d] z-50">
      <div className="flex justify-between">

        
        <div>
          <p className="text-3xl font-bold">FITLOG</p>
        </div>

        
        <div className="hidden md:flex gap-5">
          <Link className="font-bold" href="/">
            Workouts
          </Link>

          <Link className="font-bold" href="/my-plan">
            My Plan
          </Link>
        </div>

        
        <div className="hidden md:flex gap-5">
          <Link className="font-bold" href="/my-plan">
            Plan
          </Link>

          <Link className="font-bold" href="/my-plan">
            Saved
          </Link>
        </div>

    
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="text-2xl md:hidden"
        >
          ☰
        </button>
      </div>

    
      {isOpen && (
        <div className="mt-5 flex flex-col gap-4 md:hidden">
          <Link href="/" onClick={() => setIsOpen(false)}>
            Workouts
          </Link>

          <Link href="/my-plan" onClick={() => setIsOpen(false)}>
            My Plan
          </Link>

          <Link href="/my-plan" onClick={() => setIsOpen(false)}>
            Plan
          </Link>

          <Link href="/my-plan" onClick={() => setIsOpen(false)}>
            Saved
          </Link>
        </div>
      )}
    </div>
  );
}