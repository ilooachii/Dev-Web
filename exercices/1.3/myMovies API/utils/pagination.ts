/**
 * Applique la pagination sur une liste de films.
 * @param {Array} movies - La liste des films à paginer.
 * @param {number} page - La page demandée (commence à 1).
 * @param {number} limit - Le nombre de films par page.
 * @returns {Array} - La portion de films correspondant à la page demandée.
 */
function paginateMovies(movies: any[], page: number, limit: number): Array<any> {
    if (!page || page < 1) {
      page = 1;
    }
    if (!limit || limit < 1) {
      limit = 10;
    }
  
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    
    return movies.slice(startIndex, endIndex);
  }
  
  export { paginateMovies };