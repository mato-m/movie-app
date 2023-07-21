const express = require("express");
const getAllServices = require("../controllers/service/getServices");
const addService = require("../controllers/service/addService");
const removeService = require("../controllers/service/removeService");
const editService = require("../controllers/service/editService");
const jwtMiddleware = require("../jwtMiddleware");
const serviceRouter = express.Router();

serviceRouter
  .route("")
  .get(jwtMiddleware, getAllServices)
  .post(jwtMiddleware, addService);
serviceRouter
  .route("/:serv_id")
  .delete(jwtMiddleware, removeService)
  .put(jwtMiddleware, editService);

module.exports = serviceRouter;
