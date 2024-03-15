import React, { useState } from 'react'
import { MovieDateService } from '../services/movies'
import { Link, useLocation } from 'react-router-dom'

export const AddReview = ({ user }) => {
  const navigate = useLocation()
  const movieId = navigate.pathname.split('/').at(2)
  let editing = false
  let initialStateReview = ''

  if (navigate.state && navigate.state.currentReview) {
    editing = true
    initialStateReview = navigate.state.currentReview.review
  }

  const [review, setReview] = useState(initialStateReview)
  const [submitted, setSubmitted] = useState(false)

  const onChangeReview = (e) => {
    const newReview = e.target.value
    setReview(newReview)
  }

  const saveReview = () => {
    if (review === '') return
    const data = {
      review,
      name: user?.name,
      user_id: user?.id,
      movie_id: movieId
    }
    if (editing) {
      data.review_id = navigate.state.currentReview._id
      console.log(data)
      MovieDateService.upadteReview(data)
        .then(() => setSubmitted(true))
        .catch(e => console.log(e))
    } else {
      MovieDateService.createReview(data)
        .then(() => setSubmitted(true))
        .catch(e => console.log(e))
    }
  }
  console.log(navigate.state)

  return (
    <main className='w-full mx-auto max-w-7xl p-4 flex flex-col sm:flex-row gap-6 md:justify-between'>
    {
      submitted
        ? (
          <section className='flex flex-col items-center w-screen pt-12'>
            <h2 className='text-xl mb-4 font-bold text-[#30475E]'>Review submited success</h2>
            <Link to={'/movies/' + movieId} className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Regresar</Link>
          </section>
          )
        : (
          <section className='pt-12'>
            <label htmlFor="large-input" className="text-2xl block mb-2 font-bold text-[#30475E]">{editing ? 'Editar ' : 'Crear '}Review</label>
            <input onChange={onChangeReview} value={review} type="text" id="large-input" className="block w-full mb-4 p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-base"></input>
            <button type="button" onClick={saveReview} className="focus:outline-none text-white bg-green-700 hover:bg-green-800 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2">Submit</button>

          </section>
          )
    }
    </main>
  )
}
