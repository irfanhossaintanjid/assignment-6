"use client";

import React, { useEffect } from 'react';
import { createContext, useContext, useState } from "react";
import { Workout, PlanWorkout } from "@/types";
import toast from "react-hot-toast";


interface PlanContextType {
  isHydrated: boolean;
  plan: PlanWorkout[];   
  saved: Workout[];              
  addToPlan: (workout: Workout) => void;
  addToSaved: (workout: Workout) => void;  
  removeFromPlan: (id: number) => void;     
  removeFromSaved: (id: number) => void;    
  markAsDone: (id: number) => void;    
    metricsPlan: {                                
    exercises: number;
    minutes: number;
    calories: number;
  };
    metricssaved: {                                
    exercises: number;
    minutes: number;
    calories: number;
  };
}

const PlanContext = createContext<PlanContextType | null>(null);


export function PlanProvider({ children }: { children: React.ReactNode }) {
const [isHydrated, setIsHydrated] = useState(false);

const [plan, setPlan] = useState<PlanWorkout[]>([]);
  const [saved, setSaved] = useState<Workout[]>([]);



  useEffect(() => {
  const storedPlan = localStorage.getItem("fitlog-plan");
  const storedSaved = localStorage.getItem("fitlog-saved");

  if (storedPlan) setPlan(JSON.parse(storedPlan));
  if (storedSaved) setSaved(JSON.parse(storedSaved));

  setIsHydrated(true);
  
}, []);



useEffect(() => {
  if (isHydrated) {
    
    localStorage.setItem("fitlog-plan", JSON.stringify(plan));
  }
}, [plan, isHydrated]);

useEffect(() => {
  if (isHydrated) {
  
    localStorage.setItem("fitlog-saved", JSON.stringify(saved));
  }
}, [saved, isHydrated]);

   const addToPlan = (workout: Workout) => {
    
    if (plan.length >= 5) {
      toast.error("Today's plan is full! (Max 5)");
      return ;
    }
  else if (plan.some((item) => item.id === workout.id)) {
      toast.error("Already in today's plan!");
      return;
    }
    
    setPlan((prev) => [...prev, { ...workout, isDone: false }]);
    toast.success(`${workout.name} added to plan! 💪`);
  };
 const addToSaved = (workout: Workout) => {
    
    if (saved.some((item) => item.id === workout.id)) {
      toast.error("Already saved!");
      return;
    }
    setSaved((prev) => [...prev, workout]);
    toast.success(`${workout.name} saved for later!`);
  };

 const removeFromPlan = (id: number) => {
    setPlan((prev) => prev.filter((item) => item.id !== id));
    toast.success("Removed from plan");
  };
const removeFromSaved = (id: number) => {
    setSaved((prev) => prev.filter((item) => item.id !== id));
    toast.success("Removed from saved");
  };

const markAsDone = (id: number) => {
    setPlan((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, isDone: true } : item
      )
    );
    toast.success("Workout done! Great job! 🎉");
  };



 const metricsPlan = {
    exercises: plan.length,
    minutes: plan.reduce((total, item) => total + item.duration, 0),
    calories: plan.reduce((total, item) => total + item.caloriesBurned, 0),
  };
 const metricssaved = {
    exercises: saved.length,
    minutes: saved.reduce((total, item) => total + item.duration, 0),
    calories: saved.reduce((total, item) => total + item.caloriesBurned, 0),
  };


   
const value: PlanContextType = {
    isHydrated,
    plan,
    saved,
    addToPlan,
    addToSaved,
    removeFromPlan,
    removeFromSaved,
    markAsDone,
    metricsPlan,
    metricssaved
  };

 return( <PlanContext.Provider value={value}>{children}</PlanContext.Provider>);
}

export function usePlan() {
  const context = useContext(PlanContext);

  
  if (!context) {
    throw new Error("usePlan must be used within a PlanProvider");
  }

  return context;
  
}
