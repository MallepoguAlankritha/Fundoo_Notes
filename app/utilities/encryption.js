const bcrypt = require('bcrypt');
const jwt=require('jsonwebtoken');
class Helper {
    
    token = (data) => {
        const dataForToken = {
          id: data._id,
          firstName: data.firstName,
          lastName: data.lastName,
          email: data.email
        };
        return jwt.sign({ dataForToken }, process.env.JWT_SECRET, { expiresIn: '24H' });
      };
      comparePassword = (password, result) => {
        return bcrypt.compareSync(password, result);
      }
}

module.exports = new Helper();