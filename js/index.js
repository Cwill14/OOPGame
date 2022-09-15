import { Player } from "./Classes/Player.js";
import { playerList } from "./database.js";

function addPlayer(p) {
    const player = new Player(p)
    playerList.push(player)
    localStorage.setItem("list", playerList)
}
const createCharBtn = document.querySelector(".create-char-btn");
createCharBtn.addEventListener("click", addPlayer())
// function addPlayer(p) {
//     const player = new Player(p)
//     playerList.push(player)
//     localStorage.setItem("list", playerList)
// }
// 
function getPlayerList() {
    return playerList;
}