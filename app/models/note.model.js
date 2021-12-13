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

const User = mongoose.model('Registeruser',Registeruser)
class userModel {

    registerUser = (userDetails,callback) => {
        const newUser = new User();
            newUser.firstName = userDetails.firstName;
            newUser.lastName = userDetails.lastName;
            newUser.email = userDetails.email;
            newUser.password = userDetails.password;
            newUser.save((error, data) => {
              if (error) {
              callback(error, null);
              } else {
              callback(null, data);
              }
            });
          };
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