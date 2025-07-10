const startBtn = document.getElementById("start-btn");
const cat = document.getElementById("cat");

const synth = window.speechSynthesis;
const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
recognition.lang = 'en-US';

startBtn.onclick = () => {
  recognition.start();
};

recognition.onstart = () => {
  startBtn.innerText = "Listening...";
  cat.classList.add("talking");
};

recognition.onend = () => {
  startBtn.innerText = "🎤 Speak";
  cat.classList.remove("talking");
};

recognition.onresult = (event) => {
  const text = event.results[0][0].transcript;
  console.log("Heard:", text);
  speak(text);
};

function speak(text) {
  const utter = new SpeechSynthesisUtterance(text);
  utter.pitch = 2; // High pitch for fun voice
  utter.rate = 1;
  synth.speak(utter);

  cat.classList.add("talking");
  utter.onend = () => cat.classList.remove("talking");
}
