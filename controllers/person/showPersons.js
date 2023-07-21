const pool = require("../../dbConfig.js");
const showPersons = async (req, res) => {
  const client = await pool.connect();
  try {
    const result = await client.query(
      "SELECT * FROM moviez.pers ORDER BY pers_fn"
    );
    const people = result.rows;
    res.send({ status: 0, people });
  } catch (error) {
    res.send({ status: 1, error });
  } finally {
    client.release();
  }
};
module.exports = showPersons;
