const pool = require("../../dbConfig.js");

const seeProfile = async (req, res) => {
  const client = await pool.connect();
  try {
    const { usr_id } = req.params;

    const result = await client.query(
      "SELECT usr_id, usr_name, usr_img FROM moviez.usr WHERE usr_id = $1",
      [usr_id]
    );

    if (result.rows.length === 0) {
      res.send({ status: 1, message: "User not found" });
      return;
    }

    const userProfile = result.rows[0];
    res.send({
      status: 0,
      message: "Profile retrieved successfully",
      userProfile,
    });
  } catch (error) {
    res.send({ status: 1, message: "Error while retrieving profile" });
  } finally {
    client.release();
  }
};

module.exports = seeProfile;
