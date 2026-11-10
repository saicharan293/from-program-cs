# C# Interview Preparation – Problem Revision Tracker

A collection of C# programming problems practised during interview preparation, covering arrays, strings, dictionaries, HashSets, searching, two pointers, stacks, prefix sums, recursion, and time and space complexity.

The goal is not just to remember solutions, but to understand the logic, write the code independently, trace the execution, and explain the approach during an interview.

---

## Table of Contents

1. [LeetCode Problems](#1-leetcode-problems)
2. [Additional Array Problems](#2-additional-array-problems)
3. [String Problems](#3-string-problems)
4. [Searching and Two-Pointer Problems](#4-searching-and-two-pointer-problems)
5. [Stack Problems](#5-stack-problems)
6. [Prefix Sum Problems](#6-prefix-sum-problems)
7. [Recursion Problems](#7-recursion-problems)
8. [Time and Space Complexity](#8-time-and-space-complexity)
9. [Important C# Concepts Practised](#9-important-c-concepts-practised)
10. [Revision Checklist](#10-revision-checklist)

---

# 1. LeetCode Problems

These are the LeetCode problems practised as part of interview preparation.

| No. | Problem | LeetCode | Main Concept |
|---:|---|---:|---|
| 1 | Two Sum | [#1](https://leetcode.com/problems/two-sum/) | Dictionary, Arrays |
| 2 | Contains Duplicate | [#217](https://leetcode.com/problems/contains-duplicate/) | HashSet |
| 3 | Move Zeroes | [#283](https://leetcode.com/problems/move-zeroes/) | Two Pointers |
| 4 | Missing Number | [#268](https://leetcode.com/problems/missing-number/) | Arrays, Mathematics |
| 5 | Reverse String | [#344](https://leetcode.com/problems/reverse-string/) | Two Pointers |
| 6 | Valid Anagram | [#242](https://leetcode.com/problems/valid-anagram/) | Dictionary, Frequency |
| 7 | First Unique Character in a String | [#387](https://leetcode.com/problems/first-unique-character-in-a-string/) | Dictionary, Strings |
| 8 | Find the Index of the First Occurrence in a String | [#28](https://leetcode.com/problems/find-the-index-of-the-first-occurrence-in-a-string/) | String Search |
| 9 | Reverse Words in a String | [#151](https://leetcode.com/problems/reverse-words-in-a-string/) | String Manipulation |
| 10 | Longest Common Prefix | [#14](https://leetcode.com/problems/longest-common-prefix/) | String Comparison |
| 11 | Valid Parentheses | [#20](https://leetcode.com/problems/valid-parentheses/) | Stack |
| 12 | Range Sum Query - Immutable | [#303](https://leetcode.com/problems/range-sum-query-immutable/) | Prefix Sum |

## 1.1 Two Sum – LeetCode #1

**Problem:** Given an integer array and a target, return the indices of two numbers whose sum equals the target.

**Example:**

```text
Input:
nums = [2, 7, 11, 15]
target = 9

Output:
[0, 1]
```

**Approaches practised:**
- Nested loops: Compare each element with the remaining elements.
- Dictionary: Store previously visited numbers and look for the required complement.

**Important points:**
- Return indices, not values.
- Complement = `target - currentNumber`.
- Check whether the complement exists before inserting the current number.
- Handle repeated values such as `[5, 5]`, target `10`.

**Complexity:**

| Approach | Time | Extra Space |
|---|---|---|
| Nested loops | O(n²) | O(1) |
| Dictionary | O(n) average | O(n) |

## 1.2 Contains Duplicate – LeetCode #217

**Problem:** Return `true` if any number occurs more than once.

```text
Input:  [2, 4, 2, 3, 5, 4]
Output: true
```

**Approaches practised:**
- Nested loops.
- HashSet.
- Dictionary frequency counting.
- List-based duplicate tracking.

**Important points:**
- HashSet tracks whether an element has already appeared.
- `HashSet.Add()` returns `false` if the element already exists.
- Dictionary is useful when the frequency of each number is required.
- Avoid printing the same duplicate more than once.

**Complexity:**

| Approach | Time | Extra Space |
|---|---|---|
| Nested loops | O(n²) | O(1), excluding output |
| HashSet | O(n) average | O(n) |
| Dictionary | O(n) average | O(n) |

## 1.3 Move Zeroes – LeetCode #283

**Problem:** Move all zeroes to the end of an array while maintaining the relative order of non-zero elements.

```text
Input:  [0, 1, 0, 3, 12]
Output: [1, 3, 12, 0, 0]
```

**Approaches practised:**
- Create a second array.
- Copy non-zero elements first.
- Use an in-place approach with an index.
- Use two pointers.

**Important points:**
- Maintain the order of non-zero elements.
- Understand the difference between creating another array and modifying the original array.
- LeetCode expects in-place modification.

**Complexity of the in-place approach:**
- Time: O(n)
- Extra Space: O(1)

## 1.4 Missing Number – LeetCode #268

**Problem:** An array contains distinct numbers from `0` to `n`, with one number missing. Find the missing number.

```text
Input:  [3, 0, 1]
Output: 2
```

**Approaches discussed:**
- Expected sum minus actual sum.
- HashSet lookup.
- Understanding `n = nums.Length`.

**Important points:**
- The range starts at zero.
- There are `n + 1` possible numbers.
- The array contains only `n` numbers.

**Complexity:**
- Sum approach: O(n) time, O(1) extra space.
- HashSet approach: O(n) average time, O(n) extra space.

## 1.5 Reverse String – LeetCode #344

**Problem:** Reverse an array of characters in place.

```text
Input:  ['h', 'e', 'l', 'l', 'o']
Output: ['o', 'l', 'l', 'e', 'h']
```

**Approach:**
- Initialise `left = 0`.
- Initialise `right = array.Length - 1`.
- Swap both characters.
- Move both pointers towards the centre.
- Stop when `left >= right`.

**Complexity:**
- Time: O(n)
- Extra Space: O(1)

## 1.6 Valid Anagram – LeetCode #242

**Problem:** Check whether two strings contain the same characters with the same frequencies.

```text
Input:
s = "listen"
t = "silent"

Output: true
```

**Approaches:**
- Sort both strings and compare.
- Count character frequencies using Dictionary.

**Important points:**
- Character frequencies must match.
- `"aab"` and `"abb"` are not anagrams.
- Consider string length and character-case assumptions.

**Complexity:**
- Sorting: O(n log n) time.
- Dictionary: O(n) average time, O(k) space for distinct characters.

## 1.7 First Unique Character in a String – LeetCode #387

**Problem:** Return the index of the first character that appears only once. Return `-1` if no such character exists.

```text
Input:  "swiss"
Output: 1
```

**Approach:**
1. Count each character using a Dictionary.
2. Traverse the original string again.
3. Return the index of the first character with frequency `1`.

**Important point:** The second traversal preserves the original character order.

**Complexity:**
- Time: O(n) average.
- Space: O(k), where k is the number of distinct characters.

## 1.8 Find the Index of the First Occurrence in a String – LeetCode #28

**Problem:** Find the first position where `needle` occurs in `haystack`. Return `-1` if it is not found.

```text
Input:
haystack = "sadbutsad"
needle = "sad"

Output: 0
```

**Concepts:**
- String traversal.
- Substring comparison.
- Index boundaries.
- Handling cases where the target is not present.

## 1.9 Reverse Words in a String – LeetCode #151

**Problem:** Reverse the order of words, remove extra spaces, and return a single-space-separated string.

```text
Input:  "the sky is blue"
Output: "blue is sky the"
```

**Important points:**
- Reverse the word order, not individual characters.
- Handle leading and trailing spaces.
- Handle multiple spaces between words.

## 1.10 Longest Common Prefix – LeetCode #14

**Problem:** Find the longest prefix shared by all strings in an array.

```text
Input:  ["flower", "flow", "flight"]
Output: "fl"
```

**Concepts:**
- Compare characters across strings.
- Stop when characters differ.
- Stop when any string reaches its end.
- Return an empty string if there is no common prefix.

## 1.11 Valid Parentheses – LeetCode #20

**Problem:** Determine whether brackets are correctly opened and closed.

```text
Input:  "()[]{}"
Output: true
```

```text
Input:  "([)]"
Output: false
```

**Approach:**
1. Push opening brackets onto a Stack.
2. When a closing bracket appears, check the stack.
3. Use `Peek()` to verify the matching opening bracket.
4. Use `Pop()` when the pair matches.
5. At the end, the Stack must be empty.

**Edge cases practised:**
- `")("`
- `"(()"`
- `"([)]"`
- Empty string.

**Complexity:**
- Time: O(n)
- Extra Space: O(n)

## 1.12 Range Sum Query - Immutable – LeetCode #303

**Problem:** Answer multiple queries asking for the sum of elements between two indices, inclusive.

```text
Input:
nums = [-2, 0, 3, -5, 2, -1]

sumRange(0, 2) = 1
sumRange(2, 5) = -1
sumRange(0, 5) = -3
```

**Approach: Prefix Sum**

Build a prefix array where each index stores the running total.

Formula:

```text
sum(left, right) = prefix[right] - prefix[left - 1]
```

Special case:

```text
if (left == 0)
    return prefix[right];
```

**Important points:**
- Build the prefix array once in the constructor.
- Store it as a class-level field.
- Use it for subsequent queries.
- Avoid looping over the original array for every query.

**Complexity:**

| Operation | Time | Extra Space |
|---|---|---|
| Constructor | O(n) | O(n) |
| Each SumRange query | O(1) | O(1) |

---

# 2. Additional Array Problems

These are additional interview exercises practised outside the 12 LeetCode problems above.

| No. | Problem | Example | Expected Result |
|---:|---|---|---|
| 1 | Find Maximum Element | `[12,45,7,89,34,67]` | `89` |
| 2 | Find Second-Largest Distinct Element | `[12,45,7,89,34,67]` | `67` |
| 3 | Find Duplicate Elements | `[2,4,2,2,3,5,3,5]` | `[2,3,5]` |
| 4 | Count Frequency of Elements | `[2,4,2,3,4,2]` | `2:3, 4:2, 3:1` |
| 5 | Remove Duplicates from Sorted Array | `[1,1,2,2,3]` | `[1,2,3]` |
| 6 | Reverse Integer Array | `[1,2,3,4,5]` | `[5,4,3,2,1]` |
| 7 | Pair Sum in Sorted Array | `[1,3,4,6,8,9]`, target `13` | `4,9` |
| 8 | Linear Search | `[10,20,30,40,50]`, target `30` | Index `2` |

## 2.1 Find Maximum Element

**Problem:** Find the largest element without using `Max()`.

```text
Input:  [12, 45, 7, 89, 34, 67]
Output: 89
```

**Approach:**
- Initialise `max` with the first element.
- Start the loop at index `1`.
- Compare each element with `max`.
- Update `max` when a larger element is found.

**Why start at index 1?**

Index `0` has already been used to initialise `max`.

**Complexity:** O(n) time, O(1) extra space.

## 2.2 Find Second-Largest Distinct Element

**Problem:** Find the second-largest distinct number.

```text
Input:  [12, 45, 7, 89, 34, 67]
Output: 67
```

Another example:

```text
Input:  [10, 10, 8]
Output: 8
```

**Approach:**
- Maintain `max` and `secondMax`.
- When a new maximum appears, move the old maximum into `secondMax`.
- Otherwise, update `secondMax` if the current value is smaller than `max` but greater than `secondMax`.

**Important edge cases:**
- Negative numbers.
- Repeated maximum values.
- Arrays with fewer than two distinct values.
- Correct initialisation of both variables.

**Complexity:** O(n) time, O(1) extra space.

## 2.3 Find Duplicate Elements

**Problem:** Return all values that occur more than once.

```text
Input:  [2, 4, 2, 2, 3, 5, 3, 5]
Output: [2, 3, 5]
```

**Approaches compared:**

| Approach | Logic | Time | Extra Space |
|---|---|---|---|
| Nested loops | Compare elements with other elements | O(n²) | O(1), excluding output |
| HashSet | Track previously seen values | O(n) average | O(n) |
| Dictionary | Count element frequency | O(n) average | O(n) |
| List + Contains | Check whether an element is already stored | Can be O(n²) | O(n) |

**Important concepts:**
- Avoid printing the same duplicate repeatedly.
- Understand `HashSet.Add()` and its Boolean result.
- Understand when to use Dictionary instead of HashSet.
- Understand why a separate list for every distinct number is unnecessary.

## 2.4 Count Frequency of Elements

**Problem:** Count how many times each number occurs.

```text
Input: [2, 4, 2, 3, 4, 2]

Output:
2 → 3
4 → 2
3 → 1
```

**Approach:**
- Use the number as the Dictionary key.
- Use its frequency as the value.
- If the key exists, increment the frequency.
- Otherwise, insert the key with frequency `1`.

## 2.5 Remove Duplicates from a Sorted Array

**Problem:** Keep only unique values in a sorted array.

```text
Input:  [1, 1, 2, 2, 3]
Output: [1, 2, 3]
```

**Approaches practised:**
- Create a second array.
- Compare adjacent elements.
- Modify the original array using a write index.

**Important point:** Because the array is sorted, duplicates are adjacent. The in-place approach avoids creating a second array.

Related LeetCode problem: [Remove Duplicates from Sorted Array – #26](https://leetcode.com/problems/remove-duplicates-from-sorted-array/).

## 2.6 Reverse Integer Array

**Problem:** Reverse an array without using another array.

```text
Input:  [1, 2, 3, 4, 5]
Output: [5, 4, 3, 2, 1]
```

**Approach:**
- Use `left` and `right`.
- Swap values.
- Move both pointers inward.
- Stop when `left >= right`.

## 2.7 Pair Sum in a Sorted Array

**Problem:** Find two numbers whose sum equals the target.

```text
Input:  [1, 3, 4, 6, 8, 9]
Target: 13

Output: 4, 9
```

**Approach:**
- Start with pointers at both ends.
- If the sum is smaller than the target, move `left` forward.
- If the sum is larger, move `right` backward.
- If the sum matches, return or print the pair.

**Complexity:** O(n) time, O(1) extra space.

## 2.8 Linear Search

**Problem:** Find the index of a target element.

```text
Input:  [10, 20, 30, 40, 50]
Target: 30

Output: 2
```

**Approach:**
- Check each element one by one.
- Return the index when the target is found.
- Return `-1` if it is absent.

**Complexity:** O(n) time, O(1) extra space.

---

# 3. String Problems

| No. | Problem | Example | Expected Result |
|---:|---|---|---|
| 1 | Reverse a String | `"hello"` | `"olleh"` |
| 2 | Check Palindrome | `"madam"` | `true` |
| 3 | Character Frequency | `"banana"` | `a:3, n:2, b:1` |
| 4 | First Non-Repeating Character | `"swiss"` | `w` |
| 5 | Count Vowels and Consonants | `"hello"` | 2 vowels, 3 consonants |
| 6 | Check Anagram | `"listen"`, `"silent"` | `true` |
| 7 | Reverse Words | `"hello world"` | `"world hello"` |
| 8 | Find Shortest Word | `"I love programming"` | `"I"` |
| 9 | Word Frequency | `"cat dog cat bird cat"` | `cat:3, dog:1, bird:1` |
| 10 | Check String Rotation | `"abcd"`, `"cdab"` | `true` |
| 11 | Longest Common Prefix | `["flower","flow","flight"]` | `"fl"` |
| 12 | Find Substring Occurrence | `"sadbutsad"`, `"sad"` | `0` |
| 13 | Recursive String Reverse | `"hello"` | `"olleh"` |

## 3.1 Reverse a String

**Approaches:**
- Loop from the last character to the first.
- Use `StringBuilder` to construct the reversed string.

**Important concept:** Strings in C# are immutable. Operations that appear to change a string create a new string rather than modifying the original instance.

## 3.2 Check Palindrome

**Problem:** Determine whether a string reads the same forward and backward.

```text
Input:  "madam"
Output: true
```

**Approach:** Use two pointers to compare characters from both ends.

## 3.3 Character Frequency

**Problem:** Count the occurrence of each character.

```text
Input: "banana"

Output:
b → 1
a → 3
n → 2
```

**Main concept:** Dictionary with character keys and integer frequency values.

## 3.4 First Non-Repeating Character

**Problem:** Find the first character whose frequency is exactly one.

```text
Input:  "aabbcddee"
Output: "c"
```

**Approach:**
1. Count character frequencies.
2. Traverse the original string.
3. Find the first character with frequency `1`.

## 3.5 Count Vowels and Consonants

```text
Input:  "hello"
Output:
Vowels = 2
Consonants = 3
```

**Important points:**
- Check vowels using `a`, `e`, `i`, `o`, `u`.
- Do not count spaces or non-letter characters as consonants.
- Consider uppercase and lowercase letters.

## 3.6 Reverse Words in a Sentence

```text
Input:  "I love CSharp"
Output: "CSharp love I"
```

**Important distinction:** Reverse the order of words, not the characters inside each word.

## 3.7 Find the Shortest Word

```text
Input:  "I love programming"
Output: "I"
```

**Approach:**
- Split the sentence into words.
- Compare their lengths.
- Keep the shortest word.

## 3.8 Count Word Frequency

```text
Input: "cat dog cat bird cat"

Output:
cat → 3
dog → 1
bird → 1
```

**Main concept:** Dictionary-based frequency counting.

## 3.9 Check String Rotation

**Problem:** Determine whether one string is a rotation of another.

```text
Input:
Original = "abcd"
Rotated  = "cdab"

Output: true
```

**Approach:**

Concatenate the original string with itself:

```text
"abcd" + "abcd" = "abcdabcd"
```

Then check whether the rotated string exists inside the concatenated string. Both strings must also have equal lengths.

Related LeetCode problem: [Rotate String – #796](https://leetcode.com/problems/rotate-string/).

## 3.10 Recursive String Reverse

**Problem:** Reverse a string using recursion.

```text
Input:  "hello"
Output: "olleh"
```

**Concepts:**
- Base condition.
- Recursive call on the remaining substring.
- Returning characters in reverse order.

---

# 4. Searching and Two-Pointer Problems

## 4.1 Binary Search

**Problem:** Find a target in a sorted array.

```text
Input:
[10, 20, 30, 40, 50, 60, 70]

Target: 50
Output: 4
```

**Approach:**
1. Initialise `left` and `right`.
2. Calculate the middle index.
3. Compare the middle element with the target.
4. If the target is greater, search the right half.
5. If the target is smaller, search the left half.
6. Repeat until found or `left > right`.

**Important concepts:**
- Input must be sorted.
- Use `left <= right`.
- Update the search boundaries using `middle + 1` or `middle - 1`.
- Recalculate the middle index.

**Complexity:**
- Time: O(log n)
- Extra Space: O(1) for iterative binary search.

## 4.2 Two-Pointer Pattern

The two-pointer pattern was practised through several problems.

| Problem | Pointer Behaviour |
|---|---|
| Reverse Array | Move both pointers inward after swapping |
| Palindrome | Compare characters at both ends |
| Pair Sum in Sorted Array | Move left or right based on the sum |
| Move Zeroes | Track positions of non-zero elements |

**Key idea:** Use two positions to reduce unnecessary repeated traversal.

---

# 5. Stack Problems

## 5.1 Reverse a String Using Stack

**Problem:** Reverse a string using the Last In, First Out (LIFO) property.

```text
Input:  "hello"
Output: "olleh"
```

**Stack operations:**

| Operation | Purpose |
|---|---|
| `Push()` | Add an element to the top |
| `Pop()` | Remove and return the top element |
| `Peek()` | Read the top element without removing it |

## 5.2 Valid Parentheses – LeetCode #20

See [LeetCode #20](https://leetcode.com/problems/valid-parentheses/).

**Important concepts:**
- Opening brackets are pushed.
- Closing brackets must match the top of the stack.
- An empty stack when a closing bracket arrives means invalid input.
- The stack must be empty after processing the entire string.

---

# 6. Prefix Sum Problems

## 6.1 Build a Prefix Sum Array

**Problem:** Convert an array into running totals.

```text
Input:  [2, 4, 6, 8]
Output: [2, 6, 12, 20]
```

**Approach:**
- Maintain a running sum.
- Add the current array element.
- Store the running sum at the current index.

## 6.2 Range Sum Query – Immutable

See [LeetCode #303](https://leetcode.com/problems/range-sum-query-immutable/).

**Problem:** Find the sum of elements between two indices.

```text
sum(left, right) = prefix[right] - prefix[left - 1]
```

When `left == 0`, return `prefix[right]`.

**Important concepts:**
- Prefix array construction.
- Constructor.
- Class-level fields.
- Reusing calculated results.
- O(1) range queries.

---

# 7. Recursion Problems

| No. | Problem | Input | Expected Result |
|---:|---|---|---|
| 1 | Countdown | `3` | `3, 2, 1` |
| 2 | Print Numbers in Ascending Order | `3` | `1, 2, 3` |
| 3 | Sum from 1 to N | `4` | `10` |
| 4 | Factorial | `4` | `24` |
| 5 | Reverse a String | `"hello"` | `"olleh"` |

## 7.1 Countdown

```text
Input: 3

Output:
3
2
1
```

**Concept:** Recursive calls move towards the base condition.

## 7.2 Print Numbers in Ascending Order

```text
Input: 3

Output:
1
2
3
```

**Concept:** Code after a recursive call executes while the call stack unwinds.

## 7.3 Sum from 1 to N

```text
Input: 4
Output: 10
```

Formula:

```text
Sum(n) = n + Sum(n - 1)
```

Base condition:

```csharp
if (n == 0)
    return 0;
```

## 7.4 Factorial

```text
Input: 4
Output: 24
```

Formula:

```text
4! = 4 × 3 × 2 × 1 = 24
```

Base condition:

```csharp
if (num == 0)
    return 1;
```

**Important points:**
- Why factorial of zero is one.
- Why returning zero would make the multiplication result zero.
- Why negative input needs separate handling.
- Why every recursive call must move towards the base condition.

## 7.5 Reverse a String Using Recursion

```text
Input:  "hello"
Output: "olleh"
```

**Important concepts:**
- Base condition for an empty string.
- `Substring(1)` to get the remaining string.
- Recursive call and return order.
- Why the first character is appended after the recursive call.

**Complexity of the practiced implementation:**
- Time: O(n²), because of repeated substring creation and string concatenation.
- Recursive stack: O(n).

---

# 8. Time and Space Complexity

Complexity was practised alongside the programming problems.

## 8.1 Time Complexity

| Complexity | Meaning | Example |
|---|---|---|
| O(1) | Constant work | Array index lookup |
| O(log n) | Search space is repeatedly divided | Binary Search |
| O(n) | One traversal of the input | Find Maximum |
| O(n log n) | Divide-and-conquer sorting | Merge Sort |
| O(n²) | Nested traversal | Basic Duplicate Detection |
| O(2ⁿ) | Exponential growth | Some recursive combinations |

## 8.2 Space Complexity

| Complexity | Meaning | Example |
|---|---|---|
| O(1) | Fixed extra memory | Reverse Array in place |
| O(n) | Memory grows with input | HashSet storing elements |
| O(n) | Recursive call stack grows with input | Recursive Factorial |

## 8.3 Complexity Examples Practised

| Problem | Time | Auxiliary Space |
|---|---|---|
| Find Maximum | O(n) | O(1) |
| Find Second Largest | O(n) | O(1) |
| Nested Duplicate Detection | O(n²) | O(1), excluding output |
| HashSet Duplicate Detection | O(n) average | O(n) |
| Reverse Array In Place | O(n) | O(1) |
| Reverse Array With New Array | O(n) | O(n) |
| Binary Search | O(log n) | O(1) |
| Two Pointers Pair Sum | O(n) | O(1) |
| Prefix Sum Construction | O(n) | O(n) |
| Prefix Sum Query | O(1) | O(1) |
| Recursive Factorial | O(n) | O(n) |
| Recursive String Reverse | O(n²) | O(n) stack |

**Important complexity lessons:**
- O(2n) simplifies to O(n).
- O(5n) simplifies to O(n).
- O(n²) grows much faster than O(n).
- O(n/2) simplifies to O(n).
- Time complexity describes how work grows, not the actual number of seconds.
- Auxiliary space means additional memory used, excluding the original input and usually excluding the required output.

---

# 9. Important C# Concepts Practised

These concepts came up repeatedly while solving the problems.

| Concept | What we practised |
|---|---|
| Arrays | Indexing, Length, traversal, modification |
| `for` loop | Initialisation, condition, increment |
| `while` loop | Pointer movement and loop termination |
| Nested loops | Comparing array elements |
| Dictionary | Keys, values, frequency counting |
| HashSet | Unique values and `.Add()` Boolean result |
| List | Storing results and using `Contains()` |
| Stack | `Push()`, `Pop()`, `Peek()` |
| String | Immutability, indexing, `Substring()` |
| StringBuilder | Building strings efficiently |
| Recursion | Base condition, recursive call, call stack |
| Class | Grouping state and methods |
| Constructor | Initialising an object |
| `return` | Returning a result and exiting a method |
| `break` | Exiting a loop |
| `left` and `right` | Two-pointer traversal |
| `middle` | Binary search |
| Temporary variable | Swapping values |

---

# 10. Revision Checklist

Use this checklist to track independent problem-solving ability.

## Arrays and Dictionaries

- [ ] Find Maximum Element
- [ ] Find Second-Largest Distinct Element
- [ ] Contains Duplicate – #217
- [ ] Count Frequency Using Dictionary
- [ ] Remove Duplicates from Sorted Array – #26
- [ ] Reverse Array In Place
- [ ] Move Zeroes – #283
- [ ] Missing Number – #268
- [ ] Two Sum – #1
- [ ] Pair Sum in Sorted Array
- [ ] Linear Search

## Strings

- [ ] Reverse String – #344
- [ ] Palindrome
- [ ] Character Frequency
- [ ] First Unique Character – #387
- [ ] Valid Anagram – #242
- [ ] Count Vowels and Consonants
- [ ] Reverse Words – #151
- [ ] Shortest Word
- [ ] Word Frequency
- [ ] String Rotation
- [ ] Longest Common Prefix – #14
- [ ] Find First Occurrence – #28
- [ ] Recursive String Reverse

## Searching and Patterns

- [ ] Binary Search
- [ ] Two-Pointer Array Reverse
- [ ] Two-Pointer Palindrome
- [ ] Two-Pointer Pair Sum
- [ ] Two-Pointer Move Zeroes

## Stack and Prefix Sum

- [ ] Reverse String Using Stack
- [ ] Valid Parentheses – #20
- [ ] Build Prefix Sum Array
- [ ] Range Sum Query – #303

## Recursion

- [ ] Countdown
- [ ] Print Numbers in Ascending Order
- [ ] Sum from 1 to N
- [ ] Factorial
- [ ] Reverse String Using Recursion

## Complexity

- [ ] Explain O(1)
- [ ] Explain O(log n)
- [ ] Explain O(n)
- [ ] Explain O(n log n)
- [ ] Explain O(n²)
- [ ] Distinguish time and space complexity
- [ ] Calculate auxiliary space
- [ ] Compare nested loops with HashSet and Dictionary

---

## Revision Method

For each problem, follow this process:

1. **Understand:** Explain what the problem is asking.
2. **Approach:** Describe the logic before writing code.
3. **Implement:** Write the C# solution independently.
4. **Trace:** Walk through the code using the example input.
5. **Complexity:** Explain time and auxiliary space.
6. **Interview explanation:** Explain why you selected that approach and whether a better one exists.

**Revision rule:** Being able to recognise a solution is not the same as being able to solve the problem. A problem is considered revised when you can write the solution without looking at previous code and explain the logic clearly.

*Always learning. Always questioning.*