import Image from 'next/image';
import React from 'react';
import logo from '@/assets/logo.png'
const Footer = () => {
    return (
        
       <div className="container mx-auto mt-10 border-t border-gray-600 px-5 pt-6 sm:pt-8">
  <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">

    
    <div className="flex items-center">
      <Image
        src={logo}
        alt="FITLOG logo"
        width={32}
        height={32}
        className="h-8 w-8 object-contain"
      />

      <span className="ml-2 text-lg font-bold ">
        FITLOG
      </span>
    </div>

  
    <p className="text-center text-sm text-gray-400 sm:text-right">
      © 2026 FITLOG — Workout Library. Train hard, log honest.
    </p>

  </div>
</div>
        
        
    );
};

export default Footer;