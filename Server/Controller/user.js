const User = require("../models/user");
const {normalizeErrors} = require("../helpers/errorHelper");
const {changeMonth} = require("../helpers/monthChange");
const jwt = require("jsonwebtoken");
const config = require('../config/dev');

exports.login = function(req, res) {
    const {password, email} = req.body;

    if(!password || !email){
        return res.status(422).send([{title:"Register Error", detail:"Could not find Username or Email"}]);
    }
    User.findOne({email:email}, function(err, user){
        if(err){
            return res.status(422).send({errors: normalizeErrors(err.errors)}); 
        }
        if(!user){
            return res.status(422).send({errors: [{title: 'invalid user', detail: 'User does not exist '}]});
        }
        if(user.isSamePassword(password)){
            const jwtToken = jwt.sign({
                userId: user.id,
                username: user.username,
                date: user.date
            }, config.SECRET, { expiresIn: 60*24 });
            return res.json(jwtToken);
        }else{
            return res.status(422).send({errors: [{title: 'Wrong data', detail: 'Wrong email or password '}]});
        }
    });

}

exports.register = function(req, res){
    const username = req.body.username;
    const email = req.body.email;
    const password = req.body.password;
    const passwordConfirmation = req.body.passwordConfirmation;
    if(!username || !email){
        return res.status(422).send({errors:[{title:"Register Error", detail:"Username or Email cannot be empty"}]});
    }
    if(password !== passwordConfirmation){
        return res.status(400).send({errors:[{title:"Register Error", detail:"Password not equal to confirmation"}]}); 
    }
    User.findOne({email:email}, function(err, existingUser){
        if(err){
            return res.status(422).send({errors: normalizeErrors(err.errors)}); 
        }
        if(existingUser){
            return res.status(422).send({errors: [{title: 'invalid email', detail: 'This email is already in use'}]});
        }
        User.findOne({username:username}, function(err, existingUser){
            if(err){
                return res.status(422).send({errors: normalizeErrors(err.errors)}); 
            }
            if(existingUser){
                return res.status(422).send({errors: [{title: 'invalid username', detail: 'This username is already in use'}]});
            }
            const d = new Date();
            const date = (changeMonth(d.getMonth() + 1)) + '-' + d.getFullYear(); 
            const user = new User({
                username: username,
                email: email,
                password: password,
                date: date
            });
            user.save(function(err){
                if(err){
                    return res.status(422).send({errors: normalizeErrors(err.errors)}); 
                }
                return res.json({"registered": true});
            });
        });
    });
    
    exports.authMiddleware = function(req, res, next){
        const token = req.headers.authorization;
        if(token){
            const user = parseToken();
            User.findById(user.userId, function(err, user){
                if(err){
                    return res.status(422).send({errors: normalizeErrors(err.errors)});
                }
                if(user){
                    res.locals.user = user;
                    next();
                }else{
                    return res.status(401).send({errors: [{title: 'Not authorized', detail: 'You need to login to get access'}]});
                }
            })
        }else{
            return res.status(401).send({errors: [{title: 'Not authorized', detail: 'You need to login to get access'}]});
        }
    }
    function parseToken(){
        return jwt.verify(token.split(' ')[1], config.SECRET);
    }
}