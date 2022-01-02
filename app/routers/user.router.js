/**
 * @module       routes
 * @file         user.router.js
 * @description  API Routing
 * @author       Alankritha
 */
const controllers = require('../controllers/user.controllers');
const noteController = require('../controllers/noteController');
const helperclass = require('../utilities/helperclass');
const label = require('../controllers/label.controller');
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
 // api for getnote
 app.get("/getNote", helperclass.validateToken, noteController.getNote);
 // api for getNoteById
 app.get("/getNote/:id", helperclass.validateToken, noteController.getNoteById);
// api for updateNoteById
app.put("/updateNote/:id", helperclass.validateToken, noteController.updateNoteById);
// api for DeleteNoteById
app.delete("/deleteNote/:id", helperclass.validateToken, noteController.deleteNoteById);
 // api for addLabel By Id 
 app.post('/addlabel/:id', helperclass.validateToken, label.addLabelById);
}
