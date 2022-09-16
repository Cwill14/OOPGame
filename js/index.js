
import { Player } from "./Classes/Player.js";
import { Warrior } from "./Classes/Warrior.js";
import { Mage } from "./Classes/Mage.js";
import { playerList } from "./database.js";

checkStatus = function(player,target, action) {
	if (player.status === "dead") return `${player.name} is dead and can't use actions!`
	else if (target.status === "dead") return `${target.name} is dead and can't be targeted!`
	else if (player.energy < action.energyCost) return `${player.name} doesn't have enought energy to ${action.name}`
	else return true
}
// function addPlayer(p) {
//     const player = new Player(p)
//     playerList.push(player)
//     localStorage.setItem("list", playerList)
// }
// const createCharBtn = document.querySelector(".create-char-btn");
// createCharBtn.addEventListener("click", addPlayer())
// // function addPlayer(p) {
// //     const player = new Player(p)
// //     playerList.push(player)
// //     localStorage.setItem("list", playerList)
// // }
// // 
// function getPlayerList() {
//     return playerList;
// }