"use client";
import { LuDumbbell, LuClock, LuFlame, LuStar } from "react-icons/lu";
import { usePlan  } from "@/context/PlanContext";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";


export default function MyPlanPage() {
    
  const { metrics } = usePlan();
  const [activeTab, setActiveTab] = useState<"plan" | "saved">("plan");
const { plan, saved, markAsDone,removeFromPlan, removeFromSaved } = usePlan();

const currentList = activeTab === "plan" ? plan : saved;





const [sortBy, setSortBy] = useState("duration");

const sortedList = [...currentList].sort((a, b) => {
  if (sortBy === "duration") return a.duration - b.duration;
  if (sortBy === "calories") return b.caloriesBurned - a.caloriesBurned;
  if (sortBy === "rating") return b.rating - a.rating;
  return 0;
});



  return (
    <section className="container mx-auto px-5 py-12">
      <h1 className="font-[family-name:var(--font-oswald)] text-3xl font-bold uppercase lg:text-4xl">
        My Plan
      </h1>
        <p className="text-lg text-gray-400 mt-2">
               Cap of five lifts for today. Finish them, then load more.  
                      </p>

      <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-3 rounded-xl border border-white/10">
  <div className=" bg-[#14161b] p-5">
    <p className="text-xs uppercase flex items-center gap-2 text-gray-400">
     <LuDumbbell className="size-5" /> Exercises
    </p>

    <h3 className="mt-2 text-4xl font-bold text-white">
      { metrics.exercises}
    </h3>
  </div>

  <div className=" bg-[#14161b] p-5">
    <p className="text-xs uppercase flex items-center gap-2 text-gray-400">
      <LuClock className="size-5" /> Minutes
    </p>

    <h3 className="mt-2 text-4xl font-bold text-white">
      { metrics.minutes}
    </h3>
  </div>

  <div className=" bg-[#14161b] p-5">
    <p className="text-xs uppercase flex items-center gap-2 text-gray-400">
      <LuFlame className="size-5" /> Calories
    </p>

    <h3 className="mt-2 text-4xl font-bold text-white">
      { metrics.calories}
    </h3>
  </div>
</div>

<div className="mt-10 flex flex-col items-center justify-between gap-4 sm:flex-row">

<div className="tabs tabs-box  grid grid-cols-2 w-[270px] rounded-xl mb-10 ">
  <input 
    type="radio" 
    name="my_tabs_1" 
    className="tab rounded-xl font-bold" 
    aria-label="Today's Plan" 
    checked={activeTab === "plan"}
    onChange={() => setActiveTab("plan")}
  />
  <input 
    type="radio" 
    name="my_tabs_1" 
    className="tab rounded-xl font-bold" 
    aria-label="Saved" 
    checked={activeTab === "saved"}
    onChange={() => setActiveTab("saved")}
  />
</div>


<div className="flex items-center gap-2">
   Sort By <div className="dropdown dropdown-left dropdown-end">
  <div tabIndex={0} role="button" className="btn m-1">⬅️ {sortBy}</div>
  <ul tabIndex={-1} className="dropdown-content menu bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm">
    <li><a onClick={() => setSortBy("duration")}>duration</a></li>
    <li><a onClick={() => setSortBy("calories")}>calories</a></li>
    <li><a onClick={() => setSortBy("rating")}>rating</a></li>
  </ul>
</div>
</div>
</div>

{sortedList.length === 0 ? (
  <div className="py-16 text-center">
    <h2 className="text-xl font-bold uppercase text-white">
      NOTHING HERE YET
    </h2>

    <p className="mt-2 text-sm text-gray-400">
     Browse the library and add a lift to get today moving.
    </p>

    <Link
      href="/#library"
      className="mt-6 inline-block rounded-lg bg-lime-400 px-5 py-2.5 text-sm font-bold text-black hover:bg-lime-300"
    >
      Browse the library
    </Link>
  </div>
) : (
  <div className="grid gap-4">
    {sortedList.map((workout) => (
       <div
  key={workout.id}
  className="flex items-center gap-4 rounded-xl border border-white/10 bg-[#14161b] p-4"
>
  <div className="relative aspect-[4/5] w-20 shrink-0 overflow-hidden rounded-lg">
    <Image
      src={workout.image}
      alt={workout.name}
      fill
      sizes="80px"
      className="object-cover"
    />
  </div>
          <div className="flex flex-1 items-center justify-between gap-2">
            <div>
            <h3 className="text-lg font-bold text-white">{workout.name}</h3>
            <p className="text-sm text-gray-400">{workout.equipment}</p>
            <div className="mt-4 flex items-center gap-2   px-3 py-2 text-xs text-gray-400">
                      <span className="flex items-center gap-1.5">
                        <LuClock className="size-3.5 text-[#c2f800]" />
                        {workout.duration} min
                      </span>
                      <span className="flex items-center gap-1.5">
                        <LuFlame className="size-3.5 text-[#c2f800]" />
                        {workout.caloriesBurned} kcal
                      </span>
                      <span className="flex items-center gap-1.5">
                        <LuStar className="size-3.5 text-[#c2f800]  " />
                        {workout.rating}
                      </span>
                    </div>
                    </div>
                    < div className="flex items-center  gap-2">
                    <Link href={`/workout/${workout.id}`} className=" border-gray-500  btn btn-sm btn-outline rounded-2xl border   hover:bg-gray-800  px-4 py-2 font-bold ">
                      View Details
                    </Link>
                {activeTab === "plan" && "isDone" in workout && !workout.isDone && (
                     <button
                                           onClick={() => markAsDone(workout.id)}
                        className="btn btn-sm rounded-2xl border-[#c2f800] bg-[#c2f800] px-4 font-bold text-black hover:bg-[#c2f800]/70">
                            Mark as Done
                          </button>)}
              <button
    onClick={() =>
      activeTab === "plan"
        ? removeFromPlan(workout.id)
        : removeFromSaved(workout.id)
    }
    className="btn btn-sm btn-outline btn-error rounded-2xl px-4 font-bold"
  >
    ✕
  </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
  )
    }

    </section>
  );
}

