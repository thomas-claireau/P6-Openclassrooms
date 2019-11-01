# P6-Openclassrooms - Créez un jeu de plateau tour par tour en JS

[![Codacy Badge](https://api.codacy.com/project/badge/Grade/d5e2855738924b4490296eebdf8016f2)](https://app.codacy.com/app/thomas-claireau/P6-Openclassrooms?utm_source=github.com&utm_medium=referral&utm_content=thomas-claireau/P6-Openclassrooms&utm_campaign=Badge_Grade_Dashboard)

La description de mon projet est accessible en suivant [ce lien](https://github.com/thomas-claireau/P6-Openclassrooms/wiki/Introduction). Il vous redirigera vers le wiki du projet.

Pour obtenir le projet :

- sans le wiki :

````text
git clone https://github.com/thomas-claireau/P6-Openclassrooms.git
````

- avec le wiki :

````text
git clone --recurse-submodules https://github.com/thomas-claireau/P6-Openclassrooms.git
````

## Voici le brief :

Vous avez jusqu'ici développé des petites applications JavaScript. Il faut maintenant vous lancer dans la création d'un projet plus complet, plus solide... bref plus costaud. ;)

Ce projet consistera à créer un jeu en ligne en JavaScript dans lequel 2 joueurs évoluent chacun leur tour pour s'affronter. Comme dans Highlander, il ne peut en rester qu'un !

## Etape 1 : génération de la carte

Commencez par générer aléatoirement la carte du jeu. Chaque case peut être soit :

Vide

Inaccessible (grisée)

Sur la carte, un nombre limité d’armes (4 maximum) sera placé aléatoirement et pourra être récolté par les joueurs qui passeraient dessus.

Vous inventerez au moins 4 types d’arme dans le jeu, avec des dégâts différents. L’arme par défaut qui équipe les joueurs doit infliger 10 points de dégâts. Chaque arme a un nom et un visuel associé.

Le placement des deux joueurs est lui aussi aléatoire sur la carte au chargement de la partie. Ils ne doivent pas se toucher (ils ne peuvent pas être côte à côte).

Fichiers à fournir :

Code HTML/CSS/JS du projet

## Etape 2 : les mouvements

A chaque tour, un joueur peut se déplacer d’une à trois cases (horizontalement ou verticalement) avant de terminer son tour. Il ne peut évidemment pas passer à travers un obstacle.

Si un joueur passe sur une case contenant une arme, il laisse son arme actuelle sur place et la remplace par la nouvelle.

Fichiers à fournir :

Code HTML/CSS/JS du projet

## Etape 3 : le combat !

Si les joueurs se croisent sur des cases adjacentes (horizontalement ou verticalement), un combat à mort s’engage.

Lors d'un combat, le fonctionnement du jeu est le suivant :

Chacun attaque à son tour

Les dégâts infligés dépendent de l’arme possédée par le joueur

Le joueur peut choisir d’attaquer ou de se défendre contre le prochain coup

Lorsque le joueur se défend, il encaisse 50% de dégâts en moins qu’en temps normal

Dès que les points de vie d’un joueur (initialement à 100) tombent à 0 , celui-ci a perdu. Un message s’affiche et la partie est terminée.

Fichiers à fournir :

Code HTML/CSS/JS du projet

### ✔️ Projet validé

Commentaires de l'évaluateur

1. Évaluation globale du travail réalisé par l’étudiant (en spécifiant les critères non-validés si le projet est à retravailler) :

L'objectif de cette échange avec Thomas était de valider que les points suivants sont acquis:

 

Concevoir une architecture d'application JavaScript réutilisable
Développer une application JavaScript orientée objet
Mettre en oeuvre la bibliothèque jQuery dans une application web
A l'évidence ces points sont parfaitement maîtrisés.

 

2. Évaluation des livrables selon les critères du projet :

Le code utilise les concepts de programmation orientée objet qui sont parfaitement compris
Il est possible de définir certains paramètres clés de l'application sans avoir à refactoriser du code et d'ailleurs Thomas en a fait un bonus de son projet puisqu'il a ajouter une interface afin de personnaliser les éléments du jeu.
Thomas est capable d'expliquer l'architecture mise en place
Concernant les aspects sur jQuery, Thomas a décidé de ne pas l'utiliser dans le projet. Evidemment c'est un enjeu de l'évaluation mais :

il a parfaitement su justifier son choix
il a su me démontrer lors de nos échanges hors enregistrement qu'il maîtrise parfaitement l'usage de jQuery et qu'il aurait très bien pu l'utiliser dans ce projet.
3. Évaluation de la présentation orale et sa conformité aux attentes :

La présentation de Thomas était très bonne : claire, fluide et appuyée sur un powerpoint.
Le temps imparti a bien été maîtrisé.
Les réponses étaient pertinentes
4. Évaluation des nouvelles compétences acquises par l'étudiant :

La programmation orientée objet est parfaitement acquise.
5. Points positifs (au moins 1) :

Le gameplay est original, avec la possibilité d'attaquer juste après s'être déplacé
Thomas sait apporter des arguments pour défendre ses idées
Le code est propre
6. Axes d'amélioration (au moins 1) :

Essayer de respecter un peu plus l'énoncé, même si ça va à l'encontre de vos principes de développeur
C'est donc un excellent travail proposé par Thomas qui valide bien évidement ce projet.


### 🎬 Cliquez sur l'image ci-dessous pour voir la vidéo de soutenance 👇

[![Regarder la vidéo de soutenance](https://img.youtube.com/vi/7127iclzTKo/maxresdefault.jpg)](https://youtu.be/7127iclzTKo)
