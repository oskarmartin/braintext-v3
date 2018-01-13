var path = require('path');
var router = require('express').Router();
var mongoose = require('mongoose');
var serverConfig = require('../config.js');
var multiparty = require('connect-multiparty')();
var fs = require('fs');
var Gridfs = require('gridfs-stream');
var multer = require('multer');
var pdfJsLib = require('pdfjs-dist');
var PDFDocument = require('pdfkit');
var stream = require('./stream');

var User = require('../models/user');


var conn = mongoose.createConnection('localhost', 'braintext', 27017);
var gf = Gridfs(conn.db, mongoose.mongo);


var storage = multer.diskStorage({
    destination: path.join(__dirname, '/tmp/'),
    filename: function(req, file, cb){
        var extArray = file.mimetype.split("/");
        var extension = extArray[extArray.length - 1];
        cb(null, file.originalname.split('.')[0] + Date.now() + '.' + extension)
    }
})

var upload = multer({storage: storage});

router.post('/download', function(req, res){
    console.log("downloadi initiated");
    console.log(req.body.fileName);
    var filePath = "/tmp/"+req.body.fileName;
    /*fs.readFile(__dirname + filePath, function(err, data){
        res.contentType("application/pdf");
        res.send(data);
    })*/
    res.download(__dirname + filePath);
    //var conn = mongoose.createConnection('localhost', 'braintext', 27017);
    //var gf = Gridfs(conn.db, mongoose.mongo);
    /*gf.findOne({
        filename: req.body.fileName
    }, function(err, file){
        if(err)res.status(500).json(err);
        else if(!file){
            console.log("no file");
            return res.status(404).json({
                msg: "this file was not found in the database"
            })
        }
        console.log(file.metadata.originalName);
        res.set('Content-Type', 'application/pdf');
        res.set('Content-Disposition', 'attachment; filename="'+ file.metadata.originalName +'"');
        var readStream = gf.createReadStream({
            filename: req.body.fileName
        });
        readStream.on("error", function(err){
            console.log("readstream error ->"  , err);
            res.end();
        })
        readStream.pipe(res);
    })*/
})
router.post('/addhighlighted', function(req, res){

    var conn = mongoose.createConnection('localhost', 'braintext', 27017);
    var gf = Gridfs(conn.db, mongoose.mongo);
    var highlightedSentences;
    console.log(req.body.number);
    conn.once('open', function(){
        gf.findOne({filename: req.body.filename}, function(err, file){
            if(err) console.log("err -> ", err);
            console.log(file.metadata.highlighted);

            highlightedSentences = file.metadata.highlighted;

            var newHigh = highlightedSentences.concat(req.body.number);
            var unique = newHigh.filter(function(elem, index, self){
                return index === self.indexOf(elem);
            })

            gf.files.update({
                filename: req.body.filename
            },
            {$set: {'metadata.highlighted': unique}}, function(){
                res.status(200).json({
                    msg: "highlighted sentences are added to the file"
                })
            });
        })


    })
})
router.post('/byid', function(req, res){
    User.findOne({
        _id:req.body.id
    }, function(err, user){
        if(err) res.status(500).json(err);
        res.status(200).json(user);
    })
})
router.post('/getlastfile', function(req, res){
    User.findOne({
        _id: req.body.userId
    }, function(err, user){
        if(err) res.status(500).json(err);
        res.status(200).json(user.lastFile);

    })
})
router.post('/addlastfile', function(req, res){
    User.update({
        _id: req.body.userId
    },
    {
        $set: {lastFile: req.body.lastFile}
    }, function(err){
        if(err) res.status(500).json(err);
        res.status(200).json({
            msg: "succesfully updated lastfile",
            fileName: req.body.lastFile
        })
    })
})
router.post('/updateuser', function(req, res){
    User.findByIdAndUpdate(req.body.id,
        {$set: {
            email: req.body.email,
        }}, {new: true}, function(err, user){
            if(err) res.status(500).json(err);
            res.status(200).json(user);
        })
})
router.get('/getusers', function(req, res){
    User.find(function(err, users){
        if(err) res.status(500).json(err);
        res.status(200).json(users);
    })
})



