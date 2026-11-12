import React, { useEffect, useMemo, useRef, useState } from 'react';
import {
  AlertTriangle,
  ArrowLeft,
  ArrowRight,
  Award,
  BookOpen,
  CheckCircle2,
  Lightbulb,
  RotateCcw,
  ShieldCheck,
  Timer
} from 'lucide-react';
import { AssessmentRecord, NavigationTab } from '../types';

interface EvaluationViewProps {
  initialTopicId?: string;
  initialMode?: 'practice' | 'test';
  onNavigateToNote: (noteId: string) => void;
  onNavigateTab?: (tab: NavigationTab) => void;
  onRecordAssessment?: (record: AssessmentRecord) => void;
}

interface RubricGroup {
  label: string;
  phrases: string[];
}

interface EvaluationQuestion {
  id: string;
  topicId: string;
  topicName: string;
  difficulty: 'Basic' | 'Intermediate' | 'Advanced';
  question: string;
  hint: string;
  keyIdeas: RubricGroup[];
  technicalTerms: RubricGroup[];
  exampleTerms: string[];
  recommendedNoteId: string;
  recommendedNoteSection: string;
  recommendation: string;
}

interface AnswerEvaluation {
  score: number;
  understood: string[];
  missing: string[];
  weaknesses: string[];
  recommendations: string[];
}

const makeQuestion = (
  topicId: string,
  topicName: string,
  number: number,
  difficulty: EvaluationQuestion['difficulty'],
  question: string,
  hint: string,
  keyIdeas: RubricGroup[],
  technicalTerms: RubricGroup[],
  exampleTerms: string[],
  recommendation: string,
  recommendedNoteId = 'D01-A01'
): EvaluationQuestion => ({
  id: `${topicId.toLowerCase()}_written_${number}`,
  topicId,
  topicName,
  difficulty,
  question,
  hint,
  keyIdeas,
  technicalTerms,
  exampleTerms,
  recommendedNoteId,
  recommendedNoteSection: topicName,
  recommendation
});

