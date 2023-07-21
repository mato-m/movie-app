const pool = require("../../dbConfig");

const getMoviesByFilter = async (req, res) => {
  const client = await pool.connect();
  try {
    const {
      genres,
      languages,
      services,
      minYear,
      maxYear,
      minRating,
      sortType,
    } = req.body;

    const whereClauses = [];
    const queryParams = [];

    if (genres && genres.length > 0) {
      const genrePlaceholders = genres
        .map((_, index) => `$${index + 1}`)
        .join(",");
      whereClauses.push(
        `movie_id IN (SELECT gm_movie_id FROM moviez.genre_movie WHERE gm_genre_id IN (${genrePlaceholders}))`
      );
      queryParams.push(...genres);
    }

    if (languages && languages.length > 0) {
      const langPlaceholders = languages
        .map((_, index) => `$${index + 1 + queryParams.length}`)
        .join(",");
      whereClauses.push(
        `movie_id IN (SELECT lm_movie_id FROM moviez.lang_movie WHERE lm_lang_id IN (${langPlaceholders}))`
      );
      queryParams.push(...languages);
    }

    if (services && services.length > 0) {
      const servicePlaceholders = services
        .map((_, index) => `$${index + 1 + queryParams.length}`)
        .join(",");
      whereClauses.push(
        `movie_id IN (SELECT sm_movie_id FROM moviez.serv_movie WHERE sm_service_id IN (${servicePlaceholders}))`
      );
      queryParams.push(...services);
    }

    if (minYear) {
      whereClauses.push(`movie_year >= $${queryParams.length + 1}`);
      queryParams.push(minYear);
    }

    if (maxYear) {
      whereClauses.push(`movie_year <= $${queryParams.length + 1}`);
      queryParams.push(maxYear);
    }

    if (minRating) {
      whereClauses.push(`
        (SELECT AVG(rating) FROM moviez.rating WHERE rating_movie_id = movie.movie_id) >= $${
          queryParams.length + 1
        }
      `);
      queryParams.push(minRating);
    }

    let orderByClause = "movie_name";
    if (sortType === "rating") {
      orderByClause =
        "(SELECT AVG(rating) FROM moviez.rating WHERE rating_movie_id = movie.movie_id) DESC";
    } else if (sortType === "year") {
      orderByClause = "movie_year";
    }

    const query = `
      SELECT movie.movie_id, movie.movie_name, movie.movie_imdb, movie.movie_year, movie.movie_trailer, movie.movie_img
      FROM moviez.movie
      ${whereClauses.length > 0 ? `WHERE ${whereClauses.join(" AND ")}` : ""}
      ORDER BY ${orderByClause}
    `;

    const result = await client.query(query, queryParams);
    const movies = result.rows;

    const detailedMovies = [];

    for (const movie of movies) {
      const { movie_id } = movie;

      const genreQuery = `
        SELECT genre_id,genre_name
        FROM moviez.genre
        INNER JOIN moviez.genre_movie ON genre.genre_id = genre_movie.gm_genre_id
        WHERE genre_movie.gm_movie_id = $1
      `;
      const genreResult = await client.query(genreQuery, [movie_id]);
      const genres = genreResult.rows;

      const languageQuery = `
        SELECT lang_id,lang_name
        FROM moviez.lang
        INNER JOIN moviez.lang_movie ON lang.lang_id = lang_movie.lm_lang_id
        WHERE lang_movie.lm_movie_id = $1
      `;
      const languageResult = await client.query(languageQuery, [movie_id]);
      const languages = languageResult.rows;

      const personQuery = `
        SELECT pers_id,pers_fn,pers_ln, role
        FROM moviez.pers
        INNER JOIN moviez.pers_movie ON pers.pers_id = pers_movie.pm_pers_id
        WHERE pers_movie.pm_movie_id = $1
      `;
      const personResult = await client.query(personQuery, [movie_id]);
      const persons = personResult.rows;

      const serviceQuery = `
        SELECT serv_id,serv_name
        FROM moviez.serv
        INNER JOIN moviez.serv_movie ON serv.serv_id = serv_movie.sm_service_id
        WHERE serv_movie.sm_movie_id = $1
      `;
      const serviceResult = await client.query(serviceQuery, [movie_id]);
      const services = serviceResult.rows;

      const detailedMovie = {
        ...movie,
        genres,
        languages,
        persons,
        services,
      };

      detailedMovies.push(detailedMovie);
    }

    res.send({
      status: 0,
      message: "Successfully retrieved movies.",
      data: detailedMovies,
    });
  } catch (error) {
    res.send({
      status: 1,
      message: "Error while retrieving movies.",
      error: error.message,
    });
  } finally {
    client.release();
  }
};

module.exports = getMoviesByFilter;
