const pool = require("../../dbConfig.js");

const editService = async (req, res) => {
  if (req.user.usr_role === 1) {
    const client = await pool.connect();
    try {
      const { serv_name } = req.body;
      const { serv_id } = req.params;

      // Check if the service name has the correct length
      if (serv_name.trim().length < 1 || serv_name.trim().length > 20) {
        res.send({
          status: 3,
          message: "Service name must have between 1 and 20 characters",
        });
        return;
      }

      const result = await client.query(
        "UPDATE moviez.serv SET serv_name = $1 WHERE serv_id = $2",
        [serv_name, serv_id]
      );
      res.send({ status: 0, message: "Successfully changed service name" });
    } catch (error) {
      res.send({ status: 1, message: "Error while changing service name" });
    } finally {
      client.release();
    }
  } else {
    res.send({ status: 2, message: "Unauthorized" });
  }
};

module.exports = editService;
