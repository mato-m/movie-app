const pool = require("../../dbConfig.js");
const getAllServices = async (req, res) => {
  const client = await pool.connect();
  try {
    const result = await client.query(
      "SELECT * FROM moviez.serv ORDER BY serv_name"
    );
    const services = result.rows;
    res.send({ status: 0, services });
  } catch (error) {
    res.send({ status: 1, error });
  } finally {
    client.release();
  }
};
module.exports = getAllServices;
