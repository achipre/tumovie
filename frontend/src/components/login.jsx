import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export const Login = ({ login }) => {
  const navigation = useNavigate()
  const [name, setName] = useState('')
  const [id, setId] = useState('')

  const onChangeName = (e) => {
    const newName = e.target.value
    setName(newName)
  }

  const onChangeId = (e) => {
    const newId = e.target.value
    setId(newId)
  }

  const handleLogin = async (e) => {
    e.preventDefault()
    login({ name, id })
    navigation('/')
  }

  return (
    <form className="max-w-sm mx-auto py-12">
      <div className="flex pb-6">
        <span className="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 border border-e-0 border-gray-300 rounded-s-md">
          <svg className="w-4 h-4 text-gray-500" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20">
            <path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm0 5a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm0 13a8.949 8.949 0 0 1-4.951-1.488A3.987 3.987 0 0 1 9 13h2a3.987 3.987 0 0 1 3.951 3.512A8.949 8.949 0 0 1 10 18Z"/>
          </svg>
        </span>
        <input onChange={onChangeName} type="text" id="website-admin" className="rounded-none rounded-e-lg bg-gray-50 border border-gray-300 text-gray-900 focus-visible:outline-none block flex-1 min-w-0 w-full text-sm p-2.5 " placeholder="Username"/>
      </div>
      <div className="flex pb-6">
        <span className="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 border border-e-0 border-gray-300 rounded-s-md">
          <svg className='w-5 h-5 text-gray-500 fill-slate-500' width="800px" height="800px" viewBox="0 0 24 24" version="1.2" baseProfile="tiny">
            <path d="M8.5 11c0 .732.166 1.424.449 2.051l-3.949 3.949v1.5s.896 1.5 2 1.5h2v-2h2v-2h2.5c2.762 0 5-2.238 5-5s-2.238-5-5-5-5 2.238-5 5zm5 2c-1.104 0-2-.896-2-2 0-1.105.896-2.002 2-2.002 1.105 0 2 .896 2 2.002 0 1.104-.895 2-2 2z"/>
          </svg>
        </span>
        <input onChange={onChangeId} type="text" id="website-admin" className="rounded-none rounded-e-lg bg-gray-50 border border-gray-300 text-gray-900 focus-visible:outline-none block flex-1 min-w-0 w-full text-sm p-2.5 " placeholder="Password"/>
      </div>
      <button onClick={handleLogin} type="submit" className=" text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center">Ingresar</button>
    </form>

  )
}
