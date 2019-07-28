// caractéristiques de la partie
class Game {
	public setup;
	public grid;
	public newGrid;
	public players;
	public weapons;
	constructor(setup) {
		this.setup = setup;
		this.grid = setup.grid;
		this.newGrid;
		this.players = new Array();
		this.weapons = new Array();
	}

	setLocalStorage() {
		localStorage.setItem('count', '0');
		localStorage.setItem('rowOfClick', null);
		localStorage.setItem('columnOfClick', null);
	}

	loadGame() {
		this.setGrid();
		this.setInaccessiblesCases();
		this.setWeapons();
		this.setPlayers();
		this.setFrontGame();

		const count = localStorage.count;
		this.newGrid.count = count;
		this.newGrid.whosTurn();
	}

	setGrid() {
		this.newGrid = new Grid();
		this.newGrid.height = this.setup.grid.height;

		this.newGrid.createGrid();
	}

	setInaccessiblesCases() {
		this.newGrid.inaccessible = this.setup.grid.inaccessibles;
		this.newGrid.setInaccessibleCase();
	}

	setWeapons() {
		for (let key in this.setup.weapons) {
			const weapon = this.setup.weapons[key];
			const name = weapon.name;
			const damage = weapon.damage;

			const newWeapon = new Weapon(name, damage, this.newGrid);
			newWeapon.getWeapon();
			this.weapons.push(newWeapon);
		}

		this.newGrid.weapons = this.weapons;
	}

	setPlayers() {
		for (let key in this.setup.players) {
			const player = this.setup.players[key];
			const name = player.name;
			const health = player.health;
			const weapon = this.weapons[0]; // club est l'arme par défaut

			const newPlayer = new Player(name, health, weapon, this.newGrid);
			newPlayer.placePlayer();
			this.players.push(newPlayer);
		}

		this.newGrid.player1 = this.players[0];
		this.newGrid.player2 = this.players[1];
	}

	setFrontGame() {
		this.newGrid.setGame();
	}

	setFrontGrid() {
		this.newGrid.createTableHTML();
	}
}

// TODO :
// liste d'arme avec caractéristiques -> Objet JSON
// taille de la grille
// nombre de case inaccessibles
// ajout méthode pour call tous les localstorages
// ne pas laisser la possibilité du nom du joueur -> définir donc le nom + les autres caractéristique ici
