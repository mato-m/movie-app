const pool = require("../../dbConfig.js");
const fs = require("fs");

const deleteMovie = async (req, res) => {
  if (req.user.usr_role == 1) {
    const client = await pool.connect();
    try {
      const { movie_id } = req.params;
      const movieResult = await client.query(
        "SELECT movie_img FROM moviez.movie WHERE movie_id = $1",
        [movie_id]
      );

      const movieImg = movieResult.rows[0].movie_img;

      await client.query("BEGIN");
      await client.query(
        "DELETE FROM moviez.rating WHERE rating_movie_id = $1",
        [movie_id]
      );

      await client.query("DELETE FROM moviez.lst_movie WHERE movie_id = $1", [
        movie_id,
      ]);

      await client.query(
        "DELETE FROM moviez.lang_movie WHERE lm_movie_id = $1",
        [movie_id]
      );

      await client.query(
        "DELETE FROM moviez.serv_movie WHERE sm_movie_id = $1",
        [movie_id]
      );

      await client.query(
        "DELETE FROM moviez.genre_movie WHERE gm_movie_id = $1",
        [movie_id]
      );
      await client.query(
        "DELETE FROM moviez.pers_movie WHERE pm_movie_id = $1",
        [movie_id]
      );

      await client.query(
        "DELETE FROM moviez.watched WHERE watched_movie_id = $1",
        [movie_id]
      );

      await client.query("DELETE FROM moviez.movie WHERE movie_id = $1", [
        movie_id,
      ]);

      await client.query("COMMIT");

      if (movieImg !== "movie.jpg") {
        const filePath = `uploads/movies/${movieImg}`;
        if (fs.existsSync(filePath)) {
          fs.unlinkSync(filePath);
        }
      }

      res.send({ status: 0, message: "Movie deleted successfully." });
    } catch (error) {
      await client.query("ROLLBACK");
      res.send({ status: 1, message: "Error while deleting movie." });
    } finally {
      client.release();
    }
  } else {
    res.send({ status: 2, message: "Unauthorized" });
  }
};

module.exports = deleteMovie;
