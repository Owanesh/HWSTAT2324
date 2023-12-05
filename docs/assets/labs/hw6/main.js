document.addEventListener("DOMContentLoaded", function () {

    document.getElementById("start").addEventListener("click", function () {
        // Additional logic for handling canvas or other functionality after pressing the "Play" button
        var canvas = document.getElementById("myCanvas");
        canvas.style.display = "block";
        document.getElementById("canvasAlert").style.display = "block"
        document.getElementById("preload").style.display="none"
        start()
        // Add your canvas drawing or other logic here
    })

const app = new DynamicObjManager("myCanvas");
const initialRectSize = { width: 1200, height: 600 };
function start() {
    app.clear()
    app.flushObjects()
    const probInput = parseFloat(document.getElementById("probInput").value);
    const sysInput = parseInt(document.getElementById("sysInput").value);
    const nAttacks = parseInt(document.getElementById("nAttacks").value);
   

    // Aggiorna gli oggetti grafici con i nuovi valori
    const graphSettings = { probability: probInput, nSystems: sysInput, nAttacks: nAttacks, mode:"GRP" };

    const graphUISettings = {fill: "rgba(200, 200, 200, 0.5)", border: "black", borderWidth: 2 }

    const attackManager = new AttackMonitor(graphSettings)
    const attackMatrix = attackManager.getMatrix()

    var graph1 = new AnimatedGraph(app.canvas, { ...initialRectSize, x: 10, y: 10}, { ...graphUISettings, label: "Gambler's Ruin Problem" }, graphSettings)
    graph1.setAttackMatrix(attackMatrix)
    graph1.setDeadTreshold(parseInt(document.getElementById("deadLine").value))
    app.addObjects([graph1]);
}
});