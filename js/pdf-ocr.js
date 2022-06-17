// CODE FROM https://www.educative.io/edpresso/how-to-create-a-pdf-viewer-in-javascript
// THANKS A LOT TO ITS AUTHOR

// intial params
let pdf ;
let isPageRendering;
let pageRenderingQueue = null;
let canvas;
let canvasContext;
let totalPages;
let currentPageNum = 1;

// events
window.addEventListener('load', function () {
    isPageRendering= false;
    pageRenderingQueue = null;
    canvas = document.getElementById('show-img');
    canvasContext = canvas.getContext('2d');
    
    //initEvents();
    //ocrPDF();
});

function initEvents() {
    let prevPageBtn = document.getElementById('prev_page');
    let nextPageBtn = document.getElementById('next_page');
    let goToPage = document.getElementById('go_to_page');
    prevPageBtn.addEventListener('click', renderPreviousPage);
    nextPageBtn.addEventListener('click',renderNextPage);
    goToPage.addEventListener('click', goToPageNum);
}

// init when window is loaded
function ocrPDF(url) {
    let option = {url};
    pdfjsLib.getDocument(option).promise.then(pdfData => {
        totalPages = pdfData.numPages;
        let pagesCounter= document.getElementById('total-pages-num');
        pagesCounter.textContent = totalPages;
        // assigning read pdfContent to global variable
        pdf = pdfData;
        renderPage(currentPageNum);
    });
}

function renderPage(pageNumToRender = 1, scale = 1) {
    isPageRendering = true;
    document.getElementById('current-page-num').textContent = pageNumToRender;
    pdf.getPage(pageNumToRender).then(page => {
        //document.getElementById("loader").style.display = "none";
        const viewport = page.getViewport({scale :1});
        canvas.height = viewport.height;
        canvas.width = viewport.width;  
        let renderCtx = {canvasContext, viewport};
        page.render(renderCtx).promise.then(()=> {
            url = canvas.toDataURL();
            drawImg();
            isPageRendering = false;
            if(pageRenderingQueue !== null) { // this is to check of there is next page to be rendered in the queue
                renderPage(pageNumToRender);
                pageRenderingQueue = null;
            }
        });        
    }); 
}

function renderPageQueue(pageNum) {
    if(pageRenderingQueue != null) {
        pageRenderingQueue = pageNum;
    } else {
        renderPage(pageNum);
    }
}

function renderNextPage(ev) {
    if(currentPageNum >= totalPages) {
        alert("This is the last page");
        return ;
    } 
    currentPageNum++;
    renderPageQueue(currentPageNum);
}

function renderPreviousPage(ev) {
    if(currentPageNum<=1) {
        alert("This is the first page");
        return ;
    }
    currentPageNum--;
    renderPageQueue(currentPageNum);
}

function goToPageNum(ev) {
    let numberInput = document.getElementById('page_num');
    let pageNumber = parseInt(numberInput.value);
    if(pageNumber) {
        if(pageNumber <= totalPages && pageNumber >= 1){
            currentPageNum = pageNumber;
            numberInput.value ="";
            renderPageQueue(pageNumber);
            return ;
        }
    }
        alert("Enter a valide page numer");
}