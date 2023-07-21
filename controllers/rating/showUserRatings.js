const pool = require("../../dbConfig.js");
const showUserRatings = async (req, res) => {
  const client = await pool.connect();
  try {
    const { user_id } = req.params;
    const query = `SELECT r.rating,r.time, m.movie_id,m.movie_name,m.movie_year,m.movie_img
      FROM moviez.rating AS r
      JOIN moviez.movie AS m ON r.rating_movie_id = m.movie_id
      WHERE r.rating_user_id = $1`;
    const result = await client.query(query, [user_id]);
    const ratings = result.rows;
    res.send({
      status: 0,
      message: "Successfully retrieved user ratings.",
      data: ratings,
    });
  } catch (error) {
    res.send({ status: 1, message: "Error while retrieving user ratings." });
  } finally {
    client.release();
  }
};
module.exports = showUserRatings;
