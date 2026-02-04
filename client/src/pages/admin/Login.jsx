import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import './Login.css'

const AdminLogin = () => {
    const [credentials, setCredentials] = useState({ username: '', password: '' })
    const [error, setError] = useState('')
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const res = await axios.post('/api/auth/login', credentials)
            localStorage.setItem('token', res.data.token)
            localStorage.setItem('username', res.data.username)
            navigate('/admin')
        } catch (error) {
            setError('Login yoki parol noto\'g\'ri')
        }
    }

    return (
        <div className="login-container">
            <div className="login-box">
                <h2>Admin Panel</h2>
                {error && <div className="error">{error}</div>}
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        placeholder="Foydalanuvchi nomi"
                        value={credentials.username}
                        onChange={(e) => setCredentials({ ...credentials, username: e.target.value })}
                        required
                    />
                    <input
                        type="password"
                        placeholder="Parol"
                        value={credentials.password}
                        onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
                        required
                    />
                    <button type="submit" className="btn-primary">Kirish</button>
                </form>
                <p style={{ textAlign: 'center', marginTop: '20px', color: '#7f8c8d', fontSize: '14px' }}>
                    Default: admin / admin123
                </p>
            </div>
        </div>
    )
}

export default AdminLogin
