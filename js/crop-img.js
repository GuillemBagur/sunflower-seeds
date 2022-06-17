// get references to the canvasCrop and context
var canvasCrop = document.getElementById('show-img');
const originalCanvas = document.getElementById('canvas');
var ctx = canvasCrop.getContext("2d");
let canvasCropSrc = document.getElementById('ocr-src');

// style the context
ctx.strokeStyle = "#5401d0";
ctx.lineWidth = 2;

// calculate where the canvasCrop is on the window
// (used to help calculate mouseX/mouseY)
var canvasCropOffset = canvasCrop.getBoundingClientRect();
var offsetX = canvasCropOffset.left;
var offsetY = canvasCropOffset.top;


// this flage is true when the user is dragging the mouse
var isDown = false;

// these vars will hold the starting mouse position
var startX;
var startY;
var mouseX, mouseY;
let cropW, cropH;


// Get the coordinates and size of the rectangle that
// will replace the big image
const setOcrSrc = (ocrx1, ocry1, ocrx2, ocry2) =>{
  canvasCropSrc = document.getElementById('ocr-src');
  cropW = (ocrx2-ocrx1);
  cropH = (ocry2-ocry1);
  console.log(cropW, cropH);
  canvasCropSrc.width = cropW;
  canvasCropSrc.height = cropH;
  const contextOcr = canvasCropSrc.getContext('2d');
  const img = new Image();
  img.src = url;
  contextOcr.drawImage(img,
    ocrx1, ocry1,
    cropW, cropH,
    0, 0,
    canvasCropSrc.width, canvasCropSrc.height);
}


function handleMouseDown(e) {
    e.preventDefault();
    e.stopPropagation();
    console.log('hola1');
    // save the starting x/y of the rectangle
    startX = parseInt(e.clientX - offsetX);
    startY = parseInt(e.clientY - offsetY);

    // set a flag indicating the drag has begun
    isDown = true;
}

function handleMouseUp(e) {
    e.preventDefault();
    e.stopPropagation();

    // the drag is over, clear the dragging flag
    isDown = false;

    setOcrSrc(startX, startY, mouseX, mouseY);
}

function handleMouseOut(e) {
    e.preventDefault();
    e.stopPropagation();

    // the drag is over, clear the dragging flag
    isDown = false;
}

function handleMouseMove(e) {
    e.preventDefault();
    e.stopPropagation();

    // if we're not dragging, just return
    if (!isDown) {
      return;
    }

    // get the current mouse position
    mouseX = parseInt(e.clientX - offsetX);
    mouseY = parseInt(e.clientY - offsetY);
    // Put your mousemove stuff here

    // clear the canvasCrop
    ctx.clearRect(0, 0, canvasCrop.width, canvasCrop.height);
    drawImg();

    // calculate the rectangle width/height based
    // on starting vs current mouse position
    var width = mouseX - startX;
    var height = mouseY - startY;

    // draw a new rect from the start position
    // to the current mouse position
    ctx.strokeRect(startX, startY, width, height);
    x1 = startX
    y1 = startY
    x2 = width
    y2 = height

}

canvasCrop.addEventListener('mousedown', function(e) {
  handleMouseDown(e);
});

canvasCrop.addEventListener('mousemove', function(e) {
  handleMouseMove(e);
});

canvasCrop.addEventListener('mouseup', function(e) {
  handleMouseUp(e);
});

canvasCrop.addEventListener('mouseout', function(e) {
  handleMouseOut(e);
});

document.getElementById('btn-ocr').addEventListener('click', ()=>{
  console.log(cropW, cropH);
  let url = (!cropW || !cropH) ? originalCanvas.toDataURL() : canvasCropSrc.toDataURL(); // Depending on if user has selected a piece of text or the whole page
  let xd = (!cropW || !cropH) ? "whole" : "partial"; // Depending on if user has selected a piece of text or the whole page
  console.log(xd);
  ocr(url, 'spa');
});
