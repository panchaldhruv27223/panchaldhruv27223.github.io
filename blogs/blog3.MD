All You Need to Know About the “collections” Module in Python.
Dhruv Panchal
Dhruv Panchal
7 min read
·
Mar 15, 2025
2






Press enter or click to view image in full size
PYTHON LOGO
The collections module in Python provides specialized data structures that improve performance and readability for common programming tasks. These structures offer significant advantages over Python's built-in data types, particularly when handling complex data manipulation, improving code efficiency, and maintaining order in data processing. This guide will take you through every essential data structure in the collections module with detailed explanations, why they are important, how they function, their complete set of methods, and real-world applications.

1. defaultdict: Handling Missing Keys with Default Values
Why is defaultdict Important?

A defaultdict is an enhanced version of Python’s built-in dictionary. Unlike a standard dictionary, which raises a KeyError when trying to access a non-existent key, defaultdict provides a default value automatically. This makes it especially useful when dealing with dynamic datasets, such as counting occurrences, grouping items, and working with sparse data.

How It Works?

The defaultdict requires a default factory function, which returns a default value when a key is missing.

Example:

from collections import defaultdict

### (0)
def default_factory():
    return "Value not found"

d = defaultdict(default_factory)
d['a'] = 10
print(d['a'])  # Output: 10
print(d['b'])  # Output: "Value not found"


d = defaultdict(int)  # Default value will be `0` for missing keys
print(d['missing_key'])  # Output: 0

# (A) Using int as default_factory (default value = 0)
count_dict = defaultdict(int)  # Default value of int is 0
count_dict['a'] += 1  # Since 'a' does not exist, it starts at 0 and increments to 1
print(count_dict)  # Output: defaultdict(<class 'int'>, {'a': 1})

# (B) Using list as default_factory (default value = empty list)
from collections import defaultdict
list_dict = defaultdict(list)  # Default value is an empty list
list_dict['fruits'].append('apple')  # No need to check if 'fruits' exists
print(list_dict)  # Output: defaultdict(<class 'list'>, {'fruits': ['apple']})

# (C) Using set as default_factory (default value = empty set)
set_dict = defaultdict(set)  # Default value is an empty set
set_dict['colors'].add('red')
print(set_dict)  # Output: defaultdict(<class 'set'>, {'colors': {'red'}})

# (D) Using lambda for Custom Default Values
custom_dict = defaultdict(lambda: "Not Found")
print(custom_dict['missing_key'])  # Output: Not Found

# (E) Counting Word Frequency in a String
text = "apple banana apple orange banana apple"
word_count = defaultdict(int)
for word in text.split():
    word_count[word] += 1
print(word_count)  # Output: defaultdict(<class 'int'>, {'apple': 3, 'banana': 2, 'orange': 1})
Common Methods:

.default_factory: Returns the default factory function.
.items(): Returns key-value pairs.
.keys(): Returns all keys.
.values(): Returns all values.
.get(): Retrieves the value of a key, returning the default if the key doesn’t exist.
2. deque: Fast and Efficient Double-Ended Queue
Why is deque Important?

A deque (double-ended queue) is optimized for fast insertions and deletions at both ends, making it far more efficient than a regular list for such operations. While lists in Python have O(n) complexity for insertions and deletions at the beginning, deque provides O(1) complexity.

How It Works?

A deque functions like a queue or stack but allows for efficient appending and popping from both ends.

Why Use deque Instead of list?

In Python, lists are dynamic arrays. While they allow efficient indexing, inserting or deleting elements from the beginning is slow because all elements need to be shifted.

deque is the best choice when you frequently add or remove elements from both ends.

Example:

from collections import deque

dq = deque()
# Append to the right
dq.append(1)
dq.append(2)
dq.append(3)
print(dq)  # Output: deque([1, 2, 3])

# Append to the left
dq.appendleft(0)
print(dq)  # Output: deque([0, 1, 2, 3])

# Pop from the right
dq.pop()
print(dq)  # Output: deque([0, 1, 2])

