const pool = require("../../dbConfig.js");
const editGenre = async (req, res) => {
  if (req.user.usr_role === 1) {
    const client = await pool.connect();
    try {
      const { genre_name } = req.body;
      const { genre_id } = req.params;
      if (genre_name.trim().length < 1 || genre_name.trim().length > 20) {
        res.send({
          status: 3,
          message: "Genre name must have between 1 and 20 characters",
        });
        return;
      }
      await client.query(
        "UPDATE moviez.genre SET genre_name = $1 WHERE genre_id = $2",
        [genre_name, genre_id]
      );
      res.send({ status: 0, message: "Successfully changed genre name" });
    } catch (error) {
      res.send({ status: 1, message: "Error while changing genre name" });
    } finally {
      client.release();
    }
  } else {
    res.send({ status: 2, message: "Unauthorized" });
  }
};

module.exports = editGenre;
