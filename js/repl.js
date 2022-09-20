const prompt = require('prompt-sync')();

checkStatus = function(player,target, action) {
	if (player.status === "dead") return `${player.name} is dead and can't use actions!`
	else if (target.status === "dead") return `${target.name} is dead and can't be targeted!`
	else if (player.energy < action.energyCost) return `${player.name} doesn't have enought energy to ${action.name}`
	else return true
}

class Player {
	constructor(name = "Player") {
		this.name = name;
		this.type = null;
		this.level = 1;
		this.health = 100;
		this.maxHealth = 100;
		this.energy = 100;
		this.maxEnergy = 100;
		this.armor = 0;
		this.weapon = null;
		this.status = "active";
		this.playerModifier = 1;
		this.targetModifier = 1;
	}
	evalModifiers = function(player, target) {
	switch(player.status) {
		case "dazed":
			this.playerModifier = 0.5;
			break;
		case "inspired":
			this.playerModifier = 1.5;
			break;
		default:
			this.playerModifier = 1;
			break;
	}
	switch(target.status) {
		case "dazed":
			this.targetModifier = 1.5;
			break;
		case "inspired":
			this.targetModifier = 0.5;
			break;
		default:
			this.targetModifier = 1;
			break;
	}
}
	
	attack = function(target, atk) {
		if (checkStatus(this, target, atk) !== true) return checkStatus(this, target, atk);
		this.evalModifiers(this, target);
		// evalModifiers(target.status, target.name);
		// console.log("DAMAGE STATS -----------------")
		// console.log("this.playerModifier = ", this.playerModifier)
		// console.log("this.targetModifier = ", this.targetModifier)
		// console.log("atk.dmg = ", atk.dmg)
		// console.log("this.level = ", this.level)
		// console.log("target.armor = ", target.armor)
		// console.log("atk.penetration = ", atk.penetration)
		let damage = (((this.playerModifier * this.targetModifier) * atk.dmg) + this.level) - (target.armor - atk.penetration);
		// console.log("(((this.playerModifier * this.targetModifier) * atk.dmg) + this.level) - (target.armor - atk.penetration)")
		// console.log(`(((${this.playerModifier} * ${this.targetModifier}) * ${atk.dmg}) + ${this.level}) - (${target.armor} - ${atk.penetration})`)
		// console.log("damage subtotal = ", damage)
		if (damage < 0) damage = 0;
		// console.log("final damage = ", damage)
		// console.log("----------------------")
		const remainingHealth = target.health - damage;
		if (remainingHealth <= 0) {
			target.health = 0;
			target.status = "dead";
			this.level++;
			return `${this.name} hits ${target.name} with ${atk.name} for ${damage} damage`,
	 			`${target.name} has been defeated by ${this.name}`
		} else {
			target.health = remainingHealth;
			this.energy = this.energy - atk.energyCost;
			this.status = "active"
			if(atk.statusEffect) {
				target.status = atk.statusEffect
				return `${this.name} hits ${target.name} with ${atk.name} for ${damage} damage. ${target.name} is ${atk.statusEffect}`
			} else {
				target.status = "active"
			}
			return `${this.name} hits ${target.name} with ${atk.name} for ${damage} damage`
		}
	}
	heal = function(target, info) {
		if (checkStatus(this, target, info) !== true) return checkStatus(this, target, info);
		this.evalModifiers(this, target);
		let effect = "";
		// if(info.statusEffect) {
		// 	target.status = info.statusEffect
		// 	effect = `${target.name} is ${info.statusEffect}`;
		// }
		if ((target.health + (info.amount * (this.playerModifier * this.targetModifier))) > target.maxHealth) {
			let prevHealth = target.health;
			target.health = target.maxHealth;
			if(info.statusEffect) {
				target.status = info.statusEffect
				effect = `${target.name} is ${info.statusEffect}`;
			}
			return `${this.name} healed ${target.name} with ${info.name} for ${target.maxHealth - prevHealth} hp. ${effect}`
		} else {
			target.health = target.health + info.amount;
			if(info.statusEffect) {
				target.status = info.statusEffect
				effect = `${target.name} is ${info.statusEffect}`;
			}
			return `${this.name} healed ${target.name} with ${info.name} for ${info.amount} hp. ${effect}`
		}
	}
	getInfo = () => this
}

