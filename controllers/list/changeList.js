const pool = require("../../dbConfig.js");

const changeList = async (req, res) => {
  const client = await pool.connect();
  try {
    const { lst_id } = req.params;
    const { lst_name, lst_private } = req.body;

    // Validate list_name length
    if (lst_name.trim().length < 1 || lst_name.trim().length > 20) {
      res.send({
        status: 4,
        message: "List name must be between 1 and 20 characters long",
      });
      return;
    }

    const listQueryResult = await pool.query(
      "SELECT lst_usr_id FROM moviez.lst WHERE lst_id = $1",
      [lst_id]
    );

    if (listQueryResult.rows.length === 0) {
      res.send({
        status: 1,
        message: "List not found",
      });
      return;
    }

    const lst_usr_id = listQueryResult.rows[0].lst_usr_id;

    if (lst_usr_id !== req.user.usr_id) {
      res.send({
        status: 2,
        message: "Unauthorized",
      });
      return;
    }

    const result = await client.query(
      "UPDATE moviez.lst SET lst_name = $1, lst_private=$2 WHERE lst_id = $3",
      [lst_name, lst_private, lst_id]
    );
    res.send({ status: 0, message: "Successfully changed list name" });
  } catch (error) {
    res.send({ status: 3, message: "Error changing list name" });
  } finally {
    client.release();
  }
};

module.exports = changeList;
