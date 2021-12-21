/**
 * @module       Service
 * @file         note.service.js
 * @description  Service class holds the callback method for controller 
 * @author       Alankritha
 */
const userModel = require('../models/note.model')
const utilities = require('../utilities/encryption')
const bcrypt = require('bcrypt');

class userService {
  /**
     * @description Create and save user then send response to controller
     * @method registerUser to save the user
     * @param callback callback for controller
     */
    registerUser = (user, callback) => {
        userModel.registerUser(user, (err, data) => {
      
          if (err) {
            callback(err, null);
          } else {
            callback(null, data);
          }
        });
    }
     /**
     * @description sends the data to loginApi in the controller
     * @method userLogin
     * @param callback callback for controller
     */
    userLogin = (InfoLogin, callback) => {
      userModel.loginModel(InfoLogin, (error, data) => {
        if (data) {
          bcrypt.compare(InfoLogin.password, data.password, (error, validate) => {
            if (!validate) {
              return callback(error + 'Invalid Password', null);
            } else {
              const token = utilities.token(data);
              return callback(null, token);
            }
          });
        } else {
          return callback(error);
        }
      });
    }
}
module.exports = new userService();