const ARRAY_QUESTIONS: EvaluationQuestion[] = [
  makeQuestion('ARR-01', 'Array Fundamentals', 1, 'Basic',
    'Explain in your own words how an array stores elements in memory and how an element is accessed by index.',
    'Consider contiguous storage, the base address, the index, and the element size.',
    [
      { label: 'Elements occupy contiguous memory locations', phrases: ['contiguous', 'consecutive memory', 'adjacent memory'] },
      { label: 'An index identifies an element position', phrases: ['index', 'position', 'offset'] },
      { label: 'Address calculation uses the base address and element size', phrases: ['base address', 'element size', 'address calculation', 'base +'] }
    ],
    [
      { label: 'Constant-time random access', phrases: ['o(1)', 'constant time', 'direct access'] }
    ],
    ['for example', 'e.g.', 'suppose', 'such as', 'arr[', 'index 2'],
    'Review contiguous storage, zero-based indexing, and the array address formula.'),
  makeQuestion('ARR-01', 'Array Fundamentals', 2, 'Intermediate',
    'An integer array starts at address 1000 and each integer occupies 4 bytes. Explain how you would find the address of element at index 2.',
    'Describe the formula and show how the index and element size are used.',
    [
      { label: 'Use the base address plus index times element size', phrases: ['base address', 'index', 'element size', 'base +', '1000 +'] },
      { label: 'The calculated address is 1008', phrases: ['1008', '1000 + 2 * 4', '1000 + (2', '2 * 4'] }
    ],
    [{ label: 'Integer byte size is 4', phrases: ['4 bytes', 'four bytes'] }],
    ['1008', 'index 2', '1000'],
    'Practice translating array indexes into memory offsets.'),
  makeQuestion('ARR-01', 'Array Fundamentals', 3, 'Advanced',
    'A student says that a length-5 array has valid indexes 1 through 5. Explain the error, identify the valid range, and describe one risk of using index 5.',
    'Connect zero-based indexing to the last valid index and out-of-bounds access.',
    [
      { label: 'Array indexing starts at zero', phrases: ['zero based', 'starts at zero', 'index 0'] },
      { label: 'Valid indexes are 0 through length minus 1', phrases: ['0 through 4', '0 to 4', 'length - 1', 'n - 1'] },
      { label: 'Index 5 is outside the array bounds', phrases: ['out of bounds', 'outside the array', 'invalid index', 'undefined behavior'] }
    ],
    [{ label: 'The final valid index is one less than the length', phrases: ['last valid index', 'length minus one', 'n - 1'] }],
    ['length 5', 'index 5', '0 through 4', '0 to 4'],
    'Revise array bounds and safe index checks.'),

  makeQuestion('ARR-02', 'Array Traversal', 1, 'Basic',
    'Describe what array traversal means and give the safe loop boundaries for visiting all n elements once.',
    'Start from the first valid index and stop before the length.',
    [
      { label: 'Traversal visits elements systematically', phrases: ['visit each', 'process each', 'iterate through', 'traverse'] },
      { label: 'A forward traversal starts at index zero', phrases: ['start at zero', 'i = 0', 'index 0'] },
      { label: 'The loop stops before index n', phrases: ['i < n', 'less than n', 'stop before n'] }
    ],
    [{ label: 'One pass is linear time', phrases: ['o(n)', 'linear time', 'linear'] }],
    ['for loop', 'while loop', 'i < n'],
    'Review loop boundaries and array traversal complexity.'),
  makeQuestion('ARR-02', 'Array Traversal', 2, 'Intermediate',
    'Explain how to traverse [10, 20, 30, 40] in reverse order. Include the starting index, update step, and stopping condition.',
    'The last valid index is length minus one.',
    [
      { label: 'Start from the last valid index', phrases: ['index 3', 'n - 1', 'length - 1', 'last index'] },
      { label: 'Move toward lower indexes', phrases: ['decrement', '--i', 'i--', 'move backward'] },
      { label: 'Include index zero without going below it', phrases: ['i >= 0', 'stop at zero', 'index 0'] }
    ],
    [{ label: 'The given array has four elements', phrases: ['four elements', 'length 4', 'index 3'] }],
    ['40, 30, 20, 10', '40 then 30', 'index 3'],
    'Practice reverse traversal and its loop condition.'),
  makeQuestion('ARR-02', 'Array Traversal', 3, 'Advanced',
    'A loop uses i <= n to traverse an array of length n. Explain what happens on its final iteration, the bug it can cause, and how to correct it.',
    'Compare the loop condition with the last valid index.',
    [
      { label: 'The final iteration accesses index n', phrases: ['index n', 'i = n', 'i equals n'] },
      { label: 'Index n is out of bounds', phrases: ['out of bounds', 'outside the array', 'invalid access'] },
      { label: 'Use a strict less-than condition', phrases: ['i < n', 'less than n', 'change <= to <'] }
    ],
    [{ label: 'The last valid index is n minus one', phrases: ['n - 1', 'length - 1', 'last valid index'] }],
    ['i <= n', 'i < n', 'array length'],
    'Revise boundary conditions and out-of-bounds access.'),

  makeQuestion('ARR-03', 'Array Searching', 1, 'Basic',
    'Explain how linear search finds a target in an array and what it reports if the target is absent.',
    'Describe how elements are checked and how failure can be represented.',
    [
      { label: 'Compare elements with the target one by one', phrases: ['one by one', 'each element', 'compare', 'check each'] },
      { label: 'Stop when a match is found', phrases: ['match is found', 'target is found', 'return the index'] },
      { label: 'Represent absence explicitly', phrases: ['not found', '-1', 'sentinel'] }
    ],
    [{ label: 'Worst-case linear search is O(n)', phrases: ['o(n)', 'linear time', 'all n elements'] }],
    ['for example', 'suppose', 'target 30', 'not found'],
    'Review linear search and the not-found result.'),
  makeQuestion('ARR-03', 'Array Searching', 2, 'Intermediate',
    'Walk through a linear search for 30 in [10, 20, 30, 40]. State the comparisons and the result.',
    'Check values from the first index in order until the target is found.',
    [
      { label: 'Checks 10, then 20, then 30', phrases: ['10', '20', '30', 'first', 'next'] },
      { label: 'Finds the target at index 2', phrases: ['index 2', 'position 3', 'third element'] },
      { label: 'Stops after the match', phrases: ['stop', 'return', 'found'] }
    ],
    [{ label: 'The number of comparisons is three', phrases: ['three comparisons', '3 comparisons', 'three checks'] }],
    ['10, 20, 30', 'index 2', 'three comparisons'],
    'Practice tracing search steps and returning an index.'),
  makeQuestion('ARR-03', 'Array Searching', 3, 'Advanced',
    'Compare linear search and binary search for an unsorted array. Explain which one is safe to use as-is and what condition binary search requires.',
    'Focus on ordering and why binary search can discard part of the range.',
    [
      { label: 'Linear search does not require sorted input', phrases: ['linear search', 'unsorted', 'does not require sorted'] },
      { label: 'Binary search requires sorted input', phrases: ['binary search', 'sorted'] },
      { label: 'Binary search discards half the search range', phrases: ['half', 'halve', 'middle', 'discard'] }
    ],
    [{ label: 'Linear search is O(n), binary search is O(log n)', phrases: ['o(n)', 'o(log n)', 'logarithmic'] }],
    ['for example', 'if the array', 'sorted array'],
    'Revise search preconditions and time complexity.'),

  makeQuestion('ARR-04', 'Array Insertion', 1, 'Basic',
    'Explain the steps needed to insert a value into the middle of an array while preserving the order of existing values.',
    'Consider available capacity and the direction in which elements shift.',
    [
      { label: 'Check the insertion position and available capacity', phrases: ['position', 'valid index', 'capacity', 'space'] },
      { label: 'Shift elements from the end toward the insertion point', phrases: ['shift', 'from the end', 'right', 'backward'] },
      { label: 'Place the value and update the logical length', phrases: ['place the value', 'insert the value', 'length', 'size'] }
    ],
    [{ label: 'Shifting prevents overwriting elements', phrases: ['overwrite', 'preserve', 'avoid losing'] }],
    ['for example', 'insert 25', 'index 2'],
    'Review insertion order, capacity checks, and element shifting.'),
  makeQuestion('ARR-04', 'Array Insertion', 2, 'Intermediate',
    'An array contains [10, 20, 30, 40]. Explain every shift needed to insert 25 at index 2 and give the final array.',
    'Move values right starting at the last element, then write 25 at index 2.',
    [
      { label: 'Shift 40 from index 3 to index 4', phrases: ['40', 'index 3', 'index 4'] },
      { label: 'Shift 30 from index 2 to index 3', phrases: ['30', 'index 2', 'index 3'] },
      { label: 'Write 25 at index 2', phrases: ['25', 'index 2'] },
      { label: 'Final array is [10, 20, 25, 30, 40]', phrases: ['10, 20, 25, 30, 40', '[10, 20, 25, 30, 40]'] }
    ],
    [{ label: 'Shift from right to left to preserve values', phrases: ['right to left', 'from the end', 'backward'] }],
    ['40 to index 4', '30 to index 3', 'final array'],
    'Practice tracing insertion shifts and verifying the final sequence.'),
  makeQuestion('ARR-04', 'Array Insertion', 3, 'Advanced',
    'Why is inserting at the beginning or middle of an array usually more expensive than accessing an element by index? Compare their time complexity and explain the work involved.',
    'Contrast direct address calculation with moving existing elements.',
    [
      { label: 'Indexed access uses direct address calculation', phrases: ['direct address', 'address calculation', 'index times', 'direct access'] },
      { label: 'Insertion may shift many elements', phrases: ['shift', 'move elements', 'copy elements'] },
      { label: 'Insertion is linear while access is constant time', phrases: ['o(n)', 'o(1)', 'linear', 'constant time'] }
    ],
    [{ label: 'Insertion may also require available capacity', phrases: ['capacity', 'resize', 'space'] }],
    ['for example', 'beginning', 'middle'],
    'Revise the cost of array updates versus indexed reads.'),

  makeQuestion('ARR-05', 'Array Deletion', 1, 'Basic',
    'Explain how deleting an element from the middle of an ordered array works and what happens to the logical length.',
    'Describe the gap left by deletion and how later values fill it.',
    [
      { label: 'Remove or mark the target element', phrases: ['remove', 'delete', 'target element'] },
      { label: 'Shift later elements left to close the gap', phrases: ['shift', 'left', 'close the gap'] },
      { label: 'Decrease the logical length by one', phrases: ['length', 'size', 'decrease by one', 'minus one'] }
    ],
    [{ label: 'Element order is preserved', phrases: ['preserve order', 'keep the order', 'ordered'] }],
    ['for example', 'delete index', 'remove 20'],
    'Review deletion shifts and logical array length.'),
  makeQuestion('ARR-05', 'Array Deletion', 2, 'Intermediate',
    'An array contains [10, 20, 30, 40]. Explain how to delete the value at index 1 and give the resulting logical array.',
    'After removing 20, shift later values one position toward the beginning.',
    [
      { label: 'Delete 20 at index 1', phrases: ['20', 'index 1'] },
      { label: 'Move 30 to index 1 and 40 to index 2', phrases: ['30', 'index 1', '40', 'index 2'] },
      { label: 'The logical array becomes [10, 30, 40]', phrases: ['10, 30, 40', '[10, 30, 40]'] }
    ],
    [{ label: 'Logical length decreases from four to three', phrases: ['length 3', 'three elements', 'decrease'] }],
    ['10, 30, 40', 'move 30', 'move 40'],
    'Practice tracing deletion and updating the logical length.'),
  makeQuestion('ARR-05', 'Array Deletion', 3, 'Advanced',
    'Analyze the cost of deleting the first element in an array. Explain how many elements may move and why deletion from an array is not always O(1).',
    'Consider the need to keep the remaining values contiguous and ordered.',
    [
      { label: 'Remaining values shift left', phrases: ['shift left', 'move left', 'copy left'] },
      { label: 'Up to n minus one elements move', phrases: ['n - 1', 'all remaining', 'remaining elements'] },
      { label: 'The worst-case time is O(n)', phrases: ['o(n)', 'linear time', 'linear'] }
    ],
    [{ label: 'Order or contiguous representation is preserved', phrases: ['preserve order', 'contiguous', 'close the gap'] }],
    ['for example', 'first element', 'array of n'],
    'Revise array deletion complexity and element movement.'),

  makeQuestion('D02-L01', 'Linked Lists', 1, 'Basic',
    'Explain how a singly linked list stores its elements and how one node leads to the next.',
    'Describe the node data, link, and list head.',
    [
      { label: 'Each node stores data and a link/reference', phrases: ['node', 'data', 'pointer', 'link', 'next'] },
      { label: 'The head identifies the first node', phrases: ['head', 'first node'] },
      { label: 'Nodes need not be contiguous in memory', phrases: ['not contiguous', 'separate memory', 'dynamic memory'] }
    ],
    [{ label: 'The last node points to null', phrases: ['null', 'nullptr', 'last node'] }],
    ['for example', 'node 1', 'next node'],
    'Review node structure, head pointers, and null termination.'),
  makeQuestion('D02-L01', 'Linked Lists', 2, 'Intermediate',
    'Describe how to insert a new node after a given node in a singly linked list. Explain the order of link updates and why it matters.',
    'Preserve the old next link before connecting the new node.',
    [
      { label: 'Create or initialize the new node', phrases: ['new node', 'create node', 'initialize'] },
      { label: 'Connect the new node to the old successor', phrases: ['new node next', 'old successor', 'current next'] },
      { label: 'Connect the given node to the new node', phrases: ['current next', 'point to new', 'link to new'] }
    ],
    [{ label: 'Link order avoids losing the rest of the list', phrases: ['lose the rest', 'preserve the rest', 'before changing', 'otherwise lose'] }],
    ['for example', 'a -> b', 'a -> new'],
    'Practice safe pointer updates during list insertion.'),
  makeQuestion('D02-L01', 'Linked Lists', 3, 'Advanced',
    'A deletion routine sets current.next to current.next.next. Analyze what can go wrong if current is the last node or current.next is null, and describe a safe check.',
    'Consider null pointers and the boundary conditions before dereferencing.',
    [
      { label: 'Dereferencing null is invalid', phrases: ['null', 'nullptr', 'dereference', 'invalid'] },
      { label: 'Check current and current.next before accessing next.next', phrases: ['check', 'guard', 'current.next', 'before dereference'] },
      { label: 'Handle deleting the head separately when needed', phrases: ['head', 'first node', 'special case'] }
    ],
    [{ label: 'The last node has no successor', phrases: ['last node', 'no successor', 'next is null'] }],
    ['if', 'nullptr', 'current.next'],
    'Revise null safety and deletion boundary cases.'),

  makeQuestion('D03-S01', 'Stacks', 1, 'Basic',
    'Explain the LIFO rule for a stack and identify where push and pop operate.',
    'Think about which item is accessible without removing other items.',
    [
      { label: 'LIFO means last in, first out', phrases: ['last in first out', 'lifo'] },
      { label: 'Push adds an item at the top', phrases: ['push', 'top', 'add'] },
      { label: 'Pop removes or returns the top item', phrases: ['pop', 'remove', 'top'] }
    ],
    [{ label: 'Only the top is directly accessed', phrases: ['top only', 'top element', 'top of the stack'] }],
    ['for example', 'push 1', 'push 2'],
    'Review stack operations and their LIFO behavior.'),
  makeQuestion('D03-S01', 'Stacks', 2, 'Intermediate',
    'A stack is empty. Explain the result of pushing A, then B, then C, and popping once. What remains at the top?',
    'The most recently pushed value is removed first.',
    [
      { label: 'Push order is A, then B, then C', phrases: ['a', 'b', 'c', 'push'] },
      { label: 'Pop removes C', phrases: ['pop c', 'c is removed', 'c removed'] },
      { label: 'B is now at the top', phrases: ['b is top', 'top is b', 'b remains'] }
    ],
    [{ label: 'Stack follows LIFO', phrases: ['lifo', 'last in first out', 'most recent'] }],
    ['a then b then c', 'c is removed', 'b is top'],
    'Practice tracing push and pop sequences.'),
  makeQuestion('D03-S01', 'Stacks', 3, 'Advanced',
    'A program pops from a stack without checking whether it is empty. Explain the failure risk and propose a robust precondition or error-handling approach.',
    'Consider underflow and how the program should detect it before pop.',
    [
      { label: 'Popping an empty stack causes underflow or invalid behavior', phrases: ['underflow', 'empty stack', 'invalid'] },
      { label: 'Check whether the stack is empty before popping', phrases: ['check empty', 'is empty', 'empty()'] },
      { label: 'Handle failure explicitly', phrases: ['error', 'exception', 'return status', 'handle'] }
    ],
    [{ label: 'A precondition protects the top operation', phrases: ['precondition', 'before pop', 'top'] }],
    ['if', 'empty', 'before pop'],
    'Review stack underflow checks and safe operation contracts.'),

  makeQuestion('D04-Q01', 'Queues', 1, 'Basic',
    'Explain the FIFO rule for a queue and describe where enqueue and dequeue occur.',
    'Identify the arrival end and the service/removal end.',
    [
      { label: 'FIFO means first in, first out', phrases: ['first in first out', 'fifo'] },
      { label: 'Enqueue adds at the rear/back', phrases: ['enqueue', 'rear', 'back', 'add'] },
      { label: 'Dequeue removes from the front', phrases: ['dequeue', 'front', 'remove'] }
    ],
    [{ label: 'The oldest item is removed first', phrases: ['oldest', 'first item', 'first added'] }],
    ['for example', 'arrives first', 'line'],
    'Review queue ordering and front/rear operations.'),
  makeQuestion('D04-Q01', 'Queues', 2, 'Intermediate',
    'A queue is empty. Explain the order of items after enqueueing 10, 20, and 30, then dequeueing once. What is at the front?',
    'The earliest enqueued item leaves first.',
    [
      { label: 'Enqueue order is 10, then 20, then 30', phrases: ['10', '20', '30', 'enqueue'] },
      { label: 'Dequeue removes 10', phrases: ['remove 10', '10 is removed', '10 leaves'] },
      { label: '20 becomes the front', phrases: ['20 is front', 'front is 20', '20 becomes front'] }
    ],
    [{ label: 'Queue follows FIFO', phrases: ['fifo', 'first in first out', 'oldest'] }],
    ['10, 20, 30', 'remove 10', 'front is 20'],
    'Practice tracing enqueue and dequeue sequences.'),
  makeQuestion('D04-Q01', 'Queues', 3, 'Advanced',
    'A circular array queue moves its front index past the final array slot. Explain how wraparound works, how to distinguish full from empty, and one boundary condition to validate.',
    'Use modulo arithmetic and account for the queue’s size/capacity representation.',
    [
      { label: 'Indices wrap to the beginning using modulo', phrases: ['modulo', '%', 'wrap around', 'wraparound'] },
      { label: 'Queue tracks enough state to distinguish full and empty', phrases: ['full', 'empty', 'size', 'count', 'flag'] },
      { label: 'Validate bounds/capacity before enqueue or dequeue', phrases: ['capacity', 'bounds', 'check', 'overflow', 'underflow'] }
    ],
    [{ label: 'Circular indexing uses array capacity', phrases: ['capacity', 'array length', 'modulo'] }],
    ['front', 'rear', 'capacity'],
    'Review circular queue indexing and full/empty conditions.')
];

