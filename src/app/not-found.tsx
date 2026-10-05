import Link from "next/link";

export default function NotFound() {
  return (
    <section className="container mx-auto flex min-h-15 flex-col items-center justify-center px-5 py-20 text-center">
      <h1 className=" text-6xl font-bold text-[#ccff00] sm:text-9xl">
        404
      </h1>

      <h2 className="mt-4 text-2xl font-bold uppercase text-white sm:text-3xl">
        Page Not Found
      </h2>

      <p className="mt-3 max-w-md text-sm sm:text-base">
        The page you are looking for does not exist.
      </p>

      <Link
        href="/"
        className="mt-8 inline-block rounded-lg bg-[#ccff00] px-6 py-3 text-sm font-bold uppercase text-black transition hover:bg-lime-300"
      >
        Back to Home
      </Link>
    </section>
  );
}