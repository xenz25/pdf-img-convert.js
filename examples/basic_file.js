var pdf2img = require("../pdf-img-convert.js");
var fs = require("fs");

const path = require('path');

var fontLoader = (name) => {
  var p = path.join(__dirname, 'times_new_roman', name);
  return p;
}

var pdfOptions = { 
  fonts: {
    args: `24px "Times New Roman"`,
    configs: [
      {
        path: fontLoader('times new roman.ttf'),
        options: { family: "Times New Roman" }
      },
      {
        path: fontLoader('times new roman bold.ttf'),
        options: { family: "Times New Roman", weight: "bold" }
      },
      {
        path: fontLoader('times new roman italic.ttf'),
        options: { family: "Times New Roman", style: 'italic' }
      },
      {
        path: fontLoader('times new roman bold italic.ttf'),
        options: { family: "Times New Roman", weight: "bold", style: 'italic' }
      }
    ]
  }
}

// This returns a promise as it's an async function
var output = pdf2img.convert('./examples/test_pdfs/1272812f-1ade-4d1e-9a59-6f5d202e93bd.pdf', pdfOptions);

// Acting on this promise when it's fulfilled:
output.then(function(pdfArray) {
  console.log("Saving");
  // Loop through each page, saving the images
  for (i = 0; i < pdfArray.length; i++){
    fs.writeFile("./examples/outputImages/output"+i+".png", pdfArray[i], function (error) {
      if (error) { console.error("Error: " + error); }
    }); //writeFile
  } // for
});
