const pool = require("../../dbConfig.js");
const fs = require("fs");

const removePerson = async (req, res) => {
  if (req.user.usr_role == 1) {
    try {
      const { pers_id } = req.params;

      const client = await pool.connect();

      try {
        // Begin the transaction
        await client.query("BEGIN");

        // Retrieve the person's image file name before deleting
        const imageResult = await client.query(
          "SELECT pers_img FROM moviez.pers WHERE pers_id = $1",
          [pers_id]
        );
        const imageFileName = imageResult.rows[0].pers_img;

        // Delete the person's entries from the 'pers_movie' table
        await client.query(
          "DELETE FROM moviez.pers_movie WHERE pm_pers_id = $1",
          [pers_id]
        );

        // Delete the person from the 'pers' table
        await client.query("DELETE FROM moviez.pers WHERE pers_id = $1", [
          pers_id,
        ]);

        // Commit the transaction
        await client.query("COMMIT");

        // Remove the person's image file from the server if it exists and is not the default image
        if (imageFileName && imageFileName !== "actor.jpg") {
          const filePath = `uploads/person/${imageFileName}`;
          if (fs.existsSync(filePath)) {
            fs.unlinkSync(filePath);
          }
        }

        res.send({ status: 0, message: "Person successfully removed" });
      } catch (error) {
        // If any error occurs during the transaction, rollback the changes
        await client.query("ROLLBACK");
        throw error;
      } finally {
        // Release the database connection
        client.release();
      }
    } catch (error) {
      // In case of an error, send an error response
      res.send({ status: 1, message: "Error while removing person" });
    }
  } else {
    // Send an unauthorized response if the user doesn't have the required role
    res.send({ status: 2, message: "Unauthorized" });
  }
};

module.exports = removePerson;
