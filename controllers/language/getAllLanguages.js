const pool = require("../../dbConfig.js");
const getAllLanguages = async (req, res) => {
  const client = await pool.connect();
  try {
    const result = await client.query(
      "SELECT * FROM moviez.lang ORDER BY lang_name"
    );
    const languages = result.rows;
    res.send({ status: 0, languages });
  } catch (error) {
    res.send({ status: 1, error });
  } finally {
    client.release();
  }
};
module.exports = getAllLanguages;
