// caractéristiques de la partie
class Game {
    constructor(setup, custom = false) {
        this.setup = setup;
        this.grid = setup.grid;
        this.newGrid;
        this.players = new Array();
        this.weapons = new Array();
        Game.heightGrid = this.setup.grid.height;
        this.custom = custom;
    }
    /**
     * Méthode statique permettant la création d'entier aléatoire
     */
    static getRandomInt() {
        const limit = Game.heightGrid / 10;
        return Math.floor(Math.random() * limit);
    }
    /**
     * Création / Reset des localStorage utilisées dans l'application
     */
    setLocalStorage() {
        localStorage.setItem('count', '0');
        localStorage.setItem('rowOfClick', null);
        localStorage.setItem('columnOfClick', null);
    }
    /**
     * Controlleur pour lancer la partie
     */
    loadGame() {
        this.setGrid();
        this.setInaccessiblesCases();
        this.setWeapons();
        this.setPlayers();
        this.setFrontGame();
        this.setFrontGrid();
        const count = localStorage.count;
        this.newGrid.count = count;
        this.newGrid.whosNext();
    }
    /**
     * Controlleur pour initialiser l'objet Grid et créer la grille de jeu
     */
    setGrid() {
        this.newGrid = new Grid();
        this.newGrid.height = this.setup.grid.height;
        this.newGrid.createGrid();
    }
    /**
     * Controlleur pour créer les cases inaccessibles de la grille de jeu
     */
    setInaccessiblesCases() {
        this.newGrid.inaccessible = this.setup.grid.inaccessibles;
        this.newGrid.setInaccessibleCase();
    }
    /**
     * Controlleur pour créer les armes de la grille de jeu
     */
    setWeapons() {
        for (const key in this.setup.weapons) {
            const weapon = this.setup.weapons[key];
            const name = weapon.name;
            const damage = weapon.damage;
            const slug = weapon.name.toLowerCase().replace(' ', '_');
            const symbole = `/assets/img/${slug}_symbole.png`;
            const newWeapon = new Weapon(name, damage, this.newGrid, symbole);
            newWeapon.createWeapon();
            this.weapons.push(newWeapon);
        }
        this.newGrid.weapons = this.weapons;
    }
    /**
     * Controlleur pour créer les joueurs de la grille de jeu
     */
    setPlayers() {
        for (const key in this.setup.players) {
            const player = this.setup.players[key];
            const name = player.name;
            const health = player.health;
            const weapon = this.weapons[0]; // club est l'arme par défaut
            const newPlayer = new Player(name, health, weapon, this.newGrid);
            newPlayer.createPlayer();
            this.players.push(newPlayer);
        }
        this.newGrid.player1 = this.players[0];
        this.newGrid.player2 = this.players[1];
    }
    /**
     * Controlleur pour lancer la méthode sur les armes et les joueurs côté front
     */
    setFrontGame() {
        this.newGrid.custom = this.custom;
        this.newGrid.setGame();
    }
    /**
     * Controlleur pour lancer la méthode de création de l'objet grid, côté front
     */
    setFrontGrid() {
        this.newGrid.createFrontGrid();
    }
}
// TODO :
// liste d'arme avec caractéristiques -> Objet JSON
// taille de la grille
// nombre de case inaccessibles
// ajout méthode pour call tous les localstorages
// ne pas laisser la possibilité du nom du joueur -> définir donc le nom + les autres caractéristique ici
