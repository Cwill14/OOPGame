export class Warrior extends Player {
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