const FOUNDATION_QUESTIONS: EvaluationQuestion[] = [
  makeQuestion('F01', 'Variables and Data Types', 1, 'Basic',
    'Explain the difference between an integer value and a floating-point value, and give one situation where choosing the type matters.',
    'Consider the values represented and how arithmetic behaves.',
    [
      { label: 'Integer types represent whole-number values', phrases: ['whole number', 'integer', 'no fractional'] },
      { label: 'Floating-point types represent fractional values', phrases: ['fraction', 'decimal', 'floating point', 'double'] }
    ],
    [{ label: 'Integer division can discard a fractional part', phrases: ['integer division', 'truncate', 'fractional part'] }],
    ['for example', 'average', '2.5'],
    'Review numeric types and conversion in the linked note.', 'F01'),
  makeQuestion('F01', 'Variables and Data Types', 2, 'Intermediate',
    'In C++, what result is assigned to avg in the code below, and why? Explain how to preserve the fractional result.\n\nint total = 5;\\nint count = 2;\\ndouble avg = total / count;',
    'The division happens before assignment to avg.',
    [
      { label: 'Both operands are integers', phrases: ['both operands', 'both are int', 'integer operands'] },
      { label: 'Integer division produces 2 before conversion', phrases: ['integer division', 'result is 2', 'truncat', '2.0'] },
      { label: 'Cast an operand or use floating-point arithmetic', phrases: ['cast', 'static_cast', 'double', 'floating'] }
    ],
    [{ label: 'Casting before division preserves the fraction', phrases: ['before division', 'static_cast<double>', '2.5'] }],
    ['2.5', 'static_cast', 'double'],
    'Review integer division and explicit conversions.', 'F01'),
  makeQuestion('F01', 'Variables and Data Types', 3, 'Advanced',
    'Identify the issue in `const int maxCapacity; maxCapacity = 100;`. Explain when a const variable must receive its value and provide a corrected approach.',
    'A const object cannot be assigned a value after it has been created.',
    [
      { label: 'A const variable must be initialized at declaration', phrases: ['initialize', 'initialization', 'declaration'] },
      { label: 'A const variable cannot be reassigned later', phrases: ['cannot be reassigned', 'immutable', 'cannot change'] },
      { label: 'Provide a declaration with an initializer', phrases: ['const int maxcapacity = 100', '= 100', 'initialize to 100'] }
    ],
    [{ label: 'The shown code is a compile-time error', phrases: ['compile time', 'compilation error', 'compiler error'] }],
    ['const int maxCapacity = 100', 'at declaration'],
    'Review const initialization rules.', 'F01')
];

