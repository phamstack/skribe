let express = require('express');
let router  = express.Router();
let mongoose = require('mongoose');
let Folder = require('../models/folder');
let Document = require('../models/document');
let Image = require('../models/image');
let bodyParser = require('body-parser');
const fileUploader = require('express-fileupload');
let Course = require('../models/course');
const escapeStringRegexp = require('escape-string-regexp');
const uriconverter = require('data-uri-to-buffer');



router.use(fileUploader());

router.use(bodyParser.urlencoded({
  extended : false
}));

router.use(bodyParser.json());


router.post('/createCourse',function(req,res){

  let course = new Course({

    _id: new mongoose.Types.ObjectId(),
    name : req.body.name,
    desc : req.body.desc,
    color: req.body.color
  })
  course.save();
  res.send(course);
})



router.post('/addFolder/:courseId',function(req,res){

  console.log(req.params);

  Course.findOne({_id:req.params.courseId}).then( course => {

  

    let foldId = new mongoose.Types.ObjectId();

    let folder = new Folder({
      _id: foldId,
      folderName: req.body.folderName,
    })

    folder.save();
    course.folders.push(foldId);
    course.save();

    res.send(folder);
  })
})


router.post('/addDocument/:folderId',function(req,res){
  
  Folder.findOne({_id:req.params.folderId}).then(folder =>{
   
    let docId = new mongoose.Types.ObjectId();

    let taglist = [];
    let str = req.body.tags;
    let buf = "";
    
    for( let i = 0; i < str.length; i++){
      if(str[i] == " "){
        taglist.push(buf);
        buf = "";
      }else{

        buf += str[i];

      }
    }
    taglist.push(buf);

    
    
    let imageId = new mongoose.Types.ObjectId();

    let uri = req.body.image
    let dataType = 'image/' + uri.split('.').pop()
    let buffer = uriconverter(uri);

    let image = new Image({
      _id: imageId,
      imageType: dataType,
      data : buffer

    })

    console.log(req.files);

    let doc = new Document({
  
    _id: docId,
    title: req.body.title,
    desc: req.body.desc,
    content: req.body.content,
    image: imageId,
    tags: taglist

    })

    image.save();
    folder.documents.push(docId);
    folder.save();
    doc.save();
    res.send(doc);
    

  })

  

})

router.post('/textSearch/:search', function(req,res){

  var phrase = req.params.search;
  let sanitized = escapeStringRegexp(phrase);

  console.log(sanitized);

  Document.find({content: new RegExp(sanitized)}, function(err,docs){
    
    let docArray = new Array;

    docs.forEach( doc => {
      docArray.push(doc)
    })

    res.send(docArray);
    
  });
})



router.get('/fetchAll', function(req,res){
  
  Course.find({})
  .populate({path:'folders',populate:{path:'documents'}})
  .exec(function(err,course){

    res.send(course);

  })
})
  

router.get('/image/:imageId', function(req,res){

  Image.findById({_id:req.params.imageId}).then(image =>{

    res.contentType(image.imageType);
    res.send(image.data);
  })


})
  





module.exports = router