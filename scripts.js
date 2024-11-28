const cards = document.querySelectorAll('.memory-card');

let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;
let matchedCards = 0; // Compte le nombre de paires trouvées
const totalPairs = cards.length / 2; // Nombre total de paires

function flipCard() {
  if (lockBoard) return;
  if (this === firstCard) return;

  this.classList.add('flip');

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

  matchedCards++; // Incrémente le nombre de paires trouvées

  if (matchedCards === totalPairs) {
    clearInterval(chrono); // Arrête le timer
    para.innerHTML += " - Bravo, toutes les cartes sont retournées !";
    showEndMessage(); // Affiche le message de fin du jeu
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



const dialog = document.querySelector("dialog");
const closeButton = document.querySelector("dialog button");

window.onload = function(){
  dialog.showModal();
}
// Le bouton "Fermer" ferme le dialogue
closeButton.addEventListener("click", () => {
  dialog.close();
});

let seconde = 0;
let para = document.getElementById("timer")
let chrono = window.setInterval(tictictic, 1000);

function tictictic() {
  seconde++;
  para.innerHTML = "temps : " + seconde + "s"; // Met à jour le contenu du timer
}

document.getElementById("restart-button").addEventListener("click", restartGame);

function restartGame() {
  // Réinitialiser le compteur de paires et le timer
  matchedCards = 0;
  seconde = 0;
  para.innerHTML = "temps : " + seconde + "s";

  // Masquer le message de fin
  document.getElementById('end-game-message').style.display = 'none';

  // Réactiver les cartes et réinitialiser leur état
  cards.forEach(card => {
    card.classList.remove('flip');
    card.addEventListener('click', flipCard);
  });

  // Mélanger les cartes
  shuffle();

  // Redémarrer le timer
  clearInterval(chrono);
  chrono = setInterval(tictictic, 1000);
}

function showEndMessage() {
  const endMessage = document.getElementById('end-game-message');
  const finalTime = document.getElementById('final-time');
  finalTime.textContent = `${seconde}s`;
  endMessage.style.display = 'block';
}