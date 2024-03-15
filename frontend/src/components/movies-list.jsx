import { useEffect, useState } from 'react'
import { MovieDateService } from '../services/movies'
import { Link } from 'react-router-dom'

export const MoviesList = () => {
  const [categoryVisible, setCategoryVisible] = useState(false)

  const openCategory = (e) => {
    setCategoryVisible(!categoryVisible)
  }
  const closeCategory = (e) => {
    setCategoryVisible(!categoryVisible)
    setSearchRating(e.target.textContent)
  }

  const [movies, setMovies] = useState([])
  const [searchTitle, setSearchTitle] = useState('')
  const [searchRating, setSearchRating] = useState('All categories')
  const [ratings, setRatings] = useState(['All categories'])

  const retriveMovies = () => {
    MovieDateService.getAll()
      .then((resp) => {
        setMovies(resp.data.movies)
      })
      .catch((e) => {
        console.log(e)
      })
  }
  const retriveRatingss = () => {
    MovieDateService.getRatings()
      .then((resp) => {
        setRatings(['All categories'].concat(resp.data))
      })
      .catch((e) => {
        console.log(e)
      })
  }

  const onChangeSearchTitle = (e) => {
    const searchTitle = e.target.value
    setSearchTitle(searchTitle)
  }

  const find = (queryRated, queryTitle) => {
    MovieDateService.find(queryRated, queryTitle)
      .then(resp => {
        setMovies(resp.data.movies)
      })
      .catch((e) => {
        console.log(e)
      })
  }

  const handleSearch = (e) => {
    e.preventDefault()

    if (searchRating === 'All categories' && searchTitle === '') return
    if (searchRating === 'All categories' && searchTitle !== '') {
      const rating = ''
      const queryTitle = ('title=' + searchTitle)
      find(rating, queryTitle)
    } else if (searchTitle === '') {
      const title = ''
      const queryRated = ('rated=' + searchRating)
      find(queryRated, title)
    } else {
      const queryRated = ('rated=' + searchRating + '&')
      const queryTitle = ('title=' + searchTitle)
      find(queryRated, queryTitle)
    }
  }

  const handleImgError = (e) => {
    e.target.src = './imgNotFound.jpeg'
  }

  useEffect(() => {
    retriveMovies()
    retriveRatingss()
  }, [])

  return (
    <>
      <form className="max-w-lg mx-auto mt-5">
        <div className="flex">
          <div className='relative'>
            <button
              onClick={openCategory}
              id="dropdown-button"
              data-dropdown-toggle="dropdown"
              className="min-w-36 flex-shrink-0 z-10 inline-flex justify-between items-center py-2.5 px-4 text-sm font-medium text-center text-gray-900 bg-gray-100 border border-gray-300 rounded-s-lg hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-[#FFC3A1] dark:border-gray-600 text-nowrap"
              type="button"
            >
              <span>
                {searchRating}
              </span>
              <svg
                className="w-2.5 h-2.5 ms-2.5"
                aria-hidden="true"
                fill="none"
                viewBox="0 0 10 6"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m1 1 4 4 4-4"
                />
              </svg>
            </button>
            <div
              id="dropdown"
              className={`z-10 absolute top-0 ${categoryVisible ? '' : 'hidden'} bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700 w-full`}
            >
              <ul
                className="py-2 text-gray-700 dark:text-gray-200"
                aria-labelledby="dropdown-button"
              >
                {
                  ratings.map((rating, idx) => (
                  <li key={idx}>
                    <button
                      type="button"
                      onClick={closeCategory}
                      className="inline-flex w-full text-nowrap px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-[#FFC3A1] text-sm font-medium"
                    >
                      {rating}
                    </button>
                  </li>
                  ))
                }
              </ul>
            </div>
          </div>
          <div className="relative w-full">
            <input
              type="search"
              id="search-dropdown"
              onChange={onChangeSearchTitle}
              className="block p-2.5 w-full z-20 text-sm text-white bg-gray-50 rounded-e-lg border-s-gray-50 border-s-2 border border-gray-300  dark:bg-gray-700 dark:border-s-gray-700  dark:border-gray-600 dark:placeholder-gray-400 focus-visible:outline-none placeholder:dark:text-[#FFC3A1]"
              placeholder="Batman..."
              required
            />
            <button
              type="submit"
              onClick={handleSearch}
              className="absolute top-0 end-0 p-2.5 text-sm font-medium h-full text-white dark:bg-[#F05454] rounded-e-lg dark:hover:bg-[#f05454df]"
            >
              <svg
                className="w-4 h-4"
                aria-hidden="true"
                viewBox="0 0 20 20"
                fill="none"
              >
                <path
                  stroke="#FFC3A1"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                />
              </svg>
              <span className="sr-only">Search</span>
            </button>
          </div>
        </div>
      </form>
      <main className='w-full mx-auto max-w-7xl p-4 grid [grid-template-columns:repeat(auto-fill,minmax(196px,1fr))] sm:[grid-template-columns:repeat(auto-fill,minmax(220px,1fr))]  gap-3 justify-between'>
      {
        movies.map(movie => (
          <div key={movie._id} className="flex flex-col bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
            <img className="rounded-t-lg aspect-[0.62] object-cover w-full" src={movie.poster || './imgNotFound.jpeg' } alt={movie.title} onError={handleImgError} />
            <div className="p-5 flex flex-col h-full">
              <a href="#">
                <h2 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white line-clamp-3">{movie.title}</h2>
              </a>
              <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">Rating: {movie.rated || 'N/A'}</p>
              <p className="h-full mb-3 font-normal text-gray-700 dark:text-gray-400">{movie.plot}</p>
              <Link to={'/movies/' + movie._id} className=" flex gap-2 justify-center flex-grow items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:outline-none  dark:bg-blue-600 dark:hover:bg-blue-700 focus-visible:outline-none">
                <span>
                  View Review
                </span>
                <svg className="w-3.5 h-3.5" aria-hidden="true" fill="none" viewBox="0 0 14 10">
                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
                </svg>
              </Link>
            </div>
          </div>
        ))
      }
      </main>

    </>
  )
}
