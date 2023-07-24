const pool = require("../../dbConfig");

const getMoviesByFilter = async (req, res) => {
  const client = await pool.connect();
  try {
    const query = `
      SELECT movie.movie_id, movie.movie_name, movie.movie_imdb, movie.movie_year, movie.movie_trailer, movie.movie_img
      FROM moviez.movie`;
    const queryGenres = `
      SELECT * FROM moviez.genre ORDER BY genre_name`;
    const queryLang = `
      SELECT * FROM moviez.lang ORDER BY lang_name`;
    const queryServ = `
      SELECT * FROM moviez.serv ORDER BY serv_name`;

    const result5 = await client.query(
      "SELECT * FROM moviez.pers ORDER BY pers_fn"
    );
    const result = await client.query(query);
    const result2 = await client.query(queryGenres);
    const result3 = await client.query(queryLang);
    const result4 = await client.query(queryServ);
    const movies = result.rows;
    const g = result2.rows;
    const l = result3.rows;
    const s = result4.rows;
    const p = result5.rows;

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
      genres: g,
      languages: l,
      services: s,
      people: p,
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
