document.addEventListener('DOMContentLoaded', () => {
    const newGrid = new Grid();
    newGrid.createGrid();
    // newGrid.setInaccessibleCase();
    const club = new Weapon('club', 10, newGrid.grid); // l'arme par défaut
    const dagger = new Weapon('dagger', 20, newGrid.grid);
    const axe = new Weapon('axe', 24, newGrid.grid);
    const hammer = new Weapon('hammer', 28, newGrid.grid);
    const sword = new Weapon('sword', 30, newGrid.grid);
    // dagger.getWeapon();
    // axe.getWeapon();
    // hammer.getWeapon();
    // sword.getWeapon();
    const player1 = new Player('Joueur 1', 100, club, newGrid.grid);
    const player2 = new Player('Joueur 2', 100, club, newGrid.grid);
    player1.placePlayer();
    player2.placePlayer();
    newGrid.player1 = player1;
    newGrid.player2 = player2;
    newGrid.gridActu = newGrid.grid;
    newGrid.weapons = new Array();
    newGrid.weapons.push(club);
    newGrid.weapons.push(dagger);
    newGrid.weapons.push(axe);
    newGrid.weapons.push(hammer);
    newGrid.weapons.push(sword);
    newGrid.setGame();
    let count = 0; // variable générale pour activer tel ou tel joueur dans la boucle. Si la variable reste à l'intérieur de la fonction, elle sera réinitialisé à zéro a chaque appel de la fonction. Le second joueur ne sera donc jamais appelé. Au contraire, si la variable est incrémenté en dehors de la fonction, le joueur 2 sera appelé.
    // whosTurn();
    // let player;
    // let count = this.count;
    // let count;
    // par défaut, le joueur 1 commence. Si c'est count est pair, c'est au tour du joueur 1, si c'est impair, c'est au tour du joueur 2
    if (count % 2 === 0) {
        newGrid.nowPlayer = player1;
    }
    else {
        newGrid.nowPlayer = player2;
    }
    if (newGrid.checkStartBattle() === true) {
        // si les deux joueurs sont cote a cote, la bataille commence
        newGrid.createTableHTML(); // affiche le mouvement du dernier joueur avant de commencer la bataille
        // battle();
    }
    else {
        // sinon continuez a afficher les mouvements disponibles et mettre a jour le code HTML
        newGrid.sendContentToPage();
    }
    // newGrid.nowPlayer = player1;
    // newGrid.sendContentToPage();
    const tds = document.querySelectorAll('td');
    tds.forEach((td) => {
        td.addEventListener('click', function (event) {
            if (count % 2 === 0) {
                newGrid.nowPlayer = player1;
            }
            else {
                newGrid.nowPlayer = player2;
            }
        });
    });
    newGrid.grid.forEach((el) => {
        el.forEach((le) => {
            if (le.inactiveCase !== false) {
                // console.log(le);
            }
            if (le.availableMove !== false) {
                // console.log(le);
            }
            if (le.weapon !== null) {
                // console.log(le);
            }
            if (le.player !== null) {
                // console.log(le);
            }
        });
    });
});
