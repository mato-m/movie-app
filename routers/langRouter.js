const express = require("express");
const getAllLanguages = require("../controllers/language/getAllLanguages");
const addLanguage = require("../controllers/language/addLanguage");
const removeLanguage = require("../controllers/language/removeLanguage");
const editLanguage = require("../controllers/language/editLanguage");
const langRouter = express.Router();
langRouter.route("").get(getAllLanguages).post(addLanguage);
langRouter.route("/:lang_id").delete(removeLanguage).put(editLanguage);
module.exports = langRouter;
