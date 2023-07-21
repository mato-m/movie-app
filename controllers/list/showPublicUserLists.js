const pool = require("../../dbConfig.js");

const showPublicUserLists = async (req, res) => {
  const client = await pool.connect();
  try {
    const { lst_usr_id } = req.params;

    const result = await client.query(
      "SELECT * FROM moviez.lst WHERE lst_usr_id = $1 AND lst_private = 0 ORDER BY lst_timestamp DESC",
      [lst_usr_id]
    );

    const lists = result.rows;
    res.send({
      status: 0,
      message: "Successfully retrieved public user lists",
      lists,
    });
  } catch (error) {
    res.send({ status: 1, message: "Error retrieving public user lists" });
  } finally {
    client.release();
  }
};

module.exports = showPublicUserLists;
