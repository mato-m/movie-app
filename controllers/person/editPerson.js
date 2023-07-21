const pool = require("../../dbConfig.js");
const multer = require("multer");
const fs = require("fs");
const uuid = require("uuid");

const storage = multer.diskStorage({
  destination: "dist/uploads/person/",
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + "-" + file.originalname);
  },
});

const upload = multer({ storage: storage }).single("pers_img");

const editPerson = async (req, res) => {
  if (req.user.usr_role == 1) {
    try {
      upload(req, res, async (err) => {
        if (err instanceof multer.MulterError) {
          res.send({ status: 1, message: "Image upload failed" });
        } else if (err) {
          res.send({
            status: 1,
            message: "Unknown error occurred during image upload",
          });
        }
        const { pers_id } = req.params;
        const { pers_fn, pers_ln, pers_imdb, remove_photo } = req.body;

        // Check if pers_fn and pers_ln have the correct length (between 1 and 20 characters)
        if (
          pers_fn.length < 1 ||
          pers_fn.length > 20 ||
          pers_ln.length < 1 ||
          pers_ln.length > 20
        ) {
          res.send({
            status: 3,
            message:
              "First name and last name must have between 1 and 20 characters",
          });
          // Delete the uploaded file if validation fails
          if (req.file) {
            const filePath = req.file.path;
            if (fs.existsSync(filePath)) {
              fs.unlinkSync(filePath);
            }
          }
          return;
        }

        // Regular expression for IMDB link format validation for people
        const imdbRegex =
          /^(?:https?:\/\/)?(?:www\.)?imdb\.com\/name\/nm\d{7,8}(?:\/.*)?$/;

        // Check if pers_imdb is in the IMDB link format for people
        if (!imdbRegex.test(pers_imdb)) {
          res.send({
            status: 4,
            message: "Invalid IMDB link format for people",
          });
          // Delete the uploaded file if validation fails
          if (req.file) {
            const filePath = req.file.path;
            if (fs.existsSync(filePath)) {
              fs.unlinkSync(filePath);
            }
          }
          return;
        }

        const client = await pool.connect();

        try {
          await client.query("BEGIN");

          const existingPerson = await client.query(
            "SELECT pers_img FROM moviez.pers WHERE pers_id = $1",
            [pers_id]
          );

          let filename = existingPerson.rows[0].pers_img;
          if (!JSON.parse(remove_photo).removePhoto) {
            if (filename !== "actor.jpg") {
              fs.unlinkSync("dist/uploads/person/" + filename);
            }
            filename = "actor.jpg";
          } else if (req.file) {
            if (filename !== "actor.jpg") {
              fs.unlinkSync("dist/uploads/person/" + filename);
            }
            filename = req.file.filename;
          }
          await client.query(
            "UPDATE moviez.pers SET pers_fn = $1, pers_ln = $2, pers_imdb = $3, pers_img = $4 WHERE pers_id = $5",
            [pers_fn, pers_ln, pers_imdb, filename, pers_id]
          );

          await client.query("COMMIT");

          res.send({ status: 0, message: "Person updated successfully." });
        } catch (error) {
          const filePath = req.file ? req.filePath : null;
          if (filePath && fs.existsSync(filePath)) {
            fs.unlinkSync(filePath);
          }
          await client.query("ROLLBACK");
          throw error;
        } finally {
          client.release();
        }
      });
    } catch (error) {
      res.send({ status: 1, message: "Error while editing person." });
    }
  } else {
    res.send({ status: 2, message: "Unauthorized" });
  }
};

module.exports = editPerson;
