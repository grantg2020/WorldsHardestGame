const player = document.getElementById("player");
const scale = 40; // px
function setPlayerLocation(x, y) {
    player.style.left = x;
    player.style.top = y;
}