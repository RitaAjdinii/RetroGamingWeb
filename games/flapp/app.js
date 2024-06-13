const app = new PIXI.Application({ resizeTo: window });
document.body.appendChild(app.view);

// Bird properties
const bird = new PIXI.Graphics();
bird.beginFill(0xffd900);
bird.drawRect(-20, -20, 40, 40);
bird.endFill();
bird.x = app.renderer.width / 2;
bird.y = app.renderer.height / 2;
bird.vy = 0;
bird.gravity = 0.6;
bird.jump = -10;
app.stage.addChild(bird);

// Pipes container
const pipes = new PIXI.Container();
app.stage.addChild(pipes);

// Add text to the screen
const flapText = new PIXI.Text('Flap!', { fontSize: 36, fill: 0xffffff, align: 'center' });
flapText.anchor.set(0.5);
flapText.x = app.renderer.width / 2;
flapText.y = app.renderer.height / 2 - 100;
flapText.visible = false; 
app.stage.addChild(flapText);

// Score
let score = 0;
const scoreElement = document.getElementById('score');

// Game state
let isPlaying = false;
let pipeInterval = 60; // Frequency of pipe generation
let pipeCounter = 0; // Counter for pipe generation

// Start button event listener
document.getElementById('startButton').addEventListener('click', startGame);

// Replay button event listener
document.getElementById('replayButton').addEventListener('click', restartGame);

// Event listener for jump
window.addEventListener('keydown', (e) => {
    if (e.code === 'Space' && isPlaying) {
        bird.vy = bird.jump;
    }
});

// Game loop
app.ticker.add((delta) => {
    if (isPlaying) {
        // Apply gravity
        bird.vy += bird.gravity;
        bird.y += bird.vy;

        // Bird collision with ground and ceiling
        if (bird.y > app.renderer.height || bird.y < 0) {
            gameOver();
        }

        // Move pipes
        pipes.children.forEach(pipe => {
            pipe.x -= 5;

            // Check collision with pipes
            if (hitTestRectangle(bird, pipe)) {
                gameOver();
            }

            // Check if bird passed the pipe gap
            if (!pipe.passed && pipe.x + pipe.width < bird.x && pipe.isBottomPipe) {
                pipe.passed = true;
                score++;
                scoreElement.textContent = `Score: ${score}`;
            }

            // Remove off-screen pipes
            if (pipe.x < -50) {
                pipes.removeChild(pipe);
            }
        });

        // Add new pipes
        pipeCounter++;
        if (pipeCounter >= pipeInterval) {
            pipeCounter = 0;
            addPipes();
        }
    }
});

// Function to start the game
function startGame() {
    document.getElementById('startButton').style.display = 'none';
    flapText.visible = true; // Show the "Flap!" text
    setTimeout(() => {
        flapText.visible = false; // Hide the text after delay
        isPlaying = true;
    }, 2000); // 2 second delay before starting
}

// Function to restart the game
function restartGame() {
    // Reset game state
    score = 0;
    scoreElement.textContent = `Score: ${score}`;
    document.getElementById('finalScore').style.display = 'none';
    document.getElementById('replayButton').style.display = 'none';
    pipes.removeChildren();
    bird.x = app.renderer.width / 2;
    bird.y = app.renderer.height / 2;
    bird.vy = 0;

    // Show the "Flap!" text
    flapText.visible = true;
    setTimeout(() => {
        flapText.visible = false;
        isPlaying = true;
    }, 2000); // 2 second delay before starting
}

// Function to add pipes
function addPipes() {
    const minGap = 150;
    const maxGap = 250;
    const gap = Math.floor(Math.random() * (maxGap - minGap)) + minGap;

    const pipeWidth = 50;
    const maxPipeHeight = app.renderer.height - gap - 100;
    const minPipeHeight = 50;
    const pipeHeight = Math.floor(Math.random() * (maxPipeHeight - minPipeHeight)) + minPipeHeight;

    const topPipe = new PIXI.Graphics();
    topPipe.beginFill(0x33ff33);
    topPipe.drawRect(0, 0, pipeWidth, pipeHeight);
    topPipe.endFill();
    topPipe.x = app.renderer.width;
    topPipe.y = 0;
    pipes.addChild(topPipe);

    const bottomPipe = new PIXI.Graphics();
    bottomPipe.beginFill(0x33ff33);
    bottomPipe.drawRect(0, 0, pipeWidth, app.renderer.height - pipeHeight - gap);
    bottomPipe.endFill();
    bottomPipe.x = app.renderer.width;
    bottomPipe.y = pipeHeight + gap;
    bottomPipe.isBottomPipe = true;
    bottomPipe.passed = false;
    pipes.addChild(bottomPipe);
}

// Function to detect collision
function hitTestRectangle(r1, r2) {
    const r1Bounds = r1.getBounds();
    const r2Bounds = r2.getBounds();
    return r1Bounds.x + r1Bounds.width > r2Bounds.x &&
           r1Bounds.x < r2Bounds.x + r2Bounds.width &&
           r1Bounds.y + r1Bounds.height > r2Bounds.y &&
           r1Bounds.y < r2Bounds.y + r2Bounds.height;
}

// Function to handle game over
function gameOver() {
    isPlaying = false;
    bird.vy = 0;
    const finalScoreElement = document.getElementById('finalScore');
    finalScoreElement.textContent = `Your score: ${score}`;
    finalScoreElement.style.display = 'block';
    const replayButton = document.getElementById('replayButton');
    replayButton.style.display = 'block';
}