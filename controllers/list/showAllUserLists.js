const pool = require("../../dbConfig.js");

const getUserListsAndMovieInfo = async (req, res) => {
  if (req.user.usr_id == req.params.lst_usr_id) {
    const client = await pool.connect();
    try {
      const { lst_usr_id, movie_id } = req.params;
      const result = await client.query(
        `SELECT lst.*, CASE WHEN lm.movie_id IS NULL THEN false ELSE true END AS contains_movie
       FROM moviez.lst lst
       LEFT JOIN moviez.lst_movie lm ON lst.lst_id = lm.lst_id AND lm.movie_id = $1
       WHERE lst.lst_usr_id = $2
       ORDER BY lst.lst_timestamp DESC`,
        [movie_id, lst_usr_id]
      );

      const lists = result.rows;
      res.send({
        status: 0,
        message: "Successfully retrieved user lists with movie information",
        lists,
      });
    } catch (error) {
      res.send({
        status: 1,
        message: "Error retrieving user lists with movie information",
      });
    } finally {
      client.release();
    }
  } else {
    res.send({ status: 2, message: "Unauthorized" });
  }
};

module.exports = getUserListsAndMovieInfo;
