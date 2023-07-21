const pool = require("../../dbConfig.js");
const uuid = require("uuid");

const addService = async (req, res) => {
  if (req.user.usr_role === 1) {
    const client = await pool.connect();

    try {
      const { serv_name } = req.body;

      // Check if the service name has the correct length
      if (serv_name.trim().length < 1 || serv_name.trim().length > 20) {
        res.send({
          status: 3,
          message: "Service name must have between 1 and 20 characters",
        });
        return;
      }

      const result = await client.query(
        "INSERT INTO moviez.serv (serv_id, serv_name) VALUES ($1, $2)",
        [uuid.v4(), serv_name]
      );
      res.send({ status: 0, message: "Successfully added service" });
    } catch (error) {
      res.send({ status: 1, message: "Error while adding service" });
    } finally {
      client.release();
    }
  } else {
    res.send({ status: 2, message: "Unauthorized" });
  }
};

module.exports = addService;