router.post('/getupload', function(req, res){

    var buffer;
    var wstream = fs.createWriteStream(__dirname + '/tmp/'+req.body.filename+'.pdf');

    var readstream = gf.createReadStream({
        filename: req.body.filename
    })

    readstream.on('data', function(chunk){
        console.log('recieving data from stream');
    })
    readstream.on('error', function(err){
        console.log("err -> ", err);
        res.status(500).json(err);
    })
    readstream.pipe(wstream);
    readstream.on('end', function(){
        res.status(200).json({
            url: '/tmp/'+req.body.filename+'.pdf'
        })
    })
    /*readstream.on('end', function(){
        var pdf = path.join(__dirname, '../../../holder.pdf');
        console.log(pdf);
        pdfJsLib.getDocument(pdf).then(function(doc){
            var promises = [];
            var promiseLimiter;
            var totalPages = doc.numPages;

            for(i = 1; i <= doc.numPages; i++){

                var  p = doc.getPage(i).then(function(page){
                    return page.getTextContent();
                })
                promises.push(p);
            }
            Promise.all(promises).then(function(data){
                fs.unlink(pdf, function(err){
                    if(err) console.log("holder file deletion err -> ", err);
                })
                res.status(200).json(data);
            })
        })
    })*/

})

router.post('/deletefile', function(req, res){


    deleteFileFromUser(req.body.fileId, req.body.userId, req.body.filename).then(function(data){
        res.status(200).json(data);
    }, function(err){
        res.status(500).json({
            err: "there went something wrong deleting file from the user"
        })
    });
})
router.post('/getalluserfiles', function(req, res){
    User.findOne({
        _id: req.body.userId
    }, function(err, user){
        if(err) res.status(500).json(err);
        res.status(200).json(user.userFiles);
    })
})
router.post('/getuserarchives', function(req, res){
    User.findOne({
        _id: req.body.userId
    }, function(err, user){
        if(err) res.status(500).json(err);
        res.status(200).json(user.archiveFiles.slice(0,4));
    })
})
router.post('/getalluserarchives', function(req, res){
    User.findOne({
        _id: req.body.userId
    }, function(err, user){
        if(err) res.status(500).json(err);
        res.status(200).json(user.archiveFiles);
    })
})
router.post('/getuserfiles', function(req, res){

    //var ObjectID = mongoose.mongo.BSONPure.ObjectID;

    User.findOne({
        _id: req.body.userId
    }, function(err, user){
        if(err) res.status(500).json(err);
        //res.status(200).json(user.userFiles);
        console.log(user.userFiles.reverse());
        res.status(200).json(user.userFiles.slice(0,4));

        /*for(var i = 0; i < user.userFiles.length || i < 4; i++){

            gf.files.find({
                _id: user.userFiles[i]
            }).toArray(function(err, files){
                if(err){
                    res.status(500).json(err);
                }
                if(files.length > 0){
                    returnArray.push(files[0].filename);
                    console.log(files[0].filename);
                    //console.log(returnArray);
                }
            })
            if(i == 3){
                console.log("i is 4 -> ", returnArray)
            }
        }*/
        //console.log("this is after for loop -> ", returnArray);
    })
})
var getName = function(id){
    console.log("this is the id -> ", id);
    var conn = mongoose.createConnection('127.0.0.1', 'braintext', 27017);
    var gf = Gridfs(conn.db, mongoose.mongo);

    gf.files.find({
        _id: id
    }).toArray(function(err, files){
        console.log("tulen siia sisse ! ");
    })

}

