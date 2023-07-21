const express = require("express");
const addToWatched = require("../controllers/watched/addToWatched");
const removeFromWatched = require("../controllers/watched/removeFromWatched");
const seeUserWatched = require("../controllers/watched/seeUserWatched");
const jwtMiddleware = require("../jwtMiddleware");
const watchedRouter = express.Router();

watchedRouter.post("/:userId/:movieId", jwtMiddleware, addToWatched);

watchedRouter.delete("/:userId/:movieId", jwtMiddleware, removeFromWatched);

watchedRouter.get("/:userId", jwtMiddleware, seeUserWatched);

module.exports = watchedRouter;
