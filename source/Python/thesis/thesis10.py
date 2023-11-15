import tkinter as tk
from matplotlib.figure import Figure
from matplotlib.backends.backend_tkagg import FigureCanvasTkAgg
import random
import math

def geometric_brownian_motion(num_steps, mu, sigma, dt, S0):
    """
    Simulate a geometric Brownian motion.

    Parameters:
    - num_steps (int): Number of time steps.
    - mu (float): Mean growth rate.
    - sigma (float): Volatility.
    - dt (float): Time step.
    - S0 (float): Initial price.

    Returns:
    - t (numpy.ndarray): Array of time steps.
    - S (numpy.ndarray): Array of simulated prices.
    """
    t = [i * dt for i in range(num_steps + 1)]
    S = [0] * (num_steps + 1)
    S[0] = S0

    for i in range(1, num_steps + 1):
        dW = random.normalvariate(0, math.sqrt(dt))
        dS = mu * S[i-1] * dt + sigma * S[i-1] * dW
        S[i] = S[i-1] + dS

    return t, S

class GBMSimulationApp:
    """
    A simple Tkinter application for simulating geometric Brownian motion and visualizing the results.
    """
    def __init__(self, root):
        """
        Initialize the GBMSimulationApp.

        Parameters:
        - root (tk.Tk): The root Tkinter window.
        """
        self.root = root
        self.root.title("Geometric Brownian Motion Simulation")

        self.num_steps = 1000
        self.mu = 0.1
        self.sigma = 0.2
        self.dt = 0.01
        self.S0 = 100.0

        self.canvas = FigureCanvasTkAgg(Figure(figsize=(5, 4)), master=self.root)
        self.canvas_widget = self.canvas.get_tk_widget()
        self.canvas_widget.pack(side=tk.TOP, fill=tk.BOTH, expand=1)
        self.figure = self.canvas.figure
        self.subplot = self.figure.gca()
        self.subplot.clear()
        self.run_button = tk.Button(root, text="Run Simulation", command=self.plot_gbm_simulation)
        self.run_button.pack()

    def plot_gbm_simulation(self):
        """
        Run the GBM simulation and plot the results on the canvas.
        """
        t, S = geometric_brownian_motion(self.num_steps, self.mu, self.sigma, self.dt, self.S0)

        # Clear the previous plot
        self.subplot.clear()
        self.subplot = self.figure.gca()
        # Plot the new simulation
        self.subplot.plot(t, S, label='GBM Simulation')
        self.subplot.set_title('Geometric Brownian Motion Simulation')
        self.subplot.set_xlabel('Time')
        self.subplot.set_ylabel('GBM Value')
        self.subplot.legend()

        # Update the canvas
        self.canvas.draw()

if __name__ == "__main__":
    root = tk.Tk()
    app = GBMSimulationApp(root)
    root.mainloop()
