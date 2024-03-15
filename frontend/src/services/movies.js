import axios from 'axios'

export class MovieDateService {
  static getAll (page = 0) {
    return axios.get(`https://tumovie.onrender.com/api/v1/movies?page=${page}`)
  }

  static get (id) {
    return axios.get(`https://tumovie.onrender.com/api/v1/movies/id/${id}`)
  }

  static find (queryRated = '', queryTitle = '', page = 0) {
    return axios.get(`https://tumovie.onrender.com/api/v1/movies?${queryRated}${queryTitle}&page=${page}`)
  }

  static createReview (data) {
    return axios.post('https://tumovie.onrender.com/api/v1/movies/review', data)
  }

  static upadteReview (data) {
    console.log(data)
    return axios.put('https://tumovie.onrender.com/api/v1/movies/review', data)
  }

  static deleteReview (id, userId) {
    return axios.delete('https://tumovie.onrender.com/api/v1/movies/review', { data: { review_id: id, user_id: userId } })
  }

  static getRatings () {
    return axios.get('https://tumovie.onrender.com/api/v1/movies/ratings')
  }
}
