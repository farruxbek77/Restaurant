import { useState, useEffect } from 'react'
import axios from 'axios'
import AdminLayout from '../../components/AdminLayout'
import './AdminPages.css'

const AdminReservations = () => {
    const [reservations, setReservations] = useState([])

    useEffect(() => {
        fetchReservations()
    }, [])

    const fetchReservations = async () => {
        try {
            const token = localStorage.getItem('token')
            const res = await axios.get('/api/reservations', {
                headers: { Authorization: `Bearer ${token}` }
            })
            setReservations(res.data)
        } catch (error) {
            console.error('Error:', error)
        }
    }

    const updateStatus = async (id, status) => {
        const token = localStorage.getItem('token')
        try {
            await axios.put(`/api/reservations/${id}`, { status }, {
                headers: { Authorization: `Bearer ${token}` }
            })
            fetchReservations()
        } catch (error) {
            alert('Xatolik yuz berdi')
        }
    }

    return (
        <AdminLayout>
            <div className="admin-page">
                <h1>Stol bandlari</h1>

                <div className="reservations-list">
                    {reservations.map(res => (
                        <div key={res._id || res.id} className="reservation-card">
                            <h3>{res.name}</h3>
                            <p>Telefon: {res.phone}</p>
                            <p>Sana: {new Date(res.date).toLocaleDateString('uz-UZ')}</p>
                            <p>Vaqt: {res.time}</p>
                            <p>Mehmonlar: {res.guests} kishi</p>
                            {res.message && <p>Xabar: {res.message}</p>}
                            <p>Status: <span className={`status ${res.status}`}>{res.status}</span></p>

                            <div className="status-buttons">
                                <button onClick={() => updateStatus(res._id || res.id, 'confirmed')} className="btn-success">
                                    Tasdiqlash
                                </button>
                                <button onClick={() => updateStatus(res._id || res.id, 'cancelled')} className="btn-secondary">
                                    Bekor qilish
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </AdminLayout>
    )
}

export default AdminReservations
