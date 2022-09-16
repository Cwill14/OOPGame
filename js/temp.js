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
	}
	changeStatus = function(target, status) {
		target.status = status
		return `${target.name} is ${target.status}`
	}
	// checkStatus = function(target, action) {
	// 	if (this.status === "dead") {
	// 		return `${this.name} is dead. Too bad!`
	// 	}
	// 	// console.log("action in checkStatus = ", action)
	// 	if (target.energy < action.energyCost) {
	// 		return `${target.name} does not have enough energy to ${action.name}`
	// 	}
	// 	if (target.status === "dead") {
	// 		return `${target.name} is already dead, jerk!`
	// 	}
	// }
	checkStatus = () => this.status
	
	attack = function(target, atk) {
		// this.checkStatus(this, atk)
		let attackerModifier = 1;
		let targetModifier = 1;
		// eval status modifiers
		const evalStatus = (state, player) => {
			if (player == this.name) {
				switch(state) {
					case "dazed":
						attackerModifier = 0.5;
						break;
					case "inspired":
						attackerModifier = 1.5;
						break;
					default:
						attackerModifier = 1;
						break;
				}
			} else if (player == target.name) {
				switch(state) {
					case "dazed":
						targetModifier = 1.5;
						break;
					case "inspired":
						targetModifier = 0.5;
						break;
					default:
						targetModifier = 1;
						break;
				}
			} else {
				console.log("error in evalStatus")
			}
		}
		evalStatus(this.status, this.name);
		evalStatus(target.status, target.name);
		const damage = (((attackerModifier * targetModifier) * atk.dmg) + this.level) - (target.armor - atk.penetration);
		const remainingHealth = target.health - damage;
		if (remainingHealth <= 0) {
			target.health = 0;
			this.changeStatus(target, "dead");
			this.level++;
			return `${this.name} hits ${target.name} with ${atk.name} for ${damage} damage`,
	 			`${target.name} has been defeated by ${this.name}`
		} else {
			target.health = remainingHealth;
			this.energy = this.energy - atk.energyCost;
			this.changeStatus(this, "active")
			if(atk.statusEffect) {
				this.changeStatus(target, atk.statusEffect)
			} else {
				this.changeStatus(target, "active");
			}
			return `${this.name} hits ${target.name} with ${atk.name} for ${damage} damage`
		}
	}
	heal = function(target, info) {
		// this.checkStatus(this, info)
		// console.log("info in heal", info)
		if (target.health + info.amount > target.maxHealth) {
			let prevHealth = target.health;
			target.health = target.maxHealth;
			return `${this.name} healed ${target.name} for ${target.maxHealth - prevHealth}`
		} else {
			target.health = target.health + info.amount;
			return `${this.name} healed ${target.name} for ${info.amount}`
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
	// bash makes enemy status dazed, small dmg
	bash = function(target) {
		return this.attack(target, {
			"name": "bash",
			"dmg": 10,
			"penetration": 0,
			"energyCost": 20,
			"statusEffect": "dazed"
		})
		// this.changeStatus(target, "dazed")
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
	// heal & inspire
	bless = function(target) {
		this.changeStatus(target, "inspired")
		return this.heal(target, {
			"name": "bless",
			"amount": 50,
			"energyCost": 35
		})
	}
	
}

const warriorDude = new Warrior("warriorDude")
const mageBro = new Mage("mageBro")
console.log(warriorDude.slash(mageBro))
console.log(mageBro.fireball(warriorDude))
console.log(mageBro.checkStatus())
console.log(warriorDude.bash(mageBro))
console.log(mageBro.checkStatus())
console.log(warriorDude.slash(mageBro))
console.log(mageBro.checkStatus())
console.log(mageBro.fireball(warriorDude))
console.log(mageBro.bless(mageBro))
console.log(warriorDude.slash(mageBro))
console.log(mageBro.fireball(warriorDude))
console.log(warriorDude.slash(mageBro))
console.log(mageBro.getInfo())
console.log(mageBro.checkStatus())
console.log(warriorDude.checkStatus())
console.log(warriorDude.getInfo())
