"use client";
import { usePlan } from "@/context/PlanContext";
import React from 'react';







export default function page () {
    
    const { metrics } = usePlan();
    return (
        <div>
           <div className="container mx-auto p-5 my-16 ">
             <h1 className='text-3xl font-bold'>MY PLAN</h1>
            <p className='text-lg text-gray-400'>Cap of five lifts for today. Finish them, then load more.</p>
           </div>
           
        </div>
    );
};

