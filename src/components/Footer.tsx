import Image from 'next/image';
import React from 'react';
import logo from '@/assets/logo.png'
const Footer = () => {
    return (
        
       <div className=" bg-[#13141b] mt-10 pb-20 border-t border-gray-700  pt-10 sm:pt-8">
  <div className="flex flex-col container mx-auto items-center justify-between gap-4 sm:flex-row">

    
    <div className="flex items-center">
      <Image
        src={logo}
        alt="FITLOG logo"
        width={20}
        height={20}
        className="h-8 w-8 object-contain"
      />

      <span className="ml-2 text-lg font-bold ">
        FITLOG
      </span>
    </div>

  
    <p className="text-center text-sm text-gray-400 sm:text-right">
     © 2026 FitLog — Workout Library. Train hard, log honest.
    </p>

  </div>
</div>
        
        
    );
};

export default Footer;