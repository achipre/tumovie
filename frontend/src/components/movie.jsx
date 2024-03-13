import { useEffect, useState } from 'react'
import { MovieDateService } from '../services/movies'
import { Link, useLocation } from 'react-router-dom'

export const Movie = () => {
  const location = useLocation()
  const idMovie = location.pathname.split('/').at(-1)
  const [movie, setMovie] = useState({
    id: null,
    title: '',
    rated: '',
    reviews: []
  })
  const getMovie = id => {
    MovieDateService.get(id)
      .then(resp => {
        console.log(resp.data)
        setMovie(resp.data)
      })
      .catch((e) => {
        console.log(e)
      })
  }
  useEffect(() => {
    getMovie(idMovie)
  }, [idMovie])

  return (
    <main className='w-full mx-auto max-w-7xl p-4 flex flex-col sm:flex-row gap-6 md:justify-between'>
      <img className="w-full sm:w-[50%] h-auto max-w-lg mx-auto md:m-0 object-cover aspect-[0.66] rounded-lg cursor-pointer self-start" src={movie.poster} alt="image description"/>

      <div className='w-full sm:w-[50%] max-w-lg mx-auto md:m-0'>
        <section className="w-full block p-6 border border-gray-200 bg-gray-200 rounded-lg shadow hover:bg-gray-100">

        <h1 className="mb-2 text-2xl font-bold tracking-tight text-gray-900">{movie.title}</h1>
        <p className="font-normal text-gray-700 mb-3">{movie.fullplot}</p>
        <Link to={'/movies/' + idMovie + '/review'} className="inline-flex items-center px-5 py-2.5 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
        Add Review
            <svg className="w-3.5 h-3.5 ms-2 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
            </svg>
        </Link>

        </section>
        <h2 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 p-6 pt-12">Reviews</h2>
        {movie.reviews.map(review => (
          <section className='p-6 pt-0' key={review._id}>
            <h3 className='font-semibold text-xl capitalize'>{review.name}</h3>
            <p className='text-gray-600 truncate dark:text-gray-400 italic'><span className='text-4xl text-red-600'>&quot;</span>{review.review}</p>
          </section>
        ))}
      </div>

    </main>
  )
}
