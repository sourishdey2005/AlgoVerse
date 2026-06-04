import React from "react";
import { Sparkles, Trophy, Zap, CodeSquare } from "lucide-react";

interface HeaderProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  streak: number;
  xp: number;
  level: number;
}

export default function Header({ activeTab, setActiveTab, streak, xp, level }: HeaderProps) {
  const nextLevelXp = level * 1000;
  const progressPercent = Math.min(100, Math.floor((xp / nextLevelXp) * 100));

  return (
    <header className="flex flex-col md:flex-row items-center justify-between px-6 py-4 md:h-16 border-b border-[#EBE9E4] bg-white gap-4 md:gap-0 select-none">
      <div className="flex items-center gap-8 w-full md:w-auto justify-between md:justify-start">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-[#10B981] rounded-lg flex items-center justify-center shadow-sm shadow-[#10B98150]">
            <CodeSquare className="w-4 h-4 text-white" />
          </div>
          <div>
            <span className="text-xl font-bold tracking-tight text-[#0D0D0B]">AlgoVerse</span>
            <span className="text-[9px] font-mono block -mt-1 tracking-wider text-[#10B981] font-bold uppercase">Learning Engine</span>
          </div>
        </div>

        {/* Navigation Link Tabs */}
        <nav className="hidden sm:flex gap-6">
          <button
            onClick={() => setActiveTab("visualizer")}
            className={`text-sm font-medium pb-1 transition-all cursor-pointer ${
              activeTab === "visualizer"
                ? "text-[#10B981] border-b-2 border-[#10B981] font-semibold"
                : "text-[#706E68] hover:text-[#0D0D0B]"
            }`}
          >
            Visualizer
          </button>
          <button
            onClick={() => setActiveTab("practice")}
            className={`text-sm font-medium pb-1 transition-all cursor-pointer ${
              activeTab === "practice"
                ? "text-[#10B981] border-b-2 border-[#10B981] font-semibold"
                : "text-[#706E68] hover:text-[#0D0D0B]"
            }`}
          >
            Practice Bank
          </button>
          <button
            onClick={() => setActiveTab("roadmaps")}
            className={`text-sm font-medium pb-1 transition-all cursor-pointer ${
              activeTab === "roadmaps"
                ? "text-[#10B981] border-b-2 border-[#10B981] font-semibold"
                : "text-[#706E68] hover:text-[#0D0D0B]"
            }`}
          >
            Syllabus Roads
          </button>
          <button
            onClick={() => setActiveTab("analytics")}
            className={`text-sm font-medium pb-1 transition-all cursor-pointer ${
              activeTab === "analytics"
                ? "text-[#10B981] border-b-2 border-[#10B981] font-semibold"
                : "text-[#706E68] hover:text-[#0D0D0B]"
            }`}
          >
            Stats & Analytics
          </button>
          <button
            onClick={() => setActiveTab("community")}
            className={`text-sm font-medium pb-1 transition-all cursor-pointer ${
              activeTab === "community"
                ? "text-[#10B981] border-b-2 border-[#10B981] font-semibold"
                : "text-[#706E68] hover:text-[#0D0D0B]"
            }`}
          >
            Forums Community
          </button>
        </nav>
      </div>

      {/* User Progress Stats Header */}
      <div className="flex items-center gap-4 justify-end w-full md:w-auto">
        {/* XP Level system */}
        <div className="hidden xs:flex flex-col text-right">
          <div className="flex items-center gap-1.5 justify-end">
            <Trophy className="w-3.5 h-3.5 text-[#F59E0B]" />
            <span className="text-xs font-semibold text-[#0D0D0B]">Level {level}</span>
            <span className="text-[10px] text-[#706E68] font-mono">({xp} XP)</span>
          </div>
          <div className="w-28 h-1 bg-[#EBE9E4] rounded-full overflow-hidden mt-1 self-end">
            <div
              className="h-full bg-[#10B981]"
              style={{ width: `${progressPercent}%` }}
            ></div>
          </div>
        </div>

        {/* Streak element */}
        <div className="flex items-center gap-2 px-3 py-1 bg-[#F5F3EF] border border-[#EBE9E4] rounded-full text-xs font-semibold text-[#706E68]">
          <Zap className="w-3.5 h-3.5 text-[#F59E0B] fill-[#F59E0B]" />
          <span>{streak} Day Streak</span>
        </div>

        {/* User profile avatar badge */}
        <div className="w-8 h-8 rounded-full bg-[#EBE9E4] border border-[#D6D3CD] flex items-center justify-center text-xs font-mono font-bold text-[#706E68] select-none shadow-inner bg-gradient-to-tr from-[#EBE9E4] to-white">
          SD
        </div>
      </div>
    </header>
  );
}
