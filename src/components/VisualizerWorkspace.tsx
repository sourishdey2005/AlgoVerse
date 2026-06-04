import React, { useEffect, useState } from "react";
import { AlgorithmItem, AlgorithmStep } from "../types";
import { Plus, HelpCircle, Activity, Info, Network, RefreshCw } from "lucide-react";

// Web Audio API Synthesizer Tone Player
function playSynthTone(val: number, type: "sine" | "triangle" = "triangle") {
  try {
    const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
    if (!AudioContextClass) return;
    const audioCtx = new AudioContextClass();
    const oscillator = audioCtx.createOscillator();
    const gainNode = audioCtx.createGain();

    oscillator.type = type;
    // Map array values (e.g., 5 to 90) to a pleasant audio frequency range
    const frequency = 180 + val * 6;
    oscillator.frequency.setValueAtTime(frequency, audioCtx.currentTime);

    gainNode.gain.setValueAtTime(0.03, audioCtx.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + 0.18);

    oscillator.connect(gainNode);
    gainNode.connect(audioCtx.destination);

    oscillator.start();
    oscillator.stop(audioCtx.currentTime + 0.18);
  } catch (e) {
    // Fail silently to prevent audio policy block crashes
  }
}

interface VisualizerWorkspaceProps {
  selectedAlgorithm: AlgorithmItem;
  currentStep: AlgorithmStep;
  inputValue: string;
  setInputValue: (val: string) => void;
  onRefresh: () => void;
}

