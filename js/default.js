class Default {
	init() {
		const containerStart = document.querySelector('.choice');
		const containerGame = document.querySelector('.container-game');

		const players = {
			player1: {
				name: 'Joueur 1',
				health: 100,
				weapon: null,
				grid: null,
			},
			player2: {
				name: 'Joueur 2',
				health: 100,
				weapon: null,
				grid: null,
			},
		};
		const weapons = {
			arme1: {
				name: 'Pistolet',
				damage: 10,
				grid: null,
			},
			arme2: {
				name: 'Mitraillette',
				damage: 20,
				grid: null,
			},
			arme3: {
				name: 'Fusil',
				damage: 30,
				grid: null,
			},
			arme4: {
				name: 'Canon',
				damage: 40,
				grid: null,
			},
		};
		const grid = {
			height: 100,
			inaccessibles: 10,
		};

		containerStart.classList.add('hide');
		containerGame.classList.remove('hide');

		const setupGame = { players, weapons, grid };
		const newGame = new Game(setupGame);
		newGame.setLocalStorage();
		newGame.loadGame();
	}
}
