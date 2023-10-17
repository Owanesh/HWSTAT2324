# JavaScript Data Structures

This document contains JavaScript code snippets for various data structures, including Array, Dictionary, HashSet, Queue, Stack, and LinkedList.


### Array


An array is a data structure that stores a collection of elements, typically of the same data type, in a linear sequence. Each element in the array is accessed by its position, known as an index, starting from 0. Arrays are versatile and widely used for data storage and manipulation.

```javascript
class CustomArray {
  constructor() {
    this.data = [];
  }

  // Add an element to the array
  add(value) {
    this.data.push(value);
  }

  // Remove an element from the array
  remove(index) {
    if (index >= 0 && index < this.data.length) {
      this.data.splice(index, 1);
    }
  }

  // Get an element at a specific index
  get(index) {
    if (index >= 0 && index < this.data.length) {
      return this.data[index];
    }
  }

  // Check the existence of a value in the array
  contains(value) {
    return this.data.includes(value);
  }

  // Loop through the array
  forEach(callback) {
    for (let i = 0; i < this.data.length; i++) {
      callback(this.data[i], i);
    }
  }
}
```

### Dictionary (key-value pairs)


A dictionary, in the context of data structures, is a collection that organizes data into unique labels (keys) and their corresponding associated values, facilitating efficient data access and retrieval based on these key-value associations.

```javascript
class CustomDictionary {
  constructor() {
    this.data = {};
  }

  // Add a key-value pair
  add(key, value) {
    this.data[key] = value;
  }

  // Remove a key-value pair by key
  remove(key) {
    if (this.data.hasOwnProperty(key)) {
      delete this.data[key];
    }
  }

  // Get the value associated with a key
  get(key) {
    return this.data[key];
  }

  // Check the existence of a key
  containsKey(key) {
    return this.data.hasOwnProperty(key);
  }
}
```

### LinkedList

A linked list in JavaScript is a data structure composed of nodes, where each node holds data and a reference (pointer) to the next node in the sequence, starting with a "head" node at the beginning.

```javascript
class Node {
  constructor(data) {
    this.data = data;
    this.next = null;
  }
}

class LinkedList {
  constructor() {
    this.head = null;
  }

  // Add a node to the end of the linked list
  add(data) {
    const newNode = new Node(data);
    if (!this.head) {
      this.head = newNode;
    } else {
      let current = this.head;
      while (current.next) {
        current = current.next;
      }
      current.next = newNode;
    }
  }

  // Remove a node with a specific data value
  remove(data) {
    if (!this.head) {
      return;
    }
    if (this.head.data === data) {
      this.head = this.head.next;
      return;
    }
    let current = this.head;
    while (current.next) {
      if (current.next.data === data) {
        current.next = current.next.next;
        return;
      }
      current = current.next;
    }
  }

  // Search for a node with specific data
  contains(data) {
    let current = this.head;
    while (current) {
      if (current.data === data) {
        return true;
      }
      current = current.next;
    }
    return false;
  }
}
```

### HashSet


A HashSet is a data structure that stores a collection of unique values, ensuring that no duplicate elements are allowed. It provides efficient membership testing, allowing you to check if a value exists in the set.

```javascript

class HashSet {
  constructor() {
    this.set = new Set();
  }

  add(value) {
    this.set.add(value);
  }

  remove(value) {
    this.set.delete(value);
  }

  contains(value) {
    return this.set.has(value);
  }
}
```

### Queue


A Queue is a linear data structure that follows the First-In-First-Out (FIFO) principle. It manages a collection of elements where new elements are added to the back (enqueue), and the front element is removed first (dequeue). Queues are often used for tasks like managing tasks in a print queue.

```javascript

class Queue {
  constructor() {
    this.queue = [];
  }
 // Enqueue (add) an element to the back of the queue
  enqueue(value) {
    this.queue.push(value);
  }

  // Dequeue (remove) and return the front element from the queue
  dequeue() {
    if (this.isEmpty()) {
      return null; // Queue is empty
    }
    return this.queue.shift();
  }

  // Peek at the front element without removing it
  peek() {
    if (this.isEmpty()) {
      return null; // Queue is empty
    }
    return this.queue[0];
  }

  // Check if the queue is empty
  isEmpty() {
    return this.queue.length === 0;
  }
}
```
### Stack

A Stack is a linear data structure that follows the Last-In-First-Out (LIFO) principle. It manages a collection of elements where new elements are added to the top (push), and the top element is removed first (pop). Stacks are used in various applications, such as tracking function calls in a computer program or managing undo/redo functionality in applications.


```javascript

class Stack {
  constructor() {
    this.stack = [];
  }

  // Push an element onto the stack
  push(value) {
    this.stack.push(value);
  }

  // Pop and remove the top element from the stack
  pop() {
    if (this.isEmpty()) {
      return null; // Stack is empty
    }
    return this.stack.pop();
  }

  // Peek at the top element without removing it
  peek() {
    if (this.isEmpty()) {
      return null; // Stack is empty
    }
    return this.stack[this.stack.length - 1];
  }

  // Check if the stack is empty
  isEmpty() {
    return this.stack.length === 0;
  }
}
```