/**
 * @description   : Taking the request from the client and gives the response 
 * @author        : Alankritha 
*/
const userService = require('../service/user.service');
const validation = require('../utilities/validation');
const { logger } = require("../../logger/logger");
const { database } = require('faker/locale/en_BORK');
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
              logger.error("Wrong Input Validations");
                return res.status(400).send({
                    success: false,
                    message: 'Wrong Input Validations',
                    data: registerValidation
                });
            }
        userService.registerUser(user, (error, data) => {
           if (error) {
            logger.error("User already registered.");
              return res.status(400).json({
              success: false,
              message: 'User already exist',
            });
          } else {
            logger.info("User registered");
            return res.status(200).json({
              success: true,
              message: "User Registered",
              data: data,
            });
          }
        });
      } catch (error) {
        logger.error("Internal server error");
        return res.status(500).json({
          success: false, 
          message: "Error While Registering",
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
              logger.error('wrong input validation');
                res.status(400).send({
                    success: false,
                    message: loginValidation.error.message
                });
            }
          userService.userLogin(userLoginInfo, (error, data) => {
              if (error) {
                logger.error("Wrong Information entered...");
                console.log("333",userLoginInfo);
                  return res.status(400).json({
                      success: false,
                      message: 'error in login.please enter valid credential',
                  });
              }
              logger.info("User logged in successfully");
            return res.status(200).json({
              success: true,
              message: 'User logged in successfully',
              data: data
            }); 
          });              
        }
      catch (error) {
        logger.error("Internal server error");
          return res.status(500).json({
              success: false,
              message: 'Internal server error', error,
              data: null
          });
      }
  };
   /**
     * description controller function for forgot password
     * @param {*} req
     * @param {*} res
     * @returns
     */ 
    forgotPassword = (req, res) => {
      try {
        const userCredential = {
          email: req.body.email
        };
        const validationforgotPassword=validation.validForgotPassword.validate(userCredential);
        if (validationforgotPassword.error) {
          logger.error(forgotValidation.error);
          return res.status(400).send({
            success: false,
            message: "email is not valid",
            data: validationforgotPassword
          });
        }
        userService.forgotPassword(userCredential, (error, result) => {
          if (error) {
            logger.error("Failed to send email. Email not exist....");
            return res.status(400).send({
              success: false,
              message: "failed to send email,email doesnt exist"
            });
          } else {
            logger.info("Email sent successfully");
            return res.status(200).send({
              success: true,
              message: 'Email sent successfully'
            });
          }
        });
      } catch (error) {
        logger.error("Internal server error");
        return res.status(500).send({
          success: false,
          message: 'Internal server error',
          result: null
        });
      }
    };
    /**
   * description controller function for reset password
   * @param {*} req
   * @param {*} res
   * @returns
   */
     resetPassword = (req, res) => {
      try {
        const userData = {
          email: req.body.email,
          password: req.body.password,
          code: req.body.code
        };
  
        const resetVlaidation = validation.validResetPassword.validate(userData);
        if (resetVlaidation.error) {
          logger.error(resetValidation.error);
        
          res.status(400).send({
            success: false,
            message: resetVlaidation.error.message
          });
        }
  
        userService.resetPassword(userData, (error, data) => {
          if (error) {
            logger.error(err);
            return res.status(400).send({
              message: error,
              success: false
            });
          } else {
            logger.info("Successfully updated.....");
            return res.status(200).json({
              success: true,
              message: 'Password reset succesfully',
              data: userData
            });
          }
        });
      } catch (error) {
        logger.error("Internal server error");
        return res.status(500).send({
          success: false,
          message: 'Internal server error',
          data: null
        });
      }
    }

    confirmRegister = (req, res) => {
      const data = {
        token: req.params.token}
        userService.confirmRegister(data, (error, data) => {
        if (error) {
          return res.status(404).json({
            success: false,
            message: "error"
          });
        } else {
          return res.status(200).json({
            success: true,
            message: "Email Successfully Verified",
            
          });
        }
      });
    }
  };
module.exports = new Controller();