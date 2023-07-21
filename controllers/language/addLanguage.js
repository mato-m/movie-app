const pool = require("../../dbConfig.js");
const uuid = require("uuid");

const addLanguage = async (req, res) => {
  if (req.user.usr_role == 1) {
    const client = await pool.connect();

    try {
      const { lang_name } = req.body;

      if (lang_name.trim().length < 1 || lang_name.trim().length > 20) {
        res.send({
          status: 3,
          message: "Language name must have between 1 and 20 characters",
        });
        return;
      }

      const result = await client.query(
        "INSERT INTO moviez.lang (lang_id,lang_name) VALUES ($1,$2)",
        [uuid.v4(), lang_name]
      );
      res.send({ status: 0, message: "Successfully added language" });
    } catch (error) {
      res.send({ status: 1, message: "Error while adding language" });
    } finally {
      client.release();
    }
  } else {
    res.send({ status: 2, message: "Unauthorized" });
  }
};

module.exports = addLanguage;
