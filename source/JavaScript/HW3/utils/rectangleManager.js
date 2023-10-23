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
 
    mouseUp(event){
        clearInterval(this.refreshIntervalId)
        this.draw()
    }

    /**
     * Adds an object to the manager and triggers a canvas update.
     * @param {Rectangle} rect - The rectangle to add.
     */
    addObject(rect) {
        this.objects.push(rect);
        this.draw();
    }
    /**
     * Adds batch objects to the manager and triggers a canvas update.
     * @param {Rectangle[]} rectList - The list of objects to add.
     */
    addObjects(rectList) {
        rectList.forEach((rect)=>{this.objects.push(rect)})
        this.drawInside();
    }
    /**
     * Clears the canvas and redraws all objects.
     */
    draw() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.objects.forEach((rect) => {
            rect.drawInside()
        });
    }
}
