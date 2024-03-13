import MoviesDAO from "../dao/moviesDAO.js";

export default class MoviesController{
  static async apiGetMovies(req, res, next){
    const moviesPerPage = req.query.moviesPerPage ? parseInt(req.query.moviePerPage) : 20
    const page = req.query.page ? parseInt(req.query.page) : 0

    let filters = {}
    if (req.query.rated && !req.query.title) {
      filters.rated = req.query.rated
    } else if (req.query.title && !req.query.rated) {
      filters.title = req.query.title
    }
    
    const { movieList, totalNumMovies } = await MoviesDAO.getMovies({ filters, page, moviesPerPage })

    let response = {
      movies: movieList,
      page,
      filters,
      entries_per_page: moviesPerPage,
      total_results: totalNumMovies
    }
    res.json(response)
  }

  static async apiGetMovieById(req, res, next){
    try {
      let id = req.params.id || {}
      let movie = await MoviesDAO.getMovieById(id)

      if (!movie) {
        res.status(400).json({ error: 'Not Found' })
      }
      res.json(movie)

    } catch (e) {
      console.error(`api: ${e}`);
      res.status(500).json({error: e})
      
    }
  }

  static async apiGetRatings(req, res, next){
    try {
      let propertyTypes = await MoviesDAO.getRatings()
      res.json(propertyTypes)
    } catch (e) {
      console.error(`api : ${e}`);
      res.status(500).json({error: e})
      
    }
  }
}