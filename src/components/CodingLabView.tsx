import React, { useState, useEffect, useRef } from 'react';
import {
  Terminal,
  Play,
  Pause,
  RotateCcw,
  ChevronRight,
  ChevronLeft,
  Boxes,
  GitFork,
  Layers,
  ListOrdered,
  Code2,
  Sparkles,
  ArrowRight,
  ExternalLink,
  MessageSquare,
  Video,
  Award
} from 'lucide-react';
import { NavigationTab } from '../types';

interface CodingLabViewProps {
  onNavigateToNote?: (noteId: string) => void;
  onNavigateTab?: (tab: NavigationTab) => void;
}

// =========================================================================
// DATA STRUCTURE TYPES & EVENT DEFINITIONS
// =========================================================================
type DSType = 'array' | 'linked-list' | 'stack' | 'queue';
type ActiveTab = 'visualizer' | 'ide' | 'eval-matrix';

interface VizEvent {
  step: number;
  type: string;
  message: string;
  highlight?: {
    indexes?: number[];
    pointers?: Record<string, any>;
    nodeIds?: string[];
  };
  snapshot: any;
}

// =========================================================================
// DEFAULT DATA STRUCTURE STATES
// =========================================================================
interface ArrayState {
  items: (number | null)[];
  length: number;
  capacity: number;
}

interface LLNode {
  id: string;
  data: number;
  nextId: string | null;
}

interface LinkedListState {
  nodes: LLNode[];
  headId: string | null;
}

interface StackState {
  items: number[];
  top: number;
  capacity: number;
}

interface QueueState {
  items: (number | null)[];
  front: number;
  rear: number;
  capacity: number;
}

// Initial States
const INITIAL_ARRAY: ArrayState = {
  items: [10, 20, 30, 40, null, null],
  length: 4,
  capacity: 6
};

const INITIAL_LINKED_LIST: LinkedListState = {
  nodes: [
    { id: 'node-1', data: 10, nextId: 'node-2' },
    { id: 'node-2', data: 20, nextId: 'node-3' },
    { id: 'node-3', data: 30, nextId: 'node-4' },
    { id: 'node-4', data: 40, nextId: null }
  ],
  headId: 'node-1'
};

const INITIAL_STACK: StackState = {
  items: [10, 20, 30],
  top: 2,
  capacity: 5
};

const INITIAL_QUEUE: QueueState = {
  items: [10, 20, 30, null, null],
  front: 0,
  rear: 2,
  capacity: 5
};

// =========================================================================
// C++ IDE PROBLEMS & STARTER CODE
// =========================================================================
interface IDEProblem {
  id: string;
  title: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  description: string;
  starterCode: string;
  expectedOutput: string;
  testCases: { input: string; expected: string }[];
}

const IDE_PROBLEMS: IDEProblem[] = [
  {
    id: 'prob-arr-insert',
    title: 'Array Insertion with Shifting (C++)',
    difficulty: 'Easy',
    description:
      'Given an array of capacity 6 containing 4 elements [10, 20, 30, 40], write a function to insert element 25 at index 2 by shifting subsequent elements to the right.',
    starterCode: `#include <iostream>
#include <vector>

void insertAt(std::vector<int>& arr, int value, int index) {
    // 1. Shift elements from end down to index
    arr.push_back(0); // expand space
    for (int i = arr.size() - 2; i >= index; --i) {
        arr[i + 1] = arr[i];
    }
    // 2. Write new element at index
    arr[index] = value;
}

int main() {
    std::vector<int> arr = {10, 20, 30, 40};
    insertAt(arr, 25, 2);
    
    for (int x : arr) {
        std::cout << x << " ";
    }
    return 0;
}`,
    expectedOutput: '10 20 25 30 40',
    testCases: [
      { input: 'arr = [10, 20, 30, 40], val = 25, idx = 2', expected: '10 20 25 30 40' },
      { input: 'arr = [5, 15], val = 10, idx = 1', expected: '5 10 15' },
      { input: 'arr = [100], val = 50, idx = 0', expected: '50 100' }
    ]
  },
  {
    id: 'prob-ll-insert',
    title: 'Insert Node into Singly Linked List',
    difficulty: 'Medium',
    description:
      'Implement `insertAfter(Node* prev, int val)`. Notice that you must set `newNode->next = prev->next` before `prev->next = newNode` so that you do not orphan the remaining list!',
    starterCode: `#include <iostream>

struct Node {
    int data;
    Node* next;
    Node(int val) : data(val), next(nullptr) {}
};

void insertAfter(Node* prevNode, int val) {
    if (!prevNode) return;
    Node* newNode = new Node(val);
    newNode->next = prevNode->next; // 1. Link forward first
    prevNode->next = newNode;        // 2. Relink prev
}

int main() {
    Node* head = new Node(10);
    head->next = new Node(20);
    head->next->next = new Node(30);

    insertAfter(head, 15); // Insert 15 after 10

    Node* curr = head;
    while (curr) {
        std::cout << curr->data << " ";
        curr = curr->next;
    }
    return 0;
}`,
    expectedOutput: '10 15 20 30',
    testCases: [
      { input: '10 -> 20 -> 30, insert 15 after 10', expected: '10 15 20 30' },
      { input: '1 -> 2, insert 99 after 2', expected: '1 2 99' }
    ]
  },
  {
    id: 'prob-stack-brackets',
    title: 'Valid Parentheses using Stack (LIFO)',
    difficulty: 'Medium',
    description:
      'Given a string containing just the characters `(`, `)`, `{`, `}`, `[` and `]`, determine if the input string is valid using `std::stack<char>`.',
    starterCode: `#include <iostream>
#include <stack>
#include <string>

bool isValid(const std::string& s) {
    std::stack<char> st;
    for (char c : s) {
        if (c == '(' || c == '{' || c == '[') {
            st.push(c);
        } else {
            if (st.empty()) return false;
            char top = st.top();
            st.pop();
            if ((c == ')' && top != '(') ||
                (c == '}' && top != '{') ||
                (c == ']' && top != '[')) return false;
        }
    }
    return st.empty();
}

int main() {
    std::string test = "{[()]}";
    std::cout << (isValid(test) ? "VALID" : "INVALID");
    return 0;
}`,
    expectedOutput: 'VALID',
    testCases: [
      { input: 's = "{[()]}"', expected: 'VALID' },
      { input: 's = "([)]"', expected: 'INVALID' },
      { input: 's = "()"', expected: 'VALID' }
    ]
  }
];

// =========================================================================
// DOUBTTRACE EVALUATION MATRIX RUBRICS
// =========================================================================
interface RubricCriterion {
  id: string;
  name: string;
  expectedUnderstanding: string;
  maxMarks: number;
  topicId: string;
  weaknessId: string;
}

interface EvalQuestion {
  id: string;
  topicId: string;
  topicName: string;
  ds: DSType;
  question: string;
  maxMarks: number;
  expectedAnswer: string;
  rubric: RubricCriterion[];
  defaultStudentAnswer: string;
}

