/**
 * @description   : Taking the request from the client and gives the response 
 * @author        : Alankritha 
*/
const userService = require('../service/note.service')
const validation = require('../utilities/validation')

class Controller {
   /**
     * @description Create and save user and sending response to service
     * @method register to save the user
     * @param req,res for service
     */


    register = (req, res) => {
      try {
        const user = {
          firstName: req.body.firstName,
          lastName: req.body.lastName,
          email: req.body.email,
          password: req.body.password
        };
        const registerValidation = validation.authRegister.validate(user)
            if (registerValidation.error) {
                return res.status(400).send({
                    success: false,
                    message: 'Wrong Input Validations',
                    data: registerValidation
                });
            }
        userService.registerUser(user, (error, data) => {
           if (error) {
            
            return res.status(400).json({
              success: false,
              message: 'User already exist',
            });
          } else {
            console.log('User registered');
            return res.status(200).json({
              success: true,
              message: "User Registered",
              data: data,
            });
          }
        });
      } catch (error) {
        console.log(error);
        return res.status(500).json({
          success: false, message: "Error While Registering",
          data: null,
        });
      }
    }
     /**
     * @description retrieving login info from user by email and password
     * @method login
     * @param req,res for service
     */
    login = (req, res) => {
      try {
          const userLoginInfo = {
              email: req.body.email,
              password: req.body.password
          };
          const loginValidation = validation.authLogin.validate(userLoginInfo);
            if (loginValidation.error) {
                res.status(400).send({
                    success: false,
                    message: loginValidation.error.message
                });
            }
          userService.userLogin(userLoginInfo, (error, data) => {
              if (error) {
                  return res.status(400).json({
                      success: false,
                      message: 'unable to login .please enter correct info',
                      error
                  });
              }
            return res.status(200).json({
              success: true,
              message: 'User logged in successfully',
              data: data
            }); 
          });              
        }
      catch (error) {

          return res.status(500).json({
              success: false,
              message: 'Error while Login', error,
              data: null
          });
      }
  };
  forgotPassword = (req, res) => {
    return res.status(200).send({
      success: true,
      message: "Email sent successfully"
    });
  }
}
module.exports = new Controller();