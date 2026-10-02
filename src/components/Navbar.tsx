import Link from 'next/link';
import React from 'react';

const Navbar = () => {
    return (
        <div className='container mx-auto flex justify-between p-5 bg-'>
            <div>
                <p className='text-3xl font-bold'>FITLOG</p>
            </div>
            <div className='flex gap-5'>
                <Link className='font-bold'  href="#">Workouts</Link>
                <Link className='font-bold' href="#">My Plan</Link>
            </div>
            <div className='flex gap-5'>
                <Link className='font-bold' href="#">Plan</Link>
                <Link className='font-bold' href="#">Saved</Link>
            </div>
        </div>
    );
};

export default Navbar;