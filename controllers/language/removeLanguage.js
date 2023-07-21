const pool = require("../../dbConfig.js");

const removeLanguage = async (req, res) => {
  if (req.user.usr_role == 1) {
    const client = await pool.connect();

    try {
      await client.query("BEGIN");

      await client.query("DELETE FROM moviez.lang_movie WHERE lm_lang_id=$1", [
        req.params.lang_id,
      ]);

      await client.query("DELETE FROM moviez.lang WHERE lang_id=$1", [
        req.params.lang_id,
      ]);

      await client.query("COMMIT");

      res.send({ status: 0, message: "Successfully removed language" });
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

module.exports = removeLanguage;
