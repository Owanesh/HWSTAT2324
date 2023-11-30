document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("start").addEventListener("click", function () {
        // Additional logic for handling canvas or other functionality after pressing the "Play" button
        var canvas = document.getElementById("myCanvas");
        canvas.style.display = "block";
        document.getElementById("canvasAlert").style.display = "block"
        start()
        // Add your canvas drawing or other logic here
    })
    // Get references to the select box and the div to display values
    const sdeSelection = document.getElementById('sdeSelection');
    var displayValues = document.getElementById('displayValues');

    // Event listener for the select box
    sdeSelection.addEventListener('change', function () {
        // Get the selected value
        var selectedValue = sdeSelection.value;

        // Hide all option-specific divs
        document.getElementById('mukInput').style.display = 'none';
        document.getElementById('sigmaInput').style.display = 'none';
        document.getElementById('theta').style.display = 'none';
        document.getElementById('riskFreeRate').style.display = 'none';
        document.getElementById('dt').style.display = 'none';

        // Show the relevant div based on the selected value
        if (selectedValue === 'SDEgeoBRNMTN') {
            document.getElementById('mukInput').style.display = 'block';
            document.getElementById('sigmaInput').style.display = 'block';
         } else if (selectedValue === 'SDEblackSCHOLES') {
            document.getElementById('dt').style.display = 'block';
            document.getElementById('riskFreeRate').style.display = 'block';
        } else if (selectedValue === 'SDEhullWHITE') {
            document.getElementById('dt').style.display = 'block';
            document.getElementById('theta').style.display = 'block';
        }  

        // Show or hide the overall container based on whether an option is selected
        displayValues.style.display = selectedValue ? 'block' : 'none';
    });
    const app = new DynamicObjManager("myCanvas");
    const initialRectSize = { width: 1150, height: 600 };
    function start() {
        app.clear()
        app.flushObjects()
        const probInput = parseFloat(document.getElementById("probInput").value);
        const sysInput = parseInt(document.getElementById("sysInput").value);
        const nAttacks = parseInt(document.getElementById("nAttacks").value);


        // Aggiorna gli oggetti grafici con i nuovi valori
        const graphSettings = { probability: probInput, nSystems: sysInput, nAttacks: nAttacks, mode: sdeSelection.value };

        const graphUISettings = { fill: "rgba(200, 200, 200, 0.5)", border: "black", borderWidth: 2 }

        const attackManager = new AttackMonitor(graphSettings)
        const attackMatrix = attackManager.getMatrix()

        var graph1 = new AnimatedGraph(app.canvas, { ...initialRectSize, x: 10, y: 10 }, { ...graphUISettings, label: sdeSelection.selectedOptions[0].text }, graphSettings)
        if (sdeSelection.value.startsWith("SDE")) {
            const extras = {}
            extras["sigma"]=parseFloat(document.getElementById("sigInput").value)
            extras["mu"]=parseFloat(document.getElementById("muInput").value)
            extras["theta"]=parseFloat(document.getElementById("thetaInput").value)
            extras["dt"]=parseFloat(document.getElementById("dtInput").value)
            extras["riskFreeRate"]=parseFloat(document.getElementById("riskFreeRateInput").value)
            graph1.setExtraParams(extras)
        }
        graph1.setAttackMatrix(attackMatrix)

        app.addObjects([graph1]);
    }
})