export default function VisualizerWorkspace({
  selectedAlgorithm,
  currentStep,
  inputValue,
  setInputValue,
  onRefresh,
}: VisualizerWorkspaceProps) {
  // Graph interactive state for graphs tab
  const [graphNodes, setGraphNodes] = useState<{ id: string; x: number; y: number }[]>([
    { id: "A", x: 100, y: 150 },
    { id: "B", x: 250, y: 80 },
    { id: "C", x: 250, y: 220 },
    { id: "D", x: 400, y: 150 },
  ]);
  const [graphEdges, setGraphEdges] = useState<{ from: string; to: string; weight: number }[]>([
    { from: "A", to: "B", weight: 3 },
    { from: "A", to: "C", weight: 5 },
    { from: "B", to: "C", weight: 1 },
    { from: "B", to: "D", weight: 6 },
    { from: "C", to: "D", weight: 2 },
  ]);
  const [firstSelectedGraphNode, setFirstSelectedGraphNode] = useState<string | null>(null);
  const [edgeWeightInput, setEdgeWeightInput] = useState<number>(3);

  // Frequency triggers when step changes
  useEffect(() => {
    if (!currentStep) return;
    const state = currentStep.state || {};

    // Trigger audio cues
    if (state.swapIndices && state.swapIndices.length > 0) {
      playSynthTone(40, "sine");
    } else if (state.activeIndices && state.activeIndices.length > 0) {
      playSynthTone(25, "triangle");
    } else if (state.foundIndex !== undefined && state.foundIndex !== -1) {
      playSynthTone(80, "sine");
    }
  }, [currentStep]);

  if (!currentStep) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center p-8 bg-white text-center">
        <Activity className="w-12 h-12 text-[#10B981] animate-pulse mb-3" />
        <p className="text-sm font-medium text-[#706E68]">Loading visualization framework...</p>
      </div>
    );
  }

  const state = currentStep.state || {};

  // Custom Graph Canvas adding element
  const handleCanvasClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (selectedAlgorithm.category !== "Graph") return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // Check if clicked near an existing node
    const clickedNode = graphNodes.find(
      (node) => Math.hypot(node.x - x, node.y - y) < 25
    );

    if (clickedNode) {
      if (firstSelectedGraphNode === null) {
        setFirstSelectedGraphNode(clickedNode.id);
      } else {
        if (firstSelectedGraphNode !== clickedNode.id) {
          // Check if edge already exists
          const edgeExists = graphEdges.some(
            (edge) =>
              (edge.from === firstSelectedGraphNode && edge.to === clickedNode.id) ||
              (edge.from === clickedNode.id && edge.to === firstSelectedGraphNode)
          );

          if (!edgeExists) {
            setGraphEdges([
              ...graphEdges,
              { from: firstSelectedGraphNode, to: clickedNode.id, weight: edgeWeightInput },
            ]);
            playSynthTone(50, "sine");
          }
        }
        setFirstSelectedGraphNode(null);
      }
    } else {
      // Create a new node
      const code = String.fromCharCode(65 + graphNodes.length); // A, B, C, D...
      if (graphNodes.length < 15) {
        setGraphNodes([...graphNodes, { id: code, x, y }]);
        playSynthTone(30, "triangle");
      }
      setFirstSelectedGraphNode(null);
    }
  };

  return (
    <div className="flex-1 bg-white p-6 md:p-8 flex flex-col justify-between overflow-y-auto select-none">
      {/* Title block */}
      <div className="flex flex-col md:flex-row justify-between items-start border-b border-[#EBE9E4] pb-5 shrink-0 gap-3 md:gap-0">
        <div>
          <h1 className="text-xl md:text-2xl font-bold text-[#0D0D0B] tracking-tight flex items-center gap-2">
            <span>{selectedAlgorithm.name}</span>
            <span className="text-xs font-normal text-[#A3A199] tracking-wider hidden sm:inline uppercase">
              • {selectedAlgorithm.subtitle}
            </span>
          </h1>
          <div className="text-xs text-[#706E68] mt-1.5 flex flex-wrap items-center gap-3">
            <span className="flex items-center gap-1 bg-[#F5F3EF] border border-[#EBE9E4] px-2 py-0.5 rounded-md font-mono text-[10px]">
              <span className="text-[#A3A199]">Time:</span> {selectedAlgorithm.timeComplexity}
            </span>
            <span className="flex items-center gap-1 bg-[#F5F3EF] border border-[#EBE9E4] px-2 py-0.5 rounded-md font-mono text-[10px]">
              <span className="text-[#A3A199]">Space:</span> {selectedAlgorithm.spaceComplexity}
            </span>
          </div>
        </div>

        {/* Input panel directly inside workspace */}
        <div className="flex items-center gap-2 w-full md:w-auto max-w-sm">
          <div className="flex-1">
            <div className="text-[9px] uppercase font-bold text-[#A3A199] tracking-wider mb-1">
              {selectedAlgorithm.initialInputLabel}
            </div>
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              className="w-full bg-white border border-[#EBE9E4] rounded-md px-2 py-1 text-xs text-[#1A1A17] focus:outline-none focus:ring-1 focus:ring-[#10B981]"
            />
          </div>
          <button
            onClick={onRefresh}
            title="Reload customized array"
            className="p-1.5 mt-4 hover:bg-[#F5F3EF] border border-[#EBE9E4] rounded-md text-[#706E68] transition-all cursor-pointer active:scale-95 shrink-0"
          >
            <RefreshCw className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* RENDER ACTIVE VISUALIZATION AREA */}
      <div className="flex-1 my-8 min-h-[220px] flex items-center justify-center relative">
        {/* L1. SORTING BOARDS */}
        {(selectedAlgorithm.category === "Sorting" || selectedAlgorithm.id.includes("sort")) && state.arr && (
          <div className="w-full h-full flex items-end justify-center gap-2 md:gap-3.5 max-w-xl px-4">
            {state.arr.map((val: number, idx: number) => {
              const isActive = state.activeIndices?.includes(idx);
              const isSwap = state.swapIndices?.includes(idx);
              const isSorted = state.sortedIndices?.includes(idx);
              const isPivot = state.pivotIndex === idx;

              // Derive heights proportionally
              const maxVal = Math.max(...state.arr, 1);
              const heightPercent = Math.max(12, Math.floor((val / maxVal) * 100));

              let barBgColor = "bg-[#F5F3EF] border-[#D6D3CD]";
              if (isPivot) barBgColor = "bg-[#DCFCE7] border-[#10B981] border-t-2 text-[#065F46]";
              else if (isSwap) barBgColor = "bg-[#FEE2E2] border-[#EF4444] border-t-2 text-[#991B1B]";
              else if (isActive) barBgColor = "bg-[#FEF3C7] border-[#F59E0B] border-t-2 text-[#92400E]";
              else if (isSorted) barBgColor = "bg-[#E6F4EA] border-[#34A853] text-[#137333]";

              return (
                <div
                  key={idx}
                  style={{ height: `${heightPercent}%` }}
                  className={`${barBgColor} border-t-4 w-10 sm:w-12 flex flex-col justify-end items-center rounded-t-xs transition-all duration-300 relative shadow-xs`}
                >
                  <span className="mb-2 text-[10px] sm:text-xs font-mono font-bold">{val}</span>
                  {isPivot && (
                    <span className="absolute -top-7 text-[8px] font-bold text-[#10B981] uppercase tracking-wider bg-[#DCFCE7] border border-[#A7F3D0] px-1 rounded-sm">
                      Pivot
                    </span>
                  )}
                  {isActive && !isSwap && (
                    <span className="absolute -top-7 text-[9px] font-mono font-bold text-[#F59E0B]">
                      ptr
                    </span>
                  )}
                  {isSwap && (
                    <span className="absolute -top-7 text-[8px] font-bold text-[#EF4444] uppercase tracking-wider bg-[#FFE4E6] px-1 rounded-sm animate-bounce">
                      SWAP
                    </span>
                  )}
                  <span className="absolute -bottom-6 text-[10px] text-[#A3A199] font-mono">{idx}</span>
                </div>
              );
            })}
          </div>
        )}

        {/* L2. ARRAYS / BINARY SEARCH / KADANE BOARDS */}
        {(selectedAlgorithm.category === "Array" || selectedAlgorithm.category === "Arrays" || selectedAlgorithm.category === "Searching" || selectedAlgorithm.id === "sliding-window-max") && state.arr && !selectedAlgorithm.id.includes("sort") && (
          <div className="flex flex-col items-center justify-center gap-8 w-full max-w-2xl">
            <div className="flex flex-wrap justify-center gap-1.5 md:gap-2.5">
              {state.arr.map((val: number, idx: number) => {
                const isMid = idx === state.mid;
                const isLow = idx === state.low;
                const isHigh = idx === state.high;
                const inIndexRange = idx >= state.low && idx <= state.high;
                const isKadaneRange = state.range && idx >= state.range[0] && idx <= state.range[1];
                const isKadaneTemp = state.tempRange && idx >= state.tempRange[0] && idx <= state.tempRange[1];
                const isWindow = state.left !== undefined && idx >= state.left && idx <= state.right;
                const isLeaving = idx === state.leavingIndex;
                const isEntering = idx === state.enteringIndex;

                let blockColor = "border-[#EBE9E4] bg-white text-[#1A1A17]";
                if (selectedAlgorithm.id === "binary-search") {
                  if (idx === state.foundIndex) blockColor = "border-[#10B981] bg-[#DCFCE7] text-[#065F46] ring-2 ring-[#10B981]/50 font-bold";
                  else if (isMid) blockColor = "border-[#F59E0B] bg-[#FEF3C7] text-[#92400E] font-semibold";
                  else if (!inIndexRange) blockColor = "border-[#F5F3EF] bg-[#F9F8F6] text-[#A3A199] opacity-30";
                } else if (selectedAlgorithm.id === "kadane") {
                  if (state.final && isKadaneRange) blockColor = "border-[#10B981] bg-[#DCFCE7] text-[#065F46] font-bold ring-2 ring-[#10B981]/40";
                  else if (isKadaneRange) blockColor = "border-[#10B981] bg-[#DCFCE7] text-[#065F46] font-bold";
                  else if (isKadaneTemp) blockColor = "border-[#F59E0B] bg-[#FEF3C7] text-[#92400E]";
                  else if (idx === state.i) blockColor = "border-[#3B82F6] bg-[#DBEAFE] text-[#1E40AF] font-bold";
                } else if (selectedAlgorithm.id === "sliding-window-max") {
                  if (isLeaving) blockColor = "border-red-400 bg-red-50 text-red-700 animate-pulse";
                  else if (isEntering) blockColor = "border-[#10B981] bg-[#DCFCE7] text-[#065F46] ring-2 ring-[#10B981]/60 font-bold";
                  else if (isWindow) blockColor = "border-[#10B981] bg-[#DCFCE7] text-[#065F46] font-medium";
                }

                return (
                  <div key={idx} className="flex flex-col items-center gap-1.5 relative">
                    <div className={`w-11 h-11 md:w-12 md:h-12 border-2 rounded-lg flex items-center justify-center font-mono text-sm shadow-sm transition-all duration-300 ${blockColor}`}>
                      {val}
                    </div>
                    <span className="text-[10px] text-[#A3A199] font-mono font-bold">{idx}</span>

                    {/* Array visual pointer markers */}
                    <div className="absolute -top-7 flex gap-1">
                      {isLow && (
                        <span className="text-[8px] font-bold px-1 py-0.5 bg-blue-50 border border-blue-200 text-blue-600 rounded">
                          low
                        </span>
                      )}
                      {isHigh && (
                        <span className="text-[8px] font-bold px-1 py-0.5 bg-indigo-50 border border-indigo-200 text-indigo-600 rounded">
                          high
                        </span>
                      )}
                      {idx === state.i && selectedAlgorithm.id === "kadane" && (
                        <span className="text-[8px] font-bold px-1 py-0.5 bg-[#DBEAFE] border border-[#BFDBFE] text-blue-600 rounded">
                          i
                        </span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Sub-Metrics board */}
            {selectedAlgorithm.id === "kadane" && (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full px-6 py-4 bg-[#F9F8F6] border border-[#EBE9E4] rounded-lg text-center mt-3">
                <div>
                  <div className="text-[9px] uppercase tracking-wider text-[#A3A199] font-bold">Max ending here</div>
                  <div className="text-sm font-bold text-[#1a1a17]">{state.maxEndingHere}</div>
                </div>
                <div>
                  <div className="text-[9px] uppercase tracking-wider text-[#A3A199] font-bold">Max so far</div>
                  <div className="text-sm font-bold text-[#10B981]">{state.maxSoFar}</div>
                </div>
                <div>
                  <div className="text-[9px] uppercase tracking-wider text-[#A3A199] font-bold">Subarray Range</div>
                  <div className="text-sm font-bold text-[#706E68] font-mono">
                    [{state.range ? state.range.join(", ") : "0, 0"}]
                  </div>
                </div>
                <div>
                  <div className="text-[9px] uppercase tracking-wider text-[#A3A199] font-bold">Active Sub-sum</div>
                  <div className="text-sm font-semibold text-[#F59E0B] font-mono">
                    {state.tempRange ? "recomputing..." : "static"}
                  </div>
                </div>
              </div>
            )}

            {selectedAlgorithm.id === "sliding-window-max" && (
              <div className="grid grid-cols-3 gap-6 w-full max-w-md px-6 py-4 bg-[#F9F8F6] border border-[#EBE9E4] rounded-lg text-center mt-3">
                <div>
                  <div className="text-[9px] uppercase tracking-wider text-[#A3A199] font-bold">Current Sum</div>
                  <div className="text-sm font-bold text-[#1a1a17]">{state.windowSum}</div>
                </div>
                <div>
                  <div className="text-[9px] uppercase tracking-wider text-[#A3A199] font-bold">Max Window Sum</div>
                  <div className="text-sm font-bold text-[#10B981]">{state.maxSum}</div>
                </div>
                <div>
                  <div className="text-[9px] uppercase tracking-wider text-[#A3A199] font-bold">Window Bounds</div>
                  <div className="text-sm font-bold text-[#706E68] font-mono">
                    [{state.left}, {state.right}]
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* L3. LINKED LIST BOARD */}
        {(selectedAlgorithm.category === "Linked List" || selectedAlgorithm.id.includes("linkedlist") || selectedAlgorithm.id === "cycle-detection") && state.nodes && (
          <div className="w-full flex flex-col items-center justify-center gap-10 max-w-2xl px-4 overflow-x-auto py-6">
            <div className="flex items-center gap-10">
              {state.nodes.map((node: any, idx: number) => {
                const isCurrent = state.currentId === node.id;
                const isPrev = state.prevId === node.id;
                const isNext = state.nextId === node.id;

                let borderStyle = "border-[#EBE9E4] bg-white";
                if (isCurrent) borderStyle = "border-[#10B981] bg-[#DCFCE7] shadow-md ring-2 ring-[#10B981]/50";
                else if (isPrev) borderStyle = "border-[#3B82F6] bg-[#DBEAFE]";
                else if (isNext) borderStyle = "border-[#F59E0B] bg-[#FEF3C7]";

                return (
                  <div key={node.id} className="flex items-center relative shrink-0">
                    {/* Node Circle */}
                    <div className="flex flex-col items-center">
                      <div className={`w-14 h-14 border-3 rounded-full flex items-center justify-center font-mono font-bold text-sm tracking-tight transition-all duration-300 relative shadow-sm ${borderStyle}`}>
                        {node.value}
                      </div>

                      {/* Display active pointers beneath node */}
                      <div className="absolute -bottom-8 flex flex-col items-center">
                        {isCurrent && (
                          <span className="text-[9px] font-bold px-1.5 py-0.5 bg-[#DCFCE7] text-[#065F46] uppercase rounded-sm border border-[#A7F3D0]">
                            curr
                          </span>
                        )}
                        {isPrev && (
                          <span className="text-[9px] font-bold px-1.5 py-0.5 bg-[#DBEAFE] text-[#1E40AF] uppercase rounded-sm border border-[#BFDBFE]">
                            prev
                          </span>
                        )}
                        {isNext && (
                          <span className="text-[9px] font-bold px-1.5 py-0.5 bg-[#FEF3C7] text-[#92400E] uppercase rounded-sm border border-[#FDE68A]">
                            next
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Link Connection Line Pointer */}
                    {idx < state.nodes.length - 1 && (
                      <div className="w-10 relative">
                        {/* We draw the arrow SVG of link pointers */}
                        <svg className="w-10 h-6 absolute -top-3 overflow-visible" fill="none">
                          <defs>
                            <marker id="arrow" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                              <path d="M 0 2 L 10 5 L 0 8 z" fill="#706E68" />
                            </marker>
                            <marker id="arrow-green" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                              <path d="M 0 2 L 10 5 L 0 8 z" fill="#10B981" />
                            </marker>
                            <marker id="arrow-reversed" viewBox="0 0 10 10" refX="4" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                              <path d="M 10 2 L 0 5 L 10 8 z" fill="#3B82F6" />
                            </marker>
                          </defs>

                          {/* If current pointing is backward we draw reversed indicator */}
                          {node.tempNextId === null ? (
                            <path d="M 40 10 L 0 10" stroke="#EBE9E4" strokeWidth="2" strokeDasharray="3,3" />
                          ) : node.tempNextId === `node-${idx - 1}` ? (
                            <path d="M 40 10 L 0 10" stroke="#3B82F6" strokeWidth="2.5" markerStart="url(#arrow-reversed)" />
                          ) : (
                            <path d="M 0 10 L 40 10" stroke="#706E68" strokeWidth="2.5" markerEnd="url(#arrow)" />
                          )}
                        </svg>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* L4. STACK BOARDS */}
        {(selectedAlgorithm.category === "Stack" || selectedAlgorithm.category === "Queue") && (
          <div className="w-full flex flex-col md:flex-row items-center justify-around gap-8 max-w-xl">
            {/* Input Character Stream */}
            {state.chars && (
              <div className="flex flex-col items-center">
                <span className="text-[10px] uppercase font-bold text-[#A3A199] mb-2">Input Characters</span>
                <div className="flex items-center gap-1.5 p-3.5 bg-[#F9F8F6] border border-[#EBE9E4] rounded-lg">
                  {state.chars.map((char: string, idx: number) => {
                    const isActive = idx === state.activeCharIndex;
                    const isProcessed = idx < state.activeCharIndex;

                    let borderC = "border-[#EBE9E4] text-[#706E68]";
                    if (isActive) borderC = "border-[#10B981] bg-[#DCFCE7] text-[#065F46] font-bold ring-2 ring-[#10B981]/50 scale-105";
                    else if (isProcessed) borderC = "border-[#D6D3CD] text-[#D6D3CD] line-through";

                    return (
                      <div key={idx} className={`w-8 h-8 border flex items-center justify-center font-mono text-xs rounded transition-all duration-300 ${borderC}`}>
                        {char}
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Vertical Stack graphics Tube */}
            {state.stack && (
              <div className="flex flex-col items-center relative">
                <span className="text-[10px] uppercase font-bold text-[#A3A199] mb-2">LIFO Stack</span>
                <div className="w-24 h-48 border-b-4 border-x-4 border-[#706E68] rounded-b-lg flex flex-col-reverse justify-start items-center p-1.5 gap-1.5 bg-[#FDFCFB]">
                  {state.stack.map((item: string, idx: number) => {
                    const isTop = idx === state.stack.length - 1;
                    return (
                      <div
                        key={idx}
                        className={`w-full py-2.5 rounded text-center font-mono font-bold text-xs ring-1 shadow-sm transition-all duration-300 ${
                          isTop
                            ? "bg-[#FEF3C7] border-2 border-[#F59E0B] text-[#92400E] animate-bounce"
                            : "bg-white border border-[#EBE9E4] text-[#1A1A17]"
                        }`}
                      >
                        {item}
                      </div>
                    );
                  })}
                  {state.stack.length === 0 && (
                    <div className="text-[10px] text-[#A3A199] text-center my-auto px-2 select-none italic">
                      Stack is empty
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Horizontal Queue stream */}
            {state.queue && (
              <div className="flex flex-col items-center relative">
                <span className="text-[10px] uppercase font-bold text-[#A3A199] mb-2">FIFO Queue</span>
                <div className="flex items-center gap-2 p-4 bg-[#F9F8F6] border border-[#EBE9E4] rounded-lg">
                  <span className="text-xs text-[#A3A199] font-mono">Front</span>
                  <div className="flex items-center gap-1 bg-white p-2 border border-[#EBE9E4] rounded">
                    {state.queue.map((item: string, idx: number) => (
                      <div
                        key={idx}
                        className="px-3 py-1.5 bg-[#DCFCE7] border border-[#10B981] rounded text-[#065F46] font-mono font-bold text-xs"
                      >
                        {item}
                      </div>
                    ))}
                    {state.queue.length === 0 && (
                      <div className="text-xs text-[#A3A199] italic">Empty Queue</div>
                    )}
                  </div>
                  <span className="text-xs text-[#A3A199] font-mono">Rear</span>
                </div>
              </div>
            )}
          </div>
        )}

        {/* L5. BST INTERACTIVE TREE BOARDS */}
        {(selectedAlgorithm.category === "Tree" || selectedAlgorithm.category === "Trees" || selectedAlgorithm.category === "Heap") && state.root && (
          <div className="w-full h-full min-h-[250px] relative px-4 flex justify-center">
            <svg className="w-full max-w-lg min-h-[250px]" viewBox="0 0 100 65">
              {/* Recursive Tree renderer function */}
              {(() => {
                const elements: React.ReactNode[] = [];

                const drawTree = (node: any) => {
                  if (!node) return;

                  const isInsertingActive = node.value === state.inserting;
                  const isActiveNav = node.id === state.active;

                  // Render left connection
                  if (node.left) {
                    elements.push(
                      <line
                        key={`line-l-${node.id}`}
                        x1={node.x}
                        y1={node.y}
                        x2={node.left.x}
                        y2={node.left.y}
                        stroke="#D6D3CD"
                        strokeWidth="1"
                        strokeLinecap="round"
                      />
                    );
                    drawTree(node.left);
                  }

                  // Render right connection
                  if (node.right) {
                    elements.push(
                      <line
                        key={`line-r-${node.id}`}
                        x1={node.x}
                        y1={node.y}
                        x2={node.right.x}
                        y2={node.right.y}
                        stroke="#D6D3CD"
                        strokeWidth="1"
                        strokeLinecap="round"
                      />
                    );
                    drawTree(node.right);
                  }

                  // Render Node Circle
                  let circleCol = "#FFFFFF";
                  let borderCol = "#706E68";
                  let textCol = "#1A1A17";

                  if (isActiveNav) {
                    circleCol = "#FEF3C7";
                    borderCol = "#F59E0B";
                    textCol = "#92400E";
                  } else if (isInsertingActive) {
                    circleCol = "#DCFCE7";
                    borderCol = "#10B981";
                    textCol = "#065F46";
                  }

                  elements.push(
                    <g key={node.id} className="transition-all duration-300">
                      <circle
                        cx={node.x}
                        cy={node.y}
                        r="3.5"
                        fill={circleCol}
                        stroke={borderCol}
                        strokeWidth="0.8"
                        className="shadow-sm"
                      />
                      <text
                        x={node.x}
                        y={node.y + 1}
                        textAnchor="middle"
                        fontSize="2"
                        fontWeight="bold"
                        fontFamily="monospace"
                        fill={textCol}
                      >
                        {node.value}
                      </text>
                    </g>
                  );
                };

                drawTree(state.root);
                return elements;
              })()}
            </svg>
            {state.inserting && (
              <span className="absolute top-2 right-2 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider bg-[#DCFCE7] border border-[#A7F3D0] text-[#065F46] rounded shadow-xs">
                Active Insertion: {state.inserting}
              </span>
            )}
          </div>
        )}

        {/* L6. DIJKSTRA / GRAPH MODULE */}
        {(selectedAlgorithm.category === "Graph" || selectedAlgorithm.category === "Graphs") && (
          <div className="w-full flex flex-col md:flex-row items-center gap-6 max-w-4xl h-full justify-between">
            {/* Graph Drawing Canvas */}
            <div className="flex-1 flex flex-col w-full">
              <div className="flex items-center justify-between py-1 bg-[#F9F8F6] px-3 border border-[#EBE9E4] rounded-t-lg">
                <span className="text-[10px] uppercase font-bold text-[#A3A199] tracking-wider flex items-center gap-1.5 ">
                  <Network className="w-3 h-3 text-[#10B981]" />
                  <span>Interactive Dijkstra Sandbox Canvas (Click area to Draw Nodes/Edges)</span>
                </span>
                <button
                  onClick={() => {
                    setGraphNodes([
                      { id: "A", x: 100, y: 150 },
                      { id: "B", x: 250, y: 80 },
                      { id: "C", x: 250, y: 220 },
                      { id: "D", x: 400, y: 150 },
                    ]);
                    setGraphEdges([
                      { from: "A", to: "B", weight: 3 },
                      { from: "A", to: "C", weight: 5 },
                      { from: "B", to: "C", weight: 1 },
                      { from: "B", to: "D", weight: 6 },
                      { from: "C", to: "D", weight: 2 },
                    ]);
                    setFirstSelectedGraphNode(null);
                  }}
                  className="text-[9px] hover:bg-white text-[#706E68] border border-[#EBE9E4] px-1.5 py-0.5 rounded cursor-pointer"
                >
                  Reset Defaults
                </button>
              </div>

              {/* Edge addition helper */}
              <div className="p-2 bg-white border-x border-[#EBE9E4] flex items-center gap-2 justify-between text-xs text-[#706E68]">
                <div className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#10B981]" />
                  <span>To draw edges, first click Node A then tap Node B. Edge weight set to:</span>
                </div>
                <input
                  type="number"
                  min="1"
                  max="50"
                  value={edgeWeightInput}
                  onChange={(e) => setEdgeWeightInput(parseInt(e.target.value) || 1)}
                  className="w-12 h-6 border border-[#EBE9E4] bg-[#F9F8F6] rounded text-center text-xs text-[#1A1A17] focus:outline-none"
                />
              </div>

              {/* Graphical Draw area map */}
              <div
                onClick={handleCanvasClick}
                className="w-full h-64 border-x border-b border-[#EBE9E4] rounded-b-lg relative cursor-crosshair bg-[#FDFCFB]"
              >
                {/* SVG connection edges */}
                <svg className="w-full h-full absolute top-0 left-0 pointer-events-none">
                  {graphEdges.map((edge, idx) => {
                    const fromN = graphNodes.find((n) => n.id === edge.from);
                    const toN = graphNodes.find((n) => n.id === edge.to);
                    if (!fromN || !toN) return null;

                    const isActiveStep = state.current === edge.from && state.activeNeighbor === edge.to;
                    const pathDone = state.visited?.includes(edge.from) && state.visited?.includes(edge.to);

                    return (
                      <g key={idx}>
                        <line
                          x1={fromN.x}
                          y1={fromN.y}
                          x2={toN.x}
                          y2={toN.y}
                          stroke={isActiveStep ? "#10B981" : pathDone ? "#2563EB" : "#D6D3CD"}
                          strokeWidth={isActiveStep ? "3.5" : "1.8"}
                          className="transition-all"
                        />
                        {/* Text weight banner */}
                        <rect
                          x={(fromN.x + toN.x) / 2 - 8}
                          y={(fromN.y + toN.y) / 2 - 8}
                          width="16"
                          height="16"
                          rx="4"
                          fill="#FFFFFF"
                          stroke="#EBE9E4"
                          strokeWidth="1"
                        />
                        <text
                          x={(fromN.x + toN.x) / 2}
                          y={(fromN.y + toN.y) / 2 + 3}
                          textAnchor="middle"
                          fontSize="9"
                          fontWeight="bold"
                          fontFamily="monospace"
                          fill="#706E68"
                        >
                          {edge.weight}
                        </text>
                      </g>
                    );
                  })}
                </svg>

                {/* Circles nodes mapping */}
                {graphNodes.map((node) => {
                  const isCurrent = state.current === node.id;
                  const isVisited = state.visited?.includes(node.id);
                  const isFirstLinkSelected = firstSelectedGraphNode === node.id;

                  let borderClass = "border-[#706E68] bg-white text-[#1A1A17]";
                  if (isFirstLinkSelected) borderClass = "border-[#F59E0B] bg-[#FEF3C7] text-[#92400E] ring-2 ring-[#F59E0B]";
                  else if (isCurrent) borderClass = "border-[#10B981] bg-[#DCFCE7] text-[#065F46] ring-4 ring-[#10B981]/35 scale-105 font-bold";
                  else if (isVisited) borderClass = "border-blue-600 bg-blue-50 text-blue-800";

                  return (
                    <div
                      key={node.id}
                      style={{ left: `${node.x - 18}px`, top: `${node.y - 18}px` }}
                      className={`w-9 h-9 border-2 rounded-full flex flex-col justify-center items-center absolute shadow-xs font-mono text-xs cursor-pointer select-none transition-all ${borderClass}`}
                    >
                      <span className="font-bold">{node.id}</span>
                      {state.distances && (
                        <span className="text-[7.5px] font-mono leading-none tracking-tighter text-[#A3A199] font-bold">
                          {state.distances[node.id] === Infinity ? "∞" : state.distances[node.id]}
                        </span>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Distances and Prevs dynamic table */}
            {state.distances && (
              <div className="w-full md:w-44 px-4 py-3.5 bg-[#F9F8F6] border border-[#EBE9E4] rounded-lg shrink-0">
                <h4 className="text-[9px] uppercase tracking-wider text-[#A3A199] font-bold mb-2">Distance Tracker</h4>
                <div className="space-y-1.5 text-xs font-mono">
                  {Object.entries(state.distances).map(([nodeId, dist]) => {
                    const visitedSet = state.visited || [];
                    const isVis = visitedSet.includes(nodeId);
                    return (
                      <div key={nodeId} className="flex justify-between items-center py-0.5 border-b border-[#EBE9E4]/60">
                        <span className="flex items-center gap-1 font-bold text-[#1A1A17]">
                          <span className={`w-1.5 h-1.5 rounded-full ${isVis ? "bg-blue-500" : "bg-[#D6D3CD]"}`} />
                          {nodeId}
                        </span>
                        <span className={isVis ? "text-[#10B981] font-bold" : "text-[#706E68]"}>
                          {dist === Infinity ? "Infinity" : String(dist)}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        )}

        {/* L7. DYNAMIC PROGRAMMING CELLULAR MATRIX */}
        {(selectedAlgorithm.category === "Dynamic Programming" || selectedAlgorithm.category === "DP" || selectedAlgorithm.id === "knapsack") && state.dp && (
          <div className="w-full flex flex-col items-center justify-center gap-4 max-w-xl">
            <span className="text-[10px] uppercase font-bold text-[#A3A199] tracking-wider mb-1">
              Capacities columns (w) x Items Rows (i) DP Matrix
            </span>
            <div className="border border-[#EBE9E4] rounded-lg overflow-hidden w-full max-w-md shadow-xs bg-white">
              <table className="w-full table-fixed font-mono text-xs text-center border-collapse">
                <thead>
                  <tr className="bg-[#F9F8F6] border-b border-[#EBE9E4] text-[#706E68] text-[9.5px]">
                    <th className="py-2.5 bg-[#F5F3EF] border-r border-[#EBE9E4] w-20">Items (i)</th>
                    {Array.from({ length: (state.capacity !== undefined ? state.capacity : 6) }, (_, w) => (
                      <th key={w} className="py-2 border-r border-[#EBE9E4]">W={w}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {state.dp.map((rowArr: number[], iIdx: number) => {
                    const isRowHighlight = state.r === iIdx;
                    return (
                      <tr key={iIdx} className={`border-b border-[#EBE9E4] ${isRowHighlight ? "bg-amber-50/20" : ""}`}>
                        {/* Row headers */}
                        <td className="py-2.5 bg-[#F9F8F6] font-bold border-r border-[#EBE9E4] text-[#706E68] text-[10px]">
                          {iIdx === 0 ? "0 (Base)" : `I-${iIdx} ${state.values ? `(v:${state.values?.[iIdx - 1]} w:${state.weights?.[iIdx - 1]})` : ""}`}
                        </td>

                        {rowArr.map((cellVal: number, wIdx: number) => {
                          const isActiveCell = state.r === iIdx && state.c === wIdx;
                          const isContributor = state.activeCells?.some(
                            ([cr, cw]: [number, number]) => cr === iIdx && cw === wIdx
                          );

                          let cellBg = "bg-white text-[#1A1A17]";
                          if (isActiveCell) cellBg = "bg-[#FEF3C7] border-2 border-[#F59E0B] text-[#92400E] font-bold ring-2 ring-[#F59E0B]/30 animate-pulse";
                          else if (isContributor) cellBg = "bg-[#DBEAFE] border border-blue-400 text-[#1E40AF] font-semibold";

                          return (
                            <td key={wIdx} className={`py-2 border-r border-[#EBE9E4] font-semibold transition-all duration-300 ${cellBg}`}>
                              {cellVal}
                            </td>
                          );
                        })}
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* L8. BACKTRACKING CHESSBOARD */}
        {selectedAlgorithm.id === "n-queens" && state.board && (
          <div className="w-full flex flex-col items-center justify-center gap-6 max-w-xl">
            <span className="text-[10px] uppercase font-bold text-[#A3A199] tracking-wider mb-1">
              Active Chessboard Column Pointer: {state.col < 4 ? `Col ${state.col}` : "Sol Available"}
            </span>

            {/* Checker Chessboard */}
            <div className="border border-[#706E68] rounded-md overflow-hidden grid grid-cols-4 w-52 h-52 self-center bg-[#FDFCFB] shadow-sm select-none">
              {state.board.map((rowArr: string[], rIdx: number) => {
                return rowArr.map((cellVal: string, cIdx: number) => {
                  const isLightSquare = (rIdx + cIdx) % 2 === 0;
                  const isQueen = cellVal === "Q";
                  const isConflicting = state.activeRow === rIdx && state.conflicts?.some(([cr, cc]: [number, number]) => cr === rIdx || cc === cIdx);

                  let cellBg = isLightSquare ? "bg-white" : "bg-[#F5F3EF]";
                  let textColor = "text-transparent";

                  if (isQueen) {
                    cellBg = "bg-[#DCFCE7] border border-[#10B981]";
                    textColor = "text-[#065F46]";
                  } else if (state.activeRow === rIdx && state.col === cIdx) {
                    cellBg = "bg-[#FEF3C7] border border-[#F59E0B] animate-pulse";
                  } else if (isConflicting) {
                    cellBg = "bg-red-50 border border-red-300";
                  }

                  return (
                    <div
                      key={`${rIdx}-${cIdx}`}
                      className={`w-full h-full flex flex-col items-center justify-center font-mono font-bold text-sm tracking-tighter relative ${cellBg}`}
                    >
                      {/* Queen graphical placeholder */}
                      {isQueen ? (
                        <span className="text-xl" title="Queen">👑</span>
                      ) : (
                        <span className="text-[9px] text-[#A3A199] select-none font-mono">
                          {rIdx},{cIdx}
                        </span>
                      )}
                    </div>
                  );
                });
              })}
            </div>
          </div>
        )}

        {/* L9. BITWISE TRIGGERS MASK */}
        {selectedAlgorithm.id === "bit-tricks" && (
          <div className="flex flex-col items-center justify-center gap-6 w-full max-w-lg">
            <span className="text-[10px] uppercase font-bold text-[#A3A199] tracking-wider">
              Interactive Bit Editor Registers
            </span>

            <div className="w-full space-y-4 p-5 bg-[#F9F8F6] border border-[#EBE9E4] rounded-lg">
              {/* Variable A Bitwise Row */}
              <div className="flex items-center justify-between font-mono text-xs">
                <span className="font-bold text-[#1A1A17] w-24">Number A: {state.a}</span>
                <div className="flex gap-1">
                  {state.binaryA?.split("").map((bit: string, idx: number) => (
                    <button
                      key={idx}
                      className="w-7 h-7 bg-white border border-[#EBE9E4] rounded shadow-xs font-mono font-bold text-xs text-[#10B981] cursor-pointer"
                    >
                      {bit}
                    </button>
                  ))}
                </div>
              </div>

              {/* Variable B Bitwise Row */}
              {state.binaryB && (
                <div className="flex items-center justify-between font-mono text-xs">
                  <span className="font-bold text-[#1A1A17] w-24">Number B: {state.b}</span>
                  <div className="flex gap-1">
                    {state.binaryB.split("").map((bit: string, idx: number) => (
                      <button
                        key={idx}
                        className="w-7 h-7 bg-white border border-[#EBE9E4] rounded shadow-xs font-mono font-bold text-xs text-[#1E40AF] cursor-pointer"
                      >
                        {bit}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Computed Operation Result */}
              {state.op && (
                <div className="border-t border-[#EBE9E4] pt-4 flex items-center justify-between font-mono text-xs">
                  <span className="font-bold text-[#D97706] w-24 uppercase">Result ({state.op}): {state.result}</span>
                  <div className="flex gap-1">
                    {state.binaryRes?.split("").map((bit: string, idx: number) => (
                      <div
                        key={idx}
                        className="w-7 h-7 bg-[#DCFCE7] border border-[#10B981] rounded shadow-xs flex items-center justify-center font-mono font-bold text-xs text-[#065F46] animate-pulse"
                      >
                        {bit}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
