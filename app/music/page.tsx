"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

export default function MusicPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-100 via-pink-50 to-purple-100 flex flex-col items-center justify-center p-6">
      <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-pink-700 mb-12 drop-shadow-md text-center">
        🎵 ЧАМАЙГ САНДУУЛДАГ ДУУ
      </h1>

      <div className="flex flex-col md:flex-row items-center justify-center gap-16 w-full max-w-7xl">
        <Image
          src="/spinningCD.gif"
          alt="Spinning CD"
          width={600}
          height={600}
          className="w-64 sm:w-72 md:w-80 lg:w-96 h-64 sm:h-72 md:h-80 lg:h-96 rounded-full shadow-xl overflow-hidden border-8 border-white bg-gradient-to-r from-pink-400 to-purple-400"
        />
        <div className="w-full md:w-[600px] lg:w-[700px] h-[300px] sm:h-[400px] md:h-[450px] lg:h-[500px] rounded-xl overflow-hidden shadow-2xl border-4 border-pink-300">
          <iframe
            src="https://www.youtube.com/embed/PEM0Vs8jf1w?autoplay=0"
            title="JVKE - Golden Hour"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="w-full h-full"
          />
        </div>
      </div>

      <button
        className="fixed bottom-8 right-8 bg-[#c92a2a] text-white px-6 py-3 rounded-full font-bold shadow-lg hover:bg-red-700 transition-colors"
        onClick={() => router.push("/yesOfCourse")}
      >
        Буцах ←
      </button>
    </div>
  );
}
