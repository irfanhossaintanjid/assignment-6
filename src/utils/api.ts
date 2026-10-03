import { Workout } from "@/types";

export async function getAllWorkouts(): Promise<Workout[]> {
  const res = await fetch("https://api.api-store.workers.dev/api/fitlog");
  if (!res.ok) throw new Error("Failed to fetch workouts");
  const data = await res.json();
  return data;
}
export async function getWorkoutById(): Promise<Workout[]> {
  const res = await fetch("https://api.api-store.workers.dev/api/fitlog");
  if (!res.ok) throw new Error("Failed to fetch workouts");
  const data = await res.json();
  return data;
}
