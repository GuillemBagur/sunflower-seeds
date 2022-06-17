// Links to some external functions


// Remove unnecessary spaces
const cleanText = text =>{
  return text.replace(/\s\s+/g, ' ').replace(/^\s/, '');
}

// Get data from a key of localStorage by a secure way
// Maybe it could be entirely replaced by adding ?? [altValue]
// to all localStorage.getItem
const getKeyData = (keyName, def, ret) =>{
  if(localStorage.getItem(keyName) === null)
    localStorage.setItem(keyName, def);
  if(ret)
    return localStorage.getItem(keyName);
}


// https://stackoverflow.com/questions/7176908/how-can-i-get-the-index-of-an-object-by-its-property-in-javascript/
// It's like indexOf but related to objects
function findWithAttr(array, attr, value) {
  for(let i = 0; i < array.length; i ++) {
    if(array[i][attr] === value) {
      return i;
    }
  }
  return -1;
}

// This function filters which characters put by user is a letter/num (to be able to color)
function checkAvailableLetter(evt){
  var code = (evt.which) ? evt.which : evt.keyCode;
  if(code<=32) {
    return false;
  } else {
    return true;
  }
}


// A function to add an eventListener to all elements that contain a specific class
const addEventListenerToClass = (evt, className, func) =>{
  let els = document.getElementsByClassName(className);
  for(let el of els){
    el.addEventListener(evt, func);
  }
}


// Same as previous, but to change the innerHTML
const changeInnerHTMLToClass = (className, inner) =>{
  let els = document.getElementsByClassName(className);
  for(let el of els){
    el.innerHTML = inner;
  }
}


// Same as previous, but to change the syles
const changeStylesToClass = (className, style, value, unit) =>{
  let els = document.getElementsByClassName(className);
  for(let el of els){
    el.style[style] = `${value}${unit}`;
  }
}


// https://stackoverflow.com/questions/6562727/is-there-a-function-to-deselect-all-text-using-javascript
// Deselect all text to select the text inside #display-text and copy it
function clearSelection() {
 if (window.getSelection) {window.getSelection().removeAllRanges();}
 else if (document.selection) {document.selection.empty();}
}


// https://stackoverflow.com/questions/951021/what-is-the-javascript-version-of-sleep/951057#951057
// Typical sleep function
function sleep (time) {
  return new Promise((resolve) => setTimeout(resolve, time));
}


// https://stackoverflow.com/a/36281449
// Get the b64 code of an image
function getBase64(file) {
   var reader = new FileReader();
   reader.readAsDataURL(file);
   reader.onload = function () {
     return reader.result;
   };
   reader.onerror = function (error) {
     console.log('Error: ', error);
   };
}

const copyFrom = elId =>{
  const el = document.getElementById(elId);
  el.focus();
  el.select();
  el.setSelectionRange(0, 99999); /* For mobile devices */

  /* Copy the text inside the text field */
  navigator.clipboard.writeText(el.value);
  clearSelection();
  el.blur();

  toast.innerHTML = feedback['copy'];
  toast.classList.remove('hidden');
  sleep(3000).then(() => {
    toast.classList.add('hidden');
  });
}


const clearInput = id =>{
  const el = document.getElementById(id);
  if(!el) return;
  el.value = "";
}