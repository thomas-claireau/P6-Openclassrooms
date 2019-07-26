function pickANumber() {
    // fonction pour créer un entier aléatoire
    return Math.floor(Math.random() * 10);
}
function potAsyncLoop(i, resume) {
    // evite de looper dans la methode placePlayer
    let condition = false;
    const max = 1000000;
    if (i < max) {
        if (i % 1000 === 0) {
            setTimeout(function () {
                potAsyncLoop(i + 1, resume);
            }, 0);
        }
        else {
            potAsyncLoop(i + 1, resume);
        }
    }
    else {
        resume;
    }
}
