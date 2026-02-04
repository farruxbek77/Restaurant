import { Link, useNavigate } from 'react-router-dom'
import AdminLayout from '../../components/AdminLayout'
import './Dashboard.css'

const AdminDashboard = () => {
    const navigate = useNavigate()
    const username = localStorage.getItem('username')

    const handleLogout = () => {
        localStorage.removeItem('token')
        localStorage.removeItem('username')
        navigate('/admin/login')
    }

    return (
        <AdminLayout>
            <div className="dashboard">
                <h1>Xush kelibsiz, {username}!</h1>

                <div className="dashboard-grid">
                    <Link to="/admin/menu" className="dashboard-card">
                        <h3>Menyu boshqaruvi</h3>
                        <p>Taomlarni qo'shish, o'zgartirish va o'chirish</p>
                    </Link>

                    <Link to="/admin/orders" className="dashboard-card">
                        <h3>Buyurtmalar</h3>
                        <p>Buyurtmalarni ko'rish va boshqarish</p>
                    </Link>

                    <Link to="/admin/reservations" className="dashboard-card">
                        <h3>Stol bandlar</h3>
                        <p>Stol bandlarini ko'rish va tasdiqlash</p>
                    </Link>
                </div>

                <button onClick={handleLogout} className="btn-secondary logout-btn">
                    Chiqish
                </button>
            </div>
        </AdminLayout>
    )
}

export default AdminDashboard