class Warrior extends Player {
	constructor(name) {
		super(name);
		super.type = "warrior";
		super.weapon = "sword";
		super.armor = 20;
		super.health = 200;
		super.maxHealth = 200;
	}
	slash = function(target) {
		return this.attack(target, {
			"name": "slash",
			"dmg": 40,
			"penetration": 5,
			"energyCost": 20
		})
	}
	bash = function(target) {
		return this.attack(target, {
			"name": "bash",
			"dmg": 10,
			"penetration": 0,
			"energyCost": 20,
			"statusEffect": "dazed"
		})
	}
}

class Mage extends Player {
	constructor(name) {
		super(name);
		super.type = "mage";
		super.weapon = "staff";
		super.armor = 5;
		super.energy = 200;
		super.maxEnergy = 200;
	}
	fireball = function(target) {
		return this.attack(target, {
			"name": "fireball",
			"dmg": 50,
			"penetration": 15,
			"energyCost": 30
		})
	}
	bless = function(target) {
		return this.heal(target, {
			"name": "bless",
			"amount": 50,
			"energyCost": 35,
			"statusEffect": "inspired"
		})
	}
}

class Dummy extends Player {
	constructor(name, health = 100, maxHealth = 100, armor = 0) {
		super(name);
		super.type = "dummy";
		super.health = health;
		super.maxHealth = maxHealth;
		super.armor = armor;
	}
}

// const warriorDude = new Warrior("warriorDude")
// const mageBro = new Mage("mageBro")
// const testDummy = new Dummy("testDummy")
// const testDummy2 = new Dummy("testDummy2", 222)
// testDummy2.health = 1000;
// console.log(testDummy2.getInfo())
// console.log("---------------------------")
// console.log(warriorDude.slash(mageBro))
// console.log(mageBro.getInfo())
// console.log(warriorDude.getInfo())
// console.log("---------------------------")
const validClasses = ['Warrior', 'Mage']
let playerList = []
let playerCount = 0

const validateClass = type => {
	type = type.charAt(0).toUpperCase() + type.slice(1).toLowerCase()
	if(validClasses.includes(type)) {
		console.log(`You selected ${type}`)
		// playerCount++
		return type		
	} else {
		console.log(`${type} is an invalid class type, please try again!`)
		type = prompt('Which class are you, Warrior or Mage? ');
		return validateClass(type)
	}
}
// classType = validateClass(classType)
// console.log("type after")
const createPlayerObject = (name, classType) => {
	let p = null;
	switch(classType) {
		case 'Warrior':
			p = new Warrior(name)
			break
		case 'Mage':
			p = new Mage(name)
			break
		default:
			p = new Dummy(name)
			break
	}
	playerCount++
	return p
}

const createNewPlayer = () => {
	const name = prompt(`Player ${playerCount}, what is your name? `);
	console.log(`Hey there ${name}!`);
	let classType = prompt('Which class are you, Warrior or Mage? ');
	classType = validateClass(classType)
	return createPlayerObject(name, classType)
}

// let i;
// console.log(this['player'+playerCount] = "test")
// let `player${playerCount}` = createNewPlayer()
// let playerList = []
// this['player'+playerCount] = "test"
for (let i = 0; i < 3; i++) {
	playerList.push(this['player'+playerCount] = new Dummy(`test${playerCount}`))	
	playerCount++
}
console.log(playerList)
console.log(playerCount)

// 	BELOW JUST NEEDS DYNAMIC VARIABLE TO TEST
// const getPlayers = () => {
// 	let done = false
// 	while(done === false) {
// 		// let ans = prompt('Are you ready to start playing? Y or N')
// 		const getAns = () => {
// 			let `player${playerCount}` = createNewPlayer()
// 			let ans = prompt('Are you ready to start playing? Y or N')
// 			if(ans === 'Y') {
// 				done = true
// 				break
// 			} else {
// 				return getAns()
// 			}
			
// 		}
// 	}
	
// }
// const startGame = () => {
// 	const player1 = createNewPlayer()
// 	getPlayers()
// 	while(player1.health > 0 && player2.health > 0) {
// 		console.log(`${player1.name}, it is your turn`)
//		player2.health = 0
// 	}
// }

// startGame();