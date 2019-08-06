class Weapon {
	public name: string;
	public damage: any;
	public grid: Grid;
	public symbole: string;
	constructor(name: string, damage: number, grid: Grid, symbole: string) {
		this.name = name;
		this.damage = damage;
		this.grid = grid;
		this.symbole = symbole;
	}

	/**
	 * Génère les armes sur la grille
	 */
	createWeapon() {
		const weaponRow = Game.getRandomInt();
		const weaponColumn = Game.getRandomInt();
		const grid = this.grid.grid;
		const weaponCell = grid[weaponRow][weaponColumn];

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
