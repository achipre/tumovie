import { useState } from 'react'
import { Link, Route, Routes } from 'react-router-dom'
import { AddReview } from './components/add-review'
import { Login } from './components/login'
import { Movie } from './components/movie'
import { MoviesList } from './components/movies-list'

export const App = () => {
  const [user, setUser] = useState(null)

  async function login (user = null) {
    setUser(user)
  }

  async function logout () {
    setUser(null)
  }

  console.log(user)
  return (
    <>
      <nav className="bg-white border-gray-200 dark:bg-[#F05454]">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <Link
          to={'/'}
          className="flex items-center space-x-3 rtl:space-x-reverse"
        >
          <img src="/favicon.svg" className="h-8" alt="Flowbite Logo" />
          <h1 className="self-center text-2xl font-semibold whitespace-nowrap dark:text-[#30475E]">
            Tus Pelis
          </h1>
        </Link>
        <div className="flex">
          <button
            type="button"
            data-collapse-toggle="navbar-search"
            aria-controls="navbar-search"
            aria-expanded="false"
            className="md:hidden text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none  rounded-lg text-sm p-2.5 me-1 focus-within:outline-none"
          >
            <svg
              className="w-5 h-5"
              aria-hidden="true"
              fill="#FFC3A1"
              viewBox="0 0 20 20"
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
          <div className="relative hidden md:block">
            <div className="absolute hidden inset-y-0 start-0 items-center ps-3 pointer-events-none">
              <svg
                className="w-4 h-4 text-gray-500 dark:text-gray-400"
                aria-hidden="true"
                fill="none"
                viewBox="0 0 20 20"
              >
                <path
                  stroke="#FFC3A1"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                />
              </svg>
              <span className="sr-only">Search icon</span>
            </div>
            <input
              type="text"
              id="search-navbar"
              className="hidden w-full p-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-[#FFC3A1] dark:text-white focus-visible:outline-none"
              placeholder="Search..."
            />
          </div>
          <button
            data-collapse-toggle="navbar-search"
            type="button"
            className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
            aria-controls="navbar-search"
            aria-expanded="false"
          >
            <span className="sr-only">Open main menu</span>
            <svg
              className="w-5 h-5"
              aria-hidden="true"
              fill="#FFC3A1"
              viewBox="0 0 17 14"
            >
              <path
                stroke="#FFC3A1"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M1 1h15M1 7h15M1 13h15"
              />
            </svg>
          </button>
        </div>
        {/* TODO: Hidden */}
        <div
          className="items-center justify-between w-full md:flex md:w-auto md:order-1"
          id="navbar-search"
        >
          <div className="relative mt-3 md:hidden">
            <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
              <svg
                className="w-4 h-4 text-gray-500 dark:text-gray-400"
                aria-hidden="true"
                fill="none"
                viewBox="0 0 20 20"
              >
                <path
                  stroke="#FFC3A1"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                />
              </svg>
            </div>
            <input
              type="text"
              id="search-navbar"
              className="block w-full p-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-[#FFC3A1] dark:text-white focus-within:outline-none"
              placeholder="Search..."
            />
          </div>
          <ul className="flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-[transparent] dark:border-gray-700">
            <li>
              <Link
                to="/movies"
                className="block py-2 px-3 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:text-[#30475E] dark:hover:text-[#FFC3A1] text-[#FFC3A1] dark:hover:bg-gray-700 md:dark:hover:bg-transparent dark:border-gray-700"
              >
                Movies
              </Link>
            </li>
            <li>
              {
                user
                  ? <a href='#' onClick={logout}
                className="block py-2 px-3 text-[#FFC3A1] rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-[#FFC3A1] md:dark:hover:text-[#30475E] dark:hover:bg-gray-700 md:dark:hover:bg-transparent dark:border-gray-700"
                >Logout</a>
                  : <Link
                to="/login" onClick={login}
                className="block py-2 px-3 text-[#FFC3A1] rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:hover:text-[#FFC3A1] md:dark:text-[#30475E] dark:hover:bg-gray-700 md:dark:hover:bg-transparent dark:border-gray-700"
              >
                Login
              </Link>
              }
            </li>
          </ul>
        </div>
      </div>
      </nav>
      <Routes>
        <Route path='/' element={<MoviesList />} />
        <Route path='/movies' element={<MoviesList />} />
        <Route path='/movies/:id' element={<Movie />} />
        <Route path='/movies/:id/review' element={<AddReview user={user} />} />
        <Route path='/login' element={<Login login={login} />} />
      </Routes>
   </>

  )
}
