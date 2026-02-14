"use client";

import { useEffect, useState } from "react";

type Candle = {
  id: number;
  left: string;
};

export default function Home() {
  const [isLit, setIsLit] = useState<boolean>(true);
  const [listening, setListening] = useState<boolean>(false);
  const [micAllowed, setMicAllowed] = useState<boolean>(false);

  // 3 candles with positions
  const candles: Candle[] = [
    { id: 1, left: "w-6 left-[90px]" },
    { id: 2, left: "w-6 left-[130px]" },
    { id: 3, left: "w-6 left-[170px]" },
  ];

  useEffect(() => {
    let audioContext: AudioContext | null = null;
    let analyser: AnalyserNode | null = null;
    let dataArray: Uint8Array | null = null;

    const startListening = async () => {
      try {
        const stream: MediaStream = await navigator.mediaDevices.getUserMedia({
          audio: true,
        });
        setMicAllowed(true);
        setListening(true);

        audioContext = new (
          window.AudioContext || (window as any).webkitAudioContext
        )();
        const source: MediaStreamAudioSourceNode =
          audioContext.createMediaStreamSource(stream);
        analyser = audioContext.createAnalyser();
        source.connect(analyser);
        analyser.fftSize = 256;
        dataArray = new Uint8Array(analyser.frequencyBinCount);

        const detectBlow = () => {
          if (!analyser || !dataArray) return;

          analyser.getByteTimeDomainData(dataArray);
          let sum = 0;
          for (let i = 0; i < dataArray.length; i++) {
            sum += Math.abs(dataArray[i] - 128);
          }
          const average = sum / dataArray.length;

          setIsLit((prev) => (average > 15 ? false : prev));
          requestAnimationFrame(detectBlow);
        };

        detectBlow();
      } catch (err) {
        console.log("Mic access denied", err);
      }
    };

    startListening();

    return () => {
      if (audioContext) audioContext.close();
    };
  }, []);

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-pink-100">
      {/* Cake */}
      <div className="relative mt-10 w-[300px] h-[150px] bg-pink-500 rounded-t-xl shadow-lg">
        {/* Frosting */}
        <div className="absolute top-0 left-0 w-full h-8 bg-pink-300 rounded-t-xl"></div>

        {/* Candles */}
        {isLit &&
          candles.map((candle) => (
            <div
              key={candle.id}
              className={`absolute -top-6 ${candle.left} flex flex-col items-center`}
            >
              {/* Flame */}
              <div className="w-3 h-3 bg-yellow-400 rounded-full animate-flicker mb-1"></div>
              {/* Candle body */}
              <div className="w-2 h-6 bg-red-500 rounded"></div>
            </div>
          ))}
      </div>

      {!micAllowed && (
        <p className="mt-6 text-lg text-gray-700">
          Please allow microphone to blow the candles 🎉
        </p>
      )}

      {listening && isLit && (
        <p className="mt-6 text-2xl font-bold text-yellow-500 animate-pulse">
          BLOW 💨
        </p>
      )}

      {!isLit && (
        <p className="mt-6 text-2xl font-bold text-red-500">
          Candles are out! 🎂
        </p>
      )}

      {/* Flicker animation */}
      <style jsx>{`
        @keyframes flicker {
          0% {
            opacity: 1;
            transform: translateY(0px);
          }
          50% {
            opacity: 0.6;
            transform: translateY(-2px);
          }
          100% {
            opacity: 1;
            transform: translateY(0px);
          }
        }
        .animate-flicker {
          animation: flicker 0.3s infinite;
        }
      `}</style>
    </div>
  );
}
