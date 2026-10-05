"use client";
import { LuChevronLeft, LuDumbbell, LuClock, LuFlame, LuStar } from "react-icons/lu";

import { usePlan } from "@/context/PlanContext";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { PlanWorkout } from "@/types";


export default function MyPlanPage() {
  
  const { isHydrated, metricsPlan,metricssaved } = usePlan();
  const [activeTab, setActiveTab] = useState<"plan" | "saved">("plan");
  const { plan, saved, markAsDone, removeFromPlan, removeFromSaved } = usePlan();
const currentList = activeTab === "plan" ? plan : saved as PlanWorkout[];

  const [sortBy, setSortBy] = useState("duration");

  const sortedList = [...currentList].sort((a, b) => {
    if (sortBy === "duration") return a.duration - b.duration;
    if (sortBy === "calories") return b.caloriesBurned - a.caloriesBurned;
    if (sortBy === "rating") return b.rating - a.rating;
    return 0;
  });

  

  if (!isHydrated) {
  return (
    <div>
    <div id="library" className="flex justify-center py-20">
        <span className="loading loading-spinner loading-lg text-info"></span>
    </div>
    <div className="py-12 text-center text-gray-400">
      Loading workouts...
    </div>
    </div>
  );
}

   
  

  return (
    <section className="container mx-auto px-5 py-12">
      <h1 className=" text-3xl font-bold uppercase lg:text-4xl">
        My Plan
      </h1>
      <p className="mt-2 text-base text-gray-400 sm:text-lg">
        Cap of five lifts for today. Finish them, then load more.
      </p>

      <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-3 bg-[#222630] rounded-xl border border-white/10">
        <div className="bg-[#222630] p-5 rounded-xl">
          <p className="flex items-center gap-2 text-xs uppercase text-gray-400">
            <LuDumbbell className="size-5" /> Exercises
          </p>
          <h3 className="mt-2 text-4xl font-bold  text-[#ccff00]">{activeTab === "plan"? metricsPlan.exercises :metricssaved.exercises}</h3>
        </div>

        <div className="bg-[#222630] p-5 rounded-xl">
          <p className="flex items-center gap-2 text-xs uppercase text-gray-400">
            <LuClock className="size-5" /> Minutes
          </p>
          <h3 className="mt-2 text-4xl font-bold text-white">{activeTab === "plan"?metricsPlan.minutes:metricssaved.minutes}</h3>
        </div>

        <div className="bg-[#222630] p-5 rounded-xl">
          <p className="flex items-center gap-2 text-xs uppercase text-gray-400">
            <LuFlame className="size-5" /> Calories
          </p>
          <h3 className="mt-2 text-4xl font-bold text-white">{activeTab === "plan"?metricsPlan.calories:metricssaved.calories}</h3>
        </div>
      </div>

      
      <div className="mt-10 flex flex-col items-center justify-between gap-4  sm:flex-row">
        
        <div className="tabs tabs-box bg-[#1D232A] grid w-full grid-cols-2 rounded-xl sm:mb-10 sm:w-[270px]">
          <input
            type="radio"
            name="my_tabs_1"
            className={`tab rounded-xl font-bold ${activeTab === "plan" ? "bg-gray-700 text-[#ccff00]" : "bg-[#222630]  hover:bg-gray-800 text-gray-400"}`}
            aria-label="Today's Plan"
            checked={activeTab === "plan"}
            onChange={() => setActiveTab("plan")}
          />
          <input
            type="radio"
            name="my_tabs_1"
            className={`tab rounded-xl font-bold ${activeTab === "saved" ? "bg-gray-700 text-[#ccff00]" : "bg-[#222630] text-gray-400 hover:bg-gray-800"}`}
            aria-label="Saved"
            checked={activeTab === "saved"}
            onChange={() => setActiveTab("saved")}
          />
        </div>

      
        <div className="flex w-full mb-3 items-center justify-between  gap-2 sm:w-auto sm:justify-start sm:mb-10">
          Sort By 
          <div className="dropdown dropdown-bottom md:dropdown-left dropdown-end  ">
            <div tabIndex={0} role="button" className="btn m-1 bg-[#222630] text-white rounded-xl border border-gray-200 pe-20">
              <LuChevronLeft className="rotate-270 md:rotate-0" />{sortBy}
            </div>
            <ul
              tabIndex={-1}
              className="dropdown-content menu bg-[#1D232A] rounded-box z-1 w-52 p-2  shadow-sm"
            >
              <li><a onClick={() => setSortBy("duration")}>duration</a></li>
              <li><a onClick={() => setSortBy("calories")}>calories</a></li>
              <li><a onClick={() => setSortBy("rating")}>rating</a></li>
            </ul>
          </div>
        </div>
      </div>

      {sortedList.length === 0 ? (
        <div className="py-16 text-center border-2 rounded-xl  border-dashed border-gray-700">
          <h2 className="text-xl font-bold uppercase text-white">NOTHING HERE YET</h2>
          <p className="mt-2 text-sm text-gray-400">
            Browse the library and add a lift to get today moving.
          </p>
          <Link
            href="/#library"
            className="mt-6 inline-block rounded-lg bg-lime-400 px-5 py-2.5 text-sm font-bold text-black hover:bg-lime-300"
          >
            Go to workouts
          </Link>
        </div>
      ) : (
        <div className="grid gap-4">
          {sortedList.map((workout) => (
            <div
              key={workout.id}
              className="flex items-center gap-4 rounded-xl border border-white/10 bg-[#222630] p-4"
            >
              <div className="relative aspect-4/5 w-20 shrink-0 overflow-hidden rounded-lg">
                <Image
                  src={workout.image}
                  alt={workout.name}
                  fill
                  sizes="80px"
                  className="object-cover"
                />
              </div>

              
              <div className="flex min-w-0 flex-1 flex-col gap-3 sm:flex-row sm:items-center sm:justify-between sm:gap-2">
                <div>
                  <h3 className="text-lg font-bold text-white">{workout.name}</h3>
                  <p className="text-sm text-gray-400">{workout.equipment}</p>
                  
                  <div className="mt-4 flex flex-wrap items-center gap-2 px-3 py-2 text-xs text-gray-400">
                    <span className="flex items-center gap-1.5">
                      <LuClock className="size-3.5 text-[#c2f800]" />
                      {workout.duration} min
                    </span>
                    <span className="flex items-center gap-1.5">
                      <LuFlame className="size-3.5 text-[#c2f800]" />
                      {workout.caloriesBurned} kcal
                    </span>
                    <span className="flex items-center gap-1.5">
                      <LuStar className="size-3.5 text-[#c2f800]" />
                      {workout.rating}
                    </span>
                  </div>
                </div>

            
                <div className="flex flex-wrap items-center gap-2">
                  <Link
                    href={`/workout/${workout.id}`}
                    className="btn btn-sm btn-outline rounded-2xl border text-white border-gray-500 px-4 py-2 font-bold hover:bg-gray-700"
                  >
                    View Details
                  </Link>
                 
             {activeTab === "plan" && workout.isDone !== undefined && (
                     <button
                      onClick={() => markAsDone(workout.id)}
                       disabled={workout.isDone}
                     className="btn btn-sm rounded-2xl  bg-[#ccff00] px-4 font-bold text-black hover:bg-[#ccff00]/60 disabled:bg-[#6d7c2f] "
                        >
                    {workout.isDone ? "Done ✓" : "Mark as Done"}
                        </button>
                      )}

                  <button
                    onClick={() =>
                      activeTab === "plan"
                        ? removeFromPlan(workout.id)
                        : removeFromSaved(workout.id)
                    }
                    className="btn  btn-outline border-white text-white hover:bg-[#ccff00] hover:text-black  rounded-full px-4 font-bold"
                  >
                    ✕
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}