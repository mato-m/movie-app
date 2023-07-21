const pool = require("../../dbConfig.js");
const getAllGenres = async (req, res) => {
  const client = await pool.connect();
  try {
    const result = await client.query(
      "SELECT * FROM moviez.genre ORDER BY genre_name"
    );
    const genres = result.rows;
    res.send({ status: 0, genres });
  } catch (error) {
    res.send({ status: 1, error });
  } finally {
    client.release();
  }
};
module.exports = getAllGenres;
