"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function PremiumBirthdayCake() {
  const [isLit, setIsLit] = useState(true);
  const [showText, setShowText] = useState(false);
  const router = useRouter();
  const analyserRef = useRef<AnalyserNode | null>(null);
  const dataArrayRef = useRef<Uint8Array | null>(null);
  const animationRef = useRef<number | null>(null);

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const fireworksRef = useRef<any[]>([]);

  const handleBlow = () => {
    if (!isLit) {
      setIsLit(true);
      setShowText(false);
      return;
    }
    setIsLit(false);
    setTimeout(() => setShowText(true), 600);
  };

  useEffect(() => {
    if (!showText) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const fireworks: any[] = [];
    fireworksRef.current = fireworks;

    const createFirework = () => {
      const x = Math.random() * canvas.width;
      const y = Math.random() * canvas.height * 0.5;
      const colors = ["#f43f5e", "#facc15", "#22d3ee", "#a78bfa", "#34d399"];
      for (let i = 0; i < 30; i++) {
        fireworks.push({
          x,
          y,
          vx: (Math.random() - 0.5) * 6,
          vy: (Math.random() - 0.5) * 6,
          alpha: 1,
          color: colors[Math.floor(Math.random() * colors.length)],
        });
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      fireworks.forEach((f, i) => {
        f.x += f.vx;
        f.y += f.vy;
        f.alpha -= 0.02;
        ctx.fillStyle = `rgba(${parseInt(f.color.slice(1, 3), 16)},${parseInt(
          f.color.slice(3, 5),
          16,
        )},${parseInt(f.color.slice(5, 7), 16)},${f.alpha})`;
        ctx.beginPath();
        ctx.arc(f.x, f.y, 3, 0, Math.PI * 2);
        ctx.fill();
        if (f.alpha <= 0) fireworks.splice(i, 1);
      });
      animationRef.current = requestAnimationFrame(animate);
    };

    const interval = setInterval(createFirework, 150);

    animate();

    return () => {
      clearInterval(interval);
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
      fireworksRef.current = [];
    };
  }, [showText]);

  useEffect(() => {
    let audioContext: AudioContext;
    let microphone: MediaStreamAudioSourceNode;

    const startMic = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          audio: true,
        });
        audioContext = new AudioContext();
        microphone = audioContext.createMediaStreamSource(stream);

        const analyser = audioContext.createAnalyser();
        analyser.fftSize = 256;

        analyserRef.current = analyser;

        const bufferLength = analyser.frequencyBinCount;
        dataArrayRef.current = new Uint8Array(bufferLength);

        microphone.connect(analyser);

        detectBlow();
      } catch (err) {
        console.log("Mic permission denied");
      }
    };

    const detectBlow = () => {
      if (!analyserRef.current || !dataArrayRef.current) return;

      const dataArray = new Uint8Array(dataArrayRef.current.length);
      analyserRef.current.getByteTimeDomainData(dataArray);

      let sum = 0;
      for (let i = 0; i < dataArray.length; i++) {
        const value = dataArray[i] - 128;
        sum += value * value;
      }

      const volume = Math.sqrt(sum / dataArray.length);

      if (volume > 20 && isLit) {
        setIsLit(false);
        setTimeout(() => setShowText(true), 600);
      }

      animationRef.current = requestAnimationFrame(detectBlow);
    };

    startMic();

    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, [isLit]);

  return (
    <main className="relative flex items-center justify-center min-h-screen bg-gradient-to-br from-rose-100 via-pink-50 to-purple-100 overflow-hidden px-4">
      <canvas
        ref={canvasRef}
        className="absolute inset-0 z-20 pointer-events-none"
      />
      <div
        className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
          isLit ? "opacity-40" : "opacity-0"
        }`}
        style={{
          background:
            "radial-gradient(circle at center, #fbbf24 0%, transparent 70%)",
        }}
      />
      <div className="absolute top-[-10%] left-[-10%] w-[400px] h-[400px] bg-pink-300 rounded-full blur-[120px] animate-pulse opacity-30" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[400px] h-[400px] bg-purple-300 rounded-full blur-[120px] animate-pulse opacity-30" />

      <div className="relative z-10 flex flex-col items-center">
        <div className="relative mt-20">
          <div className="absolute left-1/2 -translate-x-1/2 -top-8 z-30 flex flex-col items-center">
            <div className="h-16 flex items-end justify-center mb-1">
              {isLit ? (
                <div className="relative">
                  <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-12 h-16 bg-orange-500/40 blur-xl animate-pulse" />
                  <div className="w-4 h-10 bg-gradient-to-t from-orange-600 via-yellow-400 to-white rounded-full animate-flame-physics shadow-[0_0_15px_#f59e0b]" />
                  <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-2 h-2 bg-blue-500/60 rounded-full blur-[2px]" />
                </div>
              ) : (
                <div className="flex flex-col items-center animate-smoke"></div>
              )}
            </div>

            <div className="relative w-4 h-16 rounded-sm overflow-hidden shadow-lg bg-[#DC143C]">
              <div className="absolute inset-0 opacity-20 bg-[repeating-linear-gradient(45deg,transparent,transparent_4px,#fff_4px,#fff_8px)]" />
              <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-1 h-3 bg-gray-900 rounded-full" />
            </div>
          </div>
          <div className="relative flex flex-col items-center">
            <Image
              src="/chocolateCake.png"
              alt="Chocolate Cake"
              width={320}
              height={320}
              priority
              className="drop-shadow-2xl select-none pointer-events-none rounded-xl"
            />
          </div>
        </div>
        <div className="mt-16 text-center space-y-6">
          <div
            className={`transition-all duration-700 transform ${
              showText ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
            }`}
          >
            <h1 className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-purple-400 drop-shadow-md">
              HAPPY BIRTHDAY!
            </h1>
            <p className="text-gray-600 mt-2 font-medium tracking-wide uppercase">
              Wish Granted ✨
            </p>
          </div>

          {showText && (
            <button
              onClick={() => router.push("/yesOfCourse")}
              className="px-12 py-4 bg-pink-400 text-white font-black rounded-full shadow-lg hover:shadow-xl transition-transform active:scale-95"
            >
              NEXT
            </button>
          )}
        </div>
      </div>

      <style jsx>{`
        @keyframes flame-physics {
          0%,
          100% {
            transform: scale(1) rotate(-1deg);
            border-radius: 50% 50% 20% 20%;
          }
          25% {
            transform: scale(1.1, 0.9) rotate(1deg);
          }
          50% {
            transform: scale(0.9, 1.2) rotate(-2deg);
            border-radius: 40% 40% 30% 30%;
          }
          75% {
            transform: scale(1.05, 1) rotate(2deg);
          }
        }
        @keyframes smoke {
          0% {
            transform: translateY(0) scale(1);
            opacity: 0;
          }
          20% {
            opacity: 0.5;
          }
          100% {
            transform: translateY(-60px) scale(3);
            opacity: 0;
            filter: blur(8px);
          }
        }
        .animate-flame-physics {
          animation: flame-physics 0.8s infinite alternate ease-in-out;
        }
        .animate-smoke {
          animation: smoke 2s ease-out forwards;
        }
      `}</style>
    </main>
  );
}
