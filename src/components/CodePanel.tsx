import React, { useState } from "react";
import { CODE_TEMPLATES } from "../data/codeTemplates";

interface CodePanelProps {
  code: string;
  codeLanguage: string;
  highlightedLines: number[];
  variables: Record<string, any>;
  description: string;
  algoId?: string;
}

export default function CodePanel({
  code: defaultCode,
  codeLanguage: defaultLang,
  highlightedLines,
  variables,
  description,
  algoId = "bubble-sort",
}: CodePanelProps) {
  // Support standard tabs: JS, C, C++, Java, Python, Go
  const [selectedLang, setSelectedLang] = useState<"javascript" | "c" | "cpp" | "java" | "python" | "go">("javascript");

  // Retrieve code from registry, falling back to original code
  const templates = CODE_TEMPLATES[algoId];
  let displayCode = defaultCode;
  if (templates && templates[selectedLang]) {
    displayCode = templates[selectedLang];
  }

  const lines = displayCode.split("\n");

  // Helper code parser for all supported languages
  const applyColors = (text: string) => {
    // 1. First, escape raw HTML characters to prevent breaking the DOM.
    const escaped = text
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;");

    // 2. Highlighting using a consolidated single regex to prevent double-matching
    // inside generated HTML tags (e.g. matching 'class' or hex codes).
    const matchRegex = /(\/\/.*|#.*)|("(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*')|(\b(?:function|let|const|var|return|if|else|for|while|do|break|continue|class|constructor|new|true|false|void|int|bool|boolean|def|func|struct|nullptr|NULL|import|public|private|type|package|from)\b)|(\b(?:std::vector|std::swap|std::max|Math|heapq|Arrays|Stack|malloc|strlen|range|len|append|copy|make)\b)|(\b(?:arr|low|high|pivot|swapped|i|j|temp|L|R|k|n|maxSoFar|maxEndingHere|weights|values|capacity|board|a|b|andResult|orResult|xorResult|notA|leftShift|rightShift|head|prev|current|next|stack|map|mapping|results|backtrack|col|row|distances)\b)|(\b\d+\b)/g;

    const decorated = escaped.replace(
      matchRegex,
      (match, comment, str, keyword, type, variable, num) => {
        if (comment !== undefined) {
          return `<span class="text-[#A3A199] italic">${comment}</span>`;
        }
        if (str !== undefined) {
          return `<span class="text-[#D97706]">${str}</span>`;
        }
        if (keyword !== undefined) {
          return `<span class="text-[#059669] font-bold">${keyword}</span>`;
        }
        if (type !== undefined) {
          return `<span class="text-[#8B5CF6] font-bold font-mono">${type}</span>`;
        }
        if (variable !== undefined) {
          return `<span class="text-[#1E40AF] font-medium font-mono">${variable}</span>`;
        }
        if (num !== undefined) {
          return `<span class="text-[#D97706]">${num}</span>`;
        }
        return match;
      }
    );

    return <span dangerouslySetInnerHTML={{ __html: decorated }} />;
  };

  const languages = [
    { key: "javascript", label: "JS" },
    { key: "c", label: "C" },
    { key: "cpp", label: "C++" },
    { key: "java", label: "Java" },
    { key: "python", label: "Python" },
    { key: "go", label: "Go" },
  ];

  return (
    <section className="w-full lg:w-96 border-t lg:border-t-0 lg:border-l border-[#EBE9E4] bg-white flex flex-col h-full overflow-hidden shrink-0 select-none">
      {/* Code Header Bar & Language Selectors */}
      <div className="border-b border-[#EBE9E4] bg-[#F9F8F6] flex flex-col shrink-0">
        <div className="h-9 px-4 flex items-center justify-between border-b border-[#F0EFEA]">
          <div className="flex items-center gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-[#EF4444]" />
            <div className="w-2.5 h-2.5 rounded-full bg-[#F59E0B]" />
            <div className="w-2.5 h-2.5 rounded-full bg-[#10B981]" />
          </div>
          <span className="text-[10px] font-mono font-bold text-[#706E68] uppercase tracking-wider">
            SYNCHRONIZED EDITOR
          </span>
        </div>
        {/* Language Tabs Selector */}
        <div className="flex bg-white overflow-x-auto whitespace-nowrap scrollbar-none border-b border-[#EBE9E4]">
          {languages.map((lang) => {
            const active = selectedLang === lang.key;
            return (
              <button
                key={lang.key}
                onClick={() => setSelectedLang(lang.key as any)}
                className={`flex-1 min-w-[55px] text-center py-2 px-1 border-b-2 text-[11px] font-mono font-medium transition-all cursor-pointer ${
                  active
                    ? "border-[#10B981] text-[#10B981] bg-[#F7FEE7]/50 font-bold"
                    : "border-transparent text-[#706E68] hover:text-[#1A1A17] hover:bg-[#F9F8F6]"
                }`}
              >
                {lang.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Code Area */}
      <div className="flex-1 p-4 font-mono text-[11px] leading-relaxed overflow-y-auto bg-white border-b border-[#EBE9E4]">
        <div className="space-y-0.5">
          {lines.map((lineText, idx) => {
            const lineNum = idx + 1;
            const isHighlighted = highlightedLines.includes(lineNum);
            return (
              <div
                key={idx}
                className={`flex gap-3 items-start px-2 py-0.5 rounded-sm transition-colors ${
                  isHighlighted ? "bg-[#DCFCE7] text-[#065F46] border-l-2 border-[#10B981]" : ""
                }`}
              >
                <span className="text-[#A3A199] font-mono select-none w-5 text-right shrink-0">
                  {lineNum}
                </span>
                <span className="whitespace-pre font-mono block overflow-x-auto text-[#1A1A17]">
                  {applyColors(lineText)}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* AI Tutor Explanation Box */}
      <div className="h-56 bg-[#FDFCFB] p-5 flex flex-col gap-3 shrink-0 overflow-y-auto border-t border-[#EBE9E4]">
        <div className="flex items-center gap-2">
          <div className="w-5 h-5 bg-[#8B5CF6] rounded-md flex items-center justify-center text-[10px] text-white font-bold font-mono">
            AI
          </div>
          <span className="text-xs font-bold uppercase tracking-wider text-[#0D0D0B] font-sans">
            Tutor Explanation
          </span>
        </div>

        <p className="text-xs leading-relaxed text-[#57554F] font-sans flex-1">
          {description}
        </p>

        {/* Variables Dashboard */}
        {Object.keys(variables).length > 0 && (
          <div className="border-t border-[#EBE9E4] pt-2.5">
            <div className="text-[10px] uppercase font-bold text-[#A3A199] tracking-wider mb-1.5 font-sans">
              Active Parameters
            </div>
            <div className="flex flex-wrap gap-2">
              {Object.entries(variables).map(([key, val]) => (
                <div
                  key={key}
                  className="px-2 py-0.5 bg-[#F5F3EF] border border-[#EBE9E4] rounded-md font-mono text-[10px] text-[#706E68]"
                >
                  <span className="font-bold text-[#10B981]">{key}:</span> {String(val)}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

