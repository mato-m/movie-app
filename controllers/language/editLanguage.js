const pool = require("../../dbConfig.js");

const editLanguage = async (req, res) => {
  if (req.user.usr_role === 1) {
    const client = await pool.connect();

    try {
      const { lang_name } = req.body;
      const { lang_id } = req.params;

      if (lang_name.trim().length < 1 || lang_name.trim().length > 20) {
        res.send({
          status: 3,
          message: "Language name must have between 1 and 20 characters",
        });
        return;
      }

      const result = await client.query(
        "UPDATE moviez.lang SET lang_name = $1 WHERE lang_id = $2",
        [lang_name, lang_id]
      );
      res.send({ status: 0, message: "Successfully changed language name" });
    } catch (error) {
      res.send({ status: 1, message: "Error while changing language name" });
    } finally {
      client.release();
    }
  } else {
    res.send({ status: 2, message: "Unauthorized" });
  }
};

module.exports = editLanguage;
