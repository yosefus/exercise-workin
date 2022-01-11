const {
  create,
  deleteOneFinal,
  readAll,
  readOneById,
  updateOneById,
} = require('../../DL/controllers/exerciseController');

const createOne = async (req) => {
  if (!req.body) throw 'missing data';
  return await create(req.body);
};

const update = async (req) => {
  const id = req.params.id;
  if (!id) throw 'missing data';

  const foundExercise = await readOneById(id);
  if (!foundExercise) throw `we don't find this id`;

  const { status, title, description, type, difficulty, labels, programingLanguage, content, solution } =
    req.body;
  const newData = {
    status,
    title,
    description,
    type,
    difficulty,
    labels,
    programingLanguage,
    content,
    solution,
  };

  let filteredData = {};
  for (let prop in newData) {
    if (newData[prop]) filteredData[prop] = newData[prop];
  }

  return await updateOneById(id, filteredData);
};

const del = async (req) => {
  const id = req.params.id;
  if (!id) throw 'missing data';

  const exercise = await readOneById(id);
  if (!exercise) throw 'there is no exercise with that id';

  return await deleteOneFinal(id);
};

const read = async (req) => {
  return await readAll();
};

const readOne = async (req) => {
  const id = req.params.id;
  if (!id) throw 'missing data';
  const found = await readOneById(id);
  if (typeof found !== 'object') throw 'didnt found one';
  return found;
};

const readByLang = async (req) => {
  const id = req.params.id;
  if (!id) throw 'missing data';
  return await readAll({ programingLanguage: id });
};

const createAll = async (req) => {
  req.body.forEach(async (e) => await create(e));
  return 'create succsesfully';
};

module.exports = { createAll, createOne, update, del, read, readOne, readByLang };