# Pop from the left
dq.popleft()
print(dq)  # Output: deque([1, 2])

dq = deque([1, 2])

# Extend deque on the right
dq.extend([3, 4, 5])
print(dq)  # Output: deque([1, 2, 3, 4, 5])

# Extend deque on the left (reversed order)
dq.extendleft([0, -1])
print(dq)  # Output: deque([-1, 0, 1, 2, 3, 4, 5])
dq = deque([1, 2, 3, 4, 5])

# Rotate right (positive value)
dq.rotate(2)
print(dq)  # Output: deque([4, 5, 1, 2, 3])

# Rotate left (negative value)
dq.rotate(-2)
print(dq)  # Output: deque([1, 2, 3, 4, 5])  # Back to original
dq = deque([1, 2, 3])

# Insert at a specific index
dq.insert(1, 99)  # Insert 99 at index 1
print(dq)  # Output: deque([1, 99, 2, 3])

# Remove first occurrence of a value
dq.remove(99)
print(dq)  # Output: deque([1, 2, 3])

# Create a deque with max length 3
dq = deque(maxlen=3)
dq.append(1)
dq.append(2)
dq.append(3)
print(dq)  # Output: deque([1, 2, 3], maxlen=3)

# Adding another element removes the oldest one
dq.append(4)
print(dq)  # Output: deque([2, 3, 4], maxlen=3)

dq = deque([1, 2, 3, 4])
dq.reverse()
print(dq)  # Output: deque([4, 3, 2, 1])
Common Methods:

.append(x): Add x to the right end.
.appendleft(x): Add x to the left end.
.pop(): Remove and return the rightmost element.
.popleft(): Remove and return the leftmost element.
.rotate(n): Rotate the deque n steps.
.reverse(): Reverse the deque.
Use Case: Useful for implementing queues, stacks, and BFS algorithms in competitive programming and real-time applications where fast operations are needed.

3. Counter: Counting Elements Easily
Why is Counter Important?

A Counter is a specialized dictionary that is used for counting occurrences of elements in an iterable. It is particularly useful when working with text analysis, frequency distribution, and data science applications.

How It Works?

A Counter stores elements as dictionary keys and their counts as values.

Example:

from collections import Counter

c = Counter("banana")
print(c)  # Output: Counter({'a': 3, 'n': 2, 'b': 1})


print(c.most_common(2))  # Output: [('a', 3), ('n', 2)]

# Counting from a list

c1 = Counter([1, 2, 2, 3, 3, 3])
print(c1)  # Output: Counter({3: 3, 2: 2, 1: 1})

# Counting from a string

c2 = Counter("hello world")
print(c2)  # Output: Counter({'l': 3, 'o': 2, 'h': 1, 'e': 1, ' ': 1, 'w': 1, 'r': 1, 'd': 1})

# Counting from a dictionary

c3 = Counter({'apple': 3, 'banana': 2})
print(c3)  # Output: Counter({'apple': 3, 'banana': 2})
c = Counter("banana")
print(c['a'])  # Output: 3 (count of 'a')

print(c['z'])  # Output: 0 (returns 0 if key is not found)

c = Counter("mississippi")

print(c.most_common(2))  # Output: [('i', 4), ('s', 4)]

c = Counter("apple")
c.update("banana")  # Adds occurrences of letters in "banana"

print(c)  

# Output: Counter({'a': 4, 'p': 2, 'l': 1, 'e': 1, 'b': 1, 'n': 2})

c1 = Counter("apple")
c2 = Counter("banana")

# Adding counters
print(c1 + c2)  

# Output: Counter({'a': 4, 'p': 2, 'n': 2, 'l': 1, 'e': 1, 'b': 1})

# Subtracting counters

print(c1 - c2)  

# Output: Counter({'p': 2, 'l': 1, 'e': 1})  (removes common elements)

# Finding intersection (min count)
print(c1 & c2)  

# Output: Counter({'a': 2}) (common minimum count)

# Finding union (max count)

