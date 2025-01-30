// DOM elements
const gameText = document.getElementById("game-text");
const choices = document.getElementById("choices");
const gameImage = document.getElementById("game-image");
const restartButton = document.getElementById("restart");

// Game state
let name = "";
let isFirstTime = true;

// Utility function to update the game
function updateGame(text, options, imageUrl = "") {
    gameText.textContent = text;
    choices.innerHTML = "";
    options.forEach((option) => {
        const button = document.createElement("button");
        button.textContent = option.text;
        button.addEventListener("click", option.action);
        choices.appendChild(button);
    });

    // Update image
    if (imageUrl) {
        gameImage.src = imageUrl;
        gameImage.classList.remove("hidden");
    } else {
        gameImage.classList.add("hidden");
    }
}

// Start the game
function startGame() {
    if (isFirstTime) {
        name = prompt("What is your name?");
        isFirstTime = false;
    }
    updateGame(
        `Hello, ${name}. Great! Let the adventure begin...`,
        [
            { text: "Go Left", action: goLeft },
            { text: "Go Right", action: goRight },
        ],
        "images/LeftorRight.jpg"
    );
    restartButton.classList.add("hidden");
}

// Left path
function goLeft() {
    updateGame(
        "You go left and see a bridge. Do you want to cross it?",
        [
            { text: "Cross", action: crossBridge },
            { text: "Don't Cross", action: findCave },
        ],
        "images/Bridge.jpg"
    );
}

// Right path
function goRight() {
    updateGame(
        "You go right and find a steep cliff. Do you want to climb down?",
        [
            { text: "Climb Down", action: climbCliff },
            { text: "Don't Climb", action: loseGame },
        ],
        "images/Cliff.jpg"
    );
}

// Cross bridge path
function crossBridge() {
    updateGame(
        "You cross the bridge and it creaks under your weight. Do you want to inspect the bridge for safety first?",
        [
            { text: "Inspect", action: inspectBridge },
            { text: "Don't Inspect", action: bridgeCollapses },
        ],
        "images/Creaky-Bridge.jpg"
    );
}

// Inspect bridge
function inspectBridge() {
    updateGame(
        "Good choice! You find a loose plank and fix it. The bridge holds, and you safely cross. You find a treasure chest on the other side! Do you want to open it?",
        [
            { text: "Open Chest", action: openChest },
            { text: "Don't Open", action: surviveWithoutTreasure },
        ],
        "images/Chest.jpg"
    );
}

// Bridge collapses
function bridgeCollapses() {
    updateGame(
        "You cross the bridge without inspecting it, and it collapses! You fall into the river and lose.",
        [{ text: "Restart", action: restartGame }],
        "images/BridgeBreak.jpg"
    );
}

// Open chest
function openChest() {
    updateGame(
        "The chest contains gold and jewels! You win!",
        [{ text: "Play Again", action: restartGame }],
        "images/Treasure.jpg"
    );
}

// Survive without treasure
function surviveWithoutTreasure() {
    updateGame(
        "You walk away from the chest, never knowing what was inside... You survive, but miss out on treasure.",
        [{ text: "Restart", action: restartGame }],
        "images/Survived.png"
    );
}

// Find cave path
function findCave() {
    updateGame(
        "You see a dark cave. Do you want to enter it?",
        [
            { text: "Enter", action: enterCave },
            { text: "Avoid", action: surviveForest },
        ],
        "images/Cave.jpg"
    );
}

// Enter cave
function enterCave() {
    updateGame(
        "You enter the cave and find a sleeping dragon! Do you want to sneak past it?",
        [
            { text: "Sneak", action: sneakPastDragon },
            { text: "Don't Sneak", action: dragonWakesUp },
        ],
        "images/Dragon.jpg"
    );
}

// Sneak past dragon
function sneakPastDragon() {
    updateGame(
        "You successfully sneak past the dragon and find an exit. You win!",
        [{ text: "Play Again", action: restartGame }],
        "images/CaveExit.jpg"
    );
}

// Dragon wakes up
function dragonWakesUp() {
    updateGame(
        "The dragon wakes up and sees you. You try to escape, but it breathes fire. You lose!",
        [{ text: "Restart", action: restartGame }],
        "images/DragonFire.jpg"
    );
}

// Climb cliff path
function climbCliff() {
    updateGame(
        "You carefully climb down the cliff and find a hidden path. Do you want to explore it?",
        [
            { text: "Explore", action: explorePath },
            { text: "Don't Explore", action: surviveForest },
        ],
        "images/Path.jpg"
    );
}

// Explore path
function explorePath() {
    updateGame(
        "The path leads you to a hidden village where you are welcomed as a hero. You win!",
        [{ text: "Play Again", action: restartGame }],
        "images/Village.jpg"
    );
}

// Survive forest
function surviveForest() {
    updateGame(
        "You survive but miss out on the adventure. The game ends.",
        [{ text: "Restart", action: restartGame }],
        "images/Survived.png"
    );
}

// Lose game
function loseGame() {
    updateGame(
        "You trip and fall down the cliff anyways! Better luck next time.",
        [{ text: "Restart", action: restartGame }],
        "images/GameOver.jpg"
    );
}

// Restart the game
function restartGame() {
    isFirstTime = false;
    startGame();
}

// Attach event listeners
restartButton.addEventListener("click", startGame);

// Initialize game
startGame();
