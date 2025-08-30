
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT_ID.appspot.com",
  messagingSenderId: "YOUR_SENDER_ID",
  appId: "YOUR_APP_ID"
};

firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.firestore();

function login() {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  auth.signInWithEmailAndPassword(email, password)
    .then(user => {
      document.getElementById("login-section").style.display = "none";
      document.getElementById("study-section").style.display = "block";
      document.getElementById("user-email").textContent = user.user.email;
    });
}

function signup() {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  auth.createUserWithEmailAndPassword(email, password)
    .then(user => {
      document.getElementById("login-section").style.display = "none";
      document.getElementById("study-section").style.display = "block";
      document.getElementById("user-email").textContent = user.user.email;
    });
}

let flashcards = [
  { front: "Genotype", back: "The genetic makeup of an organism" },
  { front: "Phenotype", back: "The observable traits of an organism" }
];
let currentCard = 0;
let flipped = false;
let flashcardCount = 0;

function flipCard() {
  const card = document.getElementById("card");
  if (!flipped) {
    card.textContent = flashcards[currentCard].back;
    flipped = true;
    anime({ targets: '#card', rotateY: '180deg', duration: 500 });
    flashcardCount++;
    document.getElementById("flashcard-count").textContent = flashcardCount;
    sound.play();
  } else {
    card.textContent = flashcards[currentCard].front;
    flipped = false;
    anime({ targets: '#card', rotateY: '0deg', duration: 500 });
  }
}

function nextCard() {
  currentCard = (currentCard + 1) % flashcards.length;
  document.getElementById("card").textContent = flashcards[currentCard].front;
  flipped = false;
}

var sound = new Howl({
  src: ['assets/audio/flip.mp3']
});
