const cards = document.querySelectorAll('.memory-card');

let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;
let matchedCards = 0; // Compte le nombre de paires trouvées
const totalPairs = cards.length / 2; // Nombre total de paires

function flipCard() {
  if (lockBoard) return;
  if (this === firstCard) return;

 if (!timerDebut) {
    chrono = setInterval(CalculerTemps, 1000);
    timerDebut = true;
  } // Empêche le redémarrage du timer

  this.classList.add('flip');
  // debute le compteur et compteur le nombre de carte retourner
  CompterNombreCarteRetourner();


  if (!hasFlippedCard) {
    // first click
    hasFlippedCard = true;
    firstCard = this;

    return;
  }

  // second click
  secondCard = this;

  checkForMatch();
}

function checkForMatch() {
  let isMatch = firstCard.dataset.framework === secondCard.dataset.framework;

  isMatch ? disableCards() : unflipCards();
}


function disableCards() {
  firstCard.removeEventListener('click', flipCard);
  secondCard.removeEventListener('click', flipCard);

  resetBoard();

  matchedCards++; // Calcule le nombre de paires trouvées

  if (matchedCards === totalPairs) {
    clearInterval(chrono); // Arrête le timer
    temps.innerHTML += " - Bravo, toutes les cartes sont retournées !";
    MessageFin(); // Affiche le message de fin du jeu
  }

}

function unflipCards() {
  lockBoard = true;

  setTimeout(() => {
    firstCard.classList.remove('flip');
    secondCard.classList.remove('flip');

    resetBoard();
  }, 1500);
}

function resetBoard() {
  [hasFlippedCard, lockBoard] = [false, false];
  [firstCard, secondCard] = [null, null];
}

function shuffle() {
  // Réinitialiser l'ordre des cartes en les mélangeant à chaque redémarrage
  const cardArray = Array.from(cards);  // Convertit NodeList en tableau
  cardArray.forEach(card => {
    let randomPos = Math.floor(Math.random() * cardArray.length);
    card.style.order = randomPos;
  });
}

shuffle();

cards.forEach(card => card.addEventListener('click', flipCard));


//Je créer ces varibale pour le dialogue pour qu'il s'ouvrent au chargement de la page et le bouton pour fermer le dialogue.
//Const dialog pour selectionner le dialogue
const dialog = document.querySelector("dialog");
//Const BoutonFermer pour selectionner le bouton qui va servir a fermer le bouton du dialogue.
const BoutonFermer = document.querySelector("dialog button");

//ceci ouvre la fenêtre du dialogue au chargement de la page
window.onload = function(){
  if(localStorage.getItem("fenetre") == "oui"){
    dialog.showModal();
  }
  
}
// Le bouton "Fermer" ferme le dialogue
BoutonFermer.addEventListener("click", () => {
  dialog.close();
});

//Je créer ces variable pour le compteur de secondes ou bien le timer.
let chrono;
let seconde = 0;
let temps = document.getElementById("timer")
let timerDebut = false;

function CalculerTemps() { 
  seconde++; //Ceci est lorsque la function est utiliser, le seconde augmente
  temps.innerText = "Temps : " + seconde + "s"; 
}

// je prend le bouton recommencer pour ensuit lui dire lorsque je clique dessus, il lance la fontion recommencer la partie
document.getElementById("boutonRecommencer").addEventListener("click", restartGame);

function restartGame() {
  // Réinitialiser le compteur de paires et le timer
  matchedCards = 0;
  seconde = 0;
  temps.innerHTML = "temps : 0s" ;
  totalCarteRetourner = 0;
  CarteChaqueFlip.innerHTML = "Nombre de carte retourner : " + totalCarteRetourner;

  // Réinitialiser le timer
  timerDebut = false;
  clearInterval(chrono); // Arrêter l'ancien timer

  //Recommence le compteur de carte retourner
  totalCarteRetourner = 0;

  // Masquer le message de fin
  document.getElementById('finMessage').style.display = 'none';

  // Réactiver les cartes et réinitialiser
  cards.forEach(card => {
    card.classList.remove('flip');
    card.addEventListener('click', flipCard);
  });

  // reMélanger les cartes
  shuffle();


}

//Cette fonction affiche un message a la fin de la partie
function MessageFin() {
  //Const finMessage est pour faire afficher le message de fin lorsque la partie est terminer
  const finMessage = document.getElementById('finMessage');
  //La const final-time, selection le message tu temps final et l'affiche avec le nombre de seconde total que l'utilisateur a pris pour terminer le jeu
  const finalTime = document.getElementById('final-time');

  const messages = document.getElementById("message");
  //Ceci affiche le nombre de seconde que l'utilisateur a pris pour terminer le jeu
  finalTime.textContent = `${seconde}s`;
  //Ceci affiche le nombre de carte total retourner au courant de la partie
  CarteRetourner.textContent = ` Nombre de carte total retourner : ${totalCarteRetourner}`;
  //Ceci ajoute le texte du nombre de carte total retourner dans le message de fin
  finMessage.appendChild(CarteRetourner);

  const message = messageCarteRetourner();
  messages.textContent = `${message}`;
  
  // Ceci modifie le message de fin, a la fin de la partie, le message devient visible
  finMessage.style.display = 'block';
}

//Cette const, selectionne le texte de carte retourner
const CarteChaqueFlip = document.getElementById("carteRetourner")
const CarteRetourner = document.getElementById("messagess");
let totalCarteRetourner = 0;

// Ceci met a jour le compteur total de carte que j'ai
function CompterNombreCarteRetourner(){
  totalCarteRetourner++;  // Incrémente le nombre de cartes retournées
  CarteChaqueFlip.innerHTML = "Nombre de carte retournée : " + totalCarteRetourner;  // Met à jour l'affichage
}

//Calcule le nombre de carte retourner a chaque fois que l'utilisateur tourne une carte
function CarteRetourne(){
  totalCarteRetourner++;
}

//Fonction pour afficher un message si le nombre de carte retourner est trop élevé
function messageCarteRetourner() {

  if (totalCarteRetourner >= 30) {
    return "Il y a place à l'amélioration.";
  } 
  else if (totalCarteRetourner >= 20) {
    return "C'est bien ! très bien";
  }
   else {
    return "Félicitations ! Vous êtes très bon.";
  }
}
const fenetre = document.getElementById("fenêtre");

//Creer une variable pour le localstorage;
let fenetres = localStorage.getItem("fenetre");

// Si le localstorage fenetre est null donc si il a rien ilest la
if(localStorage.getItem("fenetre") === null){
  localStorage.setItem("fenetre", "oui");
}
// Function de si on click sur ne plus afficher le message, il n'apparaiteras plus
function clickNon(){
  localStorage.setItem("fenetre", "non");
  dialog.close();
}
fenetre.addEventListener("click",clickNon )

const effacerStockage = document.getElementById("effacer");

// ici est si j'appuie sur la touche effacer le stockage, je vais effacer le stockage et plus aucune information ne seras stocker
function stockage(){
  localStorage.clear();
}
// efface le stockage lorsque j'appuie sur effacer le stockage
effacerStockage.addEventListener("click",stockage);