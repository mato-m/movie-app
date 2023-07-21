const pool = require("../../dbConfig.js");
const uuid = require("uuid");

const createList = async (req, res) => {
  const client = await pool.connect();
  try {
    const { lst_usr_id, lst_name, lst_private } = req.body;

    // Validate list_name length
    if (lst_name.trim().length < 1 || lst_name.trim().length > 20) {
      res.send({
        status: 2,
        message: "List name must be between 1 and 20 characters long",
      });
      return;
    }

    const lst_id = uuid.v4();

    await client.query(
      "INSERT INTO moviez.lst (lst_id, lst_usr_id, lst_name, lst_private) VALUES ($1, $2, $3, $4)",
      [lst_id, lst_usr_id, lst_name, lst_private]
    );

    res.send({ status: 0, message: "Successfully created list" });
  } catch (error) {
    res.send({ status: 1, message: "Error creating list" });
  } finally {
    client.release();
  }
};

module.exports = createList;
