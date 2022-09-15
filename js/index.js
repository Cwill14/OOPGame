import { Player } from "./Classes/Player.js";
import { playerList } from "./database.js";

function addPlayer(p) {
    const player = new Player(p)
    playerList.push(player)
}

function punch(attacker, target) {
    document.getElementById("enemy-health").write(`${target.health - 5}`)
}
function kick(attacker, target) {

}
