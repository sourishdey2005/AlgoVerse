import { AlgorithmStep } from "../types";

export function generateSteps(algorithmId: string, inputString: string): AlgorithmStep[] {
  const steps: AlgorithmStep[] = [];
  let stepCounter = 0;

  const addStep = (
    desc: string,
    vars: Record<string, any>,
    lines: number[],
    stateData: any
  ) => {
    steps.push({
      stepNumber: ++stepCounter,
      description: desc,
      variables: { ...vars },
      highlightedLines: lines,
      state: JSON.parse(JSON.stringify(stateData)),
    });
  };

  // 1. BUBBLE SORT GENERATOR
  if (algorithmId === "bubble-sort") {
    let arr = inputString
      .split(",")
      .map((x) => parseInt(x.trim(), 10))
      .filter((x) => !isNaN(x));
    if (arr.length === 0) arr = [25, 8, 48, 12, 33, 5, 20];

    const n = arr.length;
    let tempArr = [...arr];

    // Initial state
    addStep(
      "Initialize Bubble Sort. Starting with the unsorted input array.",
      { i: 0, j: 0, swapped: "false" },
      [1],
      { arr: tempArr, activeIndices: [], swapIndices: [], sortedIndices: [] }
    );

    let swappedAny = false;
    for (let i = 0; i < n; i++) {
      let swapped = false;
      addStep(
        `Start outer pass $i = ${i}$. We'll bubble up the largest unsorted element.`,
        { i, j: 0, swapped: "false" },
        [3, 4],
        { arr: [...tempArr], activeIndices: [], swapIndices: [], sortedIndices: Array.from({ length: i }, (_, k) => n - 1 - k) }
      );

      for (let j = 0; j < n - i - 1; j++) {
        // Compare arr[j] and arr[j+1]
        addStep(
          `Compare elements at indices $j = ${j}$ (${tempArr[j]}) and $j+1 = ${j + 1}$ (${tempArr[j + 1]}).`,
          { i, j, swapped: swapped ? "true" : "false" },
          [5, 6],
          {
            arr: [...tempArr],
            activeIndices: [j, j + 1],
            swapIndices: [],
            sortedIndices: Array.from({ length: i }, (_, k) => n - 1 - k),
          }
        );

        if (tempArr[j] > tempArr[j + 1]) {
          // Swap
          const leftVal = tempArr[j];
          const rightVal = tempArr[j + 1];
          tempArr[j] = rightVal;
          tempArr[j + 1] = leftVal;
          swapped = true;
          swappedAny = true;

          addStep(
            `Since ${leftVal} > ${rightVal}, we swap them.`,
            { i, j, swapped: "true" },
            [7, 8, 9, 10, 11],
            {
              arr: [...tempArr],
              activeIndices: [],
              swapIndices: [j, j + 1],
              sortedIndices: Array.from({ length: i }, (_, k) => n - 1 - k),
            }
          );
        } else {
          addStep(
            `Since ${tempArr[j]} <= ${tempArr[j + 1]}, no swap is necessary.`,
            { i, j, swapped: swapped ? "true" : "false" },
            [5, 6],
            {
              arr: [...tempArr],
              activeIndices: [j, j + 1],
              swapIndices: [],
              sortedIndices: Array.from({ length: i }, (_, k) => n - 1 - k),
            }
          );
        }
      }

      const bubbleSorted = Array.from({ length: i + 1 }, (_, k) => n - 1 - k);
      if (!swapped) {
        addStep(
          "No swaps were performed during this pass. The array is fully sorted! Breaking early.",
          { i, j: 0, swapped: "false" },
          [14, 15],
          {
            arr: [...tempArr],
            activeIndices: [],
            swapIndices: [],
            sortedIndices: Array.from({ length: n }, (_, k) => k),
          }
        );
        break;
      }

      addStep(
        `Finished pass $i = ${i}$. Element at index ${n - i - 1} (${tempArr[n - i - 1]}) is placed in its final sorted position.`,
        { i, j: n - i - 1, swapped: "true" },
        [13],
        {
          arr: [...tempArr],
          activeIndices: [],
          swapIndices: [],
          sortedIndices: bubbleSorted,
        }
      );
    }

    addStep(
      "Bubble Sort complete! The array is fully sorted.",
      { i: n, j: 0, swapped: swappedAny ? "true" : "false" },
      [17],
      {
        arr: [...tempArr],
        activeIndices: [],
        swapIndices: [],
        sortedIndices: Array.from({ length: n }, (_, k) => k),
      }
    );
  }

  // 2. QUICK SORT GENERATOR (Hoare Partition Simulation)
  else if (algorithmId === "quick-sort") {
    let arr = inputString
      .split(",")
      .map((x) => parseInt(x.trim(), 10))
      .filter((x) => !isNaN(x));
    if (arr.length === 0) arr = [15, 28, 42, 21, 56, 8, 33, 12];

    const tempArr = [...arr];
    const n = tempArr.length;

    addStep(
      "Initialize Quick Sort around first element as pivot.",
      { low: 0, high: n - 1, pivot: "N/A" },
      [12],
      { arr: [...tempArr], low: 0, high: n - 1, i: -1, j: -1, pivotIndex: -1 }
    );

    function doQuickSort(low: number, high: number) {
      if (low < high) {
        // Simple partition simulation inline
        const pivot = tempArr[low];
        const pivotIdx = low;
        let i = low - 1;
        let j = high + 1;

        addStep(
          `Partitioning range [${low}, ${high}]. Selected pivot: ${pivot} (at index ${pivotIdx}).`,
          { low, high, pivot, i: "low - 1", j: "high + 1" },
          [1, 2, 3, 4],
          { arr: [...tempArr], low, high, i, j, pivotIndex: pivotIdx }
        );

        while (true) {
          // Increment i
          do {
            i++;
          } while (tempArr[i] < pivot);

          addStep(
            `Moving pointer i from left. Stopped at index i = ${i} (value ${tempArr[i]}), because ${tempArr[i]} >= pivot (${pivot}).`,
            { low, high, pivot, i, j },
            [6],
            { arr: [...tempArr], low, high, i, j, pivotIndex: pivotIdx }
          );

          // Decrement j
          do {
            j--;
          } while (tempArr[j] > pivot);

          addStep(
            `Moving pointer j from right. Stopped at index j = ${j} (value ${tempArr[j]}), because ${tempArr[j]} <= pivot (${pivot}).`,
            { low, high, pivot, i, j },
            [7],
            { arr: [...tempArr], low, high, i, j, pivotIndex: pivotIdx }
          );

          if (i >= j) {
            addStep(
              `Pointer i (${i}) crossed pointer j (${j}). Partition iteration terminates. Return partition index j = ${j}.`,
              { low, high, pivot, i, j },
              [8],
              { arr: [...tempArr], low, high, i, j, pivotIndex: pivotIdx }
            );
            break;
          }

          // Swap arr[i], arr[j]
          const t = tempArr[i];
          tempArr[i] = tempArr[j];
          tempArr[j] = t;

          addStep(
            `Violations found. Swapping index i = ${i} (${tempArr[j]}) with index j = ${j} (${tempArr[i]}).`,
            { low, high, pivot, i, j },
            [9],
            { arr: [...tempArr], low, high, i, j, pivotIndex: i === pivotIdx ? j : (j === pivotIdx ? i : pivotIdx) }
          );
        }

        const p = j;
        addStep(
          `Subdividing: Recurse on left partition [${low}, ${p}] and right partition [${p + 1}, ${high}].`,
          { low, high, p },
          [13, 14, 15],
          { arr: [...tempArr], low, high, p, i, j }
        );

        doQuickSort(low, p);
        doQuickSort(p + 1, high);
      }
    }

    doQuickSort(0, n - 1);

    addStep(
      "Quick Sort complete! Array fully sorted in O(n log n).",
      { low: 0, high: n - 1, pivot: "Done" },
      [16],
      { arr: [...tempArr], low: 0, high: n - 1, i: -1, j: -1, pivotIndex: -1 }
    );
  }

  // 3. BINARY SEARCH GENERATOR
  else if (algorithmId === "binary-search") {
    const parts = inputString.split("|");
    let arr = parts[0]
      .split(",")
      .map((x) => parseInt(x.trim(), 10))
      .filter((x) => !isNaN(x))
      .sort((a, b) => a - b); // Sorting for guaranteed binary search validity
    let target = parts[1] ? parseInt(parts[1].trim(), 10) : 50;

    if (arr.length === 0) {
      arr = [5, 12, 18, 22, 35, 47, 50, 63, 72, 85];
      target = 50;
    }

    let low = 0;
    let high = arr.length - 1;

    addStep(
      `Initialize Binary Search. Target we are searching for: ${target}. Outer boundary [0, ${high}].`,
      { low, high, mid: "N/A", target },
      [1, 2, 3],
      { arr, low, high, mid: -1, found: false }
    );

    let found = false;
    let foundIdx = -1;

    while (low <= high) {
      const mid = Math.floor((low + high) / 2);

      addStep(
        `Calculate midpoint index mid = Math.floor((${low} + ${high}) / 2) = ${mid} (value: ${arr[mid]}).`,
        { low, high, mid, target, currentValue: arr[mid] },
        [5],
        { arr, low, high, mid, found: false }
      );

      if (arr[mid] === target) {
        found = true;
        foundIdx = mid;
        addStep(
          `Target matched! Elements equal: arr[mid] === target (${arr[mid]} === ${target}). Returning mid = ${mid}.`,
          { low, high, mid, target, status: "Found" },
          [6, 7],
          { arr, low, high, mid, found: true, foundIndex: mid }
        );
        break;
      } else if (arr[mid] < target) {
        const oldLow = low;
        low = mid + 1;
        addStep(
          `Since current element (${arr[mid]}) is smaller than target (${target}), target must be in the right half. Shift low = mid + 1 = ${low}.`,
          { low, high, mid, target, direction: "Shift Right" },
          [8, 9],
          { arr, low, high, mid, found: false }
        );
      } else {
        const oldHigh = high;
        high = mid - 1;
        addStep(
          `Since current element (${arr[mid]}) is larger than target (${target}), target must be in the left half. Shift high = mid - 1 = ${high}.`,
          { low, high, mid, target, direction: "Shift Left" },
          [10, 11],
          { arr, low, high, mid, found: false }
        );
      }
    }

    if (!found) {
      addStep(
        `Subspace exhausted (low > high). The element ${target} does not exist in the array. Returning -1.`,
        { low, high, target, status: "Not Found" },
        [14],
        { arr, low, high, mid: -1, found: false, foundIndex: -1 }
      );
    }
  }

  // 4. KADANE'S ALGORITHM GENERATOR
  else if (algorithmId === "kadane") {
    let arr = inputString
      .split(",")
      .map((x) => parseInt(x.trim(), 10))
      .filter((x) => !isNaN(x));
    if (arr.length === 0) arr = [-2, 1, -3, 4, -1, 2, 1, -5, 4];

    let maxSoFar = arr[0];
    let maxEndingHere = arr[0];
    let start = 0,
      end = 0,
      tempStart = 0;

    addStep(
      `Initialize Kadane's Sorter. Set max_so_far = max_ending_here = ${arr[0]} (index 0).`,
      { i: 0, currentVal: arr[0], maxEndingHere, maxSoFar, start, end },
      [1, 2, 3],
      { arr, i: 0, maxEndingHere, maxSoFar, range: [0, 0] }
    );

    for (let i = 1; i < arr.length; i++) {
      const added = maxEndingHere + arr[i];
      if (arr[i] > added) {
        maxEndingHere = arr[i];
        tempStart = i;
        addStep(
          `At index ${i} (${arr[i]}), starting a new subarray is better than extending the previous (value: ${arr[i]} > ${added}). Set max_ending_here = ${maxEndingHere}.`,
          { i, currentVal: arr[i], maxEndingHere, maxSoFar, tempStart },
          [5, 6, 7, 8],
          { arr, i, maxEndingHere, maxSoFar, tempRange: [tempStart, i], range: [start, end] }
        );
      } else {
        maxEndingHere = added;
        addStep(
          `At index ${i} (${arr[i]}), we extend the subarray. Set max_ending_here = max_ending_here + current = ${maxEndingHere}.`,
          { i, currentVal: arr[i], maxEndingHere, maxSoFar },
          [5, 9, 10],
          { arr, i, maxEndingHere, maxSoFar, tempRange: [tempStart, i], range: [start, end] }
        );
      }

      if (maxEndingHere > maxSoFar) {
        maxSoFar = maxEndingHere;
        start = tempStart;
        end = i;
        addStep(
          `New maximum sum found! max_ending_here (${maxEndingHere}) exceeds max_so_far (${maxSoFar}). Update max_so_far and set optimal range = [${start}, ${end}].`,
          { i, currentVal: arr[i], maxEndingHere, maxSoFar, start, end },
          [12, 13, 14, 15, 16],
          { arr, i, maxEndingHere, maxSoFar, tempRange: [tempStart, i], range: [start, end] }
        );
      } else {
        addStep(
          `max_ending_here (${maxEndingHere}) does not exceed max_so_far (${maxSoFar}). Keep max_so_far unchanged.`,
          { i, currentVal: arr[i], maxEndingHere, maxSoFar, start, end },
          [12],
          { arr, i, maxEndingHere, maxSoFar, tempRange: [tempStart, i], range: [start, end] }
        );
      }
    }

    addStep(
      `Kadane's simulation complete! The maximum contiguous subarray sum is ${maxSoFar} (over range [${start}, ${end}]).`,
      { maxSoFar, start, end },
      [18],
      { arr, i: arr.length, maxEndingHere, maxSoFar, range: [start, end], final: true }
    );
  }

  // 5. FIXED SIZE SLIDING WINDOW MAXIMUM
  else if (algorithmId === "sliding-window-max") {
    const parts = inputString.split("|");
    let arr = parts[0]
      .split(",")
      .map((x) => parseInt(x.trim(), 10))
      .filter((x) => !isNaN(x));
    let k = parts[1] ? parseInt(parts[1].trim(), 10) : 3;

    if (arr.length === 0) {
      arr = [2, 1, 5, 1, 3, 2, 5, 8];
      k = 3;
    }

    let windowSum = 0;
    let maxSum = 0;
    let startIdx = 0;

    // First window
    for (let i = 0; i < k; i++) {
      windowSum += arr[i];
    }
    maxSum = windowSum;

    addStep(
      `Initialize Fixed Sliding Window. Calculate sum of the first window of size K = ${k}: ${arr.slice(0, k).join(" + ")} = ${windowSum}. Set maxSum = ${maxSum}.`,
      { left: 0, right: k - 1, windowSum, maxSum },
      [1, 2, 3, 4, 5, 6],
      { arr, left: 0, right: k - 1, maxSum, windowSum, activeSumIndices: Array.from({ length: k }, (_, i) => i) }
    );

    for (let i = k; i < arr.length; i++) {
      const enter = arr[i];
      const leave = arr[i - k];
      const nextSum = windowSum + enter - leave;

      addStep(
        `Slide window right. Add entering element index ${i} (${enter}) and subtract leaving element index ${i - k} (${leave}). New windowSum = ${windowSum} + ${enter} - ${leave} = ${nextSum}.`,
        { left: i - k + 1, right: i, windowSum: nextSum, maxSum, enter, leave },
        [8, 9, 10],
        {
          arr,
          left: i - k + 1,
          right: i,
          maxSum,
          windowSum: nextSum,
          activeSumIndices: Array.from({ length: k }, (_, j) => i - k + 1 + j),
          leavingIndex: i - k,
          enteringIndex: i,
        }
      );

      windowSum = nextSum;

      if (windowSum > maxSum) {
        maxSum = windowSum;
        startIdx = i - k + 1;
        addStep(
          `New maximum sliding window sum found! windowSum (${windowSum}) > maxSum. Update maxSum = ${maxSum} (starting at index ${startIdx}).`,
          { left: startIdx, right: i, windowSum, maxSum },
          [11, 12, 13, 14],
          { arr, left: startIdx, right: i, maxSum, windowSum, activeSumIndices: Array.from({ length: k }, (_, j) => startIdx + j) }
        );
      } else {
        addStep(
          `windowSum (${windowSum}) <= maxSum (${maxSum}). Keep maxSum unchanged.`,
          { left: i - k + 1, right: i, windowSum, maxSum },
          [11],
          { arr, left: i - k + 1, right: i, maxSum, windowSum, activeSumIndices: Array.from({ length: k }, (_, j) => i - k + 1 + j) }
        );
      }
    }

    addStep(
      `Sliding Window calculation complete! The maximum contiguous sum of size K = ${k} is ${maxSum} (at range [${startIdx}, ${startIdx + k - 1}]).`,
      { maxSum, startIdx, k },
      [17],
      { arr, left: startIdx, right: startIdx + k - 1, maxSum, windowSum: maxSum, final: true }
    );
  }

  // 6. LINKED LIST REVERSAL GENERATOR
  else if (algorithmId === "linked-list-ops") {
    let arr = inputString
      .split(",")
      .map((x) => parseInt(x.trim(), 10))
      .filter((x) => !isNaN(x));
    if (arr.length === 0) arr = [10, 20, 30, 40, 50];

    // Build representation of linked list
    const nodes = arr.map((val, idx) => ({
      id: `node-${idx}`,
      value: val,
      nextId: idx < arr.length - 1 ? `node-${idx + 1}` : null,
      tempNextId: idx < arr.length - 1 ? `node-${idx + 1}` : null, // tracking modified arrows
    }));

    addStep(
      "Initialize Linked List. Setting pointers prev = null, current = head (node-0).",
      { prev: "null", current: "node-0 (val: " + arr[0] + ")", next: "null" },
      [1, 2, 3, 4],
      { nodes, prevId: null, currentId: "node-0", nextId: null }
    );

    let prev: string | null = null;
    let curr: string | null = "node-0";
    let next: string | null = null;

    let loopSafety = 0;
    while (curr !== null && loopSafety++ < 20) {
      const currIdx = parseInt(curr.replace("node-", ""), 10);
      const nextNode = nodes[currIdx].tempNextId;
      next = nextNode;

      addStep(
        `Inside loop. Save reference of the next node: next = current.next = ${next ? `node-${next.replace("node-", "")}` : "null"}.`,
        { prev: prev ? prev : "null", current: curr, next: next ? next : "null" },
        [6],
        { nodes, prevId: prev, currentId: curr, nextId: next }
      );

      // Re-point arrow
      nodes[currIdx].tempNextId = prev;

      addStep(
        `Reverse connection: Re-point active current node's arrow to link to prev, current.next = prev (${prev ? `node-${prev.replace("node-", "")}` : "null"}).`,
        { prev: prev ? prev : "null", current: curr, next: next ? next : "null" },
        [7],
        { nodes, prevId: prev, currentId: curr, nextId: next }
      );

      // Shifting pointers forward
      prev = curr;
      curr = next;

      addStep(
        `Advance pointers: Shift prev = current (${prev}), current = next (${curr ? curr : "null"}).`,
        { prev, current: curr ? curr : "null", next: next ? next : "null" },
        [8, 9, 10],
        { nodes, prevId: prev, currentId: curr, nextId: next }
      );
    }

    addStep(
      `Reversal complete! The list is fully inverted. Return prev (${prev}) as the new head of the linked list.`,
      { head: prev },
      [12],
      { nodes, prevId: prev, currentId: null, nextId: null, final: true }
    );
  }

  // 7. STACK IMPLEMENTATION: VALID PARENTHESES
  else if (algorithmId === "stack-valid-parentheses") {
    let str = inputString.trim();
    if (!str) str = "({[]})()[]";

    const characters = str.split("");
    const stack: string[] = [];
    const map: Record<string, string> = { ")": "(", "}": "{", "]": "[" };

    addStep(
      `Initialize parsing for string "${str}". Initialize empty LIFO stack.`,
      { index: 0, char: "N/A", stack: "[]" },
      [1, 2, 3, 4, 5],
      { chars: characters, activeCharIndex: -1, stack: [], valid: true }
    );

    let valid = true;
    for (let i = 0; i < characters.length; i++) {
      const char = characters[i];

      addStep(
        `Select active character: char = "${char}" at index ${i}.`,
        { index: i, char, stack: JSON.stringify(stack) },
        [6, 7],
        { chars: characters, activeCharIndex: i, stack: [...stack], valid }
      );

      if (char === "(" || char === "{" || char === "[") {
        stack.push(char);
        addStep(
          `Found an opening bracket "${char}". Push it onto the stack.`,
          { index: i, char, stack: JSON.stringify(stack) },
          [8, 9],
          { chars: characters, activeCharIndex: i, stack: [...stack], valid }
        );
      } else if (map[char]) {
        const topOfStack = stack[stack.length - 1];
        const matchingOpener = map[char];

        if (topOfStack === matchingOpener) {
          const popped = stack.pop();
          addStep(
            `Found closing bracket "${char}". It matches opener "${topOfStack}" on top of stack. Pop "${popped}" from stack.`,
            { index: i, char, popped, stack: JSON.stringify(stack) },
            [10, 11, 12],
            { chars: characters, activeCharIndex: i, stack: [...stack], valid }
          );
        } else {
          valid = false;
          addStep(
            `Error: Closing Bracket mismatch! Undergoing validation: "${char}" requires matching open "${matchingOpener}", but top of stack is "${topOfStack ? topOfStack : "empty"}".`,
            { index: i, char, top: topOfStack ? topOfStack : "null", expected: matchingOpener },
            [11, 12],
            { chars: characters, activeCharIndex: i, stack: [...stack], valid: false }
          );
          break;
        }
      }
    }

    if (valid) {
      const isEmpty = stack.length === 0;
      if (isEmpty) {
        addStep(
          "String matches closed layout perfectly. Stack is empty! Returning true.",
          { stackEmpty: "true", result: "valid" },
          [15],
          { chars: characters, activeCharIndex: characters.length, stack: [], valid: true, complete: true }
        );
      } else {
        addStep(
          `Input scanning complete, but opening brackets remain outstanding in stack: [${stack.join(", ")}]. String is invalid! Returning false.`,
          { stackEmpty: "false", result: "invalid" },
          [15],
          { chars: characters, activeCharIndex: characters.length, stack: [...stack], valid: false, complete: true }
        );
      }
    } else {
      addStep(
        "String is invalid due to premature mismatch! Returning false.",
        { result: "invalid" },
        [15],
        { chars: characters, activeCharIndex: characters.length, stack: [...stack], valid: false, complete: true }
      );
    }
  }

  // 8. BINARY SEARCH TREE INSERTION
  else if (algorithmId === "binary-search-tree") {
    let arr = inputString
      .split(",")
      .map((x) => parseInt(x.trim(), 10))
      .filter((x) => !isNaN(x));
    if (arr.length === 0) arr = [40, 20, 60, 10, 30, 50, 70];

    interface BSTNode {
      value: number;
      left: BSTNode | null;
      right: BSTNode | null;
      id: string;
      x?: number;
      y?: number;
    }

    let root: BSTNode | null = null;
    let nodeCount = 0;

    // Helper to calculate placements
    function treeToState(node: BSTNode | null, x = 50, y = 15, scale = 25): any {
      if (!node) return null;
      return {
        id: node.id,
        value: node.value,
        x,
        y,
        left: treeToState(node.left, x - scale, y + 16, scale * 0.5),
        right: treeToState(node.right, x + scale, y + 16, scale * 0.5),
      };
    }

    addStep(
      "Initialize Binary Search Tree. Ready to insert elements one-by-one: " + arr.join(", "),
      { Inserting: arr[0], items: arr.length },
      [1],
      { root: null, inserting: null, active: null }
    );

    for (let i = 0; i < arr.length; i++) {
      const val = arr[i];
      const newNode: BSTNode = { value: val, left: null, right: null, id: `tree-${nodeCount++}` };

      if (!root) {
        root = newNode;
        addStep(
          `BST is empty. Inserting first element ${val} directly at the root of the tree.`,
          { currentVal: val, parent: "null", position: "root" },
          [9, 10],
          { root: treeToState(root), inserting: val, active: newNode.id }
        );
      } else {
        let curr = root;
        let parent: BSTNode | null = null;
        let direction = "";

        addStep(
          `Prepare to insert value ${val}. We start traversal recursion from the root node (${root.value}).`,
          {Inserting: val, traversing: curr.value},
          [10],
          { root: treeToState(root), inserting: val, active: curr.id }
        );

        let safety = 0;
        while (curr && safety++ < 10) {
          parent = curr;
          addStep(
            `Comparing values: is ${val} < ${curr.value}?`,
            { inserting: val, active: curr.value },
            [11],
            { root: treeToState(root), inserting: val, active: curr.id }
          );

          if (val < curr.value) {
            direction = "left";
            if (curr.left === null) {
              curr.left = newNode;
              addStep(
                `Value ${val} is less than ${curr.value}, and left child is empty. Insert ${val} as left child of ${curr.value}.`,
                { inserting: val, parent: curr.value, position: "left child" },
                [11, 12],
                { root: treeToState(root), inserting: val, active: newNode.id }
              );
              break;
            } else {
              curr = curr.left;
              addStep(
                `Value ${val} is less than parent ${parent.value}. Traversing to left child (${curr.value}).`,
                { inserting: val, active: curr.value },
                [12],
                { root: treeToState(root), inserting: val, active: curr.id }
              );
            }
          } else {
            direction = "right";
            if (curr.right === null) {
              curr.right = newNode;
              addStep(
                `Value ${val} is greater than or equal to ${curr.value}, and right child is empty. Insert ${val} as right child of ${curr.value}.`,
                { inserting: val, parent: curr.value, position: "right child" },
                [11, 13],
                { root: treeToState(root), inserting: val, active: newNode.id }
              );
              break;
            } else {
              curr = curr.right;
              addStep(
                `Value ${val} is greater or equal to parent ${parent.value}. Traversing to right child (${curr.value}).`,
                { inserting: val, active: curr.value },
                [13],
                { root: treeToState(root), inserting: val, active: curr.id }
              );
            }
          }
        }
      }
    }

    addStep(
      "Binary Search Tree generation complete! All elements placed in binary sorted hierarchy.",
      { BST: "complete" },
      [15],
      { root: treeToState(root), inserting: null, active: null, final: true }
    );
  }

  // 9. DIJKSTRA GRAPH GENERATOR
  else if (algorithmId === "dijkstra") {
    // We parse graph nodes. We will generate a structured representation in case of Dijkstra
    const nodesG = [
      { id: "A", x: 25, y: 35 },
      { id: "B", x: 50, y: 15 },
      { id: "C", x: 50, y: 55 },
      { id: "D", x: 75, y: 35 },
    ];
    const edgesG = [
      { from: "A", to: "B", weight: 3 },
      { from: "A", to: "C", weight: 5 },
      { from: "B", to: "C", weight: 1 },
      { from: "B", to: "D", weight: 6 },
      { from: "C", to: "D", weight: 2 },
    ];

    const distances: Record<string, number> = { A: 0, B: Infinity, C: Infinity, D: Infinity };
    const visited: string[] = [];
    const prev: Record<string, string | null> = { A: null, B: null, C: null, D: null };

    addStep(
      "Initialize Dijkstra's Shortest Path. Set distance of starting node A to 0, other nodes B, C, D to Infinity.",
      { activeNode: "N/A", distances: "A:0, others:∞" },
      [1, 2, 3, 4, 5, 6, 7],
      { nodes: nodesG, edges: edgesG, distances, visited, prev, current: null }
    );

    // Step 1: Visit A
    distances.A = 0;
    addStep(
      "Pick unvisited node with minimum distance: A (distance: 0). We visit A.",
      { activeNode: "A", dist: 0 },
      [9, 10],
      { nodes: nodesG, edges: edgesG, distances: { ...distances }, visited: ["A"], prev, current: "A" }
    );

    // Relax neighbors of A: B (weight 3), C (weight 5)
    distances.B = 3;
    prev.B = "A";
    addStep(
      "Relax neighbors of A: Path A -> B alt path distance (0 + 3) = 3. 3 < ∞, so update distance[B] = 3.",
      { activeNode: "A", neighbor: "B", edgeWeight: 3, distances: "B:3" },
      [14, 15, 16],
      { nodes: nodesG, edges: edgesG, distances: { ...distances }, visited: ["A"], prev: { ...prev }, current: "A", activeNeighbor: "B" }
    );

    distances.C = 5;
    prev.C = "A";
    addStep(
      "Relax neighbors of A: Path A -> C alt path distance (0 + 5) = 5. 5 < ∞, so update distance[C] = 5.",
      { activeNode: "A", neighbor: "C", edgeWeight: 5, distances: "C:5" },
      [14, 15, 16],
      { nodes: nodesG, edges: edgesG, distances: { ...distances }, visited: ["A"], prev: { ...prev }, current: "A", activeNeighbor: "C" }
    );

    visited.push("A");

    // Step 2: Visit B (min dist of B:3, C:5, D:inf is B)
    addStep(
      "Now, pick next unvisited node with minimum distance: B (distance: 3). We visit B.",
      { activeNode: "B", dist: 3 },
      [9, 10],
      { nodes: nodesG, edges: edgesG, distances: { ...distances }, visited: [...visited, "B"], prev: { ...prev }, current: "B" }
    );

    // Relax neighbors of B: C (weight 1), D (weight 6)
    // Path B -> C distance is 3 + 1 = 4. 4 < existing distance[C] (5). Update distance[C] = 4, prev[C] = B
    distances.C = 4;
    prev.C = "B";
    addStep(
      "Relax neighbors of B: Path B -> C weight is 1. Alt path distance is (3 + 1) = 4. Since 4 < 5, update distance[C] = 4, prev[C] = B.",
      { activeNode: "B", neighbor: "C", edgeWeight: 1 },
      [14, 15, 16],
      { nodes: nodesG, edges: edgesG, distances: { ...distances }, visited: [...visited, "B"], prev: { ...prev }, current: "B", activeNeighbor: "C" }
    );

    // Path B -> D distance is 3 + 6 = 9. 9 < inf. Update distance[D] = 9, prev[D] = B
    distances.D = 9;
    prev.D = "B";
    addStep(
      "Relax neighbors of B: Path B -> D weight is 6. Alt path distance is (3 + 6) = 9. Since 9 < ∞, update distance[D] = 9, prev[D] = B.",
      { activeNode: "B", neighbor: "D", edgeWeight: 6 },
      [14, 15, 16],
      { nodes: nodesG, edges: edgesG, distances: { ...distances }, visited: [...visited, "B"], prev: { ...prev }, current: "B", activeNeighbor: "D" }
    );

    visited.push("B");

    // Step 3: Visit C (min unvisited of C:4, D:9 is C)
    addStep(
      "Pick next unvisited node with minimum distance: C (distance: 4). We visit C.",
      { activeNode: "C", dist: 4 },
      [9, 10],
      { nodes: nodesG, edges: edgesG, distances: { ...distances }, visited: [...visited, "C"], prev: { ...prev }, current: "C" }
    );

    // Relax neighbors of C: D (weight 2). Alt path C -> D is 4 + 2 = 6. Since 6 < existing distance D (9), update distance[D]=6, prev[D]=C
    distances.D = 6;
    prev.D = "C";
    addStep(
      "Relax neighbors of C: Path C -> D weight is 2. Alt path distance is (4 + 2) = 6. Since 6 < 9, update distance[D] = 6, prev[D] = C.",
      { activeNode: "C", neighbor: "D", edgeWeight: 2 },
      [14, 15, 16],
      { nodes: nodesG, edges: edgesG, distances: { ...distances }, visited: [...visited, "C"], prev: { ...prev }, current: "C", activeNeighbor: "D" }
    );

    visited.push("C");

    // Step 4: Visit D
    addStep(
      "Pick next unvisited node with minimum distance: D (distance: 6). We visit D.",
      { activeNode: "D", dist: 6 },
      [9, 10],
      { nodes: nodesG, edges: edgesG, distances: { ...distances }, visited: [...visited, "D"], prev: { ...prev }, current: "D" }
    );

    visited.push("D");

    addStep(
      "Dijkstra complete! Shortest distances from node A: [B: 3, C: 4, D: 6]. Optimal path tree is completed.",
      { A: 0, B: 3, C: 4, D: 6 },
      [18],
      { nodes: nodesG, edges: edgesG, distances, visited, prev, current: null, final: true }
    );
  }

  // 10. 0/1 KNAPSACK GENERATOR
  else if (algorithmId === "knapsack") {
    const weights = [1, 2, 3];
    const values = [10, 15, 40];
    const capacity = 5;

    const N = weights.length;
    const dp = Array(N + 1)
      .fill(0)
      .map(() => Array(capacity + 1).fill(0));

    addStep(
      "Initialize 0/1 Knapsack dynamic programming table. Matrix dimensions (N+1) x (W+1) = 4 columns x 6 rows.",
      { weights: "1,2,3", values: "10,15,40", capacity: 5 },
      [1, 2],
      { weights, values, capacity, dp, r: 0, c: 0 }
    );

    for (let i = 1; i <= N; i++) {
      const wt = weights[i - 1];
      const val = values[i - 1];

      for (let w = 1; w <= capacity; w++) {
        const prevRowVal = dp[i - 1][w];

        if (wt <= w) {
          const selectVal = val + dp[i - 1][w - wt];
          dp[i][w] = Math.max(prevRowVal, selectVal);

          addStep(
            `At Item ${i} (weight: ${wt}, value: ${val}), active sub-capacity w = ${w}. Can fit! Check Max(Exclude: dp[i-1][w] (${prevRowVal}), Include: val + dp[i-1][w-wt] (${val} + ${dp[i - 1][w - wt]} = ${selectVal})). SelectedMax = ${dp[i][w]}.`,
            { i, w, wt, val, decision: dp[i][w] === selectVal ? "Include" : "Exclude", value: dp[i][w] },
            [5, 6, 7, 8, 9, 10],
            { weights, values, capacity, dp, r: i, c: w, activeCells: [[i - 1, w], [i - 1, w - wt]] }
          );
        } else {
          dp[i][w] = prevRowVal;
          addStep(
            `At Item ${i} (weight: ${wt}, value: ${val}), active capacity w = ${w}. Too heavy: weight ${wt} > capacity ${w}. Must exclude. Take previous row value: dp[i-1][w] = ${prevRowVal}.`,
            { i, w, wt, val, decision: "Exclude", value: dp[i][w] },
            [11, 12],
            { weights, values, capacity, dp, r: i, c: w, activeCells: [[i - 1, w]] }
          );
        }
      }
    }

    addStep(
      "Knapsack dynamic programming complete! The maximum profit fits in dp[3][5] = " + dp[N][capacity] + ".",
      { maxProfit: dp[N][capacity] },
      [15],
      { weights, values, capacity, dp, r: N, c: capacity, final: true }
    );
  }

  // 11. N-QUEENS BACKTRACKING GENERATOR
  else if (algorithmId === "n-queens") {
    const n = 4;
    const board = Array(n)
      .fill(null)
      .map(() => Array(n).fill("."));

    // We'll generate custom simulated backtrack steps for 4-queens
    addStep(
      "Initialize 4-Queens board. We will place 4 queens column-by-column so no two queens attack each other.",
      { col: 0 },
      [1, 2],
      { board, col: 0, activeRow: -1, conflicts: [] }
    );

    // Backtrack simulation of N-Queens placement
    // Col 0, Row 0 - Safe
    board[0][0] = "Q";
    addStep(
      "Column 0: Place Queen at row 0 (safe). Proceed to Column 1.",
      { col: 1, Q0: "(0,0)" },
      [17, 18],
      { board, col: 1, activeRow: 0 }
    );

    // Col 1, Row 0 - Conflict (Same row)
    addStep(
      "Column 1: Check safety at row 0. Conflict: Row 0 already contains column 0 Queen.",
      { col: 1, activeRow: 0 },
      [5, 6],
      { board, col: 1, activeRow: 0, conflicts: [[0, 0]] }
    );

    // Col 1, Row 1 - Conflict (Diagonal)
    addStep(
      "Column 1: Check safety at row 1. Conflict: Diagonal attack from Queen at row 0, column 0.",
      { col: 1, activeRow: 1 },
      [5, 9],
      { board, col: 1, activeRow: 1, conflicts: [[0, 0]] }
    );

    // Col 1, Row 2 - Safe
    board[2][1] = "Q";
    addStep(
      "Column 1: Place Queen at row 2 (safe). Proceed to Column 2.",
      { col: 2, Q0: "(0,0)", Q1: "(2,1)" },
      [17, 18],
      { board, col: 2, activeRow: 2 }
    );

    // Col 2: Check standard conflicts. Column 2 has conflicts for all rows 0,1,2,3...
    addStep(
      "Column 2: Check row 0 (conflict with Q0), row 1 (diagonal with Q1), row 2 (conflict with Q1), row 3 (diagonal with Q1). No safe row exist in column 2! Must backtrack.",
      { col: 2 },
      [11, 21],
      { board, col: 2, activeRow: -1, backtrackEvent: true }
    );

    // Backtracks Column 1: Row 2 removed, try Row 3
    board[2][1] = ".";
    addStep(
      "Backtrack Col 1: Remove Queen from row 2. Try Row 3.",
      { col: 1 },
      [20],
      { board, col: 1, activeRow: 2, backtrackEvent: true }
    );

    board[3][1] = "Q";
    addStep(
      "Column 1: Place Queen at row 3 (safe). Proceed to Column 2.",
      { col: 2, Q0: "(0,0)", Q1: "(3,1)" },
      [17, 18],
      { board, col: 2 }
    );

    // Column 2: Try row 1 (safe)
    board[1][2] = "Q";
    addStep(
      "Column 2: Place Queen at row 1 (safe). Proceed to Column 3.",
      { col: 3, Q0: "(0,0)", Q1: "(3,1)", Q2: "(1,2)" },
      [17, 18],
      { board, col: 3 }
    );

    // Column 3 has no safe row. Backtrack from Column 3 to 2, 2 to 1, 1 to 0.
    // Try Q0 at Row 1 of Column 0
    board[1][2] = ".";
    board[3][1] = ".";
    board[0][0] = ".";

    board[1][0] = "Q";
    addStep(
      "Backtracking triggers total reset on Col 0. Remove Queen from (0,0) and place at row 1 of Column 0 (safe). Try Column 1.",
      { col: 1, Q0: "(1,0)" },
      [17, 18],
      { board, col: 1, activeRow: 1 }
    );

    // Column 1, row 3
    board[3][1] = "Q";
    addStep(
      "Column 1: Place Queen at row 3 (safe). Try Column 2.",
      { col: 2, Q0: "(1,0)", Q1: "(3,1)" },
      [17, 18],
      { board, col: 2 }
    );

    // Column 2, row 0
    board[0][2] = "Q";
    addStep(
      "Column 2: Place Queen at row 0 (safe). Try Column 3.",
      { col: 3, Q0: "(1,0)", Q1: "(3,1)", Q2: "(0,2)" },
      [17, 18],
      { board, col: 3 }
    );

    // Column 3, row 2
    board[2][3] = "Q";
    addStep(
      "Column 3: Place Queen at row 2 (safe). All columns filled! Valid placement found.",
      { col: 4, solution: "A=[(1,0), (3,1), (0,2), (2,3)]" },
      [15],
      { board, col: 4, success: true }
    );

    addStep(
      "N-Queens Backtracking complete. Solution successfully solved for size N = 4.",
      { solutions: 1 },
      [22],
      { board, col: 4, success: true, final: true }
    );
  }

  // 12. BIT MANIPULATION GENERATOR
  else if (algorithmId === "bit-tricks") {
    let a = 12; // Binary: 1100
    let b = 5;  // Binary: 0101

    if (inputString.includes(",")) {
      const parts = inputString.split(",");
      const p1 = parseInt(parts[0].trim(), 10);
      const p2 = parseInt(parts[1].trim(), 10);
      if (!isNaN(p1)) a = p1;
      if (!isNaN(p2)) b = p2;
    }

    addStep(
      `Initialize Bitwise Triggers for a = ${a} (${a.toString(2).padStart(8, "0")} in binary) and b = ${b} (${b.toString(2).padStart(8, "0")} in binary).`,
      { a, b },
      [1],
      { a, b, phase: "init" }
    );

    const andResult = a & b;
    addStep(
      `Bitwise AND (a & b): ${a} & ${b} = ${andResult}. Binary: ${a.toString(2).padStart(8, "0")} & ${b.toString(2).padStart(8, "0")} = ${andResult.toString(2).padStart(8, "0")}. Returns 1 only if both bits are 1.`,
      { andResult },
      [2],
      { a, b, result: andResult, op: "AND", binaryA: a.toString(2).padStart(8, "0"), binaryB: b.toString(2).padStart(8, "0"), binaryRes: andResult.toString(2).padStart(8, "0") }
    );

    const orResult = a | b;
    addStep(
      `Bitwise OR (a | b): ${a} | ${b} = ${orResult}. Binary: ${a.toString(2).padStart(8, "0")} | ${b.toString(2).padStart(8, "0")} = ${orResult.toString(2).padStart(8, "0")}. Returns 1 if at least one bit is 1.`,
      { orResult },
      [3],
      { a, b, result: orResult, op: "OR", binaryA: a.toString(2).padStart(8, "0"), binaryB: b.toString(2).padStart(8, "0"), binaryRes: orResult.toString(2).padStart(8, "0") }
    );

    const xorResult = a ^ b;
    addStep(
      `Bitwise XOR (a ^ b): ${a} ^ ${b} = ${xorResult}. Binary: ${a.toString(2).padStart(8, "0")} ^ ${b.toString(2).padStart(8, "0")} = ${xorResult.toString(2).padStart(8, "0")}. Returns 1 if bits strictly differ. Useful for toggling!`,
      { xorResult },
      [4],
      { a, b, result: xorResult, op: "XOR", binaryA: a.toString(2).padStart(8, "0"), binaryB: b.toString(2).padStart(8, "0"), binaryRes: xorResult.toString(2).padStart(8, "0") }
    );

    const notA = ~a;
    addStep(
      `Bitwise NOT (~a): ~${a} = ${notA}. Inverts all individual bit values (including sign bit in two's complement).`,
      { notA },
      [5],
      { a, b, result: notA, op: "NOT", binaryA: a.toString(2).padStart(8, "0"), binaryRes: (notA >>> 0).toString(2).padStart(32, "0").slice(-8) }
    );

    const leftShift = a << 1;
    addStep(
      `Bitwise LEFT SHIFT (a << 1): ${a} << 1 = ${leftShift}. Multiplies A by 2 by sliding binary registers to the left.`,
      { leftShift },
      [6],
      { a, b, result: leftShift, op: "LSHIFT", binaryA: a.toString(2).padStart(8, "0"), binaryRes: leftShift.toString(2).padStart(8, "0") }
    );

    const rightShift = a >> 1;
    addStep(
      `Bitwise RIGHT SHIFT (a >> 1): ${a} >> 1 = ${rightShift}. Divides A by 2 in integer division by shifting registers to the right.`,
      { rightShift },
      [7],
      { a, b, result: rightShift, op: "RSHIFT", binaryA: a.toString(2).padStart(8, "0"), binaryRes: rightShift.toString(2).padStart(8, "0"), final: true }
    );
  }

  // Fallback for missing/unimplemented IDs
  if (steps.length === 0) {
    // Return dummy steps
    const num = parseInt(inputString) || 5;
    addStep(`Starting simulation sequence.`, { value: num }, [1], { value: num });
    addStep(`Step 1: processing operations.`, { value: num * 2 }, [2], { value: num * 2 });
    addStep(`Complete! Output: ${num * 2}`, { final: num * 2 }, [3], { value: num * 2, final: true });
  }

  return steps;
}