router.post('/savearchive', function(req, res){

    var doc = new PDFDocument();
    var filename = req.body.filename;
    var content = req.body.content;
    var newFileName = req.body.filename.split('.')[0] + Date.now() + ".pdf";
    var path = __dirname + "/tmp/"+ newFileName ;
    var wstream = fs.createWriteStream(path);

    console.log("this is saveArchive filename -> ", req.body.filename);


    doc.pipe(wstream);
    doc.y = 300;
    doc.text(content, 100, 100);
    doc.end();

    var conn = mongoose.createConnection('127.0.0.1', 'braintext', 27017);
    var gf = Gridfs(conn.db, mongoose.mongo);

    conn.once('open', function(){
        console.log("connection open! ");
        console.log("this is newfilename -> ", path)
        var source = fs.createReadStream(__dirname + "/tmp/"+ newFileName);
        var target = gf.createWriteStream({
            filename: newFileName,
            contentType: req.body.filename.split('.')[1],
            metadata: {
                highlighted: [],
                originalName: req.body.filename
            }
        })
        source.pipe(target);
        target.on('close', function(file){
            addArchiveToUser(newFileName,filename, req.body.userId);
            res.status(200).json(file);
            conn.close(function(){
                console.log("connection is closed now");
            })
            /*fs.unlink(path, function(err, cb){
                if(err) console.log(err);

            });*/
        })
    })


})

router.post('/upload', upload.single('file'), function(req, res){

    console.log("upload initiated");
    console.log("---------------");
    console.log("user id -> ", req.query.userId);
    console.log("file -> ", req.file);
    console.log("---------------");


    var conn = mongoose.createConnection('127.0.0.1', 'braintext', 27017);
    var gf = Gridfs(conn.db, mongoose.mongo);

    conn.once('open', function(){
        console.log("connection open! ");
        var newFileName = req.file.filename.split('.')[0] + Date.now();
        var source = fs.createReadStream(req.file.path);
        var target = gf.createWriteStream({
            filename: newFileName,
            contentType: req.file.filename.split('.')[1],
            metadata: {
                highlighted: [],
                originalName: req.file.originalname
            }
        })
        source.pipe(target);
        target.on('close', function(file){
            console.log(file);
            fs.unlink(req.file.path, function(err, cb){
                if(err) console.log(err);
                addFileToUser(newFileName,req.file.originalname,req.query.userId);
                res.status(200).json(file);
                conn.close(function(){
                    console.log("connection is closed now");
                })
            });
        })
    })
})

function addFileToUser(newfilename, originalfilename, userId){
    console.log("this is the new file name -> ", newfilename);
    console.log("this is the original file name -> ", originalfilename);
    console.log("this is the userId -> ", userId);

    var userfiles = {originalName: originalfilename, databaseName: newfilename};

    console.log(userfiles);

    User.findOne({_id: userId},function(err, user){
        if(err) return false;
        console.log(user);
        user.userFiles.push(userfiles);
        user.save();
        return true;
    })
}
function addArchiveToUser(archivefilename, originalname, userId){
    var archivefiles = {originalName: originalname, databaseName: archivefilename};
    User.findOne({_id: userId}, function(err, user){
        if(err) return false;
        user.archiveFiles.push(archivefiles);
        user.save();
        return true;
    })
}

var deleteFileFromUser = function(fileId, userId, file){

    return new Promise(
        function(resolve, reject){
            User.findOne({
                _id: userId
            }, function(err, user){
                if(err) reject(err);
                var files = user.userFiles;
                var index = files.indexOf(fileId);
                files.splice(index, 1);
                user.userFiles = files;
                user.save(function(err, updatedUser){
                    if(err) reject(err);
                    //resolve(updatedUser);

                    gf.remove({
                        filename: file
                    }, function(err){
                        if(err) reject(err);
                        resolve(updatedUser);
                    })
                })
            })
        }
    )
}
/*function deleteFileFromUser(fileId, userId){
    User.findOne({
        _id: userId
    }, function(err, userCb){
        if(err) return false;
        var files = userCb.userFiles;

        var index = files.indexOf(fileId);
        files.splice(index, 1);
        userCb.userFiles = files;
        userCb.save(function(err, updateUser){
            if(err) return false;
            return true;
        })
    })
}*/

module.exports = router;
