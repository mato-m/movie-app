const pool = require("../../dbConfig.js");
const uuid = require("uuid");
const multer = require("multer");
const fs = require("fs");

const storage = multer.diskStorage({
  destination: "dist/uploads/movies/",
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
}).single("movie_img");

// Regular expression for IMDB title link format validation
const imdbTitleRegex =
  /^(?:https?:\/\/)?(?:www\.)?imdb\.com\/title\/tt\d{7,8}(?:\/.*)?$/;

// Regular expression for YouTube video link format validation
const youtubeLinkRegex =
  /^(?:(?:https?:)?\/\/)?(?:www\.)?(?:youtube\.com|youtu\.be)\/(?:watch\?v=)?(.+)$/;

const addMovie = async (req, res) => {
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

        const {
          movie_name,
          movie_imdb,
          movie_year,
          movie_trailer,
          genres,
          languages,
          services,
          actors,
          producers,
          directors,
        } = req.body;
        const client = await pool.connect();
        const genresArr = genres.split(",");
        const languagesArr = languages.split(",");
        const servicesArr = services.split(",");
        const actorsArr = actors.split(",");
        const producersArr = producers.split(",");
        const directorsArr = directors.split(",");
        try {
          await client.query("BEGIN");

          // Validate movie_name length (between 1 and 20 characters)
          if (movie_name.trim().length < 1 || movie_name.trim().length > 20) {
            res.send({
              status: 3,
              message: "Movie name must have between 1 and 20 characters",
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

          // Validate movie_imdb format (IMDB title link format)
          if (!imdbTitleRegex.test(movie_imdb)) {
            res.send({
              status: 4,
              message: "Invalid IMDB title link format",
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

          // Validate movie_year (between 1850 and 2200)
          const parsedYear = parseInt(movie_year, 10);
          if (isNaN(parsedYear) || parsedYear < 1850 || parsedYear > 2200) {
            res.send({
              status: 5,
              message: "Invalid movie year",
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

          // Validate movie_trailer format (YouTube video link format)
          if (!youtubeLinkRegex.test(movie_trailer)) {
            res.send({
              status: 6,
              message: "Invalid YouTube video link format",
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

          let movieImg = "movie.jpg"; // Default movie image filename

          if (req.file) {
            movieImg = req.file.filename;
          }

          const movieResult = await client.query(
            "INSERT INTO moviez.movie (movie_id, movie_name, movie_imdb, movie_year, movie_trailer, movie_img) VALUES ($1, $2, $3, $4, $5, $6) RETURNING movie_id",
            [
              uuid.v4(),
              movie_name,
              movie_imdb,
              movie_year,
              movie_trailer,
              movieImg,
            ]
          );

          // Rest of the code remains unchanged

          await client.query("COMMIT");

          res.send({ status: 0, message: "Movie added successfully." });
        } catch (error) {
          await client.query("ROLLBACK");
          if (req.file) {
            const filePath = req.file.path;
            if (fs.existsSync(filePath)) {
              fs.unlinkSync(filePath);
            }
          }
          throw error;
        } finally {
          client.release();
        }
      });
    } catch (error) {
      res.send({ status: 1, message: "Error while adding movie." });
    }
  } else {
    res.send({ status: 2, message: "Unauthorized" });
  }
};

module.exports = addMovie;
