const pool = require("../../dbConfig.js");
const uuid = require("uuid");
const addGenre = async (req, res) => {
  if (req.user.usr_role === 1) {
    const client = await pool.connect();
    try {
      const { genre_name } = req.body;
      if (genre_name.trim().length < 1 || genre_name.trim().length > 20) {
        res.send({
          status: 3,
          message: "Genre name must have between 1 and 20 characters",
        });
        return;
      }
      await client.query(
        "INSERT INTO moviez.genre (genre_id, genre_name) VALUES ($1, $2)",
        [uuid.v4(), genre_name]
      );
      res.send({ status: 0, message: "Successfully added genre" });
    } catch (error) {
      res.send({ status: 1, message: "Error while adding genre" });
    } finally {
      client.release();
    }
  } else {
    res.send({ status: 2, message: "Unauthorized" });
  }
};

module.exports = addGenre;
