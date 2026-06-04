import { Problem } from "../types";

export const PROBLEMS: Problem[] = [
  {
    id: "two-sum",
    title: "1. Two Sum",
    description: "Given an array of integers `nums` and an integer `target`, return indices of the two numbers such that they add up to `target`.\n\nYou may assume that each input would have exactly one solution, and you may not use the same element twice.",
    difficulty: "Easy",
    topic: "Array",
    pattern: "Two Pointer / Hash Map",
    companies: ["Google", "Amazon", "Meta", "Microsoft"],
    frequency: 5,
    tags: ["Array", "Hash Table"],
    testCaseInput: "nums = [2,7,11,15], target = 9",
    testCaseOutput: "[0,1]",
    boilerplate: {
      javascript: `function twoSum(nums, target) {
  // Write your code here
  let map = new Map();
  for (let i = 0; i < nums.length; i++) {
    let complement = target - nums[i];
    if (map.has(complement)) {
      return [map.get(complement), i];
    }
    map.set(nums[i], i);
  }
  return [];
}`,
      python: `def twoSum(nums: list[int], target: int) -> list[int]:
    # Write your code here
    seen = {}
    for i, num in enumerate(nums):
        complement = target - num
        if complement in seen:
            return [seen[complement], i]
        seen[num] = i
    return []`,
      cpp: `vector<int> twoSum(vector<int>& nums, int target) {
    unordered_map<int, int> seen;
    for (int i = 0; i < nums.size(); i++) {
        int complement = target - nums[i];
        if (seen.count(complement)) {
            return {seen[complement], i};
        }
        seen[nums[i]] = i;
    }
    return {};
}`,
      java: `class Solution {
    public int[] twoSum(int[] nums, int target) {
        HashMap<Integer, Integer> map = new HashMap<>();
        for (int i = 0; i < nums.length; i++) {
            int complement = target - nums[i];
            if (map.containsKey(complement)) {
                return new int[] { map.get(complement), i };
            }
            map.put(nums[i], i);
        }
        return new int[] {};
    }
}`,
      go: `func twoSum(nums []int, target int) []int {
    seen := make(map[int]int)
    for i, num := range nums {
        complement := target - num
        if idx, ok := seen[complement]; ok {
            return []int{idx, i}
        }
        seen[num] = i
    }
    return nil
}`,
    },
  },
  {
    id: "reverse-list",
    title: "206. Reverse Linked List",
    description: "Given the head of a singly linked list, reverse the list, and return its reversed list.",
    difficulty: "Easy",
    topic: "Linked List",
    pattern: "Two Pointers",
    companies: ["Meta", "Amazon", "Microsoft", "Uber"],
    frequency: 4,
    tags: ["Linked List", "Recursion"],
    testCaseInput: "head = [1,2,3,4,5]",
    testCaseOutput: "[5,4,3,2,1]",
    boilerplate: {
      javascript: `function reverseList(head) {
  let prev = null;
  let curr = head;
  while (curr !== null) {
    let nextNode = curr.next;
    curr.next = prev;
    prev = curr;
    curr = nextNode;
  }
  return prev;
}`,
      python: `def reverseList(head):
    prev = None
    curr = head
    while curr:
        next_node = curr.next
        curr.next = prev
        prev = curr
        curr = next_node
    return prev`,
    },
  },
  {
    id: "valid-parentheses",
    title: "20. Valid Parentheses",
    description: "Given a string `s` containing just the characters `'('`, `')'`, `'{'`, `'}'`, `'['` and `']'`, determine if the input string is valid.\n\nAn input string is valid if:\n- Open brackets must be closed by the same type of brackets.\n- Open brackets must be closed in the correct order.",
    difficulty: "Easy",
    topic: "Stack",
    pattern: "Stack LIFO",
    companies: ["Google", "Meta", "Microsoft"],
    frequency: 5,
    tags: ["String", "Stack"],
    testCaseInput: `s = "()[]{}"`,
    testCaseOutput: "true",
    boilerplate: {
      javascript: `function isValid(s) {
  let stack = [];
  const map = { ')': '(', '}': '{', ']': '[' };
  for (let char of s) {
    if (char === '(' || char === '{' || char === '[') {
      stack.push(char);
    } else {
      if (stack.length === 0 || stack.pop() !== map[char]) {
        return false;
      }
    }
  }
  return stack.length === 0;
}`,
      python: `def isValid(s: str) -> bool:
    stack = []
    lookup = {')': '(', '}': '{', ']': '['}
    for char in s:
        if char in lookup.values():
            stack.append(char)
        elif char in lookup:
            if not stack or stack.pop() != lookup[char]:
                return False
    return len(stack) == 0`,
    },
  },
  {
    id: "kadane-max-sum",
    title: "53. Maximum Subarray Sum",
    description: "Given an integer array `nums`, find the contiguous subarray (containing at least one number) which has the largest sum and return its sum.",
    difficulty: "Medium",
    topic: "Array",
    pattern: "Kadane's / DP",
    companies: ["Google", "Amazon", "Meta", "Uber"],
    frequency: 4,
    tags: ["Array", "Dynamic Programming", "Divide and Conquer"],
    testCaseInput: "nums = [-2,1,-3,4,-1,2,1,-5,4]",
    testCaseOutput: "6 (Subarray: [4,-1,2,1])",
    boilerplate: {
      javascript: `function maxSubArray(nums) {
  let maxSoFar = nums[0];
  let currentSum = nums[0];
  for (let i = 1; i < nums.length; i++) {
    currentSum = Math.max(nums[i], currentSum + nums[i]);
    maxSoFar = Math.max(maxSoFar, currentSum);
  }
  return maxSoFar;
}`,
      python: `def maxSubArray(nums: list[int]) -> int:
    max_so_far = nums[0]
    curr_sum = nums[0]
    for i in range(1, len(nums)):
        curr_sum = max(nums[i], curr_sum + nums[i])
        max_so_far = max(max_so_far, curr_sum)
    return max_so_far`,
    },
  },
  {
    id: "sliding-window-longest",
    title: "3. Longest Substring Without Repeating Characters",
    description: "Given a string `s`, find the length of the longest substring without repeating characters.\n\nA substring is a contiguous non-empty sequence of characters within a string.",
    difficulty: "Medium",
    topic: "Sliding Window",
    pattern: "Sliding Window Variable",
    companies: ["Google", "Amazon", "Meta", "Microsoft", "Uber"],
    frequency: 5,
    tags: ["Hash Table", "String", "Sliding Window"],
    testCaseInput: `s = "abcabcbb"`,
    testCaseOutput: "3 (Substring: \"abc\")",
    boilerplate: {
      javascript: `function lengthOfLongestSubstring(s) {
  let set = new Set();
  let left = 0, maxLength = 0;
  for (let right = 0; right < s.length; right++) {
    while (set.has(s[right])) {
      set.delete(s[left]);
      left++;
    }
    set.add(s[right]);
    maxLength = Math.max(maxLength, right - left + 1);
  }
  return maxLength;
}`,
      python: `def lengthOfLongestSubstring(s: str) -> int:
    char_set = set()
    left = 0
    max_len = 0
    for right in range(len(s)):
        while s[right] in char_set:
            char_set.remove(s[left])
            left += 1
        char_set.add(s[right])
        max_len = max(max_len, right - left + 1)
    return max_len`,
    },
  },
  {
    id: "course-schedule",
    title: "207. Course Schedule",
    description: "There are a total of `numCourses` courses you have to take, labeled from `0` to `numCourses - 1`. You are given an array `prerequisites` where `prerequisites[i] = [ai, bi]` indicates that you must take course `bi` first if you want to take course `ai`.\n\nReturn `true` if you can finish all courses. Otherwise, return `false`.",
    difficulty: "Medium",
    topic: "Graph",
    pattern: "Topological Sort / DFS Cycle",
    companies: ["Google", "Amazon", "Meta", "Microsoft"],
    frequency: 4,
    tags: ["Depth-First Search", "Breadth-First Search", "Graph", "Topological Sort"],
    testCaseInput: "numCourses = 2, prerequisites = [[1,0]]",
    testCaseOutput: "true (No cyclic dependencies exist)",
    boilerplate: {
      javascript: `function canFinish(numCourses, prerequisites) {
  const adj = Array(numCourses).fill(0).map(() => []);
  const visited = Array(numCourses).fill(0); // 0=unvisited, 1=visiting, 2=visited
  
  for (let [course, pre] of prerequisites) {
    adj[pre].push(course);
  }
  
  function hasCycle(node) {
    if (visited[node] === 1) return true; // Found cycle
    if (visited[node] === 2) return false;
    
    visited[node] = 1;
    for (let neighbor of adj[node]) {
      if (hasCycle(neighbor)) return true;
    }
    visited[node] = 2;
    return false;
  }
  
  for (let i = 0; i < numCourses; i++) {
    if (hasCycle(i)) return false;
  }
  return true;
}`,
      python: `def canFinish(numCourses: int, prerequisites: list[list[int]]) -> bool:
    adj = {i: [] for i in range(numCourses)}
    for course, pre in prerequisites:
        adj[pre].append(course)
        
    visitedState = [0] * numCourses # 0=unvisited, 1=visiting, 2=completed
    
    def hasCycle(node):
        if visitedState[node] == 1:
            return True
        if visitedState[node] == 2:
            return False
            
        visitedState[node] = 1
        for neighbor in adj[node]:
            if hasCycle(neighbor):
                return True
        visitedState[node] = 2
        return False
        
    for i in range(numCourses):
        if hasCycle(i):
            return False
    return True`,
    },
  },
  {
    id: "coin-change",
    title: "322. Coin Change",
    description: "You are given an integer array `coins` representing coins of different denominations and an integer `amount` representing a total amount of money.\n\nReturn the fewest number of coins that you need to make up that amount. If that amount of money cannot be made up by any combination of the coins, return `-1`.\n\nYou may assume that you have an infinite number of each kind of coin.",
    difficulty: "Medium",
    topic: "DP",
    pattern: "Tabulation / Knapsack-like",
    companies: ["Meta", "Amazon", "Uber", "Microsoft"],
    frequency: 4,
    tags: ["Array", "Dynamic Programming", "Breadth-First Search"],
    testCaseInput: "coins = [1,2,5], amount = 11",
    testCaseOutput: "3 (5 + 5 + 1)",
    boilerplate: {
      javascript: `function coinChange(coins, amount) {
  let dp = Array(amount + 1).fill(Infinity);
  dp[0] = 0;
  for (let i = 1; i <= amount; i++) {
    for (let coin of coins) {
      if (i - coin >= 0) {
        dp[i] = Math.min(dp[i], dp[i - coin] + 1);
      }
    }
  }
  return dp[amount] === Infinity ? -1 : dp[amount];
}`,
      python: `def coinChange(coins: list[int], amount: int) -> int:
    dp = [float('inf')] * (amount + 1)
    dp[0] = 0
    for i in range(1, amount + 1):
        for coin in coins:
            if i - coin >= 0:
                dp[i] = min(dp[i], dp[i - coin] + 1)
    return dp[amount] if dp[amount] != float('inf') else -1`,
    },
  },
  {
    id: "single-number",
    title: "136. Single Number",
    description: "Given a non-empty array of integers `nums`, every element appears twice except for one. Find that single one.\n\nYou must implement a solution with a linear runtime complexity and use only constant extra space.",
    difficulty: "Easy",
    topic: "Bit Manipulation",
    pattern: "XOR Trick",
    companies: ["Amazon", "Google", "Meta"],
    frequency: 4,
    tags: ["Array", "Bit Manipulation"],
    testCaseInput: "nums = [4,1,2,1,2]",
    testCaseOutput: "4",
    boilerplate: {
      javascript: `function singleNumber(nums) {
  let result = 0;
  for (let num of nums) {
    result ^= num; // XOR cancels out duplicate numbers!
  }
  return result;
}`,
      python: `def singleNumber(nums: list[int]) -> int:
    result = 0
    for num in nums:
        result ^= num
    return result`,
    },
  },
];
