const pool = require("./pool");

async function getVideogameGenrePublisher(videogameName) {
  const { rows } = await pool.query(
    `SELECT videogame.id, videogame_name, videogame_description, videogame_price, videogame_image, videogame_quantity,  videogame_release_date, videogame_rating, publisher,  STRING_AGG(videogame_categorie_name, ' ' ORDER BY videogame_categorie_name DESC) AS videogame_genre FROM videogame JOIN videogame_genre ON videogame.id = videogame_genre.id JOIN videogame_publisher ON videogame.id = videogame_publisher.id WHERE videogame_name = '${videogameName}' GROUP BY videogame.id, videogame_genre.id, videogame_publisher.publisher;`
  );
  return rows;
}

module.exports = {
  getVideogameGenrePublisher,
};
