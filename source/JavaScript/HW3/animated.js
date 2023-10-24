/**
 * The `AnimatedGraph` class represents a graphical element for displaying animated graph data.
 * It extends the `Rectangle` class and provides methods for drawing and manipulating the graph.
 *
 * @version 1.0
 */
class AnimatedGraph extends Rectangle {
    constructor(canvasId, rectSize, uiSettings, graphSettings) {
        super(canvasId, rectSize, uiSettings);
        this.uiSettings = uiSettings
        this.probability = graphSettings['probability'];
        this.nAtk = graphSettings['nAttacks'];
        this.mode = graphSettings['mode'];
        this.nSys = graphSettings['nSystems'];
        this.generateGrid(this.nAtk)

    }
    /**
        * Sets the attack matrix for the graph.
        *
        * @param attackMatrix An array representing the attack matrix.
        */
    setAttackMatrix(attackMatrix) {
        this.attackMatrix = attackMatrix
    }
    /**
     * Generates the grid for the graph based on the number of columns specified.
     *
     * @param numberOfColumns The number of columns in the grid.
     */
    generateGrid(numberOfColumns) {
        this.buildUIHorizontal()
        this.buildUIVerticalColumns(numberOfColumns);
        this.buildUIBorder()
        if (this.uiSettings['label'])
            this.buildUILabel(this.uiSettings['label'])
    }

    /**
     * Draws the border of the graph's rectangle.
     */
    buildUIBorder() {
        this.context.strokeStyle = "black"
    }
    /**
    * Draws a label on the graph.
    *
    * @param text The text to display as the label.
    */
    buildUILabel(text) {
        this.context.strokeStyle = "black";

        this.context.fillText(text, (this.rect.x), (this.rect.y));

    }
    /**
    * Draws horizontal lines on the graph's grid.
    */
    buildUIHorizontal() {
        this.context.strokeStyle = "lightgray";
        this.context.lineWidth = 1
        this.context.beginPath();
        this.context.moveTo(this.rect.x, (this.rect.y) + this.rect.height / 2);
        this.context.lineTo((this.rect.width + this.rect.x), (this.rect.y) + this.rect.height / 2);
        this.context.stroke();
    }
    /**
     * Draws vertical lines and labels on the graph's grid based on the number of columns.
     *
     * @param numberOfColumns The number of columns in the grid.
     */
    buildUIVerticalColumns(numberOfColumns) {
        const spaceBetweenVerticals = this.rect.width / (numberOfColumns - 1);
        for (let i = 1; i <= numberOfColumns; i++) {
            this.context.strokeStyle = "lightgray";
            this.context.beginPath();
            this.context.moveTo((this.rect.x + (i - 1) * spaceBetweenVerticals), this.rect.y);
            this.context.lineTo((this.rect.x + (i - 1) * spaceBetweenVerticals), (this.rect.height + this.rect.y));
            this.context.stroke();
            this.context.fillText(((i)), (this.rect.x + (i - 1) * spaceBetweenVerticals), (this.rect.height + this.rect.y));
        }
    }

    /**
     * Analyzes a system based on an attack vector and draws the corresponding graph lines.
     *
     * @param attackVector An array representing the attack vector for the system.
     */
    analyzeSystem(attackVector) {
        let x = 0;
        let y = 0;
        this.context.strokeStyle = attackVector[0]
        let numberOfAttacks = attackVector.length - 1
        let baseYaxis = this.rect.y + this.rect.height / 2
        let baseXaxis = this.rect.x
        for (let i = attackVector.length; i > 0; i--) {
            this.context.beginPath();
            this.context.moveTo(baseXaxis + x, baseYaxis + (this.rect.height / 5 / numberOfAttacks) * y);
            if (!attackVector[i]) {
                if (this.mode === "SCR") y++
            } else {
                if (this.mode === "REL") y -= (attackVector.length - i) / (numberOfAttacks);
                else if (this.mode === "NOR") { y -= (attackVector.length - i) / Math.sqrt(numberOfAttacks); }
                else y--
            }
            x = (attackVector.length - i) * (this.rect.width / (numberOfAttacks));
            this.context.lineTo(baseXaxis + x, baseYaxis + (this.rect.height / 5 / numberOfAttacks) * y);
            this.context.stroke();
        }
    }
    /**
    * Draws the entire graph, including the grid and systems.
    */
    drawInside() {
        this.draw();
        this.generateGrid(this.nAtk)
        for (let i = 0; i < this.attackMatrix.length; i++) {
            this.analyzeSystem(this.attackMatrix[i]);
        }
    }
    /**
     * Flips the graph (toggles between flipped and unflipped states) and redraws it.
     */
    flip() {
        this.isFlipped = !this.isFlipped;
        this.drawInside();
    }
}
