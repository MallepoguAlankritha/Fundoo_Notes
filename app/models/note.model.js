const mongoose = require('mongoose');
const utilities = require('../utilities/encryption');
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

const User = mongoose.model('Registeruser',Registeruser)
class userModel {

  registerUser = (userDetails, callback) => {
    const newUser = new User({
      firstName: userDetails.firstName,
      lastName: userDetails.lastName,
      email: userDetails.email,
      password: userDetails.password
    });
    try {
      utilities.hashing(userDetails.password, (error, hash) => {
      if (hash) {
      newUser.password = hash;
      newUser.save((error, data) => {
        if (error) {
          callback(error, null);
        } else {
          callback(null, data);
        }
      });
    } else {
      throw error;
    }
  });
  }
  catch (error) {
      return callback('Internal Error', null)
  }
}  
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
    
    }
module.exports = new userModel();