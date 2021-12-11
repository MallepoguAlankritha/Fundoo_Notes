const controllers = require('../controllers/note.controllers');
module.exports = (app) => {
  // api for registration
  app.post('/Registeruser', controllers.register);
}