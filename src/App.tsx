import React, { useState, useEffect } from "react";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import PlayerControls from "./components/PlayerControls";
import CodePanel from "./components/CodePanel";
import VisualizerWorkspace from "./components/VisualizerWorkspace";
import PracticePanel from "./components/PracticePanel";
import RoadmapPanel from "./components/RoadmapPanel";
import AnalyticsPanel from "./components/AnalyticsPanel";
import CommunityPanel from "./components/CommunityPanel";
import { ALGORITHMS } from "./data/algorithms";
import { generateSteps } from "./utils/stepGenerators";
import { AlgorithmItem, AlgorithmStep, UserStats } from "./types";
import { Code, Eye, Info, Sparkles, MessageCircle } from "lucide-react";

export default function App() {
  const [activeTab, setActiveTab] = useState<string>("visualizer");
  const [selectedAlgorithm, setSelectedAlgorithm] = useState<AlgorithmItem>(ALGORITHMS[0]);
  const [inputValue, setInputValue] = useState<string>("");
  const [steps, setSteps] = useState<AlgorithmStep[]>([]);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [speed, setSpeed] = useState<number>(1);

  // Persistent User Statistics Hooks syncing with SQLite on fullstack Express server
  const [visitorId] = useState<string>(() => {
    let id = localStorage.getItem("algoverse-visitor-id");
    if (!id) {
      id = "visitor_" + Math.random().toString(36).substring(2, 11) + "_" + Date.now().toString(36);
      localStorage.setItem("algoverse-visitor-id", id);
    }
    return id;
  });

  const [xp, setXp] = useState<number>(350);
  const [streak, setStreak] = useState<number>(12);
  const [solvedIds, setSolvedIds] = useState<string[]>(["bubble-sort-easy"]);

  // Fetch initial visitor statistics from SQLite on load
  useEffect(() => {
    const fetchUserStats = async () => {
      try {
        const res = await fetch(`/api/user-stats?visitorId=${visitorId}`);
        if (res.ok) {
          const statsVal = await res.json();
          setXp(statsVal.xp);
          setStreak(statsVal.streak);
          setSolvedIds(statsVal.solvedIds);
        }
      } catch (err) {
        console.error("Error loading visitor state from SQLite backend", err);
      }
    };
    fetchUserStats();
  }, [visitorId]);

  // Sync state mutation with SQL database helper
  const syncToDatabase = async (nextXp: number, nextStreak: number, nextSolved: string[]) => {
    try {
      await fetch("/api/user-stats/update", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          visitorId,
          xp: nextXp,
          streak: nextStreak,
          solvedIds: nextSolved,
        }),
      });
    } catch (err) {
      console.error("Error writing user stats mutation to SQLite", err);
    }
  };

  // Calculate level dynamically based on XP increments
  const level = Math.floor(xp / 1000) + 1;

  // Sync stats locally as fallback
  useEffect(() => {
    localStorage.setItem("algoverse-xp", xp.toString());
  }, [xp]);

  useEffect(() => {
    localStorage.setItem("algoverse-streak", streak.toString());
  }, [streak]);

  useEffect(() => {
    localStorage.setItem("algoverse-solved", JSON.stringify(solvedIds));
  }, [solvedIds]);

  // Load new input & steps whenever active algorithm selection shifts
  useEffect(() => {
    setInputValue(selectedAlgorithm.initialInputValue);
    const generated = generateSteps(selectedAlgorithm.id, selectedAlgorithm.initialInputValue);
    setSteps(generated);
    setCurrentIndex(0);
    setIsPlaying(false);
  }, [selectedAlgorithm]);

  // Handle active simulation interval playback loop
  useEffect(() => {
    let timer: any = null;
    if (isPlaying) {
      timer = setInterval(() => {
        setCurrentIndex((prev) => {
          if (prev < steps.length - 1) {
            return prev + 1;
          } else {
            setIsPlaying(false);
            return prev;
          }
        });
      }, 1000 / speed);
    }
    return () => {
      if (timer) clearInterval(timer);
    };
  }, [isPlaying, speed, steps.length]);

  const handleRefresh = () => {
    const generated = generateSteps(selectedAlgorithm.id, inputValue);
    setSteps(generated);
    setCurrentIndex(0);
    setIsPlaying(false);
  };

  const handleReset = () => {
    setCurrentIndex(0);
    setIsPlaying(false);
  };

  const handleAddXp = (amount: number) => {
    setXp((prev) => {
      const next = prev + amount;
      syncToDatabase(next, streak, solvedIds);
      return next;
    });
  };

  const handleLogSolve = (id: string) => {
    setSolvedIds((prev) => {
      let next = prev;
      if (!prev.includes(id)) {
        next = [...prev, id];
      }
      syncToDatabase(xp, streak, next);
      return next;
    });
  };

  // Compile active user statistics package
  const userStats: UserStats = {
    xp,
    level,
    streak,
    solvedIds,
    solvedCount: solvedIds.length,
    badges: ["Bubble Master"],
    velocity: Math.floor(solvedIds.length * 1.5) + 3,
    heatmap: {},
  };

  const activeStep: AlgorithmStep = steps[currentIndex] || {
    stepNumber: 0,
    description: "Initializing visual step modules...",
    variables: {},
    highlightedLines: [],
    state: {},
  };

  return (
    <div id="root-viewport" className="h-screen flex flex-col bg-[#FDFCFB] text-[#1A1A17] font-sans antialiased overflow-hidden">
      {/* Platform Header */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        streak={streak}
        xp={xp}
        level={level}
      />

      {/* Primary Workstation Dashboard Router */}
      <main className="flex-1 overflow-hidden flex flex-col md:flex-row">
        {activeTab === "visualizer" && (
          <>
            {/* Algorithm Search Tree Left-Bar */}
            <Sidebar
              selectedAlgorithm={selectedAlgorithm}
              setSelectedAlgorithm={setSelectedAlgorithm}
            />

            {/* Simulation Canvas and Line Highlights Middle-Right wrapper */}
            <div className="flex-1 flex flex-col lg:flex-row overflow-hidden bg-white">
              <div className="flex-1 flex flex-col overflow-hidden">
                {/* Visual Canvas boards */}
                <VisualizerWorkspace
                  selectedAlgorithm={selectedAlgorithm}
                  currentStep={activeStep}
                  inputValue={inputValue}
                  setInputValue={setInputValue}
                  onRefresh={handleRefresh}
                />

                {/* Bottom Steppers console */}
                <PlayerControls
                  isPlaying={isPlaying}
                  setIsPlaying={setIsPlaying}
                  currentIndex={currentIndex}
                  setCurrentIndex={setCurrentIndex}
                  totalSteps={steps.length}
                  speed={speed}
                  setSpeed={setSpeed}
                  onReset={handleReset}
                />
              </div>

              {/* Code Line Highlighters right-bar */}
              <CodePanel
                code={selectedAlgorithm.code}
                codeLanguage={selectedAlgorithm.codeLanguage}
                highlightedLines={activeStep.highlightedLines || []}
                variables={activeStep.state || {}}
                description={activeStep.description}
                algoId={selectedAlgorithm.id}
              />
            </div>
          </>
        )}

        {/* Tab 2: LeetCode Sandbox Question Bank */}
        {activeTab === "practice" && (
          <PracticePanel
            onAddXp={handleAddXp}
            solvedIds={solvedIds}
            onLogSolve={handleLogSolve}
          />
        )}

        {/* Tab 3: Timeline roadmap milestones */}
        {activeTab === "roadmaps" && <RoadmapPanel xp={xp} />}

        {/* Tab 4: Achievements & Commits calendars stats */}
        {activeTab === "analytics" && <AnalyticsPanel stats={userStats} />}

        {/* Tab 5: Local discussion chat forum boards */}
        {activeTab === "community" && <CommunityPanel stats={userStats} />}
      </main>

      {/* Natural Tones Designer footer */}
      <footer className="h-7 border-t border-[#EBE9E4] bg-[#F9F8F6] px-6 flex items-center justify-between text-[9px] text-[#A3A199] font-mono select-none shrink-0">
        <div>
          STATUS: <span className="text-[#10B981] font-bold">READY</span>
        </div>
        <div className="tracking-widest">
          MADE WITH CARE BY <span className="font-bold text-[#706E68]">SOURISH DEY</span>
        </div>
        <div>
          ENVIRONMENT: <span className="font-bold">MICRO-BROWSER ENGINE</span>
        </div>
      </footer>
    </div>
  );
}
