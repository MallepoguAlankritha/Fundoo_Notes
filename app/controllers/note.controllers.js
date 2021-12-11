const userService = require('../service/service.js')


class Controller {

    register = (req, res) => {
      try {
        const user = {
          firstName: req.body.firstName,
          lastName: req.body.lastName,
          email: req.body.email,
          password: req.body.password
        };
  
        

  
        userService.registerUser(user, (error, data) => {
          
          if (error) {
            console.log("in controller1",user.error);
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
        console.log('Internal server error');
        return res.status(500).json({
          success: false, message: "Error While Registering",
          data: null,
        });
      }
    }
}
module.exports = new Controller();