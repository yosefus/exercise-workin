const jwt = require('jsonwebtoken'),
  { readOneByFilter } = require('../../DL/controllers/userController');

require('dotenv').config();

async function isAdmin(req, res, next) {
  const Token = req.headers.authorization;
  try {
    const { _id, exp } = jwt.decode(Token);
    const foundUser = await readOneByFilter({ _id }, '+token');

    console.log(foundUser.token, Token, 'user');

    if (Token !== foundUser.token || foundUser.auth !== 'admin' || Date.now() >= exp * 1000) throw 'not auth';

    next();
  } catch (error) {
    res.status(400).send(error.message || error);
  }
}

module.exports = isAdmin;
