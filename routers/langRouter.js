const express = require("express");
const getAllLanguages = require("../controllers/language/getAllLanguages");
const addLanguage = require("../controllers/language/addLanguage");
const removeLanguage = require("../controllers/language/removeLanguage");
const editLanguage = require("../controllers/language/editLanguage");
const jwtMiddleware = require("../jwtMiddleware");
const langRouter = express.Router();
langRouter
  .route("")
  .get(jwtMiddleware, getAllLanguages)
  .post(jwtMiddleware, addLanguage);
langRouter
  .route("/:lang_id")
  .delete(jwtMiddleware, removeLanguage)
  .put(jwtMiddleware, editLanguage);
module.exports = langRouter;
