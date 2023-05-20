const SCALE = 40; // px
const BORDER_SIZE = 5; // px

function generateTiles(map) {
    if (!(map instanceof GameMap)) throw "Invalid map";

    const canvas = document.getElementById("canvas");
    const gameContent = document.getElementById("game-content");
    const gameContentOutline = document.getElementById("game-content-outline");
    // for (let index = 0; index < 50; index++) {
    //     const tileDiv = document.createElement("div");
    //     tileDiv.className = "game-tile " + (index % 2 ? "purple" : "white");

    //     canvas.appendChild(tileDiv);
    // }

    const titleBar = document.getElementById("title-bar");
    topPadding = titleBar.offsetHeight;

    map.positions.forEach(tile => {
        // Create the tile
        const tileDiv = document.createElement("div");
        className = "game-tile ";

        // Color white or purple for floor
        if (tile.type == gameTileTypes.Floor)
            className += ((tile.x + tile.y) % 2 ? "purple" : "white");
        // Or green for start, checkpoint, and finish
        else if (tile.type == gameTileTypes.Start || gameTileTypes.Checkpoint || gameTileTypes.Finish)
            className += "green";

        tileDiv.className = className;

        tileDiv.style = "left: " + (tile.x * SCALE) + "px; top: " + ((tile.y * SCALE)) + "px;";


        // Create the border box
        const tileBorderDiv = document.createElement("div");
        tileBorderDiv.className = "border-box";
        tileBorderDiv.style = "left: " + (tile.x * SCALE) + "px; top: " + (tile.y * SCALE) + "px;";

        gameContent.appendChild(tileDiv);
        gameContentOutline.appendChild(tileBorderDiv);
    });

}

class GameMap {
    constructor(startPositions, floorPositions, checkpoints, finishPositions, width, height) {
        this.startPositions = startPositions;
        this.floorPositions = floorPositions;
        this.checkpoints = checkpoints;
        this.finishPositions = finishPositions;
        this.width = width;
        this.height = height;

        this.positions = [];
        this.startPositions.forEach(tile => {
            this.positions.push(tile);
        });
        this.floorPositions.forEach(tile => {
            this.positions.push(tile);
        });
        this.checkpoints.forEach(tile => {
            this.positions.push(tile);
        });
        this.finishPositions.forEach(tile => {
            this.positions.push(tile);
        });

        {
            let x = 0;
            let y = 0;
            let xCount = 0.0;
            let yCount = 0.0;

            this.startPositions.forEach(tile => {
                x = (tile.x > x) ? tile.x : x;
                y = (tile.y > y) ? tile.y : y;
            });

            console.log(x, y);

            // Adjust for 0 index
            x++;
            y++;

            x /= 2.0;
            y /= 2.0;

            this.startLocation = { 'x': x, 'y': y };
        }

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

const gameMap1 = new GameMap(
    [
        new GameTile(0, 0, gameTileTypes.Start),
        new GameTile(0, 1, gameTileTypes.Start),
    ],
    [
        new GameTile(1, 0, gameTileTypes.Floor),
        new GameTile(1, 1, gameTileTypes.Floor),
        new GameTile(1, 2, gameTileTypes.Floor),
        new GameTile(0, 2, gameTileTypes.Floor),
        new GameTile(2, 2, gameTileTypes.Floor),
        new GameTile(3, 3, gameTileTypes.Floor),
        new GameTile(4, 3, gameTileTypes.Floor),
        new GameTile(4, 4, gameTileTypes.Floor),
    ],
    [
        new GameTile(2, 3, gameTileTypes.Checkpoint),
    ],
    [
        new GameTile(5, 3, gameTileTypes.Finish),
        new GameTile(5, 4, gameTileTypes.Finish),
    ],
    10, 10);

generateTiles(gameMap1);