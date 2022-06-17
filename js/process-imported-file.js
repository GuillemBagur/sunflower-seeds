// CODE UNDER MIT LICENSE
// BY GUILLEM URIEL BAGUR MOLL - 2021
// CONTACT ME VIA guillembagurmoll@gmail.com

// TESSERACT.JS IS AN EXTERNAL OPEN SOURCE LIBRARY
// THANKS TO ITS CREATOR(S) @NAPTHA (YOU CAN FIND HIM ON GITHUB)


const fileInput = document.getElementById('import-file');
const showImg = document.getElementById('canvas');
let prevImportVal;

// All supported files
const supportedFiles = {
  'imgs': [
    'png',
    'jpg',
    'jpeg',
    'ttif',
    'gif'
  ],

  'docs': [
    'pdf',
    //'docx'
  ]
};

let url;
let canvasSrc;

const getImgSrc = file => {
  // These lines are a copy paste of getBase64() function.
  var reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onloadend = e => {
    url = e.target.result;
    drawImg(); // The difference is here. This function will be called when all the process is finished.
    // Maybe I could optimize it by using async await but, as the first rule of programming says: if a thing works, don't touch it!
    // No jokes: I'll watch it one day. I promise.
  }
}

// This is to resize the uploaded image to fit into the container.
// This container has a layer to let the user draw rectangles on it.
// It's important to keep the proportion well, to avoid some strange things when user selects the test to extract from the images.
const resizeImg = (img, maxW, maxH) => {
  if (img.width < maxW && img.height < maxH) {
    return img;
  }

  // Getting the proportional K of the dimensions to adapt all containers.
  let propX = img.width / maxW;
  let propY = img.height / maxH;

  let c = document.createElement('canvas');
  let ctx = c.getContext('2d');
  c.width = img.width / propX; // Giving dimensions proportionally.
  c.height = img.height / propY; // Giving dimensions proportionally.

  ctx.drawImage(img, 0, 0, c.width, c.height);
  return c.toDataURL(); // Returns the resized (proportionally) image.
}

// Display the image on the main canvas.
const drawImg = () => {
  let img = new Image();
  img.src = url;
  img.onload = () => {
    url = resizeImg(img, 600, 500);
    showImg.width = img.width;
    showImg.height = img.height;
    const ctx = showImg.getContext('2d');
    ctx.drawImage(img, 0, 0, showImg.width, showImg.height);
    console.log(showImg);
    openPopup('canvas-wrapper');
    canvasSrc = showImg;
  }
}

const readPDF = file => {
  extractText(file); // Extract text
  // If that PDF has phisical text, execute a OCR process
  // We give 1s of waiting time just in case
  sleep(1000).then(()=>{
    if(document.getElementById('text').value == prevImportVal){
      let ans = confirm('No hemos detectado texto en este PDF, ¿quieres escanear una página?');
      if(!ans) return;
      ocrPDF(URL.createObjectURL(file));
      //url = resizeImg(showImg.toDataURL(), 600, 500);
      
    }
  });
}

const readDocx = file =>{
  getTextFromDocx(file);
}


// Identifying the type of file to be able to assign the corresponding function.
const filterFile = el => {
  let ext = el.value.split('.').at(-1).toLowerCase(); // Check file's extension
  let file = el.files[0];

  if (supportedFiles['imgs'].includes(ext)) {
    getImgSrc(file); // If it's image
  } else if (supportedFiles['docs'].includes(ext)) {
    if(ext == 'pdf'){readPDF(file);} // If it's a PDF
    if(ext == 'docx'){readDocx(file);} // I'm afraid that reading docx is not still possible

  } else {
    toast.innerHTML = feedback['not-supported-file'];
    toast.classList.remove('hidden');
    sleep(4500).then(() => {
      toast.classList.add('hidden');
    });
  }
  fileInput.value = '';
}

fileInput.addEventListener('change', () => {
  filterFile(fileInput)
});
