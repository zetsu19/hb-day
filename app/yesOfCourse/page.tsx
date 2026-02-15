"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";
import { motion, Variants } from "framer-motion";

export default function YesOfCourse() {
  const router = useRouter();

  const gifts = [
    { src: "/cakeSlice.png", alt: "Cake Slice", path: "/blowingCake" },
    { src: "/letter.png", alt: "Letter", path: "/letter" },
    { src: "/camera.jpg", alt: "Camera", path: "/camera" },
    { src: "/music.png", alt: "Music", path: "/music" },
  ];

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.05 },
    },
  };

  const itemVariants: Variants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring" as const,
        stiffness: 250,
        damping: 20,
      },
    },
  };

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-gradient-to-br from-rose-100 via-pink-50 to-purple-100 flex flex-col items-center justify-center px-4">
      <motion.div
        animate={{ scale: [1, 1.15, 1], opacity: [0.2, 0.4, 0.2] }}
        transition={{ duration: 4, repeat: Infinity }}
        className="absolute top-[-10%] left-[-10%] w-[400px] h-[400px] bg-pink-300 rounded-full blur-[120px]"
      />
      <motion.div
        animate={{ scale: [1.15, 1, 1.15], opacity: [0.2, 0.3, 0.2] }}
        transition={{ duration: 4, repeat: Infinity }}
        className="absolute bottom-[-10%] right-[-10%] w-[400px] h-[400px] bg-purple-300 rounded-full blur-[120px]"
      />
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center z-10 mb-12"
      >
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-pink-900 drop-shadow-sm">
          Гэнэтийн Бэлэг 🎁
        </h1>
        <p className="text-base sm:text-lg md:text-xl text-pink-800/80 font-medium mt-4">
          Би чамд зориулж эдгээр бэлгүүдийг хийсэн. <br />
          <span className="text-pink-600">Дурын бэлэг дээр дарна уу!</span>
        </p>
      </motion.header>
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 md:gap-8 z-10"
      >
        {gifts.map((gift, index) => (
          <motion.button
            key={index}
            variants={itemVariants}
            whileHover={{
              scale: 1.12,
              rotate: index % 2 === 0 ? 3 : -3,
              y: -5,
              transition: { duration: 0.08 },
            }}
            whileTap={{ scale: 0.95, transition: { duration: 0.05 } }}
            onClick={() => router.push(gift.path)}
            className="
              relative
              bg-white/90
              backdrop-blur-sm
              rounded-2xl
              shadow-lg
              border-2 border-pink-400
              overflow-hidden
              w-32 sm:w-36 md:w-40
              aspect-square
              flex items-center justify-center
              transition-all duration-150
              hover:shadow-xl
            "
          >
            <Image
              src={gift.src}
              alt={gift.alt}
              fill
              className="object-contain"
            />
          </motion.button>
        ))}
      </motion.div>
      <Image src="/kitty.gif" alt="Footer" width={200} height={100} />
    </div>
  );
}
