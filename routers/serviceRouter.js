const express = require("express");
const getAllServices = require("../controllers/service/getServices");
const addService = require("../controllers/service/addService");
const removeService = require("../controllers/service/removeService");
const editService = require("../controllers/service/editService");
const serviceRouter = express.Router();

serviceRouter.route("").get(getAllServices).post(addService);
serviceRouter.route("/:serv_id").delete(removeService).put(editService);

module.exports = serviceRouter;
