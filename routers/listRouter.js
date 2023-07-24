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
const listRouter = express.Router();

listRouter.get("/movies/:lst_id", showAllListMovies);
listRouter.delete("/remove", removeMovieFromList);
listRouter.post("", createList);

listRouter.get(
  "/:lst_usr_id/:movie_id",

  getUserListsAndMovieInfo
);
listRouter.get("/:lst_usr_id/all", showAllUserLists);

listRouter.get("/:lst_usr_id/public", showPublicUserLists);

listRouter.put("/:lst_id", changeList);

listRouter.delete("/:lst_id", deleteList);

listRouter.post("/add", addMovieToList);

module.exports = listRouter;
