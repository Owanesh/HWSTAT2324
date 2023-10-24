/**
 * Manages dynamic objects on a canvas with continuous refresh.
 */
class DynamicObjManager {
    /**
     * Creates a new DynamicObjManager instance.
     * @param {string} canvasId - The ID of the canvas element.
     */
    constructor(canvasId) {
        this.canvas = document.getElementById(canvasId);
        this.context = this.canvas.getContext("2d");
        this.objects = [];
        this.refreshInterval = 1000 / 24; // 60 FPS
        // Set an interval for constant canvas refresh
        this.canvas.addEventListener("mousedown", this.mouseDown.bind(this));
        this.canvas.addEventListener("mouseup", this.mouseUp.bind(this));
        this.refreshIntervalId = -1
    }
    mouseDown(event) {
        this.refreshIntervalId = setInterval(this.draw.bind(this), this.refreshInterval);

    }

    mouseUp(event) {
        clearInterval(this.refreshIntervalId)
        this.draw()
    }

    /**
     * Adds an object to the manager and triggers a canvas update.
     * @param {Rectangle} obj - The object to add.
     */
    addObject(obj) {
        this.objects.push(obj);
        this.draw();
    }
    /**
     * Adds batch objects to the manager and triggers a canvas update.
     * @param {Rectangle[]} objList - The list of objects to add.
     */
    addObjects(objList) {
        objList.forEach((obj) => { this.objects.push(obj) })
        this.draw();
    }
    flushObjects() {
        this.objects = []
    }
    /**
     * Clears the canvas only
     */
    clear() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
    /**
     * Clears the canvas and redraws all objects.
     */
    draw() {
        this.clear()
        this.objects.forEach((obj) => {
            obj.drawInside()
        });
    }
}
