import Image from 'next/image';
import React from 'react';
import logo from '@/assets/logo.png'
const Footer = () => {
    return (
        
        <div className="container mx-auto border-t border-gray-600 mt-10 pt-10 flex justify-between">
          <div className='flex'>
              <Image
                src={logo}
                alt="Logo"
                width={25}
                height={25}
            /><span className="ml-2 text-gray-400">FITLOG</span>
          </div>
          <p className="text-gray-400 mt-2">© 2023 FITLOG. All rights reserved.</p>
        </div>
        
        
    );
};

export default Footer;