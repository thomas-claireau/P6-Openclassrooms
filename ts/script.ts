document.addEventListener('DOMContentLoaded', () => {
	const btnPlay = document.querySelector('.play button');
	const btnCustom = document.querySelector('.custom button');
	const btnPlayCustom = document.querySelector('.play-custom');
	const containerStart = document.querySelector('.choice');
	const containerOption = document.querySelector('.container-custom');
	const optionsGrid = containerOption.querySelectorAll('.select');
	const containerGame = document.querySelector('.container-game');
	const prev = document.querySelector('.prev i');

	let players;
	let weapons;
	let grid;
	let setupGame;
	let newGame;

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

		weapons = {
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
				name: 'Ak47',
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

			weapons = {
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
					name: 'Ak47',
					damage: 30,
					grid: null,
				},
				arme4: {
					name: 'Canon',
					damage: 40,
					grid: null,
				},
			};

			// si l'utilisateur choisit plus de 4 armes, les prochaines sont générées aléatoirement
			if (Number(nbWeapons.value) > 4) {
				for (let i = 0; i < Number(nbWeapons.value); i++) {}
			}

			setupGame = { players, weapons, grid };

			newGame = new Game(setupGame, true);
			newGame.setLocalStorage();
			newGame.loadGame();
		});

		optionsGrid.forEach((option) => {
			const inputOption = option.querySelector('input');
			const outputOption = option.querySelector('.output');

			outputOption.innerHTML = inputOption.value;

			inputOption.oninput = function() {
				outputOption.textContent = inputOption.value;
			};
		});
	});
});
