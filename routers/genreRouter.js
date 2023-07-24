const express = require("express");
const getAllGenres = require("../controllers/genre/getAllGenres");
const addGenre = require("../controllers/genre/addGenre");
const removeGenre = require("../controllers/genre/removeGenre");
const editGenre = require("../controllers/genre/editGenre");
const genreRouter = express.Router();
genreRouter.route("").get(getAllGenres).post(addGenre);
genreRouter.route("/:genre_id").delete(removeGenre).put(editGenre);
module.exports = genreRouter;
