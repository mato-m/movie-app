const express = require("express");
const rateMovie = require("../controllers/rating/rateMovie");
const removeRating = require("../controllers/rating/removeRating");
const showUserRatings = require("../controllers/rating/showUserRatings");
const ratingRouter = express.Router();
ratingRouter.post("", rateMovie);
ratingRouter.delete("", removeRating);
ratingRouter.get("/:user_id", showUserRatings);
module.exports = ratingRouter;
