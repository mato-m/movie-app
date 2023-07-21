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

const addPerson = async (req, res) => {
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

        const { pers_fn, pers_ln, pers_imdb } = req.body;

        // Check if pers_fn and pers_ln have the correct length (between 1 and 20 characters)
        if (
          pers_fn.trim().length < 1 ||
          pers_fn.trim().length > 20 ||
          pers_ln.trim().length < 1 ||
          pers_ln.trim().length > 20
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
          const personId = uuid.v4();
          await client.query(
            "INSERT INTO moviez.pers (pers_id, pers_fn, pers_ln, pers_imdb, pers_img) VALUES ($1, $2, $3, $4, $5)",
            [
              personId,
              pers_fn,
              pers_ln,
              pers_imdb,
              req.file ? req.file.filename : "actor.jpg",
            ]
          );

          await client.query("COMMIT");

          res.send({ status: 0, message: "Person added successfully." });
        } catch (error) {
          // Delete the uploaded file if an error occurs
          if (req.file) {
            const filePath = req.file.path;
            if (fs.existsSync(filePath)) {
              fs.unlinkSync(filePath);
            }
          }
          await client.query("ROLLBACK");
          throw error;
        } finally {
          client.release();
        }
      });
    } catch (error) {
      res.send({ status: 1, message: "Error while adding person." });
    }
  } else {
    res.send({ status: 2, message: "Unauthorized" });
  }
};

module.exports = addPerson;
