import tkinter as tk
import random

NUM_ROWS = 30
NUM_COLS = 50
CELL_SIZE = 15

class GameOfLife:
    def __init__(self, master):
        self.master = master
        self.master.title("Game of Life")

        self.grid = [[random.choice([0, 1]) for _ in range(NUM_COLS)] for _ in range(NUM_ROWS)]

        self.canvas = tk.Canvas(self.master, width=NUM_COLS * CELL_SIZE, height=NUM_ROWS * CELL_SIZE)
        self.canvas.pack()

        self.step_button = tk.Button(self.master, text="Step", command=self.step)
        self.step_button.pack()

        self.toggle_button = tk.Button(self.master, text="Start", command=self.toggle_animation)
        self.toggle_button.pack()

        self.clear_button = tk.Button(self.master, text="Clear", command=self.clear_grid)
        self.clear_button.pack()

        self.randomize_button = tk.Button(self.master, text="Randomize", command=self.randomize_grid)
        self.randomize_button.pack()

        self.is_drawing = False
        self.canvas.bind("<B1-Motion>", self.draw_cell)
        self.canvas.bind("<ButtonRelease-1>", self.stop_drawing)

        self.animation_active = False
        self.animate()

    def draw_grid(self):
        self.canvas.delete("all")
        for row in range(NUM_ROWS):
            for col in range(NUM_COLS):
                x1 = col * CELL_SIZE
                y1 = row * CELL_SIZE
                x2 = x1 + CELL_SIZE
                y2 = y1 + CELL_SIZE
                if self.grid[row][col] == 1:
                    self.canvas.create_rectangle(x1, y1, x2, y2, fill="black")

    def count_neighbors(self, row, col):
        count = 0
        for i in range(-1, 2):
            for j in range(-1, 2):
                if i == 0 and j == 0:
                    continue
                neighbor_row = (row + i) % NUM_ROWS
                neighbor_col = (col + j) % NUM_COLS
                count += self.grid[neighbor_row][neighbor_col]
        return count

    def step(self):
        new_grid = [[0] * NUM_COLS for _ in range(NUM_ROWS)]
        for row in range(NUM_ROWS):
            for col in range(NUM_COLS):
                neighbors = self.count_neighbors(row, col)
                if self.grid[row][col] == 1:
                    if neighbors < 2 or neighbors > 3:
                        new_grid[row][col] = 0
                    else:
                        new_grid[row][col] = 1
                else:
                    if neighbors == 3:
                        new_grid[row][col] = 1
                    else:
                        new_grid[row][col] = 0
        self.grid = new_grid
        self.draw_grid()

    def toggle_animation(self):
        self.animation_active = not self.animation_active
        if self.animation_active:
            self.toggle_button.config(text="Stop")
        else:
            self.toggle_button.config(text="Start")

    def animate(self):
        if self.animation_active:
            self.step()
        self.master.after(100, self.animate)

    def clear_grid(self):
        self.grid = [[0] * NUM_COLS for _ in range(NUM_ROWS)]
        self.draw_grid()

    def randomize_grid(self):
        self.grid = [[random.choice([0, 1]) for _ in range(NUM_COLS)] for _ in range(NUM_ROWS)]
        self.draw_grid()

    def start_drawing(self, event):
        self.is_drawing = True
        self.draw_cell(event)

    def stop_drawing(self, event):
        self.is_drawing = False

    def draw_cell(self, event):
        if self.is_drawing:
            col = event.x // CELL_SIZE
            row = event.y // CELL_SIZE
            if 0 <= row < NUM_ROWS and 0 <= col < NUM_COLS:
                self.grid[row][col] = 1
                self.draw_grid()

if __name__ == "__main__":
    root = tk.Tk()
    game_of_life = GameOfLife(root)
    root.mainloop()
