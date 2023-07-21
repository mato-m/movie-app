const pool = require("../../dbConfig.js");

const addToWatched = async (req, res) => {
  if (req.user.usr_id == req.params.userId) {
    const client = await pool.connect();
    try {
      const { userId, movieId } = req.params;
      await client.query(
        "INSERT INTO moviez.watched (watched_user_id, watched_movie_id) VALUES ($1, $2)",
        [userId, movieId]
      );
      res.send({ status: 0, message: "Movie added to watched list" });
    } catch (error) {
      res.send({
        status: 1,
        message: "Error while adding movie to watched list" + error,
      });
    } finally {
      client.release();
    }
  } else {
    res.send({ status: 2, message: "Unauthorized" });
  }
};

module.exports = addToWatched;
