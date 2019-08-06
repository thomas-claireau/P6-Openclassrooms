class Player {
    constructor(name, health, weapon, grid) {
        this.name = name;
        this.health = health;
        this.weapon = weapon;
        this.row = Game.getRandomInt();
        this.column = Game.getRandomInt();
        this.defend;
        this.grid = grid;
        this.playerNearby;
    }
    /**
     * Vérifie si les joueurs sont côte à côte
     */
    checkClosePlayers() {
        // vérifie si les joueurs ne sont pas cote a cote
        const topBottom = this.row;
        const leftRight = this.column;
        let checkUp;
        let checkDown;
        let checkLeft;
        let checkRight;
        let grid = this.grid.grid;
        if (this.name === 'Joueur 2') {
            if (topBottom === 0) {
                // si le joueur est sur la première ligne, ne pas vérifier la position du haut
                checkUp = null;
            }
            else {
                checkUp = grid[topBottom - 1][leftRight].player;
            }
            if (topBottom === 9) {
                // si le joueur est sur la dernière ligne, ne pas vérifier la position du bas
                checkDown = null;
            }
            else {
                checkDown = grid[topBottom + 1][leftRight].player;
            }
            if (leftRight === 0) {
                // si le joueur est sur la première colonne, ne pas vérifier la position de gauche
                checkLeft = null;
            }
            else {
                checkLeft = grid[topBottom][leftRight - 1].player;
            }
            if (leftRight === 9) {
                // si le joueur est sur la dernière colonne, ne pas vérifier la position de droite
                checkRight = null;
            }
            else {
                checkRight = grid[topBottom][leftRight + 1].player;
            }
            if (checkUp != null || checkDown != null || checkLeft != null || checkRight != null) {
                this.playerNearby = true;
            }
            else {
                this.playerNearby = false;
            }
            return this.playerNearby;
        }
    }
    /**
     * Création des joueurs et mise à jour de l'objet Grid
     */
    createPlayer() {
        // fonction pour créer les joueurs
        let playerRow = this.row;
        let playerColumn = this.column;
        let playerCell = this.grid.grid[playerRow][playerColumn];
        this.playerNearby = this.checkClosePlayers();
        if (playerCell.accessible === true &&
            playerCell.weapon === null &&
            playerCell.player === null) {
            // si la cellule est accessible, qu'il n'y a aucune arme dessus, ni aucun joueur, alors on vérifie si les cellules adjacente contiennent un joueur (playerNearby)
            if (this.playerNearby === true) {
                // si un autre joueur est sur une case adjacente, on relance la fonction en changant row et column
                this.row = Game.getRandomInt();
                this.column = Game.getRandomInt();
                this.createPlayer();
            }
            else {
                playerCell.player = this; // on remplit l'option player avec les infos du joueur
            }
        }
        else {
            // si la cellule générée est inaccessible ou déja prise, relancez la fonction
            this.row = Game.getRandomInt();
            this.column = Game.getRandomInt();
            this.createPlayer();
        }
    }
}
