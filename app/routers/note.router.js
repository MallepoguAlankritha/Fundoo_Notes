const controllers = require('../controllers/note.controllers');
module.exports = (app) => {
  // api for registration
  app.post('/registeruser', controllers.register);
// api for login
   app.post('/login',controllers.login);
}
