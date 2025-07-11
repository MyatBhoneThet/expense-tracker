// route-level pages

import React, { useEffect, useState } from 'react'
import api from '../services/api'
import { useNavigate } from 'react-router-dom'

export default function Profile() {
  const [data, setData] = useState(null)
  const navigate = useNavigate()

  useEffect(() => {
    api.get('/auth/profile')
      .then(res => setData(res.data))
      .catch(() => {
        alert('Unauthorized. Please login.')
        navigate('/login')
      })
  }, [])

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded shadow mt-6">
      <h2 className="text-xl font-bold mb-4">Profile Page</h2>
      {data ? <p>{data.message}</p> : <p>Loading...</p>}
      <button onClick={() => { localStorage.removeItem('token'); navigate('/login') }}
        className="mt-4 bg-red-600 text-white px-4 py-2 rounded w-full">
        Logout
      </button>
    </div>
  )
}
