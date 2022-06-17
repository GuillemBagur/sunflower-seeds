// AMAZING LIBRARY CREATED BY Binny V A
// http://www.openjs.com/scripts/events/keyboard_shortcuts/#
// THANK YOU FROM ALL SUNFLOWERSEEDS TEAM



document.addEventListener('DOMContentLoaded', ()=>{
  shortcut.add("Control+S", textToSpeech);
  shortcut.add("Control+Left", ()=>changeTab(-1), {'disable_in_input':true});
  shortcut.add("Control+Right", ()=>changeTab(21), {'disable_in_input':true});
  shortcut.add("Control+E", ()=>text.click());
  shortcut.add("Control+C", copyText, {'disable_in_input':true});
  shortcut.add("Control+Backspace", deleteText, {'disable_in_input':true});
});
