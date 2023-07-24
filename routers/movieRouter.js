const express = require("express");
const addMovie = require("../controllers/movie/addMovie");
const deleteMovie = require("../controllers/movie/deleteMovie");
const getMoviesByFilter = require("../controllers/movie/getMoviesByFilter");
const updateMovie = require("../controllers/movie/updateMovie");
const getMovieById = require("../controllers/movie/getMovieById");
const movieRouter = express.Router();

movieRouter.get("", getMoviesByFilter);
movieRouter.get("/:movie_id", getMovieById);
movieRouter.post("", addMovie);

movieRouter.delete("/:movie_id", deleteMovie);
movieRouter.put("/:movie_id", updateMovie);

module.exports = movieRouter;
