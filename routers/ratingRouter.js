const express = require("express");
const rateMovie = require("../controllers/rating/rateMovie");
const removeRating = require("../controllers/rating/removeRating");
const showUserRatings = require("../controllers/rating/showUserRatings");
const jwtMiddleware = require("../jwtMiddleware");
const ratingRouter = express.Router();
ratingRouter.post("", jwtMiddleware, rateMovie);
ratingRouter.delete("", jwtMiddleware, removeRating);
ratingRouter.get("/:user_id", jwtMiddleware, showUserRatings);
module.exports = ratingRouter;
