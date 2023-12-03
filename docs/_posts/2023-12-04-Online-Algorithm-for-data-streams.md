---
title: Online Algorithms for Data Streams
author: Owanesh
layout: post
date: 2023-12-04
category: Thesis
---
### Online Algorithms for Data Streams
Online algorithms are designed to process data as it arrives, particularly in scenarios where data streams in continuously and cannot be stored entirely. This is prevalent in real-time applications like financial transactions, sensor data, and social media updates. Online algorithms make decisions on-the-fly, adapting to incoming data, and are crucial for handling large-scale streaming data efficiently.

### Key Ideas in Online Algorithms
The main idea behind online algorithms is to make decisions without complete knowledge of future data. These algorithms aim to balance the trade-off between making immediate decisions and preserving accuracy. They often use heuristics and probabilistic methods to process data in a single pass, avoiding the need to store the entire dataset. This approach is valuable for real-time applications where rapid decision-making is essential.

### Explained in simple terms
Imagine you have a toy box, and your friend keeps giving you toys one by one. An online algorithm is like you deciding which toy to play with right after you get it, without knowing which toys you'll get next.

Let's say your friend is giving you numbers, and you want to find the average (mean). Instead of writing down all the numbers and then finding the average, you keep a running total of the numbers and update the average every time you get a new one. This way, you can always tell your friend the average without remembering all the numbers you got.