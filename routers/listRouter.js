const express = require("express");
const createList = require("../controllers/list/createList");
const showAllUserLists = require("../controllers/list/showAllUserLists");
const showPublicUserLists = require("../controllers/list/showPublicUserLists");
const deleteList = require("../controllers/list/deleteList");
const removeMovieFromList = require("../controllers/list/removeMovieFromList");
const addMovieToList = require("../controllers/list/addMovieToList");
const showAllListMovies = require("../controllers/list/showAllListMovies");
const changeList = require("../controllers/list/changeList");
const getUserListsAndMovieInfo = require("../controllers/list/showAllUserLists");
const jwtMiddleware = require("../jwtMiddleware");
const listRouter = express.Router();

listRouter.get("/movies/:lst_id", jwtMiddleware, showAllListMovies);
listRouter.delete("/remove", jwtMiddleware, removeMovieFromList);
listRouter.post("", jwtMiddleware, createList);

listRouter.get(
  "/:lst_usr_id/:movie_id",
  jwtMiddleware,
  getUserListsAndMovieInfo
);
listRouter.get("/:lst_usr_id/all", jwtMiddleware, showAllUserLists);

listRouter.get("/:lst_usr_id/public", jwtMiddleware, showPublicUserLists);

listRouter.put("/:lst_id", jwtMiddleware, changeList);

listRouter.delete("/:lst_id", jwtMiddleware, deleteList);

listRouter.post("/add", jwtMiddleware, addMovieToList);

module.exports = listRouter;
