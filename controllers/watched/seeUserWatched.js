const pool = require("../../dbConfig.js");

const seeUserWatched = async (req, res) => {
  const client = await pool.connect();
  try {
    const { userId } = req.params;
    const result = await client.query(
      "SELECT m.movie_id, m.movie_name,m.movie_img,m.movie_year, w.watched_time FROM moviez.movie m INNER JOIN moviez.watched w ON m.movie_id = w.watched_movie_id WHERE w.watched_user_id = $1 ORDER BY w.watched_time DESC",
      [userId]
    );
    const watchedMovies = result.rows;
    res.send({ status: 0, message: "Success", data: watchedMovies });
  } catch (error) {
    res.send({ status: 1, message: "Error while retrieving watched movies" });
  } finally {
    client.release();
  }
};

module.exports = seeUserWatched;
