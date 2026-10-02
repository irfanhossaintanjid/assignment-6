import Image from 'next/image';
import React from 'react';
import benner from '@/assets/banner.png'

const Herocard = () => {
    return (
       <div className="container mx-auto grid grid-cols-2 items-center gap-8 rounded-2xl bg-[#222630] p-5 sm:p-8 md:grid-cols-2 md:p-10">

  
  <div>
    <p className="mb-3 text-xs font-bold  text-[#c2f800] sm:text-sm">
      WORKOUT LIBRARY
    </p>

    <h1 className="text-3xl font-bold  sm:text-4xl md:text-5xl lg:text-6xl">
      TRAIN WITH INTENT. LOG EVERY SET.
    </h1>

    <p className="mt-5 max-w-xl text-sm leading-6 text-gray-400 sm:text-base">
      FitLog is a dark, no-nonsense gym companion: pick a lift, lock it
      into today's plan, and watch the week's work add up.
    </p>

    <a
      href="#library"
      className="mt-6 inline-block rounded-lg bg-[#c2f800] px-5 py-3 text-sm font-bold text-black transition hover:bg-[#a1ca0e]"
    >
      BROWSE WORKOUTS
    </a>
  </div>

  
  <div className="flex justify-center md:justify-end">
    <Image
      src={benner}
      alt="FitLog workout banner"
      className="h-auto w-full max-w-md object-contain"
      priority
    />
  </div>

</div>
    );
};

export default Herocard;