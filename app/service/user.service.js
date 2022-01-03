/**
 * @module       Service
 * @file         note.service.js
 * @description  Service class holds the callback method for controller 
 * @author       Alankritha
 */
const userModel = require('../models/user.model').UserModel;
const utilities = require('../utilities/helperclass')
const bcrypt = require('bcrypt');
const { logger } = require("../../logger/logger");
const nodemailer = require('../utilities/nodeemailer.js');
const { deleteOne } = require('../models/otp');

class userService {
  /**
     * @description Create and save user then send response to controller
     * @method registerUser to save the user
     * @param callback callback for controller
     */
    registerUser = (user, callback) => {
        userModel.registerUser(user, (err, data) => {
          console.log("service1",data);
         
      if (err) {
        logger.error(err);
            callback(err, null);
          } else {
            logger.info(data);
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
      userModel.loginUser(InfoLogin, (error, data) => {
        if (data) {
          bcrypt.compare(InfoLogin.password, data.password, (error, validate) => {
            if (!validate) {
              logger.error("Error occured......");
              return callback(error + 'Invalid Password', null);
            } else {
              logger.info(data);
              const token = utilities.token(data);
              return callback(null, token);
            }
          });
        } else {
          logger.error(error);
          return callback(error,null);
        }
      });
    } 
    forgotPassword = (email, callback) => {
      userModel.forgotPassword(email, (error, data) => {
        if (error) {
          logger.error(error);
          return callback(error, null);
        } else {
          logger.info(data);
          return callback(null,nodemailer.sendEmail(data));
        }
      });
    };

    resetPassword = (userData, callback) => {
      userModel.resetPassword(userData)
        .then((data) => {
          return callback(null, data);
        }).catch((error) => {
          
          return callback(error, null);
        });
    };
}
module.exports = new userService();