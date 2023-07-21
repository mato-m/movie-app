const pool = require("../../dbConfig.js");

const addMovieToList = async (req, res) => {
  const client = await pool.connect();
  try {
    const { lst_id, mov_id } = req.body;

    const listQueryResult = await client.query(
      "SELECT lst_usr_id FROM moviez.lst WHERE lst_id = $1",
      [lst_id]
    );

    if (listQueryResult.rows.length === 0) {
      res.send({
        status: 1,
        message: "List not found",
      });
      return;
    }

    const lst_usr_id = listQueryResult.rows[0].lst_usr_id;

    if (lst_usr_id !== req.user.usr_id) {
      res.send({
        status: 2,
        message: "Unauthorized",
      });
      return;
    }

    await client.query(
      "INSERT INTO moviez.lst_movie (lst_id, movie_id) VALUES ($1, $2)",
      [lst_id, mov_id]
    );

    res.send({ status: 0, message: "Movie added to the list successfully" });
  } catch (error) {
    res.send({ status: 3, message: "Error while adding movie to the list" });
  } finally {
    client.release();
  }
};

module.exports = addMovieToList;
