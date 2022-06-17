// Using https://allorigins.win/, to skip CORS crossorigin
// I recommend this site a lot, it's functional and OpenSource
// Thanks a lot to the creator: @gnuns

// SCRAPING TEXT FROM A WEBSITE

// Url of the website to scrape
let searchButton = document.getElementById('search-web');
let webUrl = document.getElementById('scraping-url');

const scrape = () => {
  if (!webUrl) {
    return;
  }

  toast.innerHTML = feedback['scraping'];
  toast.classList.remove('hidden');

  // The magic comes here!
  // I am using JQuery to get the entire html document
  $.getJSON('https://api.allorigins.win/get?url=' + encodeURIComponent(webUrl.value), function(data) {
    // Creates an HTML element to put the response inside
    let webToScrape = document.createElement('html');
    webToScrape.innerHTML = data.contents;

    // Getting all the elements from that HTML element to iterate on them
    let allEls = webToScrape.getElementsByTagName("*");

    // Creating a list to put inside all the elements that we want
    let textEls = [];
    for (let el of allEls) {
      // This regex is to get all 'p' elements and all headers (text nodes)
      if (el.tagName.match(/^(p|(h[1-6]))$/gi)) {
        textEls.push(el);
      }
    }

    // Converting all into a text string (separating each node with two backspaces)
    let text = '';
    textEls.map(el => text += el.innerText + '\n\n');
    document.getElementById('text').value = (overwrite.checked) ? text : document.getElementById('text').value+text;
    updateText();
    renderLetters();
    webUrl.value = null;
    hideAllPopups();
    toast.classList.add('hidden');
  });
}

searchButton.addEventListener('click', scrape);