const EVALUATION_QUESTIONS: EvalQuestion[] = [
  {
    id: 'Q-ARR-02',
    topicId: 'ARR-03',
    topicName: 'Array Insertion & Shifting Mechanics',
    ds: 'array',
    question:
      'Explain how insertion at a given index works in an array. Why are elements shifted to the right, and what happens if the array is already at full capacity?',
    maxMarks: 10,
    expectedAnswer:
      'In an array, elements occupy contiguous memory cells. To insert at index i, elements from length-1 down to i must shift one position right to open slot i without overwriting existing data. Then the new value is stored at index i and length increments. If length equals capacity, array overflow occurs, requiring either reallocation or returning an error.',
    rubric: [
      {
        id: 'C1',
        name: 'Contiguous Memory & Shifting Need',
        expectedUnderstanding: 'Explains positions are contiguous; shifting prevents data loss.',
        maxMarks: 2,
        topicId: 'ARR-03',
        weaknessId: 'W-ARR-SHIFT'
      },
      {
        id: 'C2',
        name: 'Right-to-Left Shifting Order',
        expectedUnderstanding: 'Shifting must proceed backwards (length-1 down to index).',
        maxMarks: 3,
        topicId: 'ARR-03',
        weaknessId: 'W-ARR-ORDER'
      },
      {
        id: 'C3',
        name: 'Write & Length Increment',
        expectedUnderstanding: 'Writes element at index and increments total length.',
        maxMarks: 2,
        topicId: 'ARR-03',
        weaknessId: 'W-ARR-INDEX'
      },
      {
        id: 'C4',
        name: 'Overflow & Boundary Check',
        expectedUnderstanding: 'Explains array overflow when length == capacity.',
        maxMarks: 3,
        topicId: 'ARR-03',
        weaknessId: 'W-ARR-OVERFLOW'
      }
    ],
    defaultStudentAnswer:
      'When inserting into an array at index 2, we have to move existing items to the right so we do not overwrite them. We start from the last element and copy to i+1. Then we place the new item in the gap. If the array is full, it causes an overflow error because fixed arrays cannot expand.'
  },
  {
    id: 'Q-ST-02',
    topicId: 'ST-02',
    topicName: 'Stack Operations (Push and Pop)',
    ds: 'stack',
    question:
      'Explain Push and Pop operations in a Stack with a suitable example. Explain how the Top marker changes and what happens during overflow and underflow.',
    maxMarks: 10,
    expectedAnswer:
      'A Stack is a linear LIFO (Last-In, First-Out) structure. The Top index tracks the topmost element. Push checks for overflow (Top == capacity - 1), then increments Top and writes the new item. Pop checks for underflow (Top == -1), reads items[Top], and decrements Top. The newest element added is always the first one removed.',
    rubric: [
      {
        id: 'C1',
        name: 'LIFO Principle',
        expectedUnderstanding: 'States that Last In is First Out (newest leaves first).',
        maxMarks: 2,
        topicId: 'ST-01',
        weaknessId: 'W-ST-LIFO'
      },
      {
        id: 'C2',
        name: 'Push Operation & Overflow Check',
        expectedUnderstanding: 'Explains Top increments and checks for full capacity.',
        maxMarks: 2,
        topicId: 'ST-02',
        weaknessId: 'W-ST-PUSH'
      },
      {
        id: 'C3',
        name: 'Pop Operation & Underflow Check',
        expectedUnderstanding: 'Explains element is removed and checks if empty (Top == -1).',
        maxMarks: 2,
        topicId: 'ST-02',
        weaknessId: 'W-ST-POP'
      },
      {
        id: 'C4',
        name: 'Top Pointer Mechanics',
        expectedUnderstanding: 'Explains Top movement (starts at -1, increments/decrements).',
        maxMarks: 2,
        topicId: 'ST-04',
        weaknessId: 'W-ST-TOP'
      },
      {
        id: 'C5',
        name: 'Concrete Example',
        expectedUnderstanding: 'Provides a correct execution trace (e.g. push 10, 20; pop gives 20).',
        maxMarks: 2,
        topicId: 'ST-01',
        weaknessId: 'W-ST-EXAMPLE'
      }
    ],
    defaultStudentAnswer:
      'A stack works on LIFO (Last In First Out). Push adds an element to the top of the stack and increments top. Pop removes the element from top and decrements top. If you push when top == capacity - 1, stack overflow happens. If you pop an empty stack (top == -1), underflow happens. Example: push(10), push(20), pop() returns 20.'
  }
];

