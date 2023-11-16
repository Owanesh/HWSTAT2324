import tkinter as tk
import numpy as np
import matplotlib.pyplot as plt
from matplotlib.backends.backend_tkagg import FigureCanvasTkAgg

def theoretical_distribution(x):
    """Theoretical distribution function (uniform between 0 and 1)."""
    return x

def empirical_distribution(data, x):
    """Empirical distribution function."""
    return np.mean(data <= x)

def simulation(num_samples):
    """Run the Glivenko-Cantelli simulation."""
    # Simulate soldiers' accuracy in hitting a target
    soldiers_accuracy = np.random.rand(num_samples)  # Random sample from a uniform distribution
    soldiers_accuracy = np.sort(soldiers_accuracy)

    x_range = np.linspace(0, 1, 1000)
    y_theoretical = theoretical_distribution(x_range)
    y_empirical = [empirical_distribution(soldiers_accuracy, i) for i in x_range]

    # Plot
    ax.clear()  # Clear the axis before each new simulation
    ax.plot(x_range, y_theoretical, label="Theoretical (True)")
    ax.step(x_range, y_empirical, label="Empirical (Simulated)", where='post')

    # Add comments to the plot
    ax.text(0.4, 0.8, 'Theoretical Function (Soldiers\' Accuracy)', color='blue', fontsize=10,
            bbox=dict(facecolor='white', alpha=0.5))
    ax.text(0.2, 0.2, 'Empirical Function (Simulation)', color='orange', fontsize=10,
            bbox=dict(facecolor='white', alpha=0.5))

    ax.legend()
    ax.set_xlabel("Accuracy in Hitting the Target")
    ax.set_ylabel("Probability")
    ax.set_title("Glivenko-Cantelli Theorem - Military Example")

    # Update the Tkinter canvas
    canvas.draw()

def update_simulation():
    """Update the simulation based on the number of soldiers."""
    num_soldiers = int(soldiers_entry.get())
    simulation(num_soldiers)

# Tkinter GUI
root = tk.Tk()
root.title("Glivenko-Cantelli Simulation - Military Example")

# Entry for the number of soldiers
soldiers_label = tk.Label(root, text="Number of Soldiers:")
soldiers_label.pack()

soldiers_entry = tk.Entry(root)
soldiers_entry.pack()

# Button to run the simulation
button = tk.Button(root, text="Run Simulation", command=update_simulation)
button.pack()

# Initialize the canvas for the Matplotlib plot
fig, ax = plt.subplots()
canvas = FigureCanvasTkAgg(fig, master=root)
canvas_widget = canvas.get_tk_widget()
canvas_widget.pack()

# Run the Tkinter window
root.mainloop()
