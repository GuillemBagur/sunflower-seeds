// CODE UNDER MIT LICENSE
// BY GUILLEM URIEL BAGUR MOLL - 2021
// CONTACT ME VIA guillembagurmoll@gmail.com


// Background element to hide popups when clicking on it
const bg = document.getElementById('background');

// Buttons to open options pannel
// Every button will have an anchor to the part it's making reference
const btnOptions = document.getElementsByClassName('btn-options');
const btnHistory = document.getElementsByClassName('btn-history');

const hideAllPopups = () =>{
  // All .popup elements will be hidden when starting
  // This popups will represent windows like: options, read panel, etc.
  const popups = document.getElementsByClassName('popup');
  for(let el of popups){
    el.style.visibility = 'hidden';
  }


  // Hidding the dark-background layer
  bg.style.visibility = 'hidden';
}

const openPopup = id =>{
  let el = document.getElementById(id).style.visibility = 'visible';
  bg.style.visibility = 'visible';
}

const checkNewUser = () =>{
  //let noticeBoard = document.getElementById('notice-board');
  let lastSession = localStorage.getItem('last-session');

  // Check if it's a new user
  if(!lastSession){
    openPopup('notice-board');
  }
}

// Hide all windows when clicking on .bg (dark background)
window.addEventListener('DOMContentLoaded', ()=>{
  hideAllPopups();
  bg.addEventListener('click', () => hideAllPopups());
  addEventListenerToClass('click', 'btn-options', () => {
    renderLetters();
    openPopup('options');
  });

  addEventListenerToClass('click', 'btn-history', () => openPopup('text-history'));

  addEventListenerToClass('click', 'btn-read', () => openPopup('read'));
  addEventListenerToClass('click', 'btn-import-text', () => openPopup('import-text'));
  addEventListenerToClass('click', 'btn-share-text', execShare);
  document.getElementById('btn-menu').addEventListener('click', () => openPopup('menu'));
});
