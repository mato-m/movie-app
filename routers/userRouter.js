const express = require("express");
const register = require("../controllers/user/register");
const login = require("../controllers/user/login");
const seeProfile = require("../controllers/user/seeProfile");
const editUsername = require("../controllers/user/editUsername");
const editEmail = require("../controllers/user/editEmail");
const editPassword = require("../controllers/user/editPassword");
const editImg = require("../controllers/user/editImg");
const deleteUser = require("../controllers/user/deleteUser");
const jwtMiddleware = require("../jwtMiddleware");

const userRouter = express.Router();

userRouter.post("/register", register);

userRouter.post("/login", login);

userRouter.get("/profile/:usr_id", jwtMiddleware, seeProfile);

userRouter.put("/edit/username/:usr_id", jwtMiddleware, editUsername);

userRouter.put("/edit/email/:usr_id", jwtMiddleware, editEmail);

userRouter.put("/edit/password/:usr_id", jwtMiddleware, editPassword);

userRouter.put("/edit/img/:usr_id", jwtMiddleware, editImg);
userRouter.delete("/:user_id", jwtMiddleware, deleteUser);

module.exports = userRouter;
