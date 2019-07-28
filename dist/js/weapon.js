class Weapon {
    constructor(name, damage, grid) {
        this.name = name;
        this.damage = damage;
        this.grid = grid;
    }
    /**
     * Génère les armes sur la grille
     */
    createWeapon() {
        let weaponRow = Game.getRandomInt();
        let weaponColumn = Game.getRandomInt();
        let grid = this.grid.grid;
        let weaponCell = grid[weaponRow][weaponColumn];
        if (weaponCell.accessible === true &&
            weaponCell.weapon === null &&
            weaponCell.player === null) {
            weaponCell.weapon = this; // si la cellule est accessible, sans joueur et sans arme, changer la cellule avec le nom de l'arme (passé en paramètre)
        }
        else {
            this.createWeapon(); // sinon, redémarrer le processus de recherche
        }
    }
}
