const pool = require("../../dbConfig.js");

const rateMovie = async (req, res) => {
  if (req.user.usr_id == req.body.rating_user_id) {
    const client = await pool.connect();
    try {
      const { rating_user_id, rating_movie_id, rating } = req.body;
      const existingRatingQuery = `
      SELECT COUNT(*) AS rating_count
      FROM moviez.rating
      WHERE rating_user_id = $1 AND rating_movie_id = $2
    `;
      const existingRatingResult = await client.query(existingRatingQuery, [
        rating_user_id,
        rating_movie_id,
      ]);
      const ratingCount = existingRatingResult.rows[0].rating_count;

      if (ratingCount > 0) {
        const updateRatingQuery = `
        UPDATE moviez.rating
        SET rating = $1
        WHERE rating_user_id = $2 AND rating_movie_id = $3
      `;
        await client.query(updateRatingQuery, [
          rating,
          rating_user_id,
          rating_movie_id,
        ]);
      } else {
        const addRatingQuery = `
        INSERT INTO moviez.rating (rating_user_id, rating_movie_id, rating)
        VALUES ($1, $2, $3)
      `;
        await client.query(addRatingQuery, [
          rating_user_id,
          rating_movie_id,
          rating,
        ]);
      }

      res.send({ status: 0, message: "Successfully rated the movie." });
    } catch (error) {
      res.send({ status: 1, message: "Error while rating the movie." });
    } finally {
      client.release();
    }
  } else {
    res.send({ status: 2, message: "Unauthorized" });
  }
};

module.exports = rateMovie;
