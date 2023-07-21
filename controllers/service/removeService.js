const pool = require("../../dbConfig.js");

const removeService = async (req, res) => {
  if (req.user.usr_role == 1) {
    const client = await pool.connect();
    try {
      await client.query("BEGIN");

      await client.query(
        "DELETE FROM moviez.serv_movie WHERE sm_service_id=$1",
        [req.params.serv_id]
      );

      await client.query("DELETE FROM moviez.serv WHERE serv_id=$1", [
        req.params.serv_id,
      ]);

      await client.query("COMMIT");

      res.send({ status: 0, message: "Successfully removed service" });
    } catch (error) {
      await client.query("ROLLBACK");
      throw error;
    } finally {
      client.release();
    }
  } else {
    res.send({ status: 2, message: "Unauthorized" });
  }
};

module.exports = removeService;
