import { CurriculumModule } from '../types';

export const LINEAR_MODULES: CurriculumModule[] = [
  {
    id: 'basics',
    number: 1,
    title: 'Foundations (C++ & Memory)',
    badge: 'Linear Scope 01',
    tagline: 'Variables, Loops, Functions, and Array Basics',
    description: 'Master how modern C++ manages basic variables, function call frames, pointer addressing, and foundational arrays before advancing to complex pointer chains.',
    complexity: {
      access: 'O(1)',
      search: 'O(1)',
      insertion: 'O(1)',
      deletion: 'O(1)',
      space: 'O(1)'
    },
    concepts: [
      'Variables, Primitive Types & Memory Layout',
      'Loops, Iteration & Conditionals in C++',
      'Functions & Call-Stack Mechanics',
      'Pointers (`int*`) & Dereferencing (`*ptr`)',
      'Time & Space Complexity Instincts (O(1), O(N))'
    ],
    cppSnippet: `// Modern C++ Memory Allocation
int stackVar = 42; // Fast stack frame
std::unique_ptr<int> heapPtr = std::make_unique<int>(100);

// Pointer arithmetic & memory step
int* rawPtr = &stackVar;
std::cout << "Address: " << rawPtr << ", Value: " << *rawPtr;`,
    iconName: 'Cpu',
    practicalApplication: 'Essential foundation for operating systems, high-frequency trading engines, and graphics programming.'
  },
  {
    id: 'array',
    number: 2,
    title: 'Static & Dynamic Arrays',
    badge: 'Contiguous Memory',
    tagline: '`std::vector`, Memory Doubling, and Two-Pointer Patterns',
    description: 'Explore contiguous memory blocks, hardware cache lines, amortization, dynamic resizing, and high-frequency algorithms like Sliding Window and Two-Pointer.',
    complexity: {
      access: 'O(1)',
      search: 'O(N)',
      insertion: 'O(N) / O(1) amortized',
      deletion: 'O(N)',
      space: 'O(N)'
    },
    concepts: [
      'Contiguous Memory Layout & Cache Hits',
      'Vector Capacity vs Size & Dynamic Growth',
      'Two-Pointer Technique (Left / Right convergence)',
      'Sliding Window Optimization (O(N²) -> O(N))',
      'Prefix Sums & Range Queries'
    ],
    cppSnippet: `// Dynamic Array with std::vector
std::vector<int> nums = {10, 20, 30, 40};
nums.reserve(10); // Avoid reallocations

// Two-Pointer In-Place Reverse
int left = 0, right = nums.size() - 1;
while (left < right) {
    std::swap(nums[left++], nums[right--]);
}`,
    iconName: 'Boxes',
    practicalApplication: 'Used in databases, matrix math for AI/ML tensors, and contiguous audio/video buffers.'
  },
  {
    id: 'linked-list',
    number: 3,
    title: 'Linked Lists (Singly & Doubly)',
    badge: 'Node-Based',
    tagline: 'Pointer Manipulation, Node Reversal, and Memory Chains',
    description: 'Break free from contiguous memory. Learn node-based architectures, pointer redirection, fast & slow runner pointers, and cycle detection without memory leaks.',
    complexity: {
      access: 'O(N)',
      search: 'O(N)',
      insertion: 'O(1) at head',
      deletion: 'O(1) at head',
      space: 'O(N)'
    },
    concepts: [
      'Singly Linked Lists (`ListNode* next`)',
      'Doubly Linked Lists (`prev` and `next` pointers)',
      'Circular Linked Lists & Cycle Detection (Floyd’s Tortoise & Hare)',
      'In-Place Reversal of Linked Lists',
      'Dummy Head Nodes & Pointer Safety'
    ],
    cppSnippet: `struct Node {
    int data;
    Node* next;
    explicit Node(int val) : data(val), next(nullptr) {}
};

// Iterative Reversal
Node* reverse(Node* head) {
    Node *prev = nullptr, *curr = head;
    while (curr) {
        Node* nextNode = curr->next;
        curr->next = prev;
        prev = curr;
        curr = nextNode;
    }
    return prev;
}`,
    iconName: 'GitFork',
    practicalApplication: 'Foundational for LRU Caches, Undo/Redo buffers in photo editors, and file system block chains.'
  },
  {
    id: 'stack',
    number: 4,
    title: 'Stacks (LIFO)',
    badge: 'Call Stack Master',
    tagline: 'Last-In First-Out, Parentheses Matching, and Monotonic Stacks',
    description: 'Master the Last-In First-Out structure that drives every function call in your computer. Conquer bracket validation, expression evaluation, and monotonic stacks.',
    complexity: {
      access: 'O(N)',
      search: 'O(N)',
      insertion: 'O(1) Push',
      deletion: 'O(1) Pop',
      space: 'O(N)'
    },
    concepts: [
      'LIFO Principle & C++ `std::stack`',
      'Function Call Stacks & Recursion Unwinding',
      'Valid Parentheses & Syntax Parsing',
      'Infix to Postfix Conversion',
      'Monotonic Stack (Next Greater Element in O(N))'
    ],
    cppSnippet: `// Monotonic Stack: Next Greater Element
std::vector<int> nextGreater(const std::vector<int>& arr) {
    int n = arr.size();
    std::vector<int> res(n, -1);
    std::stack<int> st; // stores indices

    for (int i = 0; i < n; ++i) {
        while (!st.empty() && arr[st.top()] < arr[i]) {
            res[st.top()] = arr[i];
            st.pop();
        }
        st.push(i);
    }
    return res;
}`,
    iconName: 'Layers',
    practicalApplication: 'Powers browser back/forward buttons, syntax compilers, call stack debuggers, and text undo trees.'
  },
  {
    id: 'queue',
    number: 5,
    title: 'Queues & Deques (FIFO)',
    badge: 'Asynchronous Buffers',
    tagline: 'First-In First-Out, Circular Buffers, and BFS Explorers',
    description: 'Discover asynchronous stream processing with First-In First-Out queues, double-ended queues (`std::deque`), circular ring buffers, and Breadth-First Search.',
    complexity: {
      access: 'O(N)',
      search: 'O(N)',
      insertion: 'O(1) Enqueue',
      deletion: 'O(1) Dequeue',
      space: 'O(N)'
    },
    concepts: [
      'FIFO Principle & `std::queue`',
      'Double-Ended Queue (`std::deque`) with O(1) front/back ops',
      'Circular Ring Buffer (Zero-allocation queues)',
      'Breadth-First Search (BFS) Level-Order Traversal',
      'Sliding Window Maximum using Monotonic Deque'
    ],
    cppSnippet: `// Breadth-First Queue Pattern
std::queue<int> q;
q.push(1); // Enqueue

while (!q.empty()) {
    int curr = q.front();
    q.pop(); // Dequeue O(1)
    
    // Process node and push neighbors
    // q.push(neighbor);
}`,
    iconName: 'ListOrdered',
    practicalApplication: 'Essential for OS CPU task scheduling, print queues, network packet routing, and message brokers (Kafka/RabbitMQ).'
  }
];

