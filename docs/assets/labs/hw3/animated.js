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
        this.context.strokeStyle = attackVector[0]['color']
        let numberOfAttacks = attackVector.length - 1
        let baseYaxis = this.rect.y + this.rect.height / 2
        let baseXaxis = this.rect.x
        for (let i = attackVector.length; i > 0; i--) {
            this.context.beginPath();
            if (this.mode === "NOR")
            this.context.lineTo(baseXaxis + x, baseYaxis + (this.rect.height / 11 / numberOfAttacks) * y);

            else
            this.context.moveTo(baseXaxis + x, baseYaxis + (this.rect.height / 5 / numberOfAttacks) * y);
            if (!attackVector[i]) {
                if (this.mode === "SCR") y++
            } else {
                if (this.mode === "REL") y -= (attackVector.length - i) / ((attackVector.length - i));
                else if (this.mode === "NOR") { y -= (attackVector.length - i) / Math.sqrt((attackVector.length - i)); }
                else y--
            }
            x = (attackVector.length - i) * (this.rect.width / (numberOfAttacks));
            if (this.mode === "NOR")
            this.context.lineTo(baseXaxis + x, baseYaxis + (this.rect.height / 11 / numberOfAttacks) * y);

            else
            this.context.lineTo(baseXaxis + x, baseYaxis + (this.rect.height / 5 / numberOfAttacks) * y);
            this.context.stroke();
        }
        return y
    }
    /**
 * Crea un istogramma basato sui punteggi dei sistemi in this.attackMatrix[i][0]['final'].
 * Le barre sono gialle con bordo nero e si sviluppano in orizzontale.
 * L'altezza di ogni barra è proporzionale al numero di sistemi all'interno dell'intervallo.
 */
    createHistogram() {
        // Estrai i punteggi finali dei sistemi
        this.context.globalAlpha = 0.3; // Imposta il valore desiderato tra 0 e 1

        const scores = this.attackMatrix.map(system => system[0]['final']);
        
        // Trova il minimo e il massimo punteggio
        const minScore = Math.min(...scores);
        const maxScore = Math.max(...scores);
    
        // Definisci il numero di intervalli desiderati (barre)
        const numIntervals = Math.max(Math.ceil(this.attackMatrix.length / 10), 5);  
        // Calcola la larghezza di ogni intervallo
        const intervalWidth = (maxScore - minScore) / numIntervals;
    
        // Crea un array per tenere traccia del conteggio di punti in ciascun intervallo
        const intervalCounts = new Array(numIntervals).fill(0);
    
        // Conta quanti sistemi rientrano in ciascun intervallo
        scores.forEach(score => {
            const intervalIndex = Math.floor((score - minScore) / intervalWidth);
            if (intervalIndex >= numIntervals) {
                intervalCounts[numIntervals - 1]++;
            } else {
                intervalCounts[intervalIndex]++;
            }
        });
    
        // Trova il massimo conteggio per normalizzare le altezze delle barre
        const maxCount = Math.max(...intervalCounts);
    
        // Calcola la larghezza di ogni barra
        const barWidth = this.rect.width / numIntervals;
        // Disegna le barre dell'istogramma
        for (let i = 0; i < numIntervals; i++) {
            const x = this.rect.x + i * barWidth;
            const barHeight = (intervalCounts[i] / maxCount) * this.rect.height;
            const y = this.rect.y + this.rect.height - barHeight;
    
            // Disegna la barra
            this.context.fillStyle = "yellow";
            this.context.strokeStyle = "black";
            this.context.fillRect(x, y, barWidth, barHeight);
        }
        this.context.globalAlpha =1
    }
    

    /**
    * Draws the entire graph, including the grid and systems.
    */
    drawInside() {
        this.draw();
        this.generateGrid(this.nAtk)
        for (let i = 0; i < this.attackMatrix.length; i++) {
            this.attackMatrix[i][0]['final'] = this.analyzeSystem(this.attackMatrix[i]);
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
