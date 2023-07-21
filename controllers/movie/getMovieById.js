const pool = require("../../dbConfig");

const getMovieById = async (req, res) => {
  const client = await pool.connect();
  try {
    const { movie_id } = req.params;
    const user_id = req.user.usr_id; // Assuming req.user.usr_id contains the user ID

    const movieQuery = `
      SELECT movie.movie_id, movie.movie_name, movie.movie_imdb, movie.movie_year, movie.movie_trailer, movie.movie_img
      FROM moviez.movie
      WHERE movie.movie_id = $1
    `;

    const ratingQuery = `
      SELECT AVG(rating) AS average_rating
      FROM moviez.rating
      WHERE rating_movie_id = $1
    `;

    const [movieResult, ratingResult] = await Promise.all([
      client.query(movieQuery, [movie_id]),
      client.query(ratingQuery, [movie_id]),
    ]);

    const movie = movieResult.rows[0];
    const averageRating = ratingResult.rows[0].average_rating;

    if (!movie) {
      client.release();
      res.send({
        status: 1,
        message: "Movie not found.",
      });
      return;
    }

    const genreQuery = `
      SELECT genre.genre_name
      FROM moviez.genre
      INNER JOIN moviez.genre_movie ON genre.genre_id = genre_movie.gm_genre_id
      WHERE genre_movie.gm_movie_id = $1
    `;

    const languageQuery = `
      SELECT lang.lang_name
      FROM moviez.lang
      INNER JOIN moviez.lang_movie ON lang.lang_id = lang_movie.lm_lang_id
      WHERE lang_movie.lm_movie_id = $1
    `;

    const serviceQuery = `
      SELECT serv.serv_name
      FROM moviez.serv
      INNER JOIN moviez.serv_movie ON serv.serv_id = serv_movie.sm_service_id
      WHERE serv_movie.sm_movie_id = $1
    `;

    const personQuery = `
      SELECT pers.pers_id, pers.pers_fn, pers.pers_ln, pers.pers_img, pers_movie.role
      FROM moviez.pers
      INNER JOIN moviez.pers_movie ON pers.pers_id = pers_movie.pm_pers_id
      WHERE pers_movie.pm_movie_id = $1 ORDER BY role
    `;

    const watchedQuery = `
      SELECT COUNT(*) AS watched_count
      FROM moviez.watched
      WHERE watched.watched_user_id = $1 AND watched.watched_movie_id = $2
    `;

    const ratingCheckQuery = `
      SELECT rating
      FROM moviez.rating
      WHERE rating.rating_user_id = $1 AND rating.rating_movie_id = $2
    `;

    const [
      genreResult,
      languageResult,
      serviceResult,
      personResult,
      watchedResult,
      ratingCheckResult,
    ] = await Promise.all([
      client.query(genreQuery, [movie_id]),
      client.query(languageQuery, [movie_id]),
      client.query(serviceQuery, [movie_id]),
      client.query(personQuery, [movie_id]),
      client.query(watchedQuery, [user_id, movie_id]),
      client.query(ratingCheckQuery, [user_id, movie_id]),
    ]);

    const genres = genreResult.rows.map((row) => row.genre_name);
    const languages = languageResult.rows.map((row) => row.lang_name);
    const services = serviceResult.rows.map((row) => row.serv_name);
    const persons = personResult.rows.map((row) => ({
      pers_id: row.pers_id,
      pers_fn: row.pers_fn,
      pers_ln: row.pers_ln,
      pers_img: row.pers_img,
      role: row.role,
    }));

    const detailedMovie = {
      ...movie,
      genres,
      languages,
      services,
      persons,
      average_rating: averageRating,
      is_watched: watchedResult.rows[0].watched_count > 0,
      user_rating:
        ratingCheckResult.rows.length > 0
          ? ratingCheckResult.rows[0].rating
          : null,
    };

    res.send({
      status: 0,
      message: "Successfully retrieved movie details.",
      data: detailedMovie,
    });
  } catch (error) {
    res.send({
      status: 1,
      message: "Error while retrieving movie details.",
      error: error.message,
    });
  } finally {
    client.release();
  }
};

module.exports = getMovieById;
