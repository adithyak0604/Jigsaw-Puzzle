const canvas = document.getElementById("puzzleCanvas");
const ctx = canvas.getContext("2d");

const ROWS = 3;
const COLS = 3;
const SNAP = 15;

const img = new Image();
img.crossOrigin = "anonymous"; // REQUIRED for canvas
img.src = "https://picsum.photos/900/900?random=" + Date.now();
function loadNewImage() {
    stopTimer();
    document.getElementById("timer").textContent = "00:00";

    // Close overlays if open
    closeResult();

    // Clear canvas & pieces
    pieces = [];
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Load new random image
    img.crossOrigin = "anonymous";
    img.src = "https://picsum.photos/900/900?random=" + Date.now();
}

let pieces = [];
let selectedPiece = null;
let offsetX, offsetY;

img.onload = () => {
    initPuzzle();
    shufflePieces();
    startTimer();
    draw();
};

// ---------------- TIMER ----------------
let startTime = null;
let timerInterval = null;

function startTimer() {
    startTime = Date.now();
    timerInterval = setInterval(updateTimer, 1000);
}

function stopTimer() {
    clearInterval(timerInterval);
}

function updateTimer() {
    const elapsed = Math.floor((Date.now() - startTime) / 1000);
    const min = String(Math.floor(elapsed / 60)).padStart(2, "0");
    const sec = String(elapsed % 60).padStart(2, "0");
    document.getElementById("timer").textContent = `${min}:${sec}`;
}

function getSquareCrop(image) {
    const size = Math.min(image.width, image.height);
    return {
        sx: (image.width - size) / 2,
        sy: (image.height - size) / 2,
        size
    };
}

function initPuzzle() {
    // Clear any existing pieces
    pieces = [];
    
    // Use actual image dimensions for source coordinates
    const { sx, sy, size } = getSquareCrop(img);
    const imgW = size;
    const imgH = size;
    const srcPieceW = imgW / COLS;
    const srcPieceH = imgH / ROWS;
    
    // Canvas piece dimensions (for display)
    const pw = canvas.width / COLS;
    const ph = canvas.height / ROWS;

    for (let row = 0; row < ROWS; row++) {
        for (let col = 0; col < COLS; col++) {
            pieces.push({
                sx: sx + col * srcPieceW,      // Source X from actual image
                sy: sy + row * srcPieceH,      // Source Y from actual image
                sw: srcPieceW,            // Source width from actual image
                sh: srcPieceH,            // Source height from actual image
                x: col * pw,              // Display X on canvas
                y: row * ph,              // Display Y on canvas
                correctX: col * pw,       // Correct position X
                correctY: row * ph        // Correct position Y
            });
        }
    }
}

// ----------------------------

function shufflePieces() {
    // Calculate display piece dimensions for shuffling
    const pw = canvas.width / COLS;
    const ph = canvas.height / ROWS;
    
    pieces.forEach(p => {
        p.x = Math.random() * (canvas.width - pw);
        p.y = Math.random() * (canvas.height - ph);
    });
}

// ----------------------------

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Calculate display piece dimensions
    const pw = canvas.width / COLS;
    const ph = canvas.height / ROWS;

    pieces.forEach(p => {
        // Draw the piece from source image to canvas
        ctx.drawImage(
            img,
            p.sx, p.sy, p.sw, p.sh,  // Source: from actual image
            p.x, p.y, pw, ph          // Destination: on canvas with display size
        );
        ctx.strokeRect(p.x, p.y, pw, ph);
    });

    requestAnimationFrame(draw);
}

// ----------------------------
// Drag & Drop
// ----------------------------

canvas.addEventListener("mousedown", selectPiece);
canvas.addEventListener("mousemove", movePiece);
canvas.addEventListener("mouseup", dropPiece);

canvas.addEventListener("touchstart", selectPiece);
canvas.addEventListener("touchmove", movePiece);
canvas.addEventListener("touchend", dropPiece);

// ----------------------------

function selectPiece(e) {
    const { x, y } = getMouse(e);
    const pw = canvas.width / COLS;
    const ph = canvas.height / ROWS;

    for (let i = pieces.length - 1; i >= 0; i--) {
        const p = pieces[i];
        if (x > p.x && x < p.x + pw &&
            y > p.y && y < p.y + ph) {
            selectedPiece = p;
            offsetX = x - p.x;
            offsetY = y - p.y;
            break;
        }
    }
}

// ----------------------------

function movePiece(e) {
    if (!selectedPiece) return;
    const { x, y } = getMouse(e);

    selectedPiece.x = x - offsetX;
    selectedPiece.y = y - offsetY;
}

// ----------------------------

function dropPiece() {
    if (!selectedPiece) return;

    const dx = selectedPiece.x - selectedPiece.correctX;
    const dy = selectedPiece.y - selectedPiece.correctY;

    if (Math.hypot(dx, dy) < SNAP) {
        selectedPiece.x = selectedPiece.correctX;
        selectedPiece.y = selectedPiece.correctY;
    }

    selectedPiece = null;
    checkWin();
}

// ----------------------------

function checkWin() {
    for (let p of pieces) {
        if (p.x !== p.correctX || p.y !== p.correctY) return;
    }

    stopTimer();
    playWinSound();

    document.getElementById("resultOverlay").classList.add("show");
    document.getElementById("successOverlay").classList.add("show");
    document.getElementById("failureOverlay").classList.remove("show");
}


// ----------------------------

function checkPuzzleComplete() {
    let allCorrect = true;
    for (let p of pieces) {
        // Check if piece is close enough to correct position (within snap distance)
        const dx = p.x - p.correctX;
        const dy = p.y - p.correctY;
        if (Math.hypot(dx, dy) >= SNAP) {
            allCorrect = false;
            break;
        }
    }
    
    if (allCorrect) {
        // Show success overlay
        document.getElementById("resultOverlay").classList.add("show");
        document.getElementById("successOverlay").classList.add("show");
        document.getElementById("failureOverlay").classList.remove("show");
    } else {
        // Show failure overlay
        document.getElementById("resultOverlay").classList.add("show");
        document.getElementById("failureOverlay").classList.add("show");
        document.getElementById("successOverlay").classList.remove("show");
    }
}

// ----------------------------

function closeResult() {
    document.getElementById("resultOverlay").classList.remove("show");
    document.getElementById("successOverlay").classList.remove("show");
    document.getElementById("failureOverlay").classList.remove("show");
}

// ----------------------------

// Add event listener for Finish button
document.addEventListener("DOMContentLoaded", () => {
    const finishButton = document.getElementById("finishButton");
    if (finishButton) {
        finishButton.addEventListener("click", checkPuzzleComplete);
    }
    const refreshButton = document.getElementById("refreshButton");
    if (refreshButton) {
        refreshButton.addEventListener("click", loadNewImage);
    }
});


// ----------------------------

function getMouse(e) {
    if (e.touches) e = e.touches[0];
    const rect = canvas.getBoundingClientRect();
    return {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
    };
}
