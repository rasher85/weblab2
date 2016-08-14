var router = require('express').Router()
var bcrypt = require('bcryptjs')
var User = require('../../models/users'),
    mongoose = require('mongoose'),
    nev = require('email-verification')(mongoose);


// sync version of hashing function
var myHasher = function(password, tempUserData, insertTempUser, callback) {
  var hash = bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
  return insertTempUser(hash, tempUserData, callback);
};

// async version of hashing function
myHasher = function(password, tempUserData, insertTempUser, callback) {
  bcrypt.genSalt(8, function(err, salt) {
    bcrypt.hash(password, salt, function(err, hash) {
      return insertTempUser(hash, tempUserData, callback);
    });
  });
};

//configure the options 

nev.configure({
    verificationURL: 'http://localhost:3000/api/register/email-verification/${URL}',
    persistentUserModel: User,
    exprirationTime: 600, //10 minutes
    tempUserCollection: 'olabs_tempusers',

    transportOptions: {
        service: 'Gmail',
        type: 'SMTP',
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        
        auth: {
            user: 'fincpalab@gmail.com',
            pass: 'FINCPAje#1'
        }
    },
    verifyMailOptions: {
        from: 'fincpalab@gmail.com',
        subject: 'Please confirm account',
        html: 'Click the following link to confirm your account:</p><p>${URL}</p>',
        text: 'Please confirm your account by clicking the following link: ${URL}'
    },
    
    hashingFunction: myHasher,
    passwordFieldName: 'password',
}, function(err, options){
    if (err) {
    console.log(err);
    return;
  }

console.log('configured: ' + (typeof options === 'object'));
});

process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

// configuration options go here...

// generating the model, pass the User model defined earlier
nev.generateTempUserModel(User, function(err, tempUserModel) {
  if (err) {
    console.log(err);
    return;
  }

  console.log('generated temp user model: ' + (typeof tempUserModel === 'function'));
});

//Express

router.post('/', function(req,res){
    console.log('ovde sam!!!')
    var email = req.body.email;
    
    //register button was clicked
    if (req.body.type === 'register'){
        var password = req.body.password;
        var newUser = new User({
            email: email,
            password: password
        });
        
        nev.createTempUser(newUser, function(err, existingPersistentUser, newTempUser){
            if (err){
                return res.status(404).send('ERROR: creating temp user Failed');
            }
            //user already exists in persistent collection
            if (existingPersistentUser){
                return res.json({
                    msg: 'You have already signed up and confirmed your account. Did you forget your password?'
                });
            }
            
            //new user created
            if (newTempUser){
                var URL = newTempUser[nev.options.URLFieldName];
                console.log(email)
                
                nev.sendVerificationEmail(email, URL, function(err, info){
                    if (err){
                        return res.status(404).send('ERROR: sending verification email Failed');
                    }
                    res.json({
                        msg: 'An email has been sent to you. Please check it to verify your account.',
                        info: info
                    });
                });
            //user already exists in temporary collection
            } else {
                res.json({
                    msg: 'You have already signed up. Please check your email to verify your account.'
                });
            }
        });
    //resend verification button was clicked
    } else {
        nev.resendVerificationEmail(email, function(err, userFound){
            if (err){
                return res.status(404).send('ERROR: resending verification email FAILED');
            }
            if (userFound){
                res.json({
                    msg: 'An email has been sent to you, yet again. Please check it to verify your account.'
                });
            } else {
                res.json({
                    msg: 'Your verification code has expired. Please sign up again.'
                });
            }
        });
    }
});

// user accesses the link that is sent
router.get('/email-verification/:URL', function(req, res){
    var url = req.params.URL;
    
    nev.confirmTempUser(url, function(err,user){
        if (user) {
            
            nev.sendConfirmationEmail(user.email, function(err, info){
                if (err){
                    return res.status(404).send('ERROR: sending confirmation email FAILED');
                }
                res.json({
                    msg: 'CONFIRMED!',
                    info: info
                });
            });
        } else {
            return res.status(404).send('ERROR: confirming temp user FAILED');
        }
    });
});

module.exports = router
