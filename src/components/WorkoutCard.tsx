import Link from "next/link";
import Image from "next/image";
import { LuClock, LuFlame, LuStar } from "react-icons/lu";
import { Workout } from "@/types";

export default function WorkoutCard({ workout }: { workout: Workout }) {
  return (
    <Link
      href={`/workout/${workout.id}`}
      className="group block overflow-hidden rounded-2xl border border-white/10 bg-[#222630] transition hover:-translate-y-1 hover:border-[#c2f800]"
    >
    
      <div className="relative h-40 w-full overflow-hidden">
        <Image
          src={workout.image}
          alt={workout.name}
          fill
          sizes="(max-width: 768px) 100vw, 33vw"
          className="object-cover duration-500 group-hover:scale-110"
        />
      </div>

      <div className="p-5">
        
        <div className="mb-3 flex flex-wrap gap-2">
          {workout.muscleGroups.map((muscle) => (
            <span
              key={muscle}
              className="rounded-full bg-[#c2f800] px-3 py-0.5 text-[11px] font-bold uppercase text-black"
            >
              {muscle}
            </span>
          ))}
        </div>

      
        <h3 className="text-xl font-bold uppercase text-white">
          {workout.name}
        </h3>
        <p className="mt-1 text-xs text-gray-400">{workout.equipment}</p>

        
        <div className="mt-4 flex items-center gap-2 rounded-md border border-white/5 px-3 py-2 text-xs text-gray-400">
          <span className="flex items-center gap-1.5">
            <LuClock className="size-3.5" />
            {workout.duration} min
          </span>
          <span className="flex items-center gap-1.5">
            <LuFlame className="size-3.5" />
            {workout.caloriesBurned} kcal
          </span>
          <span className="flex items-center gap-1.5">
            <LuStar className="size-3.5" />
            {workout.rating}
          </span>
        </div>
      </div>
    </Link>
  );
}



