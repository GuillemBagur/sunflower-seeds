// CODE UNDER MIT LICENSE
// BY GUILLEM URIEL BAGUR MOLL - 2021
// CONTACT ME VIA guillembagurmoll@gmail.com

const langSel = document.getElementById('audio-langsel');
const accentSel = document.getElementById('audio-accentsel');
toast = document.getElementById('modal');

const langNames = {
  'es': 'Espa&ntildeol',
  'en': 'English',
  'de': 'Deutsch',
  'fr': 'Fran&ccedilais',
  'ca': 'Catal&agrave;',
  'pt': 'Portugu&ecircs',
  'gl': 'Galego',
  'eu': 'Euskara'
}

const accentNames = {
  'ES': 'Espa&ntildea',
  'US': 'United States',
  'GB': 'Great Britain',
  'DE': 'Deutschland',
  'FR': 'France',
  'PT': 'Portugal',
  'BR': 'Brasil'
}

let btnPlay = document.getElementsByClassName('btn-speech');
let r = 1;

let textSrc, voices, synth, voicesInLang, msg, uniqueLangs = [];
msg = new SpeechSynthesisUtterance();

window.speechSynthesis.onvoiceschanged = () => {
  speechSynthesis.cancel();
  voices = window.speechSynthesis.getVoices();
  voicesInLang = voices.filter(voice => voice.lang.includes('es'));
  for (voice of voices) {
    !uniqueLangs.includes(voice.lang.split('-')[0]) ?
      uniqueLangs.push(voice.lang.split('-')[0]) :
      console.log("This item already exists");
  }

  console.log(uniqueLangs);
  langSel.innerHTML = '';
  for (lang of uniqueLangs) {
    let altLang = (langNames[lang] != undefined) ?
      langNames[lang] :
      lang;

    console.log(lang);
    langSel.innerHTML += `<option value="${lang}">${altLang}</option>`;
  }


  updateAccents();
  //console.log(uniqueLangs);
  //console.log(voices);
  let audioLang = getKeyData('audio-lang', 'es', true);
  langSel.value = audioLang;

  //console.log(msg.voice)
  //console.log(voices.find(voice => voice.name == getKeyData('audio-accent', '{}', true)));
};

const updateAccents = () => {
  accents = voices.filter(voice => voice.lang.includes(
    langSel.value));
  accentSel.innerHTML = '';
  for (accent of accents) {
    let altAccent = (accentNames[accent.lang.split('-')[1]] != undefined) ?
      accentNames[accent.lang.split('-')[1]] :
      accent.lang.split('-')[1];
    //console.log(accent.name);
    accentSel.innerHTML +=
      `<option value='${accent.name}'>${altAccent}</option>`;
  }

  updateVoice();
}


const updateVoice = () => {
  let voiceName = getKeyData('audio-accent', '{}', true);
  let chosenVoice = voices[findWithAttr(voices, 'name', voiceName)];
  //console.log(chosenVoice);
  return chosenVoice;
}

langSel.addEventListener('change', () => {
  localStorage.setItem('audio-lang', langSel.value);
  updateAccents();
});
accentSel.addEventListener('change', () => {
  localStorage.setItem('audio-accent', accentSel.value);
  updateVoice();
});

const end = () => {
  toast.classList.add('hidden');
  r = 1;
  speechSynthesis.cancel();
  changeInnerHTMLToClass('btn-speech', `<i class="icofont-audio"></i> ${speechButtonInner}`);
}

const textToSpeech = () => {
  console.log(activeTab);
  if (r == 1) {
    msg.rate = parseFloat(document.getElementById('speech-rate').value);
    toast.innerHTML = feedback['speech'];
    toast.classList.remove('hidden');
    r = 0;
    textSrc = document.getElementById('text').value;
    msg.text = textSrc;
    msg.voice = updateVoice();
    window.speechSynthesis.speak(msg);
    changeInnerHTMLToClass('btn-speech', `<i class="icofont-close"></i> ${speechButtonInner}`);
  } else if (r == 0) {
    end();
  }
}

msg.onend = end;

addEventListenerToClass('click', 'btn-speech', textToSpeech);