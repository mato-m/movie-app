const pool = require("../../dbConfig.js");
const jwt = require("jsonwebtoken");

const editEmail = async (req, res) => {
  if (req.user.usr_id == req.params.usr_id) {
    const client = await pool.connect();

    try {
      const { usr_id } = req.params;
      const { newEmail } = req.body;

      // Regular expression for email format validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      // Check if the new email has the correct format
      if (!emailRegex.test(newEmail)) {
        res.send({
          status: 3,
          message: "Invalid email format",
          token: null,
        });
        return;
      }

      // Check if the new email length is between 1 and 30 characters
      if (newEmail.trim().length < 1 || newEmail.trim().length > 30) {
        res.send({
          status: 4,
          message: "Email must have between 1 and 30 characters",
          token: null,
        });
        return;
      }

      const result = await client.query(
        "UPDATE moviez.usr SET usr_mail = $1 WHERE usr_id = $2 RETURNING usr_name, usr_img, usr_role",
        [newEmail, usr_id]
      );

      if (result.rowCount === 0) {
        res.send({ status: 1, message: "User not found", token: null });
        return;
      }

      const { usr_img, usr_role, usr_name } = result.rows[0];

      const payload = {
        usr_id,
        usr_img,
        usr_role,
        usr_name,
        usr_mail: newEmail,
      };

      const token = jwt.sign(payload, process.env.JWT_SECRET);

      res.send({ status: 0, message: "Email updated successfully", token });
    } catch (error) {
      res.send({
        status: 1,
        message: "Error while updating email",
        token: null,
      });
    } finally {
      client.release();
    }
  } else {
    res.send({ status: 2, message: "Unauthorized" });
  }
};

module.exports = editEmail;
