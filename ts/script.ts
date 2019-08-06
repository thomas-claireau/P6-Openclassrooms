document.addEventListener('DOMContentLoaded', () => {
	const btnPlay: HTMLElement = document.querySelector('.play button');
	const btnCustom: HTMLElement = document.querySelector('.custom button');
	const btnPlayCustom: HTMLElement = document.querySelector('.play-custom');
	const containerStart: HTMLElement = document.querySelector('.choice');
	const containerOption: HTMLElement = document.querySelector('.container-custom');
	const optionsGrid: NodeListOf<HTMLElement> = containerOption.querySelectorAll('.select');
	const containerGame: HTMLElement = document.querySelector('.container-game');
	const prev: HTMLElement = document.querySelector('.prev i');

	let players: any;
	let grid: any;
	let setupGame: any;
	let newGame: Game;

	btnPlay.addEventListener('click', function() {
		containerStart.classList.add('hide');
		containerGame.classList.remove('hide');

		players = {
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

		const weapons: Object = {
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

		grid = {
			height: 100, // nombre de case
			inaccessibles: 10, // nombre de cases inaccessibles
		};

		setupGame = { players, weapons, grid };

		newGame = new Game(setupGame);
		newGame.setLocalStorage();
		newGame.loadGame();
	});

	btnCustom.addEventListener('click', function() {
		containerStart.classList.add('hide');
		containerOption.classList.remove('hide');

		prev.addEventListener('click', function() {
			containerOption.classList.add('hide');
		});

		btnPlayCustom.addEventListener('click', function() {
			containerGame.classList.remove('hide');
			containerOption.classList.add('hide');

			const inputPlayerOne: HTMLInputElement = document.querySelector(
				'label[for="nom-joueur-1"] input'
			);
			const inputPlayerTwo: HTMLInputElement = document.querySelector(
				'label[for="nom-joueur-2"] input'
			);
			const nbCase: HTMLInputElement = document.querySelector('label[for="nbCase"] input');
			const nbObstacle: HTMLInputElement = document.querySelector(
				'label[for="inaccessibleCase"] input'
			);
			const nbWeapons: HTMLInputElement = document.querySelector(
				'label[for="weapons"] input'
			);

			players = {
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

			grid = {
				height: nbCase.value, // nombre de case
				inaccessibles: nbObstacle.value, // nombre de cases inaccessibles
			};

			let availableWeapons: any = {
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

			const weapons: Array<Object> = [];

			for (let i = 0; i < Number(nbWeapons.value); i++) {
				weapons.push(availableWeapons.armes[i]);
			}

			setupGame = { players, weapons, grid };

			newGame = new Game(setupGame, true);
			newGame.setLocalStorage();
			newGame.loadGame();
		});

		optionsGrid.forEach((option) => {
			const inputOption = option.querySelector('input');
			const outputOption: HTMLElement = option.querySelector('.output');

			outputOption.innerHTML = inputOption.value;

			inputOption.oninput = function() {
				outputOption.textContent = inputOption.value;
			};
		});
	});
});
