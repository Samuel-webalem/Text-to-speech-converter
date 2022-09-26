const textarea = document.querySelector(".text_input"),
  savebtn = document.querySelector('.save'),
  voicetype = document.querySelector('.select');

let synth = speechSynthesis;
let isspeaking = true;
function voices() {
  for (let voice of synth.getVoices()) {
    let select = voice.name === "Google US English" ? "selected" : "";
    let option = `<option value="${voice.name}">${voice.name} (${voice.lang})</option>`;
    voicetype.insertAdjacentHTML("beforeend",option)
  }
}
synth.addEventListener("voiceschanged",voices)
function textToSpeech(text) {
  let convert = new SpeechSynthesisUtterance(text);
  for (let voice of synth.getVoices()) {
    if (voice.name===voicetype.value) {
      convert.voice = voice;
    }
  }
  speechSynthesis.speak(convert);
  }
savebtn.addEventListener('click', (e) => {
  e.preventDefault();

  if (textarea.value !== "") {
    if (!synth.speaking) {
    textToSpeech(textarea.value);
    }
    if (textarea.value.length>80) {
      if (isspeaking) {
        synth.resume();
        isspeaking = false;
        savebtn.innerText = "Pause Speech";
      } else {
        synth.pause();
        isspeaking = true;
        savebtn.innerText = "Resume Speech";
      }

      setInterval(() => {
        if (!synth.speaking&&!isspeaking) {
          isspeaking = true;
          savebtn.innerText="Convert To Speech"
        }
      })
    }
    else {
       savebtn.innerText="Convert To Speech";
    }
  }

  })