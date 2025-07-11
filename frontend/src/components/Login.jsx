import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

export default function Login() {
    const [form, setForm] = useState({ email: '', password: '' })
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault()
        await axios.post('http://localhost:5000/login', form)
        navigate('/dashboard')
    }

    return (
        <form onSubmit={handleSubmit} className="max-w-md mx-auto p-6 bg-white shadow mt-8">
            <input name="email" onChange={(e) => setForm({ ...form, email: e.target.value })}  className="border p-2 w-full mb-3" placeholder="Email" />
            <input type="password" name="password" onChange={(e) => setForm({ ...form, password: e.target.value })} className="border p-2 w-full mb-3" placeholder="Password" />
            <button type="submit" className="bg-blue-600 text-white w-full p-2 rounded">Login</button>
        </form>
    )
}
