/**
 * @module       Service
 * @file         note.service.js
 * @description  Service class holds the callback method for controller 
 * @author       Alankritha
 */
const userModel = require('../models/user.model').UserModel;
const utilities = require('../utilities/helperclass')
const bcrypt = require('../utilities/helperclass');
const { logger } = require("../../logger/logger");
const nodemailer = require('../utilities/rabbitMq');
const mailer = require('../utilities/nodeemailer');
const rabbitMQ = require("../middleware/rabbitMq");
const jwt = require('jsonwebtoken')
const { usertoken, validateToken } = require('../utilities/helperclass')
const { deleteOne } = require('../models/otp');

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
      } else if(data) {
        // Send Welcome Mail to User on his Mail
        nodemailer.sendWelcomeMail(user);
        const secretkey = process.env.JWT_SECRET;
        utilities.jwtTokenVerifyMail(data, secretkey, (err, token) => {
          if (token) {
            rabbitMQ.sender(data, data.email);
            mailer.verifyMail(token, data);
            return callback(null, token);
          } else {
            return callback(err, null);
          }
        });
        return callback(null, data);
      }
    });
  };
     /**
     * @description sends the data to loginApi in the controller
     * @method userLogin
     * @param callback callback for controller
     */
    userLogin = (InfoLogin, callback) => {
      userModel.loginUser(InfoLogin, (error, data) => {
        if (data) {
       const passwordResult = bcrypt.comparePassword(InfoLogin.password, data.password)
            if (!passwordResult) {
              logger.error("Error occured......");
              console.log("444",passwordResult);
              return callback(error + 'Invalid Password', null);
            } else {
              logger.info(passwordResult);
              console.log("22",passwordResult)
              const token = utilities.token(data);
              console.log("777",token);
              return callback(null, token);
            }
          } else {
          console.log("33",error);
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
          return callback(null,mailer.sendEmail(data));
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
    confirmRegister = (data, callback) => {
      const decode = jwt.verify(data.token, process.env.JWT_SECRET);
      if (decode) {
        rabbitMQ
          .receiver(decode.email)
          .then((val) => {
            userModel.confirmRegister(JSON.parse(val), (error, data) => {
              if (data) {
                return callback(null, data);
              } else {
                return callback(error, null);
              }
            });
          })
          .catch((error) => {
            logger.error(error);
          });
      }
    };
  }



module.exports = new userService();