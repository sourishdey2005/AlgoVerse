import React, { useState } from "react";
import { BookOpen, Star, Lock, CheckCircle2, ChevronRight, PlayCircle, Award, Coffee } from "lucide-react";

interface RoadmapPanelProps {
  xp: number;
}

export default function RoadmapPanel({ xp }: RoadmapPanelProps) {
  const [activeTier, setActiveTier] = useState<string>("All");

  const paths = [
    {
      id: "beginner",
      title: "1. Beginner Track",
      sub: "Foundations of Memory",
      xpRequired: 0,
      completionBonus: 300,
      difficulty: "Basic Core",
      color: "border-emerald-300 bg-emerald-50/20 text-emerald-800",
      topics: [
        { name: "Arrays Traversal", desc: "Linear memory blocks storage scanning.", completed: true, bonusXp: 100 },
        { name: "Hashing & Lookups", desc: "Key-value indexing in constant O(1) time.", completed: true, bonusXp: 150 },
        { name: "Sorting basics", desc: "Bubble Sort, Insertion Sorter, Selection.", completed: true, bonusXp: 150 },
        { name: "Two Pointer / Strings", desc: "Linear reverse & sliding techniques.", completed: false, bonusXp: 200 },
      ],
    },
    {
      id: "intermediate",
      title: "2. Intermediate Track",
      sub: "Linked Structures",
      xpRequired: 800, // Show lock if user's logged XP < 800
      completionBonus: 500,
      difficulty: "Recursive Core",
      color: "border-amber-300 bg-amber-50/25 text-amber-800",
      topics: [
        { name: "Linked List Reversals", desc: "Manipulating node pointers in linear steps.", completed: false, bonusXp: 250 },
        { name: "Stack LIFO / Queues FIFO", desc: "Valid bracket strings and deque buffers.", completed: false, bonusXp: 250 },
        { name: "Binary Trees & BST", desc: "Recursive trees structure & sorting paths.", completed: false, bonusXp: 300 },
        { name: "Graph traversals BFS/DFS", desc: "Spanning connections and matrix representations.", completed: false, bonusXp: 400 },
      ],
    },
    {
      id: "advanced",
      title: "3. Advanced Track",
      sub: "Optimal Computations",
      xpRequired: 2000, // Show lock if user's logged XP < 2000
      completionBonus: 1000,
      difficulty: "Complex Optimization",
      color: "border-indigo-300 bg-indigo-50/20 text-indigo-800",
      topics: [
        { name: "Dynamic Programming DP", desc: "Overlapping subproblem tabulation matrices.", completed: false, bonusXp: 500 },
        { name: "Trie & String Prefixes", desc: "Word lookups, spell solvers, character steps.", completed: false, bonusXp: 450 },
        { name: "Segment Tree ranges", desc: "Logarithmic interval range query updates.", completed: false, bonusXp: 600 },
        { name: "Dijkstra & Weighted graphs", desc: "Shortest route priority queue relaxations.", completed: false, bonusXp: 500 },
      ],
    },
  ];

  return (
    <div className="flex-1 overflow-y-auto p-6 md:p-8 space-y-8 max-w-5xl mx-auto w-full select-none">
      {/* Title Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#EBE9E4] pb-6">
        <div>
          <h2 className="text-xl md:text-2xl font-bold text-[#0D0D0B] tracking-tight">Learning Roads</h2>
          <p className="text-sm text-[#706E68] mt-1">
            Complete sequential milestones to gain badges and master algorithmic designs step-by-step.
          </p>
        </div>

        {/* Filters */}
        <div className="flex items-center bg-[#F9F8F6] border border-[#EBE9E4] rounded-lg p-1 shrink-0 self-start md:self-auto">
          {["All", "Beginner", "Intermediate", "Advanced"].map((tier) => (
            <button
              key={tier}
              onClick={() => setActiveTier(tier)}
              className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-all cursor-pointer ${
                activeTier === tier ? "bg-white text-[#10B981] shadow-xs font-bold" : "text-[#706E68] hover:text-[#0D0D0B]"
              }`}
            >
              {tier}
            </button>
          ))}
        </div>
      </div>

      {/* Interactive visual SVG connectors and road boxes */}
      <div className="space-y-12 relative">
        {/* Longitudinal connector path */}
        <div className="absolute left-10 md:left-12 top-6 bottom-6 w-1 border-l-2 border-dashed border-[#D6D3CD] pointer-events-none hidden sm:block" />

        {paths
          .filter((path) => activeTier === "All" || path.title.toLowerCase().includes(activeTier.toLowerCase()))
          .map((path) => {
            const isLocked = xp < path.xpRequired;

            return (
              <div key={path.id} className="relative flex flex-col md:flex-row gap-6 md:gap-10">
                {/* Visual node badge on the track */}
                <div className="hidden sm:flex items-center justify-center w-20 h-20 rounded-full border-4 border-white bg-[#F9F8F6] z-10 shadow-sm shrink-0">
                  {isLocked ? (
                    <Lock className="w-5 h-5 text-[#A3A199]" />
                  ) : path.id === "beginner" ? (
                    <Award className="w-8 h-8 text-[#10B981]" />
                  ) : (
                    <PlayCircle className="w-8 h-8 text-[#10B981]" />
                  )}
                </div>

                {/* Path Card details */}
                <div className={`flex-1 border border-[#EBE9E4] rounded-xl p-6 bg-white shadow-xs relative ${isLocked ? "opacity-65" : ""}`}>
                  {/* Lock Screen overlay */}
                  {isLocked && (
                    <div className="absolute inset-0 bg-[#F5F3EF]/30 backdrop-blur-xs rounded-xl flex flex-col items-center justify-center gap-2 select-none z-20">
                      <Lock className="w-8 h-8 text-[#706E68]" />
                      <div className="text-xs font-bold text-[#0D0D0B] uppercase tracking-wider">
                        Locked milestone
                      </div>
                      <div className="text-[10px] text-[#706E68]">
                        Requires <span className="font-bold text-[#10B981]">{path.xpRequired} XP</span> to unlock pathway (Core level).
                      </div>
                    </div>
                  )}

                  {/* Headers info */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-[#EBE9E4] pb-4 gap-2">
                    <div>
                      <h3 className="font-bold text-lg text-[#0D0D0B] tracking-tight">{path.title}</h3>
                      <p className="text-xs text-[#706E68] font-medium leading-none mt-1">{path.sub}</p>
                    </div>

                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-[#F5F3EF] border border-[#EBE9E4] text-[#706E68]">
                        Complete: +{path.completionBonus} XP
                      </span>
                      <span className="text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-blue-50 border border-blue-200 text-blue-700">
                        {path.difficulty}
                      </span>
                    </div>
                  </div>

                  {/* Subtopics checklist block */}
                  <div className="mt-5 grid grid-cols-1 md:grid-cols-2 gap-4">
                    {path.topics.map((topic, index) => (
                      <div
                        key={index}
                        className="flex items-start gap-3 p-3.5 bg-[#F9F8F6] hover:bg-[#F5F3EF]/60 border border-[#EBE9E4] rounded-lg transition-all"
                      >
                        {topic.completed ? (
                          <CheckCircle2 className="w-5 h-5 text-[#10B981] shrink-0 stroke-[#10B981] fill-[#E6F4EA]" />
                        ) : (
                          <div className="w-5 h-5 rounded-full border-2 border-[#D6D3CD] bg-white shrink-0" />
                        )}

                        <div className="space-y-0.5 truncate">
                          <h4 className="font-semibold text-xs text-[#0D0D0B] truncate">{topic.name}</h4>
                          <p className="text-[10px] text-[#706E68] break-words leading-relaxed leading-tighter">
                            {topic.desc}
                          </p>
                          <span className="text-[9px] font-mono font-bold text-[#10B981] block mt-1">
                            +{topic.bonusXp} XP credit
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
}
