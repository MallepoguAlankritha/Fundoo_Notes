/**
 * @module       utilities
 * @file         encryption.js
 * @description  it contains the Hashing and Token
 * @author       Alankritha
 */
const bcrypt = require('bcrypt');
const jwt=require('jsonwebtoken');
class Helper {
  hashing = (password) => {
    return new Promise((resolve, reject) => {
    bcrypt.hash(password, 10)
      .then((err)=> {
        resolve(err);
      }).catch((hash)=> {
         reject(hash);
      });
    });
  }

  token = (data) => {
    const dataForToken = {
      id: data._id,
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email
    };
    return jwt.sign({ dataForToken }, process.env.JWT_SECRET, { expiresIn: '24H' });
  };
  validateToken = (req, res, next) => {
    const header = req.headers.authorization;
    const myArr = header.split(" ");
    const token = myArr[1];
    try {
      if (token) {
        jwt.verify(token, process.env.JWT_SECRET, (error, decoded) => {
          if (error) {
            return res.status(400).send({ success: false, message: 'Invalid Token' });
          } else {
            req.user = decoded;
            next();
          }
        });
      } else {
        return res.status(401).send({ success: false, message: 'Authorisation failed! Invalid user' });
      }
    } catch (error) {
      return res.status(500).send({ success: false, message: 'Something went wrong!' });
    }
  }
  comparePassword = (password, result) => {
    return bcrypt.compare(password, result);
}
jwtTokenVerifyMail = (payload, secretkey, callback) => {
  jwt.sign(
    { email: payload.email },
    secretkey,
    { expiresIn: "50h" },
    (err, token) => {
      if (err) {
        console("11",err);
        return callback("token not generated", null);
      } else {
        console.log("22",token);
        return callback(null, token);
      }
    }
  );
};
};


module.exports = new Helper();