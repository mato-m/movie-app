const pool = require("../../dbConfig.js");

const removeRating = async (req, res) => {
  if (req.user.usr_id == req.body.rating_user_id) {
    const client = await pool.connect();

    try {
      const { rating_user_id, rating_movie_id } = req.body;

      const result = await client.query(
        "DELETE FROM moviez.rating WHERE rating_user_id = $1 AND rating_movie_id = $2",
        [rating_user_id, rating_movie_id]
      );

      res.send({ status: 0, message: "Successfully removed the rating." });
    } catch (error) {
      res.send({ status: 1, message: "Error while removing the rating." });
    } finally {
      client.release();
    }
  } else {
    res.send({ status: 2, message: "Unauthorized" });
  }
};

module.exports = removeRating;
