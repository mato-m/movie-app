const express = require("express");
const getAllGenres = require("../controllers/genre/getAllGenres");
const addGenre = require("../controllers/genre/addGenre");
const removeGenre = require("../controllers/genre/removeGenre");
const editGenre = require("../controllers/genre/editGenre");
const jwtMiddleware = require("../jwtMiddleware");
const genreRouter = express.Router();
genreRouter
  .route("")
  .get(jwtMiddleware, getAllGenres)
  .post(jwtMiddleware, addGenre);
genreRouter
  .route("/:genre_id")
  .delete(jwtMiddleware, removeGenre)
  .put(jwtMiddleware, editGenre);
module.exports = genreRouter;
