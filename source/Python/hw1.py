import tkinter as tk

# Function to draw shapes on the canvas
def draw_shapes():
    # Yellow rectangle
    canvas.create_rectangle(50, 50, 200, 150, fill="yellow")

    # Red circle
    canvas.create_oval(100, 100, 250, 250, fill="red")

    # Green dot
    canvas.create_oval(300, 100, 310, 110, fill="green")

    # Blue line
    canvas.create_line(400, 50, 550, 150, fill="blue")

# Create a window
window = tk.Tk()
window.title("[HW1] HWSTAT2324")

# Create a canvas inside the window
canvas = tk.Canvas(window, width=600, height=300)
canvas.pack()

# Create a button to draw shapes
button = tk.Button(window, text="Draw Shapes", command=draw_shapes)
button.pack()

# Start the main window loop
window.mainloop()
