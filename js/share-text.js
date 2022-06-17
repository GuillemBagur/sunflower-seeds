const execShare = () => {
  const currentUrl = document.location.href;
  const alreadyGotCode = currentUrl.includes("?code=");
  if (alreadyGotCode) {
    openPopup("share-text");
  } else {
    window.location.href = `get-share-code.php?text=${text.value}`;
  }
};


const getTextFromCode = () =>{
  const code = document.getElementById('shared-code').value;
  window.location.href = window.location.href.split('?')[0] + `?text=${code}`;
}