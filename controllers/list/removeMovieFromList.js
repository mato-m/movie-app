const pool = require("../../dbConfig.js");
const removeMovieFromList = async (req, res) => {
  const client = await pool.connect();
  try {
    const { lst_id, mov_id } = req.body;
    const lstQueryResult = await client.query(
      "SELECT lst_usr_id FROM moviez.lst WHERE lst_id = $1",
      [lst_id]
    );

    if (lstQueryResult.rows.length === 0) {
      res.send({
        status: 1,
        message: "List not found",
      });
      return;
    }

    const lst_usr_id = lstQueryResult.rows[0].lst_usr_id;
    if (lst_usr_id !== req.user.usr_id) {
      res.send({
        status: 2,
        message: "Unauthorized",
      });
      return;
    }

    await client.query(
      "DELETE FROM moviez.lst_movie WHERE lst_id = $1 AND movie_id = $2",
      [lst_id, mov_id]
    );

    res.send({
      status: 0,
      message: "Movie removed from the list successfully",
    });
  } catch (error) {
    res.send({
      status: 3,
      message: "Error while removing movie from the list",
    });
  } finally {
    client.release();
  }
};

module.exports = removeMovieFromList;