print(c1 | c2)  
# Output: Counter({'a': 3, 'p': 2, 'n': 2, 'l': 1, 'e': 1, 'b': 1})

c = Counter(a=3, b=-2, c=0, d=5)
c += Counter()  # Removes negative and zero counts
print(c)  # Output: Counter({'d': 5, 'a': 3})
Common Methods:

.most_common(n): Returns n most common elements.
.elements(): Returns all elements.
.update(iterable): Updates the counts with an iterable.
.subtract(iterable): Subtracts counts using an iterable.
Use Case: Used in word frequency analysis, inventory management, and statistics to quickly determine frequency distributions.

4. namedtuple: Readable, Immutable Data Structures
Why is namedtuple Important?

A namedtuple provides a lightweight, immutable alternative to a class. It allows defining objects with named fields instead of using regular tuples, making the code more readable and self-documenting.

How It Works?

A namedtuple behaves like a tuple but allows accessing values using named attributes instead of indices.

Example:

from collections import namedtuple

Point = namedtuple('Point', ['x', 'y'])
p = Point(10, 20)
print(p.x, p.y)  # Output: 10 20
Common Methods:

.fields: Returns the field names.
.replace(**kwargs): Returns a new instance with values replaced.
.asdict(): Converts to an ordered dictionary.
When NOT to Use namedtuple?

When you need mutable objects (use dataclasses instead).
When you need complex behavior with multiple methods (use class).
When working with huge datasets (use dict for dynamic keys).

Use Case: When you need structured, immutable, and memory-efficient objects that provide clear attribute access, often used in data modeling, CSV parsing, and database results.

5. OrderedDict: Maintaining Key Order in Dictionaries
Why is OrderedDict Important?

In Python 3.7+, regular dictionaries maintain insertion order, but an OrderedDict provides additional capabilities, such as the ability to move items efficiently. It ensures the order of elements remains the same as when they were inserted, which is crucial in some applications like LRU caches.

How It Works?

An OrderedDict stores key-value pairs in the order they were added.

Example:

from collections import OrderedDict

od = OrderedDict()
od['a'] = 1
od['b'] = 2
od['c'] = 3
print(od)  # Output: OrderedDict([('a', 1), ('b', 2), ('c', 3)])

d1 = {'a': 1, 'b': 2}
d2 = {'b': 2, 'a': 1}

print(d1 == d2)  # True (order ignored)

od1 = OrderedDict([('a', 1), ('b', 2)])
od2 = OrderedDict([('b', 2), ('a', 1)])

print(od1 == od2)  # False (order matters!)
od = OrderedDict([('a', 1), ('b', 2), ('c', 3)])

# Move 'a' to the end
od.move_to_end('a')
print(od)  # Output: OrderedDict([('b', 2), ('c', 3), ('a', 1)])

# Move 'c' to the front
od.move_to_end('c', last=False)

print(od)  # Output: OrderedDict([('c', 3), ('b', 2), ('a', 1)])
od = OrderedDict([('a', 1), ('b', 2), ('c', 3)])

# Pop last item
print(od.popitem())  # ('c', 3)

# Pop first item
print(od.popitem(last=False))  # ('a', 1)
Common Methods:

.move_to_end(key, last=True): Moves a key to the end or beginning.
.popitem(last=True): Removes and returns last or first key-value pair.
When to Use OrderedDict?

When you need to reorder items dynamically (e.g., move_to_end).
When insertion order must be considered in equality checks.
When implementing LRU caching strategies.

Use Case: Useful when order-sensitive dictionary operations are required, such as caching, configuration files, and JSON-like data structures.

Become a member
Conclusion: The Power of collections in Python

The collections module makes Python programming simpler, faster, and more efficient by providing optimized alternatives to built-in structures.

🔥 Final Thoughts & Motivation
“The difference between ordinary and extraordinary is that little extra.” — Jimmy Johnson

Keep learning, keep coding, and make your Python skills extraordinary!

Reference: Python Official Docs — Collections

