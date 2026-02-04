import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import './Navbar.css'

const Navbar = () => {
    const navigate = useNavigate()
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

    const handleLogoDoubleClick = () => {
        navigate('/admin/login')
    }

    const toggleMobileMenu = () => {
        setMobileMenuOpen(!mobileMenuOpen)
    }

    const closeMobileMenu = () => {
        setMobileMenuOpen(false)
    }

    return (
        <nav className="navbar">
            <div className="container">
                <Link
                    to="/"
                    className="logo"
                    onDoubleClick={handleLogoDoubleClick}
                    onClick={closeMobileMenu}
                    style={{ cursor: 'pointer' }}
                >
                    Restaurant
                </Link>

                <button
                    className="mobile-menu-toggle"
                    onClick={toggleMobileMenu}
                    aria-label="Toggle menu"
                >
                    {mobileMenuOpen ? '✕' : '☰'}
                </button>

                <ul className={`nav-links ${mobileMenuOpen ? 'active' : ''}`}>
                    <li><Link to="/" onClick={closeMobileMenu}>Bosh sahifa</Link></li>
                    <li><Link to="/menu" onClick={closeMobileMenu}>Menyu</Link></li>
                    <li><a href="#reservation" onClick={closeMobileMenu}>Stol band qilish</a></li>
                    <li><a href="#contact" onClick={closeMobileMenu}>Aloqa</a></li>
                </ul>
            </div>
        </nav>
    )
}

export default Navbar
