// CODE UNDER MIT LICENSE
// BY GUILLEM URIEL BAGUR MOLL - 2021
// CONTACT ME VIA guillembagurmoll@gmail.com

// All option-inputs/selects
const appOptions = document.getElementsByClassName("app-option");
const coloredLetters = document.getElementById("colored-letters");

// Add highlighted letter button and input
const addLetter = document.getElementById("add-letter");
const letterToColor = document.getElementById("new-letter");
const chosenColor = document.getElementById("letter-color");

const appLang = document.getElementById("langsel");

// getKeyData function is in 'js/miscelaneous-functions.js'
let options = JSON.parse(getKeyData("sunflower-seeds", "{}", true));
const text = document.getElementById("text");

// Load user-selected options from localStorage
// The unique key is 'sunflower-seeds'. It's a JSON
const loadOptions = () => {
  // If a property already exists, get the saved value
  // If not, use the current value of the input
  for (let el of appOptions) {
    el.value = options.hasOwnProperty(el.id) ? options[el.id] : el.value;
  }
};

// Update options when input is changing
const updateOptions = () => {
  for (let el of appOptions) {
    // Every option-input id is the name of the property
    let styleProperty = el.id
      // This regex converts the dash-case to camelCase (used in vanilla JS to modify CSS)
      .replace(/-([a-zA-Z])/g, (letter) => `${letter.toUpperCase()}`)
      .replace(/\-/g, "");

    // If the property needs units, append 'px'
    let unit = el.classList.contains("option-input") ? "px" : "";
    changeStylesToClass("text", styleProperty, el.value, unit);
  }
};

// Save all the values when a change is done
const saveOptions = () => {
  for (let el of appOptions) {
    options[el.id] = el.value;
  }

  localStorage.setItem("sunflower-seeds", JSON.stringify(options));
};

const deleteColoredLetter = (el) => {
  // Ask for a confirmation to delete a letter configuration
  let ans = confirm(`¿Seguro que quieres eliminar la letra "${el.innerHTML}"?`);
  if (!ans) return;

  // If confirmed, delete the letter
  el.remove();
  delete options["letters"][el.innerHTML];
  localStorage.setItem("sunflower-seeds", JSON.stringify(options));
};

const showColoredLetters = () => {
  // Display all letters into the 'colored-letters' div
  for (let letter in options["letters"]) {
    // If a letter is empty, don't show
    if (letter == "") continue;

    let color = options["letters"][letter];
    coloredLetters.innerHTML += `<span class="colored-letter" onclick="deleteColoredLetter(this)" style="background-color:${color}">${letter}</span>`;
  }
};

// Highlight specific characters
const hlLetters = () => {
  // Load all letters/chars chosen by user (in options)
  // Struct: "char":"color"
  let letters = options.hasOwnProperty("letters") ? options["letters"] : {};
  let processedText = text.value;

  // Convert all chars to a string (we'll use that string in the regex)
  let chars = "";
  for (let letter in letters) {
    chars += letter;
  }

  // Global regex that turns every letter/char to its color
  let regex = new RegExp(`[${chars}]`, "gi");
  processedText = processedText
    .replace(/\r?\n|\r/gi, "<br>")
    .replace(regex, (char) => {
      let color = letters[char.toLowerCase()] ?? letters[char.toUpperCase()];
      return `<span style='color:${color}'>${char}</span>`;
    });

  document.getElementById("display-text").innerHTML = processedText;
};

// Load and prepare to display colored letters into div correctly
const renderLetters = () => {
  coloredLetters.innerHTML = "";
  options["letters"] = options.hasOwnProperty("letters")
    ? options["letters"]
    : {};
  options["letters"][letterToColor.value] = chosenColor.value;
  localStorage.setItem("sunflower-seeds", JSON.stringify(options));
  document.getElementById("display-text").style.visibility = "visible";
  hlLetters();
  showColoredLetters();
  updateOptions();
};

