const SCALE = 40;

function generateTiles(map) {
    if (!(map instanceof GameMap)) throw "Invalid map";

    const canvas = document.getElementById("canvas");

    // for (let index = 0; index < 50; index++) {
    //     const tileDiv = document.createElement("div");
    //     tileDiv.className = "game-tile " + (index % 2 ? "purple" : "white");

    //     canvas.appendChild(tileDiv);
    // }

    const titleBar = document.getElementById("title-bar");
    topPadding = titleBar.offsetHeight;

    map.positions.forEach(tile => {
        const tileDiv = document.createElement("div");
        className = "game-tile " + ((tile.x + tile.y) % 2 ? "purple" : "white");
        tileDiv.className = className;

        tileDiv.style = "left: " + (tile.x * SCALE) + "px; top: " + (topPadding + (tile.y * SCALE)) + "px;";

        canvas.appendChild(tileDiv);
    });

}

class GameMap {
    constructor(positions, width, height) {
        this.positions = positions;
        this.width = width;
        this.height = height;
    }
}

class GameTile {
    constructor(x, y, type) {
        this.x = x;
        this.y = y;
        this.type = type;
    }
}

const gameTileTypes = {
    Start: "start",
    Finish: "finish",
    Checkpoint: "checkpoint",
    Floor: "floor"
}

const gameMap1 = new GameMap([
    new GameTile(0, 0, gameTileTypes.Floor),
    new GameTile(1, 0, gameTileTypes.Floor),
    new GameTile(1, 1, gameTileTypes.Floor),
    new GameTile(1, 2, gameTileTypes.Floor),
    new GameTile(0, 2, gameTileTypes.Floor),
    new GameTile(2, 2, gameTileTypes.Floor),
], 10, 10);

generateTiles(gameMap1);