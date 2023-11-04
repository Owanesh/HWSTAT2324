/** Typo Correction FUNCTIONs  */
function uniformComputerEngineeringField(str) {
    str = str.replace(/\bCOMPUTER SCIENCE AND ENGINEERING\b/g, "INFORMATION TECHNOLGY ENGINEERING(*)")
    str = str.replace(/\bCOMPUTER ENGINEERING\b/g, "INFORMATION TECHNOLGY ENGINEERING(*)")
    str = str.replace(/\bCOMPUTER AND SYSTEM ENGINEERING\b/g, "INFORMATION TECHNOLGY ENGINEERING(*)")
    str = str.replace(/\bENGINEERING IN COMPUTER SCIENCE\b/g, "INFORMATION TECHNOLGY ENGINEERING(*)")
    str = str.replace(/\bSOFTWARE AND INFORMATION ENGINEERING\b/g, "INFORMATION TECHNOLGY ENGINEERING(*)")
    str = str.replace(/\bCOMPUTER SCIENCE ENGINEERING\b/g, "INFORMATION TECHNOLGY ENGINEERING(*)")
    return str
}
function cleanPossibleTypos(str) {
    str = str.replace(/\bSCIWENCE\b/g, "SCIENCE")
    str = str.replace(/\bCOMPURER\b/g, "COMPUTER")
    str = str.replace(/\bCONPUTER\b/g, "COMPUTER")
    str = str.replace(/\bJAVASCRITP\b/g, "JAVASCRIPT")
    str = str.replace(/\bTYPOSCRIPT\b/g, "TYPESCRIPT")
    str = str.replace(/\bPYHON\b/g, "PYTHON")
    str = str.replace(/\bJAVESCRIPT\b/g, "JAVASCRIPT")
    str = str.replace(/\bPOSTREGSQL\b/g, "POSTGRESQL")
    str = str.replace(/\bCYBER SECURITY\b/g, "CYBERSECURITY")
    str = str.replace(/\bHOURDS\b/g, "HOURS")
    str = str.replace(/\bH PER DAY\b/g, "HOURS")
    str = str.replace(/\bHRS\/DAY\b/g, "HOURS")
    str = str.replace("ASSEMBLY", "ASSEMBLY (*)")
    str = str.replace("X86 ASSEMBLY", "ASSEMBLY (*)")
    str = str.replace("...", "")
    str = str.replace(/\bC°\b/g, "C#")
    return uniformComputerEngineeringField(str)
}

/** File Management FUNCTIONs  */

function parseTSV(tsvContent) {
    const rows = tsvContent.split('\n');
    const headers = rows[0].split('\t').map(header => header.trim().toUpperCase());
    const data = [];

    for (let i = 1; i < rows.length; i++) {
        const values = rows[i].split('\t');
        const rowData = {};
        for (let j = 0; j < headers.length; j++) {
            rowData[headers[j]] = values[j] ? cleanPossibleTypos(values[j].trim().toUpperCase()) : '';
        }
        data.push(rowData);
    }
    return [headers, data];
}


/** UI/UX FUNCTIONs  */


function renderColumnCheckboxes(headers) {
    columnCheckboxes.innerHTML = '';
    headers.forEach((header, index) => {
        const label = document.createElement("label");
        label.innerText = header;
        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.name = "columns";
        checkbox.value = header;
        label.appendChild(checkbox);
        columnCheckboxes.appendChild(label);
    });
}

function getSelectedColumns() {
    const checkboxes = document.querySelectorAll('input[name="columns"]:checked');
    const selectedColumns = Array.from(checkboxes).map(checkbox => checkbox.value);
    return selectedColumns;
}

/** MATH FUNCTION  */
function calculateFrequencies(dataset, value){
    const sum = Object.values(dataset).reduce((accumulator, currentValue) => accumulator + currentValue, 0);
    results = {}
    results["abs"] = value
    results["rel"] = (value / sum).toFixed(2);
    results["per"] = results["rel"]*100
    return results

  }