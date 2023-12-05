    // Ottieni il canvas e il suo contesto
    const canvas = document.getElementById('gameCanvas');
    const ctx = canvas.getContext('2d');
    
    // Dimensione di ogni cella nella griglia
    const cellSize = 20;
    
    // Calcola il numero di righe e colonne nella griglia in base alle dimensioni del canvas
    const rows = canvas.height / cellSize;
    const cols = canvas.width / cellSize;

    // Inizializza una griglia vuota
    let grid = createEmptyGrid();

    // Flag per controllare lo stato del gioco e l'interazione con il mouse
    let isGameRunning = false;
    let isMousePressed = false;
    let isDarkMode = false;

    // Funzione per creare una griglia vuota
    function createEmptyGrid() {
      return Array.from({ length: rows }, () => Array(cols).fill(false));
    }

    // Funzione per disegnare la griglia sul canvas
    function drawGrid() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
          ctx.beginPath();
          ctx.rect(j * cellSize, i * cellSize, cellSize, cellSize);
          // Colore delle celle in base alla modalità (scura o chiara) e allo stato della cella
          ctx.fillStyle = isDarkMode ? (grid[i][j] ? '#fff' : '#333') : (grid[i][j] ? '#333' : '#fff');
          ctx.fill();
          ctx.stroke();
        }
      }
    }

    // Funzione per aggiornare la griglia in base alle regole del gioco
    function updateGrid() {
      const newGrid = createEmptyGrid();

      for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
          const neighbors = countNeighbors(i, j);

          if (grid[i][j]) {
            // Una cella viva sopravvive con 2 o 3 vicini vivi
            newGrid[i][j] = neighbors === 2 || neighbors === 3;
          } else {
            // Una cella morta viene ripopolata con esattamente 3 vicini vivi
            newGrid[i][j] = neighbors === 3;
          }
        }
      }

      grid = newGrid;
    }

    // Funzione per contare il numero di vicini vivi per una cella
    function countNeighbors(row, col) {
      let count = 0;

      for (let i = -1; i <= 1; i++) {
        for (let j = -1; j <= 1; j++) {
          const newRow = row + i;
          const newCol = col + j;

          // Verifica che la cella sia all'interno dei limiti della griglia
          if (newRow >= 0 && newRow < rows && newCol >= 0 && newCol < cols && !(i === 0 && j === 0)) {
            count += grid[newRow][newCol] ? 1 : 0;
          }
        }
      }

      return count;
    }

    // Funzione per cambiare lo stato di una cella
    function toggleCell(row, col) {
      grid[row][col] = !grid[row][col];
    }

    // Gestore dell'evento per il clic sul canvas
    function handleCanvasClick(event) {
      isMousePressed = true;
      handleMouseInteraction(event);
    }

    // Gestore dell'evento per il movimento del mouse sul canvas
    function handleCanvasMouseMove(event) {
      if (isMousePressed) {
        handleMouseInteraction(event);
      }
    }

    // Gestore dell'evento per l'interazione del mouse sul canvas
    function handleMouseInteraction(event) {
      const rect = canvas.getBoundingClientRect();
      const mouseX = event.clientX - rect.left;
      const mouseY = event.clientY - rect.top;

      // Calcola la riga e la colonna della cella cliccata
      const clickedRow = Math.floor(mouseY / cellSize);
      const clickedCol = Math.floor(mouseX / cellSize);

      // Cambia lo stato della cella e ridisegna la griglia
      toggleCell(clickedRow, clickedCol);
      drawGrid();
    }

    // Gestore dell'evento per il rilascio del pulsante del mouse sul canvas
    function handleCanvasMouseUp() {
      isMousePressed = false;
    }

    // Avvia il gioco
    function startGame() {
      isGameRunning = true;
      runGame();
    }

    // Esegui il gioco in modo ricorsivo con un ritardo di 500 millisecondi
    function runGame() {
      setTimeout(() => {
        updateGrid();
        drawGrid();

        if (isGameRunning) {
          runGame();
        }
      }, 500);
    }

    // Esegui un singolo passo del gioco
    function step() {
      if (!isGameRunning) {
        updateGrid();
        drawGrid();
      }
    }

    // Pulisci la griglia e interrompi il gioco
    function clearGrid() {
      isGameRunning = false;
      grid = createEmptyGrid();
      drawGrid();
    }

    // Genera una configurazione casuale sulla griglia
    function generateRandom() {
      if (!isGameRunning) {
        grid = Array.from({ length: rows }, () => Array(cols).fill().map(() => Math.random() > 0.7));
        drawGrid();
      }
    }

    // Cambia la modalità (scura o chiara) e aggiorna lo stile della pagina
    function toggleDarkMode() {
      isDarkMode = !isDarkMode;
      // Aggiorna il testo del pulsante dark mode in base alla modalità attuale
      if (isDarkMode) {
        document.getElementById("darkmode").innerHTML = "🌞 Modalità chiara";
      } else {
        document.getElementById("darkmode").innerHTML = "🌙 Modalità Scura";
      }
      // Aggiorna lo sfondo del corpo e il colore del titolo in base alla modalità
      document.body.style.backgroundColor = isDarkMode ? '#111' : '#fff';
      document.getElementsByTagName("h1")[0].style.color = !isDarkMode ? '#111' : '#fff';
      drawGrid();
    }

    // Aggiungi gli eventi del mouse al canvas
    canvas.addEventListener('mousedown', handleCanvasClick);
    canvas.addEventListener('mousemove', handleCanvasMouseMove);
    canvas.addEventListener('mouseup', handleCanvasMouseUp);