/**
 * The `AttackMonitor` class represents a monitor for generating and managing attack matrices.
 * It provides methods to create and access attack matrices with specified settings.
 *
 * @constructor
 * @param {Object} attackSettings - An object containing settings for the attack monitor, including probability, number of attacks, mode, and number of systems.
 */
class AttackMonitor {
    /**
     * Constructs an `AttackMonitor` object with the given settings.
     *
     * @param {Object} attackSettings - An object containing settings for the attack monitor.
     */
    constructor(attackSettings) {
        this.probability = attackSettings['probability']; // Probability of attacks
        this.nAtk = attackSettings['nAttacks'];          // Number of attacks
        this.mode = attackSettings['mode'];              // Mode of attack monitoring
        this.nSys = attackSettings['nSystems'];          // Number of systems
        this.matrix = this.buildMatrix();                // Attack matrix generated based on settings
    }
    /**
    * Retrieves the generated attack matrix.
    *
    * @returns {Array} An array representing the attack matrix.
    */
    getMatrix() {
        return this.matrix
    }
    /**
     * Generates an attack matrix based on the specified settings.
     *
     * @private
     * @returns {Array} An array representing the generated attack matrix.
     */
    buildMatrix() {
        const matrix = [];
        for (let i = 0; i < this.nSys; i++) {
            const row = [];
            row.push("#" + ((1 << 24) * Math.random() | 0).toString(16))
            for (let j = 0; j < this.nAtk; j++) {
                // Populates the matrix with true or false based on the attack probability
                row.push(Math.random() <= this.probability ? true : false);
            }
            matrix.push(row);
        }
        return matrix;
    }
}
