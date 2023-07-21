const express = require("express");
const showPersons = require("../controllers/person/showPersons");
const addPerson = require("../controllers/person/addPerson");
const removePerson = require("../controllers/person/removePerson");
const editPerson = require("../controllers/person/editPerson");
const showOnePerson = require("../controllers/person/showOnePerson");
const jwtMiddleware = require("../jwtMiddleware");

const persRouter = express.Router();

persRouter
  .route("")
  .get(jwtMiddleware, showPersons)
  .post(jwtMiddleware, addPerson);
persRouter
  .route("/:pers_id")
  .delete(jwtMiddleware, removePerson)
  .put(jwtMiddleware, editPerson)
  .get(jwtMiddleware, showOnePerson);

module.exports = persRouter;
