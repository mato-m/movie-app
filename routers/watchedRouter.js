const express = require("express");
const addToWatched = require("../controllers/watched/addToWatched");
const removeFromWatched = require("../controllers/watched/removeFromWatched");
const seeUserWatched = require("../controllers/watched/seeUserWatched");
const watchedRouter = express.Router();

watchedRouter.post("/:userId/:movieId", addToWatched);

watchedRouter.delete("/:userId/:movieId", removeFromWatched);

watchedRouter.get("/:userId", seeUserWatched);

module.exports = watchedRouter;