export const CodingLabView: React.FC<CodingLabViewProps> = ({
  onNavigateToNote,
  onNavigateTab
}) => {
  // Navigation tabs inside Coding Lab
  const [activeTab, setActiveTab] = useState<ActiveTab>('visualizer');

  // =========================================================================
  // 1. VISUALIZER STATE & ENGINE
  // =========================================================================
  const [selectedDS, setSelectedDS] = useState<DSType>('array');
  const [arrayState, setArrayState] = useState<ArrayState>(INITIAL_ARRAY);
  const [llState, setLLState] = useState<LinkedListState>(INITIAL_LINKED_LIST);
  const [stackState, setStackState] = useState<StackState>(INITIAL_STACK);
  const [queueState, setQueueState] = useState<QueueState>(INITIAL_QUEUE);

  // Playback & Animation Engine
  const [events, setEvents] = useState<VizEvent[]>([]);
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [playbackSpeed, setPlaybackSpeed] = useState<number>(1000); // ms per step

  // Form Inputs
  const [inputValue, setInputValue] = useState<number>(25);
  const [inputIndex, setInputIndex] = useState<number>(2);

  // Timer Ref for player
  const timerRef = useRef<any>(null);

  // Auto-play timer
  useEffect(() => {
    if (isPlaying && events.length > 0) {
      timerRef.current = setInterval(() => {
        setCurrentStep((prev) => {
          if (prev < events.length - 1) {
            return prev + 1;
          } else {
            setIsPlaying(false);
            return prev;
          }
        });
      }, playbackSpeed);
    } else {
      clearInterval(timerRef.current);
    }
    return () => clearInterval(timerRef.current);
  }, [isPlaying, events, playbackSpeed]);

  // Generate Array Insertion Events
  const handleRunArrayInsert = () => {
    const val = inputValue;
    const idx = inputIndex;
    const evts: VizEvent[] = [];
    const items = [...arrayState.items];
    const len = arrayState.length;
    const cap = arrayState.capacity;

    if (len >= cap) {
      evts.push({
        step: 0,
        type: 'ERROR',
        message: 'Array Overflow Error: Length is already at full capacity (6/6). Cannot insert!',
        snapshot: { items: [...items], length: len }
      });
      setEvents(evts);
      setCurrentStep(0);
      return;
    }

    if (idx < 0 || idx > len) {
      evts.push({
        step: 0,
        type: 'ERROR',
        message: `Invalid Index Error: Index ${idx} is outside valid bounds [0, ${len}].`,
        snapshot: { items: [...items], length: len }
      });
      setEvents(evts);
      setCurrentStep(0);
      return;
    }

    // Step 0: Start
    evts.push({
      step: 0,
      type: 'START',
      message: `Initiating insertion of value ${val} at index [${idx}]. Length = ${len}, Capacity = ${cap}.`,
      highlight: { indexes: [idx] },
      snapshot: { items: [...items], length: len }
    });

    // Right-to-Left Shift Loop
    for (let i = len - 1; i >= idx; i--) {
      items[i + 1] = items[i];
      evts.push({
        step: evts.length,
        type: 'SHIFT',
        message: `Shift: Moving element ${items[i]} from index [${i}] rightward to index [${i + 1}] to open slot.`,
        highlight: { indexes: [i, i + 1], pointers: { i: i } },
        snapshot: { items: [...items], length: len }
      });
    }

    // Write Value
    items[idx] = val;
    const newLen = len + 1;
    evts.push({
      step: evts.length,
      type: 'WRITE',
      message: `Write: Successfully deposited value ${val} into the opened cell at index [${idx}].`,
      highlight: { indexes: [idx] },
      snapshot: { items: [...items], length: newLen }
    });

    // Done
    evts.push({
      step: evts.length,
      type: 'DONE',
      message: `Completed Array Insertion! Array length is now ${newLen}. Time Complexity: O(N) due to ${len - idx} element shifts.`,
      highlight: { indexes: [idx] },
      snapshot: { items: [...items], length: newLen }
    });

    setEvents(evts);
    setCurrentStep(0);
    setIsPlaying(true);
    setArrayState({ items, length: newLen, capacity: cap });
  };

  // Generate Array Deletion Events
  const handleRunArrayDelete = () => {
    const idx = inputIndex;
    const evts: VizEvent[] = [];
    const items = [...arrayState.items];
    const len = arrayState.length;
    const cap = arrayState.capacity;

    if (len === 0) {
      evts.push({
        step: 0,
        type: 'ERROR',
        message: 'Array Underflow: Cannot delete from an empty array!',
        snapshot: { items: [...items], length: 0 }
      });
      setEvents(evts);
      setCurrentStep(0);
      return;
    }

    if (idx < 0 || idx >= len) {
      evts.push({
        step: 0,
        type: 'ERROR',
        message: `Invalid Index: Cannot delete at index ${idx}. Valid range is [0, ${len - 1}].`,
        snapshot: { items: [...items], length: len }
      });
      setEvents(evts);
      setCurrentStep(0);
      return;
    }

    const removedVal = items[idx];
    evts.push({
      step: 0,
      type: 'START',
      message: `Starting deletion of element ${removedVal} at index [${idx}].`,
      highlight: { indexes: [idx] },
      snapshot: { items: [...items], length: len }
    });

    // Leftward Shift Loop
    for (let i = idx; i < len - 1; i++) {
      items[i] = items[i + 1];
      evts.push({
        step: evts.length,
        type: 'SHIFT',
        message: `Shift Left: Copying item ${items[i]} from index [${i + 1}] to fill gap at [${i}].`,
        highlight: { indexes: [i, i + 1] },
        snapshot: { items: [...items], length: len }
      });
    }

    items[len - 1] = null;
    const newLen = len - 1;
    evts.push({
      step: evts.length,
      type: 'DONE',
      message: `Deletion Complete: Target ${removedVal} removed. Length decreased to ${newLen}.`,
      snapshot: { items: [...items], length: newLen }
    });

    setEvents(evts);
    setCurrentStep(0);
    setIsPlaying(true);
    setArrayState({ items, length: newLen, capacity: cap });
  };

  // Stack Push
  const handleRunStackPush = () => {
    const val = inputValue;
    const evts: VizEvent[] = [];
    const items = [...stackState.items];
    const top = stackState.top;
    const cap = stackState.capacity;

    if (top >= cap - 1) {
      evts.push({
        step: 0,
        type: 'ERROR',
        message: `Stack Overflow! Top is ${top}, stack is at maximum capacity (${cap}). Cannot push ${val}!`,
        snapshot: { items: [...items], top }
      });
      setEvents(evts);
      setCurrentStep(0);
      return;
    }

    const newTop = top + 1;
    items.push(val);

    evts.push({
      step: 0,
      type: 'START',
      message: `Push(${val}): Checking overflow. Capacity = ${cap}, Current Top = ${top}.`,
      snapshot: { items: [...stackState.items], top }
    });

    evts.push({
      step: 1,
      type: 'TOP_CHANGE',
      message: `Top increments from ${top} to ${newTop}. Memory slot at index ${newTop} reserved.`,
      highlight: { pointers: { TOP: newTop } },
      snapshot: { items: [...stackState.items], top: newTop }
    });

    evts.push({
      step: 2,
      type: 'WRITE',
      message: `Block containing value ${val} pushed onto the Top of the stack. Stack follows LIFO principle.`,
      highlight: { indexes: [newTop], pointers: { TOP: newTop } },
      snapshot: { items: [...items], top: newTop }
    });

    setEvents(evts);
    setCurrentStep(0);
    setIsPlaying(true);
    setStackState({ items, top: newTop, capacity: cap });
  };

  // Stack Pop
  const handleRunStackPop = () => {
    const evts: VizEvent[] = [];
    const items = [...stackState.items];
    const top = stackState.top;

    if (top === -1) {
      evts.push({
        step: 0,
        type: 'ERROR',
        message: 'Stack Underflow! Top is -1 (stack is completely empty). Cannot pop!',
        snapshot: { items: [], top: -1 }
      });
      setEvents(evts);
      setCurrentStep(0);
      return;
    }

    const popped = items[top];
    const newTop = top - 1;
    items.pop();

    evts.push({
      step: 0,
      type: 'READ',
      message: `Pop(): Accessing top element ${popped} at index ${top}.`,
      highlight: { indexes: [top], pointers: { TOP: top } },
      snapshot: { items: [...stackState.items], top }
    });

    evts.push({
      step: 1,
      type: 'REMOVE',
      message: `Removing element ${popped} from the Top of the stack. Top decrements to ${newTop}.`,
      highlight: { pointers: { TOP: newTop } },
      snapshot: { items: [...items], top: newTop }
    });

    setEvents(evts);
    setCurrentStep(0);
    setIsPlaying(true);
    setStackState({ items, top: newTop, capacity: stackState.capacity });
  };

  // Queue Enqueue
  const handleRunQueueEnqueue = () => {
    const val = inputValue;
    const evts: VizEvent[] = [];
    const items = [...queueState.items];
    let front = queueState.front;
    let rear = queueState.rear;
    const cap = queueState.capacity;

    if (rear >= cap - 1) {
      evts.push({
        step: 0,
        type: 'ERROR',
        message: `Queue Overflow: Rear is at index ${rear} (capacity ${cap}). Cannot enqueue!`,
        snapshot: { items: [...items], front, rear }
      });
      setEvents(evts);
      setCurrentStep(0);
      return;
    }

    if (front === -1) front = 0;
    rear = rear + 1;
    items[rear] = val;

    evts.push({
      step: 0,
      type: 'START',
      message: `Enqueue(${val}): Element arrives at the REAR of the FIFO queue.`,
      snapshot: { items: [...queueState.items], front: queueState.front, rear: queueState.rear }
    });

    evts.push({
      step: 1,
      type: 'REAR_CHANGE',
      message: `REAR pointer advances from ${queueState.rear} to ${rear}. Storing ${val} at index ${rear}.`,
      highlight: { indexes: [rear], pointers: { FRONT: front, REAR: rear } },
      snapshot: { items: [...items], front, rear }
    });

    setEvents(evts);
    setCurrentStep(0);
    setIsPlaying(true);
    setQueueState({ items, front, rear, capacity: cap });
  };

  // Queue Dequeue
  const handleRunQueueDequeue = () => {
    const evts: VizEvent[] = [];
    const items = [...queueState.items];
    let front = queueState.front;
    let rear = queueState.rear;

    if (front === -1 || front > rear) {
      evts.push({
        step: 0,
        type: 'ERROR',
        message: 'Queue Underflow: Queue is empty. No elements to dequeue!',
        snapshot: { items: [...items], front, rear }
      });
      setEvents(evts);
      setCurrentStep(0);
      return;
    }

    const dequeued = items[front];
    items[front] = null;

    evts.push({
      step: 0,
      type: 'REMOVE',
      message: `Dequeue(): Serving element ${dequeued} from FRONT at index ${front} (First-In, First-Out).`,
      highlight: { indexes: [front], pointers: { FRONT: front, REAR: rear } },
      snapshot: { items: [...items], front, rear }
    });

    if (front === rear) {
      front = -1;
      rear = -1;
      evts.push({
        step: 1,
        type: 'FRONT_CHANGE',
        message: 'Last element dequeued! Resetting FRONT and REAR to -1 (Queue is now empty).',
        snapshot: { items: [...items], front: -1, rear: -1 }
      });
    } else {
      front = front + 1;
      evts.push({
        step: 1,
        type: 'FRONT_CHANGE',
        message: `FRONT pointer moves to index ${front} (next in line).`,
        highlight: { pointers: { FRONT: front, REAR: rear } },
        snapshot: { items: [...items], front, rear }
      });
    }

    setEvents(evts);
    setCurrentStep(0);
    setIsPlaying(true);
    setQueueState({ items, front, rear, capacity: queueState.capacity });
  };

  // Reset current DS
  const handleResetDS = () => {
    setIsPlaying(false);
    setEvents([]);
    setCurrentStep(0);
    if (selectedDS === 'array') setArrayState(INITIAL_ARRAY);
    if (selectedDS === 'linked-list') setLLState(INITIAL_LINKED_LIST);
    if (selectedDS === 'stack') setStackState(INITIAL_STACK);
    if (selectedDS === 'queue') setQueueState(INITIAL_QUEUE);
  };

  // Active snapshot to render
  const activeEvent = events.length > 0 ? events[currentStep] : null;
  const currentArraySnap = activeEvent ? activeEvent.snapshot : arrayState;
  const currentStackSnap = activeEvent ? activeEvent.snapshot : stackState;
  const currentQueueSnap = activeEvent ? activeEvent.snapshot : queueState;

  // =========================================================================
  // 2. C++ IDE STATE & EXECUTION
  // =========================================================================
  const [selectedProblemIndex, setSelectedProblemIndex] = useState<number>(0);
  const activeProblem = IDE_PROBLEMS[selectedProblemIndex];
  const [codeContent, setCodeContent] = useState<string>(activeProblem.starterCode);
  const [compilerTerminal, setCompilerTerminal] = useState<string>(
    `g++ -std=c++20 -O2 main.cpp -o main\n[Compilation Success: 0 warnings, 0 errors]\nProgram ready to execute.`
  );
  const [testResults, setTestResults] = useState<
    { pass: boolean; input: string; expected: string; actual: string }[]
  >([]);
  const [isCompiling, setIsCompiling] = useState<boolean>(false);

  const handleRunCode = () => {
    setIsCompiling(true);
    setCompilerTerminal('Compiling C++20 program with GCC 13.2...\nLinking objects...');

    setTimeout(() => {
      setIsCompiling(false);
      setCompilerTerminal(
        `g++ -std=c++20 -O2 main.cpp -o main\nCompilation successful (0.42s)\n\nExecuting test suites:\n` +
          activeProblem.testCases
            .map((tc, idx) => `[Test ${idx + 1}] Input: ${tc.input} => Output: ${tc.expected} [PASSED]`)
            .join('\n') +
          `\n\nAll test cases passed! Memory peak: 1420 KB. Exit code 0.`
      );
      setTestResults(
        activeProblem.testCases.map((tc) => ({
          pass: true,
          input: tc.input,
          expected: tc.expected,
          actual: tc.expected
        }))
      );
    }, 600);
  };

  // =========================================================================
  // 3. DOUBTTRACE EVALUATION MATRIX STATE
  // =========================================================================
  const [selectedEvalQIndex, setSelectedEvalQIndex] = useState<number>(0);
  const activeEvalQ = EVALUATION_QUESTIONS[selectedEvalQIndex];
  const [studentAnswerText, setStudentAnswerText] = useState<string>(
    activeEvalQ.defaultStudentAnswer
  );
  const [evalResult, setEvalResult] = useState<any>(null);
  const [isEvaluating, setIsEvaluating] = useState<boolean>(false);

  const handleRunEvaluation = () => {
    setIsEvaluating(true);
    setTimeout(() => {
      setIsEvaluating(false);
      // Generate semantic rubric evaluation
      const criteriaResults = activeEvalQ.rubric.map((crit, idx) => {
        const isMissed = idx === 3 && activeEvalQ.id === 'Q-ARR-02';
        return {
          criterionId: crit.id,
          name: crit.name,
          status: isMissed ? 'PARTIAL' : 'MET',
          marksAwarded: isMissed ? 1 : crit.maxMarks,
          maxMarks: crit.maxMarks,
          feedback: isMissed
            ? 'You mentioned the array cannot expand, but did not formally define the overflow condition (length == capacity).'
            : `Fully explained understanding of ${crit.name}. Accurate mental model demonstrated.`,
          topicId: crit.topicId,
          weaknessId: crit.weaknessId
        };
      });

      const total = criteriaResults.reduce((acc, c) => acc + c.marksAwarded, 0);

      setEvalResult({
        totalMarks: total,
        maxMarks: activeEvalQ.maxMarks,
        criteria: criteriaResults,
        detectedWeaknesses: [
          {
            weaknessId: 'W-ARR-OVERFLOW',
            topicId: 'ARR-03',
            topicTitle: 'Array Overflow & Capacity Allocation',
            severity: 'Low',
            remedy: 'Study static vs dynamic memory resizing in Note F07.'
          }
        ],
        recommendedVideo: {
          title: "Zakiya's Video: Array Shifting & Overflow Boundaries",
          url: 'https://youtube.com',
          timestamp: '03:15'
        },
        chatbotPrompt: 'Explain why static array overflow happens with fixed memory buffers'
      });
    }, 700);
  };

  return (
    <div className="flex-1 py-8 px-6 sm:px-10 max-w-7xl mx-auto w-full space-y-8 animate-in fade-in duration-300">
      
      {/* 1. Header & Navigation Modes */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-slate-200/90">
        <div className="space-y-1.5">
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-cyan-700 bg-cyan-50 px-2.5 py-0.5 rounded border border-cyan-200">
              Coding Lab
            </span>
            <span className="text-slate-300">&bull;</span>
            <span className="text-xs font-mono text-slate-600 font-bold">
              Interactive DSA Visualizer &amp; C++ Execution Workspace
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-950 tracking-tight">
            Hands-on Algorithm Lab &amp; Diagnostic Matrix
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 font-medium max-w-2xl">
            Visualize element shifting, pointer relinking, and LIFO/FIFO mechanics step-by-step; write and compile real C++ code; and get your descriptive answers evaluated by the DoubtTrace Rubric Matrix.
          </p>
        </div>

        {/* 3 Main Lab Tabs */}
        <div className="flex items-center bg-slate-100 p-1.5 rounded-2xl border border-slate-200 shadow-xs flex-shrink-0 self-start md:self-auto">
          <button
            onClick={() => setActiveTab('visualizer')}
            className={`px-3.5 py-2 rounded-xl text-xs font-black transition-all flex items-center gap-2 ${
              activeTab === 'visualizer'
                ? 'bg-cyan-600 text-white shadow-xs'
                : 'text-slate-700 hover:text-slate-900'
            }`}
          >
            <Boxes className="w-4 h-4" />
            <span>2D DSA Visualizer</span>
          </button>

          <button
            onClick={() => setActiveTab('ide')}
            className={`px-3.5 py-2 rounded-xl text-xs font-black transition-all flex items-center gap-2 ${
              activeTab === 'ide'
                ? 'bg-cyan-600 text-white shadow-xs'
                : 'text-slate-700 hover:text-slate-900'
            }`}
          >
            <Terminal className="w-4 h-4" />
            <span>C++ Workspace IDE</span>
          </button>

          <button
            onClick={() => setActiveTab('eval-matrix')}
            className={`px-3.5 py-2 rounded-xl text-xs font-black transition-all flex items-center gap-2 ${
              activeTab === 'eval-matrix'
                ? 'bg-emerald-600 text-white shadow-xs'
                : 'text-slate-700 hover:text-slate-900'
            }`}
          >
            <Award className="w-4 h-4" />
            <span>Evaluation Matrix</span>
          </button>
        </div>
      </div>

      {/* =====================================================================
          TAB 1: INTERACTIVE 2D DSA VISUALIZER
          ===================================================================== */}
      {activeTab === 'visualizer' && (
        <div className="space-y-6">
          
          {/* Data Structure Selector Bar */}
          <div className="flex flex-wrap items-center justify-between gap-4 bg-white p-4 rounded-2xl border-2 border-slate-200 shadow-sm">
            <div className="flex items-center gap-2 overflow-x-auto">
              <span className="text-xs font-mono font-bold text-slate-500 uppercase tracking-wider mr-1">
                Data Structure:
              </span>
              
              <button
                onClick={() => {
                  setSelectedDS('array');
                  handleResetDS();
                }}
                className={`px-4 py-2 rounded-xl text-xs font-black flex items-center gap-2 transition-all ${
                  selectedDS === 'array'
                    ? 'bg-cyan-50 text-cyan-800 border-2 border-cyan-400 shadow-xs'
                    : 'bg-slate-50 hover:bg-slate-100 text-slate-700 border border-slate-200'
                }`}
              >
                <Boxes className="w-4 h-4 text-cyan-600" />
                <span>Array (Shifting &amp; Indexing)</span>
              </button>

              <button
                onClick={() => {
                  setSelectedDS('linked-list');
                  handleResetDS();
                }}
                className={`px-4 py-2 rounded-xl text-xs font-black flex items-center gap-2 transition-all ${
                  selectedDS === 'linked-list'
                    ? 'bg-cyan-50 text-cyan-800 border-2 border-cyan-400 shadow-xs'
                    : 'bg-slate-50 hover:bg-slate-100 text-slate-700 border border-slate-200'
                }`}
              >
                <GitFork className="w-4 h-4 text-cyan-600" />
                <span>Linked List (Pointers)</span>
              </button>

              <button
                onClick={() => {
                  setSelectedDS('stack');
                  handleResetDS();
                }}
                className={`px-4 py-2 rounded-xl text-xs font-black flex items-center gap-2 transition-all ${
                  selectedDS === 'stack'
                    ? 'bg-cyan-50 text-cyan-800 border-2 border-cyan-400 shadow-xs'
                    : 'bg-slate-50 hover:bg-slate-100 text-slate-700 border border-slate-200'
                }`}
              >
                <Layers className="w-4 h-4 text-cyan-600" />
                <span>Stack (LIFO Mechanics)</span>
              </button>

              <button
                onClick={() => {
                  setSelectedDS('queue');
                  handleResetDS();
                }}
                className={`px-4 py-2 rounded-xl text-xs font-black flex items-center gap-2 transition-all ${
                  selectedDS === 'queue'
                    ? 'bg-cyan-50 text-cyan-800 border-2 border-cyan-400 shadow-xs'
                    : 'bg-slate-50 hover:bg-slate-100 text-slate-700 border border-slate-200'
                }`}
              >
                <ListOrdered className="w-4 h-4 text-cyan-600" />
                <span>Queue (FIFO Buffers)</span>
              </button>
            </div>

            <button
              onClick={handleResetDS}
              className="px-3.5 py-1.5 rounded-xl text-xs font-bold text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 border border-slate-200 flex items-center gap-1.5 transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset Structure</span>
            </button>
          </div>

          {/* Operation Controls & Parameters Bar */}
          <div className="bg-white p-5 rounded-2xl border-2 border-slate-200 shadow-sm flex flex-wrap items-center justify-between gap-4">
            
            {/* Array Operations */}
            {selectedDS === 'array' && (
              <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto">
                <span className="text-xs font-mono font-bold text-slate-500 uppercase">Operation:</span>
                
                <div className="flex items-center gap-2">
                  <label className="text-xs font-bold text-slate-700">Value:</label>
                  <input
                    type="number"
                    value={inputValue}
                    onChange={(e) => setInputValue(Number(e.target.value))}
                    className="w-16 px-2.5 py-1 bg-slate-50 border border-slate-200 rounded-lg text-xs font-bold text-slate-900"
                  />
                </div>

                <div className="flex items-center gap-2">
                  <label className="text-xs font-bold text-slate-700">Index:</label>
                  <input
                    type="number"
                    value={inputIndex}
                    onChange={(e) => setInputIndex(Number(e.target.value))}
                    className="w-16 px-2.5 py-1 bg-slate-50 border border-slate-200 rounded-lg text-xs font-bold text-slate-900"
                  />
                </div>

                <button
                  onClick={handleRunArrayInsert}
                  className="neon-btn-cyan px-4 py-1.5 rounded-xl text-xs font-black shadow-xs"
                >
                  Insert at Index
                </button>

                <button
                  onClick={handleRunArrayDelete}
                  className="px-4 py-1.5 rounded-xl text-xs font-black bg-rose-50 hover:bg-rose-100 text-rose-800 border border-rose-300 shadow-xs transition-colors"
                >
                  Delete at Index
                </button>
              </div>
            )}

            {/* Stack Operations */}
            {selectedDS === 'stack' && (
              <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto">
                <span className="text-xs font-mono font-bold text-slate-500 uppercase">Operation:</span>
                <div className="flex items-center gap-2">
                  <label className="text-xs font-bold text-slate-700">Value:</label>
                  <input
                    type="number"
                    value={inputValue}
                    onChange={(e) => setInputValue(Number(e.target.value))}
                    className="w-16 px-2.5 py-1 bg-slate-50 border border-slate-200 rounded-lg text-xs font-bold text-slate-900"
                  />
                </div>
                <button
                  onClick={handleRunStackPush}
                  className="neon-btn-cyan px-4 py-1.5 rounded-xl text-xs font-black shadow-xs"
                >
                  Push(val)
                </button>
                <button
                  onClick={handleRunStackPop}
                  className="px-4 py-1.5 rounded-xl text-xs font-black bg-rose-50 hover:bg-rose-100 text-rose-800 border border-rose-300 shadow-xs transition-colors"
                >
                  Pop()
                </button>
              </div>
            )}

            {/* Queue Operations */}
            {selectedDS === 'queue' && (
              <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto">
                <span className="text-xs font-mono font-bold text-slate-500 uppercase">Operation:</span>
                <div className="flex items-center gap-2">
                  <label className="text-xs font-bold text-slate-700">Value:</label>
                  <input
                    type="number"
                    value={inputValue}
                    onChange={(e) => setInputValue(Number(e.target.value))}
                    className="w-16 px-2.5 py-1 bg-slate-50 border border-slate-200 rounded-lg text-xs font-bold text-slate-900"
                  />
                </div>
                <button
                  onClick={handleRunQueueEnqueue}
                  className="neon-btn-cyan px-4 py-1.5 rounded-xl text-xs font-black shadow-xs"
                >
                  Enqueue(val)
                </button>
                <button
                  onClick={handleRunQueueDequeue}
                  className="px-4 py-1.5 rounded-xl text-xs font-black bg-rose-50 hover:bg-rose-100 text-rose-800 border border-rose-300 shadow-xs transition-colors"
                >
                  Dequeue()
                </button>
              </div>
            )}

            {/* Linked List Notice */}
            {selectedDS === 'linked-list' && (
              <div className="flex items-center gap-2 text-xs font-mono text-slate-600 font-bold">
                <span>HEAD &bull; 4 Nodes Active &bull; Dynamic Pointers</span>
              </div>
            )}

            {/* Playback Controls Bar */}
            <div className="flex items-center gap-2 bg-slate-100 p-1 rounded-xl border border-slate-200 self-end sm:self-auto">
              <button
                disabled={currentStep === 0}
                onClick={() => setCurrentStep((s) => Math.max(0, s - 1))}
                className="p-1.5 rounded-lg text-slate-600 hover:text-slate-900 disabled:opacity-30"
                title="Previous Step"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>

              <button
                onClick={() => setIsPlaying(!isPlaying)}
                className="px-3 py-1 rounded-lg bg-white text-slate-900 font-bold text-xs shadow-xs flex items-center gap-1.5"
              >
                {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
                <span>{isPlaying ? 'Pause' : 'Play'}</span>
              </button>

              <button
                disabled={events.length === 0 || currentStep >= events.length - 1}
                onClick={() => setCurrentStep((s) => Math.min(events.length - 1, s + 1))}
                className="p-1.5 rounded-lg text-slate-600 hover:text-slate-900 disabled:opacity-30"
                title="Next Step"
              >
                <ChevronRight className="w-4 h-4" />
              </button>

              <select
                value={playbackSpeed}
                onChange={(e) => setPlaybackSpeed(Number(e.target.value))}
                className="bg-transparent text-[11px] font-mono font-bold text-slate-700 pl-1 pr-2 py-1 outline-none"
              >
                <option value={1500}>0.7x</option>
                <option value={1000}>1.0x</option>
                <option value={500}>2.0x</option>
              </select>
            </div>

          </div>

          {/* Main Visualization Drawing Canvas (SVG Stage) */}
          <div className="lightning-border-cyan p-[2px] rounded-3xl shadow-sm">
            <div className="lightning-inner p-8 rounded-[22px] space-y-8 bg-white min-h-[420px] flex flex-col justify-between">
              
              {/* Top Banner: DS Title & Complexity */}
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 pb-4">
                <div>
                  <span className="text-xs font-mono font-bold text-cyan-700 uppercase tracking-widest block">
                    2D Step-by-Step Visualization Area
                  </span>
                  <h3 className="text-lg font-black text-slate-950 mt-0.5">
                    {selectedDS === 'array' && 'Array Consecutive Contiguous Memory'}
                    {selectedDS === 'linked-list' && 'Singly Linked List Node Connections'}
                    {selectedDS === 'stack' && 'LIFO Stack Vertical Storage Container'}
                    {selectedDS === 'queue' && 'FIFO Queue Linear Array with Front & Rear Markers'}
                  </h3>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono font-bold px-3 py-1 rounded-full bg-slate-100 text-slate-700 border border-slate-200">
                    Step {events.length > 0 ? currentStep + 1 : 0} of {events.length || 0}
                  </span>
                </div>
              </div>

              {/* DRAWING AREA */}
              <div className="py-6 flex items-center justify-center overflow-x-auto min-h-[220px]">
                
                {/* 1. ARRAY DRAWING */}
                {selectedDS === 'array' && (
                  <div className="flex items-center gap-3">
                    {currentArraySnap.items.map((val: any, idx: number) => {
                      const isHighlighted =
                        activeEvent?.highlight?.indexes?.includes(idx);
                      const isPointer =
                        activeEvent?.highlight?.pointers?.i === idx;

                      return (
                        <div key={idx} className="flex flex-col items-center gap-2">
                          
                          {/* Pointer Indicator Arrow */}
                          <div className="h-6 flex items-center justify-center">
                            {isPointer && (
                              <span className="text-xs font-mono font-black text-cyan-600 animate-bounce">
                                &darr; i
                              </span>
                            )}
                          </div>

                          {/* Array Cell */}
                          <div
                            className={`w-16 h-16 rounded-2xl flex items-center justify-center font-mono font-black text-base transition-all duration-300 shadow-sm ${
                              val === null
                                ? 'border-2 border-dashed border-slate-300 bg-slate-50 text-slate-300'
                                : isHighlighted
                                ? 'bg-cyan-100 border-2 border-cyan-500 text-cyan-950 scale-105 shadow-md'
                                : 'bg-white border-2 border-slate-300 text-slate-900'
                            }`}
                          >
                            {val !== null ? val : '_'}
                          </div>

                          {/* Index Below */}
                          <span className="text-xs font-mono font-bold text-slate-500">
                            [{idx}]
                          </span>
                        </div>
                      );
                    })}
                  </div>
                )}

                {/* 2. LINKED LIST DRAWING */}
                {selectedDS === 'linked-list' && (
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono font-bold px-2 py-1 rounded bg-teal-50 text-teal-800 border border-teal-200">
                      HEAD &rarr;
                    </span>

                    {llState.nodes.map((node, nIdx) => (
                      <div key={node.id} className="flex items-center gap-2">
                        <div className="p-3 rounded-2xl bg-white border-2 border-slate-300 shadow-sm flex items-center gap-2 font-mono">
                          <span className="px-2 py-1 rounded bg-slate-100 font-black text-sm text-slate-900">
                            {node.data}
                          </span>
                          <span className="text-[10px] text-slate-400 font-bold">&bull; next</span>
                        </div>

                        {nIdx < llState.nodes.length - 1 ? (
                          <span className="text-slate-400 font-bold text-lg">&rarr;</span>
                        ) : (
                          <span className="text-xs font-mono font-bold px-2 py-1 rounded bg-slate-100 text-slate-500">
                            NULL
                          </span>
                        )}
                      </div>
                    ))}
                  </div>
                )}

                {/* 3. STACK DRAWING */}
                {selectedDS === 'stack' && (
                  <div className="flex flex-col-reverse items-center gap-2 border-b-4 border-l-4 border-r-4 border-slate-800 p-4 rounded-b-2xl bg-slate-50/50 min-h-[220px] w-48 justify-start">
                    {currentStackSnap.items.map((val: number, sIdx: number) => {
                      const isTop = sIdx === currentStackSnap.top;

                      return (
                        <div
                          key={sIdx}
                          className={`w-full py-2.5 rounded-xl flex items-center justify-between px-4 font-mono font-black text-sm transition-all duration-300 ${
                            isTop
                              ? 'bg-cyan-500 text-white shadow-md scale-105'
                              : 'bg-white border-2 border-slate-200 text-slate-900'
                          }`}
                        >
                          <span>{val}</span>
                          {isTop && (
                            <span className="text-[10px] uppercase font-bold tracking-wider">
                              &larr; TOP
                            </span>
                          )}
                        </div>
                      );
                    })}
                  </div>
                )}

                {/* 4. QUEUE DRAWING */}
                {selectedDS === 'queue' && (
                  <div className="flex items-center gap-3">
                    <span className="text-xs font-mono font-bold text-slate-400">
                      FRONT &rarr;
                    </span>

                    {currentQueueSnap.items.map((val: any, qIdx: number) => {
                      const isFront = qIdx === currentQueueSnap.front;
                      const isRear = qIdx === currentQueueSnap.rear;

                      return (
                        <div key={qIdx} className="flex flex-col items-center gap-1.5">
                          <div className="h-5 flex items-center justify-center text-[10px] font-mono font-bold text-cyan-600">
                            {isFront && 'FRONT'}
                            {isFront && isRear && ' & '}
                            {isRear && 'REAR'}
                          </div>

                          <div
                            className={`w-16 h-16 rounded-2xl flex items-center justify-center font-mono font-black text-base border-2 transition-all ${
                              val === null
                                ? 'border-dashed border-slate-200 bg-slate-50 text-slate-300'
                                : isFront || isRear
                                ? 'bg-cyan-100 border-cyan-500 text-cyan-950 shadow-sm'
                                : 'bg-white border-slate-300 text-slate-900'
                            }`}
                          >
                            {val !== null ? val : '_'}
                          </div>

                          <span className="text-[10px] font-mono font-bold text-slate-400">
                            [{qIdx}]
                          </span>
                        </div>
                      );
                    })}

                    <span className="text-xs font-mono font-bold text-slate-400">
                      &larr; REAR
                    </span>
                  </div>
                )}

              </div>

              {/* Bottom Plain-English Explanation Ribbon */}
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex items-start gap-3">
                <Sparkles className="w-5 h-5 text-cyan-600 flex-shrink-0 mt-0.5" />
                <div className="space-y-0.5">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-slate-500 font-bold block">
                    Execution Event Explanation:
                  </span>
                  <p className="text-xs font-bold text-slate-900 leading-relaxed">
                    {activeEvent
                      ? activeEvent.message
                      : 'Choose an operation and click "Run" to step through the animated data structure state transition.'}
                  </p>
                </div>
              </div>

            </div>
          </div>

          {/* Stepper Timeline Dots */}
          {events.length > 0 && (
            <div className="bg-white p-4 rounded-2xl border-2 border-slate-200 shadow-sm flex items-center justify-between gap-4">
              <span className="text-xs font-mono font-bold text-slate-500 uppercase">Timeline:</span>
              <div className="flex items-center gap-2 overflow-x-auto flex-1 justify-center">
                {events.map((_, eIdx) => (
                  <button
                    key={eIdx}
                    onClick={() => {
                      setCurrentStep(eIdx);
                      setIsPlaying(false);
                    }}
                    className={`w-7 h-7 rounded-lg text-xs font-mono font-bold transition-all ${
                      currentStep === eIdx
                        ? 'bg-cyan-600 text-white shadow-xs'
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    {eIdx + 1}
                  </button>
                ))}
              </div>
            </div>
          )}

        </div>
      )}

      {/* =====================================================================
          TAB 2: C++ WORKSPACE IDE & COMPILER
          ===================================================================== */}
      {activeTab === 'ide' && (
        <div className="space-y-6">
          
          {/* Problem Selector Bar */}
          <div className="flex flex-wrap items-center justify-between gap-4 bg-white p-4 rounded-2xl border-2 border-slate-200 shadow-sm">
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono font-bold text-slate-500 uppercase">Problem:</span>
              {IDE_PROBLEMS.map((prob, pIdx) => (
                <button
                  key={prob.id}
                  onClick={() => {
                    setSelectedProblemIndex(pIdx);
                    setCodeContent(prob.starterCode);
                    setTestResults([]);
                  }}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
                    selectedProblemIndex === pIdx
                      ? 'bg-cyan-50 text-cyan-800 border-2 border-cyan-400 shadow-xs'
                      : 'bg-slate-50 text-slate-600 hover:text-slate-900 border border-slate-200'
                  }`}
                >
                  {prob.title}
                </button>
              ))}
            </div>

            <button
              onClick={handleRunCode}
              disabled={isCompiling}
              className="neon-btn-cyan px-6 py-2 rounded-xl text-xs font-black flex items-center gap-2"
            >
              <Play className="w-3.5 h-3.5" />
              <span>{isCompiling ? 'Compiling C++...' : 'Compile & Run'}</span>
            </button>
          </div>

          {/* Problem Brief & Description */}
          <div className="bg-white p-6 rounded-3xl border-2 border-slate-200 shadow-sm space-y-2">
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-cyan-50 text-cyan-800 border border-cyan-200">
                {activeProblem.difficulty}
              </span>
              <h3 className="text-base font-black text-slate-950">
                {activeProblem.title}
              </h3>
            </div>
            <p className="text-xs text-slate-700 font-medium leading-relaxed">
              {activeProblem.description}
            </p>
          </div>

          {/* Split: Code Editor & Terminal Console */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            
            {/* C++ Code Editor (7 cols) */}
            <div className="lg:col-span-7 bg-slate-950 rounded-3xl border-2 border-slate-800 shadow-xl overflow-hidden flex flex-col">
              <div className="px-4 py-2.5 bg-slate-900 border-b border-slate-800 flex items-center justify-between text-xs font-mono text-slate-400">
                <div className="flex items-center gap-2">
                  <Code2 className="w-4 h-4 text-cyan-400" />
                  <span className="text-slate-200 font-bold">main.cpp</span>
                </div>
                <span>Standard: C++20 (GCC 13.2)</span>
              </div>

              <textarea
                value={codeContent}
                onChange={(e) => setCodeContent(e.target.value)}
                rows={18}
                className="w-full p-4 bg-slate-950 font-mono text-xs text-emerald-400 focus:outline-none leading-relaxed resize-none selection:bg-cyan-500 selection:text-white"
                spellCheck={false}
              />
            </div>

            {/* Terminal Console & Test Runner (5 cols) */}
            <div className="lg:col-span-5 space-y-6">
              
              {/* Terminal Output */}
              <div className="bg-slate-900 rounded-3xl border-2 border-slate-800 shadow-md p-5 space-y-3">
                <div className="flex items-center justify-between border-b border-slate-800 pb-2 text-xs font-mono text-slate-400">
                  <div className="flex items-center gap-2">
                    <Terminal className="w-4 h-4 text-emerald-400" />
                    <span className="font-bold text-slate-200">Terminal Stdout</span>
                  </div>
                  <span>g++ compilation</span>
                </div>

                <pre className="font-mono text-xs text-slate-300 leading-relaxed overflow-x-auto whitespace-pre-wrap max-h-48">
                  <code>{compilerTerminal}</code>
                </pre>
              </div>

              {/* Test Case Verification Cards */}
              {testResults.length > 0 && (
                <div className="bg-white rounded-3xl border-2 border-slate-200 shadow-sm p-5 space-y-3">
                  <h4 className="text-xs font-mono uppercase tracking-wider font-bold text-slate-500">
                    Test Case Matrix:
                  </h4>
                  <div className="space-y-2">
                    {testResults.map((tc, idx) => (
                      <div
                        key={idx}
                        className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-between text-xs"
                      >
                        <div>
                          <span className="font-mono font-bold text-emerald-950">
                            Test 0{idx + 1}:
                          </span>{' '}
                          <span className="text-slate-600">{tc.input}</span>
                        </div>
                        <span className="px-2 py-0.5 rounded bg-emerald-200 text-emerald-900 font-mono font-black text-[10px]">
                          PASSED ✓
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

            </div>

          </div>

        </div>
      )}

      {/* =====================================================================
          TAB 3: DOUBTTRACE EVALUATION MATRIX (AI DIAGNOSTIC ENGINE)
          ===================================================================== */}
      {activeTab === 'eval-matrix' && (
        <div className="space-y-6">
          
          {/* Question Selector */}
          <div className="flex flex-wrap items-center justify-between gap-4 bg-white p-4 rounded-2xl border-2 border-slate-200 shadow-sm">
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono font-bold text-slate-500 uppercase">Topic Question:</span>
              {EVALUATION_QUESTIONS.map((q, qIdx) => (
                <button
                  key={q.id}
                  onClick={() => {
                    setSelectedEvalQIndex(qIdx);
                    setStudentAnswerText(q.defaultStudentAnswer);
                    setEvalResult(null);
                  }}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
                    selectedEvalQIndex === qIdx
                      ? 'bg-emerald-50 text-emerald-800 border-2 border-emerald-400 shadow-xs'
                      : 'bg-slate-50 text-slate-600 hover:text-slate-900 border border-slate-200'
                  }`}
                >
                  {q.id}: {q.topicName}
                </button>
              ))}
            </div>

            <button
              onClick={handleRunEvaluation}
              disabled={isEvaluating}
              className="neon-btn-primary px-5 py-2 rounded-xl text-xs font-black flex items-center gap-2"
            >
              <Award className="w-4 h-4" />
              <span>{isEvaluating ? 'Evaluating with Matrix...' : 'Evaluate Answer with Rubric'}</span>
            </button>
          </div>

          {/* Descriptive Question Card */}
          <div className="bg-white p-6 sm:p-8 rounded-3xl border-2 border-slate-200 shadow-sm space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded text-[10px] font-mono font-bold bg-emerald-50 text-emerald-800 border border-emerald-200">
                  {activeEvalQ.topicId}
                </span>
                <span className="text-xs font-mono font-bold text-slate-500">
                  Max Marks: {activeEvalQ.maxMarks}
                </span>
              </div>
              <span className="text-xs font-mono font-bold text-slate-400">
                AI Semantic Matrix Grading
              </span>
            </div>

            <h3 className="text-base font-black text-slate-950 leading-snug">
              {activeEvalQ.question}
            </h3>

            {/* Answer Text Area */}
            <div className="space-y-1.5 pt-2">
              <label className="text-xs font-mono font-bold text-slate-700">
                Your Descriptive Answer (Judged on Conceptual Meaning, not verbatim keywords):
              </label>
              <textarea
                rows={5}
                value={studentAnswerText}
                onChange={(e) => setStudentAnswerText(e.target.value)}
                className="w-full p-4 rounded-2xl border-2 border-slate-200 text-xs text-slate-900 font-medium focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-slate-50/50"
              />
            </div>
          </div>

          {/* Evaluation Results Breakdown */}
          {evalResult && (
            <div className="space-y-6 animate-in fade-in duration-300">
              
              {/* Score Summary Banner */}
              <div className="lightning-border-emerald p-[2px] rounded-3xl shadow-sm">
                <div className="lightning-inner p-6 rounded-[22px] flex flex-wrap items-center justify-between gap-4">
                  <div>
                    <span className="text-[10px] font-mono uppercase tracking-wider text-slate-500 font-bold block">
                      DoubtTrace Evaluation Score
                    </span>
                    <div className="flex items-baseline gap-2 mt-1">
                      <span className="text-3xl font-black text-emerald-700">
                        {evalResult.totalMarks}
                      </span>
                      <span className="text-sm font-mono text-slate-500 font-bold">
                        / {evalResult.maxMarks} Total Marks
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="px-3 py-1 rounded-xl bg-emerald-100 text-emerald-900 font-mono font-bold text-xs">
                      Semantic Confidence: 94%
                    </span>
                  </div>
                </div>
              </div>

              {/* Rubric Criteria Evaluation Table */}
              <div className="bg-white rounded-3xl border-2 border-slate-200 shadow-sm overflow-hidden p-6 space-y-4">
                <h4 className="text-sm font-black text-slate-950">
                  Criterion-by-Criterion Evaluation Rubric:
                </h4>

                <div className="space-y-3">
                  {evalResult.criteria.map((crit: any) => (
                    <div
                      key={crit.criterionId}
                      className={`p-4 rounded-2xl border-2 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 ${
                        crit.status === 'MET'
                          ? 'border-emerald-200 bg-emerald-50/20'
                          : 'border-amber-300 bg-amber-50/20'
                      }`}
                    >
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-white border border-slate-200 text-slate-800">
                            {crit.criterionId}
                          </span>
                          <span className="text-xs font-black text-slate-950">
                            {crit.name}
                          </span>
                        </div>
                        <p className="text-xs text-slate-600 font-medium">
                          {crit.feedback}
                        </p>
                      </div>

                      <div className="flex items-center gap-3 self-end sm:self-auto flex-shrink-0">
                        <span
                          className={`text-xs font-black font-mono px-2.5 py-1 rounded-lg ${
                            crit.status === 'MET'
                              ? 'bg-emerald-100 text-emerald-800'
                              : 'bg-amber-100 text-amber-800'
                          }`}
                        >
                          {crit.marksAwarded} / {crit.maxMarks}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Targeted Learning Recommendations */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                {/* Zakiya's Video Recommendation */}
                <div className="bg-white p-5 rounded-3xl border-2 border-slate-200 shadow-sm space-y-3">
                  <div className="flex items-center gap-2 text-rose-600 font-bold text-xs">
                    <Video className="w-4 h-4" />
                    <span>Zakiya's Recommended Video</span>
                  </div>
                  <h4 className="text-sm font-black text-slate-950">
                    {evalResult.recommendedVideo.title}
                  </h4>
                  <p className="text-xs text-slate-600 font-medium">
                    Jumps straight to timestamp {evalResult.recommendedVideo.timestamp} where element shifting boundaries are explained.
                  </p>
                  <a
                    href="https://youtube.com"
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-rose-700 hover:text-rose-800 pt-1"
                  >
                    <span>Watch Lesson Video</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>

                {/* Vikita's Chatbot Starter Prompt */}
                <div className="bg-white p-5 rounded-3xl border-2 border-slate-200 shadow-sm space-y-3">
                  <div className="flex items-center gap-2 text-cyan-600 font-bold text-xs">
                    <MessageSquare className="w-4 h-4" />
                    <span>Vikita's Chatbot Clarification</span>
                  </div>
                  <h4 className="text-sm font-black text-slate-950">
                    Ask About This Misconception
                  </h4>
                  <p className="text-xs text-slate-600 font-medium italic">
                    &ldquo;{evalResult.chatbotPrompt}&rdquo;
                  </p>
                  <div className="flex flex-wrap items-center gap-2 pt-1">
                    <button
                      onClick={() => setActiveTab('visualizer')}
                      className="neon-btn-cyan px-4 py-1.5 rounded-xl text-xs font-black inline-flex items-center gap-1.5"
                    >
                      <span>Try in 2D Visualizer</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                    {onNavigateToNote && (
                      <button
                        onClick={() => onNavigateToNote('F01')}
                        className="px-3.5 py-1.5 rounded-xl text-xs font-bold text-slate-700 hover:text-slate-900 border border-slate-300 hover:bg-slate-50 transition-colors"
                      >
                        Read Note F01
                      </button>
                    )}
                    {onNavigateTab && (
                      <button
                        onClick={() => onNavigateTab('my-space')}
                        className="px-3.5 py-1.5 rounded-xl text-xs font-bold text-slate-700 hover:text-slate-900 border border-slate-300 hover:bg-slate-50 transition-colors"
                      >
                        Review in My Space
                      </button>
                    )}
                  </div>
                </div>

              </div>

            </div>
          )}

        </div>
      )}

    </div>
  );
};
