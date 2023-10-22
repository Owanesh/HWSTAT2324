/**
 * Manages dynamic rectangles on a canvas with continuous refresh.
 */
class DynamicRectangleManager {
    /**
     * Creates a new DynamicRectangleManager instance.
     * @param {string} canvasId - The ID of the canvas element.
     */
    constructor(canvasId) {
        this.canvas = document.getElementById(canvasId);
        this.context = this.canvas.getContext("2d");
        this.rectangles = [];
        this.refreshInterval = 1000 / 60; // 60 FPS
        // Set an interval for constant canvas refresh
        this.refreshIntervalId = setInterval(this.draw.bind(this), this.refreshInterval);
    }

    /**
     * Adds a rectangle to the manager and triggers a canvas update.
     * @param {Rectangle} rect - The rectangle to add.
     */
    addRectangle(rect) {
        this.rectangles.push(rect);
        this.draw();
    }

    /**
     * Clears the canvas and redraws all rectangles.
     */
    draw() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.rectangles.forEach((rect) => {
            rect.draw();
        });
    }
}
