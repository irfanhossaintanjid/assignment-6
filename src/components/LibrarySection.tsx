"use client";
import { useState, useEffect } from "react";
import { Workout } from "@/types";
import { getAllWorkouts } from "@/utils/api";
import WorkoutCard from "./WorkoutCard";

export default function LibrarySection() {
  const [workouts, setWorkouts] = useState<Workout[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        const data = await getAllWorkouts();
        setWorkouts(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false); 
      }
    }
    loadData();
  }, []);


  if (loading) {
    return (
    <div className=" ">
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
    <section id="library" className="container mx-auto p-5 my-16 scroll-mt-20">
      <div>
        <h2 className="text-2xl font-bold lg:text-3xl">THE LIBRARY</h2>
        <p className="mt-5 max-w-xl text-sm  text-gray-400 sm:text-base">
          Twelve lifts covering every major muscle group.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mt-10 gap-5">
        {workouts.map((workout) => (
          <WorkoutCard key={workout.id} workout={workout} />
        ))}
      </div>
    </section>
   
  );
}