import React from "react";
import { Play, Pause, RotateCcw, ChevronLeft, ChevronRight, FastForward } from "lucide-react";

interface PlayerControlsProps {
  isPlaying: boolean;
  setIsPlaying: (playing: boolean) => void;
  currentIndex: number;
  setCurrentIndex: (idx: number) => void;
  totalSteps: number;
  speed: number;
  setSpeed: (speed: number) => void;
  onReset: () => void;
}

export default function PlayerControls({
  isPlaying,
  setIsPlaying,
  currentIndex,
  setCurrentIndex,
  totalSteps,
  speed,
  setSpeed,
  onReset,
}: PlayerControlsProps) {
  const speeds = [0.25, 0.5, 1, 2, 4];

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const handleNext = () => {
    if (currentIndex < totalSteps - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      setIsPlaying(false); // Stop playing when reach end
    }
  };

  return (
    <div className="border-t border-[#EBE9E4] bg-[#FDFCFB] py-5 px-6 flex flex-col md:flex-row items-center justify-between gap-4 md:gap-0 select-none shrink-0">
      {/* Player buttons */}
      <div className="flex items-center gap-3">
        <button
          onClick={onReset}
          title="Reset"
          className="p-2 hover:bg-[#F5F3EF] border border-[#EBE9E4] rounded-full text-[#706E68] transition-all cursor-pointer active:scale-95"
        >
          <RotateCcw className="w-4 h-4" />
        </button>

        <button
          onClick={handlePrev}
          disabled={currentIndex === 0}
          title="Previous Step"
          className="p-2 hover:bg-[#F5F3EF] border border-[#EBE9E4] rounded-full text-[#706E68] disabled:opacity-40 disabled:cursor-not-allowed transition-all cursor-pointer active:scale-95"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>

        <button
          onClick={() => setIsPlaying(!isPlaying)}
          title={isPlaying ? "Pause" : "Play"}
          className="w-11 h-11 bg-[#10B981] hover:bg-[#059669] text-white rounded-full flex items-center justify-center shadow-md shadow-[#10B98133] transition-all cursor-pointer hover:scale-105 active:scale-95"
        >
          {isPlaying ? <Pause className="w-5 h-5 fill-white" /> : <Play className="w-5 h-5 fill-white ml-0.5" />}
        </button>

        <button
          onClick={handleNext}
          disabled={currentIndex === totalSteps - 1}
          title="Next Step"
          className="p-2 hover:bg-[#F5F3EF] border border-[#EBE9E4] rounded-full text-[#706E68] disabled:opacity-40 disabled:cursor-not-allowed transition-all cursor-pointer active:scale-95"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>

      {/* Progress timeline slider */}
      <div className="flex-1 max-w-lg w-full px-0 md:px-8 flex items-center gap-3">
        <span className="text-[10px] font-mono font-bold text-[#A3A199] w-12 text-right">
          Step {totalSteps > 0 ? currentIndex + 1 : 0} / {totalSteps}
        </span>
        <input
          type="range"
          min="0"
          max={Math.max(0, totalSteps - 1)}
          value={currentIndex}
          onChange={(e) => {
            setCurrentIndex(parseInt(e.target.value, 10));
            setIsPlaying(false);
          }}
          className="flex-1 accent-[#10B981] cursor-pointer h-1.5 bg-[#EBE9E4] rounded-lg appearance-none"
        />
      </div>

      {/* Speed Controls Selector */}
      <div className="flex items-center gap-3">
        <span className="text-[10px] uppercase font-bold text-[#A3A199] tracking-wider">Speed:</span>
        <div className="inline-flex bg-[#F5F3EF] border border-[#EBE9E4] rounded-lg p-0.5">
          {speeds.map((s) => (
            <button
              key={s}
              onClick={() => setSpeed(s)}
              className={`px-2.5 py-1 text-xs font-semibold rounded-md transition-all cursor-pointer ${
                speed === s
                  ? "bg-white text-[#10B981] shadow-xs font-bold"
                  : "text-[#706E68] hover:text-[#0D0D0B]"
              }`}
            >
              {s}x
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
