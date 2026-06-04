import { AlgorithmItem } from "../types";

export const ALGORITHMS: AlgorithmItem[] = [
  // SORTING
  {
    id: "bubble-sort",
    name: "Bubble Sort",
    subtitle: "Simple Comparison Sorter",
    category: "Sorting",
    timeComplexity: "O(n²)",
    spaceComplexity: "O(1)",
    codeLanguage: "javascript",
    initialInputLabel: "Array of Numbers (comma-separated)",
    initialInputValue: "25, 8, 48, 12, 33, 5, 20",
    explanation: {
      intuition: "Repeatedly steps through the list, compares adjacent elements, and swaps them if they are in the wrong order. This pass is repeated until the list is sorted.",
      bruteForce: "Compare all pairs of elements, which always takes O(n²) operations even if the array is initially sorted, unless optimized with a break flag.",
      optimalSolution: "Include a boolean flag 'swapped' in each outer iteration. If no elements were swapped in a complete pass, the array is already sorted, yielding O(n) best-case complexity.",
    },
    code: `function bubbleSort(arr) {
  let n = arr.length;
  for (let i = 0; i < n; i++) {
    let swapped = false;
    for (let j = 0; j < n - i - 1; j++) {
      if (arr[j] > arr[j + 1]) {
        // Swap elements
        let temp = arr[j];
        arr[j] = arr[j + 1];
        arr[j + 1] = temp;
        swapped = true;
      }
    }
    if (!swapped) break;
  }
  return arr;
}`,
  },
  {
    id: "quick-sort",
    name: "Quick Sort",
    subtitle: "Divide and Conquer (Hoare Partition)",
    category: "Sorting",
    timeComplexity: "O(n log n)",
    spaceComplexity: "O(log n)",
    codeLanguage: "javascript",
    initialInputLabel: "Array of Numbers (comma-separated)",
    initialInputValue: "15, 28, 42, 21, 56, 8, 33, 12",
    explanation: {
      intuition: "Selects an element as pivot and partitions the given array around it. Hoare's schema uses two pointers starting from the ends, moving toward each other until they find a violation.",
      bruteForce: "Create auxiliary copies of arrays at each step (O(n) auxiliary space) to hold less-than and greater-than partitions.",
      optimalSolution: "In-place partition using Hoare's scheme with randomized pivot selection to guarantee average O(n log n) runtime.",
    },
    code: `function partition(arr, low, high) {
  let pivot = arr[low];
  let i = low - 1;
  let j = high + 1;
  while (true) {
    do { i++; } while (arr[i] < pivot);
    do { j--; } while (arr[j] > pivot);
    if (i >= j) return j;
    swap(arr, i, j);
  }
}

function quickSort(arr, low, high) {
  if (low < high) {
    let p = partition(arr, low, high);
    quickSort(arr, low, p);
    quickSort(arr, p + 1, high);
  }
}`,
  },
  {
    id: "merge-sort",
    name: "Merge Sort",
    subtitle: "Stable Divide & Conquer Sorter",
    category: "Sorting",
    timeComplexity: "O(n log n)",
    spaceComplexity: "O(n)",
    codeLanguage: "javascript",
    initialInputLabel: "Array of Numbers (comma-separated)",
    initialInputValue: "30, 10, 45, 15, 5, 25, 40",
    explanation: {
      intuition: "Divide the unsorted list into n sublists, each containing one element. Repeatedly merge sublists to produce new sorted sublists until there is only one sublist remaining.",
      bruteForce: "Standard recursions with high allocations.",
      optimalSolution: "Merge in-place if possible (complex) or allocate temp arrays carefully, keeping tracking of low and high indices.",
    },
    code: `function merge(arr, l, m, r) {
  let n1 = m - l + 1;
  let n2 = r - m;
  let L = arr.slice(l, m + 1);
  let R = arr.slice(m + 1, r + 1);
  let i = 0, j = 0, k = l;
  while (i < n1 && j < n2) {
    if (L[i] <= R[j]) {
      arr[k] = L[i++];
    } else {
      arr[k] = R[j++];
    }
    k++;
  }
  while (i < n1) arr[k++] = L[i++];
  while (j < n2) arr[k++] = R[j++];
}

function mergeSort(arr, l, r) {
  if (l < r) {
    let m = Math.floor((l + r) / 2);
    mergeSort(arr, l, m);
    mergeSort(arr, m + 1, r);
    merge(arr, l, m, r);
  }
}`,
  },

  // ARRAYS & TWO POINTERS / SLIDING WINDOW
  {
    id: "binary-search",
    name: "Binary Search",
    subtitle: "Dividing search space in half",
    category: "Array",
    timeComplexity: "O(log n)",
    spaceComplexity: "O(1)",
    codeLanguage: "javascript",
    initialInputLabel: "Sorted Array & Target (e.g. [array], target)",
    initialInputValue: "5, 12, 18, 22, 35, 47, 50, 63, 72, 85 | 50",
    explanation: {
      intuition: "Search a sorted array by repeatedly dividing the search interval in half. Begin with an interval covering the whole array. If the value of the search key is less than the item in the middle, narrow the interval to the lower half.",
      bruteForce: "Linear scan through the array elements, taking O(n) average and worst-case time.",
      optimalSolution: "Binary Search splits the remaining range in half each step: mid = low + (high - low) / 2. This runs in O(log n) time.",
    },
    code: `function binarySearch(arr, target) {
  let low = 0;
  let high = arr.length - 1;
  while (low <= high) {
    let mid = Math.floor((low + high) / 2);
    if (arr[mid] === target) {
      return mid; // Found target!
    } else if (arr[mid] < target) {
      low = mid + 1;
    } else {
      high = mid - 1;
    }
  }
  return -1; // Not found
}`,
  },
  {
    id: "kadane",
    name: "Kadane's Algorithm",
    subtitle: "Max Sum Subarray Problem",
    category: "Array",
    timeComplexity: "O(n)",
    spaceComplexity: "O(1)",
    codeLanguage: "javascript",
    initialInputLabel: "Array of Numbers (comma-separated)",
    initialInputValue: "-2, 1, -3, 4, -1, 2, 1, -5, 4",
    explanation: {
      intuition: "Finds the contiguous subarray within a one-dimensional array of numbers which has the largest sum. At each position, find the maximum subarray ending here by selecting between the current element and the current element + maximum subarray ending at the previous position.",
      bruteForce: "Compute sum of all possible subarrays starting at all indices i and ending at all j. This takes O(n²) time.",
      optimalSolution: "Track maximum ending here and maximum so far. max_ending_here = max(arr[i], max_ending_here + arr[i]). This runs in a single O(n) pass.",
    },
    code: `function maxSubArray(arr) {
  let maxSoFar = arr[0];
  let maxEndingHere = arr[0];
  let start = 0, end = 0, tempStart = 0;
  
  for (let i = 1; i < arr.length; i++) {
    if (arr[i] > maxEndingHere + arr[i]) {
      maxEndingHere = arr[i];
      tempStart = i;
    } else {
      maxEndingHere = maxEndingHere + arr[i];
    }
    
    if (maxEndingHere > maxSoFar) {
      maxSoFar = maxEndingHere;
      start = tempStart;
      end = i;
    }
  }
  return { maxSum: maxSoFar, range: [start, end] };
}`,
  },
  {
    id: "sliding-window-max",
    name: "Max Sum Subarray (Size K)",
    subtitle: "Fixed Size Sliding Window",
    category: "Sliding Window",
    timeComplexity: "O(n)",
    spaceComplexity: "O(1)",
    codeLanguage: "javascript",
    initialInputLabel: "Array of Numbers & Subarray Size K",
    initialInputValue: "2, 1, 5, 1, 3, 2, 5, 8 | 3",
    explanation: {
      intuition: "Find the maximum sum of a contiguous subarray of size K. Instead of recomputing sum of size K at each position, subtract the element leaving the window and add the element entering the window.",
      bruteForce: "For each possible starting index, compute the sum of the next K elements. This takes O(n * K) time.",
      optimalSolution: "Slide a window of size K. Calculate the initial sliding sum of size K, then iterate: add arr[i] and subtract arr[i - K] to obtain the next sum in O(1). Overall time O(n).",
    },
    code: `function maxSubarrayK(arr, k) {
  let windowSum = 0;
  let maxSum = 0;
  let startIdx = 0;
  for (let i = 0; i < k; i++) {
    windowSum += arr[i];
  }
  maxSum = windowSum;

  for (let i = k; i < arr.length; i++) {
    windowSum += arr[i] - arr[i - k];
    if (windowSum > maxSum) {
      maxSum = windowSum;
      startIdx = i - k + 1;
    }
  }
  return maxSum;
}`,
  },

  // DATA STRUCTURES
  {
    id: "linked-list-ops",
    name: "Linked List Operations",
    subtitle: "Insert, Delete, & Reversal",
    category: "Linked List",
    timeComplexity: "O(n)",
    spaceComplexity: "O(1)",
    codeLanguage: "javascript",
    initialInputLabel: "Nodes list (comma-separated)",
    initialInputValue: "10, 20, 30, 40, 50",
    explanation: {
      intuition: "A linear data structure where elements are not stored in contiguous locations. Each element contains a data field and a pointer to the next node. Reversing involves re-linking arrows backwards.",
      bruteForce: "Using auxiliary lists or stacks to copy nodes.",
      optimalSolution: "Adjust pointers in-place: track previous, current, and next pointers. Reassign current.next to previous, shift previous & current.",
    },
    code: `function reverseList(head) {
  let prev = null;
  let current = head;
  let next = null;
  while (current !== null) {
    next = current.next; // Store next
    current.next = prev;  // Reverse connection
    prev = current;       // Shift pointers forward
    current = next;
  }
  return prev; // New head
}`,
  },
  {
    id: "stack-valid-parentheses",
    name: "Valid Parentheses",
    subtitle: "Stack (LIFO) tracking",
    category: "Stack",
    timeComplexity: "O(n)",
    spaceComplexity: "O(n)",
    codeLanguage: "javascript",
    initialInputLabel: "Brackets String",
    initialInputValue: "({[]})()[]",
    explanation: {
      intuition: "Process elements left-to-right. Push open brackets onto a LIFO stack. For close brackets, pop from the stack and verify that they match. The string is valid if the stack is ultimately empty.",
      bruteForce: "Repeatedly find and replace matching pairs '()', '[]', '{}' with empty strings in a loop until none are left. This takes O(n²).",
      optimalSolution: "Use a simple stack to save matching counterparts in linear O(n) time and space.",
    },
    code: `function isValid(str) {
  let stack = [];
  let map = {
    ')': '(',
    '}': '{',
    ']': '['
  };
  for (let i = 0; i < str.length; i++) {
    let char = str[i];
    if (char === '(' || char === '{' || char === '[') {
      stack.push(char);
    } else if (map[char]) {
      let top = stack.pop();
      if (top !== map[char]) return false;
    }
  }
  return stack.length === 0;
}`,
  },
  {
    id: "binary-search-tree",
    name: "BST Insert & Search",
    subtitle: "Hierarchical Tree Visualizer",
    category: "Tree",
    timeComplexity: "O(log n)",
    spaceComplexity: "O(h)",
    codeLanguage: "javascript",
    initialInputLabel: "Nodes to Insert",
    initialInputValue: "40, 20, 60, 10, 30, 50, 70",
    explanation: {
      intuition: "A Binary Search Tree satisfies: Left subtree nodes are less than parent, and right subtree nodes are greater. Traversal in-order results in a sorted sequence.",
      bruteForce: "Unbalanced linear degenerate list operations taking O(n) depth.",
      optimalSolution: "Self-balancing AVL / Red-Black Tree models to guarantee stable O(log n) searches.",
    },
    code: `class Node {
  constructor(val) {
    this.value = val;
    this.left = null;
    this.right = null;
  }
}

function insertBST(root, val) {
  if (root === null) return new Node(val);
  if (val < root.value) {
    root.left = insertBST(root.left, val);
  } else {
    root.right = insertBST(root.right, val);
  }
  return root;
}`,
  },

  // GRAPHS
  {
    id: "dijkstra",
    name: "Dijkstra's Algorithm",
    subtitle: "Shortest Path in Weighted Graph",
    category: "Graph",
    timeComplexity: "O((V + E) log V)",
    spaceComplexity: "O(V)",
    codeLanguage: "javascript",
    initialInputLabel: "Source Node",
    initialInputValue: "0",
    explanation: {
      intuition: "Find the shortest path from a source node to all other vertices. Keep a set of unvisited nodes and distances. Repeatedly pick the unvisited node with minimum distance, and relax its neighbors.",
      bruteForce: "Scanning unvisited vertex distances in an array taking O(V²) operations.",
      optimalSolution: "Using a Priority Queue / Binary Heap to fetch the minimum-distance vertex in O(log V) time, running in nested O((V + E) log V).",
    },
    code: `function dijkstra(graph, src) {
  let distances = {};
  let prev = {};
  let pq = new PriorityQueue(); // Min heap
  
  for (let node of graph.nodes) {
    distances[node.id] = Infinity;
    prev[node.id] = null;
  }
  distances[src] = 0;
  pq.enqueue(src, 0);
  
  while (!pq.isEmpty()) {
    let { element: u, priority: dist } = pq.dequeue();
    if (dist > distances[u]) continue;
    
    for (let neighbor of graph.adj[u]) {
      let alt = distances[u] + neighbor.weight;
      if (alt < distances[neighbor.id]) {
        distances[neighbor.id] = alt;
        prev[neighbor.id] = u;
        pq.enqueue(neighbor.id, alt);
      }
    }
  }
  return { distances, prev };
}`,
  },

  // DYNAMIC PROGRAMMING
  {
    id: "knapsack",
    name: "0/1 Knapsack Problem",
    subtitle: "Tabulation / Subproblem Sequence",
    category: "DP",
    timeComplexity: "O(N * W)",
    spaceComplexity: "O(N * W)",
    codeLanguage: "javascript",
    initialInputLabel: "Weights, Values | Capacity",
    initialInputValue: "1, 2, 3 | 10, 15, 40 | 5",
    explanation: {
      intuition: "Given weights and values of items, put these items in a knapsack of capacity W to get the maximum total value in the knapsack. For each item, decide whether to include it or exclude it.",
      bruteForce: "Use standard recursive backtracking: check all subsets of items. This takes O(2^n) calls.",
      optimalSolution: "Use a two-dimensional DP matrix of size (N+1) x (W+1). dp[i][w] = max(dp[i-1][w], val[i-1] + dp[i-1][w - wt[i-1]]). Subproblem computations are reused, making complexity O(N * W).",
    },
    code: `function knapsack(weights, values, capacity) {
  let N = weights.length;
  let dp = Array(N + 1).fill(0).map(() => Array(capacity + 1).fill(0));
  
  for (let i = 1; i <= N; i++) {
    for (let w = 1; w <= capacity; w++) {
      if (weights[i-1] <= w) {
        dp[i][w] = Math.max(
          dp[i-1][w],
          values[i-1] + dp[i-1][w - weights[i-1]]
        );
      } else {
        dp[i][w] = dp[i-1][w];
      }
    }
  }
  return dp[N][capacity];
}`,
  },

  // BACKTRACKING
  {
    id: "n-queens",
    name: "N-Queens Solver",
    subtitle: "Visualizing Decision Trees",
    category: "Backtracking",
    timeComplexity: "O(N!)",
    spaceComplexity: "O(N²)",
    codeLanguage: "javascript",
    initialInputLabel: "Board size N",
    initialInputValue: "4",
    explanation: {
      intuition: "Place N queens on an N*N chessboard such that no two queens attack each other. Place a queen column-by-column, checking if placement is safe. If not safe, backtrack and change queen positions.",
      bruteForce: "Formulate all combinations of board configurations and screen them, which is extremely expensive.",
      optimalSolution: "DFS backtracking using index constraints, tracking column, diagonal, and anti-diagonal states as bitmasks in O(1) checks.",
    },
    code: `function solveNQueens(n) {
  let results = [];
  let board = Array(n).fill(null).map(() => Array(n).fill('.'));
  
  function isSafe(row, col) {
    for (let i = 0; i < col; i++) {
      if (board[row][i] === 'Q') return false;
    }
    for (let i = row, j = col; i >= 0 && j >= 0; i--, j--) {
      if (board[i][j] === 'Q') return false;
    }
    for (let i = row, j = col; j >= 0 && i < n; i++, j--) {
      if (board[i][j] === 'Q') return false;
    }
    return true;
  }
  
  function backtrack(col) {
    if (col === n) {
      results.push(board.map(r => r.join('')));
      return true;
    }
    for (let i = 0; i < n; i++) {
      if (isSafe(i, col)) {
        board[i][col] = 'Q';
        backtrack(col + 1);
        board[i][col] = '.'; // Backtrack
      }
    }
  }
  backtrack(0);
  return results;
}`,
  },

  // BIT MANIPULATION
  {
    id: "bit-tricks",
    name: "Bitwise Operations & XOR",
    subtitle: "Standard and Masking Operations",
    category: "Bit Manipulation",
    timeComplexity: "O(1)",
    spaceComplexity: "O(1)",
    codeLanguage: "javascript",
    initialInputLabel: "Binary Inputs A & B (numbers)",
    initialInputValue: "12, 5",
    explanation: {
      intuition: "Operations on the binary level where individual bits are shifted, set, cleared, toggled, or combined using XOR, AND, OR, NOT operations.",
      bruteForce: "Using high-level divisions, parsing strings, or base-conversions which are computationally intensive.",
      optimalSolution: "Utilize direct hardware CPU assembly instructions using operators like `&`, `|`, `^`, `<<`, `>>` for optimal performance.",
    },
    code: `function bitwiseTricks(a, b) {
  let andResult = a & b;       // Intersection
  let orResult = a | b;        // Union
  let xorResult = a ^ b;       // Toggle / Symmetric difference
  let notA = ~a;               // Toggle all bits
  let leftShift = a << 1;     // Multiply A by 2
  let rightShift = a >> 1;    // Divide A by 2
  return { andResult, orResult, xorResult, notA, leftShift, rightShift };
}`,
  },
];
