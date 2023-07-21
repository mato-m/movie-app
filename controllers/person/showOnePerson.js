const pool = require("../../dbConfig.js");
const showOnePerson = async (req, res) => {
  const client = await pool.connect();
  try {
    const result = await client.query(
      "SELECT * FROM moviez.pers WHERE pers_id=$1",
      [req.params.pers_id]
    );
    const person = result.rows[0];
    const result2 = await client.query(
      "SELECT * FROM moviez.pers_movie INNER JOIN moviez.movie ON pers_movie.pm_movie_id=movie.movie_id  WHERE pm_pers_id=$1 ORDER BY movie_name",
      [req.params.pers_id]
    );
    const movies = result2.rows;
    res.send({ status: 0, person, movies });
  } catch (error) {
    res.send({ status: 1, error });
  } finally {
    client.release();
  }
};
module.exports = showOnePerson;
