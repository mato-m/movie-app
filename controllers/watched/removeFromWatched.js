const pool = require("../../dbConfig.js");

const removeFromWatched = async (req, res) => {
  if (req.user.usr_id == req.params.userId) {
    const client = await pool.connect();
    try {
      const { userId, movieId } = req.params;
      await client.query(
        "DELETE FROM moviez.watched WHERE watched_user_id = $1 AND watched_movie_id = $2",
        [userId, movieId]
      );
      res.send({ status: 0, message: "Movie removed from watched list" });
    } catch (error) {
      res.send({
        status: 1,
        message: "Error while removing movie from watched list",
      });
    } finally {
      client.release();
    }
  } else {
    res.send({ status: 2, message: "Unauthorized" });
  }
};

module.exports = removeFromWatched;
