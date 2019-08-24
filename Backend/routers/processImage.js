
let express = require('express');
let app = express();
let router = express.Router();
const vision = require('@google-cloud/vision')
const fileUploader = require('express-fileupload');
const client = new vision.ImageAnnotatorClient();
const jimp = require('jimp');
const uriconverter = require('data-uri-to-buffer');



router.use(fileUploader());


router.post('/',function(req,res) {
  

    let imageFile = uriconverter(req.body.image);
    
    jimp.read(imageFile).then(grayImage => {
    
      imageFile = grayImage.grayscale();
    
    })
    
    let encoded = Buffer.from (imageFile).toString('base64');
    
    const request = {
    
      image: { content: encoded }
    
    };
    
    client.documentTextDetection(request).then(response => {
        res.send(response[0].textAnnotations[0].description);
        console.log('process image data sent');
      })  
      
    });

module.exports = router
