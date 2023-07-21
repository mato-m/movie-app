const express = require("express");
const addMovie = require("../controllers/movie/addMovie");
const deleteMovie = require("../controllers/movie/deleteMovie");
const getMoviesByFilter = require("../controllers/movie/getMoviesByFilter");
const updateMovie = require("../controllers/movie/updateMovie");
const getMovieById = require("../controllers/movie/getMovieById");
const jwtMiddleware = require("../jwtMiddleware");
const movieRouter = express.Router();

movieRouter.get("", jwtMiddleware, getMoviesByFilter);
movieRouter.get("/:movie_id", jwtMiddleware, getMovieById);
movieRouter.post("", jwtMiddleware, addMovie);

movieRouter.delete("/:movie_id", jwtMiddleware, deleteMovie);
movieRouter.put("/:movie_id", jwtMiddleware, updateMovie);

module.exports = movieRouter;
