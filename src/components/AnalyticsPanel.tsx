import React from "react";
import { Award, Zap, Trophy, TrendingUp, AlertCircle, Compass, Check, CheckCircle2 } from "lucide-react";
import { UserStats } from "../types";

interface AnalyticsPanelProps {
  stats: UserStats;
}

export default function AnalyticsPanel({ stats }: AnalyticsPanelProps) {
  const levelXpGoal = stats.level * 1000;
  const currentXpPercent = Math.min(100, Math.floor((stats.xp / levelXpGoal) * 100));

  // Heatmap helper representation. Generating 14 columns x 7 rows representing consecutive days
  const daysBreakdown = Array.from({ length: 98 }, (_, i) => {
    let intensity = 0;
    if (i % 12 === 0) intensity = 3;
    else if (i % 5 === 0) intensity = 2;
    else if (i % 3 === 0) intensity = 1;
    return intensity;
  });

  const badgesCatalog = [
    { name: "Bubble Master", desc: "Bubbled up largest array elements.", unlocked: true, icon: "🫧" },
    { name: "Divide Warrior", desc: "Divided list spaces sorted.", unlocked: stats.xp >= 400, icon: "⚔️" },
    { name: "Graph Path Finder", desc: "Relaxes distances via Dijkstra.", unlocked: stats.solvedIds.length >= 2, icon: "🗺️" },
    { name: "Decision Weaver", desc: "DP subproblems calculated.", unlocked: stats.xp >= 1500, icon: "🧠" },
    { name: "Streak Legend", desc: "Unlocked consecutive streak goals.", unlocked: stats.streak >= 10, icon: "🔥" },
    { name: "AlgoVerse Graduate", desc: "Mastered all curricular topics.", unlocked: false, icon: "🎓" },
  ];

  return (
    <div className="flex-1 overflow-y-auto p-6 md:p-8 space-y-6 max-w-5xl mx-auto w-full select-none">
      {/* Title Header */}
      <div>
        <h2 className="text-xl md:text-2xl font-bold text-[#0D0D0B] tracking-tight">Performance Portfolio</h2>
        <p className="text-sm text-[#706E68] mt-1">
          Detailed metrics, masteries, streak histories, and recommended topic vectors.
        </p>
      </div>

      {/* Grid of Key Score Widgets */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Widget 1: Streaks */}
        <div className="bg-white border border-[#EBE9E4] p-5 rounded-xl shadow-xs flex items-center justify-between">
          <div>
            <span className="text-[10px] uppercase font-bold text-[#A3A199] tracking-wider block">Completed Streak</span>
            <span className="text-2xl font-bold text-[#0D0D0B] tracking-tight">{stats.streak} Days</span>
            <span className="text-[10px] text-[#10B981] font-bold block mt-1">Active safe streak!</span>
          </div>
          <div className="w-11 h-11 bg-orange-50 border border-orange-200 rounded-lg flex items-center justify-center">
            <Zap className="w-5 h-5 text-[#F59E0B] fill-[#F59E0B]" />
          </div>
        </div>

        {/* Widget 2: XP Level */}
        <div className="bg-white border border-[#EBE9E4] p-5 rounded-xl shadow-xs flex items-center justify-between">
          <div>
            <span className="text-[10px] uppercase font-bold text-[#A3A199] tracking-wider block">Experience (XP)</span>
            <span className="text-2xl font-bold text-[#0D0D0B] tracking-tight">{stats.xp} XP</span>
            <span className="text-[10px] text-[#A3A199] block mt-1">Level {stats.level} ({currentXpPercent}% progress)</span>
          </div>
          <div className="w-11 h-11 bg-amber-50 border border-amber-200 rounded-lg flex items-center justify-center">
            <Trophy className="w-5 h-5 text-[#F59E0B]" />
          </div>
        </div>

        {/* Widget 3: Problems Solved */}
        <div className="bg-white border border-[#EBE9E4] p-5 rounded-xl shadow-xs flex items-center justify-between">
          <div>
            <span className="text-[10px] uppercase font-bold text-[#A3A199] tracking-wider block">Questions Bank Logged</span>
            <span className="text-2xl font-bold text-[#10B981] tracking-tight">{stats.solvedIds.length} Solved</span>
            <span className="text-[10px] text-[#706E68] block mt-1">Accuracy: 100% (First-Run check)</span>
          </div>
          <div className="w-11 h-11 bg-green-50 border border-green-200 rounded-lg flex items-center justify-center">
            <CheckCircle2 className="w-5 h-5 text-[#10B981]" />
          </div>
        </div>

        {/* Widget 4: Learning Velocity */}
        <div className="bg-white border border-[#EBE9E4] p-5 rounded-xl shadow-xs flex items-center justify-between">
          <div>
            <span className="text-[10px] uppercase font-bold text-[#A3A199] tracking-wider block">Learning Velocity</span>
            <span className="text-2xl font-bold text-blue-600 tracking-tight">{stats.velocity} Topics/wk</span>
            <span className="text-[10px] text-[#A3A199] block mt-1">Steady learning path velocity</span>
          </div>
          <div className="w-11 h-11 bg-blue-50 border border-blue-200 rounded-lg flex items-center justify-center">
            <TrendingUp className="w-5 h-5 text-blue-500" />
          </div>
        </div>
      </div>

      {/* Heatmap Contribution streak map & Level metrics split */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Streak Heatmap contribution block - 8 cols */}
        <div className="lg:col-span-8 bg-white border border-[#EBE9E4] p-6 rounded-xl shadow-xs space-y-4">
          <div>
            <h3 className="font-bold text-sm text-[#0D0D0B] tracking-tight flex items-center gap-1.5">
              <span>Commit Consistency Heatmap</span>
            </h3>
            <p className="text-xs text-[#706E68]">Visual representation of daily algorithmic step runs & playground submits.</p>
          </div>

          {/* Grid contributor */}
          <div className="bg-[#FDFCFB] border border-[#EBE9E4] p-4.5 rounded-lg overflow-x-auto">
            <div className="flex flex-col gap-1 w-full min-w-[320px]">
              <div className="grid grid-flow-col grid-rows-7 gap-1 self-start">
                {daysBreakdown.map((val, idx) => {
                  let cellBg = "bg-[#F5F3EF]"; // none
                  if (val === 1) cellBg = "bg-[#D1FAE5]"; // light
                  else if (val === 2) cellBg = "bg-[#6EE7B7]"; // mid
                  else if (val === 3) cellBg = "bg-[#10B981]"; // heavy

                  return (
                    <div
                      key={idx}
                      title={`Active day commits. Intensity level: ${val}`}
                      className={`w-3 h-3 rounded-xs ${cellBg} transition-colors hover:scale-110`}
                    />
                  );
                })}
              </div>

              {/* Heatmap Legend */}
              <div className="flex items-center gap-1.5 text-[9px] text-[#A3A199] font-bold justify-end mt-2 uppercase tracking-wider">
                <span>Less</span>
                <div className="w-2.5 h-2.5 bg-[#F5F3EF] rounded-xs" />
                <div className="w-2.5 h-2.5 bg-[#D1FAE5] rounded-xs" />
                <div className="w-2.5 h-2.5 bg-[#6EE7B7] rounded-xs" />
                <div className="w-2.5 h-2.5 bg-[#10B981] rounded-xs" />
                <span>More</span>
              </div>
            </div>
          </div>
        </div>

        {/* Topic Mastery list card - 4 cols */}
        <div className="lg:col-span-4 bg-white border border-[#EBE9E4] p-6 rounded-xl shadow-xs space-y-4">
          <div>
            <h3 className="font-bold text-sm text-[#0D0D0B] tracking-tight">Algorithmic Category Masteries</h3>
            <p className="text-xs text-[#706E68]">Status breakdown across fundamental subjects.</p>
          </div>

          <div className="space-y-3.5">
            {[
              { name: "Sorting Methods", percent: Math.min(100, stats.solvedIds.length * 20 + 20), color: "bg-[#10B981]" },
              { name: "Array Search & Index", percent: 65, color: "bg-[#10B981]" },
              { name: "List pointer networks", percent: stats.solvedIds.includes("reverse-list") ? 50 : 15, color: "bg-[#10B981]" },
              { name: "Stacks/Queues structures", percent: stats.solvedIds.includes("valid-parentheses") ? 50 : 0, color: "bg-[#10B981]" },
              { name: "Dynamic programming", percent: 0, color: "bg-[#10B981]" },
            ].map((subject) => (
              <div key={subject.name} className="space-y-1">
                <div className="flex justify-between text-xs font-semibold text-[#1A1A17]">
                  <span>{subject.name}</span>
                  <span className="font-mono text-[#706E68]">{subject.percent}%</span>
                </div>
                <div className="w-full h-1.5 bg-[#F5F3EF] rounded-full overflow-hidden">
                  <div
                    className={`h-full ${subject.color}`}
                    style={{ width: `${subject.percent}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Badges unlocked catalog and nudge actions splitting */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Recommendation nudge - Col 1 */}
        <div className="p-6 bg-[#FDFCFB] border border-[#EBE9E4] rounded-xl flex flex-col justify-between gap-5 col-span-1">
          <div className="space-y-2">
            <div className="w-8 h-8 rounded-lg bg-[#E6F4EA] flex items-center justify-center border border-[#A7F3D0]">
              <Compass className="w-4 h-4 text-[#10B981]" />
            </div>
            <h3 className="font-bold text-sm text-[#0D0D0B]">Next Up Recommended Topic</h3>
            <p className="text-xs text-[#706E68] leading-relaxed">
              Based on your completed Bubble and Binary Search milestones, we suggest diving into the <span className="font-bold">Linked List reversing operations</span> visualizer next.
            </p>
          </div>
          <p className="text-[10px] font-bold uppercase tracking-wider text-[#10B981] flex items-center gap-1">
            <span>Launch LL Visualizer</span>
            <span>→</span>
          </p>
        </div>

        {/* Unlocked Badges collection grid - Cols 2 & 3 */}
        <div className="md:col-span-2 bg-white border border-[#EBE9E4] p-6 rounded-xl shadow-xs space-y-4">
          <div>
            <h3 className="font-bold text-sm text-[#0D0D0B]">Achievements & Badge collection</h3>
            <p className="text-xs text-[#706E68]">Earn credit symbols as you master algorithm runs.</p>
          </div>

          <div className="grid grid-cols-2 xs:grid-cols-3 gap-3">
            {badgesCatalog.map((badge, idx) => (
              <div
                key={idx}
                className={`p-3 border rounded-xl flex items-center gap-2.5 transition-all text-xs font-sans ${
                  badge.unlocked
                    ? "border-[#EBE9E4] bg-white text-[#1a1a17]"
                    : "border-[#F5F3EF] bg-[#F9F8F6] text-[#A3A199] opacity-55"
                }`}
              >
                <div className="text-2xl select-none">{badge.icon}</div>
                <div className="truncate">
                  <div className="font-semibold truncate">{badge.name}</div>
                  <div className="text-[9.5px] leading-tight text-[#706E68] truncate">{badge.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
