const pool = require("../../dbConfig.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const login = async (req, res) => {
  const client = await pool.connect();
  try {
    const { usr_mail, usr_pass } = req.body;

    const result = await client.query(
      "SELECT * FROM moviez.usr WHERE usr_mail = $1",
      [usr_mail]
    );

    if (result.rows.length === 0) {
      res.send({ status: 1, message: "Invalid email" });
      return;
    }

    const user = result.rows[0];
    const isPasswordValid = await bcrypt.compare(usr_pass, user.usr_passhash);

    if (!isPasswordValid) {
      res.send({ status: 1, message: "Invalid password" });
      return;
    }

    const token = jwt.sign(
      {
        usr_id: user.usr_id,
        usr_name: user.usr_name,
        usr_mail: user.usr_mail,
        usr_img: user.usr_img,
        usr_role: user.usr_role,
      },
      process.env.JWT_SECRET
    );
    res.send({ status: 0, message: "Login successful", token });
  } catch (error) {
    res.send({ status: 1, message: "Error while logging in" });
  } finally {
    client.release();
  }
};

module.exports = login;
