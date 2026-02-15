"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-gradient-to-br from-rose-100 via-pink-50 to-purple-100 flex items-center justify-center px-4 md:px-0">
      <div className="absolute top-[-120px] left-[-120px] w-[300px] md:w-[420px] h-[300px] md:h-[420px] bg-pink-200 rounded-full blur-[120px] md:blur-[160px] opacity-30"></div>
      <div className="absolute bottom-[-120px] right-[-120px] w-[300px] md:w-[420px] h-[300px] md:h-[420px] bg-purple-200 rounded-full blur-[120px] md:blur-[160px] opacity-30"></div>
      <div className="absolute left-4 md:left-10 bottom-4 md:bottom-10 hidden md:block opacity-80">
        <Image
          src="/roseDudu.gif"
          alt="rose"
          width={180}
          height={180}
          md-width={220}
          md-height={220}
          priority
        />
      </div>
      <div className="absolute right-4 md:right-10 bottom-4 md:bottom-10 hidden md:block opacity-80">
        <Image
          src="/duduCute.gif"
          alt="cute"
          width={180}
          height={180}
          md-width={220}
          md-height={220}
          priority
        />
      </div>
      <div className="flex flex-col items-center text-center">
        <h1
          className="
            text-3xl sm:text-4xl md:text-5xl lg:text-7xl
            font-extrabold
            text-pink-900
            mb-4 sm:mb-6 md:mb-6
            tracking-wide
            transition-all duration-500
            hover:text-white
          "
          style={{
            fontFamily: "'Nunito', 'Poppins', sans-serif",
            textShadow: "0 6px 20px rgba(255, 182, 193, 0.35)",
          }}
        >
          HAPPY BIRTHDAY 🎂
        </h1>
        <div className="mb-6 sm:mb-8 md:mb-8 transition-all duration-500 hover:scale-105">
          <Image
            src="/caaake.gif"
            alt="cat"
            width={250}
            height={250}
            priority
          />
        </div>
        <p className="text-base sm:text-lg md:text-xl text-pink-900 mb-8 sm:mb-10 md:mb-10 font-medium px-2 sm:px-0">
          Би чамд гэнэтийн бэлэг бэлдсэн 🎁, үзмээр байна уу?
        </p>
        <div className="flex flex-col sm:flex-row gap-4 sm:gap-5">
          <Button
            onClick={() => router.push("/yesOfCourse")}
            className="
              bg-pink-200
              hover:bg-white
              text-pink-900
              hover:text-pink-500
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
            ТИЙМ ЭЭ, МЭДЭЭЖ
          </Button>

          <Button
            onClick={() => router.push("/noThanks")}
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
            ҮГҮЙ ЭЭ, БАЯРЛАЛАА
          </Button>
        </div>
      </div>
    </div>
  );
}