const QUESTION_BANK = [...FOUNDATION_QUESTIONS, ...ARRAY_QUESTIONS];

const normalize = (value: string) =>
  value.toLowerCase().replace(/[^a-z0-9+<>]+/g, ' ').trim();

const containsPhrase = (answer: string, phrases: string[]) => {
  const normalizedAnswer = normalize(answer);
  return phrases.some((phrase) => normalizedAnswer.includes(normalize(phrase)));
};

const evaluateAnswer = (
  question: EvaluationQuestion,
  answer: string
): AnswerEvaluation => {
  const wordCount = answer.trim().split(/\s+/).filter(Boolean).length;
  if (wordCount === 0) {
    return {
      score: 0,
      understood: [],
      missing: question.keyIdeas.map((group) => group.label),
      weaknesses: ['No answer was submitted for this question.'],
      recommendations: [question.recommendation]
    };
  }
  const matchedIdeas = question.keyIdeas.filter((group) =>
    containsPhrase(answer, group.phrases)
  );
  const matchedTerms = question.technicalTerms.filter((group) =>
    containsPhrase(answer, group.phrases)
  );
  const reasoningMarkers = [
    'because', 'therefore', 'so that', 'which means', 'as a result', 'since',
    'first', 'then', 'next', 'finally', 'consequently', 'this causes'
  ];
  const hasReasoning = containsPhrase(answer, reasoningMarkers);
  const hasExample = question.exampleTerms.length === 0 ||
    containsPhrase(answer, question.exampleTerms);
  const completeness = Math.min(100, Math.round((wordCount / 35) * 100));
  const conceptual = Math.round((matchedIdeas.length / question.keyIdeas.length) * 100);
  const technical = question.technicalTerms.length === 0
    ? 100
    : Math.round((matchedTerms.length / question.technicalTerms.length) * 100);
  const reasoning = hasReasoning ? 100 : wordCount >= 25 ? 60 : 25;
  const example = hasExample ? 100 : 25;
  const score = Math.round(
    conceptual * 0.35 +
    technical * 0.25 +
    reasoning * 0.2 +
    example * 0.1 +
    completeness * 0.1
  );
  const missing = question.keyIdeas
    .filter((group) => !matchedIdeas.includes(group))
    .map((group) => group.label);
  const weaknesses = [
    ...(missing.length > 0 ? ['Some central concept points were not identified in the response.'] : []),
    ...(matchedTerms.length < question.technicalTerms.length
      ? ['Include more precise DSA terminology or technical details.']
      : []),
    ...(!hasReasoning ? ['Explain why the steps work or what effect they have.'] : []),
    ...(!hasExample ? ['Add a concrete example or trace the given values.'] : []),
    ...(wordCount < 25 ? ['Expand the explanation; it is brief for a descriptive response.'] : [])
  ];
  const understood = [
    ...matchedIdeas.map((group) => group.label),
    ...matchedTerms.map((group) => group.label)
  ];

  return {
    score,
    understood,
    missing,
    weaknesses,
    recommendations: [question.recommendation]
  };
};

