const userModel = require('../models/note.model')
class userService {
    registerUser = (user, callback) => {
        userModel.registerUser(user, (err, data) => {
      
          if (err) {
            callback(err, null);
          } else {
            callback(null, data);
          }
        });
    }
    userLogin = (InfoLogin, callback) => {
      userModel.loginModel(InfoLogin, (error, data) => {
        if (data) {
          if(data.password==InfoLogin.password){
            return callback(null,data);
          }else{
            return callback("password does not match",null)
          }
        } else {
          return callback(error,null);
        }
      });
    }

}
module.exports = new userService();