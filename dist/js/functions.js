function pickANumber() {
    // fonction pour créer un entier aléatoire
    return Math.floor(Math.random() * 10);
}
function potAsyncLoop(i, resume) {
    let condition = false;
    const max = 1000000;
    if (i < max) {
        if (condition) {
            someAsyncFunc(function (err, result) {
                potAsyncLoop(i + 1, callback);
            });
        }
        else {
            if (i % 1000 === 0) {
                setTimeout(function () {
                    potAsyncLoop(i + 1, resume);
                }, 0);
            }
            else {
                potAsyncLoop(i + 1, resume);
            }
        }
    }
    else {
        resume;
    }
}
