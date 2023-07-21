const pool = require("../../dbConfig.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const editPassword = async (req, res) => {
  if (req.user.usr_id === req.params.usr_id) {
    const client = await pool.connect();
    try {
      const { usr_id } = req.params;
      const { oldPassword, newPassword } = req.body;

      if (newPassword.trim().length < 8 || newPassword.trim().length > 30) {
        res.send({
          status: 3,
          message: "Password must be between 8 and 30 characters",
        });
        return;
      }

      const getUserQuery =
        "SELECT usr_passhash FROM moviez.usr WHERE usr_id = $1";
      const getUserResult = await client.query(getUserQuery, [usr_id]);

      if (getUserResult.rowCount === 0) {
        res.send({ status: 1, message: "User not found" });
        return;
      }

      const { usr_passhash } = getUserResult.rows[0];
      const passwordMatch = await bcrypt.compare(oldPassword, usr_passhash);

      if (!passwordMatch) {
        res.send({
          status: 2,
          message: "Old password is incorrect",
        });
        return;
      }

      const hashedPassword = await bcrypt.hash(newPassword, 12);
      const updatePasswordQuery =
        "UPDATE moviez.usr SET usr_passhash = $1 WHERE usr_id = $2";
      await client.query(updatePasswordQuery, [hashedPassword, usr_id]);

      res.send({ status: 0, message: "Password updated successfully" });
    } catch (error) {
      res.send({
        status: 1,
        message: "Error while updating password",
      });
    } finally {
      client.release();
    }
  } else {
    res.send({ status: 2, message: "Unauthorized" });
  }
};

module.exports = editPassword;
