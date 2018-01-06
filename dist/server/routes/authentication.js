var User = require('../models/user.js');
var express = require('express');
var router = express.Router();
var passport = require('passport');

var fs = require('fs');
var pdfJsLib = require('pdfjs-dist');
var pdf = '/Users/Oskar/Desktop/Projektid/braintext-react/server/routes/test.pdf';

router.post('/pdf', function(req, res){
    pdfJsLib.getDocument(pdf).then(function(doc){
        console.log("pdf promise is triggered");
        console.log("-----------");
        console.log("pdf length -> ", doc.numPages);
        console.log("-----------");

        doc.getPage(1).then(function(page){
            var viewport = page.getViewport(1.0);

            console.log("Page size: " + viewport.width + "x" + viewport.height);
            console.log("-----------");


            page.getTextContent().then(function(content){
                var textLayer = new TextLayerBuilder({

                })
                console.log(textLayer);
                console.log("this is the content -> ", content);
            })
        }, function(err){
            console.log(err);
        })
    }, function(err){
        console.log(err);
    })
})
router.post('/login', function(req, res, next){
    console.log("this is the req body -> ", req.body);
    passport.authenticate('local', function(err, user, info){
        if(err){
            return res.status(500).json({
                err: "something went wrong in the server side, while comparing your passwords"
            })
        }
        req.logIn(user, function(err){
            if(err){
                console.log(err);
                return res.status(401).json({
                    err: "User details provided were wrong!"
                })
            }
            console.log("this is the login");
            console.log(user);
            return res.status(200).json({
                msg: "login was successful",
                token: user.token,
                id: user.id,
                firstname: user.firstname,
                lastname: user.lastname
            })
        })
    })(req, res, next);
})

router.post('/register', function(req, res){
    var username = req.body.username;
    var password = req.body.password;
    var email = req.body.email;
    var firstname = req.body.firstname;
    var lastname = req.body.lastname;

    if(!username){
        return res.status(500).json({
            err: "username was not provided"
        })
    }
    if(!password){
        return res.status(500).json({
            err: "password was not provided"
        })
    }
    if(!email){
        return res.status(500).json({
            err: "email was not provided"
        })
    }
    User.findOne({email:email}, function(err, existingUser){
        if(err) return res.status(500).json({err: err});
        if(existingUser){
            return res.status(500).json({
                err: "user with this email already in DB"
            })
        }


        var user = new User ({
            username: username,
            email: email,
            password: password,
            firstname: firstname,
            lastname: lastname
        });

        user.save(function(err, user){
            if(err) return res.status(500).json({err:err});
            res.status(200).json({
                msg: "user was registered",
                user: user
            })
        })
    })
})

module.exports = router;
