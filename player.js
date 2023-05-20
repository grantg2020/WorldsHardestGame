const playerDOM = document.getElementById("player");
const scale = 40; // px
const playerScale = 20; // px
const borderSize = 8; // px

class Player {
    constructor(playerDOM, gameMap) {
        this.playerDOM = playerDOM;

        this.setPlayerLocation(gameMap.startLocation['x'], gameMap.startLocation['y']);
    }

    setPlayerLocation(x, y) {
        // Check for valid location
        console.log(x, y);
        this.playerDOM.style.left = (x * scale) - (playerScale / 2) - (borderSize / 2) + "px";
        this.playerDOM.style.top = (y * scale) - (playerScale / 2) - (borderSize / 2) + "px";
    }
}

const player = new Player(playerDOM, gameMap1);