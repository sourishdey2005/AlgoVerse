export interface CodeTemplate {
  javascript: string;
  c: string;
  cpp: string;
  java: string;
  python: string;
  go: string;
}

export const CODE_TEMPLATES: Record<string, CodeTemplate> = {
  "bubble-sort": {
    javascript: `function bubbleSort(arr) {
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
    c: `void bubbleSort(int arr[], int n) {
  for (int i = 0; i < n; i++) {
    bool swapped = false;
    for (int j = 0; j < n - i - 1; j++) {
      if (arr[j] > arr[j + 1]) {
        // Swap elements
        int temp = arr[j];
        arr[j] = arr[j + 1];
        arr[j + 1] = temp;
        swapped = true;
      }
    }
    if (!swapped) break;
  }
}`,
    cpp: `void bubbleSort(std::vector<int>& arr) {
  int n = arr.size();
  for (int i = 0; i < n; i++) {
    bool swapped = false;
    for (int j = 0; j < n - i - 1; j++) {
      if (arr[j] > arr[j + 1]) {
        // Swap elements
        int temp = arr[j];
        arr[j] = arr[j + 1];
        arr[j + 1] = temp;
        swapped = true;
      }
    }
    if (!swapped) break;
  }
}`,
    java: `public void bubbleSort(int[] arr) {
  int n = arr.length;
  for (int i = 0; i < n; i++) {
    boolean swapped = false;
    for (int j = 0; j < n - i - 1; j++) {
      if (arr[j] > arr[j + 1]) {
        // Swap elements
        int temp = arr[j];
        arr[j] = arr[j + 1];
        arr[j + 1] = temp;
        swapped = true;
      }
    }
    if (!swapped) break;
  }
}`,
    python: `def bubble_sort(arr):
    n = len(arr)
    for i in range(n):
        swapped = False
        for j in range(0, n - i - 1):
            if arr[j] > arr[j + 1]:
                # Swap elements
                temp = arr[j]
                arr[j] = arr[j + 1]
                arr[j + 1] = temp
                swapped = True
        if not swapped:
            break
    return arr`,
    go: `func bubbleSort(arr []int) []int {
	n := len(arr)
	for i := 0; i < n; i++ {
		swapped := false
		for j := 0; j < n-i-1; j++ {
			if arr[j] > arr[j+1] {
				// Swap elements
				temp := arr[j]
				arr[j] = arr[j+1]
				arr[j+1] = temp
				swapped = true
			}
		}
		if !swapped {
			break
		}
	}
	return arr
}`
  },
  "quick-sort": {
    javascript: `function partition(arr, low, high) {
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
    c: `int partition(int arr[], int low, int high) {
  int pivot = arr[low];
  int i = low - 1;
  int j = high + 1;
  while (1) {
    do { i++; } while (arr[i] < pivot);
    do { j--; } while (arr[j] > pivot);
    if (i >= j) return j;
    swap(&arr[i], &arr[j]);
  }
}

void quickSort(int arr[], int low, int high) {
  if (low < high) {
    int p = partition(arr, low, high);
    quickSort(arr, low, p);
    quickSort(arr, p + 1, high);
  }
}`,
    cpp: `int partition(std::vector<int>& arr, int low, int high) {
  int pivot = arr[low];
  int i = low - 1;
  int j = high + 1;
  while (true) {
    do { i++; } while (arr[i] < pivot);
    do { j--; } while (arr[j] > pivot);
    if (i >= j) return j;
    std::swap(arr[i], arr[j]);
  }
}

void quickSort(std::vector<int>& arr, int low, int high) {
  if (low < high) {
    int p = partition(arr, low, high);
    quickSort(arr, low, p);
    quickSort(arr, p + 1, high);
  }
}`,
    java: `int partition(int[] arr, int low, int high) {
  int pivot = arr[low];
  int i = low - 1;
  int j = high + 1;
  while (true) {
    do { i++; } while (arr[i] < pivot);
    do { j--; } while (arr[j] > pivot);
    if (i >= j) return j;
    int temp = arr[i];
    arr[i] = arr[j];
    arr[j] = temp;
  }
}

void quickSort(int[] arr, int low, int high) {
  if (low < high) {
    int p = partition(arr, low, high);
    quickSort(arr, low, p);
    quickSort(arr, p + 1, high);
  }
}`,
    python: `def partition(arr, low, high):
    pivot = arr[low]
    i = low - 1
    j = high + 1
    while True:
        while True:
            i += 1
            if arr[i] >= pivot: break
        while True:
            j -= 1
            if arr[j] <= pivot: break
        if i >= j:
            return j
        arr[i], arr[j] = arr[j], arr[i]

def quick_sort(arr, low, high):
    if low < high:
        p = partition(arr, low, high)
        quick_sort(arr, low, p)
        quick_sort(arr, p + 1, high)`,
    go: `func partition(arr []int, low, high int) int {
	pivot := arr[low]
	i := low - 1
	j := high + 1
	for {
		for {
			i++
			if arr[i] >= pivot { break }
		}
		for {
			j--
			if arr[j] <= pivot { break }
		}
		if i >= j {
			return j
		}
		arr[i], arr[j] = arr[j], arr[i]
	}
}

func quickSort(arr []int, low, high int) {
	if low < high {
		p := partition(arr, low, high)
		quickSort(arr, low, p)
		quickSort(arr, p+1, high)
	}
}`
  },
  "merge-sort": {
    javascript: `function merge(arr, l, m, r) {
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
    c: `void merge(int arr[], int l, int m, int r) {
  int n1 = m - l + 1;
  int n2 = r - m;
  int L[n1], R[n2];
  for (int i = 0; i < n1; i++) L[i] = arr[l + i];
  for (int j = 0; j < n2; j++) R[j] = arr[m + 1 + j];
  int i = 0, j = 0, k = l;
  while (i < n1 && j < n2) {
    if (L[i] <= R[j]) {
      arr[k++] = L[i++];
    } else {
      arr[k++] = R[j++];
    }
  }
  while (i < n1) arr[k++] = L[i++];
  while (j < n2) arr[k++] = R[j++];
}

void mergeSort(int arr[], int l, int r) {
  if (l < r) {
    int m = l + (r - l) / 2;
    mergeSort(arr, l, m);
    mergeSort(arr, m + 1, r);
    merge(arr, l, m, r);
  }
}`,
    cpp: `void merge(std::vector<int>& arr, int l, int m, int r) {
  int n1 = m - l + 1;
  int n2 = r - m;
  std::vector<int> L(arr.begin() + l, arr.begin() + m + 1);
  std::vector<int> R(arr.begin() + m + 1, arr.begin() + r + 1);
  int i = 0, j = 0, k = l;
  while (i < n1 && j < n2) {
    if (L[i] <= R[j]) {
      arr[k++] = L[i++];
    } else {
      arr[k++] = R[j++];
    }
  }
  while (i < n1) arr[k++] = L[i++];
  while (j < n2) arr[k++] = R[j++];
}

void mergeSort(std::vector<int>& arr, int l, int r) {
  if (l < r) {
    int m = l + (r - l) / 2;
    mergeSort(arr, l, m);
    mergeSort(arr, m + 1, r);
    merge(arr, l, m, r);
  }
}`,
    java: `void merge(int[] arr, int l, int m, int r) {
  int n1 = m - l + 1;
  int n2 = r - m;
  int[] L = new int[n1];
  int[] R = new int[n2];
  System.arraycopy(arr, l, L, 0, n1);
  System.arraycopy(arr, m + 1, R, 0, n2);
  int i = 0, j = 0, k = l;
  while (i < n1 && j < n2) {
    if (L[i] <= R[j]) {
      arr[k++] = L[i++];
    } else {
      arr[k++] = R[j++];
    }
  }
  while (i < n1) arr[k++] = L[i++];
  while (j < n2) arr[k++] = R[j++];
}

void mergeSort(int[] arr, int l, int r) {
  if (l < r) {
    int m = l + (r - l) / 2;
    mergeSort(arr, l, m);
    mergeSort(arr, m + 1, r);
    merge(arr, l, m, r);
  }
}`,
    python: `def merge(arr, l, m, r):
    n1 = m - l + 1
    n2 = r - m
    L = arr[l:m+1]
    R = arr[m+1:r+1]
    i = 0; j = 0; k = l
    while i < n1 and j < n2:
        if L[i] <= R[j]:
            arr[k] = L[i]
            i += 1
        else:
            arr[k] = R[j]
            j += 1
        k += 1
    while i < n1:
        arr[k] = L[i]; i += 1; k += 1
    while j < n2:
        arr[k] = R[j]; j += 1; k += 1

def merge_sort(arr, l, r):
    if l < r:
        m = (l + r) // 2
        merge_sort(arr, l, m)
        merge_sort(arr, m + 1, r)
        merge(arr, l, m, r)`,
    go: `func merge(arr []int, l, m, r int) {
	n1 := m - l + 1
	n2 := r - m
	L := make([]int, n1)
	R := make([]int, n2)
	copy(L, arr[l:m+1])
	copy(R, arr[m+1:r+1])
	i, j, k := 0, 0, l
	for i < n1 && j < n2 {
		if L[i] <= R[j] {
			arr[k] = L[i]
			i++
		} else {
			arr[k] = R[j]
			j++
		}
		k++
	}
	for i < n1 {
		arr[k] = L[i]
		i++; k++
	}
	for j < n2 {
		arr[k] = R[j]
		j++; k++
	}
}

func mergeSort(arr []int, l, r int) {
	if l < r {
		m := (l + r) / 2
		mergeSort(arr, l, m)
		mergeSort(arr, m+1, r)
		merge(arr, l, m, r)
	}
}`
  },
  "binary-search": {
    javascript: `function binarySearch(arr, target) {
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
    c: `int binarySearch(int arr[], int n, int target) {
  int low = 0;
  int high = n - 1;
  while (low <= high) {
    int mid = low + (high - low) / 2;
    if (arr[mid] == target) {
      return mid; // Found target!
    } else if (arr[mid] < target) {
      low = mid + 1;
    } else {
      high = mid - 1;
    }
  }
  return -1; // Not found
}`,
    cpp: `int binarySearch(const std::vector<int>& arr, int target) {
  int low = 0;
  int high = arr.size() - 1;
  while (low <= high) {
    int mid = low + (high - low) / 2;
    if (arr[mid] == target) {
      return mid; // Found target!
    } else if (arr[mid] < target) {
      low = mid + 1;
    } else {
      high = mid - 1;
    }
  }
  return -1; // Not found
}`,
    java: `public int binarySearch(int[] arr, int target) {
  int low = 0;
  int high = arr.length - 1;
  while (low <= high) {
    int mid = low + (high - low) / 2;
    if (arr[mid] == target) {
      return mid; // Found target!
    } else if (arr[mid] < target) {
      low = mid + 1;
    } else {
      high = mid - 1;
    }
  }
  return -1; // Not found
}`,
    python: `def binary_search(arr, target):
    low = 0
    high = len(arr) - 1
    while low <= high:
        mid = (low + high) // 2
        if arr[mid] == target:
            return mid  # Found target!
        elif arr[mid] < target:
            low = mid + 1
        else:
            high = mid - 1
    return -1  # Not found`,
    go: `func binarySearch(arr []int, target int) int {
	low := 0
	high := len(arr) - 1
	for low <= high {
		mid := low + (high-low)/2
		if arr[mid] == target {
			return mid // Found target!
		} else if arr[mid] < target {
			low = mid + 1
		} else {
			high = mid - 1
		}
	}
	return -1 // Not found
}`
  },
  "kadane": {
    javascript: `function maxSubArray(arr) {
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
  return maxSoFar;
}`,
    c: `int maxSubArray(int arr[], int n) {
  int maxSoFar = arr[0];
  int maxEndingHere = arr[0];
  for (int i = 1; i < n; i++) {
    if (arr[i] > maxEndingHere + arr[i]) {
      maxEndingHere = arr[i];
    } else {
      maxEndingHere = maxEndingHere + arr[i];
    }
    if (maxEndingHere > maxSoFar) {
      maxSoFar = maxEndingHere;
    }
  }
  return maxSoFar;
}`,
    cpp: `int maxSubArray(const std::vector<int>& arr) {
  int maxSoFar = arr[0];
  int maxEndingHere = arr[0];
  for (size_t i = 1; i < arr.size(); i++) {
    maxEndingHere = std::max(arr[i], maxEndingHere + arr[i]);
    maxSoFar = std::max(maxSoFar, maxEndingHere);
  }
  return maxSoFar;
}`,
    java: `public int maxSubArray(int[] arr) {
  int maxSoFar = arr[0];
  int maxEndingHere = arr[0];
  for (int i = 1; i < arr.length; i++) {
    maxEndingHere = Math.max(arr[i], maxEndingHere + arr[i]);
    maxSoFar = Math.max(maxSoFar, maxEndingHere);
  }
  return maxSoFar;
}`,
    python: `def max_sub_array(arr):
    max_so_far = arr[0]
    max_ending_here = arr[0]
    for i in range(1, len(arr)):
        max_ending_here = max(arr[i], max_ending_here + arr[i])
        max_so_far = max(max_so_far, max_ending_here)
    return max_so_far`,
    go: `func maxSubArray(arr []int) int {
	maxSoFar := arr[0]
	maxEndingHere := arr[0]
	for i := 1; i < len(arr); i++ {
		if arr[i] > maxEndingHere+arr[i] {
			maxEndingHere = arr[i]
		} else {
			maxEndingHere = maxEndingHere + arr[i]
		}
		if maxEndingHere > maxSoFar {
			maxSoFar = maxEndingHere
		}
	}
	return maxSoFar
}`
  },
  "sliding-window-max": {
    javascript: `function maxSubarrayK(arr, k) {
  let windowSum = 0;
  let maxSum = 0;
  for (let i = 0; i < k; i++) {
    windowSum += arr[i];
  }
  maxSum = windowSum;

  for (let i = k; i < arr.length; i++) {
    windowSum += arr[i] - arr[i - k];
    if (windowSum > maxSum) {
      maxSum = windowSum;
    }
  }
  return maxSum;
}`,
    c: `int maxSubarrayK(int arr[], int n, int k) {
  int windowSum = 0;
  int maxSum = 0;
  for (int i = 0; i < k; i++) {
    windowSum += arr[i];
  }
  maxSum = windowSum;

  for (int i = k; i < n; i++) {
    windowSum += arr[i] - arr[i - k];
    if (windowSum > maxSum) {
      maxSum = windowSum;
    }
  }
  return maxSum;
}`,
    cpp: `int maxSubarrayK(const std::vector<int>& arr, int k) {
  int windowSum = 0;
  for (int i = 0; i < k; i++) {
    windowSum += arr[i];
  }
  int maxSum = windowSum;

  for (size_t i = k; i < arr.size(); i++) {
    windowSum += arr[i] - arr[i - k];
    maxSum = std::max(maxSum, windowSum);
  }
  return maxSum;
}`,
    java: `public int maxSubarrayK(int[] arr, int k) {
  int windowSum = 0;
  for (int i = 0; i < k; i++) {
    windowSum += arr[i];
  }
  int maxSum = windowSum;

  for (int i = k; i < arr.length; i++) {
    windowSum += arr[i] - arr[i - k];
    maxSum = Math.max(maxSum, windowSum);
  }
  return maxSum;
}`,
    python: `def max_subarray_k(arr, k):
    window_sum = sum(arr[:k])
    max_sum = window_sum
    for i in range(k, len(arr)):
        window_sum += arr[i] - arr[i - k]
        max_sum = max(max_sum, window_sum)
    return max_sum`,
    go: `func maxSubarrayK(arr []int, k int) int {
	windowSum := 0
	for i := 0; i < k; i++ {
		windowSum += arr[i]
	}
	maxSum := windowSum

	for i := k; i < len(arr); i++ {
		windowSum += arr[i] - arr[i-k]
		if windowSum > maxSum {
			maxSum = windowSum
		}
	}
	return maxSum
}`
  },
  "linked-list-ops": {
    javascript: `function reverseList(head) {
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
    c: `struct Node {
  int data;
  struct Node* next;
};

struct Node* reverseList(struct Node* head) {
  struct Node* prev = NULL;
  struct Node* current = head;
  struct Node* next = NULL;
  while (current != NULL) {
    next = current->next;
    current->next = prev;
    prev = current;
    current = next;
  }
  return prev;
}`,
    cpp: `struct Node {
  int data;
  Node* next;
};

Node* reverseList(Node* head) {
  Node* prev = nullptr;
  Node* current = head;
  Node* next = nullptr;
  while (current != nullptr) {
    next = current->next;
    current->next = prev;
    prev = current;
    current = next;
  }
  return prev;
}`,
    java: `class Node {
  int data;
  Node next;
}

public Node reverseList(Node head) {
  Node prev = null;
  Node current = head;
  Node next = null;
  while (current != null) {
    next = current.next;
    current.next = prev;
    prev = current;
    current = next;
  }
  return prev;
}`,
    python: `class Node:
    def __init__(self, val=0, next=None):
        self.val = val
        self.next = next

def reverse_list(head):
    prev = None
    current = head
    while current:
        nxt = current.next
        current.next = prev
        prev = current
        current = nxt
    return prev`,
    go: `type Node struct {
	Val  int
	Next *Node
}

func reverseList(head *Node) *Node {
	var prev *Node = nil
	current := head
	for current != nil {
		next := current.Next
		current.Next = prev
		prev = current
		current = next
	}
	return prev
}`
  },
  "stack-valid-parentheses": {
    javascript: `function isValid(str) {
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
    c: `bool isValid(char* str) {
  int len = strlen(str);
  char* stack = (char*)malloc(len);
  int top = -1;
  for (int i = 0; i < len; i++) {
    char c = str[i];
    if (c == '(' || c == '{' || c == '[') {
      stack[++top] = c;
    } else if (c == ')' || c == '}' || c == ']') {
      if (top == -1) return false;
      char popped = stack[top--];
      if (c == ')' && popped != '(') return false;
      if (c == '}' && popped != '{') return false;
      if (c == ']' && popped != '[') return false;
    }
  }
  return top == -1;
}`,
    cpp: `bool isValid(std::string str) {
  std::stack<char> s;
  for (char c : str) {
    if (c == '(' || c == '{' || c == '[') {
      s.push(c);
    } else {
      if (s.empty()) return false;
      char top = s.top();
      s.pop();
      if (c == ')' && top != '(') return false;
      if (c == '}' && top != '{') return false;
      if (c == ']' && top != ']') return false;
    }
  }
  return s.empty();
}`,
    java: `public boolean isValid(String str) {
  Stack<Character> stack = new Stack<>();
  for (char c : str.toCharArray()) {
    if (c == '(' || c == '{' || c == '[') {
      stack.push(c);
    } else {
      if (stack.isEmpty()) return false;
      char top = stack.pop();
      if (c == ')' && top != '(') return false;
      if (c == '}' && top != '{') return false;
      if (c == ']' && top != '[') return false;
    }
  }
  return stack.isEmpty();
}`,
    python: `def is_valid(str):
    stack = []
    mapping = {")": "(", "}": "{", "]": "["}
    for char in str:
        if char in mapping.values():
            stack.append(char)
        elif char in mapping.keys():
            if not stack or stack.pop() != mapping[char]:
                return False
    return len(stack) == 0`,
    go: `func isValid(str string) bool {
	stack := []rune{}
	mapping := map[rune]rune{')': '(', '}': '{', ']': '['}
	for _, char := range str {
		if char == '(' || char == '{' || char == '[' {
			stack = append(stack, char)
		} else if match, ok := mapping[char]; ok {
			if len(stack) == 0 { return false }
			top := stack[len(stack)-1]
			stack = stack[:len(stack)-1]
			if top != match { return false }
		}
	}
	return len(stack) == 0
}`
  },
  "binary-search-tree": {
    javascript: `class Node {
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
    c: `struct Node {
  int value;
  struct Node* left;
  struct Node* right;
};

struct Node* insertBST(struct Node* root, int val) {
  if (root == NULL) {
    struct Node* temp = (struct Node*)malloc(sizeof(struct Node));
    temp->value = val;
    temp->left = temp->right = NULL;
    return temp;
  }
  if (val < root->value) {
    root->left = insertBST(root->left, val);
  } else {
    root->right = insertBST(root->right, val);
  }
  return root;
}`,
    cpp: `struct Node {
  int value;
  Node* left = nullptr;
  Node* right = nullptr;
};

Node* insertBST(Node* root, int val) {
  if (root == nullptr) {
    return new Node{val, nullptr, nullptr};
  }
  if (val < root->value) {
    root->left = insertBST(root->left, val);
  } else {
    root->right = insertBST(root->right, val);
  }
  return root;
}`,
    java: `class Node {
  int value;
  Node left, right;
  Node(int val) { value = val; }
}

public Node insertBST(Node root, int val) {
  if (root == null) return new Node(val);
  if (val < root.value) {
    root.left = insertBST(root.left, val);
  } else {
    root.right = insertBST(root.right, val);
  }
  return root;
}`,
    python: `class Node:
    def __init__(self, val):
        self.value = val
        self.left = None
        self.right = None

def insert_bst(root, val):
    if root is None:
        return Node(val)
    if val < root.value:
        root.left = insert_bst(root.left, val)
    else:
        root.right = insert_bst(root.right, val)
    return root`,
    go: `type Node struct {
	Value int
	Left  *Node
	Right *Node
}

func insertBST(root *Node, val int) *Node {
	if root == nil {
		return &Node{Value: val}
	}
	if val < root.Value {
		root.Left = insertBST(root.Left, val)
	} else {
		root.Right = insertBST(root.Right, val)
	}
	return root
}`
  },
  "dijkstra": {
    javascript: `function dijkstra(graph, src) {
  let distances = {};
  for (let node of graph.nodes) {
    distances[node.id] = Infinity;
  }
  distances[src] = 0;
  let visited = new Set();
  
  while (visited.size < graph.nodes.length) {
    let u = getMinDistanceNode(distances, visited);
    if (u === null) break;
    visited.add(u);
    
    for (let neighbor of graph.adj[u]) {
      let alt = distances[u] + neighbor.weight;
      if (alt < distances[neighbor.id]) {
        distances[neighbor.id] = alt;
      }
    }
  }
  return distances;
}`,
    c: `void dijkstra(int graph[V][V], int src, int dist[V]) {
  bool visited[V] = {false};
  for (int i = 0; i < V; i++) dist[i] = INT_MAX;
  dist[src] = 0;
  
  for (int count = 0; count < V - 1; count++) {
    int u = minDistance(dist, visited);
    visited[u] = true;
    for (int v = 0; v < V; v++) {
      if (!visited[v] && graph[u][v] && dist[u] != INT_MAX && dist[u] + graph[u][v] < dist[v]) {
        dist[v] = dist[u] + graph[u][v];
      }
    }
  }
}`,
    cpp: `std::vector<int> dijkstra(const std::vector<std::vector<std::pair<int, int>>>& graph, int src) {
  std::vector<int> dist(graph.size(), 1e9);
  std::priority_queue<std::pair<int, int>, std::vector<std::pair<int, int>>, std::greater<>> pq;
  dist[src] = 0;
  pq.push({0, src});
  
  while (!pq.empty()) {
    auto [d, u] = pq.top();
    pq.pop();
    if (d > dist[u]) continue;
    for (auto [v, weight] : graph[u]) {
      if (dist[u] + weight < dist[v]) {
        dist[v] = dist[u] + weight;
        pq.push({dist[v], v});
      }
    }
  }
  return dist;
}`,
    java: `public int[] dijkstra(int[][] graph, int src) {
  int V = graph.length;
  int[] dist = new int[V];
  boolean[] visited = new boolean[V];
  Arrays.fill(dist, Integer.MAX_VALUE);
  dist[src] = 0;
  for (int count = 0; count < V - 1; count++) {
    int u = findMinDistance(dist, visited);
    visited[u] = true;
    for (int v = 0; v < V; v++) {
      if (!visited[v] && graph[u][v] != 0 && dist[u] != Integer.MAX_VALUE && dist[u] + graph[u][v] < dist[v]) {
        dist[v] = dist[u] + graph[u][v];
      }
    }
  }
  return dist;
}`,
    python: `import heapq

def dijkstra(graph, src):
    distances = {node: float('inf') for node in graph}
    distances[src] = 0
    pq = [(0, src)]
    while pq:
        current_distance, current_node = heapq.heappop(pq)
        if current_distance > distances[current_node]:
            continue
        for neighbor, weight in graph[current_node].items():
            distance = current_distance + weight
            if distance < distances[neighbor]:
                distances[neighbor] = distance
                heapq.heappush(pq, (distance, neighbor))
    return distances`,
    go: `func dijkstra(graph map[int][]Edge, src, V int) []int {
	dist := make([]int, V)
	for i := range dist { dist[i] = 1e9 }
	dist[src] = 0
	pq := &PriorityQueue{}
	heap.Push(pq, Item{node: src, priority: 0})
	
	for pq.Len() > 0 {
		curr := heap.Pop(pq).(Item)
		u := curr.node
		if curr.priority > dist[u] { continue }
		for _, edge := range graph[u] {
			if dist[u]+edge.Weight < dist[edge.To] {
				dist[edge.To] = dist[u] + edge.Weight
				heap.Push(pq, Item{node: edge.To, priority: dist[edge.To]})
			}
		}
	}
	return dist
}`
  },
  "knapsack": {
    javascript: `function knapsack(weights, values, capacity) {
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
    c: `int knapsack(int weights[], int values[], int N, int capacity) {
  int dp[N + 1][capacity + 1];
  for (int i = 0; i <= N; i++) {
    for (int w = 0; w <= capacity; w++) {
      if (i == 0 || w == 0) dp[i][w] = 0;
      else if (weights[i-1] <= w) {
        dp[i][w] = max(dp[i-1][w], values[i-1] + dp[i-1][w - weights[i-1]]);
      } else {
        dp[i][w] = dp[i-1][w];
      }
    }
  }
  return dp[N][capacity];
}`,
    cpp: `int knapsack(const std::vector<int>& weights, const std::vector<int>& values, int capacity) {
  int N = weights.size();
  std::vector<std::vector<int>> dp(N + 1, std::vector<int>(capacity + 1, 0));
  for (int i = 1; i <= N; i++) {
    for (int w = 1; w <= capacity; w++) {
      if (weights[i-1] <= w) {
        dp[i][w] = std::max(dp[i-1][w], values[i-1] + dp[i-1][w - weights[i-1]]);
      } else {
        dp[i][w] = dp[i-1][w];
      }
    }
  }
  return dp[N][capacity];
}`,
    java: `public int knapsack(int[] weights, int[] values, int capacity) {
  int N = weights.length;
  int[][] dp = new int[N + 1][capacity + 1];
  for (int i = 1; i <= N; i++) {
    for (int w = 1; w <= capacity; w++) {
      if (weights[i-1] <= w) {
        dp[i][w] = Math.max(dp[i-1][w], values[i-1] + dp[i-1][w - weights[i-1]]);
      } else {
        dp[i][w] = dp[i-1][w];
      }
    }
  }
  return dp[N][capacity];
}`,
    python: `def knapsack(weights, values, capacity):
    N = len(weights)
    dp = [[0] * (capacity + 1) for _ in range(N + 1)]
    for i in range(1, N + 1):
        for w in range(1, capacity + 1):
            if weights[i-1] <= w:
                dp[i][w] = max(dp[i-1][w], values[i-1] + dp[i-1][w - weights[i-1]])
            else:
                dp[i][w] = dp[i-1][w]
    return dp[N][capacity]`,
    go: `func knapsack(weights, values []int, capacity int) int {
	N := len(weights)
	dp := make([][]int, N+1)
	for i := range dp {
		dp[i] = make([]int, capacity+1)
	}
	for i := 1; i <= N; i++ {
		for w := 1; w <= capacity; w++ {
			if weights[i-1] <= w {
				dp[i][w] = max(dp[i-1][w], values[i-1]+dp[i-1][w-weights[i-1]])
			} else {
				dp[i][w] = dp[i-1][w]
			}
		}
	}
	return dp[N][capacity]
}`
  },
  "n-queens": {
    javascript: `function solveNQueens(n) {
  let board = Array(n).fill(null).map(() => Array(n).fill('.'));
  function backtrack(col) {
    if (col === n) return true;
    for (let i = 0; i < n; i++) {
      if (isSafe(board, i, col)) {
        board[i][col] = 'Q';
        if (backtrack(col + 1)) return true;
        board[i][col] = '.'; // Backtrack
      }
    }
    return false;
  }
  backtrack(0);
  return board;
}`,
    c: `bool solveNQueens(char board[N][N], int col) {
  if (col >= N) return true;
  for (int i = 0; i < N; i++) {
    if (isSafe(board, i, col)) {
      board[i][col] = 'Q';
      if (solveNQueens(board, col + 1)) return true;
      board[i][col] = '.';
    }
  }
  return false;
}`,
    cpp: `bool solveNQueens(std::vector<std::vector<char>>& board, int col) {
  int n = board.size();
  if (col >= n) return true;
  for (int i = 0; i < n; i++) {
    if (isSafe(board, i, col)) {
      board[i][col] = 'Q';
      if (solveNQueens(board, col + 1)) return true;
      board[i][col] = '.';
    }
  }
  return false;
}`,
    java: `public boolean solveNQueens(char[][] board, int col) {
  int n = board.length;
  if (col >= n) return true;
  for (int i = 0; i < n; i++) {
    if (isSafe(board, i, col)) {
      board[i][col] = 'Q';
      if (solveNQueens(board, col + 1)) return true;
      board[i][col] = '.';
    }
  }
  return false;
}`,
    python: `def solve_n_queens(board, col):
    n = len(board)
    if col >= n: return True
    for i in range(n):
        if is_safe(board, i, col):
            board[i][col] = 'Q'
            if solve_n_queens(board, col + 1):
                return True
            board[i][col] = '.'
    return False`,
    go: `func solveNQueens(board [][]rune, col int) bool {
	n := len(board)
	if col >= n { return true }
	for i := 0; i < n; i++ {
		if isSafe(board, i, col) {
			board[i][col] = 'Q'
			if solveNQueens(board, col+1) { return true }
			board[i][col] = '.'
		}
	}
	return false
}`
  },
  "bit-tricks": {
    javascript: `function bitwiseTricks(a, b) {
  let andResult = a & b;       // Intersection
  let orResult = a | b;        // Union
  let xorResult = a ^ b;       // Toggle / Symmetric diff
  let notA = ~a;               // Toggle all bits
  let leftShift = a << 1;     // Multiply A by 2
  let rightShift = a >> 1;    // Divide A by 2
  return { andResult, orResult, xorResult, notA, leftShift, rightShift };
}`,
    c: `struct BitResult bitwiseTricks(int a, int b) {
  struct BitResult res;
  res.andResult = a & b;
  res.orResult = a | b;
  res.xorResult = a ^ b;
  res.notA = ~a;
  res.leftShift = a << 1;
  res.rightShift = a >> 1;
  return res;
}`,
    cpp: `struct BitResult {
  int andResult, orResult, xorResult, notA, leftShift, rightShift;
};
BitResult bitwiseTricks(int a, int b) {
  return { a & b, a | b, a ^ b, ~a, a << 1, a >> 1 };
}`,
    java: `public class BitResult {
  int andResult, orResult, xorResult, notA, leftShift, rightShift;
}
public BitResult bitwiseTricks(int a, int b) {
  BitResult res = new BitResult();
  res.andResult = a & b;
  res.orResult = a | b;
  res.xorResult = a ^ b;
  res.notA = ~a;
  res.leftShift = a << 1;
  res.rightShift = a >> 1;
  return res;
}`,
    python: `def bitwise_tricks(a, b):
    and_result = a & b
    or_result = a | b
    xor_result = a ^ b
    not_a = ~a
    left_shift = a << 1
    right_shift = a >> 1
    return and_result, or_result, xor_result, not_a, left_shift, right_shift`,
    go: `func bitwiseTricks(a, b int) (int, int, int, int, int, int) {
	andResult := a & b
	orResult := a | b
	xorResult := a ^ b
	notA := ^a
	leftShift := a << 1
	rightShift := a >> 1
	return andResult, orResult, xorResult, notA, leftShift, rightShift
}`
  }
};