const TOPICS = Array.from(
  new Map(QUESTION_BANK.map((question) => [question.topicId, question.topicName])).entries()
);

export const EvaluationView: React.FC<EvaluationViewProps> = ({
  initialTopicId = 'F01',
  initialMode = 'practice',
  onNavigateToNote,
  onNavigateTab,
  onRecordAssessment
}) => {
  const [selectedTopicId, setSelectedTopicId] = useState(initialTopicId);
  const [activeMode, setActiveMode] = useState<'practice' | 'test'>(initialMode);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [submittedAnswers, setSubmittedAnswers] = useState<Record<string, string>>({});
  const [showHint, setShowHint] = useState(false);
  const [assessmentSubmitted, setAssessmentSubmitted] = useState(false);
  const [timeLeftSeconds, setTimeLeftSeconds] = useState(900);
  const [validationMessage, setValidationMessage] = useState('');
  const [timedOut, setTimedOut] = useState(false);

  const questions = useMemo(
    () => QUESTION_BANK.filter((question) => question.topicId === selectedTopicId),
    [selectedTopicId]
  );
  const currentQuestion = questions[currentQuestionIndex];
  const currentAnswer = currentQuestion ? answers[currentQuestion.id] ?? '' : '';
  const currentEvaluation = currentQuestion && submittedAnswers[currentQuestion.id] === currentAnswer
    ? evaluateAnswer(currentQuestion, currentAnswer)
    : null;
  const answerEvaluations = questions.map((question) =>
    evaluateAnswer(question, answers[question.id] ?? '')
  );
  const scorePercentage = questions.length
    ? Math.round(answerEvaluations.reduce((total, result) => total + result.score, 0) / questions.length)
    : 0;
  const completedAnswers = questions.filter(
    (question) => (answers[question.id] ?? '').trim().length > 0
  ).length;
  const allWeaknesses = Array.from(new Set(answerEvaluations.flatMap((result) => result.weaknesses)));
  const allMissingConcepts = Array.from(new Set(answerEvaluations.flatMap((result) => result.missing)));
  const allRecommendations = Array.from(new Set(answerEvaluations.flatMap((result) => result.recommendations)));

  const resetAssessment = (mode = activeMode, topicId = selectedTopicId) => {
    setActiveMode(mode);
    setSelectedTopicId(topicId);
    setCurrentQuestionIndex(0);
    setAnswers({});
    setSubmittedAnswers({});
    setShowHint(false);
    setAssessmentSubmitted(false);
    setTimeLeftSeconds(900);
    setValidationMessage('');
    setTimedOut(false);
  };

  const handleSubmitCurrentAnswer = () => {
    if (!currentQuestion || !currentAnswer.trim()) {
      setValidationMessage('Write an answer before submitting this question.');
      return;
    }
    setSubmittedAnswers((previous) => ({
      ...previous,
      [currentQuestion.id]: currentAnswer
    }));
    setValidationMessage('');
  };

  const completeAssessment = (expired = false) => {
    const unanswered = questions.filter((question) => !(answers[question.id] ?? '').trim());
    const unsubmitted = questions.filter(
      (question) => submittedAnswers[question.id] !== answers[question.id]
    );
    if (!expired && unanswered.length > 0) {
      setValidationMessage(`Answer all questions before completing. ${unanswered.length} remain unanswered.`);
      const firstUnanswered = questions.findIndex(
        (question) => !(answers[question.id] ?? '').trim()
      );
      setCurrentQuestionIndex(firstUnanswered);
      return;
    }
    if (!expired && unsubmitted.length > 0) {
      setValidationMessage('Submit each answer before completing the assessment.');
      const firstUnsubmitted = questions.findIndex(
        (question) => submittedAnswers[question.id] !== answers[question.id]
      );
      setCurrentQuestionIndex(firstUnsubmitted);
      return;
    }

    setTimedOut(expired);
    setAssessmentSubmitted(true);
    setValidationMessage('');
    const results = questions.map((question) =>
      evaluateAnswer(question, answers[question.id] ?? '')
    );
    const overallScore = questions.length
      ? Math.round(results.reduce((total, result) => total + result.score, 0) / questions.length)
      : 0;
    const recordId = `written_${selectedTopicId}_${Date.now()}`;
    onRecordAssessment?.({
      id: recordId,
      title: `${questions[0]?.topicName ?? selectedTopicId} written assessment`,
      mode: activeMode,
      score: overallScore,
      scorePercentage: overallScore,
      totalQuestions: questions.length,
      correctCount: results.filter((result) => result.score >= 70).length,
      date: new Date().toLocaleString(),
      topic: selectedTopicId,
      topicId: selectedTopicId,
      topicName: questions[0]?.topicName,
      completedAt: new Date().toISOString(),
      misconceptionsDetected: Array.from(new Set(results.flatMap((result) => result.missing)))
    });
  };

  const completeRef = useRef(completeAssessment);
  completeRef.current = completeAssessment;

  useEffect(() => {
    if (activeMode !== 'test' || assessmentSubmitted) return;
    if (timeLeftSeconds === 0) {
      completeRef.current(true);
      return;
    }
    const timerId = window.setTimeout(
      () => setTimeLeftSeconds((remaining) => remaining - 1),
      1000
    );
    return () => window.clearTimeout(timerId);
  }, [activeMode, assessmentSubmitted, timeLeftSeconds]);

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainder = seconds % 60;
    return `${minutes}:${remainder.toString().padStart(2, '0')}`;
  };

  const changeTopic = (topicId: string) => resetAssessment(activeMode, topicId);

  const overallStatus = scorePercentage >= 70 ? 'On track' : 'Needs more practice';

  return (
    <div className="flex-1 py-8 px-6 sm:px-10 max-w-6xl mx-auto w-full space-y-8 animate-in fade-in duration-300">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-slate-200/90">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded border border-emerald-200">
              Evaluation &amp; Diagnostics
            </span>
            <span className="text-slate-300">&bull;</span>
            <span className="text-xs font-mono text-slate-500 font-semibold">
              {activeMode === 'practice' ? 'Practice Mode · repeatable' : 'Final Assessment · timed'}
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Written Concept Assessment
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 font-medium">
            Explain your reasoning in your own words. Feedback uses a transparent local checklist, not AI grading.
          </p>
        </div>
        <div className="flex items-center bg-slate-100 p-1.5 rounded-2xl border border-slate-200 self-start shadow-xs">
          <button
            type="button"
            onClick={() => resetAssessment('practice')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
              activeMode === 'practice' ? 'bg-emerald-600 text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Lightbulb className="w-3.5 h-3.5" />
            Practice
          </button>
          <button
            type="button"
            onClick={() => resetAssessment('test')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
              activeMode === 'test' ? 'bg-cyan-600 text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Timer className="w-3.5 h-3.5" />
            Final Assessment
          </button>
        </div>
      </header>

      <section className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex flex-wrap items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs font-mono text-slate-500 uppercase tracking-wider font-bold mr-1">Topic:</span>
          {TOPICS.map(([topicId, topicName]) => (
            <button
              type="button"
              key={topicId}
              onClick={() => changeTopic(topicId)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                selectedTopicId === topicId
                  ? 'bg-emerald-50 text-emerald-800 border-2 border-emerald-400'
                  : 'bg-slate-50 text-slate-600 hover:text-slate-900 border border-slate-200'
              }`}
            >
              {topicName}
            </button>
          ))}
        </div>
        {activeMode === 'test' && !assessmentSubmitted && (
          <div className="flex items-center gap-2 bg-cyan-50 border border-cyan-300 px-3.5 py-1.5 rounded-xl font-mono text-xs text-cyan-800 font-bold">
            <Timer className="w-4 h-4 text-cyan-600" />
            <span>Time remaining: <strong>{formatTime(timeLeftSeconds)}</strong></span>
          </div>
        )}
      </section>

      {!assessmentSubmitted && currentQuestion ? (
        <div className="grid lg:grid-cols-12 gap-8 items-start">
          <section className="lg:col-span-8 bg-white p-6 sm:p-9 rounded-3xl border-2 border-slate-200/90 shadow-md space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 pb-4">
              <div>
                <span className="text-xs font-mono font-bold text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded border border-emerald-200">
                  Question {currentQuestionIndex + 1} of {questions.length}
                </span>
                <span className="ml-2 text-xs font-bold text-slate-500">
                  {currentQuestion.difficulty}
                </span>
              </div>
              <span className="text-xs text-slate-500 font-medium">
                {completedAnswers} of {questions.length} answered
              </span>
            </div>

            <div className="flex gap-1.5" aria-label="Question progress">
              {questions.map((question, index) => {
                const answered = Boolean((answers[question.id] ?? '').trim());
                return (
                  <button
                    type="button"
                    key={question.id}
                    onClick={() => {
                      setCurrentQuestionIndex(index);
                      setShowHint(false);
                      setValidationMessage('');
                    }}
                    aria-label={`Go to question ${index + 1}${answered ? ', answered' : ', unanswered'}`}
                    className={`h-2 flex-1 rounded-full transition-colors ${
                      index === currentQuestionIndex
                        ? 'bg-emerald-600'
                        : answered
                        ? 'bg-emerald-300'
                        : 'bg-slate-200'
                    }`}
                  />
                );
              })}
            </div>

            <div className="space-y-3">
              <h2 className="text-base sm:text-lg font-bold text-slate-900 leading-relaxed whitespace-pre-line">
                {currentQuestion.question}
              </h2>
              <label htmlFor="written-answer" className="block text-xs font-bold text-slate-600">
                Your explanation
              </label>
              <textarea
                id="written-answer"
                value={currentAnswer}
                onChange={(event) => {
                  setAnswers((previous) => ({ ...previous, [currentQuestion.id]: event.target.value }));
                  setValidationMessage('');
                }}
                rows={8}
                placeholder="Explain your thinking step by step. Include relevant concepts and an example where appropriate."
                className="w-full resize-y rounded-2xl border-2 border-slate-200 bg-slate-50 p-4 text-sm leading-relaxed text-slate-900 placeholder:text-slate-400 focus:border-emerald-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-100"
              />
              <div className="flex justify-between text-[11px] text-slate-500">
                <span>Answers are saved as you move between questions.</span>
                <span>{currentAnswer.trim().split(/\s+/).filter(Boolean).length} words</span>
              </div>
            </div>

            {validationMessage && (
              <p role="alert" className="rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-xs font-bold text-rose-800">
                {validationMessage}
              </p>
            )}

            {activeMode === 'practice' && currentEvaluation && (
              <div className={`rounded-2xl border p-4 space-y-3 ${
                currentEvaluation.score >= 70 ? 'bg-emerald-50 border-emerald-200' : 'bg-orange-50 border-orange-200'
              }`}>
                <div className="flex items-center justify-between gap-3">
                  <span className="flex items-center gap-2 text-sm font-black text-slate-900">
                    {currentEvaluation.score >= 70
                      ? <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                      : <AlertTriangle className="h-4 w-4 text-orange-600" />}
                    Local rubric feedback
                  </span>
                  <span className="text-sm font-black text-slate-900">{currentEvaluation.score}%</span>
                </div>
                <FeedbackDetails evaluation={currentEvaluation} />
              </div>
            )}

            {activeMode === 'practice' && showHint && (
              <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-900">
                <strong className="mr-1">Practice hint:</strong>{currentQuestion.hint}
              </div>
            )}

            <div className="flex flex-wrap items-center justify-between gap-3 border-t border-slate-100 pt-4">
              <button
                type="button"
                disabled={currentQuestionIndex === 0}
                onClick={() => {
                  setCurrentQuestionIndex((index) => index - 1);
                  setShowHint(false);
                  setValidationMessage('');
                }}
                className="inline-flex items-center gap-2 px-3 py-2 text-xs font-bold text-slate-600 hover:text-slate-900 disabled:opacity-40"
              >
                <ArrowLeft className="h-4 w-4" /> Previous
              </button>
              <div className="flex flex-wrap items-center gap-2">
                {activeMode === 'practice' && !showHint && (
                  <button
                    type="button"
                    onClick={() => setShowHint(true)}
                    className="inline-flex items-center gap-2 rounded-xl border border-amber-300 bg-amber-50 px-3 py-2 text-xs font-bold text-amber-800 hover:bg-amber-100"
                  >
                    <Lightbulb className="h-4 w-4" /> Show Hint
                  </button>
                )}
                <button
                  type="button"
                  onClick={handleSubmitCurrentAnswer}
                  className="inline-flex items-center gap-2 rounded-xl border border-emerald-600 bg-white px-4 py-2.5 text-xs font-bold text-emerald-700 hover:bg-emerald-50"
                >
                  <CheckCircle2 className="h-4 w-4" /> Submit Answer
                </button>
                {currentQuestionIndex < questions.length - 1 ? (
                  <button
                    type="button"
                    disabled={!currentEvaluation}
                    onClick={() => {
                      setCurrentQuestionIndex((index) => index + 1);
                      setShowHint(false);
                      setValidationMessage('');
                    }}
                    className="inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-4 py-2.5 text-xs font-bold text-white hover:bg-emerald-700 disabled:cursor-not-allowed disabled:opacity-40"
                  >
                    Next Question <ArrowRight className="h-4 w-4" />
                  </button>
                ) : (
                  <button
                    type="button"
                    disabled={!currentEvaluation}
                    onClick={() => completeAssessment()}
                    className="inline-flex items-center gap-2 rounded-xl bg-slate-900 px-4 py-2.5 text-xs font-bold text-white hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-40"
                  >
                    Complete Assessment <ArrowRight className="h-4 w-4" />
                  </button>
                )}
              </div>
            </div>
          </section>

          <aside className="lg:col-span-4 space-y-6">
            <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-4">
              <div className="flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-emerald-600" />
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-emerald-700">
                  Recommended revision
                </span>
              </div>
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                <span className="text-[10px] font-mono text-cyan-700 font-bold bg-cyan-50 px-2 py-0.5 rounded border border-cyan-200">
                  NOTE {currentQuestion.recommendedNoteId}
                </span>
                <h3 className="text-sm font-bold text-slate-900">{currentQuestion.topicName}</h3>
                <p className="text-xs text-slate-600">{currentQuestion.recommendedNoteSection}</p>
                <button
                  type="button"
                  onClick={() => onNavigateToNote(currentQuestion.recommendedNoteId)}
                  className="w-full mt-2 py-2 rounded-xl bg-white hover:bg-slate-100 text-xs font-bold text-slate-800 border border-slate-200 flex items-center justify-center gap-2"
                >
                  Review learning material <ArrowRight className="w-3 h-3 text-emerald-600" />
                </button>
              </div>
            </div>

            <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-3">
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-slate-500">
                How feedback works
              </span>
              <ul className="space-y-2 text-xs text-slate-700">
                <li>Concept ideas: 35%</li>
                <li>Technical terms: 25%</li>
                <li>Reasoning: 20%</li>
                <li>Examples: 10%</li>
                <li>Completeness: 10%</li>
              </ul>
              <p className="text-[11px] leading-relaxed text-slate-500">
                Local, phrase-based checklist. It does not understand meaning like an AI grader; paraphrases may need human review.
              </p>
              {activeMode === 'test' ? (
                <p className="rounded-xl bg-slate-100 px-3 py-2 text-xs font-bold text-slate-600">
                  Tutor/chatbot help is disabled during the final assessment.
                </p>
              ) : (
                <div className="space-y-2">
                  <p className="rounded-xl bg-emerald-50 px-3 py-2 text-xs font-medium text-emerald-800">
                    Practice mode allows hints, answer edits, and repeat attempts.
                  </p>
                  {onNavigateTab && (
                    <button
                      type="button"
                      onClick={() => onNavigateTab('coding-lab')}
                      className="w-full rounded-xl border border-cyan-200 bg-cyan-50 px-3 py-2 text-xs font-bold text-cyan-900 hover:bg-cyan-100"
                    >
                      Open Coding Lab and its tutor clarification
                    </button>
                  )}
                </div>
              )}
            </div>
          </aside>
        </div>
      ) : (
        <section className="bg-white p-7 sm:p-10 rounded-3xl border-2 border-slate-200/90 shadow-xl space-y-8 max-w-4xl mx-auto">
          <header className="text-center space-y-3 border-b border-slate-100 pb-7">
            <div className={`w-16 h-16 rounded-2xl border mx-auto flex items-center justify-center ${
              scorePercentage >= 70 ? 'bg-emerald-50 border-emerald-200 text-emerald-600' : 'bg-orange-50 border-orange-200 text-orange-600'
            }`}>
              <Award className="w-8 h-8" />
            </div>
            <span className="text-xs font-mono font-bold uppercase tracking-widest text-slate-500">
              {activeMode === 'test' ? 'Final assessment completed' : 'Practice review'}
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
              Performance: <span className={scorePercentage >= 70 ? 'text-emerald-600' : 'text-orange-600'}>{scorePercentage}%</span>
            </h2>
            <p className="text-sm font-bold text-slate-700">
              {overallStatus} · {scorePercentage >= 70 ? 'Meets the 70% mastery threshold.' : 'Review the gaps and try again.'}
            </p>
            {timedOut && (
              <p className="text-xs font-bold text-orange-700">Time expired; unanswered items were scored as incomplete.</p>
            )}
            <p className="text-xs text-slate-500">
              {answerEvaluations.filter((result) => result.score >= 70).length} of {questions.length} responses met the local rubric threshold.
            </p>
          </header>

          <div className="grid sm:grid-cols-2 gap-4">
            <FeedbackSummary title="What you demonstrated" items={Array.from(new Set(answerEvaluations.flatMap((result) => result.understood)))} empty="No rubric concepts were detected confidently in the written answers." tone="green" />
            <FeedbackSummary title="Missing or unclear concepts" items={allMissingConcepts} empty="All listed key ideas were detected by the local checklist." tone="orange" />
          </div>

          <div className="rounded-2xl border border-orange-200 bg-orange-50/60 p-5 space-y-3">
            <div className="flex items-center gap-2 text-sm font-black text-slate-900">
              <ShieldCheck className="w-4 h-4 text-orange-600" />
              Specific weaknesses and improvement suggestions
            </div>
            {allWeaknesses.length > 0 ? (
              <ul className="list-disc space-y-1 pl-5 text-xs text-slate-700">
                {allWeaknesses.map((weakness) => <li key={weakness}>{weakness}</li>)}
              </ul>
            ) : (
              <p className="text-xs text-slate-700">The checklist did not find a recurring gap. Review the per-question ideas below.</p>
            )}
            <ul className="list-disc space-y-1 pl-5 text-xs font-bold text-slate-800">
              {allRecommendations.map((recommendation) => <li key={recommendation}>{recommendation}</li>)}
            </ul>
          </div>

          <div className="space-y-3">
            <h3 className="text-sm font-black text-slate-900">Question-by-question feedback</h3>
            {questions.map((question, index) => {
              const evaluation = answerEvaluations[index];
              return (
                <article key={question.id} className="rounded-2xl border border-slate-200 p-4 space-y-3">
                  <div className="flex flex-wrap justify-between gap-2">
                    <h4 className="text-xs font-bold text-slate-900">
                      {index + 1}. {question.difficulty}: {question.question.split('\n')[0]}
                    </h4>
                    <span className={`text-xs font-black ${evaluation.score >= 70 ? 'text-emerald-700' : 'text-orange-700'}`}>
                      {evaluation.score}%
                    </span>
                  </div>
                  <p className="whitespace-pre-wrap rounded-xl bg-slate-50 p-3 text-xs text-slate-600">
                    {answers[question.id]?.trim() || 'No answer submitted before time expired.'}
                  </p>
                  <FeedbackDetails evaluation={evaluation} />
                </article>
              );
            })}
          </div>

          <div className="flex flex-wrap justify-center gap-3 border-t border-slate-100 pt-6">
            <button
              type="button"
              onClick={() => onNavigateToNote(questions[0]?.recommendedNoteId ?? 'D01-A01')}
              className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-xs font-bold text-slate-800 hover:bg-slate-50"
            >
              <BookOpen className="h-4 w-4" /> Review recommended material
            </button>
            <button
              type="button"
              onClick={() => resetAssessment(activeMode)}
              className="inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-4 py-2.5 text-xs font-bold text-white hover:bg-emerald-700"
            >
              <RotateCcw className="h-4 w-4" />
              {activeMode === 'practice' ? 'Try practice again' : 'Retake final assessment'}
            </button>
          </div>
          {activeMode === 'test' && scorePercentage >= 70 && selectedTopicId.startsWith('ARR-') && (
            <p className="text-center text-xs font-bold text-emerald-700">
              This final score has been recorded. The Array Journey will unlock eligible next levels.
            </p>
          )}
        </section>
      )}
    </div>
  );
};

const FeedbackDetails: React.FC<{ evaluation: AnswerEvaluation }> = ({ evaluation }) => (
  <div className="grid sm:grid-cols-3 gap-3 text-xs">
    <div>
      <h5 className="font-black text-emerald-800 mb-1">Understood</h5>
      {evaluation.understood.length
        ? <ul className="list-disc pl-4 space-y-1 text-slate-700">{evaluation.understood.map((item) => <li key={item}>{item}</li>)}</ul>
        : <p className="text-slate-500">No expected idea detected yet.</p>}
    </div>
    <div>
      <h5 className="font-black text-orange-800 mb-1">To clarify</h5>
      {evaluation.missing.length
        ? <ul className="list-disc pl-4 space-y-1 text-slate-700">{evaluation.missing.map((item) => <li key={item}>{item}</li>)}</ul>
        : <p className="text-slate-500">No key idea missing.</p>}
    </div>
    <div>
      <h5 className="font-black text-slate-700 mb-1">Improve</h5>
      {evaluation.weaknesses.length
        ? <ul className="list-disc pl-4 space-y-1 text-slate-700">{evaluation.weaknesses.map((item) => <li key={item}>{item}</li>)}</ul>
        : <p className="text-slate-500">No checklist gap found.</p>}
    </div>
  </div>
);

const FeedbackSummary: React.FC<{
  title: string;
  items: string[];
  empty: string;
  tone: 'green' | 'orange';
}> = ({ title, items, empty, tone }) => (
  <div className={`rounded-2xl border p-5 space-y-2 ${
    tone === 'green' ? 'bg-emerald-50 border-emerald-200' : 'bg-orange-50 border-orange-200'
  }`}>
    <h3 className={`text-sm font-black ${tone === 'green' ? 'text-emerald-900' : 'text-orange-900'}`}>{title}</h3>
    {items.length > 0
      ? <ul className="list-disc pl-5 space-y-1 text-xs text-slate-700">{items.map((item) => <li key={item}>{item}</li>)}</ul>
      : <p className="text-xs text-slate-600">{empty}</p>}
  </div>
);
