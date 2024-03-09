let movies

export default class MoviesDAO {
  static async injectDB(client){
    if (movies) {
      return
    }
    try {
      movies = await client.db(process.env.MOVIEREVIEWS_NS).collection('movies')
    } catch (error) {
      console.error(`unable to connect in MoviesDAO: ${error}`);
    }
  }
  static async getMovies({ filters = null, page = 0, moviesPerPage = 20} = {}){
    let query
    if (filters) {
      if ("title" in filters) {
        query = { $text: { $search: filters['title'] } }
      } else if ("rated" in filters) {
        query = {"rated": { $eq: filters['rated']}}
      }
    }
    let cursor
    try {
      cursor = await movies
        .find(query)
        .limit(moviesPerPage)
        .skip(moviesPerPage * page)
      const movieList = await cursor.toArray()
      const totalNumMovies = await movies.countDocuments(query)
      return { movieList, totalNumMovies }
      
    } catch (error) {
      console.error(`Unable to issue find command, ${error}`);
      return { movieList: [], totalNumMovies: 0}
      
    }
  }
}
