class Weapon {
	public name;
	public damage;
	public grid;
	constructor(name, damage, grid) {
		this.name = name;
		this.damage = damage;
		this.grid = grid;
	}

	createWeapon() {
		// génère les armes sur la grille
		let weaponRow = pickANumber();
		let weaponColumn = pickANumber();
		let grid = this.grid.grid;
		let weaponCell = grid[weaponRow][weaponColumn];

		if (
			weaponCell.accessible === true &&
			weaponCell.weapon === null &&
			weaponCell.player === null
		) {
			weaponCell.weapon = this; // si la cellule est accessible, sans joueur et sans arme, changer la cellule avec le nom de l'arme (passé en paramètre)
		} else {
			this.createWeapon(); // sinon, redémarrer le processus de recherche
		}
	}
}
