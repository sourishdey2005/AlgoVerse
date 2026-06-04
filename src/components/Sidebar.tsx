import React, { useState } from "react";
import { ALGORITHMS } from "../data/algorithms";
import { Search, ChevronRight, Hash, Layers } from "lucide-react";
import { AlgorithmItem, AlgorithmCategory } from "../types";

interface SidebarProps {
  selectedAlgorithm: AlgorithmItem;
  setSelectedAlgorithm: (algo: AlgorithmItem) => void;
}

export default function Sidebar({ selectedAlgorithm, setSelectedAlgorithm }: SidebarProps) {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredAlgos = ALGORITHMS.filter((algo) =>
    algo.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    algo.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
    algo.subtitle.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Group algorithms by category
  const categories: Record<AlgorithmCategory | string, AlgorithmItem[]> = {};
  filteredAlgos.forEach((algo) => {
    if (!categories[algo.category]) {
      categories[algo.category] = [];
    }
    categories[algo.category].push(algo);
  });

  return (
    <aside className="w-full md:w-64 border-b md:border-b-0 md:border-r border-[#EBE9E4] bg-[#F9F8F6] flex flex-col h-full shrink-0 select-none">
      {/* Search Bar */}
      <div className="p-4 border-b border-[#EBE9E4]">
        <div className="relative">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-[#A3A199]" />
          <input
            type="text"
            placeholder="Search algorithms..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-white border border-[#EBE9E4] rounded-md pl-9 pr-3 py-2 text-sm text-[#1A1A17] placeholder-[#A3A199] focus:outline-none focus:ring-1 focus:ring-[#10B981] transition-all"
          />
        </div>
      </div>

      {/* Algorithm Tree list */}
      <div className="flex-1 overflow-y-auto p-3 space-y-4">
        {Object.entries(categories).map(([category, algos]) => (
          <div key={category} className="space-y-1">
            <h3 className="px-3 text-[10px] font-bold uppercase tracking-wider text-[#A3A199] mb-1.5 flex items-center gap-1">
              <Layers className="w-3 h-3 text-[#10B981]" />
              <span>{category}</span>
            </h3>
            <div className="space-y-0.5">
              {algos.map((algo) => {
                const isSelected = algo.id === selectedAlgorithm.id;
                return (
                  <button
                    key={algo.id}
                    onClick={() => setSelectedAlgorithm(algo)}
                    className={`w-full flex items-center justify-between px-3 py-2 rounded-md text-sm text-left transition-all group ${
                      isSelected
                        ? "bg-[#EBE9E4] text-[#0D0D0B] font-semibold"
                        : "text-[#706E68] hover:bg-[#F0EEEA] hover:text-[#0D0D0B]"
                    }`}
                  >
                    <div className="truncate">
                      <div className="font-medium truncate">{algo.name}</div>
                      <div className="text-[10px] text-[#A3A199] font-normal truncate group-hover:text-[#706E68]">
                        {algo.subtitle}
                      </div>
                    </div>
                    <ChevronRight
                      className={`w-3.5 h-3.5 transition-transform ${
                        isSelected ? "text-[#10B981] translate-x-0.5" : "text-[#D6D3CD] group-hover:text-[#706E68]"
                      }`}
                    />
                  </button>
                );
              })}
            </div>
          </div>
        ))}

        {filteredAlgos.length === 0 && (
          <div className="text-center py-8 text-xs text-[#706E68]">
            No algorithms found for "{searchTerm}"
          </div>
        )}
      </div>
    </aside>
  );
}
