export class Player {
    constructor(name = "Player", lvl = 1, hp = 100, maxHp = 100, en = 100, maxEn = 100, arm = 0) {
        this.name = name;
        this.level = lvl;
        this.health = hp;
        this.maxHealth = maxHp;
        this.energy = en; 
        this.maxeEnergy = maxEn;
        this.armor = arm;
        this.status = "active";
        this.wins = 0;
        this.losses = 0;
				
    }
    punch = function(target) {
			const damage = (25 + this.level) - target.armor;
			const remainingHealth = target.health - damage;
			if (remainingHealth <= 0) {
				target.health = 0;
				target.status = "dead";
				return `${target.name} has been defeated by ${this.name}`
			} else {
				target.health = remainingHealth;
				this.energy = this.energy - 20;
				return `${this.name} hits ${target.name} for ${damage} damage`
			}
    }
	
	getState = () => this
	
}