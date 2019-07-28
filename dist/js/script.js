document.addEventListener('DOMContentLoaded', () => {
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
            name: 'Club',
            damage: 10,
            grid: null,
        },
        arme2: {
            name: 'Dagger',
            damage: 20,
            grid: null,
        },
        arme3: {
            name: 'Axe',
            damage: 24,
            grid: null,
        },
        arme4: {
            name: 'Hammer',
            damage: 28,
            grid: null,
        },
        arme5: {
            name: 'Sword',
            damage: 30,
            grid: null,
        },
    };
    const grid = {
        height: 100,
        inaccessibles: 10,
    };
    const setupGame = { players, weapons, grid };
    const newGame = new Game(setupGame);
    newGame.setLocalStorage();
    newGame.loadGame();
});
