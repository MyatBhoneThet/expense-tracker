import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import axios from 'axios'

export default function Register() {
  const [form, setForm] = useState({ email: '', password: '' })
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await axios.post('http://localhost:5000/register', form)
      alert("Registered! Now login.")
      navigate("/")
    } catch (err) {
      alert(err.response?.data?.message || "Register failed")
    }
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto p-6 bg-white shadow mt-8">
      <h2 className="text-xl font-bold mb-4">Register</h2>
      <input name="email" onChange={e => setForm({...form, email: e.target.value})}
        className="border p-2 w-full mb-3" placeholder="Email" />
      <input type="password" name="password" onChange={e => setForm({...form, password: e.target.value})}
        className="border p-2 w-full mb-3" placeholder="Password" />
      <button className="bg-green-600 text-white w-full p-2 rounded">Register</button>
      <p className="mt-2 text-sm">Already have an account? <Link to="/" className="text-blue-600">Login</Link></p>
    </form>
  )
}
