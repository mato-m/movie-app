const pool = require("../../dbConfig.js");

const removeGenre = async (req, res) => {
  if (req.user.usr_role == 1) {
    const client = await pool.connect();
    try {
      await client.query("BEGIN");

      await client.query(
        "DELETE FROM moviez.genre_movie WHERE gm_genre_id=$1",
        [req.params.genre_id]
      );

      await client.query("DELETE FROM moviez.genre WHERE genre_id=$1", [
        req.params.genre_id,
      ]);

      await client.query("COMMIT");

      res.send({ status: 0, message: "Successfully removed genre" });
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

module.exports = removeGenre;
