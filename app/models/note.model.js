/**
 * @module       Models
 * @file         note.model.js
 * @description Taking the request from the client and gives the response
 * @author       Alankritha
 */
var Promise = require("bluebird");
const bcrypt = Promise.promisifyAll(require("bcrypt"));
const mongoose = require('mongoose');
const Registeruser = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
      },
      lastName: {
        type: String,
        required: true
      },
      email: {
        type: String,
        required: true,
        unique: true
      },
      password: {
        type: String,
        required: true
      }
    },
    {
      timestamps: true
})
Registeruser.pre('save', async function (next) { 
  const user = this;
  console.log(user);
  console.log(user.isModified);
  console.log(user.isModified());
  console.log(user.isModified('password'));
  if (!user.isModified('password')) return next();
  console.log('just before saving...');
  user.password = await bcrypt.hashSync(user.password, 8);
  console.log('just before saving...');
  next();
});

const User = mongoose.model('Registeruser',Registeruser)
class userModel {
  /**
     * @description register user in the database
     * @param user
     * @param callback 
     */

  registerUser = (userDetails, callback) => {
    const newUser = new User();
    newUser.firstName = userDetails.firstName;
    newUser.lastName = userDetails.lastName;
    newUser.email = userDetails.email;
    newUser.password = userDetails.password;
    newUser.save((error, data) => {
      if (error) {
          callback(error, null);
      }else{
        callback(null,data);
      } 
  });
} ; 
/**
     * @description login user from the database
     * @param loginData 
     * @param callback for service
     */
          loginModel = (loginData, callBack) => {
            //To find a user email in the database
            User.findOne({ email: loginData.email }, (error, data) => {
                if (error) {
                    return callBack(error, null);
                } else if (!data) {
                    return callBack("Invalid Credential", null);
                } else {
                    return callBack(null, data);
                }
            });
        }
        /**
     * @description mongoose function for forgot password
     * @param {*} email
     * @param {*} callback
     */
  forgotPassword = (data, callback) => {
    User.findOne({ email: data.email }, (err, data) => {
     if (data) {
       return callback(null,data);
     } else {
       return callback(err,null);
     }
   });
 };

    
    }
module.exports = new userModel();