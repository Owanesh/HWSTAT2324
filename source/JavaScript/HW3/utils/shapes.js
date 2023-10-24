/**
 * Represents a rectangle on a canvas.
 */
class Rectangle {
    /**
     * Creates a new Rectangle instance.
     * @param {HTMLCanvasElement} canvasId - The canvas element where the rectangle will be drawn.
     * @param {Object} rectSize - The initial size and position of the rectangle (e.g., { x: 10, y: 10, width: 100, height: 80 }).
     * @param {dictionary} uiSettings - The fill color of the rectangle. {fill:"yellow", border:"black",borderWidth:2}
     */
    constructor(canvasId, rectSize, uiSettings) {
        this.canvas = canvasId;
        this.context = this.canvas.getContext("2d");
        this.context.globalAlpha = 0.5; // Imposta il valore desiderato tra 0 e 1

        this.isResizing = false;
        this.isFlipped = false;
        this.isDragging = false;
        this.dragOffsetX = 0;
        this.dragOffsetY = 0;
        this.resizeHandleSize = 8; // Dimensione del quadratino nero per il ridimensionamento
        this.rect = rectSize
        this.fillColor = uiSettings['fill'];
        this.borderColor = uiSettings['border'];
        this.borderWidth = uiSettings['borderWidth'];
        this.canvas.addEventListener("mousedown", this.mouseDown.bind(this));
        this.canvas.addEventListener("mousemove", this.mouseMove.bind(this));
        this.canvas.addEventListener("mouseup", this.mouseUp.bind(this));
    }
    /**
    * Gets the coordinates and dimensions of the rectangle.
    * @returns {Object} - An object with x, y, width, and height properties.
    */
    getCoordinates() {
        return { x: this.rect.x, y: this.rect.y, width: this.rect.width, height: this.rect.height }
    }
    /**
* Draws the rectangle and its resizing handle on the canvas.
*/
    draw() {
        this.context.clearRect(this.rect.x, this.rect.y, this.rect.width, this.rect.height); // Cancella l'intero canvas
        this.context.strokeStyle = this.borderColor; // Colore del bordo
        this.context.lineWidth = this.borderWidth; // Spessore del bordo
        this.context.fillStyle = this.fillColor;
        if (this.isFlipped) {
            this.context.fillRect(
                this.canvas.width - this.rect.x - this.rect.width,
                this.rect.y,
                this.rect.width,
                this.rect.height
            );
        } else {
            this.context.fillRect(this.rect.x, this.rect.y, this.rect.width, this.rect.height);
        }
         this.spawnResizeAnchorPoint();
    }
    clear() {
        this.context.clearRect(this.rect.x, this.rect.y, this.rect.width, this.rect.height);
    }

    drawInside() {
        this.draw()
    }
    /**
 * Draws the resizing handle of the rectangle.
 */
    spawnResizeAnchorPoint() {
        const x = this.rect.x + this.rect.width - this.resizeHandleSize;
        const y = this.rect.y + this.rect.height - this.resizeHandleSize;
        this.context.fillStyle = "black";
        this.context.fillRect(x, y, this.resizeHandleSize, this.resizeHandleSize);
    }
    /**
   * Handles mouse down event for resizing and dragging the rectangle.
   * @param {MouseEvent} event - The mouse event object.
   */
    mouseDown(event) {

        const mouseX = event.clientX - this.canvas.getBoundingClientRect().left;
        const mouseY = event.clientY - this.canvas.getBoundingClientRect().top;

        const resizeHandleX = this.rect.x + this.rect.width - this.resizeHandleSize;
        const resizeHandleY = this.rect.y + this.rect.height - this.resizeHandleSize;

        if (
            mouseX >= resizeHandleX &&
            mouseX <= resizeHandleX + this.resizeHandleSize &&
            mouseY >= resizeHandleY &&
            mouseY <= resizeHandleY + this.resizeHandleSize
        ) {
            this.isResizing = true;
        } else if (
            mouseX >= this.rect.x &&
            mouseX <= this.rect.x + this.rect.width &&
            mouseY >= this.rect.y &&
            mouseY <= this.rect.y + this.rect.height
        ) {
            this.isDragging = true;
            this.dragOffsetX = mouseX - this.rect.x;
            this.dragOffsetY = mouseY - this.rect.y;
        }
    }
    /**
   * Handles mouse move event for resizing and dragging the rectangle.
   * @param {MouseEvent} event - The mouse event object.
   */
    mouseMove(event) {
        const mouseX = event.clientX - this.canvas.getBoundingClientRect().left;
        const mouseY = event.clientY - this.canvas.getBoundingClientRect().top;
        if (this.isResizing) {
            this.rect.width = mouseX - this.rect.x;
            this.rect.height = mouseY - this.rect.y;
            this.draw();

        } else if (this.isDragging) {
            this.rect.x = mouseX - this.dragOffsetX;
            this.rect.y = mouseY - this.dragOffsetY;
            this.draw();

        }

    }
    /**
   * Handles mouse up event and resets resizing and dragging flags.
   */
    mouseUp() {
        clearTimeout(this.refreshIntervalId)
        this.isResizing = false;
        this.isDragging = false;
    }
    /**
   * Flips the rectangle horizontally and redraws it.
   */
    flip() {
        this.isFlipped = !this.isFlipped;
        this.draw();
    }

}