class Grid {
	public grid;
	constructor() {
		this.grid = [];
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
}
