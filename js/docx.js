// From StackOverflow
// https://stackoverflow.com/a/28458091

function loadFile(url, callback) {
  PizZipUtils.getBinaryContent(url, callback);
}

function getTextFromDocx(file) {
  loadFile(
    convertDataURIToBinary(file),
    function(error, content) {
      if (error) {
        throw error;
      }
      var zip = new PizZip(content);
      var doc = new window.docxtemplater(zip);
      var text = doc.getFullText();
      alert("Text is " + text);
    }
  );
}
