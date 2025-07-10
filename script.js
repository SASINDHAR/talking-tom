const startBtn = document.getElementById("start-btn");
const cat = document.getElementById("cat");
const mouth = document.getElementById("mouth");
const textOutput = document.getElementById("text-output");

const synth = window.speechSynthesis;
const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
recognition.lang = 'en-US';

let listening = false;

startBtn.onclick = () => {
  if (!listening) {
    recognition.start();
  } else {
    recognition.stop();
  }
};

recognition.onstart = () => {
  listening = true;
  startBtn.innerText = "🛑 Stop";
  cat.classList.add("talking");
  mouth.style.opacity = 1;
  textOutput.innerText = "Listening...";
};

recognition.onend = () => {
  listening = false;
  startBtn.innerText = "🎤 Speak";
  cat.classList.remove("talking");
  mouth.style.opacity = 0;
};

recognition.onresult = (event) => {
  const text = event.results[0][0].transcript;
  textOutput.innerText = "You said: " + text;
  speak(text);
};

function speak(text) {
  const utter = new SpeechSynthesisUtterance(text);
  utter.pitch = 1.8; // higher pitch
  utter.rate = 1.1;
  synth.speak(utter);

  mouth.style.opacity = 1;
  utter.onend = () => {
    mouth.style.opacity = 0;
  };
}
