class Variable {
  constructor(column) {
    this._column = cleanPossibleTypos(column).toUpperCase(); // Apply typo cleaning and make uppercase
    this._valueSet = new Set();
    this._isQuantitative = true;
    this._isQualitative = true;
    this._intervals = 0
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

    this._valueSet.add(cleanedValue);
  }

  toString() {
    return this._column
  }

  set intervals(value) {
    if (typeof value !== 'number' || value < 1) {
      throw new Error("Intervals must be a positive integer");
    }
    this._intervals = value;
  }

  get intervals() {
    if (!this._isQuantitative) {
      throw new Error("Cannot get intervals of non-quantitative variable");
    }
 
    const sortedValues = Array.from(this._valueSet).sort((a, b) => a - b);
    const intervalSize = Math.ceil(sortedValues.length / this._intervals);
 
    let intervals = [];
    for (let i = 0; i < this._intervals; i++) {
      const start = i * intervalSize;
      const end = start + intervalSize;
      intervals.push(new Set(sortedValues.slice(start, end)));
    }
 
    return intervals;
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

function getValueFromAMultipleSelect(select) {
  var result = [];
  var options = select && select.options;
  var opt;

  for (var i = 0, iLen = options.length; i < iLen; i++) {
    opt = options[i];

    if (opt.selected) {
      result.push(opt.value || opt.text);
    }
  }
  return result;
}

function surveyToJSON(content) {
  const result = {}; // Initialize the result object
  const lines = content.split('\n');
  const headers = lines[0].split('\t');

  for (let i = 1; i < headers.length; i++) {
    const header = cleanPossibleTypos(headers[i]).toUpperCase();
    result[header] = []; // Initialize an empty array for each header
  }

  for (let i = 1; i < lines.length; i++) {
    const values = lines[i].split('\t');
    for (let j = 1; j < values.length; j++) {
      const header = cleanPossibleTypos(headers[j]).toUpperCase();
      const value = values[j].toUpperCase().trim();

      if (value.includes(',')) {
        value.split(',').forEach(val => {
          result[header].push(val);
        });
      } else {
        result[header].push(value);
      }
    }
  }
  return result;
}