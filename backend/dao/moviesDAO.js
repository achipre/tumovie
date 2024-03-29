import { ObjectId } from "mongodb";

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
      if ("title" in filters && !("rated" in filters)) {
        query = { 
          $text: { $search: filters['title'] } 
        }
      } else if ("rated" in filters && !("title" in filters)) {
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

  static async getRatings(){
    let ratings = []
    try {
      ratings = await movies.distinct('rated')
      return ratings
    } catch (e) {
      console.error(`Enable to get Ratings ${e}`);
      return ratings
    }
  }

  static async getMovieById(id){
    try {
      return await movies.aggregate([
        {
          $match: {
            _id: new ObjectId(id)
          }
        },
        {
          $lookup: {
            from: 'reviews',
            localField: '_id',
            foreignField: 'movie_id',
            as: 'reviews'
          }
        }
      ]).next()
    } catch (e) {
      console.error(`Something went wrong in getMovieById ${e}`);
      throw e
    }

  }
}
