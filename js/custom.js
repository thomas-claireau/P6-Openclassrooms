class Custom {
	init() {
		const containerGame = document.querySelector('.container-game');
		const containerOption = document.querySelector('.container-custom');

		containerGame.classList.remove('hide');
		containerOption.classList.add('hide');

		const inputPlayerOne = document.querySelector('label[for="nom-joueur-1"] input');
		const inputPlayerTwo = document.querySelector('label[for="nom-joueur-2"] input');
		const nbCase = document.querySelector('label[for="nbCase"] input');
		const nbObstacle = document.querySelector('label[for="inaccessibleCase"] input');
		const nbWeapons = document.querySelector('label[for="weapons"] input');

		const players = {
			player1: {
				name: inputPlayerOne.value,
				health: 100,
				weapon: null,
				grid: null,
			},
			player2: {
				name: inputPlayerTwo.value,
				health: 100,
				weapon: null,
				grid: null,
			},
		};
		const grid = {
			height: nbCase.value,
			inaccessibles: nbObstacle.value,
		};
		const availableWeapons = {
			armes: [
				{
					name: 'Pistolet',
					damage: 10,
					grid: null,
					img: null,
					symbole: null,
				},
				{
					name: 'Mitraillette',
					damage: 20,
					grid: null,
					img: null,
					symbole: null,
				},
				{
					name: 'Pistolet mittrailleur',
					damage: 24,
					grid: null,
					img: null,
					symbole: null,
				},
				{
					name: 'Revolver',
					damage: 30,
					grid: null,
					img: null,
					symbole: null,
				},
				{
					name: 'Fusil',
					damage: 34,
					grid: null,
					img: null,
					symbole: null,
				},
				{
					name: 'Uzi',
					damage: 25,
					grid: null,
					img: null,
					symbole: null,
				},
				{
					name: 'Mitrailleuse',
					damage: 40,
					grid: null,
					img: null,
					symbole: null,
				},
				{
					name: 'Canon',
					damage: 45,
					grid: null,
					img: null,
					symbole: null,
				},
			],
		};
		const weapons = [];
		for (let i = 0; i < Number(nbWeapons.value); i += 1) {
			weapons.push(availableWeapons.armes[i]);
		}
		const setupGame = { players, weapons, grid };
		const newGame = new Game(setupGame, true);
		newGame.setLocalStorage();
		newGame.loadGame();
	}
}