const saveOverwrite = () => {
  options["overwrite"] = overwrite.checked;
  localStorage.setItem("sunflower-seeds", JSON.stringify(options));
};

overwrite.addEventListener("click", saveOverwrite);

const updateText = () => {
  if (!options.hasOwnProperty("text")) {
    options["text"] = ["", ""];
  }

  options["text"][activeTab] =
    text.value != undefined || text.value != null ? text.value : "";

  localStorage.setItem("sunflower-seeds", JSON.stringify(options));
};

const checkUsedTimes = () => {
  const savedOptions =
    JSON.parse(localStorage.getItem("sunflower-seeds")) || {};
  savedOptions["used-times"] = savedOptions.hasOwnProperty("used-times")
    ? savedOptions["used-times"] + 1
    : 1;
  localStorage.setItem("sunflower-seeds", JSON.stringify(savedOptions));
  if (savedOptions.hasOwnProperty("show-share-app") && !savedOptions["show-share-app"]){
    checkNewUser();
    return;
  }
  if (savedOptions["used-times"] % 2 === 0) {
    openPopup("share-app");
    return;
  }

  checkNewUser();
};

document.getElementById("show-share-app").addEventListener("click", () => {
  const savedOptions =
    JSON.parse(localStorage.getItem("sunflower-seeds")) || {};
  savedOptions["show-share-app"] =
    !document.getElementById("show-share-app").checked;
  localStorage.setItem("sunflower-seeds", JSON.stringify(savedOptions));
});

const changeLang = () => {
  window.location.href = `index.php?lang=${appLang.value}`;
};

window.addEventListener("DOMContentLoaded", () => {
  checkUsedTimes();
  text.value = options.hasOwnProperty("text") ? options["text"][activeTab] : "";
  document.getElementById("text").value = cleanText(
    document.getElementById("text").value
  );
  loadOptions();
  updateOptions();
  addEventListenerToClass("change", "app-option", () => {
    saveOptions();
    updateOptions();
  });

  overwrite.checked = options["overwrite"] ?? false;

  // While changing a value, the option panel turns semi transparent
  addEventListenerToClass("mousedown", "option-input", () => {
    const optionsPanel = document.getElementById("options");
    optionsPanel.style.opacity = ".2";
  });

  // Then, 100% opac
  addEventListenerToClass("mouseup", "option-input", () => {
    const optionsPanel = document.getElementById("options");
    optionsPanel.style.opacity = "1";
  });

  text.addEventListener("change", updateText);

  addLetter.addEventListener("click", () => {
    if (letterToColor.value == "") {
      alert("Tienes que escribir un carácter");
      return;
    }

    renderLetters();
  });

  // The 'text' element is a textarea when user clicks on it.
  // When blur, it turns into a normal div, that can highlight letters.
  document.getElementById("text").addEventListener("blur", () => {
    document.getElementById("text").value = cleanText(
      document.getElementById("text").value
    );
    renderLetters();
  });
  document.getElementById("text").addEventListener("change", () => {
    document.getElementById("text").value = cleanText(
      document.getElementById("text").value
    );
  });

  appLang.addEventListener("blur", changeLang);

  document.getElementById("speech-highlight").addEventListener("change", () => {
    options["speech-highlight"] =
      document.getElementById("speech-highlight").checked;
    saveOptions();
    updateOptions();
  });

  document.getElementById("speech-highlight").checked =
    options["speech-highlight"];

  fromOrtografia = localStorage.getItem("from-ortografia");
  if (fromOrtografia) {
    text.value = fromOrtografia;
  }

  localStorage.removeItem("from-ortografia");
});

const saveText = () => {
  let history =
    JSON.parse(localStorage.getItem("sunflower-seeds"))["history"] ?? [];
  history.unshift(text.value);
  if (history.length > 10) {
    history = history.slice(0, 10);
  }

  options["history"] = history;
  console.log(options["history"], text.value);
  localStorage.setItem("sunflower-seeds", JSON.stringify(options));
};

document.getElementById("text").addEventListener("change", saveText);
