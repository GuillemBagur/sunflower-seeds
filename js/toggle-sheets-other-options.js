// The tabs are the little buttons at the top-left of #display-text
// They're used to change from page-1 to page-2
const tabs = document.getElementsByClassName("tab");
let activeTab = 0;
const overwrite = document.getElementById("overwrite");

const changeTab = (sum) => {
  activeTab = Math.abs((activeTab + sum) % 2).toString();
  document.getElementById(activeTab).click();
};

// Toggle the state (active/not-active) of a tab
const toggleTabs = (el) => {
  // First of all, leave all tabs as not-active
  activeTab = parseInt(el.id);
  for (let tab of tabs) {
    tab.classList.remove("active");
  }

  // Add to the clicked element the property active
  el.classList.add("active");
  // Load the data from that page
  let data = JSON.parse(getKeyData("sunflower-seeds", "{}", true));
  let savedText = data.hasOwnProperty("text") ? data["text"][activeTab] : "";
  savedText =
    data["text"][activeTab] == undefined ? "" : data["text"][activeTab];

  // Display the saved text on #display-text
  text.value = savedText;

  // Add styles to letters
  renderLetters();
};

// Delete the whole text of a page
const deleteText = () => {
  let ans = confirm("¿Seguro que quieres eliminar todo el texto de esta hoja?");
  if (!ans) return;
  // If confirmation == true
  text.value = ""; // Delete
  renderLetters(); // Just in case
  updateText(); // Save changes

  // Feedback
  toast.innerHTML = feedback["delete"];
  toast.classList.remove("hidden");
  sleep(2500).then(() => {
    toast.classList.add("hidden");
  });
};

// Copy the whole text of a page
const copyText = () => {
  text.select();
  text.setSelectionRange(0, 99999); /* For mobile devices */

  /* Copy the text inside the text field */
  navigator.clipboard.writeText(text.value);
  clearSelection();
  text.blur();

  toast.innerHTML = feedback["copy"];
  toast.classList.remove("hidden");
  sleep(3000).then(() => {
    toast.classList.add("hidden");
  });
};

const pasteText = () => {
  navigator.clipboard.readText().then(
    (cliptext) => {
      text.innerText = cliptext;
      console.log(cliptext);
    },
    (err) => console.log(err)
  );
};
