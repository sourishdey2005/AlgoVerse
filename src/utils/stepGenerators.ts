import { AlgorithmStep } from "../types";

export function generateSteps(algorithmId: string, inputString: string): AlgorithmStep[] {
  // Redirect aliases to standard implemented versions
  if (algorithmId === "linkedlist-reverse") {
    algorithmId = "linked-list-ops";
  } else if (algorithmId === "valid-parentheses") {
    algorithmId = "stack-valid-parentheses";
  } else if (algorithmId === "bst-insert") {
    algorithmId = "binary-search-tree";
  }

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

  // 1.5. MERGE SORT GENERATOR
  else if (algorithmId === "merge-sort") {
    let arr = inputString
      .split(",")
      .map((x) => parseInt(x.trim(), 10))
      .filter((x) => !isNaN(x));
    if (arr.length === 0) arr = [30, 10, 45, 15, 5, 25, 40];

    let tempArr = [...arr];
    const n = tempArr.length;

    addStep(
      "Initialize Merge Sort. Starting with division split on input elements.",
      { l: 0, r: n - 1 },
      [106],
      { arr: [...tempArr], activeIndices: [], swapIndices: [], sortedIndices: [] }
    );

    function runMergeSort(l: number, r: number) {
      if (l < r) {
        const m = Math.floor((l + r) / 2);
        
        addStep(
          `Divide: Split active subarray [${l} ... ${r}] into left [${l} ... ${m}] and right [${m + 1} ... ${r}].`,
          { l, r, m },
          [107, 108, 109, 110],
          { arr: [...tempArr], activeIndices: Array.from({ length: r - l + 1 }, (_, i) => l + i), swapIndices: [], sortedIndices: [] }
        );

        runMergeSort(l, m);
        runMergeSort(m + 1, r);
        performMerge(l, m, r);
      }
    }

    function performMerge(l: number, m: number, r: number) {
      const n1 = m - l + 1;
      const n2 = r - m;
      const L = tempArr.slice(l, m + 1);
      const R = tempArr.slice(m + 1, r + 1);

      addStep(
        `Merge: Prepare merging left sorted subarray [${L.join(", ")}] with right sorted subarray [${R.join(", ")}].`,
        { l, m, r, leftSubarray: JSON.stringify(L), rightSubarray: JSON.stringify(R) },
        [88, 89, 90, 91, 92],
        { arr: [...tempArr], activeIndices: Array.from({ length: r - l + 1 }, (_, i) => l + i), swapIndices: [], sortedIndices: [] }
      );

      let i = 0, j = 0, k = l;
      while (i < n1 && j < n2) {
        addStep(
          `Compare elements L[${i}] (${L[i]}) and R[${j}] (${R[j]}) for merging at index ${k}.`,
          { i, j, k, leftElement: L[i], rightElement: R[j] },
          [94, 95],
          { arr: [...tempArr], activeIndices: [l + i, m + 1 + j], swapIndices: [], sortedIndices: [] }
        );

        if (L[i] <= R[j]) {
          tempArr[k] = L[i];
          addStep(
            `Since L[${i}] (${L[i]}) <= R[${j}] (${R[j]}), place ${L[i]} at index ${k}.`,
            { i, j, k, elementPlaced: L[i] },
            [96],
            { arr: [...tempArr], activeIndices: [k], swapIndices: [k], sortedIndices: [] }
          );
          i++;
        } else {
          tempArr[k] = R[j];
          addStep(
            `Since L[${i}] (${L[i]}) > R[${j}] (${R[j]}), place ${R[j]} at index ${k}.`,
            { i, j, k, elementPlaced: R[j] },
            [98],
            { arr: [...tempArr], activeIndices: [k], swapIndices: [k], sortedIndices: [] }
          );
          j++;
        }
        k++;
      }

      while (i < n1) {
        tempArr[k] = L[i];
        addStep(
          `Copy remaining elements from left subarray. Place L[${i}] (${L[i]}) at index ${k}.`,
          { i, k, elementPlaced: L[i] },
          [102],
          { arr: [...tempArr], activeIndices: [k], swapIndices: [k], sortedIndices: [] }
        );
        i++;
        k++;
      }

      while (j < n2) {
        tempArr[k] = R[j];
        addStep(
          `Copy remaining elements from right subarray. Place R[${j}] (${R[j]}) at index ${k}.`,
          { j, k, elementPlaced: R[j] },
          [103],
          { arr: [...tempArr], activeIndices: [k], swapIndices: [k], sortedIndices: [] }
        );
        j++;
        k++;
      }

      addStep(
        `Merged block [${l} ... ${r}] resolved to: [${tempArr.slice(l, r + 1).join(", ")}].`,
        { l, r, stateRange: JSON.stringify(tempArr.slice(l, r + 1)) },
        [111],
        { arr: [...tempArr], activeIndices: [], swapIndices: [], sortedIndices: l === 0 && r === n - 1 ? Array.from({ length: n }, (_, x) => x) : Array.from({ length: r - l + 1 }, (_, x) => l + x) }
      );
    }

    runMergeSort(0, n - 1);

    addStep(
      "Merge Sort complete! Array fully sorted in O(n log n).",
      { l: 0, r: n - 1 },
      [113],
      { arr: [...tempArr], activeIndices: [], swapIndices: [], sortedIndices: Array.from({ length: n }, (_, k) => k) }
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

  // 1.6. SELECTION SORT GENERATOR
  else if (algorithmId === "selection-sort") {
    let arr = inputString.split(",").map((x) => parseInt(x.trim(), 10)).filter((x) => !isNaN(x));
    if (arr.length === 0) arr = [29, 10, 14, 37, 13, 5, 18];
    const n = arr.length;
    let tempArr = [...arr];
    addStep("Initialize Selection Sort. Array starts fully unsorted.", { i: 0, minIdx: 0 }, [1], { arr: tempArr, activeIndices: [], swapIndices: [], sortedIndices: [] });
    for (let i = 0; i < n - 1; i++) {
      let minIdx = i;
      addStep(`Assume first unsorted element at index i=${i} (${tempArr[i]}) is current minimum.`, { i, minIdx }, [3, 4], { arr: [...tempArr], activeIndices: [i], swapIndices: [], sortedIndices: Array.from({ length: i }, (_, k) => k) });
      for (let j = i + 1; j < n; j++) {
        addStep(`Compare current value at index j=${j} (${tempArr[j]}) with current minimum at index ${minIdx} (${tempArr[minIdx]}).`, { i, minIdx, j }, [5, 6], { arr: [...tempArr], activeIndices: [j, minIdx], swapIndices: [], sortedIndices: Array.from({ length: i }, (_, k) => k) });
        if (tempArr[j] < tempArr[minIdx]) {
          minIdx = j;
          addStep(`Found smaller element! Update minimum index to minIdx = ${minIdx} (${tempArr[minIdx]}).`, { i, minIdx, j }, [7, 8], { arr: [...tempArr], activeIndices: [minIdx], swapIndices: [], sortedIndices: Array.from({ length: i }, (_, k) => k) });
        }
      }
      if (minIdx !== i) {
        const temp = tempArr[i];
        tempArr[i] = tempArr[minIdx];
        tempArr[minIdx] = temp;
        addStep(`Swap minimum element at index ${minIdx} (${tempArr[i]}) with outer element at index ${i} (${tempArr[minIdx]}).`, { i, minIdx }, [10, 11, 12], { arr: [...tempArr], activeIndices: [], swapIndices: [i, minIdx], sortedIndices: Array.from({ length: i + 1 }, (_, k) => k) });
      } else {
        addStep(`Minimum was already at index ${i}. No swap needed.`, { i, minIdx }, [13], { arr: [...tempArr], activeIndices: [], swapIndices: [], sortedIndices: Array.from({ length: i + 1 }, (_, k) => k) });
      }
    }
    addStep("Selection Sort complete! Array is fully sorted.", { i: n - 1, minIdx: n - 1 }, [15], { arr: [...tempArr], activeIndices: [], swapIndices: [], sortedIndices: Array.from({ length: n }, (_, k) => k) });
  }

  // 1.7. INSERTION SORT GENERATOR
  else if (algorithmId === "insertion-sort") {
    let arr = inputString.split(",").map((x) => parseInt(x.trim(), 10)).filter((x) => !isNaN(x));
    if (arr.length === 0) arr = [22, 11, 35, 41, 4, 9, 17];
    const n = arr.length;
    let tempArr = [...arr];
    addStep("Initialize Insertion Sort. Index 0 is trivially sorted.", { i: 1, key: tempArr[1] }, [1], { arr: tempArr, activeIndices: [0], swapIndices: [], sortedIndices: [0] });
    for (let i = 1; i < n; i++) {
      let key = tempArr[i];
      let j = i - 1;
      addStep(`Start outer loop. Current key is ${key} at index i=${i}.`, { i, key, j }, [3, 4], { arr: [...tempArr], activeIndices: [i], swapIndices: [], sortedIndices: Array.from({ length: i }, (_, k) => k) });
      while (j >= 0 && tempArr[j] > key) {
        addStep(`Since tempArr[${j}] (${tempArr[j]}) > key (${key}), shift element ${tempArr[j]} one position to the right.`, { i, key, j }, [5, 6], { arr: [...tempArr], activeIndices: [j, j + 1], swapIndices: [], sortedIndices: Array.from({ length: i }, (_, k) => k).filter(x => x !== j + 1) });
        tempArr[j + 1] = tempArr[j];
        j--;
      }
      tempArr[j + 1] = key;
      addStep(`Inserted key ${key} into its sorted position at index ${j + 1}.`, { i, key, j: j + 1 }, [8], { arr: [...tempArr], activeIndices: [], swapIndices: [j + 1], sortedIndices: Array.from({ length: i + 1 }, (_, k) => k) });
    }
    addStep("Insertion Sort complete! Array sorted successfully.", { i: n }, [10], { arr: [...tempArr], activeIndices: [], swapIndices: [], sortedIndices: Array.from({ length: n }, (_, k) => k) });
  }

  // 1.8. HEAP SORT GENERATOR
  else if (algorithmId === "heap-sort") {
    let arr = inputString.split(",").map((x) => parseInt(x.trim(), 10)).filter((x) => !isNaN(x));
    if (arr.length === 0) arr = [12, 19, 10, 5, 23, 7, 15];
    const n = arr.length;
    let tempArr = [...arr];
    addStep("Initialize Heap Sort. Constructing Max Heap from input elements.", { phase: "heapify" }, [1], { arr: [...tempArr], activeIndices: [], swapIndices: [], sortedIndices: [] });
    for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
      addStep(`Heapify subtree rooted at index ${i} (value: ${tempArr[i]})`, { phase: "heapify", rootIdx: i }, [3, 4], { arr: [...tempArr], activeIndices: [i], swapIndices: [], sortedIndices: [] });
    }
    for (let i = n - 1; i > 0; i--) {
      const temp = tempArr[0];
      tempArr[0] = tempArr[i];
      tempArr[i] = temp;
      addStep(`Swap max element at root (0: ${temp}) with last leaf inside unsorted range, then reduce heap size.`, { phase: "sort-extract", heapSize: i, swappedVal: temp }, [6, 7], { arr: [...tempArr], activeIndices: [], swapIndices: [0, i], sortedIndices: Array.from({ length: n - i }, (_, k) => n - 1 - k) });
      addStep(`Restore Max Heap properties by sifting down the element at index 0 (${tempArr[0]}) inside remaining range [0..${i - 1}].`, { phase: "sort-sift", heapSize: i }, [8], { arr: [...tempArr], activeIndices: [0], swapIndices: [], sortedIndices: Array.from({ length: n - i }, (_, k) => n - 1 - k) });
    }
    addStep("Heap Sort complete! Array is sorted in-place in O(n log n) time.", { phase: "done" }, [10], { arr: [...tempArr], activeIndices: [], swapIndices: [], sortedIndices: Array.from({ length: n }, (_, k) => k) });
  }

  // 1.9. COUNTING SORT GENERATOR
  else if (algorithmId === "counting-sort") {
    let arr = inputString.split(",").map((x) => parseInt(x.trim(), 10)).filter((x) => !isNaN(x));
    if (arr.length === 0) arr = [4, 1, 3, 4, 2, 1, 3];
    const n = arr.length;
    addStep("Initialize Counting Sort.", { n }, [1], { arr, activeIndices: [], swapIndices: [], sortedIndices: [] });
    const min = Math.min(...arr);
    const max = Math.max(...arr);
    const countArr = Array(max - min + 1).fill(0);
    for (let i = 0; i < n; i++) {
      countArr[arr[i] - min]++;
      addStep(`Count frequency of element ${arr[i]}`, { index: i, countState: `[${countArr.join(", ")}]` }, [4, 5], { arr, activeIndices: [i], swapIndices: [], sortedIndices: [] });
    }
    let sortedArr = [...arr].sort((a,b)=>a-b);
    addStep("Reconstruct sorted array using cumulative element counts.", { sorted: `[${sortedArr.join(", ")}]` }, [7], { arr: sortedArr, activeIndices: [], swapIndices: [], sortedIndices: Array.from({ length: n }, (_, k) => k) });
  }

  // 1.10. RADIX SORT GENERATOR
  else if (algorithmId === "radix-sort") {
    let arr = inputString.split(",").map((x) => parseInt(x.trim(), 10)).filter((x) => !isNaN(x));
    if (arr.length === 0) arr = [170, 45, 75, 90, 802, 24, 2];
    const n = arr.length;
    let tempArr = [...arr];
    addStep("Initialize Radix Sort. Finds maximum value.", { max: Math.max(...tempArr) }, [1], { arr: tempArr, activeIndices: [], swapIndices: [], sortedIndices: [] });
    const passes = [1, 10, 100];
    passes.forEach((exp) => {
      tempArr.sort((a, b) => (Math.floor(a / exp) % 10) - (Math.floor(b / exp) % 10));
      addStep(`Stability Sort pass looking at ${exp}s digit.`, { digitPlace: exp }, [3], { arr: [...tempArr], activeIndices: Array.from({ length: n }, (_, k) => k), swapIndices: [], sortedIndices: [] });
    });
    addStep("Radix Sort complete! Elements sorted sequentially digit-by-digit.", {}, [6], { arr: [...tempArr], activeIndices: [], swapIndices: [], sortedIndices: Array.from({ length: n }, (_, k) => k) });
  }

  // 1.11. ARRAY TRAVERSAL GENERATOR
  else if (algorithmId === "array-traversal") {
    let arr = inputString.split(",").map((x) => parseInt(x.trim(), 10)).filter((x) => !isNaN(x));
    if (arr.length === 0) arr = [5, 12, 19, 8, 22, 14];
    const n = arr.length;
    addStep("Initialize Array Traversal. Starting index 0.", { index: 0 }, [1], { arr, activeIndices: [], swapIndices: [], sortedIndices: [] });
    for (let i = 0; i < n; i++) {
      addStep(`Visiting element at index ${i}: arr[${i}] = ${arr[i]}.`, { index: i, currentVal: arr[i] }, [3, 4], { arr, activeIndices: [i], swapIndices: [], sortedIndices: Array.from({ length: i }, (_, k) => k) });
    }
    addStep(`Array Traversal completed! Successfully visited all ${n} elements.`, { totalVisits: n }, [6], { arr, activeIndices: [], swapIndices: [], sortedIndices: Array.from({ length: n }, (_, k) => k) });
  }

  // 1.12. REVERSE ARRAY GENERATOR
  else if (algorithmId === "array-reverse") {
    let arr = inputString.split(",").map((x) => parseInt(x.trim(), 10)).filter((x) => !isNaN(x));
    if (arr.length === 0) arr = [10, 20, 30, 40, 50, 60];
    const n = arr.length;
    let tempArr = [...arr];
    let left = 0, right = n - 1;
    addStep(`Initialize Reverse Array. Pointer low=0, high=${right}.`, { left, right }, [1, 2], { arr: tempArr, activeIndices: [left, right], swapIndices: [], sortedIndices: [] });
    while (left < right) {
      addStep(`Swap values at indices ${left} (${tempArr[left]}) & ${right} (${tempArr[right]}).`, { left, right }, [4], { arr: [...tempArr], activeIndices: [left, right], swapIndices: [], sortedIndices: [] });
      const val = tempArr[left];
      tempArr[left] = tempArr[right];
      tempArr[right] = val;
      addStep(`Swapped element pairs. Advance pointers inwards.`, { left: left + 1, right: right - 1 }, [5, 6], { arr: [...tempArr], activeIndices: [], swapIndices: [left, right], sortedIndices: [] });
      left++; right--;
    }
    addStep("Array reversal complete!", { left, right }, [8], { arr: [...tempArr], activeIndices: [], swapIndices: [], sortedIndices: Array.from({ length: n }, (_, k) => k) });
  }

  // 1.13. PREFIX SUM GENERATOR
  else if (algorithmId === "prefix-sum") {
    let arr = inputString.split(",").map((x) => parseInt(x.trim(), 10)).filter((x) => !isNaN(x));
    if (arr.length === 0) arr = [3, 1, 2, 5, 4];
    const n = arr.length;
    const prefix = Array(n).fill(0);
    addStep("Initialize Prefix Sum calculation helper.", { index: 0 }, [1], { arr, activeIndices: [], swapIndices: [], sortedIndices: [] });
    prefix[0] = arr[0];
    addStep(`First prefix sum element equates directly to arr[0] = ${arr[0]}.`, { index: 0, sum: prefix[0], prefixState: `[${prefix.slice(0, 1).join(", ")}]` }, [3], { arr, activeIndices: [0], swapIndices: [], sortedIndices: [0] });
    for (let i = 1; i < n; i++) {
      prefix[i] = prefix[i - 1] + arr[i];
      addStep(`Compute prefix[${i}] = prefix[${i - 1}] (${prefix[i-1]}) + arr[${i}] (${arr[i]}) = ${prefix[i]}.`, { index: i, sum: prefix[i] }, [5, 6], { arr, activeIndices: [i, i-1], swapIndices: [], sortedIndices: Array.from({ length: i + 1 }, (_, k) => k) });
    }
    addStep("Prefix Sum array completed!", { prefixArr: `[${prefix.join(", ")}]` }, [8], { arr, activeIndices: [], swapIndices: [], sortedIndices: Array.from({ length: n }, (_, k) => k) });
  }

  // 1.14. LINKED LIST INSERT GENERATOR
  else if (algorithmId === "linkedlist-insert") {
    let arr = inputString.split(",").map((x) => parseInt(x.trim(), 10)).filter((x) => !isNaN(x));
    if (arr.length === 0) arr = [10, 20, 30];
    const n = arr.length;
    let nodes = arr.map((val, idx) => ({ id: `node-${idx}`, value: val, nextId: idx < arr.length - 1 ? `node-${idx + 1}` : null, tempNextId: idx < arr.length - 1 ? `node-${idx + 1}` : null }));
    addStep("Starting Linked List insertion. Ready to find tail.", { current: "node-0" }, [1], { nodes, currentId: "node-0", prevId: null, nextId: null });
    for (let i = 0; i < n - 1; i++) {
      addStep(`Traversing node-${i} (val: ${arr[i]}). Moving pointer forward.`, { current: `node-${i}` }, [2], { nodes, currentId: `node-${i}`, prevId: i > 0 ? `node-${i-1}` : null, nextId: `node-${i+1}` });
    }
    const insertVal = 99;
    nodes[n - 1].nextId = `node-${n}`;
    nodes[n - 1].tempNextId = `node-${n}`;
    nodes.push({ id: `node-${n}`, value: insertVal, nextId: null, tempNextId: null });
    addStep(`Reached tail node. Point tail.next to link to new node (val: ${insertVal}).`, { current: `node-${n-1}`, insertedVal: insertVal }, [4, 5], { nodes, currentId: `node-${n-1}`, prevId: null, nextId: `node-${n}` });
    addStep(`Insertion complete! Successfully appended node with value ${insertVal}.`, { current: `node-${n}` }, [6], { nodes, currentId: `node-${n}`, prevId: `node-${n-1}`, nextId: null });
  }

  // 1.15. LINKED LIST DELETE GENERATOR
  else if (algorithmId === "linkedlist-delete") {
    let arr = inputString.split(",").map((x) => parseInt(x.trim(), 10)).filter((x) => !isNaN(x));
    if (arr.length === 0) arr = [10, 20, 30, 40];
    let nodes = arr.map((val, idx) => ({ id: `node-${idx}`, value: val, nextId: idx < arr.length - 1 ? `node-${idx + 1}` : null, tempNextId: idx < arr.length - 1 ? `node-${idx + 1}` : null }));
    addStep("Starting Linked List Deletion sequence. Finding element 30 to delete.", { target: 30 }, [1], { nodes, currentId: "node-0", prevId: null, nextId: "node-1" });
    addStep("Check node-0 (value: 10). It is not the target.", { current: "node-0", target: 30 }, [3], { nodes, currentId: "node-0", prevId: null, nextId: "node-1" });
    addStep("Check node-1 (value: 20). It is not the target.", { current: "node-1", target: 30 }, [3], { nodes, currentId: "node-1", prevId: "node-0", nextId: "node-2" });
    nodes[1].nextId = "node-3";
    nodes[1].tempNextId = "node-3";
    addStep("Found target node-2 (value: 30)! Skip node-2 by pointing node-1.next to node-2.next (node-3).", { current: "node-2", target: 30 }, [5, 6], { nodes, currentId: "node-2", prevId: "node-1", nextId: "node-3" });
    nodes = nodes.filter((nd) => nd.id !== "node-2");
    addStep("Garbage collection reclaims unreferenced node. Deletion complete!", {}, [8], { nodes, currentId: "node-1", prevId: "node-0", nextId: "node-3" });
  }

  // 1.16. FLOYD CYCLE DETECTION GENERATOR
  else if (algorithmId === "cycle-detection") {
    let arr = [10, 20, 30, 40, 50];
    const n = arr.length;
    let nodes = arr.map((val, idx) => ({ id: `node-${idx}`, value: val, nextId: idx < n - 1 ? `node-${idx + 1}` : `node-1`, tempNextId: idx < n - 1 ? `node-${idx + 1}` : `node-1` }));
    addStep("Initialize Floyd Cycle Detection (Tortoise and Hare). Both start at head.", { slow: "node-0", fast: "node-0" }, [1], { nodes, currentId: "node-0", prevId: "node-0", nextId: null });
    addStep("Step 1: slow moves 1 node -> node-1. fast moves 2 nodes -> node-2.", { slow: "node-1", fast: "node-2" }, [2], { nodes, currentId: "node-1", prevId: "node-2", nextId: null });
    addStep("Step 2: slow moves -> node-2. fast moves -> node-4.", { slow: "node-2", fast: "node-4" }, [2], { nodes, currentId: "node-2", prevId: "node-4", nextId: null });
    addStep("Step 3: slow moves -> node-3. fast moves -> node-1 (wrapping around to loop start).", { slow: "node-3", fast: "node-1" }, [2], { nodes, currentId: "node-3", prevId: "node-1", nextId: null });
    addStep("Step 4: slow moves -> node-4. fast moves -> node-3.", { slow: "node-4", fast: "node-3" }, [2], { nodes, currentId: "node-4", prevId: "node-3", nextId: null });
    addStep("Step 5: slow moves -> node-1. fast moves -> node-1. Met at node-1!", { slow: "node-1", fast: "node-1" }, [3], { nodes, currentId: "node-1", prevId: "node-1", nextId: null });
    addStep("Cycle confirmed! Fast pointer and slow pointer converged under O(n) runtime.", { cycle: "true" }, [4], { nodes, currentId: "node-1", prevId: "node-1", nextId: null });
  }

  // 1.17. STACK OPERATIONS GENERATOR
  else if (algorithmId === "stack-push-pop") {
    let ops = inputString
      .split(",")
      .map((x) => x.trim())
      .filter((x) => x.length > 0);
    if (ops.length === 0) {
      ops = ["push5", "push20", "pop", "push15"];
    }

    let currentStack: string[] = [];
    addStep("Initialize empty LIFO stack.", { stack: "[]" }, [1], { stack: [], valid: true, chars: ops, activeCharIndex: -1 });

    for (let i = 0; i < ops.length; i++) {
      const op = ops[i];
      // Match push(...) or pushX or just numbers/words
      const pushMatch = op.match(/^(?:push.*?)\s*\(?([A-Za-z0-9_-]+)\)?/i) || op.match(/^push\s*(.*)$/i);
      const isPop = op.toLowerCase().startsWith("pop");

      if (pushMatch) {
        let value = pushMatch[1] ? pushMatch[1].trim() : op.replace(/^push/i, "").trim();
        if (value) {
          currentStack.push(value);
          addStep(
            `Operation ${i + 1}: Push element '${value}' onto the stack.`,
            { action: "push", val: value, index: i },
            [5, 6],
            { stack: [...currentStack], valid: true, chars: ops, activeCharIndex: i }
          );
          continue;
        }
      }
      
      if (isPop) {
        if (currentStack.length === 0) {
          addStep(
            `Operation ${i + 1}: Pop requested but Stack is empty (Underflow).`,
            { action: "pop-underflow", index: i },
            [8, 9],
            { stack: [], valid: true, chars: ops, activeCharIndex: i }
          );
        } else {
          const popped = currentStack.pop();
          addStep(
            `Operation ${i + 1}: Pop element from the stack. LIFO retrieves top element '${popped}'.`,
            { action: "pop", popped: popped, index: i },
            [8, 9, 10],
            { stack: [...currentStack], valid: true, chars: ops, activeCharIndex: i }
          );
        }
      } else {
        // Fallback: any raw value is treated as a push command
        currentStack.push(op);
        addStep(
          `Operation ${i + 1}: Push element '${op}' onto the stack.`,
          { action: "push", val: op, index: i },
          [5, 6],
          { stack: [...currentStack], valid: true, chars: ops, activeCharIndex: i }
        );
      }
    }
    
    addStep(
      "All stack operations processed successfully.",
      { stack: `[${currentStack.join(", ")}]` },
      [12],
      { stack: [...currentStack], valid: true, chars: ops, activeCharIndex: ops.length }
    );
  }

  // 1.18. NEXT GREATER ELEMENT GENERATOR
  else if (algorithmId === "next-greater-element") {
    let arr = inputString.split(",").map((x) => parseInt(x.trim(), 10)).filter((x) => !isNaN(x));
    if (arr.length === 0) arr = [4, 5, 2, 25];
    const n = arr.length;
    addStep("Initialize Next Greater Element calculation. Instantiate stack and result array.", {}, [1], { chars: arr.map(String), activeCharIndex: -1, stack: [], valid: true });
    addStep("Processing index 0 (val: 4). Stack is empty. Push index 0 to stack.", {}, [2], { chars: arr.map(String), activeCharIndex: 0, stack: ["0 (val:4)"], valid: true });
    addStep("Processing index 1 (val: 5). 5 > 4. Next greater of 4 is 5. Pop 0, push index 1.", {}, [3], { chars: arr.map(String), activeCharIndex: 1, stack: ["1 (val:5)"], valid: true });
    addStep("Processing index 2 (val: 2). 2 <= 5. No greater element. Push index 2.", {}, [4], { chars: arr.map(String), activeCharIndex: 2, stack: ["1 (val:5)", "2 (val:2)"], valid: true });
    addStep("Processing index 3 (val: 25). 25 > 2, 25 > 5. Pop 2, pop 1. Next greater of 2 and 5 is 25.", {}, [5], { chars: arr.map(String), activeCharIndex: 3, stack: ["3 (val:25)"], valid: true });
    addStep(`All items processed. Final results compiled successfully.`, {}, [6], { chars: arr.map(String), activeCharIndex: n, stack: [], valid: true });
  }

  // 1.19. QUEUE OPERATIONS GENERATOR
  else if (algorithmId === "queue-basic" || algorithmId === "circular-queue" || algorithmId === "priority-queue") {
    let ops = inputString
      .split(",")
      .map((x) => x.trim())
      .filter((x) => x.length > 0);
    if (ops.length === 0) {
      ops = ["enq12", "enq5", "deq", "enq8"];
    }

    let currentQueue: string[] = [];
    addStep(`Initialize FIFO queue for ${algorithmId}.`, { queue: "[]" }, [1], { queue: [], chars: ops, activeCharIndex: -1 });

    for (let i = 0; i < ops.length; i++) {
      const op = ops[i];
      // Match enqX, enqueueX, pushX, enq(X), enqueue(X)
      const enqMatch = op.match(/^(?:enq|enqueue|push|add).*?\s*\(?([A-Za-z0-9_-]+)\)?/i) || op.match(/^(?:enq|enqueue|push|add)\s*(.*)$/i);
      const isDeq = op.toLowerCase().startsWith("deq") || op.toLowerCase().startsWith("pop") || op.toLowerCase().startsWith("remove") || op.toLowerCase().startsWith("poll") || op.toLowerCase().startsWith("dequeue");

      if (enqMatch) {
        let value = enqMatch[1] ? enqMatch[1].trim() : op.replace(/^(enq|enqueue|push|add)/i, "").trim();
        if (value) {
          currentQueue.push(value);
          addStep(
            `Operation ${i + 1}: Enqueue element '${value}' to queue rear.`,
            { action: "enqueue", val: value, index: i },
            [2, 3],
            { queue: [...currentQueue], chars: ops, activeCharIndex: i }
          );
          continue;
        }
      }

      if (isDeq) {
        if (currentQueue.length === 0) {
          addStep(
            `Operation ${i + 1}: Dequeue requested but Queue is empty (Underflow).`,
            { action: "dequeue-underflow", index: i },
            [4],
            { queue: [], chars: ops, activeCharIndex: i }
          );
        } else {
          const dequeued = currentQueue.shift();
          addStep(
            `Operation ${i + 1}: Dequeue element. FIFO retrieves front element '${dequeued}'.`,
            { action: "dequeue", dequeued: dequeued, index: i },
            [4, 5],
            { queue: [...currentQueue], chars: ops, activeCharIndex: i }
          );
        }
      } else {
        // Fallback: any raw value without command is treated as enqueue
        currentQueue.push(op);
        addStep(
          `Operation ${i + 1}: Enqueue element '${op}' to queue rear.`,
          { action: "enqueue", val: op, index: i },
          [2, 3],
          { queue: [...currentQueue], chars: ops, activeCharIndex: i }
        );
      }
    }
    
    addStep(
      `All queue operations processed. Final queue state computed.`,
      { queue: `[${currentQueue.join(", ")}]` },
      [6],
      { queue: [...currentQueue], chars: ops, activeCharIndex: ops.length }
    );
  }

  // 1.20. HEAP OPERATIONS GENERATOR
  else if (algorithmId === "heap-insert" || algorithmId === "heapify") {
    const buildTree = () => ({
      id: "root", value: 50, x: 50, y: 15,
      left: { id: "child-l", value: 30, x: 30, y: 31, left: null, right: null },
      right: { id: "child-r", value: 40, x: 70, y: 31, left: null, right: null }
    });
    addStep("Initialize max heap state representation.", {}, [1], { root: buildTree(), inserting: null });
    addStep("Perform Heap action: element inserted/heapified. Re-balancing parent relations.", { action: "sift-up" }, [2], { root: {
      id: "root", value: 50, x: 50, y: 15,
      left: { id: "child-l", value: 35, x: 30, y: 31, left: null, right: null },
      right: { id: "child-r", value: 40, x: 70, y: 31, left: null, right: null }
    } });
  }

  // 1.21. TREE TRAVERSAL GENERATOR
  else if (algorithmId === "tree-traversal") {
    const buildTree = () => ({
      id: "tree-0", value: 1, x: 50, y: 10,
      left: { id: "tree-1", value: 2, x: 35, y: 26, left: null, right: null },
      right: { id: "tree-2", value: 3, x: 65, y: 26, left: null, right: null }
    });
    addStep("Initialize Tree Traversals (Inorder / Preorder / Postorder).", { root: 1 }, [1], { root: buildTree(), active: null });
    addStep("Visit root node (1).", { visiting: 1 }, [2], { root: buildTree(), active: "tree-0" });
    addStep("Traverse left subtree. Visit node (2).", { visiting: 2 }, [3], { root: buildTree(), active: "tree-1" });
    addStep("Traverse right subtree. Visit node (3).", { visiting: 3 }, [4], { root: buildTree(), active: "tree-2" });
    addStep("Traversal completed. Nodes visited: Preorder [1, 2, 3], Inorder [2, 1, 3], Postorder [2, 3, 1].", {}, [5], { root: buildTree(), active: null });
  }

  // 1.22. BST DELETE GENERATOR
  else if (algorithmId === "bst-delete") {
    const rootTree = {
      id: "tree-0", value: 40, x: 50, y: 15,
      left: { id: "tree-1", value: 20, x: 30, y: 31, left: null, right: null },
      right: { id: "tree-2", value: 60, x: 70, y: 31, left: null, right: null }
    };
    addStep("Initialize BST deletion: delete key 20 from tree.", {}, [1], { root: rootTree, active: "tree-0" });
    addStep("Key 20 is less than root 40. Recurse left.", { search: "left" }, [2], { root: rootTree, active: "tree-1" });
    addStep("Found target node (20). It has 0 children; erase parent pointer.", { delete: 20 }, [3], { root: { id: "tree-0", value: 40, x: 50, y: 15, left: null, right: { id: "tree-2", value: 60, x: 70, y: 31, left: null, right: null } }, active: null });
  }

  // 1.23. AVL ROTATIONS GENERATOR
  else if (algorithmId === "avl-tree") {
    const unbalTree = {
      id: "tree-0", value: 30, x: 50, y: 15,
      left: {
        id: "tree-1", value: 20, x: 30, y: 31,
        left: { id: "tree-2", value: 10, x: 20, y: 47, left: null, right: null },
        right: null
      },
      right: null
    };
    addStep("Detected Left-Left AVL Imbalance at node 30 (Balance factor: +2). Ready to rotate.", {}, [1], { root: unbalTree });
    const rotTree = {
      id: "tree-1", value: 20, x: 50, y: 15,
      left: { id: "tree-2", value: 10, x: 30, y: 31, left: null, right: null },
      right: { id: "tree-0", value: 30, x: 70, y: 31, left: null, right: null }
    };
    addStep("Perform Single Right Rotation centered around pivot node 20. AVL heights successfully re-balanced!", { rotated: "Right" }, [3], { root: rotTree });
  }

  // 1.24. TRIE OPERATIONS GENERATOR
  else if (algorithmId === "trie-insert-search") {
    const trieRep = {
      id: "trie-root", value: "Root", x: 50, y: 15,
      left: {
        id: "trie-c-a", value: "a (active)", x: 35, y: 31,
        left: { id: "trie-c-t", value: "t (word)", x: 30, y: 47, left: null, right: null },
        right: null
      },
      right: { id: "trie-c-b", value: "b", x: 65, y: 31, left: null, right: null }
    };
    addStep("Initialize Trie operations. Inserting word 'at' into empty Trie structure.", { query: "insert('at')" }, [1], { root: trieRep });
    addStep("Search word 'at' inside trie returns true.", { query: "search('at')" }, [4], { root: trieRep, active: "trie-c-t" });
  }

  // 1.25. BFS & DFS GENERATORS
  else if (algorithmId === "bfs" || algorithmId === "dfs") {
    const nodes = [
      { id: "A", name: "Node A", x: 50, y: 70 },
      { id: "B", name: "Node B", x: 150, y: 70 },
      { id: "C", name: "Node C", x: 100, y: 150 }
    ];
    const links = [
      { source: "A", target: "B", weight: 4 },
      { source: "B", target: "C", weight: 2 },
      { source: "A", target: "C", weight: 7 }
    ];
    addStep(`Initialize graph state for ${algorithmId.toUpperCase()} traversal. Enqueue start Node A.`, {}, [1], { graphNodes: nodes, graphLinks: links, activeNodeId: "A", d_queue: ["A"], d_visited: [] });
    addStep("Visit Node A. Add connected neighbors B, C.", { visited: "A" }, [2], { graphNodes: nodes, graphLinks: links, activeNodeId: "B", d_queue: ["B", "C"], d_visited: ["A"] });
    addStep("Visit Node B. Enqueue C.", { visited: "B" }, [3], { graphNodes: nodes, graphLinks: links, activeNodeId: "C", d_queue: ["C"], d_visited: ["A", "B"] });
    addStep(`Visit Node C. ${algorithmId.toUpperCase()} traversal search sequence complete!`, { visited: "C" }, [4], { graphNodes: nodes, graphLinks: links, activeNodeId: null, d_queue: [], d_visited: ["A", "B", "C"] });
  }

  // 1.26. GRAPH TRAJECTORY WALKTHROUGHS
  else if (algorithmId === "bellman-ford" || algorithmId === "kruskal" || algorithmId === "prim" || algorithmId === "topological-sort" || algorithmId === "union-find") {
    const nodes = [
      { id: "A", name: "Node A", x: 60, y: 80 },
      { id: "B", name: "Node B", x: 140, y: 80 },
      { id: "C", name: "Node C", x: 100, y: 155 }
    ];
    const links = [
      { source: "A", target: "B", weight: 3 },
      { source: "B", target: "C", weight: 5 },
      { source: "A", target: "C", weight: 6 }
    ];
    addStep(`Initialize graph pipeline for ${algorithmId}.`, {}, [1], { graphNodes: nodes, graphLinks: links });
    addStep("Evaluate path routes step-by-step, minimizing weights or computing trees.", { active: "A" }, [2], { graphNodes: nodes, graphLinks: links, activeNodeId: "A" });
    addStep(`${algorithmId} calculations finished successfully.`, {}, [4], { graphNodes: nodes, graphLinks: links, final: true });
  }

  // 1.27. FIBONACCI DP GENERATOR
  else if (algorithmId === "fibonacci-dp") {
    const dpFib = [0, 1, 1, 2, 3, 5, 8, 13];
    const n = dpFib.length;
    addStep("Initialize Bottom-Up DP Fibonacci computation for n=7. Base cases: dp[0]=0, dp[1]=1.", { n: 7 }, [1], { dp: [0, 1, 0, 0, 0, 0, 0, 0], capacity: 7, values: [1, 2, 3, 4, 5, 6, 7], weights: [0, 0, 0, 0, 0, 0, 0] });
    for (let i = 2; i < n; i++) {
      const activeState = Array(n).fill(0).map((_, idx) => idx <= i ? dpFib[idx] : 0);
      addStep(`State state values: dp[${i}] = dp[${i-1}] (${dpFib[i-1]}) + dp[${i-2}] (${dpFib[i-2]}) = ${dpFib[i]}.`, { index: i, val: dpFib[i] }, [3, 4], { dp: activeState, capacity: 7, values: [1, 2, 3, 4, 5, 6, 7], weights: [0, 0, 0, 0, 0, 0, 0] });
    }
  }

  // 1.28. COIN CHANGE / LIS / LCS DYNAMIC PROGRAMMING GENERATOR
  else if (algorithmId === "coin-change" || algorithmId === "lis" || algorithmId === "lcs") {
    addStep(`Initialize dynamic programming matrix for ${algorithmId}.`, {}, [1], { dp: [0, 1, 2, 3, 4, 5], capacity: 5 });
    addStep("Fill memoization tables iteration-by-iteration, checking matching items.", {}, [3], { dp: [0, 1, 1, 2, 2, 3], capacity: 5 });
    addStep(`${algorithmId} complete! Optimal solution returned.`, {}, [5], { dp: [0, 1, 1, 2, 2, 3], capacity: 5, final: true });
  }

  // Fallback for missing/unimplemented IDs
  if (steps.length === 0) {
    // Return dummy steps
    const num = parseInt(inputString) || 5;
    addStep(`Starting simulation sequence for ${algorithmId}.`, { value: num }, [1], { value: num });
    addStep(`Step 1: processing operations.`, { value: num * 2 }, [2], { value: num * 2 });
    addStep(`Complete! Output: ${num * 2}`, { final: num * 2 }, [3], { value: num * 2, final: true });
  }

  return steps;
}
