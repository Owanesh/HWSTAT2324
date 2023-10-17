
using Microsoft.Maui.Controls;
using System;
using System.Collections.Generic;
using System.Collections;
using System.Linq;

namespace HW2._2
{
    public partial class MainPage : ContentPage
    {
        public MainPage()
        {
            InitializeComponent();
        }

        protected override void OnAppearing()
        {
            base.OnAppearing();

        // Custom Array (using List)
        List<int> customArray = new List<int>();
            customArray.Add(10);     // Add an element
            customArray.Add(30);     // Add an element
            customArray.Remove(0);  // Remove an element
            int element = customArray.ElementAtOrDefault(0); // Get an element
            bool contains = customArray.Contains(10); // Check existence

        // Built-in Dictionary
        Dictionary<string, int> dictionary = new Dictionary<string, int>();
            dictionary["one"] = 1;  // Add a key-value pair
            dictionary["age"] = 33;  // Add a key-value pair
            dictionary.Remove("one"); // Remove by key
            int value;
            bool keyExists = dictionary.TryGetValue("one", out value); // Check existence

        // Built-in HashSet
        HashSet<int> hashset = new HashSet<int>();
            hashset.Add(10);        // Add a value
            hashset.Add(20);        // Add a value
            hashset.Add(30);        // Add a value
            hashset.Remove(30);     // Remove a value
            bool containsValue = hashset.Contains(20); // Check existence

        // Built-in Queue
        Queue<int> queue = new Queue<int>();
            // Enqueue elements
            queue.Enqueue(10);
            queue.Enqueue(20);
            queue.Enqueue(30);
            int dequeuedItem = queue.Dequeue(); // Dequeue (remove) and return
            int peekedItem = queue.Peek(); // Peek at the front element

        // Built-in Stack
        Stack<int> stack = new Stack<int>();
            stack.Push(10);         // Push an element
            stack.Push(20);         // Push an element
            int poppedItem = stack.Pop(); // Pop and return
            int peekedItemInStack = stack.Peek(); // Peek at the top element

        // Custom Linked List
        LinkedList<int> linkedList = new LinkedList<int>();
            linkedList.AddLast(10);   // Add an element
            linkedList.AddLast(20);   // Add an element
            linkedList.Remove(10);    // Remove an element
            bool containsInLinkedList = linkedList.Contains(10); // Check existence
    }
    }
}