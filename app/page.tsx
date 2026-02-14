"use client";

import { useState, useEffect, useRef } from "react";

export default function PremiumBirthdayCake() {
  const [isLit, setIsLit] = useState(true);
  const [showText, setShowText] = useState(false);

  const analyserRef = useRef<AnalyserNode | null>(null);
  const dataArrayRef = useRef<Uint8Array | null>(null);
  const animationRef = useRef<number | null>(null);

  // your original button function (unchanged)
  const handleBlow = () => {
    if (!isLit) {
      setIsLit(true);
      setShowText(false);
      return;
    }
    setIsLit(false);
    setTimeout(() => setShowText(true), 600);
  };

  // MICROPHONE BLOW DETECTION (ADDED)
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

      // BLOW THRESHOLD (adjust if needed)
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
    <main className="flex items-center justify-center min-h-screen bg-[#0f172a] overflow-hidden">
      <div
        className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${isLit ? "opacity-40" : "opacity-0"}`}
        style={{
          background:
            "radial-gradient(circle at center, #fbbf24 0%, transparent 70%)",
        }}
      />

      <div className="relative z-10 flex flex-col items-center">
        <div className="relative mt-20">
          <div className="absolute left-1/2 -translate-x-1/2 -top-24 z-30 flex flex-col items-center">
            <div className="h-16 flex items-end justify-center mb-1">
              {isLit ? (
                <div className="relative">
                  <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-12 h-16 bg-orange-500/40 blur-xl animate-pulse" />
                  <div className="w-4 h-10 bg-gradient-to-t from-orange-600 via-yellow-400 to-white rounded-full animate-flame-physics shadow-[0_0_15px_#f59e0b]" />
                  <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-2 h-2 bg-blue-500/60 rounded-full blur-[2px]" />
                </div>
              ) : (
                <div className="flex flex-col items-center animate-smoke">
                  <div className="w-1 h-12 bg-white/20 blur-sm rounded-full" />
                </div>
              )}
            </div>

            <div className="relative w-4 h-16 rounded-sm overflow-hidden shadow-lg bg-gradient-to-r from-blue-600 via-blue-400 to-blue-600">
              <div className="absolute inset-0 opacity-30 bg-[repeating-linear-gradient(45deg,transparent,transparent_5px,#fff_5px,#fff_10px)]" />
              <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-1 h-3 bg-gray-900 rounded-full" />
            </div>
          </div>

          <div className="relative flex flex-col items-center">
            <div className="w-64 h-24 bg-[#fff1f2] rounded-[100%] z-20 shadow-[inset_0_-10px_20px_rgba(0,0,0,0.1)] flex items-center justify-center border-b-4 border-pink-100">
              <div
                className="absolute inset-0 opacity-40 pointer-events-none"
                style={{
                  backgroundImage: `radial-gradient(#ec4899 2px, transparent 2px), radial-gradient(#3b82f6 2px, transparent 2px)`,
                  backgroundSize: "20px 20px",
                  backgroundPosition: "0 0, 10px 10px",
                }}
              />
            </div>

            <div className="w-64 h-32 -mt-12 bg-gradient-to-b from-[#f472b6] to-[#db2777] rounded-b-[20px] shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full flex justify-around">
                {[...Array(8)].map((_, i) => (
                  <div
                    key={i}
                    className="w-8 bg-[#fff1f2] rounded-b-full shadow-md transition-all duration-500"
                    style={{ height: `${20 + Math.sin(i) * 10}px` }}
                  />
                ))}
              </div>
            </div>

            <div className="w-[340px] h-10 bg-gradient-to-b from-gray-200 to-gray-400 rounded-[100%] -mt-6 shadow-xl border-t border-white/50" />
          </div>
        </div>

        <div className="mt-16 text-center space-y-6">
          <div
            className={`transition-all duration-1000 transform ${
              showText ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
            }`}
          >
            <h1 className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-purple-400 drop-shadow-sm">
              HAPPY BIRTHDAY!
            </h1>

            <p className="text-gray-400 mt-2 font-medium tracking-widest uppercase">
              Wish Granted ✨
            </p>
          </div>

          <button
            onClick={handleBlow}
            className="group relative px-10 py-4 bg-white rounded-full overflow-hidden transition-all active:scale-95 shadow-[0_0_20px_rgba(255,255,255,0.2)]"
          >
            <span className="relative z-10 font-black text-gray-900 tracking-wider">
              {isLit ? "BLOW THE CANDLE" : "RELIGHT"}
            </span>

            <div className="absolute inset-0 bg-gradient-to-r from-pink-200 to-blue-200 opacity-0 group-hover:opacity-100 transition-opacity" />
          </button>
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
          animation: flame-physics 0.6s infinite alternate ease-in-out;
          transform-origin: bottom center;
        }

        .animate-smoke {
          animation: smoke 2.5s ease-out forwards;
        }
      `}</style>
    </main>
  );
}
