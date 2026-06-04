import { AlgorithmItem } from "../types";

export const ALGORITHMS: AlgorithmItem[] = [
  // ARRAYS
  {
    id: "array-traversal",
    name: "Array Traversal",
    subtitle: "Linear element scanning",
    category: "Arrays",
    timeComplexity: "O(n)",
    spaceComplexity: "O(1)",
    codeLanguage: "javascript",
    initialInputLabel: "Array of Numbers (comma-separated)",
    initialInputValue: "10, 20, 30, 40, 50",
    explanation: {
      intuition: "Iterate through each element in the array sequentially from start to end, visiting each index exactly once.",
      bruteForce: "Traverse index-by-index in standard loops.",
      optimalSolution: "Single pass iterator sequence.",
    },
    code: `function traverse(arr) {
  for (let i = 0; i < arr.length; i++) {
    let current = arr[i];
    console.log("Visiting element at index", i, "value", current);
  }
}`,
  },
  {
    id: "array-reverse",
    name: "Reverse Array",
    subtitle: "Two pointer swap inversion",
    category: "Arrays",
    timeComplexity: "O(n)",
    spaceComplexity: "O(1)",
    codeLanguage: "javascript",
    initialInputLabel: "Array of Numbers (comma-separated)",
    initialInputValue: "5, 10, 15, 20, 25, 30",
    explanation: {
      intuition: "Invert the order of array elements in-place by swapping elements from symmetric outer edges inward.",
      bruteForce: "Allocate another temporary helper list of size N and copy items backward.",
      optimalSolution: "Utilize two pointers: low (starting at 0) and high (starting at end). Swap elements and converge pointers inward.",
    },
    code: `function reverseArray(arr) {
  let low = 0;
  let high = arr.length - 1;
  while (low < high) {
    let temp = arr[low];
    arr[low] = arr[high];
    arr[high] = temp;
    low++;
    high--;
  }
  return arr;
}`,
  },
  {
    id: "prefix-sum",
    name: "Prefix Sum",
    subtitle: "Precomputed range query optimization",
    category: "Arrays",
    timeComplexity: "O(n)",
    spaceComplexity: "O(n)",
    codeLanguage: "javascript",
    initialInputLabel: "Array of Numbers (comma-separated)",
    initialInputValue: "2, 4, 3, 5, 1, 8",
    explanation: {
      intuition: "Precalculate the sum of elements from index 0 to index i. Range sum query [l, r] can then be calculated in O(1) time as prefix[r] - prefix[l-1].",
      bruteForce: "Sum up elements from 'l' to 'r' sequentially on every query, taking O(N) worst-case.",
      optimalSolution: "Construct prefix sum array: prefix[i] = prefix[i-1] + arr[i]. Queries then take O(1) time.",
    },
    code: `function buildPrefixSums(arr) {
  let prefix = Array(arr.length).fill(0);
  prefix[0] = arr[0];
  for (let i = 1; i < arr.length; i++) {
    prefix[i] = prefix[i - 1] + arr[i];
  }
  return prefix;
}`,
  },
  {
    id: "kadane",
    name: "Kadane Algorithm",
    subtitle: "Maximum Subarray Sum",
    category: "Arrays",
    timeComplexity: "O(n)",
    spaceComplexity: "O(1)",
    codeLanguage: "javascript",
    initialInputLabel: "Array of Numbers (comma-separated)",
    initialInputValue: "-2, 1, -3, 4, -1, 2, 1, -5, 4",
    explanation: {
      intuition: "Compute the maximum possible contiguous sum of elements. Decide at each step whether to extend the active subarray sum or start a new subarray sum from the current element.",
      bruteForce: "Check all subarray permutations using nested loops in O(n²) time.",
      optimalSolution: "Track max ending here and update max so far in a single pass: maxEndingHere = max(val, maxEndingHere + val). Runs in O(n) time.",
    },
    code: `function maxSubArray(arr) {
  let maxSoFar = arr[0];
  let maxEndingHere = arr[0];
  for (let i = 1; i < arr.length; i++) {
    maxEndingHere = Math.max(arr[i], maxEndingHere + arr[i]);
    maxSoFar = Math.max(maxSoFar, maxEndingHere);
  }
  return maxSoFar;
}`,
  },

  // SEARCHING
  {
    id: "binary-search",
    name: "Binary Search",
    subtitle: "Dichotomic interval search space division",
    category: "Searching",
    timeComplexity: "O(log n)",
    spaceComplexity: "O(1)",
    codeLanguage: "javascript",
    initialInputLabel: "Sorted Array & Target (arr | target)",
    initialInputValue: "5, 12, 18, 22, 35, 47, 50, 63, 72, 85 | 50",
    explanation: {
      intuition: "Search a sorted set of inputs by splitting search intervals in half. At each index, reduce the search boundaries either to the left half or right half.",
      bruteForce: "Perform a linear scan from start to finish, running in O(n) time.",
      optimalSolution: "Use low and high boundaries. Assess midpoint content and shift pointers outward.",
    },
    code: `function binarySearch(arr, target) {
  let low = 0;
  let high = arr.length - 1;
  while (low <= high) {
    let mid = Math.floor((low + high) / 2);
    if (arr[mid] === target) {
      return mid;
    } else if (arr[mid] < target) {
      low = mid + 1;
    } else {
      high = mid - 1;
    }
  }
  return -1;
}`,
  },

  // SORTING
  {
    id: "bubble-sort",
    name: "Bubble Sort",
    subtitle: "Simple comparison bubble sorter",
    category: "Sorting",
    timeComplexity: "O(n²)",
    spaceComplexity: "O(1)",
    codeLanguage: "javascript",
    initialInputLabel: "Array of Numbers (comma-separated)",
    initialInputValue: "25, 8, 48, 12, 33, 5, 20",
    explanation: {
      intuition: "Repeatedly steps through the list, compares contiguous elements, and swaps them if out of order. Swaps bubble the largest elements to the end of the array.",
      bruteForce: "Exhaustive nested sorting routines.",
      optimalSolution: "Add a flag state to terminate early if no active swaps were performed on a complete pass. Brings best case to O(n).",
    },
    code: `function bubbleSort(arr) {
  let n = arr.length;
  for (let i = 0; i < n; i++) {
    let swapped = false;
    for (let j = 0; j < n - i - 1; j++) {
      if (arr[j] > arr[j + 1]) {
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
    id: "selection-sort",
    name: "Selection Sort",
    subtitle: "Slices minimum element repeatedly",
    category: "Sorting",
    timeComplexity: "O(n²)",
    spaceComplexity: "O(1)",
    codeLanguage: "javascript",
    initialInputLabel: "Array of Numbers (comma-separated)",
    initialInputValue: "29, 64, 73, 12, 22, 11, 4",
    explanation: {
      intuition: "Maintain sorted and unsorted segments. Repeatedly scan the unsorted segment to find the minimum value, then swap it to the beginning of the unsorted boundary.",
      bruteForce: "O(n²) comparisons to retrieve bounds.",
      optimalSolution: "In-place minimum indexing algorithm. Reduces total swap steps to O(n).",
    },
    code: `function selectionSort(arr) {
  let n = arr.length;
  for (let i = 0; i < n - 1; i++) {
    let minIdx = i;
    for (let j = i + 1; j < n; j++) {
      if (arr[j] < arr[minIdx]) {
        minIdx = j;
      }
    }
    let temp = arr[minIdx];
    arr[minIdx] = arr[i];
    arr[i] = temp;
  }
  return arr;
}`,
  },
  {
    id: "insertion-sort",
    name: "Insertion Sort",
    subtitle: "Builds a sorted partition index by index",
    category: "Sorting",
    timeComplexity: "O(n²)",
    spaceComplexity: "O(1)",
    codeLanguage: "javascript",
    initialInputLabel: "Array of Numbers (comma-separated)",
    initialInputValue: "12, 11, 13, 5, 6",
    explanation: {
      intuition: "Like sorting playing cards, pick an element from the unsorted segment and insert it into its correct position inside the sorted segment by shifting larger elements right.",
      bruteForce: "Shift items in quadratic passes.",
      optimalSolution: "Performs very fast on small or partially sorted arrays, with best-case O(n) runtime.",
    },
    code: `function insertionSort(arr) {
  let n = arr.length;
  for (let i = 1; i < n; i++) {
    let key = arr[i];
    let j = i - 1;
    while (j >= 0 && arr[j] > key) {
      arr[j + 1] = arr[j];
      j = j - 1;
    }
    arr[j + 1] = key;
  }
  return arr;
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
      intuition: "Divide the array recursively in half until elements are isolated, then merge sorted sub-arrays back up to construct a fully sorted array.",
      bruteForce: "Perform recursive splits with standard array slicing.",
      optimalSolution: "Divide index ranges cleanly: m = (l+r)/2. Allocate helper arrays L & R during merging for stable O(n log n) runtime.",
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
  {
    id: "quick-sort",
    name: "Quick Sort",
    subtitle: "Divide and Conquer pivot partitioner",
    category: "Sorting",
    timeComplexity: "O(n log n)",
    spaceComplexity: "O(log n)",
    codeLanguage: "javascript",
    initialInputLabel: "Array of Numbers (comma-separated)",
    initialInputValue: "15, 28, 42, 21, 56, 8, 33, 12",
    explanation: {
      intuition: "Choose an element as pivot, partition other elements into smaller and larger subsets, and recursively repeat to sort in place.",
      bruteForce: "Copy ranges into extra lists during partition.",
      optimalSolution: "Hoare partition using two-pointer swap convergence to sort strictly in-place, preventing overhead.",
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
    id: "heap-sort",
    name: "Heap Sort",
    subtitle: "In-place sorting using Binary Max-Heap",
    category: "Sorting",
    timeComplexity: "O(n log n)",
    spaceComplexity: "O(1)",
    codeLanguage: "javascript",
    initialInputLabel: "Array of Numbers (comma-separated)",
    initialInputValue: "4, 10, 3, 5, 1, 15, 8",
    explanation: {
      intuition: "Build a Binary Max-Heap from the input list, swap the root (maximum element) with the last element of the heap, reduce heap range size by 1, and repeat heapify on root.",
      bruteForce: "Insert each item into an auxiliary heap structure, then extract min repeatedly, consuming O(n) space.",
      optimalSolution: "Build max-heap in-place in O(n) using bottom-up leaf heapification. Extract roots in O(log n) yielding O(n log n) with O(1) auxiliary space.",
    },
    code: `function heapify(arr, n, i) {
  let largest = i;
  let l = 2 * i + 1;
  let r = 2 * i + 2;
  if (l < n && arr[l] > arr[largest]) largest = l;
  if (r < n && arr[r] > arr[largest]) largest = r;
  if (largest !== i) {
    let swap = arr[i];
    arr[i] = arr[largest];
    arr[largest] = swap;
    heapify(arr, n, largest);
  }
}

function heapSort(arr) {
  let n = arr.length;
  // Build heap
  for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
    heapify(arr, n, i);
  }
  // Extract elements
  for (let i = n - 1; i > 0; i--) {
    let temp = arr[0];
    arr[0] = arr[i];
    arr[i] = temp;
    heapify(arr, i, 0);
  }
  return arr;
}`,
  },
  {
    id: "counting-sort",
    name: "Counting Sort",
    subtitle: "Linear non-comparison count sort",
    category: "Sorting",
    timeComplexity: "O(n + k)",
    spaceComplexity: "O(n + k)",
    codeLanguage: "javascript",
    initialInputLabel: "Array integers in range [0, 9]",
    initialInputValue: "4, 2, 2, 8, 3, 3, 1, 0, 4",
    explanation: {
      intuition: "Count the occurrences of each unique integer in the array, compute prefix cumulative counts specifying output indices, and compile sorted positions directly.",
      bruteForce: "Comparison based tree sorters taking O(n log n).",
      optimalSolution: "Strictly linear O(n + k) sort by hashing ranges directly, useful when integer range range 'k' is small.",
    },
    code: `function countingSort(arr, minRange = 0, maxRange = 9) {
  let range = maxRange - minRange + 1;
  let count = Array(range).fill(0);
  let output = Array(arr.length).fill(0);
  for (let i = 0; i < arr.length; i++) {
    count[arr[i] - minRange]++;
  }
  for (let i = 1; i < range; i++) {
    count[i] += count[i - 1];
  }
  for (let i = arr.length - 1; i >= 0; i--) {
    output[count[arr[i] - minRange] - 1] = arr[i];
    count[arr[i] - minRange]--;
  }
  return output;
}`,
  },
  {
    id: "radix-sort",
    name: "Radix Sort",
    subtitle: "Individual digit counting bucket sort",
    category: "Sorting",
    timeComplexity: "O(d * (n + k))",
    spaceComplexity: "O(n + k)",
    codeLanguage: "javascript",
    initialInputLabel: "Array of integers",
    initialInputValue: "170, 45, 75, 90, 802, 24, 2, 66",
    explanation: {
      intuition: "Sort numbers digit-by-digit, starting from the least significant digit (LSD) up to the most significant. Uses Counting Sort as a stable sub-routing.",
      bruteForce: "Converting numbers to strings for comparisons.",
      optimalSolution: "Avoid string conversion. Maintain base 10 divisor arithmetic, repeating linear scans times number of digits 'd'.",
    },
    code: `function countForRadix(arr, exp) {
  let n = arr.length;
  let output = Array(n).fill(0);
  let count = Array(10).fill(0);
  for (let i = 0; i < n; i++) {
    let digit = Math.floor(arr[i] / exp) % 10;
    count[digit]++;
  }
  for (let i = 1; i < 10; i++) count[i] += count[i - 1];
  for (let i = n - 1; i >= 0; i--) {
    let digit = Math.floor(arr[i] / exp) % 10;
    output[count[digit] - 1] = arr[i];
    count[digit]--;
  }
  for (let i = 0; i < n; i++) arr[i] = output[i];
}

function radixSort(arr) {
  let max = Math.max(...arr);
  for (let exp = 1; Math.floor(max / exp) > 0; exp *= 10) {
    countForRadix(arr, exp);
  }
  return arr;
}`,
  },

  // LINKED LIST
  {
    id: "linkedlist-insert",
    name: "Linked List Insert",
    subtitle: "Node initialization and pointer appending",
    category: "Linked List",
    timeComplexity: "O(1) / O(n)",
    spaceComplexity: "O(1)",
    codeLanguage: "javascript",
    initialInputLabel: "Values to append (comma-separated)",
    initialInputValue: "10, 20, 30",
    explanation: {
      intuition: "Insert a node at the head (O(1)) or traverse to the tail node and connect its pointer to a newly instantiated Node (O(n)).",
      bruteForce: "Traverse every element sequentially on insertions.",
      optimalSolution: "Utilize tail reference bounds to insert at tail in constant O(1) time.",
    },
    code: `class Node {
  constructor(val) {
    this.value = val;
    this.next = null;
  }
}

function insertAtTail(head, val) {
  let newNode = new Node(val);
  if (head === null) return newNode;
  let curr = head;
  while (curr.next !== null) {
    curr = curr.next;
  }
  curr.next = newNode;
  return head;
}`,
  },
  {
    id: "linkedlist-delete",
    name: "Linked List Delete",
    subtitle: "Clearing matching references",
    category: "Linked List",
    timeComplexity: "O(n)",
    spaceComplexity: "O(1)",
    codeLanguage: "javascript",
    initialInputLabel: "Nodes, target val (nodes | target)",
    initialInputValue: "10, 20, 30, 40 | 30",
    explanation: {
      intuition: "Find the node containing the target value. Update its predecessor's 'next' pointer directly to the target's 'next' node.",
      bruteForce: "Recreate list items without deleted indices.",
      optimalSolution: "In-place pointer redirection: prev.next = current.next, freeing memory of dead node.",
    },
    code: `function deleteNode(head, targetValue) {
  if (head === null) return null;
  if (head.value === targetValue) return head.next;
  let curr = head;
  while (curr.next !== null && curr.next.value !== targetValue) {
    curr = curr.next;
  }
  if (curr.next !== null) {
    curr.next = curr.next.next;
  }
  return head;
}`,
  },
  {
    id: "linkedlist-reverse",
    name: "Reverse Linked List",
    subtitle: "Pointer direction inversion",
    category: "Linked List",
    timeComplexity: "O(n)",
    spaceComplexity: "O(1)",
    codeLanguage: "javascript",
    initialInputLabel: "Initial Linked List Nodes",
    initialInputValue: "1, 2, 3, 4, 5",
    explanation: {
      intuition: "Invert a singly linked list in-place by dynamically turning the link arrows backward.",
      bruteForce: "Add items into a stack, and reconstruct from head.",
      optimalSolution: "Slide 3 auxiliary pointers (prev, current, next) in O(1) space, redirecting current.next to prev.",
    },
    code: `function reverseList(head) {
  let prev = null;
  let current = head;
  let next = null;
  while (current !== null) {
    next = current.next;
    current.next = prev;
    prev = current;
    current = next;
  }
  return prev;
}`,
  },
  {
    id: "cycle-detection",
    name: "Floyd Cycle Detection",
    subtitle: "Tortoise and Hare pointer loop finding",
    category: "Linked List",
    timeComplexity: "O(n)",
    spaceComplexity: "O(1)",
    codeLanguage: "javascript",
    initialInputLabel: "Nodes with loop size link marker",
    initialInputValue: "10, 20, 30, 40, 50, 60 | loop-at-3",
    explanation: {
      intuition: "Identify whether a singly-linked list contains an internal cyclic loop using two pointer references traveling at different speeds.",
      bruteForce: "Keep track of all visited node references in a Hash Set. Consumes O(n) space.",
      optimalSolution: "Floyd's algorithm: slow travels 1 step, fast travels 2. If a cycle exists, they must meet.",
    },
    code: `function hasCycle(head) {
  let slow = head;
  let fast = head;
  while (fast !== null && fast.next !== null) {
    slow = slow.next;
    fast = fast.next.next;
    if (slow === fast) {
      return true; // Cycle detected!
    }
  }
  return false;
}`,
  },

  // STACK
  {
    id: "stack-push-pop",
    name: "Stack Operations",
    subtitle: "Last-In-First-Out dynamic array",
    category: "Stack",
    timeComplexity: "O(1)",
    spaceComplexity: "O(n)",
    codeLanguage: "javascript",
    initialInputLabel: "Operations stream (pushX, pop)",
    initialInputValue: "push5, push20, pop, push15",
    explanation: {
      intuition: "A LIFO container where elements are added (pushed) and removed (popped) from the same boundary (top).",
      bruteForce: "Using index shift arrays O(N) operations.",
      optimalSolution: "Standard array elements addition/subtraction strictly on the end of vectors in O(1).",
    },
    code: `class Stack {
  constructor() {
    this.items = [];
  }
  push(element) {
    this.items.push(element);
  }
  pop() {
    if (this.isEmpty()) return "Underflow";
    return this.items.pop();
  }
  isEmpty() {
    return this.items.length === 0;
  }
}`,
  },
  {
    id: "valid-parentheses",
    name: "Valid Parentheses",
    subtitle: "Matches open & closed delimiters",
    category: "Stack",
    timeComplexity: "O(n)",
    spaceComplexity: "O(n)",
    codeLanguage: "javascript",
    initialInputLabel: "Parentheses string to match",
    initialInputValue: "({[]})()[]",
    explanation: {
      intuition: "Traverse string and save openers on a stack. On matching closers, verify compatibility with the popped element.",
      bruteForce: "Iterative search and replace of delimiters taking quadratic time.",
      optimalSolution: "Utilize a LIFO container matching counterparts in simple single-pass O(r) complexity.",
    },
    code: `function isValid(str) {
  let stack = [];
  let map = { ')': '(', '}': '{', ']': '[' };
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
    id: "next-greater-element",
    name: "Next Greater Element",
    subtitle: "Monotonic stack backward lookup",
    category: "Stack",
    timeComplexity: "O(n)",
    spaceComplexity: "O(n)",
    codeLanguage: "javascript",
    initialInputLabel: "Numeric values",
    initialInputValue: "4, 5, 2, 25, 10, 8",
    explanation: {
      intuition: "For each element, find the first element to its right that is strictly larger. A monotonic stack holds indices of unresolved items.",
      bruteForce: "Dual nested checks for every integer in O(n²)",
      optimalSolution: "Monotonic descending stack. Process right-to-left popping smaller items. Total complexity is reduced to linear.",
    },
    code: `function nextGreater(arr) {
  let res = Array(arr.length).fill(-1);
  let stack = [];
  for (let i = arr.length - 1; i >= 0; i--) {
    while (stack.length > 0 && stack[stack.length - 1] <= arr[i]) {
      stack.pop();
    }
    if (stack.length > 0) {
      res[i] = stack[stack.length - 1];
    }
    stack.push(arr[i]);
  }
  return res;
}`,
  },

  // QUEUE
  {
    id: "queue-basic",
    name: "Queue Operations",
    subtitle: "First-In-First-Out sequential list",
    category: "Queue",
    timeComplexity: "O(1)",
    spaceComplexity: "O(n)",
    codeLanguage: "javascript",
    initialInputLabel: "Commands (enqX, deq)",
    initialInputValue: "enq12, enq5, deq, enq8",
    explanation: {
      intuition: "Sequential element tracking. Enqueue appends to back, dequeue extracts from front.",
      bruteForce: "Perform regular array shifts which take O(n) runtime.",
      optimalSolution: "Double pointer indexing on array bounds keeping enqueues and dequeues at constant O(1) runtime.",
    },
    code: `class Queue {
  constructor() {
    this.items = [];
    this.front = 0;
  }
  enqueue(element) {
    this.items.push(element);
  }
  dequeue() {
    if (this.isEmpty()) return null;
    let val = this.items[this.front];
    this.front++;
    return val;
  }
  isEmpty() {
    return this.items.length - this.front === 0;
  }
}`,
  },
  {
    id: "circular-queue",
    name: "Circular Queue",
    subtitle: "Array-only queue wrapping round the ends",
    category: "Queue",
    timeComplexity: "O(1)",
    spaceComplexity: "O(k)",
    codeLanguage: "javascript",
    initialInputLabel: "Queue Capacity | command stream",
    initialInputValue: "5 | enq10, enq20, deq, enq30",
    explanation: {
      intuition: "Implement a queue using a fixed-size array where the last, final position wraps around back to the starting cell.",
      bruteForce: "Standard arrays extending dynamically.",
      optimalSolution: "Apply modular division tracking front and rear indices: rear = (rear + 1) % size. Absolute memory constraint.",
    },
    code: `class CircularQueue {
  constructor(k) {
    this.size = k;
    this.queue = Array(k).fill(null);
    this.front = -1;
    this.rear = -1;
  }
  enqueue(val) {
    if ((this.rear + 1) % this.size === this.front) return false; // Full
    if (this.front === -1) this.front = 0;
    this.rear = (this.rear + 1) % this.size;
    this.queue[this.rear] = val;
    return true;
  }
  dequeue() {
    if (this.front === -1) return null; // Empty
    let val = this.queue[this.front];
    if (this.front === this.rear) {
      this.front = this.rear = -1;
    } else {
      this.front = (this.front + 1) % this.size;
    }
    return val;
  }
}`,
  },
  {
    id: "priority-queue",
    name: "Priority Queue",
    subtitle: "Accessing elements in weight order",
    category: "Queue",
    timeComplexity: "O(log n)",
    spaceComplexity: "O(n)",
    codeLanguage: "javascript",
    initialInputLabel: "Commands (add val_priority, pop)",
    initialInputValue: "add3_A, add1_B, add5_C, pop",
    explanation: {
      intuition: "A container where elements are queried based on priority. High rank items are dequeued ahead of lower value ranks.",
      bruteForce: "Store items inside a regular array, find min priority elements in O(n) time.",
      optimalSolution: "Store items structured within a Binary Min-Heap to query top and insert elements in O(log n).",
    },
    code: `class PQNode {
  constructor(val, prio) {
    this.value = val;
    this.priority = prio;
  }
}
class PriorityQueue {
  constructor() {
    this.values = [];
  }
  enqueue(val, prio) {
    let node = new PQNode(val, prio);
    this.values.push(node);
    this.bubbleUp();
  }
  bubbleUp() {
    let idx = this.values.length - 1;
    let node = this.values[idx];
    while (idx > 0) {
      let pIdx = Math.floor((idx - 1) / 2);
      let parent = this.values[pIdx];
      if (node.priority >= parent.priority) break;
      this.values[pIdx] = node;
      this.values[idx] = parent;
      idx = pIdx;
    }
  }
}`,
  },

  // HEAP
  {
    id: "heap-insert",
    name: "Heap Insert",
    subtitle: "Complete tree bubble up",
    category: "Heap",
    timeComplexity: "O(log n)",
    spaceComplexity: "O(n)",
    codeLanguage: "javascript",
    initialInputLabel: "Max-Heap nodes comma-separated | item",
    initialInputValue: "50, 30, 40, 10, 20 | 45",
    explanation: {
      intuition: "Inserts a newly added value at the bottom-right leaf position of the binary heap tree. Then, sift/bubble up to satisfy heap invariants.",
      bruteForce: "Sorting absolute array after adding values O(n log n).",
      optimalSolution: "Iterate recursively matching value with parent key: swap elements if target is superior, repeating in max-depth O(log n).",
    },
    code: `function insertMaxHeap(heap, val) {
  heap.push(val);
  let idx = heap.length - 1;
  while (idx > 0) {
    let pIdx = Math.floor((idx - 1) / 2);
    if (heap[idx] <= heap[pIdx]) break;
    let temp = heap[idx];
    heap[idx] = heap[pIdx];
    heap[pIdx] = temp;
    idx = pIdx;
  }
  return heap;
}`,
  },
  {
    id: "heapify",
    name: "Heapify",
    subtitle: "Floyd top-down adjustments",
    category: "Heap",
    timeComplexity: "O(n)",
    spaceComplexity: "O(1)",
    codeLanguage: "javascript",
    initialInputLabel: "Array items to heapify",
    initialInputValue: "12, 11, 13, 5, 6, 7",
    explanation: {
      intuition: "Transform an array of random items directly into a Max-Heap in bottom-up progression.",
      bruteForce: "Successive individual elements insertions taking O(n log n).",
      optimalSolution: "Apply heap filter from first internal parent node (N/2 - 1) down to the root. Cumulative cost is O(n).",
    },
    code: `function minHeapify(arr, n, i) {
  let smallest = i;
  let l = 2 * i + 1;
  let r = 2 * i + 2;
  if (l < n && arr[l] < arr[smallest]) smallest = l;
  if (r < n && arr[r] < arr[smallest]) smallest = r;
  if (smallest !== i) {
    let temp = arr[i];
    arr[i] = arr[smallest];
    arr[smallest] = temp;
    minHeapify(arr, n, smallest);
  }
}`,
  },

  // TREES
  {
    id: "tree-traversal",
    name: "Tree Traversals",
    subtitle: "Pre-order, In-order, Post-order DFS",
    category: "Trees",
    timeComplexity: "O(n)",
    spaceComplexity: "O(h)",
    codeLanguage: "javascript",
    initialInputLabel: "BST nodes",
    initialInputValue: "40, 20, 60, 10, 30, 50, 70",
    explanation: {
      intuition: "Sequentially visit binary tree nodes. PreOrder checks parent-left-right, InOrder checks left-parent-right, PostOrder checks left-right-parent.",
      bruteForce: "Recursive functions without stack considerations.",
      optimalSolution: "Standard linear recursive depth first search (DFS) visiting nodes. In-order BST traversal preserves ordered sequence.",
    },
    code: `function preOrder(node) {
  if (node !== null) {
    console.log(node.val);
    preOrder(node.left);
    preOrder(node.right);
  }
}
function inOrder(node) {
  if (node !== null) {
    inOrder(node.left);
    console.log(node.val);
    inOrder(node.right);
  }
}`,
  },
  {
    id: "bst-insert",
    name: "BST Insert",
    subtitle: "Binary search tree node insertion",
    category: "Trees",
    timeComplexity: "O(log n)",
    spaceComplexity: "O(h)",
    codeLanguage: "javascript",
    initialInputLabel: "Array of insertions",
    initialInputValue: "40, 20, 60, 10, 30, 50, 70",
    explanation: {
      intuition: "Construct sorted hierarchy: left branches holding smaller values, right branches holding larger values.",
      bruteForce: "Sorting values and creating trees from scratch.",
      optimalSolution: "Branch search in log timing: compare value with root, path left if smaller, path right if larger, place on leaf slot.",
    },
    code: `class TreeNode {
  constructor(val) {
    this.value = val;
    this.left = null;
    this.right = null;
  }
}

function insertBST(root, val) {
  if (root === null) return new TreeNode(val);
  if (val < root.value) {
    root.left = insertBST(root.left, val);
  } else {
    root.right = insertBST(root.right, val);
  }
  return root;
}`,
  },
  {
    id: "bst-delete",
    name: "BST Delete",
    subtitle: "Remove element and heal split references",
    category: "Trees",
    timeComplexity: "O(log n)",
    spaceComplexity: "O(h)",
    codeLanguage: "javascript",
    initialInputLabel: "Elements | target node to remove",
    initialInputValue: "40, 20, 60, 10, 30 | 20",
    explanation: {
      intuition: "Delete a node from BST while saving binary sorted properties. Check case: leaf node, single child node, or two children nodes.",
      bruteForce: "Flatten tree, ignore element, re-build all.",
      optimalSolution: "Replace node containing 2 children with its in-order successor (minimum value of right subtree), deleting successor naturally.",
    },
    code: `function findMin(root) {
  while (root.left !== null) root = root.left;
  return root;
}

function removeBST(root, val) {
  if (root === null) return null;
  if (val < root.value) {
    root.left = removeBST(root.left, val);
  } else if (val > root.value) {
    root.right = removeBST(root.right, val);
  } else {
    // 1 or 0 children
    if (root.left === null) return root.right;
    if (root.right === null) return root.left;
    // 2 children
    let successor = findMin(root.right);
    root.value = successor.value;
    root.right = removeBST(root.right, successor.value);
  }
  return root;
}`,
  },
  {
    id: "avl-tree",
    name: "AVL Rotations",
    subtitle: "Self-balancing height BST rotations",
    category: "Trees",
    timeComplexity: "O(log n)",
    spaceComplexity: "O(log n)",
    codeLanguage: "javascript",
    initialInputLabel: "Node elements",
    initialInputValue: "30, 20, 10, 40, 50, 25",
    explanation: {
      intuition: "BST which keeps its height low recursively. Height difference between branches can never exceed 1. Rotates left/right on height violation.",
      bruteForce: "Perform global balance queries on standard binary trees O(n).",
      optimalSolution: "Adjust node balance heights at insertion. Perform single Left, Right or compound Left-Right / Right-Left rotations in O(1) time.",
    },
    code: `function rightRotate(y) {
  let x = y.left;
  let T2 = x.right;
  x.right = y;
  y.left = T2;
  return x;
}

function leftRotate(x) {
  let y = x.right;
  let T2 = y.left;
  y.left = x;
  x.right = T2;
  return y;
}`,
  },
  {
    id: "trie-insert-search",
    name: "Trie Operations",
    subtitle: "Prefix tree operations",
    category: "Trees",
    timeComplexity: "O(L)",
    spaceComplexity: "O(ALPHABET_SIZE * N * L)",
    codeLanguage: "javascript",
    initialInputLabel: "Words list | search target",
    initialInputValue: "cat, car, cap, card | cap",
    explanation: {
      intuition: "A search tree constructed to track characters of strings enabling very fast suffix or prefix search routing.",
      bruteForce: "Maintain words within a list, taking O(N * L) match checks.",
      optimalSolution: "Nodes maintain characters maps. Step from letter to letter down the alphabet tree, searching words in O(word_length) time.",
    },
    code: `class TrieNode {
  constructor() {
    this.children = {};
    this.isEndOfWord = false;
  }
}
class Trie {
  constructor() {
    this.root = new TrieNode();
  }
  insert(word) {
    let curr = this.root;
    for (let char of word) {
      if (!curr.children[char]) {
        curr.children[char] = new TrieNode();
      }
      curr = curr.children[char];
    }
    curr.isEndOfWord = true;
  }
}`,
  },

  // GRAPHS
  {
    id: "bfs",
    name: "Breadth First Search",
    subtitle: "Radial level-order graph exploration",
    category: "Graphs",
    timeComplexity: "O(V + E)",
    spaceComplexity: "O(V)",
    codeLanguage: "javascript",
    initialInputLabel: "Starting vertex ID",
    initialInputValue: "0",
    explanation: {
      intuition: "Explore vertex pathways level-by-level, starting from a source. Visited nodes are saved in a FIFO helper queue.",
      bruteForce: "Backtracking recursion search indices.",
      optimalSolution: "Visit starting node, push to queue, shift node, visit unvisited neighbor, append neighbor to queue.",
    },
    code: `function bfsTraversal(adj, start) {
  let visited = Array(adj.length).fill(false);
  let queue = [];
  visited[start] = true;
  queue.push(start);
  while (queue.length > 0) {
    let u = queue.shift();
    for (let neighbor of adj[u]) {
      if (!visited[neighbor]) {
        visited[neighbor] = true;
        queue.push(neighbor);
      }
    }
  }
}`,
  },
  {
    id: "dfs",
    name: "Depth First Search",
    subtitle: "Deep recursive path search",
    category: "Graphs",
    timeComplexity: "O(V + E)",
    spaceComplexity: "O(V)",
    codeLanguage: "javascript",
    initialInputLabel: "Start vertex",
    initialInputValue: "0",
    explanation: {
      intuition: "In depth first exploration (DFS), dive deep into graph branches before backtracking to examine remaining adjacent branches.",
      bruteForce: "Sequential track scanning lists.",
      optimalSolution: "Track nodes in visited list. Visit node, and recurse deeply into every unvisited neighbor.",
    },
    code: `function dfsUtil(u, adj, visited) {
  visited[u] = true;
  for (let neighbor of adj[u]) {
    if (!visited[neighbor]) {
      dfsUtil(neighbor, adj, visited);
    }
  }
}

function dfs(adj, start) {
  let visited = Array(adj.length).fill(false);
  dfsUtil(start, adj, visited);
}`,
  },
  {
    id: "dijkstra",
    name: "Dijkstra Algorithm",
    subtitle: "Single-source shortest routing path",
    category: "Graphs",
    timeComplexity: "O((V + E) log V)",
    spaceComplexity: "O(V)",
    codeLanguage: "javascript",
    initialInputLabel: "Source vertex",
    initialInputValue: "0",
    explanation: {
      intuition: "Retrieve the shortest possible path between vertices in a weighted graph with non-negative edge costs.",
      bruteForce: "Compare path permutations extensively.",
      optimalSolution: "Examine unvisited node with minimum tentative distance, relax its outgoing weights, and update tentative distances.",
    },
    code: `function dijkstra(graph, src) {
  let dist = Array(graph.length).fill(Infinity);
  let visited = Array(graph.length).fill(false);
  dist[src] = 0;
  for (let count = 0; count < graph.length - 1; count++) {
    let u = minDistance(dist, visited);
    visited[u] = true;
    for (let v = 0; v < graph.length; v++) {
      if (!visited[v] && graph[u][v] !== 0 && dist[u] !== Infinity && dist[u] + graph[u][v] < dist[v]) {
        dist[v] = dist[u] + graph[u][v];
      }
    }
  }
  return dist;
}`,
  },
  {
    id: "bellman-ford",
    name: "Bellman Ford",
    subtitle: "Shortest route with negative weights",
    category: "Graphs",
    timeComplexity: "O(V * E)",
    spaceComplexity: "O(V)",
    codeLanguage: "javascript",
    initialInputLabel: "Source vertex",
    initialInputValue: "0",
    explanation: {
      intuition: "Solve shortest pathways even if edge weights are negative. Detects negative cycles which prevent definitive solutions.",
      bruteForce: "Apply standard positive routines like Dijkstra which fail to resolve negative weights.",
      optimalSolution: "Repeatedly relax all edges V-1 times. A V-th iteration checking further distance contraction uncovers negative cycles.",
    },
    code: `function bellmanFord(edges, V, src) {
  let dist = Array(V).fill(Infinity);
  dist[src] = 0;
  for (let i = 1; i < V; i++) {
    for (let [u, v, w] of edges) {
      if (dist[u] !== Infinity && dist[u] + w < dist[v]) {
        dist[v] = dist[u] + w;
      }
    }
  }
  // Check for negative cycles
  for (let [u, v, w] of edges) {
    if (dist[u] !== Infinity && dist[u] + w < dist[v]) {
      console.log("Graph contains negative cycle");
    }
  }
  return dist;
}`,
  },
  {
    id: "kruskal",
    name: "Kruskal MST",
    subtitle: "Disjoint-Set based Minimum Spanning Tree",
    category: "Graphs",
    timeComplexity: "O(E log E)",
    spaceComplexity: "O(V)",
    codeLanguage: "javascript",
    initialInputLabel: "Edges weighted",
    initialInputValue: "A-B-1, B-C-3, A-C-4",
    explanation: {
      intuition: "Construct a Minimum Spanning Tree in weighted graphs by selecting the absolute smallest edges that do not introduce cycles.",
      bruteForce: "Compare spanning sub-graphs permutations.",
      optimalSolution: "Sort edges ascending by weight, step through sorted list, merge node regions using Union Find, omitting loop-forming links.",
    },
    code: `function kruskalMST(edges, V) {
  edges.sort((a, b) => a.weight - b.weight);
  let parent = Array(V).fill(-1);
  let mst = [];
  function find(i) {
    if (parent[i] === -1) return i;
    return find(parent[i]);
  }
  function union(i, j) {
    let rootI = find(i);
    let rootJ = find(j);
    if (rootI !== rootJ) {
      parent[rootI] = rootJ;
      return true;
    }
    return false;
  }
  for (let edge of edges) {
    if (union(edge.src, edge.dest)) {
      mst.push(edge);
    }
  }
  return mst;
}`,
  },
  {
    id: "prim",
    name: "Prim MST",
    subtitle: "Greedy cut MST algorithm",
    category: "Graphs",
    timeComplexity: "O((V + E) log V)",
    spaceComplexity: "O(V)",
    codeLanguage: "javascript",
    initialInputLabel: "Start node index",
    initialInputValue: "0",
    explanation: {
      intuition: "Start spanning from an arbitrary node, then grow the tree greedily by choosing the cheapest edge connecting the tree to an unvisited node.",
      bruteForce: "Scan all edges sequentially to find matching bounds in quadratic time.",
      optimalSolution: "Track lowest edge-weight mapping per vertex. Sift vertices using Min Binary Priority Queue.",
    },
    code: `function primMST(graph, V) {
  let parent = Array(V).fill(-1);
  let key = Array(V).fill(Infinity);
  let mstSet = Array(V).fill(false);
  key[0] = 0;
  for (let count = 0; count < V - 1; count++) {
    let u = minKey(key, mstSet, V);
    mstSet[u] = true;
    for (let v = 0; v < V; v++) {
      if (graph[u][v] && !mstSet[v] && graph[u][v] < key[v]) {
        parent[v] = u;
        key[v] = graph[u][v];
      }
    }
  }
  return parent;
}`,
  },
  {
    id: "topological-sort",
    name: "Topological Sort",
    subtitle: "Linear ordering for Directed Acyclic Graphs",
    category: "Graphs",
    timeComplexity: "O(V + E)",
    spaceComplexity: "O(V)",
    codeLanguage: "javascript",
    initialInputLabel: "DAG dependencies (u->v, ...)",
    initialInputValue: "5->2, 5->0, 4->0, 4->1, 2->3, 3->1",
    explanation: {
      intuition: "Compute linear execution dependencies sequence inside Directed Acyclic Graphs (DAG) such that starting tasks predate dependents.",
      bruteForce: "Iterative search scanning node indices.",
      optimalSolution: "Apply Post-order DFS. After recursing into a node's dependents, push active node into a LIFO trace stack.",
    },
    code: `function topoSortUtil(v, adj, visited, stack) {
  visited[v] = true;
  for (let neighbor of adj[v]) {
    if (!visited[neighbor]) {
      topoSortUtil(neighbor, adj, visited, stack);
    }
  }
  stack.push(v);
}

function topologicalSort(adj, V) {
  let visited = Array(V).fill(false);
  let stack = [];
  for (let i = 0; i < V; i++) {
    if (!visited[i]) {
      topoSortUtil(i, adj, visited, stack);
    }
  }
  return stack.reverse();
}`,
  },
  {
    id: "union-find",
    name: "Union Find",
    subtitle: "Disjoint Sets Union and Find structure",
    category: "Graphs",
    timeComplexity: "O(α(n))",
    spaceComplexity: "O(n)",
    codeLanguage: "javascript",
    initialInputLabel: "Number of elements",
    initialInputValue: "10",
    explanation: {
      intuition: "Identify disjoint subsets and merge set domains. Quick check whether two elements are inside the same partition cluster.",
      bruteForce: "Perform comprehensive traversing checks on standard trees.",
      optimalSolution: "Disjoint Sets with Path Compression and Union by Rank which collapses tree pointers, reducing operations to near-constant O(α(N)).",
    },
    code: `class UnionFind {
  constructor(size) {
    this.parent = Array(size).fill(0).map((_, i) => i);
    this.rank = Array(size).fill(0);
  }
  find(i) {
    if (this.parent[i] === i) return i;
    this.parent[i] = this.find(this.parent[i]); // Path compression
    return this.parent[i];
  }
  union(i, j) {
    let rootI = this.find(i);
    let rootJ = this.find(j);
    if (rootI !== rootJ) {
      if (this.rank[rootI] < this.rank[rootJ]) this.parent[rootI] = rootJ;
      else if (this.rank[rootI] > this.rank[rootJ]) this.parent[rootJ] = rootI;
      else {
        this.parent[rootJ] = rootI;
        this.rank[rootI]++;
      }
    }
  }
}`,
  },

  // DYNAMIC PROGRAMMING
  {
    id: "fibonacci-dp",
    name: "DP Fibonacci",
    subtitle: "Memoization & Tabulation optimization",
    category: "Dynamic Programming",
    timeComplexity: "O(n)",
    spaceComplexity: "O(n) / O(1)",
    codeLanguage: "javascript",
    initialInputLabel: "Fibonacci N-th item",
    initialInputValue: "10",
    explanation: {
      intuition: "Dramatically speed up Fibonacci recursion from exponential O(2ⁿ) to linear O(n) by caching results of overlapping subproblems.",
      bruteForce: "Double branch recursions making identical duplicate queries repeatedly.",
      optimalSolution: "Apply local array cache (memoization), or iterate sequentially bottom-up (tabulation) using only two rolling state numbers.",
    },
    code: `function fibTabulation(n) {
  if (n <= 1) return n;
  let dp = Array(n + 1).fill(0);
  dp[0] = 0;
  dp[1] = 1;
  for (let i = 2; i <= n; i++) {
    dp[i] = dp[i - 1] + dp[i - 2];
  }
  return dp[n];
}`,
  },
  {
    id: "knapsack",
    name: "0/1 Knapsack",
    subtitle: "Maximize value in limited capacity weight bin",
    category: "Dynamic Programming",
    timeComplexity: "O(N * W)",
    spaceComplexity: "O(N * W)",
    codeLanguage: "javascript",
    initialInputLabel: "Weights | Values | capacity (w | v | cap)",
    initialInputValue: "1, 2, 3 | 10, 15, 40 | 5",
    explanation: {
      intuition: "Decide whether to include or exclude elements into a capacity bucket to construct optimal profit indices.",
      bruteForce: "Examine item choices recursively in subset exponential O(2ⁿ).",
      optimalSolution: "Build tabulated matrix of size N x W. Tabulate results using values from previous item calculations.",
    },
    code: `function knapsack(weights, values, capacity) {
  let N = weights.length;
  let dp = Array(N + 1).fill(0).map(() => Array(capacity + 1).fill(0));
  for (let i = 1; i <= N; i++) {
    for (let w = 1; w <= capacity; w++) {
      if (weights[i-1] <= w) {
        dp[i][w] = Math.max(dp[i-1][w], values[i-1] + dp[i-1][w - weights[i-1]]);
      } else {
        dp[i][w] = dp[i-1][w];
      }
    }
  }
  return dp[N][capacity];
}`,
  },
  {
    id: "coin-change",
    name: "Coin Change",
    subtitle: "Minimum coins count combinations search",
    category: "Dynamic Programming",
    timeComplexity: "O(n * amount)",
    spaceComplexity: "O(amount)",
    codeLanguage: "javascript",
    initialInputLabel: "Coins list | target amount (coins | amount)",
    initialInputValue: "1, 2, 5 | 11",
    explanation: {
      intuition: "Given list of currency coin values and target sum, calculate the fewest number of coins required to build target amount.",
      bruteForce: "Check recursive permutations of all coins, taking O(coins_length^target_amount).",
      optimalSolution: "Tabulate optimal combinations: dp[a] = min(dp[a], dp[a - coin] + 1) for every increment amount 'a'. Runs in O(N * amount) time.",
    },
    code: `function coinChange(coins, amount) {
  let dp = Array(amount + 1).fill(Infinity);
  dp[0] = 0;
  for (let i = 1; i <= amount; i++) {
    for (let coin of coins) {
      if (coin <= i) {
        dp[i] = Math.min(dp[i], dp[i - coin] + 1);
      }
    }
  }
  return dp[amount] === Infinity ? -1 : dp[amount];
}`,
  },
  {
    id: "lis",
    name: "Longest Increasing Subsequence",
    subtitle: "Optimal sorted sub-sequence tracker",
    category: "Dynamic Programming",
    timeComplexity: "O(n²)",
    spaceComplexity: "O(n)",
    codeLanguage: "javascript",
    initialInputLabel: "Array items (comma-separated)",
    initialInputValue: "10, 22, 9, 33, 21, 50, 41, 60, 80",
    explanation: {
      intuition: "Identify length of the longest subsequence within an array such that all items are sorted in strictly ascending sequence.",
      bruteForce: "Check subset combinations O(2ⁿ).",
      optimalSolution: "Maintain dp[i] array specifying longest LIS finishing at index 'i'. Compare with predecessors sequentially.",
    },
    code: `function lis(arr) {
  let n = arr.length;
  let dp = Array(n).fill(1);
  for (let i = 1; i < n; i++) {
    for (let j = 0; j < i; j++) {
      if (arr[i] > arr[j] && dp[i] < dp[j] + 1) {
        dp[i] = dp[j] + 1;
      }
    }
  }
  return Math.max(...dp);
}`,
  },
  {
    id: "lcs",
    name: "Longest Common Subsequence",
    subtitle: "Symmetric strings character matches matching",
    category: "Dynamic Programming",
    timeComplexity: "O(m * n)",
    spaceComplexity: "O(m * n)",
    codeLanguage: "javascript",
    initialInputLabel: "Strings A & B (stringA | stringB)",
    initialInputValue: "abcde | ace",
    explanation: {
      intuition: "Find the longest subsequence shared between two text strings preserving original sequence orders.",
      bruteForce: "Extensive brute force permutations.",
      optimalSolution: "Build m x n tabulated grid. If letters match: dp[i][j] = dp[i-1][j-1] + 1, else pick max(dp[i-1][j], dp[i][j-1]).",
    },
    code: `function lcs(str1, str2) {
  let m = str1.length;
  let n = str2.length;
  let dp = Array(m + 1).fill(0).map(() => Array(n + 1).fill(0));
  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      if (str1[i-1] === str2[j-1]) {
        dp[i][j] = dp[i-1][j-1] + 1;
      } else {
        dp[i][j] = Math.max(dp[i-1][j], dp[i][j-1]);
      }
    }
  }
  return dp[m][n];
}`,
  },
];
