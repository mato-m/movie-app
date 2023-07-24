const express = require("express");
const showPersons = require("../controllers/person/showPersons");
const addPerson = require("../controllers/person/addPerson");
const removePerson = require("../controllers/person/removePerson");
const editPerson = require("../controllers/person/editPerson");
const showOnePerson = require("../controllers/person/showOnePerson");

const persRouter = express.Router();

persRouter.route("").get(showPersons).post(addPerson);
persRouter
  .route("/:pers_id")
  .delete(removePerson)
  .put(editPerson)
  .get(showOnePerson);

module.exports = persRouter;
