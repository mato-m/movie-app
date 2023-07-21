const pool = require("../../dbConfig.js");
const multer = require("multer");
const fs = require("fs");
const path = require("path");
const jwt = require("jsonwebtoken");

const secretKey = process.env.JWT_SECRET;

const storage = multer.diskStorage({
  destination: "dist/uploads/user/",
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + "-" + file.originalname);
  },
});

const upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    // Check if the file is an image
    if (file.mimetype.startsWith("image/")) {
      cb(null, true); // Accept the file
    } else {
      cb(new Error("Only image files are allowed."), false); // Reject the file
    }
  },
}).single("usr_img");

const editImg = async (req, res) => {
  if (req.user.usr_id == req.params.usr_id) {
    const client = await pool.connect();
    try {
      const { usr_id } = req.params;

      upload(req, res, async (err) => {
        if (err instanceof multer.MulterError) {
          res.send({ status: 1, message: "Image upload failed", token: null });
          // Delete the uploaded file if an error occurs
          if (req.file) {
            const filePath = path.join(__dirname, "../../", req.file.path);
            if (fs.existsSync(filePath)) {
              fs.unlinkSync(filePath);
            }
          }
        } else if (err) {
          res.send({
            status: 1,
            message: "Unknown error occurred during image upload",
            token: null,
          });
          // Delete the uploaded file if an error occurs
          if (req.file) {
            const filePath = path.join(__dirname, "../../", req.file.path);
            if (fs.existsSync(filePath)) {
              fs.unlinkSync(filePath);
            }
          }
        } else {
          const filename = req.file ? req.file.filename : "user.jpg"; // Retrieve the filename from req.file
          const getUserImgQuery = "SELECT * FROM moviez.usr WHERE usr_id = $1";
          const updateImgQuery =
            "UPDATE moviez.usr SET usr_img = $1 WHERE usr_id = $2";

          try {
            await client.query("BEGIN"); // Begin the transaction

            // Get the old user image filename
            const imageResult = await client.query(getUserImgQuery, [usr_id]);
            const oldFilename = imageResult.rows[0]?.usr_img;
            // Update the user image in the database
            await client.query(updateImgQuery, [filename, usr_id]);

            await client.query("COMMIT"); // Commit the transaction

            const payload = {
              usr_id,
              usr_name: imageResult.rows[0].usr_name,
              usr_mail: imageResult.rows[0].usr_mail,
              usr_role: imageResult.rows[0].role,
              usr_img: filename,
            };

            const token = jwt.sign(payload, secretKey);

            res.send({
              status: 0,
              message: "User image updated successfully",
              token,
            });

            // Delete the old user image if it exists and the update is successful
            if (oldFilename && oldFilename !== "user.jpg") {
              const oldImagePath = path.join(
                __dirname,
                "../../dist/uploads/user",
                oldFilename
              );
              if (fs.existsSync(oldImagePath)) {
                fs.unlinkSync(oldImagePath);
              }
            }
          } catch (error) {
            await client.query("ROLLBACK"); // Rollback the transaction
            throw error;
          }
        }
      });
    } catch (error) {
      res.send({
        status: 1,
        message: "Error while updating user image",
        token: null,
      });
    } finally {
      client.release();
    }
  } else {
    res.send({ status: 2, message: "Unauthorized" });
  }
};

module.exports = editImg;
