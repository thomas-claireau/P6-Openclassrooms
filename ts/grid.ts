class Grid {
	public grid;
	public player1;
	public player2;
	public gridActu;
	public weapons;
	public nowPlayer;
	public count;
	public row;
	public column;

	constructor(
		player1 = null,
		player2 = null,
		gridActu = null,
		weapons = null,
		nowPlayer = null,
		count = null
	) {
		this.grid = [];
		this.player1;
		this.player2;
		this.gridActu;
		this.weapons;
		this.nowPlayer;
		this.count;
		this.row; // row of click
		this.column; // column of click;
	}

	createGrid() {
		// ---------------- Création de la grille -----------------------

		// partie 1 : créer un tableau avec une chaine contenant un objet
		const grid = this.grid;

		for (let row = 0; row < 10; row++) {
			let newRow = [];

			for (let column = 0; column < 10; column++) {
				let cell = {
					accessible: true,
					player: null,
					weapon: null,
					availableMove: false,
				};
				newRow.push(cell); // pousse les colonnes dans les lignes vides
			}
			grid.push(newRow); // pousse les lignes remplies avec les colonnes vers la grille
		}
	}

	setInaccessibleCase() {
		let grid = this.grid;
		for (let i = 0; i < 10; i++) {
			// création de bloc innacessible au hasard
			const rowInaccessible = pickANumber();
			const columnInaccessible = pickANumber();
			const inaccessibleCase = grid[rowInaccessible][columnInaccessible];

			inaccessibleCase.accessible = false; // chaque bloc innacessible a l'option accessible définit a false
			inaccessibleCase.availableMove = true;
		}
	}

	setGame() {
		const startGame = document.querySelector('#startGame');
		const player1 = this.player1;
		const player2 = this.player2;

		// startGame.addEventListener('click', function() {
		const inputPlayer1 = document.querySelector('#player1Name').textContent;
		const inputPlayer2 = document.querySelector('#player2Name').textContent;
		const showNamePlayer1 = document.querySelector('#showNamePlayer1');
		const showNamePlayer2 = document.querySelector('#showNamePlayer2');
		const currentWeaponP1 = document.querySelector('#currentWeaponP1');
		const currentWeaponP2 = document.querySelector('#currentWeaponP2');
		const beforeGameStarts: HTMLDivElement = document.querySelector('#beforeGameStarts');
		const game: HTMLDivElement = document.querySelector('#game');

		player1.name = inputPlayer1;
		player2.name = inputPlayer2;

		if (player1.name === '') player1.name = 'Joueur 1';
		if (player2.name === '') player2.name = 'Joueur 2';

		showNamePlayer1.textContent = player1.name;
		showNamePlayer2.textContent = player2.name;
		currentWeaponP1.textContent = `Arme : ${player1.weapon.name} - Dégâts : ${
			player1.weapon.damage
		}`;
		currentWeaponP2.textContent = `Arme : ${player2.weapon.name} - Dégâts : ${
			player2.weapon.damage
		}`;

		beforeGameStarts.style.display = 'none';
		game.style.display = 'block';
		// });
	}

	createTableHTML() {
		const table: HTMLElement = document.querySelector('table');
		table.innerHTML = ''; // vider la table a chaque rechargement
		const player1 = this.player1;
		const player2 = this.player2;
		const grid = this.gridActu;

		for (let row = 0; row < grid.length; row++) {
			const tr = document.createElement('tr');
			table.append(tr); // création des lignes en premier (comme pour grid)

			for (let column = 0; column < grid[row].length; column++) {
				const td = document.createElement('td');
				tr.append(td); // puis création des colonnes
				td.setAttribute('data-row', row.toString());
				td.setAttribute('data-column', column.toString());
				const cell = grid[row][column];

				const club = this.weapons[0];
				const dagger = this.weapons[1];
				const axe = this.weapons[2];
				const hammer = this.weapons[3];
				const sword = this.weapons[4];

				// conditions pour afficher en HTML seulement
				if (cell.accessible) {
					if (cell.player === player1) {
						td.classList.add('player1');
					} else if (cell.player === player2) {
						td.classList.add('player2');
					} else if (cell.weapon === dagger) {
						td.classList.add('dagger');
						td.title = `dagger, dégats : ${dagger.damage}`;
					} else if (cell.weapon === axe) {
						td.classList.add('axe');
						td.title = `axe, dégats : ${axe.damage}`;
					} else if (cell.weapon === hammer) {
						td.classList.add('hammer');
						td.title = `hammer, dégats : ${hammer.damage}`;
					} else if (cell.weapon === sword) {
						td.classList.add('sword');
						td.title = `sword, dégats : ${sword.damage}`;
					} else if (cell.weapon === club) {
						td.classList.add('club');
						td.title = `club, dégats : ${club.damage}`;
					}

					if (cell.availableMove === true) {
						td.classList.add('availableMove');
					} else {
						td.classList.add('emptyCell');
					}
				} else {
					td.classList.add('inaccessibleCell');
				}
			}
		}
	}

	checkAvailableMoves() {
		// vérifier les mouvements disponibles pour chaque joueur à chaque tour
		let i = 1;
		const limit = 3;
		const grid = this.grid;
		const playerInfo = this.nowPlayer;
		const playerInfoRow = Number(playerInfo.row);
		const playerInfoColumn = Number(playerInfo.column);

		while (i <= limit) {
			if (
				playerInfoRow + i <= 9 &&
				grid[playerInfoRow + i][playerInfoColumn].accessible === true &&
				grid[playerInfoRow + i][playerInfoColumn].player === null
			) {
				// vérifier à gauche
				grid[playerInfoRow + i][playerInfoColumn].availableMove = true;
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
				grid[playerInfoRow - i][playerInfoColumn].availableMove = true;
				i++;
			} else {
				break;
			}
		}
		i = 1;
		while (i <= limit) {
			if (
				playerInfoColumn + i <= 9 &&
				grid[playerInfoRow][playerInfoColumn + i].accessible === true &&
				grid[playerInfoRow][playerInfoColumn + i].player === null
			) {
				// vérifier en bas
				grid[playerInfoRow][playerInfoColumn + i].availableMove = true;
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
				grid[playerInfoRow][playerInfoColumn - i].availableMove = true;
				i++;
			} else {
				break;
			}
		}
		return grid;
	}

	checkStartBattle() {
		let startBattle = false;
		const player = this.nowPlayer;
		const playerRow = Number(player.row);
		const playerColumn = Number(player.column);
		const grid = this.gridActu;

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

	moveClick() {
		const tds = document.querySelectorAll('td');
		const grid = this.gridActu;
		const player = this.nowPlayer;
		let row = this.row;
		let column = this.column;
		let thisObj = this;
		let count = this.count;

		tds.forEach((td) => {
			td.addEventListener('click', function(event) {
				row = td.dataset.row;
				column = td.dataset.column;
				const cell = grid[row][column];

				if (cell.availableMove === true) {
					grid[player.row][player.column].player = null; // efface l'ancien emplacement du joueur car sinon, au prochain tour, il y aura un double joueur
					localStorage.setItem('rowOfClick', row);
					localStorage.setItem('columnOfClick', column);
					thisObj.movePlayerToClick(); // fonction pour déplacer le joueur à l'emplacement cliqué et changer d'arme s'il passe dessus
					cell.player = player; // après avoir déplacé le joueur, reprendre la position initiale des joueurs (qui a donc changé par rapport au 1er tour)
					player.row = row; // nouvelle ligne du joueur
					player.column = column; // nouvelle colonne du joueur

					if (thisObj.checkStartBattle() === false) {
						let count: any = Number(localStorage.count) + 1;
						count = count.toString();
						localStorage.setItem('count', count);
						// count++; // incrémenter click si aucune bataille n'a été déclenchée
						// console.log(count);
						// const saveValue = document.querySelector('input.count');
						// saveValue.textContent = count;
						// console.log(count);
					}

					// reset tous les blocks après le click pour supprimer les mouvements disponibles des joueurs, sinon les mouvements dispo des deux joueurs s'afficheront en meme temps.
					for (let row = 0; row < grid.length; row++) {
						for (let column = 0; column < grid[row].length; column++) {
							let cell = grid[row][column];
							cell.availableMove = false;
						}
					}
				} else {
					alert('Cette case est inacessible');
				}
				// console.log(localStorage.count);
				thisObj.whosTurn(); // au tour du joueur suivant
			});
		});

		// console.log(count);
		// const saveValue = document.querySelector('input.count');
		// this.count = Number(saveValue.textContent) + 1;
		this.count = localStorage.count;
		thisObj = this;
		row = this.row;
		column = this.column;
	}

	movePlayerToClick() {
		// playerPosition est le joueur dans la fonction sendContentToPage. Il faut aussi ajouter la cellule (row + column) pour l'utiliser dans la fonction changeWeapon
		let directionRow = 0;
		let directionCol = 0;
		const grid = this.gridActu;
		const playerPosition = this.nowPlayer;
		const rowOfClick = localStorage.rowOfClick;
		const columnOfClick = localStorage.columnOfClick;

		console.log(rowOfClick);

		if (rowOfClick === playerPosition.row) {
			// lorsque le clic est valide et que le joueur est sur la même rangée, vérifiez si le clic est à gauche ou à droite du joueur pour déterminer la direction du déplacement
			if (columnOfClick < playerPosition.column) {
				// la position du click est à gauche de la position du joueur
				directionCol = -1;
			} else {
				// la position du click est à droite de la position du joueur
				directionCol = 1;
			}
		} else if (columnOfClick === playerPosition.column) {
			// vérifier si le clic est au-dessus ou au-dessous du lecteur pour déterminer la direction du déplacement
			if (rowOfClick < playerPosition.row) {
				// la position du click est au dessus de la position du joueur
				directionRow = -1;
			} else {
				// la position du click est en dessous de la position du joueur
				directionRow = 1;
			}
		}

		// tant que la position du joueur n'est pas égale a la position du click, continuez a deplacer le joueur
		while (playerPosition.row === rowOfClick || playerPosition.column === columnOfClick) {
			const currentWeaponP1 = document.querySelector('#currentWeaponP1');
			const currentWeaponP2 = document.querySelector('#currentWeaponP2');

			playerPosition.row = Number(playerPosition.row) + Number(directionRow);
			playerPosition.column = Number(playerPosition.column) + Number(directionCol);

			// changer l'arme du joueur au passage sur une autre (+ remplacer l'ancienne case de la nouvelle arme par l'ancienne arme)
			const cell = grid[playerPosition.row][playerPosition.column];
			if (cell.weapon != null) {
				var temperaryDrop = playerPosition.weapon;
				playerPosition.weapon = cell.weapon;
				cell.weapon = temperaryDrop;
			}

			currentWeaponP1.textContent = `Arme : ${this.player1.weapon.name} - Dégats : ${
				this.player1.weapon.damage
			}`;
			currentWeaponP2.textContent = `Arme : ${this.player2.weapon.name} - Dégats : ${
				this.player2.weapon.damage
			}`;
		}
	}

	sendContentToPage() {
		this.grid = this.checkAvailableMoves(); // appel de cette fonction ici car les lignes et les colonnes sont générés dans la fonction createTableHTML qui est appelé juste après
		this.createTableHTML();
		this.moveClick();
	}

	whosTurn() {
		let player;
		this.count = localStorage.count;
		if (this.count % 2 === 0) {
			player = this.player1;
			this.nowPlayer = player;
		} else {
			player = this.player2;
			this.nowPlayer = player;
		}
		if (this.checkStartBattle() === true) {
			// si les deux joueurs sont cote a cote, la bataille commence
			this.createTableHTML(); // affiche le mouvement du dernier joueur avant de commencer la bataille
			// battle();
		} else {
			// sinon continuez a afficher les mouvements disponibles et mettre a jour le code HTML
			this.sendContentToPage();
		}
	}
}
