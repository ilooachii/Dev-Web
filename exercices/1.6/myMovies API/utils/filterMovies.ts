/**
 * Filtre les films en fonction d'un attribut et d'une valeur spécifiée.
 * @param {Array} movies - La liste des films à filtrer.
 * @param {string} attribute - L'attribut du film à utiliser pour le filtre (e.g., "title", "director").
 * @param {any} value - La valeur avec laquelle l'attribut doit commencer (ou être égal).
 * @param {boolean} [isPartialMatch=true] - Si `true`, l'attribut doit commencer par `value`; sinon, il doit être strictement égal à `value`.
 * @returns {Array} - La liste des films filtrés.
 */
function filterMoviesByAttribute(movies: any[], attribute: any, value: any, isPartialMatch: boolean = true): any[] {
    if (!value) {
      return movies;
    }
  
    const lowerValue = String(value).toLowerCase();
  
    return movies.filter((movie) => {
      const movieAttribute = String(movie[attribute]).toLowerCase();
      return isPartialMatch ? movieAttribute.startsWith(lowerValue) : movieAttribute === lowerValue;
    });
  }
  
  export { filterMoviesByAttribute };