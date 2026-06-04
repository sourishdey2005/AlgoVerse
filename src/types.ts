export interface AlgorithmStep {
  stepNumber: number;
  description: string;
  variables: Record<string, any>;
  highlightedLines: number[];
  state: any;
}

export type AlgorithmCategory =
  | "Array"
  | "Sorting"
  | "Linked List"
  | "Stack"
  | "Queue"
  | "Heap"
  | "Tree"
  | "Graph"
  | "DP"
  | "Sliding Window"
  | "Two Pointer"
  | "Backtracking"
  | "Recursion"
  | "Bit Manipulation"
  | "Arrays"
  | "Searching"
  | "Trees"
  | "Graphs"
  | "Dynamic Programming";

export interface AlgorithmItem {
  id: string;
  name: string;
  subtitle: string;
  category: AlgorithmCategory;
  timeComplexity: string;
  spaceComplexity: string;
  code: string;
  codeLanguage: string;
  explanation: Record<string, string>; // e.g., { intuition: "", bruteForce: "", optimalSolution: "" }
  initialInputLabel: string;
  initialInputValue: string;
}

export interface Problem {
  id: string;
  title: string;
  description: string;
  difficulty: "Easy" | "Medium" | "Hard";
  topic: string;
  pattern: string;
  companies: string[];
  frequency: number; // 1 to 5 stars
  tags: string[];
  boilerplate: Record<string, string>;
  testCaseInput: string;
  testCaseOutput: string;
}

export interface Submission {
  id: string;
  problemId: string;
  problemTitle: string;
  language: string;
  code: string;
  status: "Accepted" | "Wrong Answer" | "Runtime Error";
  runtimeMs: number;
  memoryMb: number;
  submittedAt: string;
}

export interface ForumPost {
  id: string;
  title: string;
  author: string;
  avatar: string;
  category: string;
  content: string;
  upvotes: number;
  replies: number;
  timeAgo: string;
  comments: ForumComment[];
}

export interface ForumComment {
  id: string;
  author: string;
  content: string;
  timeAgo: string;
}

export interface UserStats {
  xp: number;
  streak: number;
  solvedIds: string[];
  solvedCount: number;
  badges: string[];
  velocity: number; // topics per week
  level: number;
  heatmap: Record<string, number>; // date "YYYY-MM-DD" -> count
}
