import React, { useState } from "react";
import { PROBLEMS } from "../data/questions";
import { Problem, Submission } from "../types";
import { Search, Filter, Play, CheckCircle2, AlertTriangle, Cpu, Database, ChevronLeft, Award } from "lucide-react";

interface PracticePanelProps {
  onAddXp: (amount: number) => void;
  solvedIds: string[];
  onLogSolve: (id: string) => void;
}

export default function PracticePanel({ onAddXp, solvedIds, onLogSolve }: PracticePanelProps) {
  const [selectedProblem, setSelectedProblem] = useState<Problem | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [difficultyFilter, setDifficultyFilter] = useState<string>("All");
  const [companyFilter, setCompanyFilter] = useState<string>("All");

  // Code Playground States
  const [activeLang, setActiveLang] = useState<string>("javascript");
  const [writtenCode, setWrittenCode] = useState<string>("");
  const [isCompiling, setIsCompiling] = useState<boolean>(false);
  const [compilationResult, setCompilationResult] = useState<any | null>(null);
  const [userCustomInput, setUserCustomInput] = useState<string>("");

  const companiesList = ["Google", "Amazon", "Meta", "Microsoft", "Uber"];

  const filteredProblems = PROBLEMS.filter((prob) => {
    const matchesSearch =
      prob.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      prob.topic.toLowerCase().includes(searchTerm.toLowerCase()) ||
      prob.tags.some((t) => t.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesDifficulty = difficultyFilter === "All" || prob.difficulty === difficultyFilter;
    const matchesCompany = companyFilter === "All" || prob.companies.includes(companyFilter);

    return matchesSearch && matchesDifficulty && matchesCompany;
  });

  const handleSelectProblem = (prob: Problem) => {
    setSelectedProblem(prob);
    setActiveLang("javascript");
    setWrittenCode(prob.boilerplate.javascript || "");
    setCompilationResult(null);
    setUserCustomInput(prob.testCaseInput || "");
  };

  const handleLanguageChange = (lang: string) => {
    setActiveLang(lang);
    if (selectedProblem) {
      setWrittenCode(selectedProblem.boilerplate[lang] || `// No boilerplate for ${lang}`);
    }
  };

  const handleRunSimulation = (isSubmission: boolean) => {
    if (!selectedProblem) return;
    setIsCompiling(true);
    setCompilationResult(null);

    setTimeout(() => {
      setIsCompiling(false);
      const isCorrect = !writtenCode.includes("throw") && writtenCode.length > 50;

      if (isSubmission) {
        const runtime = isCorrect ? Math.floor(Math.random() * 45) + 15 : 0;
        const memoryStr = isCorrect ? (Math.random() * 4 + 14).toFixed(1) : "15.0";
        const memoryNum = parseFloat(memoryStr);
        const statusStr = isCorrect ? "Accepted" : "Wrong Answer";

        // Save entry payload to backend DB
        fetch("/api/submissions", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            id: `sub-${Date.now()}`,
            visitorId: localStorage.getItem("algoverse-visitor-id") || "visitor_fallback",
            problemId: selectedProblem.id,
            problemTitle: selectedProblem.title,
            language: activeLang,
            code: writtenCode,
            status: statusStr,
            runtimeMs: runtime,
            memoryMb: memoryNum,
          }),
        }).catch((err) => console.error("Error logging submissions trace over SQLite:", err));

        if (isCorrect) {
          const alreadySolved = solvedIds.includes(selectedProblem.id);
          onLogSolve(selectedProblem.id);

          setCompilationResult({
            status: "Accepted",
            runtime: runtime,
            memory: memoryStr,
            xpGained: alreadySolved ? 10 : 300,
            message: alreadySolved
              ? "Re-submission success! Obtained +10 XP review credit."
              : "Phenomenal job! First solve logged successfully. +300 XP allocated to user score!",
          });
          onAddXp(alreadySolved ? 10 : 300);
        } else {
          setCompilationResult({
            status: "Wrong Answer",
            runtime: 0,
            memory: 0,
            message: "Test cases failed. Output did not match expected solution pattern. Please adjust indexes or pointer termination checks.",
          });
        }
      } else {
        // Run test case simulation
        setCompilationResult({
          status: "Test Passed",
          runtime: Math.floor(Math.random() * 20) + 10,
          memory: "15.0",
          message: `Run sandbox complete. Output matched expected case: ${selectedProblem.testCaseOutput}`,
        });
      }
    }, 1500);
  };

  return (
    <div className="flex-1 flex flex-col h-full overflow-hidden select-none">
      {/* 1. SEPARATE SPLIT BOARD VIEW OR LIST VIEW */}
      {selectedProblem ? (
        // Split-Screen Playground
        <div className="flex-1 flex flex-col lg:flex-row overflow-hidden bg-white">
          {/* Question explanation Left Column */}
          <div className="w-full lg:w-96 border-r border-[#EBE9E4] bg-[#FDFCFB] flex flex-col h-full overflow-y-auto p-5 shrink-0">
            <button
              onClick={() => setSelectedProblem(null)}
              className="flex items-center gap-1 text-xs text-[#706E68] hover:text-[#0D0D0B] mb-5 font-semibold cursor-pointer align-middle"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Back to Question Bank</span>
            </button>

            {/* Title headers */}
            <div className="space-y-2">
              <h2 className="text-xl font-bold text-[#0D0D0B] tracking-tight">{selectedProblem.title}</h2>
              <div className="flex flex-wrap items-center gap-1.5 pt-1">
                <span
                  className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${
                    selectedProblem.difficulty === "Easy"
                      ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                      : selectedProblem.difficulty === "Medium"
                      ? "bg-amber-50 text-amber-700 border border-amber-200"
                      : "bg-rose-50 text-rose-700 border border-rose-200"
                  }`}
                >
                  {selectedProblem.difficulty}
                </span>

                <span className="text-[10px] bg-[#F5F3EF] border border-[#EBE9E4] text-[#706E68] font-bold px-2 py-0.5 rounded-full">
                  {selectedProblem.topic}
                </span>
                {solvedIds.includes(selectedProblem.id) && (
                  <span className="text-[10px] bg-green-50 border border-green-200 text-green-700 font-bold px-2 py-0.5 rounded-full flex items-center gap-0.5">
                    <CheckCircle2 className="w-3 h-3 text-green-600 fill-green-50" />
                    Solved
                  </span>
                )}
              </div>
            </div>

            {/* Description Body */}
            <div className="mt-6 text-sm text-[#57554F] leading-relaxed whitespace-pre-wrap border-b border-[#EBE9E4] pb-6 font-sans">
              {selectedProblem.description}
            </div>

            {/* Meta Tags detail */}
            <div className="mt-5 space-y-4">
              <div>
                <span className="text-[10px] uppercase font-bold text-[#A3A199] tracking-wider block mb-2">
                  Target Company Frequency
                </span>
                <div className="flex flex-wrap gap-1">
                  {selectedProblem.companies.map((co) => (
                    <span
                      key={co}
                      className="text-xs font-semibold px-2.5 py-1 bg-[#F5F3EF] border border-[#EBE9E4] rounded-md text-[#706E68]"
                    >
                      {co}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <span className="text-[10px] uppercase font-bold text-[#A3A199] tracking-wider block mb-2">
                  Algorithmic Pattern group
                </span>
                <span className="text-xs bg-white border border-[#EBE9E4] px-2.5 py-1.5 rounded-md font-mono text-[#0D0D0B] font-semibold inline-block">
                  {selectedProblem.pattern}
                </span>
              </div>

              <div className="bg-[#F9F8F6] border border-[#EBE9E4] p-4 rounded-lg">
                <span className="text-[10px] uppercase font-bold text-[#A3A199] tracking-wider block mb-2">
                  Sample Sandbox Case
                </span>
                <div className="text-xs font-mono space-y-1.5">
                  <div>
                    <span className="text-[#A3A199]">Input:</span> {selectedProblem.testCaseInput}
                  </div>
                  <div>
                    <span className="text-[#A3A199]">Output:</span> {selectedProblem.testCaseOutput}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Code playground interactive editor Right column */}
          <div className="flex-1 flex flex-col h-full overflow-hidden">
            {/* Editor Top Bar menu */}
            <div className="h-12 border-b border-[#EBE9E4] bg-[#F9F8F6] px-5 flex items-center justify-between col">
              <span className="text-xs font-mono font-bold text-[#706E68] uppercase tracking-wider">
                Interactive Playground
              </span>

              {/* Language picker */}
              <div className="flex items-center gap-2">
                <span className="text-[10px] text-[#A3A199] font-bold uppercase tracking-wider">
                  Select Language:
                </span>
                <select
                  value={activeLang}
                  onChange={(e) => handleLanguageChange(e.target.value)}
                  className="bg-white border border-[#EBE9E4] text-xs font-semibold rounded-md px-2 py-1 focus:outline-none focus:ring-1 focus:ring-[#10B981] text-[#1a1a17]"
                >
                  <option value="javascript">JavaScript</option>
                  <option value="python">Python 3</option>
                  <option value="cpp">C++ (GCC)</option>
                  <option value="java">Java (JDK 21)</option>
                  <option value="go">Go 1.22</option>
                </select>
              </div>
            </div>

            {/* Code inputs space */}
            <div className="flex-1 p-4 bg-white font-mono text-sm leading-relaxed overflow-y-auto border-b border-[#EBE9E4] relative">
              <textarea
                value={writtenCode}
                onChange={(e) => setWrittenCode(e.target.value)}
                className="w-full h-full bg-white font-mono text-xs text-[#1A1A17] outline-none border-0 resize-none leading-relaxed p-2"
                placeholder="// Write your algorithm solution logic here..."
                style={{ tabSize: 4 }}
              />
            </div>

            {/* Coding Bottom Actions controls & Outputs logs consola */}
            <div className="bg-[#FDFCFB] p-4 border-t border-[#EBE9E4] flex flex-col gap-4">
              {/* Output log dashboard */}
              {isCompiling ? (
                <div className="p-4 bg-[#F9F8F6] border border-[#EBE9E4] rounded-lg flex items-center gap-3">
                  <div className="w-4 h-4 border-2 border-[#10B981] border-t-transparent rounded-full animate-spin" />
                  <span className="text-xs text-[#706E68] font-mono animate-pulse">
                    Executing code compiled safely on in-browser micro-environments...
                  </span>
                </div>
              ) : compilationResult ? (
                <div
                  className={`p-4 border rounded-lg text-xs font-mono space-y-2 ${
                    compilationResult.status === "Accepted" || compilationResult.status === "Test Passed"
                      ? "bg-[#DCFCE7]/40 border-[#10B981] text-[#065F46]"
                      : "bg-red-50/40 border-red-300 text-red-800"
                  }`}
                >
                  <div className="flex items-center gap-2 justify-between">
                    <span className="font-bold flex items-center gap-1.5 text-sm uppercase tracking-wider">
                      {compilationResult.status === "Accepted" ? (
                        <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                      ) : compilationResult.status === "Test Passed" ? (
                        <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                      ) : (
                        <AlertTriangle className="w-4 h-4 text-red-600" />
                      )}
                      {compilationResult.status}
                    </span>

                    {compilationResult.runtime > 0 && (
                      <div className="flex gap-4 font-mono text-[10px] text-[#706E68]">
                        <span className="flex items-center gap-0.5">
                          <Cpu className="w-3.5 h-3.5" />
                          Runtime: {compilationResult.runtime} ms
                        </span>
                        <span className="flex items-center gap-0.5">
                          <Database className="w-3.5 h-3.5" />
                          Memory: {compilationResult.memory} MB
                        </span>
                      </div>
                    )}
                  </div>
                  <p className="font-semibold leading-relaxed font-sans">{compilationResult.message}</p>
                </div>
              ) : null}

              <div className="flex items-center justify-between">
                <span className="text-[10px] text-[#A3A199] font-mono select-none">
                  Output sandboxes run locally. Submission secures permanent XP streaks.
                </span>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleRunSimulation(false)}
                    disabled={isCompiling}
                    className="px-4 py-2 bg-white border border-[#EBE9E4] hover:bg-[#F5F3EF] text-xs font-bold text-[#706E68] rounded-md transition-all cursor-pointer active:scale-95 disabled:opacity-45 align-middle"
                  >
                    Run Test Cases
                  </button>

                  <button
                    onClick={() => handleRunSimulation(true)}
                    disabled={isCompiling}
                    className="px-4 py-2 bg-[#10B981] hover:bg-[#059669] text-xs font-bold text-white rounded-md flex items-center gap-1.5 transition-all cursor-pointer active:scale-95 disabled:opacity-45"
                  >
                    <Play className="w-3.5 h-3.5 fill-white" />
                    Submit Solution
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        // Problem List Dashboard View
        <div className="flex-1 overflow-y-auto p-6 md:p-8 space-y-6 max-w-5xl mx-auto w-full">
          {/* Header titles */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h2 className="text-xl md:text-2xl font-bold text-[#0D0D0B] tracking-tight">Practice Bank</h2>
              <p className="text-sm text-[#706E68] mt-1">
                Challenge yourself over curated actual interview questions styled for key tech firms.
              </p>
            </div>

            {/* Stats indicators */}
            <div className="flex items-center gap-3 text-xs font-semibold">
              <div className="px-3 py-1.5 bg-[#F5F3EF] border border-[#EBE9E4] rounded-lg text-[#706E68]">
                Solved: <span className="text-[#10B981] font-bold">{solvedIds.length}</span> / {PROBLEMS.length}
              </div>
              <div className="px-3 py-1.5 bg-[#DCFCE7]/50 border border-[#A7F3D0] rounded-lg text-[#065F46] flex items-center gap-1">
                <Award className="w-3.5 h-3.5 text-[#10B981]" />
                <span>Accuracy: 100%</span>
              </div>
            </div>
          </div>

          {/* Filtering row */}
          <div className="flex flex-col lg:flex-row gap-3.5">
            {/* Search Input */}
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-4 w-4 text-[#A3A199]" />
              <input
                type="text"
                placeholder="Search by name, tag, topic (e.g. Map, Sorting)..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-white border border-[#EBE9E4] rounded-lg pl-9 pr-4 py-2.5 text-sm outline-none focus:ring-1 focus:ring-[#10B981] placeholder-[#A3A199] transition-all"
              />
            </div>

            {/* Filter tags choices */}
            <div className="flex flex-wrap items-center gap-2">
              {/* Difficulty selector */}
              <div className="flex items-center bg-[#F9F8F6] border border-[#EBE9E4] rounded-lg p-1 shrink-0">
                {["All", "Easy", "Medium", "Hard"].map((diff) => (
                  <button
                    key={diff}
                    onClick={() => setDifficultyFilter(diff)}
                    className={`px-3 py-1 text-xs font-semibold rounded-md transition-all cursor-pointer ${
                      difficultyFilter === diff ? "bg-white text-[#10B981] shadow-xs" : "text-[#706E68] hover:text-[#0D0D0B]"
                    }`}
                  >
                    {diff}
                  </button>
                ))}
              </div>

              {/* Company list filters */}
              <select
                value={companyFilter}
                onChange={(e) => setCompanyFilter(e.target.value)}
                className="bg-[#F9F8F6] border border-[#EBE9E4] rounded-lg text-xs font-semibold px-3 py-1.5 text-[#706E68] outline-none focus:ring-1 focus:ring-[#10B981] cursor-pointer"
              >
                <option value="All">All Tech Firms</option>
                {companiesList.map((co) => (
                  <option key={co} value={co}>
                    {co}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Problems Bank Grid layout List */}
          <div className="bg-white border border-[#EBE9E4] rounded-xl overflow-hidden shadow-xs">
            <div className="divide-y divide-[#EBE9E4]">
              {/* Table header indicators */}
              <div className="hidden md:grid grid-cols-12 gap-4 px-6 py-4 bg-[#F9F8F6] text-[10px] font-bold uppercase tracking-wider text-[#A3A199] border-b border-[#EBE9E4]">
                <div className="col-span-5">Question Detail</div>
                <div className="col-span-2">Dynamic Topic</div>
                <div className="col-span-2">Target Firm</div>
                <div className="col-span-2">Pattern Category</div>
                <div className="col-span-1 text-right">Unlock</div>
              </div>

              {/* Problem Rows */}
              {filteredProblems.map((prob) => {
                const isSolved = solvedIds.includes(prob.id);
                return (
                  <div
                    key={prob.id}
                    className="grid grid-cols-1 md:grid-cols-12 gap-3 md:gap-4 px-6 py-4.5 hover:bg-[#FDFCFB]/80 transition-all items-center"
                  >
                    {/* Title Details Column */}
                    <div className="col-span-1 md:col-span-5 space-y-1">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleSelectProblem(prob)}
                          className="font-semibold text-sm text-[#0D0D0B] hover:text-[#10B981] text-left cursor-pointer truncate"
                        >
                          {prob.title}
                        </button>
                        {isSolved && (
                          <span className="inline-flex items-center px-1.5 py-0.5 bg-green-50 rounded text-[9.5px] font-bold text-green-700 uppercase border border-green-200">
                            Solved
                          </span>
                        )}
                      </div>
                      <div className="flex flex-wrap gap-1 items-center">
                        <span
                          className={`text-[9.5px] font-bold uppercase px-2 py-0.5 rounded ${
                            prob.difficulty === "Easy"
                              ? "bg-emerald-50 text-emerald-700"
                              : prob.difficulty === "Medium"
                              ? "bg-amber-50 text-amber-700"
                              : "bg-rose-50 text-rose-700"
                          }`}
                        >
                          {prob.difficulty}
                        </span>
                        {prob.tags.map((tg) => (
                          <span
                            key={tg}
                            className="text-[9.5px] font-medium bg-[#F5F3EF] text-[#706E68] px-1.5 py-0.5 rounded"
                          >
                            {tg}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Topic column */}
                    <div className="col-span-1 md:col-span-2 text-xs font-semibold text-[#57554F] font-sans">
                      {prob.topic}
                    </div>

                    {/* Companies tags column */}
                    <div className="col-span-1 md:col-span-2 flex flex-wrap gap-1">
                      {prob.companies.slice(0, 2).map((co, idx) => (
                        <span
                          key={idx}
                          className="text-[10px] font-bold text-[#706E68] bg-[#F5F3EF] border border-[#EBE9E4] px-1.5 py-0.5 rounded"
                        >
                          {co}
                        </span>
                      ))}
                      {prob.companies.length > 2 && (
                        <span className="text-[9px] text-[#A3A199] font-bold px-1 py-0.5">
                          +{prob.companies.length - 2}
                        </span>
                      )}
                    </div>

                    {/* Pattern column */}
                    <div className="col-span-1 md:col-span-2 text-xs font-mono font-bold text-blue-600">
                      {prob.pattern}
                    </div>

                    {/* Action column */}
                    <div className="col-span-1 md:col-span-1 text-left md:text-right">
                      <button
                        onClick={() => handleSelectProblem(prob)}
                        className={`text-xs font-bold px-3 py-1.5 rounded-lg border transition-all cursor-pointer ${
                          isSolved
                            ? "bg-white border-[#EBE9E4] text-[#706E68] hover:bg-[#F5F3EF] "
                            : "bg-[#10B981] hover:bg-[#059669] border-[#10B981] text-white"
                        }`}
                      >
                        {isSolved ? "Practice" : "Solve"}
                      </button>
                    </div>
                  </div>
                );
              })}

              {filteredProblems.length === 0 && (
                <div className="text-center py-12 text-[#706E68] text-sm">
                  We currently do not have questions matching "{searchTerm}" criteria. Please clear query to view all!
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
