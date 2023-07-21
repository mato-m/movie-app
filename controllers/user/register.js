const pool = require("../../dbConfig.js");
const uuid = require("uuid");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const multer = require("multer");
const fs = require("fs");
const path = require("path");

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
const register = async (req, res) => {
  const client = await pool.connect();
  try {
    upload(req, res, async (err) => {
      if (err instanceof multer.MulterError) {
        res.send({ status: 1, message: "Image upload failed" });
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
        });
        // Delete the uploaded file if an error occurs
        if (req.file) {
          const filePath = path.join(__dirname, "../../", req.file.path);
          if (fs.existsSync(filePath)) {
            fs.unlinkSync(filePath);
          }
        }
      } else {
        const { usr_name, usr_mail, usr_passhash } = req.body;

        // Check if the username has the correct length (between 1 and 20 characters)
        if (usr_name.trim().length < 1 || usr_name.trim().length > 20) {
          res.send({
            status: 3,
            message: "Username must have between 1 and 20 characters",
          });
          // Delete the uploaded file if username validation fails
          if (req.file) {
            const filePath = path.join(__dirname, "../../", req.file.path);
            if (fs.existsSync(filePath)) {
              fs.unlinkSync(filePath);
            }
          }
          return;
        }

        // Regular expression for email format validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        // Check if the email format is valid
        if (!emailRegex.test(usr_mail)) {
          res.send({
            status: 4,
            message: "Invalid email format",
          });
          // Delete the uploaded file if email validation fails
          if (req.file) {
            const filePath = path.join(__dirname, "../../", req.file.path);
            if (fs.existsSync(filePath)) {
              fs.unlinkSync(filePath);
            }
          }
          return;
        }

        // Check if the password has the correct length (between 8 and 30 characters)
        if (usr_passhash.trim().length < 8 || usr_passhash.trim().length > 30) {
          res.send({
            status: 5,
            message: "Password must be between 8 and 30 characters",
          });
          // Delete the uploaded file if password validation fails
          if (req.file) {
            const filePath = path.join(__dirname, "../../", req.file.path);
            if (fs.existsSync(filePath)) {
              fs.unlinkSync(filePath);
            }
          }
          return;
        }

        const hashedPassword = await bcrypt.hash(usr_passhash, 12);

        let filename = "user.jpg";

        if (req.file) {
          filename = req.file.filename;
        }

        try {
          usr_id = uuid.v4();
          const result = await client.query(
            "INSERT INTO moviez.usr (usr_id, usr_name, usr_mail, usr_passhash, usr_img, usr_role) VALUES ($1, $2, $3, $4, $5, $6)",
            [usr_id, usr_name, usr_mail, hashedPassword, filename, 0]
          );

          const token = jwt.sign(
            {
              usr_id: usr_id,
              usr_name: usr_name,
              usr_mail: usr_mail,
              usr_img: filename,
              usr_role: 0,
            },
            process.env.JWT_SECRET
          );
          res.send({
            status: 0,
            message: "User registration successful",
            token,
          });
        } catch (error) {
          res.send({ status: 6, message: "Error while registering user" });
          // Delete the uploaded file if an error occurs
          if (req.file) {
            const filePath = path.join(__dirname, "../../", req.file.path);
            if (fs.existsSync(filePath)) {
              fs.unlinkSync(filePath);
            }
          }
        }
      }
    });
  } catch (error) {
    res.send({ status: 6, message: "Error while registering user" });
  } finally {
    client.release();
  }
};

module.exports = register;
