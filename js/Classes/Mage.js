export class Mage extends Player {
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