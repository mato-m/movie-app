require("dotenv").config();
const cors = require("cors");
const path = require("path");
const express = require("express");
const genreRouter = require("./routers/genreRouter");
const langRouter = require("./routers/langRouter");
const serviceRouter = require("./routers/serviceRouter");
const persRouter = require("./routers/persRouter");
const userRouter = require("./routers/userRouter");
const watchedRouter = require("./routers/watchedRouter");
const ratingRouter = require("./routers/ratingRouter");
const listRouter = require("./routers/listRouter");
const movieRouter = require("./routers/movieRouter");
const jwtMiddleware = require("./jwtMiddleware");

const app = express();
app.use(express.json());
app.use(cors());
app.use(express.static(path.join(__dirname, "dist")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "dist", "index.html"));
});
app.use("/genres", jwtMiddleware, genreRouter);
app.use("/languages", jwtMiddleware, langRouter);
app.use("/services", jwtMiddleware, serviceRouter);
app.use("/person", jwtMiddleware, persRouter);
app.use("/user", userRouter);
app.use("/watched", jwtMiddleware, watchedRouter);
app.use("/ratings", jwtMiddleware, ratingRouter);
app.use("/lists", jwtMiddleware, listRouter);
app.use("/movies", jwtMiddleware, movieRouter);
const port = process.env.PORT;
app.listen(port, () => console.log("Server started on port " + port));
