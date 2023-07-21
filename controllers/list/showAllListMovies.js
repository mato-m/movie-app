const pool = require("../../dbConfig.js");
const showAllListMovies = async (req, res) => {
  const client = await pool.connect();
  try {
    const { lst_id } = req.params;
    const result = await client.query(
      "SELECT m.movie_id, m.movie_name,m.movie_year,m.movie_img FROM moviez.lst_movie lm JOIN moviez.movie m ON lm.movie_id = m.movie_id WHERE lm.lst_id = $1",
      [lst_id]
    );

    const movies = result.rows;

    res.send({ status: 0, movies });
  } catch (error) {
    res.send({
      status: 1,
      message: "Error while retrieving movies from the list",
    });
  } finally {
    client.release();
  }
};

module.exports = showAllListMovies;
