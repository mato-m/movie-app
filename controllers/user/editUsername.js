const pool = require("../../dbConfig.js");
const jwt = require("jsonwebtoken");

const editUsername = async (req, res) => {
  if (req.user.usr_id === req.params.usr_id) {
    const client = await pool.connect();
    try {
      const { usr_id } = req.params;
      const { new_username } = req.body;

      // Check if the new username has the correct length (between 1 and 20 characters)
      if (new_username.trim().length < 1 || new_username.trim().length > 20) {
        res.send({
          status: 3,
          message: "Username must have between 1 and 20 characters",
          token: null,
        });
        return;
      }

      // Regular expression for username format validation (letters and numbers only)
      const usernameRegex = /^[a-zA-Z0-9]+$/;

      // Check if the new username format is valid (letters and numbers only)
      if (!usernameRegex.test(new_username)) {
        res.send({
          status: 4,
          message: "Username can only contain letters and numbers",
          token: null,
        });
        return;
      }

      const result = await client.query(
        "UPDATE moviez.usr SET usr_name = $1 WHERE usr_id = $2 RETURNING usr_img, usr_role, usr_mail",
        [new_username, usr_id]
      );

      if (result.rowCount === 0) {
        res.send({ status: 1, message: "User not found", token: null });
        return;
      }

      const { usr_img, usr_role, usr_mail } = result.rows[0];

      const payload = {
        usr_id,
        usr_img,
        usr_role,
        usr_name: new_username,
        usr_mail,
      };

      const token = jwt.sign(payload, process.env.JWT_SECRET);

      res.send({ status: 0, message: "Username updated successfully", token });
    } catch (error) {
      res.send({
        status: 1,
        message: "Error while updating username",
        token: null,
      });
    } finally {
      client.release();
    }
  } else {
    res.send({ status: 2, message: "Unauthorized" });
  }
};

module.exports = editUsername;
