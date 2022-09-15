class Player {
	constructor(name = "Player") {
		this.name = name;
		this.type = null;
		this.level = 1;
		this.health = 100;
		this.maxHealth = 100;
		this.energy = 100;
		this.maxeEnergy = 100;
		this.armor = 0;
		this.weapon = null;
		this.status = "active";
	}
	attack = function(target, atk) {
		const damage = (atk.dmg + this.level) - (target.armor - atk.penetration);
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
			return `${this.name} hits ${target.name} with ${atk.name} for ${damage} damage`
		}
	}
	getState = () => this
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
}

class Mage extends Player {
	constructor(name) {
		super(name);
		super.type = "mage";
		super.weapon = "staff";
		super.armor = 5;
		super.energy = 200;
		super.maxeEnergy = 200;
	}
	fireball = function(target) {
		return this.attack(target, {
			"name": "fireball",
			"dmg": 50,
			"penetration": 15,
			"energyCost": 30
		})
	}
}


const bob = new Warrior("Bob")
const joe = new Mage("Joe")
console.log(bob.slash(joe))
console.log(joe.fireball(bob))
console.log(bob.slash(joe))
console.log(joe.fireball(bob))
console.log(bob.slash(joe))
console.log(joe.getState())
console.log(bob.getState())
