const pool = require("../../dbConfig");
const fs = require("fs");
const path = require("path");

const deleteUser = async (req, res) => {
  if (req.user.usr_id == req.params.user_id) {
    const { user_id } = req.params;

    const client = await pool.connect();
    try {
      await client.query("BEGIN"); // Begin the transaction

      // Delete user's ratings
      await client.query(
        "DELETE FROM moviez.rating WHERE rating_user_id = $1",
        [user_id]
      );

      // Get the IDs of all lists owned by the user
      const listIdsResult = await client.query(
        "SELECT lst_id FROM moviez.lst WHERE lst_usr_id = $1",
        [user_id]
      );
      const listIds = listIdsResult.rows.map((row) => row.lst_id);

      // Delete movies from the user's lists
      for (const listId of listIds) {
        await client.query("DELETE FROM moviez.lst_movie WHERE lst_id = $1", [
          listId,
        ]);
      }

      // Delete the user's lists
      await client.query("DELETE FROM moviez.lst WHERE lst_usr_id = $1", [
        user_id,
      ]);

      // Delete watched movies
      await client.query(
        "DELETE FROM moviez.watched WHERE watched_user_id = $1",
        [user_id]
      );

      // Get the user's image filename
      const imageResult = await client.query(
        "SELECT usr_img FROM moviez.usr WHERE usr_id = $1",
        [user_id]
      );
      await client.query("DELETE FROM moviez.usr WHERE usr_id = $1", [user_id]);

      await client.query("COMMIT"); // Commit the transaction

      const imageRow = imageResult.rows[0];
      const usr_img = imageRow && imageRow.usr_img;

      // Delete the user's image file from /uploads/user directory if it's a custom image
      if (usr_img && usr_img !== "user.jpg") {
        const imagePath = path.join(
          __dirname,
          `../../dist/uploads/user/${usr_img}`
        );
        if (fs.existsSync(imagePath)) {
          fs.unlinkSync(imagePath);
        }
      }

      res.send({
        status: 0,
        message: "User account deleted successfully.",
      });
    } catch (error) {
      await client.query("ROLLBACK"); // Rollback the transaction
      throw error;
    } finally {
      client.release();
    }
  } else {
    res.send({ status: 2, message: "Unauthorized" });
  }
};

module.exports = deleteUser;
