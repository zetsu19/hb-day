"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function PicturesPage() {
  const router = useRouter();
  const pictures = [
    { src: "/picOne.png", alt: "Cake Slice" },
    { src: "/pic2.jpg", alt: "Letter" },
    { src: "/pic3.jpg", alt: "Camera" },
    { src: "/pic4.jpg", alt: "Music" },
    { src: "/pic5.jpg", alt: "Kitty" },
    { src: "/pic6.jpg", alt: "Birthday" },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
  } as const;

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring" as const, stiffness: 100 },
    },
  } as const;

  const [selectedImage, setSelectedImage] = useState<{
    src: string;
    alt: string;
  } | null>(null);

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-100 via-pink-50 to-purple-100 p-6 flex flex-col items-center relative">
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-4xl sm:text-5xl font-extrabold text-pink-700 mb-12 drop-shadow-md text-center"
      >
        Gallery 📸
      </motion.h1>
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 w-full max-w-6xl"
      >
        {pictures.map((pic, index) => (
          <motion.div
            key={index}
            variants={itemVariants}
            whileHover={{
              scale: 1.05,
              rotate: index % 2 === 0 ? 2 : -2,
              y: -5,
            }}
            whileTap={{ scale: 0.98 }}
            className="relative w-full aspect-square rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300 bg-white p-2 cursor-pointer"
            onClick={() => setSelectedImage(pic)}
          >
            <div className="relative w-full h-full rounded-xl overflow-hidden">
              <Image
                src={pic.src}
                alt={pic.alt}
                fill
                className="object-cover transition-transform duration-500 hover:scale-110"
                priority={index < 4}
              />
            </div>
          </motion.div>
        ))}
      </motion.div>
      <motion.footer
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="mt-12 text-pink-400 font-medium"
      >
        ✨ Captured with love ✨
      </motion.footer>
      {selectedImage && (
        <div
          className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 cursor-pointer"
          onClick={() => setSelectedImage(null)}
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            className="relative w-11/12 sm:w-3/4 md:w-1/2 aspect-square"
          >
            <Image
              src={selectedImage.src}
              alt={selectedImage.alt}
              fill
              className="object-contain rounded-xl shadow-2xl"
            />
          </motion.div>
        </div>
      )}
      <button
        className="fixed bottom-8 mt-10 right-8 bg-[#c92a2a] text-white px-6 py-2 rounded-full font-bold shadow-lg hover:bg-red-700 transition-colors"
        onClick={() => router.push("/yesOfCourse")}
      >
        Буцах ←
      </button>
    </div>
  );
}
