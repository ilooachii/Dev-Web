/**
 * Filtre les films dont le titre commence par une chaîne de caractères spécifiée.
 * @param {Array} movies - La liste des films à filtrer.
 * @param {string} startsWith - La chaîne de caractères avec laquelle le titre doit commencer.
 * @returns {Array} - La liste des films filtrés.
 */
function filterMoviesByTitle(movies: any[], startsWith: string): Array<any> {
  if (!startsWith) {
    return movies;
  }
  return movies.filter((movie) =>
    movie.title.toLowerCase().startsWith(startsWith.toLowerCase())
  );
}

export { filterMoviesByTitle };