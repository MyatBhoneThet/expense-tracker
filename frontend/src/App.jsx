import { Routes, Route, Navigate } from 'react-router-dom'
import Login from './components/Login'
import Register from './components/Register'
import Sidebar from './components/Sidebar'
import Dashboard from './components/Dashboard'
import Incomes from './components/Incomes'
import Expenses from './components/Expenses'
import ViewHistory from './components/ViewHistory'

export default function App() {
    return (
        <div className="flex">
            <Sidebar />
            <div className="flex-1 ml-60 p-6">
                <Routes>
                    <Route path="/" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/incomes" element={<Incomes />} />
                    <Route path="/expenses" element={<Expenses />} />
                    <Route path="/viewhistory" element={<ViewHistory />} />
                    {/* Example redirect */}
                    <Route path="*" element={<Navigate to="/" />} />
                </Routes>
            </div>
        </div>
    );
}
