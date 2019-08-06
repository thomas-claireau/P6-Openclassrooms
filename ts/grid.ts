class Grid {
	public grid: Array<any>;
	public height: number;
	public inaccessible: number;
	public player1: Player;
	public player2: Player;
	public gridActu: Grid;
	public weapons: Array<Weapon>;
	public nowPlayer: Player;
	public count: string | number;
	public row: string | number;
	public column: string | number;
	public custom: boolean;

	constructor() {
		this.grid = [];
		this.height;
		this.inaccessible;
		this.player1;
		this.player2;
		this.gridActu;
		this.weapons;
		this.nowPlayer;
		this.count;
		this.row;
		this.column;
		this.custom;
	}

	/**
	 * Création de la grille
	 */
	createGrid() {
		// création d'un tableau contenant un objet décrivant les différentes propriétés de chaque cellule
		const grid: Array<Object> = this.grid;

		for (let row = 0; row < this.height / 10; row++) {
			const arrayRow: Array<Object> = [];

			for (let column = 0; column < this.height / 10; column++) {
				const cell = {
					accessible: true,
					player: null,
					weapon: null,
					availableMoveCase: false,
				};
				arrayRow.push(cell); // pousse les colonnes dans les lignes vides
			}
			grid.push(arrayRow); // pousse les lignes remplies avec les colonnes vers la grille
		}
	}

	/**
	 * Création des cases inaccessibles sur la grille
	 */
	setInaccessibleCase() {
		const grid = this.grid;
		for (let i = 0; i < this.inaccessible; i++) {
			// création de case innacessible au hasard
			const rowInaccessible = Game.getRandomInt();
			const columnInaccessible = Game.getRandomInt();
			const inaccessibleCase = grid[rowInaccessible][columnInaccessible];

			inaccessibleCase.accessible = false; // chaque bloc innacessible a l'option accessible définit a false
			inaccessibleCase.availableMoveCase = true;
		}
	}

	/**
	 * Informations sur les joueurs et les armes côté front
	 */
	setGame() {
		let startGame: HTMLElement;

		if (this.custom) {
			startGame = document.querySelector('.play-custom');
		} else {
			startGame = document.querySelector('.play');
		}
		const player1 = this.player1;
		const player2 = this.player2;

		// sélecteurs game
		const playerOne: HTMLElement = document.querySelector('.playerOne');
		const namePlayerOne: HTMLElement = playerOne.querySelector('.name-player p');
		const weaponPlayerOne: HTMLElement = playerOne.querySelector('.weapon .name p');
		const weaponImgPlayerOne: HTMLImageElement = playerOne.querySelector('.weapon .name img');
		const weaponDamagePlayerOne: HTMLElement = playerOne.querySelector('.weapon .damage p');

		const playerTwo: HTMLElement = document.querySelector('.playerTwo');
		const namePlayerTwo: HTMLElement = playerTwo.querySelector('.name-player p');
		const weaponPlayerTwo: HTMLElement = playerTwo.querySelector('.weapon .name p');
		const weaponImgPlayerTwo: HTMLImageElement = playerTwo.querySelector('.weapon .name img');
		const weaponDamagePlayerTwo: HTMLElement = playerTwo.querySelector('.weapon .damage p');

		namePlayerOne.textContent = player1.name;
		namePlayerTwo.textContent = player2.name;

		weaponPlayerOne.textContent = player1.weapon.name;
		weaponPlayerTwo.textContent = player2.weapon.name;

		weaponImgPlayerOne.src = player1.weapon.symbole;
		weaponImgPlayerTwo.src = player2.weapon.symbole;

		weaponDamagePlayerOne.textContent = player1.weapon.damage;
		weaponDamagePlayerTwo.textContent = player2.weapon.damage;
	}

	/**
	 * Création de la grille à part de l'objet grid, côté front
	 */
	createFrontGrid() {
		const table: HTMLElement = document.querySelector('table');
		table.innerHTML = ''; // vider la table a chaque rechargement
		const player1 = this.player1;
		const player2 = this.player2;
		const grid = this.grid;

		for (let row = 0; row < grid.length; row++) {
			const tr = document.createElement('tr');
			table.append(tr); // création des lignes en premier (comme pour grid)

			for (let column = 0; column < grid[row].length; column++) {
				const td = document.createElement('td');
				tr.append(td); // puis création des colonnes
				td.setAttribute('data-row', row.toString());
				td.setAttribute('data-column', column.toString());
				const cell = grid[row][column];

				// conditions pour afficher en HTML seulement
				if (cell.accessible) {
					if (cell.player === player1) {
						td.setAttribute('id', 'playerOne');
					} else if (cell.player === player2) {
						td.setAttribute('id', 'playerTwo');
					}

					this.weapons.forEach((weaponObj) => {
						if (cell.weapon != null) {
							if (cell.weapon.name === weaponObj.name) {
								td.classList.add('weapon');
								td.classList.add(weaponObj.name.toLowerCase().replace(' ', '_'));
							}
						}
					});

					if (cell.availableMoveCase === true) {
						td.classList.add('availableMoveCase');
					} else {
						td.classList.add('emptyCase');
					}
				} else {
					td.classList.add('inaccessibleCase');
				}
			}
		}
	}

	/**
	 * Vérifier les mouvements disponibles pour chaque joueur à chaque tour
	 */
	checkavailableMoveCases() {
		let i = 1;
		const limit: number = 3;
		const grid = this.grid;
		const playerInfo = this.nowPlayer;
		const playerInfoRow = Number(playerInfo.row);
		const playerInfoColumn = Number(playerInfo.column);

		while (i <= limit) {
			if (
				playerInfoRow + i <= this.height / 10 - 1 &&
				grid[playerInfoRow + i][playerInfoColumn].accessible === true &&
				grid[playerInfoRow + i][playerInfoColumn].player === null
			) {
				// vérifier à gauche
				grid[playerInfoRow + i][playerInfoColumn].availableMoveCase = true;
				i++;
			} else {
				break;
			}
		}
		i = 1; // reset le i, car a la fin de la première boucle, i vaut 3, donc les 3 prochaines boucles ne commenceront jamais.
		while (i <= limit) {
			if (
				playerInfoRow - i >= 0 &&
				grid[playerInfoRow - i][playerInfoColumn].accessible === true &&
				grid[playerInfoRow - i][playerInfoColumn].player === null
			) {
				// vérifier à droite
				grid[playerInfoRow - i][playerInfoColumn].availableMoveCase = true;
				i++;
			} else {
				break;
			}
		}
		i = 1;
		while (i <= limit) {
			if (
				playerInfoColumn + i <= this.height / 10 - 1 &&
				grid[playerInfoRow][playerInfoColumn + i].accessible === true &&
				grid[playerInfoRow][playerInfoColumn + i].player === null
			) {
				// vérifier en bas
				grid[playerInfoRow][playerInfoColumn + i].availableMoveCase = true;
				i++;
			} else {
				break;
			}
		}
		i = 1;
		while (i <= limit) {
			if (
				playerInfoColumn - i >= 0 &&
				grid[playerInfoRow][playerInfoColumn - i].accessible === true &&
				grid[playerInfoRow][playerInfoColumn - i].player === null
			) {
				// vérifier en haut
				grid[playerInfoRow][playerInfoColumn - i].availableMoveCase = true;
				i++;
			} else {
				break;
			}
		}
		return grid;
	}

	/**
	 * Vérifie si les joueurs sont côte à côte
	 */
	checkClosePlayers() {
		let startBattle = false;
		const player = this.nowPlayer;
		const playerRow = Number(player.row);
		const playerColumn = Number(player.column);
		const grid = this.grid;

		if (playerRow - 1 >= 0 && grid[playerRow - 1][playerColumn].player != null) {
			// joueur sur le coté gauche
			startBattle = true;
		} else if (playerRow + 1 <= 9 && grid[playerRow + 1][playerColumn].player != null) {
			// droite
			startBattle = true;
		} else if (playerColumn - 1 >= 0 && grid[playerRow][playerColumn - 1].player != null) {
			// au dessus
			startBattle = true;
		} else if (playerColumn + 1 <= 9 && grid[playerRow][playerColumn + 1].player != null) {
			// en dessous
			startBattle = true;
		} else {
			startBattle = false; // si pas de joueur cote a cote, pas de bataille
		}
		return startBattle;
	}

	/**
	 * Au click, upgrade les informations sur l'objet Grid, et lance les instructions pour faire bouger les joueurs, tour à tour.
	 */
	updateGridToClick() {
		const tds = document.querySelectorAll('td');
		const grid = this.grid;
		const player = this.nowPlayer;
		let row = this.row;
		let column = this.column;
		let thisObj = this;

		tds.forEach((td) => {
			td.addEventListener('click', function(event) {
				row = td.dataset.row;
				column = td.dataset.column;
				const cell = grid[row][column];

				if (cell.availableMoveCase === true) {
					grid[player.row][player.column].player = null; // efface l'ancien emplacement du joueur car sinon, au prochain tour, il y aura un double joueur
					localStorage.setItem('rowOfClick', row);
					localStorage.setItem('columnOfClick', column);
					thisObj.movePlayer(); // fonction pour déplacer le joueur à l'emplacement cliqué et changer d'arme s'il passe dessus
					cell.player = player; // après avoir déplacé le joueur, reprendre la position initiale des joueurs (qui a donc changé par rapport au 1er tour)
					player.row = row; // nouvelle ligne du joueur
					player.column = column; // nouvelle colonne du joueur

					if (thisObj.checkClosePlayers() === false) {
						let count: number | string = Number(localStorage.count) + 1;
						count = count.toString();
						localStorage.setItem('count', count);
					}

					// reset tous les blocks après le click pour supprimer les mouvements disponibles des joueurs, sinon les mouvements dispo des deux joueurs s'afficheront en meme temps.
					for (let row = 0; row < grid.length; row++) {
						for (let column = 0; column < grid[row].length; column++) {
							let cell = grid[row][column];
							cell.availableMoveCase = false;
						}
					}
				} else {
					alert('Cette case est inacessible');
				}
				thisObj.whosNext(); // au tour du joueur suivant
			});
		});

		this.count = localStorage.count;
		thisObj = this;
		row = this.row;
		column = this.column;
	}

	/**
	 * Fait bouger le joueur jusqu'à la position du click
	 */
	movePlayer() {
		// playerPosition est le joueur dans la fonction sendGridToFront. Il faut aussi ajouter la cellule (row + column) pour l'utiliser dans la fonction changeWeapon
		let directionRow = 0;
		let directionCol = 0;
		const grid = this.grid;
		const playerPosition = this.nowPlayer;
		let playerPositionRow = Number(playerPosition.row);
		let playerPositionColumn = Number(playerPosition.column);
		const rowOfClick = Number(localStorage.rowOfClick);
		const columnOfClick = Number(localStorage.columnOfClick);

		if (rowOfClick === playerPositionRow) {
			// lorsque le clic est valide et que le joueur est sur la même rangée, vérifiez si le clic est à gauche ou à droite du joueur pour déterminer la direction du déplacement
			if (columnOfClick < playerPositionColumn) {
				// la position du click est à gauche de la position du joueur
				directionCol = -1;
			} else {
				// la position du click est à droite de la position du joueur
				directionCol = 1;
			}
		} else if (columnOfClick === playerPositionColumn) {
			// vérifier si le clic est au-dessus ou au-dessous du lecteur pour déterminer la direction du déplacement
			if (rowOfClick < playerPositionRow) {
				// la position du click est au dessus de la position du joueur
				directionRow = -1;
			} else {
				// la position du click est en dessous de la position du joueur
				directionRow = 1;
			}
		}

		// tant que la position du joueur n'est pas égale a la position du click, continuez a deplacer le joueur
		while (playerPositionRow != rowOfClick || playerPositionColumn != columnOfClick) {
			// sélecteurs game
			const playerOne: HTMLElement = document.querySelector('.playerOne');
			const weaponPlayerOne: HTMLElement = playerOne.querySelector('.weapon .name p');
			const weaponImgPlayerOne: HTMLImageElement = playerOne.querySelector(
				'.weapon .name img'
			);
			const weaponDamagePlayerOne: HTMLElement = playerOne.querySelector('.weapon .damage p');

			const playerTwo: HTMLElement = document.querySelector('.playerTwo');
			const weaponPlayerTwo: HTMLElement = playerTwo.querySelector('.weapon .name p');
			const weaponImgPlayerTwo: HTMLImageElement = playerTwo.querySelector(
				'.weapon .name img'
			);
			const weaponDamagePlayerTwo: HTMLElement = playerTwo.querySelector('.weapon .damage p');

			playerPositionRow = playerPositionRow + directionRow;
			playerPositionColumn = playerPositionColumn + directionCol;

			// changer l'arme du joueur au passage sur une autre (+ remplacer l'ancienne case de la nouvelle arme par l'ancienne arme)
			const cell = grid[playerPositionRow][playerPositionColumn];
			if (cell.weapon != null) {
				var temperaryDrop = playerPosition.weapon;
				playerPosition.weapon = cell.weapon;
				cell.weapon = temperaryDrop;
				const cellFront: HTMLElement = document.querySelector(
					`td[data-row='${playerPositionRow}'][data-column='${playerPositionColumn}']`
				);
				cellFront.style.backgroundImage = '';
			}

			weaponPlayerOne.textContent = this.player1.weapon.name;
			weaponPlayerTwo.textContent = this.player2.weapon.name;

			weaponImgPlayerOne.src = this.player1.weapon.symbole;
			weaponImgPlayerTwo.src = this.player2.weapon.symbole;

			weaponDamagePlayerOne.textContent = this.player1.weapon.damage;
			weaponDamagePlayerTwo.textContent = this.player2.weapon.damage;
		}
	}

	/**
	 * Méthode controlleur qui envoie les informations de Grid côté front.
	 */
	sendGridToFront() {
		this.grid = this.checkavailableMoveCases(); // appel de cette fonction ici car les lignes et les colonnes sont générés dans la fonction createFrontGrid qui est appelé juste après
		this.createFrontGrid();
		this.updateGridToClick();
	}

	/**
	 * Décide du tour de chaque joueur
	 */
	whosNext() {
		let player: Player;
		this.count = Number(localStorage.count);
		if (this.count % 2 === 0) {
			player = this.player1;
			this.nowPlayer = player;
		} else {
			player = this.player2;
			this.nowPlayer = player;
		}
		if (this.checkClosePlayers() === true) {
			// si les deux joueurs sont cote a cote, la bataille commence
			this.createFrontGrid(); // affiche le mouvement du dernier joueur avant de commencer la bataille
			this.startBattle();
		} else {
			// sinon continuez a afficher les mouvements disponibles et mettre a jour le code HTML
			this.sendGridToFront();
		}
	}

	/**
	 * Lance la bataille entre les deux joueurs
	 */
	startBattle() {
		let currentPlayerSlug: string;
		let nextPlayerSlug: string;
		let currentPlayer: Player;
		let nextPlayer: Player;
		let thisObj = this;

		if (this.nowPlayer === this.player1) {
			currentPlayerSlug = 'One';
			nextPlayerSlug = 'Two';
			currentPlayer = this.player1;
			nextPlayer = this.player2;
		} else {
			currentPlayerSlug = 'Two';
			nextPlayerSlug = 'One';
			currentPlayer = this.player2;
			nextPlayer = this.player1;
		}

		const currentPlayerFront: HTMLElement = document.querySelector(
			`.player${currentPlayerSlug}`
		);
		const nextPlayerFront: HTMLElement = document.querySelector(`.player${nextPlayerSlug}`);
		const btnAtt: HTMLElement = currentPlayerFront.querySelector('.actions .attaque');
		const btnDef: HTMLElement = currentPlayerFront.querySelector('.actions .defence');
		const progressBar: HTMLElement = nextPlayerFront.querySelector('.health div');

		currentPlayerFront.classList.add('inTurn'); // mettre en surbrillance le menu du joueur qui joue

		function attaque() {
			// evenement click sur le bouton d'attaque
			let count: number | string = Number(localStorage.count) + 1;
			count = count.toString();
			localStorage.setItem('count', count);
			currentPlayer.defend = false; // si le currentPlayer attaque, il ne défend pas

			if (nextPlayer.defend === false || nextPlayer.defend === undefined) {
				// si l'autre joueur choisit aussi l'attaque
				nextPlayer.health = nextPlayer.health - currentPlayer.weapon.damage;
			} else {
				// si l'autre joueur choisit la défense
				nextPlayer.health = nextPlayer.health - currentPlayer.weapon.damage / 2;
			}

			// actualiser la barre de santé des joueurs
			progressBar.style.width = `${nextPlayer.health}%`;
			progressBar.textContent = nextPlayer.health;

			if (nextPlayer.health > 0) {
				// si le joueur a plus de 0 en santé, la bataille continu (tour par tour)
				thisObj.whosNext();
			} else {
				// sinon, affiche le message du joueur qui gagne la partie
				// progressBar.style.width = '0%';
				// progressBar.textContent = '0';
				currentPlayerFront.classList.remove('inTurn'); // supprimer la surbrillance après qu'un joueur ait gagné
				setTimeout(function() {
					if (
						window.confirm(
							`${currentPlayer.name} a gagné le combat ! /n Voulez-vous recommencer ?`
						)
					) {
						location.reload();
					}
				}, 1000);
			}

			this.count = localStorage.count;

			currentPlayerFront.classList.remove('inTurn');
			btnAtt.removeEventListener('click', attaque);
			btnDef.removeEventListener('click', defense);
		}

		function defense() {
			let count: number | string = Number(localStorage.count) + 1;
			count = count.toString();
			localStorage.setItem('count', count);

			currentPlayer.defend = true;
			thisObj.whosNext();
			this.count = localStorage.count;
			currentPlayerFront.classList.remove('inTurn');
			btnAtt.removeEventListener('click', attaque);
			btnDef.removeEventListener('click', defense);
		}

		btnAtt.addEventListener('click', attaque);
		btnDef.addEventListener('click', defense);
	}
}
