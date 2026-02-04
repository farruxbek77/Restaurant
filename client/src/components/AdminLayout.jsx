import { Link } from 'react-router-dom'
import './AdminLayout.css'

const AdminLayout = ({ children }) => {
    return (
        <div className="admin-layout">
            <aside className="admin-sidebar">
                <div className="admin-header">
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="white">
                        <path d="M12 2L2 7V17C2 20.31 4.69 23 8 23H16C19.31 23 22 20.31 22 17V7L12 2ZM12 11.99H17C17 14.76 14.76 17 12 17V11.99ZM12 10V4.06L19 7.5V10H12Z" />
                    </svg>
                    <h2>Admin Panel</h2>
                </div>
                <nav>
                    <Link to="/admin">Dashboard</Link>
                    <Link to="/admin/menu">Menyu</Link>
                    <Link to="/admin/orders">Buyurtmalar</Link>
                    <Link to="/admin/reservations">Stol bandlar</Link>
                </nav>
            </aside>
            <main className="admin-content">
                {children}
            </main>
        </div>
    )
}

export default AdminLayout
