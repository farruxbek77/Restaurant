import { useState, useEffect } from 'react'
import axios from 'axios'
import AdminLayout from '../../components/AdminLayout'
import './AdminPages.css'

const AdminOrders = () => {
    const [orders, setOrders] = useState([])

    useEffect(() => {
        fetchOrders()
    }, [])

    const fetchOrders = async () => {
        try {
            const token = localStorage.getItem('token')
            console.log('Fetching orders with token:', token ? 'exists' : 'missing')
            const res = await axios.get('/api/orders', {
                headers: { Authorization: `Bearer ${token}` }
            })
            console.log('Orders received:', res.data)
            setOrders(res.data)
        } catch (error) {
            console.error('Error fetching orders:', error.response?.data || error.message)
        }
    }

    const updateStatus = async (id, status) => {
        const token = localStorage.getItem('token')
        try {
            await axios.put(`/api/orders/${id}`, { status }, {
                headers: { Authorization: `Bearer ${token}` }
            })
            fetchOrders()
        } catch (error) {
            alert('Xatolik yuz berdi')
        }
    }

    return (
        <AdminLayout>
            <div className="admin-page">
                <h1>Buyurtmalar</h1>

                <div className="orders-list">
                    {orders.length === 0 ? (
                        <p>Hozircha buyurtmalar yo'q</p>
                    ) : null}
                    {orders.map(order => (
                        <div key={order._id || order.id} className="order-card">
                            <h3>{order.customerName}</h3>
                            <p><strong>Telefon:</strong> {order.phone}</p>
                            <p><strong>Manzil:</strong> {order.address}</p>

                            <div className="order-items">
                                <strong>Buyurtmalar:</strong>
                                <ul>
                                    {order.items && order.items.map((item, index) => (
                                        <li key={index}>
                                            {item.menuItemName} - {item.quantity} ta - {Number(item.price).toLocaleString()} so'm
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            <p><strong>Jami summa:</strong> <span className="total-amount">{Number(order.totalAmount).toLocaleString()} so'm</span></p>
                            <p><strong>Status:</strong> <span className={`status ${order.status}`}>{order.status}</span></p>
                            <p><strong>Sana:</strong> {new Date(order.createdAt).toLocaleString('uz-UZ')}</p>

                            <div className="status-buttons">
                                <button onClick={() => updateStatus(order._id || order.id, 'confirmed')} className="btn-success">
                                    Tasdiqlash
                                </button>
                                <button onClick={() => updateStatus(order._id || order.id, 'preparing')} className="btn-primary">
                                    Tayyorlanmoqda
                                </button>
                                <button onClick={() => updateStatus(order._id || order.id, 'delivered')} className="btn-success">
                                    Yetkazildi
                                </button>
                                <button onClick={() => updateStatus(order._id || order.id, 'cancelled')} className="btn-secondary">
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

export default AdminOrders
