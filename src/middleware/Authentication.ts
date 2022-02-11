import passport = require("passport");
import  passportJWT = require( "passport-jwt");
const JWTStrategy   = passportJWT.Strategy;

const cookieExtractor = function(req:any) {
    var token = null;
    if (req && req.headers.cookie) token = req.headers.cookie.split("=")[1];
    return token;
  };


  const User = require('../database/models').Users;
  const Role = require('../database/models').Roles;
  passport.use('jwt',new JWTStrategy({
    jwtFromRequest: cookieExtractor,
    secretOrKey   : process.env.JWT_SECRET
  },
  async (jwtPayload: any, done: any) => {
     return  User.findByPk(jwtPayload.user.id,{include:[{model:Role, as:"role"}]})
     .then(user => 
     {
       return done(null, user);
     }
   ).catch(err => 
   {
     return done(err);
   });
  }
  ))