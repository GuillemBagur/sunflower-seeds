const savedTexts = document.getElementById('saved-texts');

const loadHistory = () =>{
    savedTexts.addEventListener('click', (e) =>{
        if(!e.target.classList.contains("saved-text")) return;
        text.value = e.target.dataset.text;
    });
    savedTexts.innerHTML = "";
    for(let text of options["history"]){
        savedTexts.innerHTML += `<li class="saved-text" data-text="${text}">${text}</li>`;
    }
}

document.addEventListener('DOMContentLoaded', loadHistory);