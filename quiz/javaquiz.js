class Question {
    constructor(text, choices, answer) {
      this.text = text;
      this.choices = choices;
      this.answer = answer;
    }
    isCorrectAnswer(choice) {
      return this.answer === choice;
    }
  }
  let questions = [
    new Question("Qui est le plus grand marqueur de tout les temps dans la LNH en carrière", ["Mario Lemieux", "Steve Shutt", "Wayne Gretzky", "Alfie Turcotte"], "Wayne Gretzky"),
    new Question("Quelle est l'équipe ayant gagné le plus grand nombre de coupe Stanley", ["Canadiens de Montreal","Huricannes de la Caroline", "Rangers de New York", "Whalers de Hartford"], "Canadiens de Montreal"),
    new Question("Qui est le Quebecois ayant marqué 50 buts en 50 parties", ["Mario Lemieux","Mike Bossy", "Gilbert Perrault", "Guy Lafleur"], "Mike Bossy"),
    new Question("Quelle défenseur de la NHL qui a joué 26 saisons", ["Raymond Bourque","Tim Hortons", "Chris Cherlios", "Doug Harvey"], "Chris Cherlios"),
    new Question("Qui détient le record du plus grand nombre de minutes de punition en carrière", ["Dale Hunter", "Dave Williams", "Tie Domi", "Rob Ray"], "Dave Williams"),
    new Question("Qui a marqué le plus de point lors de sa saison recrue", ["Teemu Selanne","Peter Stastny", "Alex Ovechkin", "Dale Hawerchuk"], "Teemu Selanne"),
    new Question("Qui est le defenseur avec le plus grand nombre de but en carrère", ["Phil Housley","Al MacInnis", "Paul Coffey", "Raymond Bourque"], "Raymond Bourque"),
    new Question("Qui est le joueurs avec le plus grand nombre de partie jouer consécutive en carrière", ["Doug Jarvis","Keith Yandle", "Phil Kessel", "Garry Unger"], "Phil Kessel")
  ];

  let questions2 = [
    new Question("Quelle équipe a remporté la Coupe Stanley en 2021 ?", ["Lightning de Tampa Bay", "Avalanche du Colorado", "Golden Knights de Vegas", "Bruins de Boston"], "Lightning de Tampa Bay"),
    new Question("Quelle équipe a le plus de titres de division ?", ["Canadiens de Montreal", "Blackhawks de Chicago", "Bruins de Boston", "Red Wings de Detroit"], "Red Wings de Detroit"),
    new Question("Quelle équipe est surnommée les 'Maples Leafs' ?", ["Canadiens de Montréal", "Red Wings de Detroit", "Maple Leafs de Toronto", "Rangers de New York"], "Maple Leafs de Toronto"),
    new Question("Quelle équipe a été fondée en 1972 ?", ["Sharks de San José", "Blues de Saint-Louis", "Capitals de Washington", "Flames de Calgary"], "Sharks de San José"),
    new Question("Quel est le plus vieux club de la LNH ?", ["Canadiens de Montréal", "Bruins de Boston", "Rangers de New York", "Maple Leafs de Toronto"], "Canadiens de Montréal")
  ];
  
  class Quiz {
    constructor(questions) {
      this.score = 0;
      this.questions = questions;
      this.currentQuestionIndex = 0;
    }
    getCurrentQuestion() {
      return this.questions[this.currentQuestionIndex];
    }
    guess(answer) {
      if (this.getCurrentQuestion().isCorrectAnswer(answer)) {
        this.score++;
      }
      this.currentQuestionIndex++;
    }
    hasEnded() {
      return this.currentQuestionIndex >= this.questions.length;
    }
  }
  
  const display = {
    elementShown: function(id, text) {
      let element = document.getElementById(id);
      element.innerHTML = text;
    },
    endQuiz: function() {
      endQuizHTML = `
        <h1>Quiz terminé !</h1>
        <h3> Votre score est de : ${quiz.score} / ${quiz.questions.length}</h3>`;
      this.elementShown("quiz", endQuizHTML);
      
      const messages = messageQuiz();
      const messagesss = document.getElementById("messagesss");
      messagesss.textContent = `${messages}`;

    },
    question: function() {
      this.elementShown("question", quiz.getCurrentQuestion().text);
    },
    choices: function() {
      let choices = quiz.getCurrentQuestion().choices;
  
      guessHandler = (id, guess) => {
        document.getElementById(id).onclick = function() {
          quiz.guess(guess);
          quizApp();
        }
      }
      // affichage choix + prise en compte du choix
      for(let i = 0; i < choices.length; i++) {
        this.elementShown("choice" + i, choices[i]);
        guessHandler("guess" + i, choices[i]);
      }
    },
    progress: function() {
      let currentQuestionNumber = quiz.currentQuestionIndex + 1;
      this.elementShown("progress", "Question " + currentQuestionNumber + " sur " + quiz.questions.length);
    },
  };
  
  // Game logic
  quizApp = () => {
    if (quiz.hasEnded()) {
      display.endQuiz();
    } else {
      display.question();
      display.choices();
      display.progress();
      document.getElementById("backToMenuBtn").style.display = "inline-block";
    } 
  }
  // Create Quiz
  let quiz = new Quiz(questions);
  quizApp();

  function messageQuiz(){

  
    if(quiz.score = quiz.questions,length){
      return "Félicitation vous connaîssez bien les records"
   }
    else{
      return "Vous pouvez recommencer"
    }
  }

  document.getElementById("quiz1Btn").onclick = function(){
    quiz = new Quiz (questions);
    document.getElementById("quizMenu").style.display = "none";
    document.getElementById("quiz").style.display = "block";
    quizApp();
  }

  document.getElementById("quiz2Btn").onclick = function(){
    quiz = new Quiz (questions2);
    document.getElementById("quizMenu").style.display = "none";
    document.getElementById("quiz").style.display = "block";
    quizApp();
  }

  document.getElementById("records").onclick = function(){
    quiz = new Quiz (questions);
    document.getElementById("quizMenu").style.display = "none";
    document.getElementById("quiz").style.display = "block";
    quizApp();
  }

  document.getElementById("backToMenuBtn").onclick = function(){
    document.getElementById("quizMenu").style.display = "block";
    document.getElementById("quiz").style.display = "none";
    document.getElementById("backToMenuBtn").style.display = "none";
  }