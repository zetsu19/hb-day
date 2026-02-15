"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";

export default function LetterPage() {
  const [showLetter, setShowLetter] = useState(false);
  const router = useRouter();

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-gradient-to-br from-rose-100 via-pink-50 to-purple-100 flex flex-col items-center justify-center px-4">
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          x: [0, 30, 0],
          opacity: [0.2, 0.4, 0.2],
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-pink-300 rounded-full blur-[120px]"
      />
      <motion.div
        animate={{
          scale: [1.2, 1, 1.2],
          x: [0, -30, 0],
          opacity: [0.2, 0.3, 0.2],
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-purple-300 rounded-full blur-[120px]"
      />
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center z-10 mb-12"
      >
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-pink-900 drop-shadow-sm mt-7">
          Your Special Letter ✉️
        </h1>
        <p className="text-base sm:text-lg md:text-xl text-pink-800/80 font-medium mt-4 max-w-lg mx-auto">
          Би чамд зориулж энэхүү захидлыг бэлдлээ. <br />
          <span className="text-pink-600">Доорх товчийг дарж уншаарай!</span>
        </p>
      </motion.header>
      <div className="z-20 flex flex-col items-center">
        <AnimatePresence mode="wait">
          {!showLetter ? (
            <motion.button
              key="button"
              onClick={() => setShowLetter(true)}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8, filter: "blur(10px)" }}
              whileHover={{
                scale: 1.05,
                boxShadow: "0px 0px 20px rgba(244, 114, 182, 0.5)",
              }}
              whileTap={{ scale: 0.95 }}
              className="px-10 py-4 bg-pink-400 text-white font-bold rounded-full shadow-lg transition-colors hover:bg-pink-500"
            >
              Read Letter ✨
            </motion.button>
          ) : (
            <motion.div
              key="letter"
              initial={{ opacity: 0, rotateX: -90, scale: 0.8 }}
              animate={{ opacity: 1, rotateX: 0, scale: 1 }}
              transition={{
                type: "spring",
                stiffness: 100,
                damping: 15,
                duration: 0.8,
              }}
              className="relative w-full max-w-[350px] md:max-w-[450px] bg-white/90 backdrop-blur-sm rounded-2xl shadow-2xl flex flex-col items-center p-8 border border-white/50"
            >
              <div className="text-center max-w-xl mx-auto px-4">
                <motion.h2
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                  className="text-3xl sm:text-4xl font-extrabold text-pink-600 mb-6 drop-shadow-md"
                >
                  💌 Захидал
                </motion.h2>

                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="text-gray-700 text-lg sm:text-xl leading-relaxed space-y-4"
                >
                  <p>Сайн уу, Хүслэн! 👋</p>

                  <p>
                    Өнөөдөр бол чиний онцгой өдөр. Би чамд зориулж энэхүү
                    захидлыг бичиж, чиний зүрхэнд инээд, аз жаргал, баяр хөөр
                    бэлэглэхийг хүсч байна. 🌸
                  </p>

                  <p>
                    Чамайг үүрд инээмсэглэхийг, бүх зорилго, хүсэл чинь
                    биелэхийг, өдрүүд чинь өнгө алаглан гэрэлтэхийг ерөөе. ✨
                  </p>

                  <p>
                    Амьдралын замд тулгарсан бүх саад бэрхшээлийг даван туулж,
                    үргэлж урагш тэмүүлж явахад чинь би чин сэтгэлээсээ дэмжиж
                    байна. 💖
                  </p>

                  <p className="font-semibold text-pink-500">
                    Төрсөн өдрийн мэнд хүргэе! 🎉 <br />
                    Чиний өдөр бүр аз жаргал, инээд баясал, хайраар дүүрэн байг!
                    🌷
                  </p>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.8, type: "spring" }}
                  className="mt-6"
                >
                  <Image
                    src="/letter.png"
                    alt="Letter"
                    width={180}
                    height={180}
                    className="mx-auto object-contain"
                  />
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      <motion.div
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        className="mt-12 z-10"
      >
        <Image
          src="/kitty.gif"
          alt="Footer"
          width={180}
          height={90}
          className="rounded-xl"
        />
      </motion.div>
      <button
        className="fixed bottom-8 mt-10 right-8 bg-[#c92a2a] text-white px-6 py-2 rounded-full font-bold shadow-lg hover:bg-red-700 transition-colors"
        onClick={() => router.push("/yesOfCourse")}
      >
        Буцах ←
      </button>
    </div>
  );
}
