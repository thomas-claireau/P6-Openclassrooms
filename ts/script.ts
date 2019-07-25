document.addEventListener('DOMContentLoaded', () => {
	const newGrid = new Grid();
	newGrid.createGrid();
	newGrid.setInaccessibleCase();

	const club = new Weapon('club', 10, newGrid.grid); // l'arme par défaut
	const dagger = new Weapon('dagger', 20, newGrid.grid);
	const axe = new Weapon('axe', 24, newGrid.grid);
	const hammer = new Weapon('hammer', 28, newGrid.grid);
	const sword = new Weapon('sword', 30, newGrid.grid);

	dagger.getWeapon();
	axe.getWeapon();
	hammer.getWeapon();
	sword.getWeapon();

	const player1 = new Player('Joueur 1', 100, club, newGrid.grid);
	const player2 = new Player('Joueur 2', 100, club, newGrid.grid);

	player1.checkPlayerNearby();
	player2.checkPlayerNearby();
	player1.placePlayer();
	player2.placePlayer();

	console.log(newGrid.grid);
});
