var User = require('./userModel.js');
var jwt = require('jwt-simple');

module.exports = function (app) {

  app.post('/login', function(req, res, next){
    var username = req.body.username;
    var password = req.body.password;
    User.findOne({username: username}, function(err, data){
      if (data){
        data.comparePasswords(password, function(isMatch){
          if (isMatch){
            var token = jwt.encode(username, 'secret');
            res.json({token: token, data: data});
            console.log('Logged in:', username);
          } else {
            console.log('Incorrect password:', username);
            return next('Incorrect password');
          }
        });
      } else {
        console.log('Invalid username:', username);
        return next('Invalid username');
      }
    });
  });

  app.post('/signup', function(req, res, next){
    var username = req.body.username;
    var password = req.body.password;
    User.findOne({username: username}, function(err, data){
      if (data){
        console.log('Username unavailable:', username);
        return next('Username unavailable');
      } else {
        var newUser = {
          username: username,
          password: password
        };
        User.create(newUser, function(err, data){
          if (err){
            console.log('Failed to sign up:', username);
            return next('Internal Error');
          } else {
            console.log('Signed up:', username);
            var token = jwt.encode(username, 'secret');
            res.json({token: token, data: data});
          }
        });
      }
    });
  });

  app.post('/update', function(req, res){
    User.findOne({username: req.body.username}, function(err, data){
      data.update({problems: req.body.problems}, function(){
        console.log(data.problems);
      });
    });
  });
};