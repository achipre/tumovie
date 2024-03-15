import { useEffect, useState } from 'react'
import { MovieDateService } from '../services/movies'
import { Link, useLocation } from 'react-router-dom'
import { formatDistance } from 'date-fns'

export const Movie = ({ user }) => {
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
        setMovie(resp.data)
      })
      .catch((e) => {
        console.log(e)
      })
  }
  useEffect(() => {
    getMovie(idMovie)
  }, [idMovie])

  const handleDate = (fecha) => {
    const actual = new Date()
    const antiguo = new Date(fecha).toLocaleDateString()
    const ago = formatDistance(actual, antiguo, { addSuffix: true })
    return ago
  }

  const handleDelete = (reviewId) => {
    MovieDateService.deleteReview(reviewId, user?.id)
      .then(() => {
        const newReviews = movie?.reviews?.slice(movie?.reviews._id !== reviewId)
        setMovie(...movie, newReviews)
      })
      .catch(e => console.log(e))
  }
  console.log(movie)

  return (
    <main className='w-full mx-auto max-w-7xl p-4 flex flex-col sm:flex-row gap-6 md:justify-between'>
      <img className="w-full sm:w-[50%] h-auto max-w-lg mx-auto md:m-0 object-cover aspect-[0.66] rounded-lg cursor-pointer self-start" src={movie?.poster} alt="image description"/>

      <div className='w-full sm:w-[50%] max-w-lg mx-auto md:m-0'>
        <section className="w-full block p-6 border border-gray-200 bg-gray-200 rounded-lg shadow hover:bg-gray-100 hover:border-gray-100">

          <h1 className="mb-2 text-2xl font-bold tracking-tight text-gray-900">{movie?.title}</h1>
          <p className="font-normal text-gray-600 mb-3">{movie?.fullplot}</p>
          <Link to={'/movies/' + idMovie + '/review'} className="inline-flex items-center px-5 py-2.5 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
          Add Review
              <svg className="w-3.5 h-3.5 ms-2 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
              </svg>
          </Link>

        </section>
        <h2 className="text-2xl font-bold tracking-tight text-gray-900 p-6 pb-2">Reviews</h2>
        {movie?.reviews?.map((review) =>
          (<section className='relative p-6 border border-gray-200 bg-gray-200 rounded-lg mb-4' key={review._id}>
            <h3 className=' flex items-center font-semibold text-xl capitalize leading-4'>{review.name}<span className='ml-5 text-sm text-gray-500 font-normal leading-3 self-end'>{handleDate(review.date)}</span></h3>
            <p className='text-gray-600 truncate dark:text-gray-600 italic'><span className='text-4xl text-red-600'>&quot;</span>{review.review}</p>

            {user?.name === review?.name && <Link to={'/movies/' + idMovie + '/review'} className='absolute top-2 right-4 text-blue-500 cursor-pointer hover:text-blue-700 hover:underline' state={{ currentReview: review }}>Editar</Link>}

            {user?.name === review?.name && <span onClick={() => handleDelete(review._id)} className='absolute bottom-2 right-4 text-blue-500 cursor-pointer hover:text-blue-700 hover:underline'>Borrar</span>}
          </section>)
        )}
      </div>

    </main>
  )
}
