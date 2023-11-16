
"use strict";
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
        this.deadTreshold = 0
        this.brokeProcess = {}
    }
    /**
        * Sets the attack matrix for the graph.
        *
        * @param attackMatrix An array representing the attack matrix.
        */
    setAttackMatrix(attackMatrix) {
        this.attackMatrix = attackMatrix
    }
    setDeadTreshold(trehsold) {
        if (this.mode === "GRP")
            this.deadTreshold = trehsold
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
     * Counts the number of 'true' values in an array up to a specified index.
     * @param {boolean[]} array - The array of boolean values.
     * @param {number} indice - The index up to which to count 'true' values.
     * @returns {number} The count of 'true' values within the specified range.
     */
    realAttackCounter(array, indice) {
        // Ensure that the index is within the array's bounds
        if (indice < 0 || indice >= array.length) {
            return -1; // Invalid index
        }

        // Initialize a counter
        let count = 0;

        // Iterate through the array up to the specified index
        for (let i = 0; i <= indice; i++) {
            if (array[i]) { // Count only 'true' values
                count++;
            }
        }

        return count;
    }



    /**
     * Analyzes a system based on an attack vector and draws the corresponding graph lines.
     *
     * @param attackVector An array representing the attack vector for the system.
     */
    analyzeSystem(attackVector) {
        var x = 0;
        var score = 1;
        this.context.strokeStyle = attackVector[0]['color']
        var numberOfAttacks = attackVector.length - 1
        var baseYaxis = this.rect.y + this.rect.height / 2
        let baseXaxis = this.rect.x
        let atkC = 0
        let localScore = {}
        for (let i = attackVector.length; i > 0; i--) {
            atkC++
            this.context.beginPath();
            if (this.mode === "NOR")
                this.context.moveTo(baseXaxis + x, baseYaxis + (this.rect.height / (this.nSys / 10) / numberOfAttacks) * (-score));
            else
                this.context.moveTo(baseXaxis + x, baseYaxis + (this.rect.height / 2 / numberOfAttacks) * -score);
            if (!attackVector[i]) {
                if (this.mode === "SCR" || this.mode === "GRP") score--
            } else {
                if (this.mode === "REL") score += (this.realAttackCounter(attackVector, atkC)) / atkC;
                else if (this.mode === "NOR") { score += this.realAttackCounter(attackVector, atkC) / Math.sqrt(atkC) }
                else score++
            }

            x = (attackVector.length - i) * (this.rect.width / (numberOfAttacks));
            if (this.mode === "NOR")
                this.context.lineTo(baseXaxis + x, baseYaxis + (this.rect.height / (this.nSys / 10) / numberOfAttacks) * (-score));
            else
                this.context.lineTo(baseXaxis + x, baseYaxis + (this.rect.height / 2 / numberOfAttacks) * (-score));
            this.context.stroke();
            if (Math.floor(numberOfAttacks / 2) == atkC) { attackVector[0]['middle'] = (score) }
            if (Math.floor(numberOfAttacks / 5) == atkC) { attackVector[0]['start'] = (score) }
            if (this.mode === "GRP") {
                let dead = false
                if (score <= -Math.abs(this.deadTreshold)) {
                    if (!dead) {
                        dead = true
                        attackVector[0]['color'] = "white"
                        if (score == -Math.abs(this.deadTreshold))
                            this.drawLineOfScore(baseYaxis, numberOfAttacks, score, attackVector[0]['color'], "green")
                    }
                }
                if (score > 0 && score % 5 == 0 && localScore[score] == undefined && attackVector[0]['color'] !== "white") {

                    if (this.brokeProcess[`${score}`] == undefined) this.brokeProcess[`${score}`] = 0
                    localScore[score] = 0
                    if (score % 10 == 0) {
                        this.brokeProcess[`${score}`] += 1

                        this.drawLineOfScore(baseYaxis, numberOfAttacks, score, attackVector[0]['color'], "red")
                    } else {
                        this.brokeProcess[`${score}`] += 1

                        this.drawLineOfScore(baseYaxis, numberOfAttacks, score, attackVector[0]['color'], "yellow")
                    }
                }
            }
            attackVector[0]['final'] = (score)
        }
    }

    drawLineOfScore(baseYaxis, numberOfAttacks, score, colorPrev, colorFut) {
        this.context.lineWidth = 0.2
        this.context.strokeStyle = colorFut
        this.context.moveTo(this.rect.x, baseYaxis + (this.rect.height / 2 / numberOfAttacks) * (-score));
        this.context.lineTo(this.rect.x + this.rect.width, baseYaxis + (this.rect.height / 2 / numberOfAttacks) * (-score));
        this.context.stroke();
        this.context.fillText(score, (this.rect.x), baseYaxis + (this.rect.height / 2 / numberOfAttacks) * (-score));
        this.context.strokeStyle = colorPrev
        this.context.lineWidth = 1.5

    }
    /**
     * Creates a histogram based on the scores of the systems in this.attackMatrix[i][0]['final'].
     * The bars are yellow with black borders and extend horizontally.
     * The height of each bar is proportional to the number of systems within the interval.
     */

    __printHistogram(scores, color, startingPoint, numberOfAttacks, rect) {
        const minScore = Math.min(...scores);
        const maxScore = Math.max(...scores);

        // Define the number of desired intervals (bars)
        const numIntervals = Math.max(Math.ceil(numberOfAttacks / 10), 5);
        const intervalWidth = (maxScore - minScore) / numIntervals;

        const intervalCounts = new Array(numIntervals).fill(0);
        // Count how many systems fall into each interval
        scores.forEach(score => {
            const intervalIndex = Math.min(Math.floor((score - minScore) / intervalWidth), numIntervals - 1);
            intervalCounts[intervalIndex]++;
        });

        // Find the maximum count to normalize the bar heights
        const maxCount = Math.max(...intervalCounts);

        const barUIWidth = rect.height / numIntervals;
        const barHeightFactor = rect.width / 5;

        for (let i = 0; i < numIntervals; i++) {
            const y = rect.y + i * barUIWidth;
            const barUIHeight = (intervalCounts[i] / maxCount) * barHeightFactor;
            const baseX = rect.x + startingPoint - barUIHeight;

            this.context.fillStyle = color;
            this.context.strokeStyle = "black";
            this.context.fillRect(baseX, y, barUIHeight, barUIWidth);
        }

    }
    /**
     * Creates a histogram based on the final scores of systems in this.attackMatrix[i][0]['final'].
     * The bars are yellow with black borders and extend horizontally.
     * The height of each bar is proportional to the number of systems within the interval.
     */
    createHistogram() {
        // Extract the final scores of the systems
        this.context.globalAlpha = 0.5; // Set the desired value between 0 and 1

        if (this.mode != "GRP") {
            var scoreFinals = this.attackMatrix.map(system => system[0]['final']);
            var scoreMiddle = this.attackMatrix.map(system => system[0]['middle']);
            var scoreStart = this.attackMatrix.map(system => system[0]['start']);
            this.__printHistogram(scoreMiddle, "green", this.rect.width / 2, this.attackMatrix.length, this.rect);
            this.__printHistogram(scoreFinals, "yellow", this.rect.width, this.attackMatrix.length, this.rect);
            this.__printHistogram(scoreStart, "blue", this.rect.width / 5, this.attackMatrix.length, this.rect);

        } else if (this.mode == "GRP") {
            this.__grpHistogram(this.brokeProcess)
        }
        // Find the minimum and maximum score
        this.context.globalAlpha = 1;
    }

    __grpHistogram(coordinate) {
        const values = Object.values(coordinate);
        const maxValue = Math.max(...values);
        const barHeight = this.rect.height / Object.keys(coordinate).length;
        const scaledValues = values.map(value => (value / maxValue) * this.rect.width);

        for (let i = 0; i < scaledValues.length; i++) {
            const y = i * barHeight + this.rect.y;
            const x = this.rect.x + this.rect.width - scaledValues[i];
            this.context.fillStyle = 'rgba(52, 152, 219, 0.7)'; // Colore con trasparenza
            this.context.fillRect(x, y, scaledValues[i], barHeight);
            this.context.fillStyle = 'red'; // Colore blu
            this.context.fillText(values[i], x + scaledValues[i] / 2, y + barHeight / 2);
            this.context.fillStyle = '#000';
            this.context.fillText(Object.keys(coordinate)[i], this.rect.width - 5, y + barHeight / 2);
        }
    }



    /**
    * Draws the entire graph, including the grid and systems.
    */
    drawInside() {
        this.context.lineWidth = 0.5
        this.draw();
        this.generateGrid(this.nAtk)
        for (let i = 0; i < this.attackMatrix.length; i++) {
            this.analyzeSystem(this.attackMatrix[i]);
        }
        this.createHistogram()
    }
    /**
     * Flips the graph (toggles between flipped and unflipped states) and redraws it.
     */
    flip() {
        this.isFlipped = !this.isFlipped;
        this.drawInside();
    }
}
