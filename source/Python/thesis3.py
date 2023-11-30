import numpy as np
import matplotlib.pyplot as plt

# Parameters
mean = 0
std_dev = 1
num_samples = 1000

# Generate random samples
samples = np.random.normal(mean, std_dev, num_samples)

# Plot histogram and theoretical curve
plt.hist(samples, bins=30, density=True, alpha=0.7, color='blue')
plt.plot(np.linspace(-3, 3, 100), 1/(std_dev * np.sqrt(2 * np.pi)) * np.exp(-((np.linspace(-3, 3, 100) - mean)**2) / (2 * std_dev**2)), 'k', linewidth=2)

# Add labels and title
plt.title('Bell Curve Simulation')
plt.xlabel('Value')
plt.ylabel('Probability Density')

plt.show()