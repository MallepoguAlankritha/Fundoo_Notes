/**
 * @module       Models
 * @file         note.model.js
 * @description Taking the request from the client and gives the response
 * @author       Alankritha
 */
 var Promise = require("bluebird");
 const bcrypt = Promise.promisifyAll(require("bcrypt"));
 const Otp = require('./otp.js');
 const { logger } = require("../../logger/logger");
const mongoose = require('mongoose');
const utilities = require('../utilities/helperclass');
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
Registeruser.pre('save', async function (next) { // this line
  const User = this;
  console.log(User.isModified);
  console.log(User.isModified());
  console.log(User.isModified('password'));
  if (!User.isModified('password'))
      return next();
  User.password = await bcrypt.hashSync(User.password, 8);
  next();
});
const User = mongoose.model('Registeruser',Registeruser)
class UserModel {
 
  /**
    * @description register User in the database
    * @param User
    * @param callback
    */
   registerUser = (userDetails, callback) => {
    const newUser = new User();
    newUser.firstName = userDetails.firstName;
    newUser.lastName = userDetails.lastName;
    newUser.email = userDetails.email;
    newUser.password = userDetails.password;
    console.log("model",newUser);

    newUser.save((error, data) => {
      console.log("model1",data);
        if (error) {
            logger.error(error);
            callback(error, null);
        } else {
            logger.info("success fully registered");
            callback(null, data);
        }
    });
};
/**
* @description login User from the database
* @param loginInfo
* @param callback for service
*/

loginUser = (loginData, callBack) => {
  //To find a user email in the database
  User.findOne({ email: loginData.email }, (error, data) => {
      if (error) {
        logger.error("Find error while loggin user");
          return callBack(error, null);
      } else if (!data) {
        logger.error("Invalid User");
          return callBack("Invalid Credential", null);
      } else {
        logger.info("Email id found");
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
    if (err) {
        logger.error(err);
        return callback(err, null);
    } else {
        if (!data) {
            logger.error("Invalid Credential");
        } else {
            logger.info(data);
            return callback(null, data);
        }
    }
});
};
/**
      * @description mongooose method for reseting the password
      * @param {*} userData
      * @param {*} callback
      * @returns
      */
 resetPassword = (userData, callback) => {
  return new Promise((resolve, reject) => {
    Otp.findOne({ code: userData.code })
        .then((data) => {
            if (userData.code == data.code) {
                utilities.hashing(userData.password)
                    .then((hash) => {
                        userData.password = hash;
                        User.updateOne({ email: userData.email }, { '$set': { "password": userData.password } })
                            .then((data) => {
                                resolve(data)

                            }).catch((error) => {
                                reject(error)
                            })
                    }).catch((error) => {
                        reject(error)
                    })
            } else {
                reject(null)
            }
        }).catch((error) => {
            reject("Otp doesnt match", null)
        });
});
}
}
module.exports = { UserModel: new UserModel(), UserDB: User };