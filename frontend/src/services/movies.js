import axios from 'axios'

export class MovieDateService {
  static getAll (page = 0) {
    return axios.get(`http://localhost:5050/api/v1/movies?page=${page}`)
  }

  static get (id) {
    return axios.get(`http://localhost:5050/api/v1/movies/id/${id}`)
  }

  static find (queryRated = '', queryTitle = '', page = 0) {
    return axios.get(`http://localhost:5050/api/v1/movies?${queryRated}${queryTitle}&page=${page}`)
  }

  createReview (data) {
    return axios.post('http://localhost:5050/api/v1/movies/review', data)
  }

  upadteReview (data) {
    return axios.put('http://localhost:5050/api/v1/movies/review', data)
  }

  deleteReview (id, userId) {
    return axios.delete('http://localhost:5050/api/v1/movies/review', { data: { review_id: id, user_id: userId } })
  }

  static getRatings () {
    return axios.get('http://localhost:5050/api/v1/movies/ratings')
  }
}
