"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function UguePage() {
  const router = useRouter();

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-gradient-to-br from-rose-100 via-pink-50 to-purple-100 flex items-center justify-center px-4 md:px-0">
      <div className="absolute top-[-120px] left-[-120px] w-[300px] md:w-[420px] h-[300px] md:h-[420px] bg-pink-200 rounded-full blur-[120px] md:blur-[160px] opacity-30"></div>
      <div className="absolute bottom-[-120px] right-[-120px] w-[300px] md:w-[420px] h-[300px] md:h-[420px] bg-purple-200 rounded-full blur-[120px] md:blur-[160px] opacity-30"></div>

      <div className="flex flex-col items-center text-center">
        <div className="mb-8">
          <Image
            src="/hello-kitty.gif"
            alt="love gif"
            width={300}
            height={300}
            priority
            className="drop-shadow-xl"
          />
        </div>

        <h1 className="text-5xl md:text-6xl font-extrabold text-red-700 text-center drop-shadow-md mt-8">
          Дахиад нэг оролдоорой :(
        </h1>

        <div className="mt-12">
          <Button
            onClick={() => router.push("/")}
            className="
              bg-rose-200
              hover:bg-white
              text-rose-900
              hover:text-rose-500
              text-base sm:text-lg md:text-xl
              font-semibold
              px-8 sm:px-10 py-4 sm:py-5
              rounded-full
              border-2 border-pink-500
              shadow-[0_0_12px_rgba(255,20,147,0.35)]
              hover:shadow-[0_0_20px_rgba(255,20,147,0.55)]
              transition-all duration-300
              hover:scale-105
              active:scale-95
            "
          >
            ДАХИН ОРОЛДОХ 💔
          </Button>
        </div>
      </div>
    </div>
  );
}
