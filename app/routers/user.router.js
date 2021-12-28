/**
 * @module       routes
 * @file         note.router.js
 * @description  API Routing
 * @author       Alankritha
 */
const controllers = require('../controllers/user.controllers');
const noteController = require('../controllers/noteController');
const helperclass = require('../utilities/helperclass');
module.exports = (app) => {
  // api for registration
  app.post('/registeruser', controllers.register);
// api for login
   app.post('/login',controllers.login);
   // api for forgot password
  app.post("/forgotPassword",controllers.forgotPassword);
  // api for Reset Password
  app.put("/resetPassword",controllers.resetPassword);
// api for createNote
app.post("/createNote", helperclass.validateToken, noteController.createNote);
}
