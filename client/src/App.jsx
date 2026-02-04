import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Menu from './pages/Menu'
import Contact from './pages/Contact'
import AdminLogin from './pages/admin/Login'
import AdminDashboard from './pages/admin/Dashboard'
import AdminMenu from './pages/admin/Menu'
import AdminOrders from './pages/admin/Orders'
import AdminReservations from './pages/admin/Reservations'
import PrivateRoute from './components/PrivateRoute'

function App() {
    return (
        <Router future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/menu" element={<Menu />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/admin/login" element={<AdminLogin />} />
                <Route path="/admin" element={<PrivateRoute><AdminDashboard /></PrivateRoute>} />
                <Route path="/admin/menu" element={<PrivateRoute><AdminMenu /></PrivateRoute>} />
                <Route path="/admin/orders" element={<PrivateRoute><AdminOrders /></PrivateRoute>} />
                <Route path="/admin/reservations" element={<PrivateRoute><AdminReservations /></PrivateRoute>} />
            </Routes>
        </Router>
    )
}

export default App
