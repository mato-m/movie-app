const pool = require("../../dbConfig.js");

const deleteList = async (req, res) => {
  const client = await pool.connect();

  try {
    const { lst_id } = req.params;

    // Start the transaction
    await client.query("BEGIN");

    // Check if the list exists and retrieve its lst_usr_id
    const listQueryResult = await client.query(
      "SELECT lst_usr_id FROM moviez.lst WHERE lst_id = $1 FOR UPDATE",
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

    // Compare lst_usr_id with the authenticated user's usr_id
    if (lst_usr_id !== req.user.usr_id) {
      res.send({
        status: 2,
        message: "Unauthorized",
      });
      return;
    }

    // Remove the list from lst_movie table
    await client.query("DELETE FROM moviez.lst_movie WHERE lst_id = $1", [
      lst_id,
    ]);

    // Perform the list deletion
    await client.query("DELETE FROM moviez.lst WHERE lst_id = $1", [lst_id]);

    await client.query("COMMIT");

    res.send({ status: 0, message: "Successfully deleted the list" });
  } catch (error) {
    await client.query("ROLLBACK");

    res.send({ status: 3, message: "Error deleting the list" });
  } finally {
    client.release();
  }
};

module.exports = deleteList;
