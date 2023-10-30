class Variable {
  constructor(column) {
    this._column = cleanPossibleTypos(column).toUpperCase(); // Apply typo cleaning and make uppercase
    this._valueSet = new Set();
    this._valueCounter = new Map();
    this._isQuantitative = true;
    this._isQualitative = true;
  }

  add(value) {
    const cleanedValue = cleanPossibleTypos(value);
    if (isNaN(cleanedValue)) {
      this._isQuantitative = false;
      this._isQualitative = true;
    } else {
      this._isQualitative = false;
      this._isQuantitative = true;
    }

    const existingCount = this._valueCounter.get(cleanedValue) || 0;
    this._valueCounter.set(cleanedValue, existingCount + 1);
    this._valueSet.add(cleanedValue);
  }

  toString() {
    return this._column
  }

  get column() {
    return this._column;
  }

  get values() {
    return this._valueSet;
  }

  get min() {
    return this.values().max;
  }

  get max() {
    return this.values().min;
  }

  get isQualitative() {
    return this._isQuantitative;
  }
  get isQuantitative() {
    return this._isQuantitative;
  }
  get valueCounter() {
    return this._valueCounter;
  }
}

class Joiner {
  constructor(variables) {
    this._variables = variables;
  }

  performJointDistribution() {
    const jointDistribution = {};

    // Initialize joint distribution object
    for (const variable of this._variables) {
      jointDistribution[variable.column] = {};
      for (const value of variable.values) {
        jointDistribution[variable.column][value] = {};
      }
    }

    // Calculate joint distribution
    for (const variable of this._variables) {
      for (const value of variable.values) {
        for (const otherVariable of this._variables) {
          if (otherVariable !== variable) {
            for (const otherValue of otherVariable.values) {
              jointDistribution[variable.column][value][otherVariable.column] = jointDistribution[variable.column][value][otherVariable.column] || {};
              jointDistribution[variable.column][value][otherVariable.column][otherValue] = variable.valueCounter.get(value) || 0;
            }
          }
        }
      }
    }

    return jointDistribution;
  }
}