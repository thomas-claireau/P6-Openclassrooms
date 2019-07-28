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

	player1.placePlayer();
	player2.placePlayer();

	newGrid.player1 = player1;
	newGrid.player2 = player2;
	newGrid.gridActu = newGrid.grid;

	newGrid.weapons = new Array();
	newGrid.weapons.push(club);
	newGrid.weapons.push(dagger);
	newGrid.weapons.push(axe);
	newGrid.weapons.push(hammer);
	newGrid.weapons.push(sword);

	newGrid.setGame();

	let count = localStorage.setItem('count', '0'); // variable générale pour activer tel ou tel joueur dans la boucle. Si la variable reste à l'intérieur de la fonction, elle sera réinitialisé à zéro a chaque appel de la fonction. Le second joueur ne sera donc jamais appelé. Au contraire, si la variable est incrémenté en dehors de la fonction, le joueur 2 sera appelé.
	localStorage.setItem('rowOfClick', null);
	localStorage.setItem('columnOfClick', null);

	newGrid.count = count;
	newGrid.whosTurn();

	if (newGrid.checkStartBattle() === true) {
		// si les deux joueurs sont cote a cote, la bataille commence
		newGrid.createTableHTML(); // affiche le mouvement du dernier joueur avant de commencer la bataille
		// battle();
	} else {
		// sinon continuez a afficher les mouvements disponibles et mettre a jour le code HTML
		newGrid.sendContentToPage();
	}

	newGrid.grid.forEach((el) => {
		el.forEach((le) => {
			if (le.inactiveCase !== false) {
				// console.log(le);
			}
			if (le.availableMove !== false) {
				// console.log(le);
			}
			if (le.weapon !== null) {
				// console.log(le);
			}

			if (le.player !== null) {
				// console.log(le);
			}
		});
	});
});
