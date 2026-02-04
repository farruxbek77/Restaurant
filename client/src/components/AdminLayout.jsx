import { Link } from 'react-router-dom'
import { useState } from 'react'
import './AdminLayout.css'

const AdminLayout = ({ children }) => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false)

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen)
    }

    const closeSidebar = () => {
        setIsSidebarOpen(false)
    }

    return (
        <div className="admin-layout">
            {/* Hamburger Menu Button */}
            <button className="hamburger-menu" onClick={toggleSidebar}>
                <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z" />
                </svg>
            </button>

            {/* Overlay */}
            {isSidebarOpen && <div className="sidebar-overlay" onClick={closeSidebar}></div>}

            <aside className={`admin-sidebar ${isSidebarOpen ? 'open' : ''}`}>
                <div className="admin-header">
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="white">
                        <path d="M12 2L2 7V17C2 20.31 4.69 23 8 23H16C19.31 23 22 20.31 22 17V7L12 2ZM12 11.99H17C17 14.76 14.76 17 12 17V11.99ZM12 10V4.06L19 7.5V10H12Z" />
                    </svg>
                    <h2>Admin Panel</h2>
                    <button className="close-sidebar" onClick={closeSidebar}>
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="white">
                            <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
                        </svg>
                    </button>
                </div>
                <nav>
                    <Link to="/admin" onClick={closeSidebar}>
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M3 13h8V3H3v10zm0 8h8v-6H3v6zm10 0h8V11h-8v10zm0-18v6h8V3h-8z" />
                        </svg>
                        Dashboard
                    </Link>
                    <Link to="/admin/menu" onClick={closeSidebar}>
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M8.1 13.34l2.83-2.83L13.76 13.34l2.83-2.83-2.83-2.83-2.83 2.83-2.83-2.83-2.83 2.83 2.83 2.83zM3 3l2 2h14l2-2H3zm0 16h18v2H3v-2zm0-7l2-2h14l2 2H3z" />
                        </svg>
                        Menyu
                    </Link>
                    <Link to="/admin/orders" onClick={closeSidebar}>
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M7 18c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2zM1 2v2h2l3.6 7.59-1.35 2.45c-.16.28-.25.61-.25.96 0 1.1.9 2 2 2h12v-2H7.42c-.14 0-.25-.11-.25-.25l.03-.12.9-1.63h7.45c.75 0 1.41-.41 1.75-1.03l3.58-6.49c.08-.14.12-.31.12-.48 0-.55-.45-1-1-1H5.21l-.94-2H1zm16 16c-1.1 0-1.99.9-1.99 2s.89 2 1.99 2 2-.9 2-2-.9-2-2-2z" />
                        </svg>
                        Buyurtmalar
                    </Link>
                    <Link to="/admin/reservations" onClick={closeSidebar}>
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M19 3h-1V1h-2v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V8h14v11zM7 10h5v5H7z" />
                        </svg>
                        Stol bandlar
                    </Link>
                </nav>
            </aside>
            <main className="admin-content">
                {children}
            </main>
        </div>
    )
}

export default AdminLayout
