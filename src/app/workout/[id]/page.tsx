
"use client";
import { useState, useEffect } from "react";
import { usePlan } from "@/context/PlanContext";
import { getWorkoutById } from "@/utils/api";
import { Workout } from "@/types";
import Image from "next/image";
import { LuBookmark, LuClipboardPlus, } from "react-icons/lu";
import Link from "next/link";
import { useParams } from "next/navigation";





export default function WorkoutDetails() {
  const { id } = useParams<{ id: string }>();
// const { id } = await params;


  const { saved, plan, addToPlan, addToSaved } = usePlan();
  const [workout, setWorkout] = useState<Workout | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadWorkout() {
      try {
        const data = await getWorkoutById(id);
        setWorkout(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }
    
    loadWorkout();
  }, [id]);

 if (loading) {
    return (
    <div className=" ">
    <div id="library" className="flex justify-center py-20">
        <span className="loading loading-spinner loading-lg text-info"></span>
    </div>
    <div className="py-12 text-center text-gray-400">
      Loading Workout Details...
    </div>
    </div>
  );
  }

if (!workout) {
  return <div>
    <h1>Workout not found</h1>
    <Link href="/" className="mt-6 inline-block text-lime-400 underline">
          Back to library
        </Link>
  </div>;
}
  const isPlanFull = plan.length >= 5;
  const isAlreadyInPlan = plan.some((item) => item.id === workout?.id);
  const isAlreadySave = saved.some((i) => i.id === workout?.id);

 return (
  
   <section className="container  mx-auto px-5 py-15 bg-[#15171d]">
  <div className="card lg:card-side gap-8 ">

    
    <div className="relative aspect-[4/5] w-full  overflow-hidden rounded-2xl lg:w-[35%]">
      <Image
        src={workout.image}
        alt={workout.name}
        fill
        priority
        sizes="(max-width: 1024px) 100vw, 35vw"
        className="object-cover"
      />
    </div>

    
    <div className="card-body p-0">

      
      <h1 className="card-title font-bold text-3xl uppercase lg:text-4xl ">
        {workout.name}
      </h1>

      
     <p className="max-w-md grow-0 text-sm pb-10 leading-relaxed text-gray-400">
  {workout.description}
</p>
  
      <div className="flex flex-wrap gap-2">
        {workout.muscleGroups.map((m) => (
          <span
            key={m}
            className="badge  bg-[#ccff00] font-bold text-black"
          >
            {m}
          </span>
        ))}
      </div>

      
      <div className="mt-2 overflow-hidden rounded-xl border border-gray-600 bg-[#222630]">
        <div className="divide-y divide-white/10">

          
          <div className="flex items-center justify-between px-4 py-3">
            <span className="text-[10px] font-bold text-gray-400">
              EQUIPMENT
            </span>
            <span className="text-xs font-semibold text-white">
              {workout.equipment}
            </span>
          </div>

          
          <div className="flex items-center justify-between px-4 py-3">
            <span className="text-[10px] font-bold text-gray-400">
              DIFFICULTY
            </span>
            <span className="text-xs font-semibold text-white">
              {workout.difficulty}
            </span>
          </div>

    
          <div className="flex items-center justify-between px-4 py-3">
            <span className="text-[10px] font-bold text-gray-400">
              SETS
            </span>
            <span className="text-xs font-semibold text-white">
              {workout.sets}
            </span>
          </div>

    
          <div className="flex items-center justify-between px-4 py-3">
            <span className="text-[10px] font-bold text-gray-400">
              REPS
            </span>
            <span className="text-xs font-semibold text-white">
              {workout.reps}
            </span>
          </div>
        
          <div className="flex items-center justify-between px-4 py-3">
            <span className="text-[10px] font-bold text-gray-400">
              DURATION
            </span>
            <span className="text-xs font-semibold text-white">
              {workout.duration} min
            </span>
          </div>

          
          <div className="flex items-center justify-between px-4 py-3">
            <span className="text-[10px] font-bold text-gray-400">
              CALORIES
            </span>
            <span className="text-xs font-semibold text-white">
              {workout.caloriesBurned} kcal
            </span>
          </div>


          
          <div className="flex items-center justify-between px-4 py-3">
            <span className="text-[10px] font-bold text-gray-400">
              RATING
            </span>
            <span className="text-xs font-semibold text-white">
              {workout.rating}
            </span>
          </div>

        </div>
      </div>


      <h2 className="mt-4 text-sm font-bold uppercase">
        Instructions 
      </h2>

      <ol className="list-inside list-decimal space-y-2 text-xs leading-relaxed text-gray-300">
        {workout.instructions.map((step, i) => (
          <li key={i}>{step}</li>
        ))}
      </ol>

  
      <div className="card-actions mt-4 flex flex-wrap gap-3">
<button
  onClick={() => addToPlan(workout)}
  // disabled={isPlanFull || isAlreadyInPlan}
  className={`bg-[#ccff00] text-black font-bold  px-4 py-2   rounded-md ${isAlreadyInPlan ? "bg-gray-700 text-gray-400 " : "bg-[#ccff00]  hover:bg-lime-600"}`}
>

  {isAlreadyInPlan ? "Already in Plan ✓" : isPlanFull ? `"Plan Full"` :<span className="flex justify-between gap-2 items-center "> <LuClipboardPlus className="size-4 " />Add to today's plan</span>}
  
</button>

<button onClick={() => addToSaved(workout)} className={`bg-[#222630] font-bold  rounded-md    px-4 py-2  ${isAlreadySave ? "bg-gray-700 text-gray-400" : "bg-[#222630] hover:bg-gray-500 border border-gray-500  text-white"}`}>
 
  {isAlreadySave ? "Already saved ✓" :<span className="flex justify-center items-center gap-2"> <LuBookmark className="size-4" /> Save for later</span>}
</button>

      </div>
    </div>
  </div>
</section>
  );
}