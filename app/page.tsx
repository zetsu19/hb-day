"use client";

import { useEffect, useState, useRef } from "react";

type Candle = {
  id: number;
  left: string;
};

export default function Home() {
  const [isLit, setIsLit] = useState<boolean>(true);
  const [micAllowed, setMicAllowed] = useState<boolean>(false);
  const [listening, setListening] = useState<boolean>(false);

  // Using a ref for the audio context to handle cleanups better
  const audioContextRef = useRef<AudioContext | null>(null);

  const candles: Candle[] = [
    { id: 1, left: "left-[90px]" },
    { id: 2, left: "left-[130px]" },
    { id: 3, left: "left-[170px]" },
  ];

  const resetCandles = () => {
    setIsLit(true);
  };

  useEffect(() => {
    let analyser: AnalyserNode | null = null;
    let dataArray: Uint8Array<ArrayBuffer>;
    let animationFrameId: number;

    const startListening = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          audio: true,
        });
        setMicAllowed(true);
        setListening(true);

        const AudioContextClass =
          window.AudioContext || (window as any).webkitAudioContext;
        const audioContext = new AudioContextClass();
        audioContextRef.current = audioContext;

        const source = audioContext.createMediaStreamSource(stream);
        analyser = audioContext.createAnalyser();
        source.connect(analyser);

        analyser.fftSize = 256;
        // FIX: Create Uint8Array with explicit ArrayBuffer to resolve the SharedArrayBuffer conflict
        dataArray = new Uint8Array(new ArrayBuffer(analyser.frequencyBinCount));

        const detectBlow = () => {
          if (!analyser) return;

          analyser.getByteTimeDomainData(dataArray);

          let sum = 0;
          for (let i = 0; i < dataArray.length; i++) {
            // Amplitude is the deviation from the midpoint (128)
            sum += Math.abs(dataArray[i] - 128);
          }
          const average = sum / dataArray.length;

          // Sensitivity threshold (15-20 is usually good for a "blow")
          if (average > 18) {
            setIsLit(false);
          }

          animationFrameId = requestAnimationFrame(detectBlow);
        };

        detectBlow();
      } catch (err) {
        console.error("Mic access denied or error:", err);
        setMicAllowed(false);
      }
    };

    startListening();

    return () => {
      if (audioContextRef.current) {
        audioContextRef.current.close();
      }
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-pink-100 font-sans">
      {/* Cake Container */}
      <div className="relative mt-10 w-[300px] h-[150px] bg-pink-500 rounded-t-xl shadow-xl border-b-8 border-pink-600">
        {/* Frosting Drips */}
        <div className="absolute top-0 left-0 w-full h-10 bg-pink-300 rounded-t-xl flex justify-around items-end">
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className="w-8 h-6 bg-pink-300 rounded-full -mb-3"
            ></div>
          ))}
        </div>

        {/* Candles */}
        {candles.map((candle) => (
          <div
            key={candle.id}
            className={`absolute -top-8 ${candle.left} flex flex-col items-center transition-opacity duration-500`}
          >
            {/* Flame */}
            {isLit && (
              <div className="w-4 h-6 bg-orange-400 rounded-full animate-flicker mb-1 shadow-[0_0_15px_rgba(251,191,36,0.8)]">
                <div className="w-2 h-3 bg-yellow-200 rounded-full mx-auto mt-1"></div>
              </div>
            )}

            {/* Wick (Visible when unlit) */}
            {!isLit && <div className="w-0.5 h-2 bg-gray-800 mb-1"></div>}

            {/* Candle body */}
            <div className="w-3 h-10 bg-gradient-to-b from-red-400 to-red-600 rounded-sm"></div>
          </div>
        ))}
      </div>

      {/* Plate */}
      <div className="w-[360px] h-4 bg-white rounded-full shadow-md"></div>

      {/* Instructions / Status */}
      <div className="mt-12 text-center h-20">
        {!micAllowed ? (
          <p className="text-lg text-gray-600 italic">
            Please enable microphone access to blow out the candles! 🎙️
          </p>
        ) : isLit ? (
          <p className="text-3xl font-black text-orange-500 animate-pulse">
            MAKE A WISH & BLOW! 💨
          </p>
        ) : (
          <div className="flex flex-col items-center gap-4">
            <p className="text-3xl font-black text-pink-600">
              Yay! Happy Birthday! 🥳
            </p>
            <button
              onClick={resetCandles}
              className="px-6 py-2 bg-white text-pink-500 font-bold rounded-full shadow-md hover:bg-pink-50 transition-colors"
            >
              Relight Candles 🕯️
            </button>
          </div>
        )}
      </div>

      <style jsx>{`
        @keyframes flicker {
          0% {
            transform: scale(1) rotate(-1deg);
            opacity: 0.9;
          }
          20% {
            transform: scale(1.1) rotate(1deg);
            opacity: 1;
          }
          40% {
            transform: scale(0.9) rotate(-1deg);
            opacity: 0.8;
          }
          60% {
            transform: scale(1.05) rotate(2deg);
            opacity: 0.9;
          }
          80% {
            transform: scale(0.95) rotate(-2deg);
            opacity: 1;
          }
          100% {
            transform: scale(1) rotate(-1deg);
            opacity: 0.9;
          }
        }
        .animate-flicker {
          animation: flicker 0.4s infinite alternate;
          transform-origin: bottom center;
        }
      `}</style>
    </div>
  );
}
