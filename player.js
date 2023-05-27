const playerDOM = document.getElementById("player");
const scale = 40; // px
const playerScale = 20; // px
const borderSize = 8; // px

class Player {
    constructor(playerDOM, gameMap) {
        this.playerDOM = playerDOM;
        this.gameMap = gameMap;
        this.lastStartLocation = gameMap.startLocation;

        this.moveToStart();
    }

    moveToStart() {
        this.moveToGreenPoint(this.lastStartLocation['x'], this.lastStartLocation['y']);
    }

    moveBy(dx, dy) {
        this.x += dx;
        this.y += dy;
        // TODO moving the player location
        this.setPlayerLocation(this.x, this.y);
    }

    moveToGreenPoint(gridX, gridY) {
        this.setPlayerLocation(
            (gridX * scale) - (playerScale / 2) - (borderSize / 2),
            (gridY * scale) - (playerScale / 2) - (borderSize / 2)
        );
    }

    // Validate location to keep it in bounds
    validateLocation(x, y) {
        let xCoord = Math.ceil(x / scale) - 1;
        let yCoord = Math.ceil(y / scale) - 1;

        if (xCoord < 0) xCoord = 0;
        if (yCoord < 0) yCoord = 0;

        if (this.gameMap.positionGrid[xCoord][yCoord] != null) {
            const hasNextRight = (xCoord + 1 > MAX_GRID_WIDTH - 1) ? false : this.gameMap.positionGrid[yCoord][xCoord + 1] != null;

            let minX = ((xCoord) * scale) - (borderSize / 2);
            let minY = ((yCoord) * scale) - (borderSize / 2);
            let maxX = ((xCoord + 1) * scale) - playerScale - (borderSize / 2) + (hasNextRight ? scale : 0);
            let maxY = ((yCoord + 1) * scale) - playerScale - (borderSize / 2);
            // Constrain to lower bound
            x = (x < minX) ? minX : x;
            y = (y < minY) ? minY : y;
            // Constrain to upper bound
            x = (x > maxX) ? maxX : x;
            y = (y > maxY) ? maxY : y;
        }

        return [x, y];
    }

    setPlayerLocation(x, y) {
        const validatedCoord = this.validateLocation(x, y);
        this.x = validatedCoord[0];
        this.y = validatedCoord[1];

        this.playerDOM.style.left = this.x + "px";
        this.playerDOM.style.top = this.y + "px";
    }
}

const player = new Player(playerDOM, gameMap1);

// Player Position Listeners
const ARROW_RIGHT = "ArrowRight";
const ARROW_LEFT = "ArrowLeft";
const ARROW_UP = "ArrowUp";
const ARROW_DOWN = "ArrowDown";


// Amount of times to update player in ms
const frameRate = 1000 / 60;

// Number of pixels to move player each frame in px
const playerMoveAmount = frameRate / 10;

let keysPressed = {
    ARROW_RIGHT: false,
    ARROW_LEFT: false,
    ARROW_UP: false,
    ARROW_DOWN: false,
};

document.body.addEventListener("keydown", function (e) {
    keysPressed[e.key] = true;
});

document.body.addEventListener("keyup", function (e) {
    keysPressed[e.key] = false;
});

function updatePlayer() {
    let dx = 0;
    let dy = 0;

    if (keysPressed[ARROW_RIGHT]) {
        dx += playerMoveAmount;
    }
    if (keysPressed[ARROW_LEFT]) {
        dx -= playerMoveAmount;
    }
    if (keysPressed[ARROW_UP]) {
        dy -= playerMoveAmount;
    }
    if (keysPressed[ARROW_DOWN]) {
        dy += playerMoveAmount;
    }

    player.moveBy(dx, dy);
}

setInterval(updatePlayer, frameRate);

// player.setPlayerLocation(scale * 2 - playerScale - (borderSize / 2), -borderSize / 2);
player.setPlayerLocation(scale * 2, scale);