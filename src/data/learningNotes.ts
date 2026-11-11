import { LearningNote } from '../types';

export const LEARNING_NOTES: LearningNote[] = [
  // =========================================================================
  // F01: Variables and Data Types in C++ (Gold Standard 14-Page Specification)
  // =========================================================================
  {
    id: 'F01',
    category: 'fundamental',
    moduleId: 'foundations',
    moduleName: 'Programming Foundations',
    title: 'Variables and Data Types in C++',
    subtitle: 'Beginner-friendly notes for building a strong DSA foundation',
    language: 'C++ (C++17-compatible examples)',
    level: 'Beginner',
    estimatedStudyTime: '60–90 minutes including practice',
    purpose: 'Understand how programs store, represent and use data',
    keyMotto: 'Learn the value. Choose its type. Give it a meaningful name.',
    conceptTags: [
      'variables',
      'data_types',
      'identifiers',
      'naming_rules',
      'fundamental_types',
      'string',
      'type_modifiers',
      'sizeof',
      'constants',
      'constexpr',
      'type_conversion',
      'static_cast'
    ],
    prerequisiteTags: ['basic_computer_literacy'],
    recommendedWhen: [
      'Struggles with choosing between int, double, and char',
      'Encountering integer division truncation errors (e.g. 5 / 2 == 2 instead of 2.5)',
      'Confusing variable declaration, initialization, and assignment',
      'Using invalid identifier names or reserved C++ keywords'
    ],
    learningObjectives: [
      'Explain data and variables, and why programs need named storage.',
      'Declare, initialize and update variables using valid C++ syntax.',
      'Choose meaningful identifiers and recognize invalid names and keywords.',
      'Select suitable types: int, char, float, double, bool and void.',
      'Explain short, long, signed and unsigned modifiers.',
      'Use sizeof without assuming every computer has identical type sizes.',
      'Use const and understand the basic purpose of constexpr.',
      'Explain implicit conversion and use static_cast for explicit conversion.',
      'Choose suitable types for student details and basic DSA code.'
    ],
    prerequisites: [
      'No prior programming experience is required.',
      'Be comfortable with ordinary numbers, decimal values, letters and true/false statements.',
      'A basic idea of a computer executing instructions is helpful, but not essential.'
    ],
    introduction: {
      whatIsIt: 'Data is information that a program can store, process or display. Examples include a student name, age, examination mark, temperature, item count or whether a task is complete. A variable is a named object that holds a value while a program runs. The name gives the programmer a readable way to refer to that value. A variable can usually be updated unless it has been declared constant.',
      whyNeeded: [
        'Remember information entered by a user.',
        'Perform calculations and keep intermediate results.',
        'Compare values and make decisions.',
        'Repeat work using counters and changing values.',
        'Organize data later stored in arrays, lists, stacks and queues.'
      ],
      analogy: 'Imagine a labelled container. The label is the variable name, the kind of item it is designed to hold is its type, and the current item inside is its value. This is only an analogy; a real variable is represented by the program using physical RAM memory and strict C++ language rules.'
    },
    sections: [
      {
        id: 'sec-declaration-init',
        title: '4. Variables: declaration, initialization and assignment',
        content: 'A declaration introduces a variable and states its type. Initialization gives it its first value at the moment of creation. Assignment stores a new value in a variable after it has already been declared.',
        comparisonTable: {
          headers: ['Action', 'Syntax', 'Meaning'],
          rows: [
            ['Declaration', 'int age;', 'Create age as an int.'],
            ['Initialization', 'int age = 19;', 'Declare age and give its first value.'],
            ['Assignment', 'age = 20;', 'Replace its current value with 20.'],
            ['Multiple variables', 'int x = 4, y = 7;', 'Declare and initialize two int variables.']
          ]
        },
        codeBlocks: [
          {
            caption: 'Example 1: Updating a variable',
            code: `#include <iostream>

int main() {
    int score = 72;             // declaration + initialization
    std::cout << score << '\\n'; // display current value (72)

    score = 85;                 // assignment: update the value
    std::cout << score << '\\n'; // display updated value (85)

    return 0;
}`,
            explanation: 'score is created with initial value 72. The first output reads that value. The assignment score = 85 overwrites the previous value. The second output reads 85.',
            expectedOutput: '72\n85'
          }
        ],
        dryRunTable: {
          headers: ['Step', 'Statement', 'score value in memory', 'Console Output'],
          rows: [
            ['1', 'int score = 72;', '72', '—'],
            ['2', 'std::cout << score;', '72', '72'],
            ['3', 'score = 85;', '85', '—'],
            ['4', 'std::cout << score;', '85', '85']
          ]
        }
      },
      {
        id: 'sec-naming-rules',
        title: '5. Naming rules: identifiers',
        content: 'An identifier is a name chosen for a program element, such as a variable. Good names describe the information being stored clearly so other developers understand your code immediately.',
        comparisonTable: {
          headers: ['Rule', 'Valid Example', 'Invalid Example / Reason'],
          rows: [
            ['Letters, digits, underscore', 'student2, total_marks', 'total-marks (hyphen is subtraction operator, not allowed)'],
            ['Cannot start with digit', 'mark2', '2mark (starts with a digit)'],
            ['No spaces', 'studentAge', 'student age (spaces split tokens in compiler)'],
            ['Not a keyword', 'className', 'int (reserved keyword for built-in type)'],
            ['Case-sensitive', 'score and Score', 'These are treated as two distinct identifiers']
          ]
        }
      },
      {
        id: 'sec-data-types',
        title: '6. Fundamental Data Types',
        content: 'A data type tells the compiler what kind of value an object stores and which operations make sense for it. The type affects the object’s binary representation, size in bytes, and valid numerical range. C++ uses types so programs can interpret and manipulate values consistently.',
        comparisonTable: {
          headers: ['Type', 'Represents', 'Example', 'Typical DSA Use'],
          rows: [
            ['int', 'Whole numbers', 'int count = 12;', 'Array indices, loop counters, vertex IDs'],
            ['char', 'A character-sized code unit', "char grade = 'A';", 'Single ASCII/UTF-8 character, buffer bytes'],
            ['float', 'Single-precision floating-point', 'float temp = 36.5f;', 'Decimal values where float precision is sufficient'],
            ['double', 'Double-precision floating-point', 'double price = 99.95;', 'General-purpose decimal calculations, averages'],
            ['bool', 'Boolean true or false', 'bool passed = true;', 'Visited flags in graph search, condition status'],
            ['void', 'Absence of a value', 'void printMessage();', 'Functions that return no value']
          ]
        },
        codeBlocks: [
          {
            caption: 'Example 2: Complete student record with std::string and fundamental types',
            code: `#include <iostream>
#include <string>

int main() {
    std::string studentName = "Asha";
    int age = 19;
    double marks = 87.5;
    char grade = 'A';
    bool passed = true;

    std::cout << studentName << '\\n' 
              << age << '\\n' 
              << marks << '\\n' 
              << grade << '\\n' 
              << std::boolalpha << passed << '\\n';
    return 0;
}`,
            explanation: 'The string stores the full name. int stores whole-number age. double stores a decimal mark. char stores single grade letter. bool stores pass/fail state. std::boolalpha formats boolean output as "true"/"false" instead of 1/0.',
            expectedOutput: 'Asha\n19\n87.5\nA\ntrue'
          }
        ]
      },
      {
        id: 'sec-type-modifiers',
        title: '7. Type Modifiers',
        content: 'Modifiers adjust the range or signedness of certain arithmetic types. They are most commonly used with integer types to save memory or handle large numbers.',
        comparisonTable: {
          headers: ['Modifier', 'Purpose', 'Code Example'],
          rows: [
            ['short', 'Minimum width requirement smaller than or equal to int', 'short int seats = 120;'],
            ['long', 'Requests a longer integer type than int', 'long int population = 500000L;'],
            ['signed', 'Allows negative and non-negative values (default)', 'signed int temperature = -5;'],
            ['unsigned', 'Represents strictly non-negative values (0 to 2^N - 1)', 'unsigned int attempts = 3;']
          ]
        }
      },
      {
        id: 'sec-sizeof',
        title: '8. Type size and range: sizeof',
        content: 'The sizeof operator reports the size, in bytes, of a type or object in the current implementation. In C++, one byte is the size of a char (at least 8 bits). Standard types guarantee minimum size relationships, but exact byte counts depend on hardware and compiler architecture.',
        codeBlocks: [
          {
            caption: 'Checking platform byte sizes with sizeof',
            code: `#include <iostream>

int main() {
    std::cout << "char:   " << sizeof(char)   << " byte(s)\\n";
    std::cout << "int:    " << sizeof(int)    << " byte(s)\\n";
    std::cout << "float:  " << sizeof(float)  << " byte(s)\\n";
    std::cout << "double: " << sizeof(double) << " byte(s)\\n";
    std::cout << "bool:   " << sizeof(bool)   << " byte(s)\\n";
    return 0;
}`,
            explanation: 'Common desktop 64-bit output: char: 1, int: 4, float: 4, double: 8, bool: 1. sizeof(void) is invalid because void is an incomplete type.',
            expectedOutput: 'char:   1 byte(s)\nint:    4 byte(s)\nfloat:  4 byte(s)\ndouble: 8 byte(s)\nbool:   1 byte(s)'
          }
        ]
      },
      {
        id: 'sec-constants',
        title: '9. Constants: const and constexpr',
        content: 'A constant is a value that the program is not allowed to change through that name after initialization. const makes an object read-only after initialization. constexpr marks a variable or function for constant-expression use at compile-time.',
        codeBlocks: [
          {
            caption: 'Using const and compile-time constexpr',
            code: `#include <iostream>

int main() {
    const double pi = 3.14159;
    // pi = 3.14; // COMPILE ERROR: assignment of read-only variable 'pi'

    constexpr int daysInWeek = 7; // Evaluated strictly at compile-time

    std::cout << "Pi: " << pi << ", Days: " << daysInWeek << '\\n';
    return 0;
}`,
            explanation: 'Use const for values that should not be modified at runtime. Use constexpr when a value is guaranteed to be computed during compilation (e.g. array dimensions or template arguments).',
            expectedOutput: 'Pi: 3.14159, Days: 7'
          }
        ]
      },
      {
        id: 'sec-type-conversion',
        title: '10. Type Conversion & static_cast',
        content: 'A type conversion changes a value from one type to another. It may happen automatically (implicit conversion) or be requested explicitly using static_cast<Type>(value).',
        comparisonTable: {
          headers: ['Conversion Type', 'Code Example', 'Result / Explanation'],
          rows: [
            ['Implicit Safe', 'double d = 4;', 'd stores 4.0 without loss.'],
            ['Implicit Narrowing', 'int n = 4.7;', 'n becomes 4; fractional part is silently discarded.'],
            ['Explicit static_cast', 'int n = static_cast<int>(4.7);', 'n is 4; intent is clear and documented to compiler.']
          ]
        },
        codeBlocks: [
          {
            caption: 'Fixing Integer Division Bug with static_cast',
            code: `#include <iostream>

int main() {
    int totalMarks = 5;
    int students = 2;

    // Without cast: 5 / 2 = 2 (integer truncation bug!)
    // With cast: static_cast<double>(5) / 2 = 2.5
    double average = static_cast<double>(totalMarks) / students;

    std::cout << "Correct Average: " << average << '\\n';
    return 0;
}`,
            explanation: 'When dividing two ints in C++, the compiler performs integer division, discarding the fractional part. Casting the numerator to double promotes the entire operation to floating-point division.',
            expectedOutput: 'Correct Average: 2.5'
          }
        ]
      }
    ],
    commonMistakes: [
      {
        mistake: 'int average = 78.5;',
        problem: 'Decimal part is silently discarded, giving 78.',
        correction: 'double average = 78.5;'
      },
      {
        mistake: 'int 2marks = 80;',
        problem: 'Identifier cannot begin with a numeric digit.',
        correction: 'int marks2 = 80;'
      },
      {
        mistake: 'float name = "Asha";',
        problem: 'Numeric floating-point type cannot store character text string.',
        correction: 'std::string name = "Asha";'
      },
      {
        mistake: 'char grade = "A";',
        problem: 'Double quotes denote a C-string literal ("A\\0"), not a single char.',
        correction: "char grade = 'A';"
      },
      {
        mistake: 'const int limit; limit = 10;',
        problem: 'A const object must be initialized at the moment of declaration.',
        correction: 'const int limit = 10;'
      },
      {
        mistake: 'int count; std::cout << count;',
        problem: 'Uninitialized local variable contains indeterminate garbage memory.',
        correction: 'int count = 0;'
      },
      {
        mistake: 'int result = 5 / 2;',
        problem: 'Integer division discards fractional remainder, storing 2 instead of 2.5.',
        correction: 'double result = 5.0 / 2;'
      }
    ],
    dsaConnection: {
      explanation: 'Data Structures and Algorithms store and process collections of values in memory. Choosing suitable types is a fundamental design decision that affects space complexity, memory alignment, and cache performance.',
      codeExample: `#include <iostream>

int main() {
    // Array storing 5 student exam marks in contiguous memory
    int marks[5] = {78, 91, 64, 85, 72};
    int total = 0;

    for (int i = 0; i < 5; ++i) {
        total += marks[i];
    }

    double average = static_cast<double>(total) / 5;
    std::cout << "Sum: " << total << ", Average: " << average << '\\n';
    return 0;
}`,
      structureUsage: [
        {
          structure: 'Static & Dynamic Arrays',
          usage: 'int values[100] allocates a contiguous 400-byte block in memory (4 bytes * 100 elements).'
        },
        {
          structure: 'Linked Lists',
          usage: 'A ListNode contains an int data value and a pointer (ListNode* next) to the next heap node.'
        },
        {
          structure: 'Stacks (LIFO)',
          usage: 'Stores elements of a specific type (e.g. int) and an unsigned int/size_t counter tracking top position.'
        },
        {
          structure: 'Queues & Circular Buffers',
          usage: 'Stores elements with front and rear integer indices wrapped using the modulo operator (%).'
        }
      ]
    },
    practiceQuestions: [
      {
        id: 'q1',
        type: 'conceptual',
        question: 'What is the key difference between variable declaration and variable initialization in C++?',
        options: [
          'Declaration allocates memory; initialization deletes it',
          'Declaration introduces the name and type; initialization assigns its very first value',
          'Declaration is only for functions; initialization is for numbers',
          'They are 100% identical in C++'
        ],
        correctAnswer: 'Declaration introduces the name and type; initialization assigns its very first value',
        explanation: 'Declaration introduces an identifier and reserves its type (e.g. int x;). Initialization assigns an initial value at creation time (e.g. int x = 10;).'
      },
      {
        id: 'q2',
        type: 'conceptual',
        question: 'Why must you use std::string instead of char to store a student’s full name?',
        options: [
          'char cannot be printed with std::cout',
          'char holds only a single character unit, while std::string holds a sequence of characters',
          'std::string is faster than char',
          'char only stores numbers'
        ],
        correctAnswer: 'char holds only a single character unit, while std::string holds a sequence of characters',
        explanation: "char grade = 'A' stores exactly one byte/character. A full name like \"Asha\" consists of multiple characters and requires std::string from <string>."
      },
      {
        id: 'q3',
        type: 'predict_output',
        question: 'What will be the output of this C++ code snippet?\n\nint a = 7;\nint b = 2;\nstd::cout << a / b;',
        codeSnippet: `int a = 7;
int b = 2;
std::cout << a / b;`,
        options: ['3.5', '3', '4', 'Compilation error'],
        correctAnswer: '3',
        explanation: 'Because both a and b are integers, C++ performs integer division and truncates the fractional remainder 0.5, producing 3.'
      },
      {
        id: 'q4',
        type: 'predict_output',
        question: 'What is printed by the following code?\n\ndouble price = 12;\nint quantity = 3;\nstd::cout << price * quantity;',
        codeSnippet: `double price = 12;
int quantity = 3;
std::cout << price * quantity;`,
        options: ['36', '36.0', '15', 'Error'],
        correctAnswer: '36',
        explanation: 'quantity (3) is implicitly promoted to double (3.0), and 12.0 * 3.0 results in 36.0. By default, std::cout formats whole floating-point numbers without trailing zeros unless std::fixed is specified.'
      },
      {
        id: 'q5',
        type: 'find_error',
        question: 'What is wrong with this C++ code?\n\nconst int maxScore;\nmaxScore = 100;',
        codeSnippet: `const int maxScore;
maxScore = 100;`,
        options: [
          'Variable name contains uppercase letters',
          'A const variable must be initialized at the moment of declaration and cannot be assigned later',
          'maxScore must be a double',
          'Missing #include <const>'
        ],
        correctAnswer: 'A const variable must be initialized at the moment of declaration and cannot be assigned later',
        explanation: 'const objects are read-only and immutable. They cannot be left uninitialized; they must receive a value upon creation: const int maxScore = 100;'
      }
    ],
    quickRevision: {
      terms: [
        { term: 'Data', remember: 'Information a program stores, processes or displays.' },
        { term: 'Variable', remember: 'A named object in memory that holds a value.' },
        { term: 'Declaration', remember: 'type name; (introduces variable to compiler).' },
        { term: 'Initialization', remember: 'type name = value; (sets initial value at creation).' },
        { term: 'Assignment', remember: 'name = newValue; (replaces existing value).' },
        { term: 'int', remember: 'Whole-number type (typically 4 bytes).' },
        { term: 'char', remember: "Single character enclosed in single quotes ('A')." },
        { term: 'double', remember: 'Default floating-point type for fractional values.' },
        { term: 'bool', remember: 'Boolean true or false (1 byte).' },
        { term: 'const', remember: 'Read-only object that cannot be reassigned.' },
        { term: 'sizeof(T)', remember: 'Returns memory footprint in bytes for type T.' },
        { term: 'static_cast<T>(v)', remember: 'Explicit, safe compile-time conversion to type T.' }
      ],
      rules: [
        'Always initialize local variables before reading them to avoid indeterminate garbage memory.',
        'Choose data types that accurately reflect the mathematical domain of your data.',
        'Identifiers cannot start with a digit, contain spaces, or match reserved C++ keywords.',
        'Integer division (int / int) discards the fractional portion; cast at least one operand to double if precision is required.',
        'Use std::string (from <string>) for names and textual sentences.'
      ]
    },
    furtherLearning: {
      nextTopic: 'F02 — Declaration and Initialization in Depth',
      nextTopicId: 'F02',
      references: [
        { title: 'GeeksforGeeks — C++ Data Types', url: 'https://www.geeksforgeeks.org/cpp/cpp-data-types/' },
        { title: 'W3Schools — C++ Variables', url: 'https://www.w3schools.com/cpp/cpp_variables.asp' },
        { title: 'W3Schools — C++ Data Types', url: 'https://www.w3schools.com/cpp/cpp_data_types.asp' },
        { title: 'cplusplus.com — Variables and Types', url: 'https://cplusplus.com/doc/tutorial/variables/' },
        { title: 'cppreference — Fundamental Types', url: 'https://en.cppreference.com/w/cpp/language/types' },
        { title: 'cppreference — Implicit Conversions', url: 'https://en.cppreference.com/w/cpp/language/implicit_conversion' }
      ]
    }
  },

  // =========================================================================
  // F02: Declaration and Initialization
  // =========================================================================
  {
    id: 'F02',
    category: 'fundamental',
    moduleId: 'foundations',
    moduleName: 'Programming Foundations',
    title: 'Declaration and Initialization',
    subtitle: 'Mastering memory allocation, uninitialized traps, and brace initialization in modern C++',
    language: 'C++ (C++17)',
    level: 'Beginner',
    estimatedStudyTime: '45–60 minutes',
    purpose: 'Understand how variables are introduced, initialized, and assigned',
    keyMotto: 'Never read garbage memory. Initialize upon declaration.',
    conceptTags: ['declaration', 'initialization', 'assignment', 'brace_init', 'undefined_behavior'],
    prerequisiteTags: ['variables', 'data_types'],
    recommendedWhen: [
      'Reading from local variables before assigning values',
      'Confusing assignment (=) with equality comparison (==)',
      'Experiencing random unexpected values from garbage stack memory'
    ],
    learningObjectives: [
      'Differentiate between declaration, initialization, and assignment.',
      'Apply copy, direct, and uniform brace initialization {}.',
      'Prevent undefined behavior caused by uninitialized local stack variables.',
      'Detect and avoid narrowing conversions during variable setup.'
    ],
    prerequisites: ['F01 — Variables and Data Types in C++'],
    introduction: {
      whatIsIt: 'In C++, memory for a local variable is allocated on the stack. If you declare a variable without initializing it, the memory retains whatever random bits were previously stored at that address. Declaration announces a variable name to the compiler, initialization fills it with its first valid state, and assignment updates an existing variable.',
      whyNeeded: [
        'Ensures predictable program behavior from the very first instruction.',
        'Prevents catastrophic undefined behavior and intermittent bugs in DSA traversal.',
        'Enables modern C++ brace initialization {} to catch narrowing bugs at compile-time.'
      ],
      analogy: 'Declaring a variable is like reserving a whiteboard in a classroom. Initialization is wiping it clean and writing the first lesson. If you do not initialize, whatever drawings were left by yesterday’s class are still there!'
    },
    sections: [
      {
        id: 'sec-init-methods',
        title: 'Modern Initialization Styles in C++',
        content: 'C++ provides three primary ways to initialize variables: Copy initialization (=), Direct initialization (()), and Uniform Brace initialization ({} introduced in C++11). Modern C++ strongly recommends brace initialization because it forbids narrowing conversions.',
        comparisonTable: {
          headers: ['Style', 'Syntax', 'Behavior with Narrowing (double -> int)'],
          rows: [
            ['Copy Initialization', 'int x = 4.5;', 'Compiles with warning; silently truncates to 4.'],
            ['Direct Initialization', 'int x(4.5);', 'Compiles with warning; truncates to 4.'],
            ['Brace Initialization (Uniform)', 'int x{4.5};', 'COMPILE ERROR! Compiler rejects loss of data.']
          ]
        },
        codeBlocks: [
          {
            caption: 'Uniform Brace Initialization and Zero-Initialization',
            code: `#include <iostream>

int main() {
    int total{};     // Value-initialized to 0 automatically!
    double rate{1.5};

    // int bad{3.14}; // Error: narrowing conversion from double to int

    std::cout << "total: " << total << ", rate: " << rate << '\\n';
    return 0;
}`,
            explanation: 'int total{} guarantees zero initialization without needing to explicitly write = 0. This is the safest way to declare accumulators in algorithm problems.',
            expectedOutput: 'total: 0, rate: 1.5'
          }
        ]
      }
    ],
    commonMistakes: [
      {
        mistake: 'int sum; for(int i=0; i<n; i++) sum += arr[i];',
        problem: 'sum contains garbage memory; the resulting sum is wildly incorrect.',
        correction: 'int sum = 0;'
      }
    ],
    dsaConnection: {
      explanation: 'In array algorithms and graph traversals, loop counters, min/max accumulators, and visited pointers must be initialized with exact starting values (e.g. INT_MAX, nullptr, or 0) before iteration begins.',
      structureUsage: [
        { structure: 'Array Aggregations', usage: 'int sum = 0; int minVal = INT_MAX;' },
        { structure: 'Linked List Pointers', usage: 'ListNode* head = nullptr; (always initialize pointers!)' }
      ]
    },
    practiceQuestions: [
      {
        id: 'f02-q1',
        type: 'conceptual',
        question: 'What happens when you read an uninitialized local int in C++?',
        options: [
          'It is guaranteed to be 0',
          'It produces undefined behavior and reads indeterminate garbage data',
          'The computer halts immediately',
          'It defaults to 1'
        ],
        correctAnswer: 'It produces undefined behavior and reads indeterminate garbage data',
        explanation: 'Local built-in variables are not default-initialized to zero in C++. Reading them invokes undefined behavior.'
      }
    ],
    quickRevision: {
      terms: [
        { term: 'Uninitialized Variable', remember: 'A variable created without an initial value; contains garbage bits.' },
        { term: 'Value Initialization', remember: 'int x{}; safely initializes x to 0.' }
      ],
      rules: [
        'Always initialize counters and accumulators before running loops.',
        'Use uniform brace initialization int x{} to guarantee zero-initialization.'
      ]
    },
    furtherLearning: {
      nextTopic: 'F03 — Operators and Conditional Statements',
      nextTopicId: 'F03',
      references: [
        { title: 'GeeksforGeeks — Variable Initialization', url: 'https://www.geeksforgeeks.org/cpp/variable-initialization-in-c/' },
        { title: 'LearnCpp — Variable Assignment and Initialization', url: 'https://www.learncpp.com/cpp-tutorial/variable-assignment-and-initialization/' }
      ]
    }
  },

  // =========================================================================
  // F03: Operators and Conditional Statements
  // =========================================================================
  {
    id: 'F03',
    category: 'fundamental',
    moduleId: 'foundations',
    moduleName: 'Programming Foundations',
    title: 'Operators and Conditional Statements',
    subtitle: 'Arithmetic, logical operators, and branching control flow (if-else, switch, ternary)',
    language: 'C++ (C++17)',
    level: 'Beginner',
    estimatedStudyTime: '60–75 minutes',
    purpose: 'Perform computations and enable conditional branching logic',
    keyMotto: 'Compare, decide, execute.',
    conceptTags: ['operators', 'arithmetic', 'relational', 'logical', 'if_else', 'switch', 'precedence'],
    prerequisiteTags: ['variables', 'data_types', 'declaration'],
    recommendedWhen: [
      'Accidentally writing if (x = 5) instead of if (x == 5)',
      'Struggling with compound boolean logic (&& vs ||)',
      'Forgetting break statements in switch cases'
    ],
    learningObjectives: [
      'Master arithmetic (+, -, *, /, %) and increment/decrement (++, --) operators.',
      'Construct compound logical conditions using &&, ||, and !.',
      'Implement multi-branch decision trees using if-else ladders and switch statements.',
      'Avoid common operator precedence pitfalls using explicit parentheses.'
    ],
    prerequisites: ['F01 — Variables and Data Types', 'F02 — Declaration and Initialization'],
    introduction: {
      whatIsIt: 'Operators tell the CPU what calculations to perform on data. Conditional statements allow programs to make decisions based on runtime conditions, executing specific code paths only when conditions evaluate to true.',
      whyNeeded: [
        'Checking boundary conditions (e.g. index >= 0 && index < size).',
        'Validating empty states before popping from stacks or queues.',
        'Comparing elements to sort or search data.'
      ],
      analogy: 'Conditional statements are like railway switches. Depending on the condition of the track ahead, the train is guided down line A or line B.'
    },
    sections: [
      {
        id: 'sec-operators-overview',
        title: 'Core C++ Operator Categories',
        content: 'C++ provides arithmetic, relational (comparisons), logical (boolean combinations), and assignment operators. Understanding their evaluation order is critical for writing error-free conditional bounds.',
        comparisonTable: {
          headers: ['Category', 'Operators', 'Key Rule'],
          rows: [
            ['Arithmetic', '+, -, *, /, %', '% (modulo) only works on integer operands.'],
            ['Relational', '==, !=, <, >, <=, >=', 'Returns a bool result (true or false).'],
            ['Logical', '&& (AND), || (OR), ! (NOT)', 'Uses short-circuit evaluation in C++.'],
            ['Assignment', '=, +=, -=, *=, /=, %=', 'Updates target in-place; = assigns, == tests equality.']
          ]
        },
        codeBlocks: [
          {
            caption: 'Array Boundary Validation with Short-Circuit &&',
            code: `#include <iostream>

int main() {
    int arr[5] = {10, 20, 30, 40, 50};
    int index = 6;

    // Short-circuit: if index < 5 is false, arr[index] is NEVER evaluated!
    if (index >= 0 && index < 5) {
        std::cout << "Valid access: " << arr[index] << '\\n';
    } else {
        std::cout << "Boundary check failed: index " << index << " out of bounds!\\n";
    }
    return 0;
}`,
            explanation: 'The logical AND operator (&&) short-circuits: if the left condition fails, the right side is never executed, preventing memory segmentation faults.',
            expectedOutput: 'Boundary check failed: index 6 out of bounds!'
          }
        ]
      }
    ],
    commonMistakes: [
      {
        mistake: 'if (x = 10)',
        problem: 'Assigns 10 to x, which evaluates to truthy (non-zero), executing the block every time!',
        correction: 'if (x == 10)'
      }
    ],
    dsaConnection: {
      explanation: 'Every algorithm relies on conditional checks: loop termination, base cases in recursion, and heap boundary checks.',
      structureUsage: [
        { structure: 'Arrays', usage: 'if (i >= 0 && i < n) checks valid index before dereferencing.' },
        { structure: 'Stack & Queue', usage: 'if (top == -1) checks for stack underflow before popping.' }
      ]
    },
    practiceQuestions: [
      {
        id: 'f03-q1',
        type: 'predict_output',
        question: 'What is the value of result?\n\nint x = 5;\nbool result = (x > 10) && (++x > 2);',
        codeSnippet: `int x = 5;
bool result = (x > 10) && (++x > 2);
std::cout << std::boolalpha << result << " " << x;`,
        options: ['false 5', 'false 6', 'true 6', 'Compilation error'],
        correctAnswer: 'false 5',
        explanation: 'Due to short-circuit evaluation, because (x > 10) is false, the second operand (++x > 2) is completely skipped. Therefore, x remains 5.'
      }
    ],
    quickRevision: {
      terms: [
        { term: 'Short-circuit evaluation', remember: '&& stops on first false; || stops on first true.' },
        { term: 'Ternary operator', remember: 'condition ? expr1 : expr2;' }
      ],
      rules: [
        'Never confuse = (assignment) with == (equality test).',
        'Always guard array accesses with index >= 0 && index < size.'
      ]
    },
    furtherLearning: {
      nextTopic: 'F04 — Loop Statements',
      nextTopicId: 'F04',
      references: [
        { title: 'GeeksforGeeks — C++ Operators', url: 'https://www.geeksforgeeks.org/cpp/cpp-operators/' },
        { title: 'W3Schools — C++ Conditions', url: 'https://www.w3schools.com/cpp/cpp_conditions.asp' }
      ]
    }
  },

  // =========================================================================
  // F04: Loop Statements (Essential for DSA)
  // =========================================================================
  {
    id: 'F04',
    category: 'fundamental',
    moduleId: 'foundations',
    moduleName: 'Programming Foundations',
    title: 'Loop Statements in C++',
    subtitle: 'for, while, do-while, nested loops, break, continue, and array traversal execution',
    language: 'C++ (C++17)',
    level: 'Beginner',
    estimatedStudyTime: '60–90 minutes',
    purpose: 'Master iteration and sequential memory traversal',
    keyMotto: 'Initialize counter. Validate bound. Increment and conquer.',
    conceptTags: ['loops', 'for_loop', 'while_loop', 'do_while', 'nested_loops', 'break', 'continue', 'array_traversal'],
    prerequisiteTags: ['variables', 'data_types', 'operators', 'conditional_statements'],
    recommendedWhen: [
      'Cannot write for (int i = 0; i < n; i++) loop syntax correctly',
      'Creating infinite loops that freeze execution',
      'Suffering off-by-one errors (i <= n instead of i < n)'
    ],
    learningObjectives: [
      'Deconstruct the 3 parts of a loop: initialization, condition, and update.',
      'Select appropriately between for (known bounds) and while (state-driven).',
      'Traverse contiguous arrays and linked structures step-by-step.',
      'Control flow using break and continue.'
    ],
    prerequisites: ['F01', 'F02', 'F03'],
    introduction: {
      whatIsIt: 'Loops repeat a sequence of instructions until a specific stopping condition is met. Without loops, processing 10,000 array elements would require copy-pasting 10,000 lines of code!',
      whyNeeded: [
        'Traversing arrays, strings, and linked lists from head to tail.',
        'Searching for elements and finding minimums/maximums.',
        'Running two-pointer algorithms and nested matrix operations.'
      ],
      analogy: 'Running laps on a track: you start at lap 1 (init), check if you have finished 5 laps (condition), and add 1 to your lap counter after each lap (update).'
    },
    sections: [
      {
        id: 'sec-loop-comparison',
        title: 'for vs while vs do-while Loops',
        content: 'Each loop construct serves distinct algorithmic patterns. for loops are ideal when the number of iterations is known in advance; while loops are preferred when looping until a dynamic condition changes.',
        comparisonTable: {
          headers: ['Loop Type', 'Evaluation Timing', 'Minimum Executions', 'Best Use Case'],
          rows: [
            ['for loop', 'Pre-test (checks before body)', '0', 'Array traversal, counting iterations (0 to N-1).'],
            ['while loop', 'Pre-test (checks before body)', '0', 'Two-pointer convergence, linked list next traversal.'],
            ['do-while loop', 'Post-test (checks after body)', '1', 'Menu loops, prompting user at least once.']
          ]
        },
        codeBlocks: [
          {
            caption: 'Array Traversal with for loop vs while loop',
            code: `#include <iostream>

int main() {
    int arr[4] = {10, 20, 30, 40};
    int n = 4;

    std::cout << "For loop traversal:\\n";
    for (int i = 0; i < n; ++i) {
        std::cout << "arr[" << i << "] = " << arr[i] << '\\n';
    }

    std::cout << "\\nWhile loop two-pointer convergence:\\n";
    int left = 0, right = n - 1;
    while (left < right) {
        std::cout << "Pointers: left=" << left << " (" << arr[left] 
                  << "), right=" << right << " (" << arr[right] << ")\\n";
        left++;
        right--;
    }

    return 0;
}`,
            explanation: 'The for loop visits elements sequentially 0, 1, 2, 3. The while loop steps two pointers inwards until they meet in the middle.',
            expectedOutput: `For loop traversal:
arr[0] = 10
arr[1] = 20
arr[2] = 30
arr[3] = 40

While loop two-pointer convergence:
Pointers: left=0 (10), right=3 (40)`
          }
        ]
      }
    ],
    commonMistakes: [
      {
        mistake: 'for (int i = 0; i <= n; i++)',
        problem: 'Off-by-one bug: index n is beyond the array bounds for size n, causing memory corruption.',
        correction: 'for (int i = 0; i < n; i++)'
      }
    ],
    dsaConnection: {
      explanation: 'Loop constructs form the core of Big-O time complexity analysis: a single loop is O(N), nested loops are O(N^2), and dividing loop counters yield O(log N).',
      structureUsage: [
        { structure: 'Linear Array Scan', usage: 'O(N) single loop over contiguous memory indices.' },
        { structure: '2D Matrix Traversal', usage: 'O(R * C) nested loops over rows and columns.' }
      ]
    },
    practiceQuestions: [
      {
        id: 'f04-q1',
        type: 'predict_output',
        question: 'How many times does this loop execute?\n\nfor (int i = 0; i < 5; i += 2) { ... }',
        options: ['5 times', '3 times (i = 0, 2, 4)', '2 times', 'Infinite loop'],
        correctAnswer: '3 times (i = 0, 2, 4)',
        explanation: 'i starts at 0, updates to 2, then 4. At i = 6, the condition 6 < 5 is false, so it terminates after 3 iterations.'
      }
    ],
    quickRevision: {
      terms: [
        { term: 'Off-by-one Error', remember: 'Accessing arr[n] in a 0-indexed array of length n.' },
        { term: 'Infinite Loop', remember: 'A loop whose terminating condition is never satisfied.' }
      ],
      rules: [
        'In 0-indexed arrays of size N, valid indices are strictly 0 to N-1.',
        'Ensure the loop update expression steps closer to the terminating condition.'
      ]
    },
    furtherLearning: {
      nextTopic: 'F05 — Functions and Parameter Passing in C++',
      nextTopicId: 'F05',
      references: [
        { title: 'GeeksforGeeks — C++ Loops', url: 'https://www.geeksforgeeks.org/cpp/cpp-loops/' },
        { title: 'W3Schools — C++ For Loop', url: 'https://www.w3schools.com/cpp/cpp_for_loop.asp' }
      ]
    }
  },

  // =========================================================================
  // F05: Functions and Parameter Passing in C++
  // =========================================================================
  {
    id: 'F05',
    category: 'fundamental',
    moduleId: 'foundations',
    moduleName: 'Programming Foundations',
    title: 'Functions & Parameter Passing',
    subtitle: 'Modularity, stack frames, pass by value vs. pass by reference in modern C++',
    language: 'C++ (C++17)',
    level: 'Beginner',
    estimatedStudyTime: '50–70 minutes',
    purpose: 'Learn how to modularize logic and mutate caller variables safely',
    keyMotto: 'Pass small types by value; pass large or mutated types by reference.',
    conceptTags: ['functions', 'parameters', 'pass_by_value', 'pass_by_reference', 'stack_frame', 'return_type'],
    prerequisiteTags: ['variables', 'data_types', 'loops'],
    recommendedWhen: [
      'Struggles when a function modification does not reflect in main()',
      'Accidentally making expensive copies of large arrays or vectors',
      'Confusing return values with void side effects'
    ],
    learningObjectives: [
      'Declare and define functions with clear signatures and return types.',
      'Differentiate pass-by-value from pass-by-reference (&).',
      'Use const references (const Type&) to avoid copying large objects without allowing mutation.',
      'Trace call stack frames and understand local scope lifetimes.'
    ],
    prerequisites: ['F01 — Variables', 'F04 — Loops'],
    introduction: {
      whatIsIt: 'A function is a reusable block of code that performs a specific sub-task. Instead of repeating lines of code, you package them into a named function that can take inputs (parameters) and return an output result.',
      whyNeeded: [
        'DRY (Don’t Repeat Yourself) principle — write once, call anywhere.',
        'Modularizes complex DSA algorithms (e.g. partition(), merge(), swap()).',
        'Controls variable scope and stack memory automatically.'
      ],
      analogy: 'A blender in a kitchen. You pass ingredients (inputs/parameters) into it, push a button (call function), and it pours out a smoothie (return value).'
    },
    sections: [
      {
        id: 'sec-pass-mechanics',
        title: 'Pass-by-Value vs. Pass-by-Reference',
        content: 'When passing by value, C++ creates a copy of the argument. Modifying the parameter inside the function has ZERO effect on the original caller variable. When passing by reference (using &), the parameter becomes an alias for the actual memory location of the caller variable.',
        comparisonTable: {
          headers: ['Method', 'Syntax', 'Modifies Caller?', 'Performance Cost'],
          rows: [
            ['Pass by Value', 'void foo(int x)', 'No (copy created)', 'Cheap for small types, expensive for large vectors'],
            ['Pass by Reference', 'void foo(int& x)', 'Yes (alias to original)', 'Zero copy (pointer indirection under the hood)'],
            ['Pass by Const Reference', 'void foo(const std::string& s)', 'No (read-only alias)', 'Zero copy, maximum safety']
          ]
        },
        codeBlocks: [
          {
            caption: 'Implementing a swap() function in C++',
            code: `#include <iostream>

void swapByValue(int a, int b) {
    int temp = a; a = b; b = temp;
}

void swapByReference(int& a, int& b) {
    int temp = a; a = b; b = temp;
}

int main() {
    int x = 10, y = 20;
    swapByValue(x, y);
    std::cout << "After swapByValue: x=" << x << ", y=" << y << "\\n"; // Still 10, 20

    swapByReference(x, y);
    std::cout << "After swapByReference: x=" << x << ", y=" << y << "\\n"; // 20, 10
    return 0;
}`,
            explanation: 'Notice that swapByValue does not change x and y because it only swaps local copies on its own stack frame. swapByReference directly manipulates the caller memory addresses.',
            expectedOutput: `After swapByValue: x=10, y=20
After swapByReference: x=20, y=10`
          }
        ]
      }
    ],
    commonMistakes: [
      {
        mistake: 'Returning a reference to a local stack variable: int& bad() { int x = 5; return x; }',
        problem: 'x is destroyed as soon as the function returns. Returning its reference creates a dangling reference and crashes with undefined behavior.',
        correction: 'Return by value: int good() { int x = 5; return x; }'
      }
    ],
    dsaConnection: {
      explanation: 'Nearly all sorting algorithms (QuickSort, BubbleSort, HeapSort) rely on swapping and modifying arrays in-place via reference passing.',
      structureUsage: [
        { structure: 'Array Sorting', usage: 'void partition(std::vector<int>& arr, int low, int high)' },
        { structure: 'Tree Traversals', usage: 'void dfs(Node* root, std::vector<int>& result)' }
      ]
    },
    practiceQuestions: [
      {
        id: 'f05-q1',
        type: 'conceptual',
        question: 'Why should a large std::vector<int> be passed as "const std::vector<int>&" when only reading it?',
        options: [
          'Because vectors cannot be passed by value',
          'To avoid an expensive deep copy of all elements while preventing accidental mutation',
          'To convert the vector into a pointer',
          'To sort the vector automatically'
        ],
        correctAnswer: 'To avoid an expensive deep copy of all elements while preventing accidental mutation',
        explanation: 'Passing by value copies every single integer in the vector. Passing by const reference passes an alias in O(1) time without copying.'
      }
    ],
    quickRevision: {
      terms: [
        { term: 'Pass by Reference (&)', remember: 'Parameter is an alias to the caller variable; changes persist.' },
        { term: 'Const Reference (const T&)', remember: 'Zero-copy read-only access for large objects.' }
      ],
      rules: [
        'Never return a reference or pointer to a local stack variable.',
        'Use const references for any read-only parameter larger than 8 bytes.'
      ]
    },
    furtherLearning: {
      nextTopic: 'F06 — Pointers and Memory Addresses in C++',
      nextTopicId: 'F06',
      references: [
        { title: 'GeeksforGeeks — Functions in C++', url: 'https://www.geeksforgeeks.org/functions-in-cpp/' },
        { title: 'LearnCpp — Pass by Reference', url: 'https://www.learncpp.com/cpp-tutorial/pass-by-lvalue-reference/' }
      ]
    }
  },

  // =========================================================================
  // F06: Pointers and Memory Addresses in C++
  // =========================================================================
  {
    id: 'F06',
    category: 'fundamental',
    moduleId: 'foundations',
    moduleName: 'Programming Foundations',
    title: 'Pointers & Memory Addresses',
    subtitle: 'Direct memory addresses, dereferencing (*), address-of (&), and nullptr safety',
    language: 'C++ (C++17)',
    level: 'Intermediate',
    estimatedStudyTime: '70–90 minutes',
    purpose: 'Understand how C++ manipulates physical memory addresses directly',
    keyMotto: 'A pointer does not hold a value. It holds the address where a value lives.',
    conceptTags: ['pointers', 'memory_address', 'dereferencing', 'nullptr', 'hexadecimal', 'pointer_arithmetic'],
    prerequisiteTags: ['variables', 'data_types', 'sizeof'],
    recommendedWhen: [
      'Preparing to study Linked Lists, Trees, and Graphs',
      'Confused between address operator (&) and dereference operator (*)',
      'Experiencing segmentation faults when accessing unassigned pointers'
    ],
    learningObjectives: [
      'Extract the memory address of any variable using the address-of operator (&).',
      'Declare pointer variables and store valid memory addresses.',
      'Dereference a pointer (*) to read or write the underlying value.',
      'Use nullptr safely to avoid wild and dangling pointer crashes.'
    ],
    prerequisites: ['F01 — Variables and Data Types in C++'],
    introduction: {
      whatIsIt: 'Every byte in a computer’s RAM has a unique numerical address (usually written in hexadecimal, like 0x7ffd8). A pointer is a special variable whose value is the memory address of another variable.',
      whyNeeded: [
        'Fundamental backbone for Linked Lists, Binary Trees, and Graphs.',
        'Enables dynamic heap allocation and efficient memory management.',
        'Allows functions to manipulate arbitrary blocks of memory.'
      ],
      analogy: 'A sticky note with a house address written on it. The sticky note is NOT the house; it just tells you where to find the house!'
    },
    sections: [
      {
        id: 'sec-pointers-basics',
        title: 'The Address-of (&) and Dereference (*) Operators',
        content: 'The ampersand (&) operator retrieves the memory address where a variable is stored. The asterisk (*) operator, when used on an existing pointer, travels to that address and accesses the value stored inside.',
        comparisonTable: {
          headers: ['Operator', 'Example', 'What it Does', 'Result Type'],
          rows: [
            ['Address-of (&)', '&val', 'Retrieves the RAM address of val', 'Type* (pointer to Type)'],
            ['Dereference (*)', '*ptr', 'Reads or modifies the value at address ptr', 'Type (the actual value)'],
            ['Nullptr check', 'ptr != nullptr', 'Verifies pointer points to valid memory', 'bool']
          ]
        },
        codeBlocks: [
          {
            caption: 'Pointer Declaration, Address-of, and Dereferencing',
            code: `#include <iostream>

int main() {
    int score = 95;
    int* ptr = &score; // ptr holds address of score

    std::cout << "Value of score: " << score << "\\n";
    std::cout << "Address of score (&score): " << &score << "\\n";
    std::cout << "Value stored in ptr: " << ptr << "\\n";
    std::cout << "Dereferenced *ptr: " << *ptr << "\\n";

    *ptr = 100; // Mutates score directly through memory!
    std::cout << "New score value: " << score << "\\n";
    return 0;
}`,
            explanation: '*ptr = 100 goes directly to the memory address of score and overwrites the 4 bytes holding 95 with 100. This is the core mechanism of linked data structures.',
            expectedOutput: `Value of score: 95
Address of score (&score): 0x7ffd0
Value stored in ptr: 0x7ffd0
Dereferenced *ptr: 95
New score value: 100`
          }
        ]
      }
    ],
    commonMistakes: [
      {
        mistake: 'int* ptr; *ptr = 50; (Dereferencing an uninitialized wild pointer)',
        problem: 'ptr holds a random garbage address. Writing to it corrupts random memory and triggers an immediate segmentation fault.',
        correction: 'Always initialize pointers: int* ptr = nullptr; or point it to a valid variable: int* ptr = &x;'
      }
    ],
    dsaConnection: {
      explanation: 'Linked lists, trees, and graphs cannot exist without pointers. A linked list node contains data and a pointer to the next node: struct Node { int data; Node* next; };',
      structureUsage: [
        { structure: 'Linked List Node', usage: 'Node* head = new Node(10); head->next = new Node(20);' },
        { structure: 'Binary Search Tree', usage: 'TreeNode* left; TreeNode* right;' }
      ]
    },
    practiceQuestions: [
      {
        id: 'f06-q1',
        type: 'conceptual',
        question: 'If int x = 42; int* p = &x; what does *p evaluate to?',
        options: ['The memory address of x', '42', 'nullptr', 'Compiler error'],
        correctAnswer: '42',
        explanation: 'Dereferencing (*p) follows the pointer to the address of x and yields the value stored there, which is 42.'
      }
    ],
    quickRevision: {
      terms: [
        { term: 'Pointer (T*)', remember: 'A variable that holds a memory address.' },
        { term: 'Dereferencing (*)', remember: 'Accessing the value stored at the pointer’s address.' },
        { term: 'nullptr', remember: 'Special literal representing a pointer that points nowhere.' }
      ],
      rules: [
        'Always check if (ptr != nullptr) before dereferencing.',
        'sizeof(T*) is 8 bytes on 64-bit systems regardless of whether it points to char or double.'
      ]
    },
    furtherLearning: {
      nextTopic: 'F07 — Dynamic Memory Allocation & Smart Pointers',
      nextTopicId: 'F07',
      references: [
        { title: 'GeeksforGeeks — Pointers in C++', url: 'https://www.geeksforgeeks.org/cpp-pointers/' },
        { title: 'LearnCpp — Introduction to Pointers', url: 'https://www.learncpp.com/cpp-tutorial/introduction-to-pointers/' }
      ]
    }
  },

  // =========================================================================
  // F07: Dynamic Memory Allocation & std::vector
  // =========================================================================
  {
    id: 'F07',
    category: 'fundamental',
    moduleId: 'foundations',
    moduleName: 'Programming Foundations',
    title: 'Dynamic Memory & Resizable Arrays',
    subtitle: 'Stack vs Heap memory, new/delete, and std::vector capacity mechanics in C++',
    language: 'C++ (C++17)',
    level: 'Intermediate',
    estimatedStudyTime: '60–80 minutes',
    purpose: 'Understand how arrays resize dynamically on the heap during execution',
    keyMotto: 'Stack is fast and fixed; Heap is flexible and persistent.',
    conceptTags: ['heap', 'stack', 'new', 'delete', 'memory_leak', 'std_vector', 'capacity', 'reallocation'],
    prerequisiteTags: ['pointers', 'arrays', 'sizeof'],
    recommendedWhen: [
      'Need arrays whose size is decided at runtime by user input',
      'Encountering memory leaks from allocating with new without delete',
      'Confusing std::vector.size() with std::vector.capacity()'
    ],
    learningObjectives: [
      'Contrast stack memory with heap (free store) memory.',
      'Allocate and free heap memory using new and delete.',
      'Prevent memory leaks and dangling pointer defects.',
      'Explain how std::vector dynamically doubles capacity when full.'
    ],
    prerequisites: ['F06 — Pointers and Memory Addresses in C++'],
    introduction: {
      whatIsIt: 'Stack memory has a fixed size determined at compile time. Heap memory is a vast pool of RAM that your program can request dynamically at runtime using new, and release using delete. Modern C++ standard containers like std::vector manage this heap memory automatically.',
      whyNeeded: [
        'DSA problems have inputs whose size N is not known until runtime.',
        'Prevents stack overflow when dealing with large datasets (e.g. 1,000,000 integers).',
        'Enables dynamic data structures (Linked Lists, Vectors, Graphs) to grow on demand.'
      ],
      analogy: 'Stack memory is your backpack — easy to reach, but strictly limited in size. Heap memory is a public storage warehouse — you can rent as much storage as you need, but you must remember to release it when you move out!'
    },
    sections: [
      {
        id: 'sec-heap-allocation',
        title: 'Stack vs. Heap and std::vector Reallocation',
        content: 'When a std::vector exceeds its current capacity, it allocates a new contiguous block in the heap (typically 2x the old size), copies all existing elements over, and frees the old block. This guarantees amortized O(1) push_back operations.',
        comparisonTable: {
          headers: ['Property', 'Stack Memory', 'Heap Memory (Free Store)'],
          rows: [
            ['Allocation Speed', 'Extremely fast (single CPU stack pointer bump)', 'Slower (OS memory manager search)'],
            ['Lifetime', 'Scoped (destroyed when function ends)', 'Manual / Container-managed (persists until deleted)'],
            ['Size Limit', 'Small (typically 1MB to 8MB max)', 'Huge (bounded only by physical RAM & swap)'],
            ['Syntax', 'int arr[100];', 'int* arr = new int[100]; or std::vector<int> v(100);']
          ]
        },
        codeBlocks: [
          {
            caption: 'Dynamic Array Allocation and Vector Growth',
            code: `#include <iostream>
#include <vector>

int main() {
    std::vector<int> vec;
    for (int i = 1; i <= 5; ++i) {
        vec.push_back(i * 10);
        std::cout << "Element added: " << i * 10 
                  << " | Size: " << vec.size() 
                  << " | Capacity: " << vec.capacity() << "\\n";
    }
    return 0;
}`,
            explanation: 'Observe how capacity doubles (1 -> 2 -> 4 -> 8) as new elements are added. This doubling strategy ensures appending remains an O(1) amortized operation.',
            expectedOutput: `Element added: 10 | Size: 1 | Capacity: 1
Element added: 20 | Size: 2 | Capacity: 2
Element added: 30 | Size: 3 | Capacity: 4
Element added: 40 | Size: 4 | Capacity: 4
Element added: 50 | Size: 5 | Capacity: 8`
          }
        ]
      }
    ],
    commonMistakes: [
      {
        mistake: 'int* arr = new int[10]; delete arr; (Using delete instead of delete[])',
        problem: 'When allocating arrays with new[], you must release them with delete[] to ensure all destructors run and memory is deallocated correctly.',
        correction: 'delete[] arr;'
      }
    ],
    dsaConnection: {
      explanation: 'Dynamic arrays (std::vector) are the primary tool for competitive programming and practical DSA implementation.',
      structureUsage: [
        { structure: 'Adjacency List for Graphs', usage: 'std::vector<std::vector<int>> adj;' },
        { structure: 'Dynamic Hash Table', usage: 'Rehashing into a doubled heap table when load factor > 0.7.' }
      ]
    },
    practiceQuestions: [
      {
        id: 'f07-q1',
        type: 'conceptual',
        question: 'What is the time complexity of appending an element to a std::vector using push_back?',
        options: ['O(N) always', 'O(1) amortized', 'O(log N)', 'O(N^2)'],
        correctAnswer: 'O(1) amortized',
        explanation: 'Because capacity doubles geometrically (1, 2, 4, 8, 16...), expensive reallocations happen exponentially less frequently, making average push_back O(1).'
      }
    ],
    quickRevision: {
      terms: [
        { term: 'Heap Memory', remember: 'Dynamic memory pool managed with new and delete.' },
        { term: 'Amortized O(1)', remember: 'Occasional expensive O(N) copy averaged over N operations yields O(1) per step.' }
      ],
      rules: [
        'Prefer modern std::vector or smart pointers (std::unique_ptr) over manual raw new and delete.',
        'Never use an iterator or pointer after a vector reallocates; it becomes invalidated.'
      ]
    },
    furtherLearning: {
      nextTopic: 'D01-A01 — Introduction to Contiguous Arrays',
      nextTopicId: 'D01-A01',
      references: [
        { title: 'GeeksforGeeks — Dynamic Memory Allocation in C++', url: 'https://www.geeksforgeeks.org/new-and-delete-operators-in-cpp-for-dynamic-memory/' },
        { title: 'cppreference — std::vector', url: 'https://en.cppreference.com/w/cpp/container/vector' }
      ]
    }
  },

  // =========================================================================
  // D01-A01: Introduction to Arrays (Core DSA Module)
  // =========================================================================
  {
    id: 'D01-A01',
    category: 'core_dsa',
    moduleId: 'arrays',
    moduleName: 'Static & Dynamic Arrays',
    title: 'A01 — Introduction to Arrays & Memory Representation',
    subtitle: 'Contiguous memory layout, 0-based indexing math, and constant-time random access',
    language: 'C++ (C++17)',
    level: 'Beginner',
    estimatedStudyTime: '60–80 minutes',
    purpose: 'Understand how arrays utilize contiguous hardware memory for O(1) access',
    keyMotto: 'Base address + (index * sizeof(T)) = Instant Random Access.',
    conceptTags: ['arrays', 'contiguous_memory', 'indexing', 'cache_locality', 'random_access', 'sizeof'],
    prerequisiteTags: ['variables', 'loops', 'sizeof', 'type_modifiers'],
    recommendedWhen: [
      'Unsure why array lookup is O(1) while searching is O(N)',
      'Confused about 0-based indexing memory math',
      'Transitioning from raw C-style arrays to modern std::vector'
    ],
    learningObjectives: [
      'Explain contiguous memory allocation in physical RAM.',
      'Derive the 0-based indexing address formula.',
      'Contrast static fixed-size arrays with dynamic resizable std::vector.',
      'Analyze cache locality benefits of contiguous memory layouts.'
    ],
    prerequisites: ['F01 — Variables and Data Types', 'F04 — Loop Statements'],
    introduction: {
      whatIsIt: 'An array is a linear collection of elements of the same data type stored in consecutive, contiguous memory locations. Because all elements lie immediately adjacent to each other in physical RAM, any element can be accessed in O(1) constant time if its index is known.',
      whyNeeded: [
        'Store collections of elements under a single variable name.',
        'Enable lightning-fast O(1) random access via arithmetic indexing.',
        'Maximize CPU L1/L2 cache hit rates due to spatial locality.'
      ],
      analogy: 'A row of numbered lockers in a school hallway. Locker #0 is at the entrance. Locker #4 is exactly 4 locker-widths away. You do not need to open lockers 0, 1, 2, and 3 to reach locker 4!'
    },
    sections: [
      {
        id: 'sec-array-memory-formula',
        title: 'Memory Formula: Why Arrays Are 0-Indexed',
        content: 'The index of an array represents the offset (distance) from the starting memory address. Given base address Base, element size S, and index i: Address(arr[i]) = Base + (i * S). When i = 0, Address = Base + 0 = Base! If indexing started at 1, the CPU would have to perform a needless subtraction: Base + ((i - 1) * S).',
        comparisonTable: {
          headers: ['Index', 'Formula Calculation (int S = 4 bytes)', 'Computed Physical RAM Address'],
          rows: [
            ['arr[0]', '0x7ff00 + (0 * 4)', '0x7ff00 (Base address)'],
            ['arr[1]', '0x7ff00 + (1 * 4)', '0x7ff04 (+4 bytes)'],
            ['arr[2]', '0x7ff00 + (2 * 4)', '0x7ff08 (+8 bytes)'],
            ['arr[3]', '0x7ff00 + (3 * 4)', '0x7ff0C (+12 bytes)']
          ]
        },
        codeBlocks: [
          {
            caption: 'Verifying Contiguous Memory Addresses in C++',
            code: `#include <iostream>

int main() {
    int arr[4] = {10, 20, 30, 40};

    std::cout << "Base address of arr: " << arr << "\\n\\n";
    for (int i = 0; i < 4; ++i) {
        std::cout << "arr[" << i << "] value=" << arr[i] 
                  << " | address=" << &arr[i] 
                  << " | offset=" << (reinterpret_cast<char*>(&arr[i]) - reinterpret_cast<char*>(arr)) 
                  << " bytes\\n";
    }
    return 0;
}`,
            explanation: 'Observe that each address increases by exactly 4 bytes (sizeof(int)). This physical contiguity is why CPU caches load consecutive elements together.',
            expectedOutput: `arr[0] value=10 | address=0x7ff00 | offset=0 bytes
arr[1] value=20 | address=0x7ff04 | offset=4 bytes
arr[2] value=30 | address=0x7ff08 | offset=8 bytes
arr[3] value=40 | address=0x7ff0c | offset=12 bytes`
          }
        ]
      }
    ],
    commonMistakes: [
      {
        mistake: 'int arr[5]; std::cout << arr[5];',
        problem: 'Reading past the boundary: arr[5] accesses unallocated memory, causing segmentation faults or undefined behavior.',
        correction: 'Last valid element is arr[4] (size - 1).'
      }
    ],
    dsaConnection: {
      explanation: 'Arrays form the underlying storage backing Stacks, Queues, Hash Tables, and Heaps. Understanding array memory behavior is the foundation for all advanced data structures.',
      structureUsage: [
        { structure: 'Stack Implementation', usage: 'Array with top pointer incrementing on push.' },
        { structure: 'Circular Queue', usage: 'Fixed-size array using modulo index wrapping: (rear + 1) % capacity.' }
      ]
    },
    practiceQuestions: [
      {
        id: 'd01-q1',
        type: 'conceptual',
        question: 'What mathematical property allows arrays to achieve O(1) random access by index?',
        options: [
          'Binary search on sorted keys',
          'Contiguous memory allocation allowing address calculation via: Base + (index * sizeof(T))',
          'Hash table buckets',
          'CPU branch prediction'
        ],
        correctAnswer: 'Contiguous memory allocation allowing address calculation via: Base + (index * sizeof(T))',
        explanation: 'Because elements are stored contiguously, the exact memory address is computed in a single addition and multiplication, requiring O(1) operations.'
      }
    ],
    quickRevision: {
      terms: [
        { term: 'Contiguous Memory', remember: 'Adjacent, unbroken sequence of memory bytes.' },
        { term: 'O(1) Random Access', remember: 'Lookup time is instantaneous and independent of array size N.' }
      ],
      rules: [
        'Array indices strictly run from 0 to size - 1.',
        'Arrays have fixed capacity at compile time; use std::vector for dynamically resizable arrays.'
      ]
    },
    furtherLearning: {
      nextTopic: 'A02 — Basic Array Operations (Insertion, Deletion, Searching)',
      nextTopicId: 'D01-A02',
      references: [
        { title: 'GeeksforGeeks — Array Data Structure Guide', url: 'https://www.geeksforgeeks.org/dsa/array-data-structure-guide/' },
        { title: 'W3Schools — C++ Arrays', url: 'https://www.w3schools.com/cpp/cpp_arrays.asp' }
      ]
    }
  }
];

export const getNoteById = (id: string): LearningNote | undefined => {
  return LEARNING_NOTES.find((n) => n.id === id);
};

export const getNotesByCategory = (category: 'fundamental' | 'core_dsa'): LearningNote[] => {
  return LEARNING_NOTES.filter((n) => n.category === category);
};

