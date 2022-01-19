const {
  create,
  deleteOne,
  deleteOneFinal,
  readAll,
  readOneById,
  updateOneById,
  readOneByFilter,
} = require('../../DL/controllers/userController');

const jwt = require('jsonwebtoken'),
  bcryptjs = require('bcryptjs');

require('dotenv').config();

const login = async (req) => {
  const { password, email } = req.body;
  if (!password || !email) throw 'mising data';

  let foundUser = await readOneByFilter({ email }, '+password');

  if (!foundUser) throw 'wrong email';
  if (!bcryptjs.compareSync(password, foundUser.password)) throw 'wrong password';

  const { _id, name, img, auth } = foundUser;
  const token = jwt.sign({ _id }, process.env.SECRET, { expiresIn: '10h' });

  foundUser.lastLog = Date.now();
  foundUser.token = token;

  const newUser = await updateOneById(_id, foundUser);
  console.log('update user', newUser);

  const isAdmin = auth === 'admin';
  return { token, user: { name, img, isAdmin } };
};

const tokenConnect = async (req) => {
  const Token = req.headers.authorization;

  const { _id, exp } = jwt.decode(Token);

  const foundUser = await readOneByFilter({ _id }, '+token');

  if (Token !== foundUser.token || Date.now() >= exp * 1000) throw 'not auth';

  const { name, img, auth } = foundUser;

  const isAdmin = auth === 'admin';

  // console.log(foundUser);

  return { user: { name, img, isAdmin } };
};

const signUp = async (req) => {
  const { name, password, email, auth } = req.body;
  if (!name || !password || !email) throw 'mising data';

  const hassPassword = bcryptjs.hashSync(password, 8);

  await create({ name, password: hassPassword, email, auth });
  return true;
};

const update = async (req) => {
  console.log(req.body);
  return 'work';
};

const del = async (req) => {
  console.log(req.body);
  return 'work';
};

const read = async (req) => await readAll();

module.exports = { del, update, signUp, login, read, tokenConnect };
