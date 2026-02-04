import { useState, useEffect } from 'react'
import axios from 'axios'
import AdminLayout from '../../components/AdminLayout'
import Modal from '../../components/Modal'
import './AdminPages.css'

const AdminMenu = () => {
    const [items, setItems] = useState([])
    const [filteredItems, setFilteredItems] = useState([])
    const [searchTerm, setSearchTerm] = useState('')
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [form, setForm] = useState({
        name: '', nameUz: '', description: '', descriptionUz: '',
        price: '', category: 'Birinchi taomlar', image: '', available: true
    })
    const [editing, setEditing] = useState(null)

    useEffect(() => {
        fetchItems()
    }, [])

    useEffect(() => {
        // Qidiruv filtri
        if (searchTerm.trim() === '') {
            setFilteredItems(items)
        } else {
            const filtered = items.filter(item =>
                item.nameUz.toLowerCase().includes(searchTerm.toLowerCase()) ||
                item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                item.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
                item.descriptionUz?.toLowerCase().includes(searchTerm.toLowerCase())
            )
            setFilteredItems(filtered)
        }
    }, [searchTerm, items])

    const fetchItems = async () => {
        try {
            const res = await axios.get('/api/menu')
            console.log('Menu items fetched:', res.data)
            setItems(res.data)
            setFilteredItems(res.data)
        } catch (error) {
            console.error('Error fetching menu:', error)
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        const token = localStorage.getItem('token')

        if (!token) {
            alert('Iltimos qaytadan login qiling')
            window.location.href = '/admin/login'
            return
        }

        try {
            if (editing) {
                await axios.put(`/api/menu/${editing}`, form, {
                    headers: { Authorization: `Bearer ${token}` }
                })
                alert('✅ Taom yangilandi!')
            } else {
                await axios.post('/api/menu', form, {
                    headers: { Authorization: `Bearer ${token}` }
                })
                alert('✅ Yangi taom qo\'shildi!')
            }
            fetchItems()
            resetForm()
            setIsModalOpen(false)
        } catch (error) {
            console.error('Submit error:', error.response?.data || error)
            if (error.response?.status === 401) {
                alert('Token muddati tugagan. Qaytadan login qiling.')
                window.location.href = '/admin/login'
            } else {
                alert('Xatolik: ' + (error.response?.data?.message || error.message))
            }
        }
    }

    const handleDelete = async (id) => {
        if (!confirm('O\'chirmoqchimisiz?')) return

        const token = localStorage.getItem('token')

        if (!token) {
            alert('Iltimos qaytadan login qiling')
            window.location.href = '/admin/login'
            return
        }

        try {
            await axios.delete(`/api/menu/${id}`, {
                headers: { Authorization: `Bearer ${token}` }
            })
            alert('✅ Taom o\'chirildi!')
            fetchItems()
        } catch (error) {
            console.error('Delete error:', error.response?.data || error)
            if (error.response?.status === 401) {
                alert('Token muddati tugagan. Qaytadan login qiling.')
                window.location.href = '/admin/login'
            } else {
                alert('Xatolik: ' + (error.response?.data?.message || error.message))
            }
        }
    }

    const handleEdit = (item) => {
        setForm({
            name: item.name || '',
            nameUz: item.nameUz || '',
            description: item.description || '',
            descriptionUz: item.descriptionUz || '',
            price: item.price || '',
            category: item.category || 'Birinchi taomlar',
            image: item.image || '',
            available: item.available !== undefined ? item.available : true
        })
        setEditing(item._id || item.id)
        setIsModalOpen(true)
    }

    const resetForm = () => {
        setForm({
            name: '', nameUz: '', description: '', descriptionUz: '',
            price: '', category: 'Birinchi taomlar', image: '', available: true
        })
        setEditing(null)
    }

    const openAddModal = () => {
        resetForm()
        setIsModalOpen(true)
    }

    return (
        <AdminLayout>
            <div className="admin-page">
                <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: '30px',
                    flexWrap: 'wrap',
                    gap: '15px'
                }}>
                    <h1 style={{ margin: 0 }}>Menyu boshqaruvi</h1>
                    <button onClick={openAddModal} className="btn-primary" style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                        padding: '12px 24px'
                    }}>
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z" />
                        </svg>
                        Yangi taom qo'shish
                    </button>
                </div>

                <Modal
                    isOpen={isModalOpen}
                    onClose={() => {
                        setIsModalOpen(false)
                        resetForm()
                    }}
                    title={editing ? 'Taomni tahrirlash' : 'Yangi taom qo\'shish'}
                    size="large"
                >
                    <form onSubmit={handleSubmit} className="admin-form" style={{ marginBottom: 0 }}>
                        <input
                            type="text"
                            placeholder="Nomi (English)"
                            value={form.name}
                            onChange={(e) => setForm({ ...form, name: e.target.value })}
                            required
                        />
                        <input
                            type="text"
                            placeholder="Nomi (O'zbekcha)"
                            value={form.nameUz}
                            onChange={(e) => setForm({ ...form, nameUz: e.target.value })}
                            required
                        />
                        <textarea
                            placeholder="Tavsif (English)"
                            value={form.description}
                            onChange={(e) => setForm({ ...form, description: e.target.value })}
                        />
                        <textarea
                            placeholder="Tavsif (O'zbekcha)"
                            value={form.descriptionUz}
                            onChange={(e) => setForm({ ...form, descriptionUz: e.target.value })}
                        />
                        <input
                            type="number"
                            placeholder="Narxi"
                            value={form.price}
                            onChange={(e) => setForm({ ...form, price: e.target.value })}
                            required
                        />
                        <select
                            value={form.category}
                            onChange={(e) => setForm({ ...form, category: e.target.value })}
                        >
                            <option>Birinchi taomlar</option>
                            <option>Ikkinchi taomlar</option>
                            <option>Salatlar</option>
                            <option>Ichimliklar</option>
                            <option>Shirinliklar</option>
                        </select>
                        <input
                            type="text"
                            placeholder="Rasm URL"
                            value={form.image}
                            onChange={(e) => setForm({ ...form, image: e.target.value })}
                        />
                        <div className="form-actions">
                            <button type="submit" className="btn-primary">
                                {editing ? 'Yangilash' : 'Qo\'shish'}
                            </button>
                            <button type="button" onClick={() => {
                                setIsModalOpen(false)
                                resetForm()
                            }} className="btn-secondary">
                                Bekor qilish
                            </button>
                        </div>
                    </form>
                </Modal>

                <div className="items-list">
                    <div style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        marginBottom: '20px',
                        flexWrap: 'wrap',
                        gap: '15px'
                    }}>
                        <h2 style={{ margin: 0, color: '#2c3e50' }}>
                            Mavjud taomlar ({filteredItems.length})
                        </h2>
                        <div style={{ position: 'relative', minWidth: '300px' }}>
                            <svg
                                width="20"
                                height="20"
                                viewBox="0 0 24 24"
                                fill="#3498db"
                                style={{
                                    position: 'absolute',
                                    left: '15px',
                                    top: '50%',
                                    transform: 'translateY(-50%)'
                                }}
                            >
                                <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" />
                            </svg>
                            <input
                                type="text"
                                placeholder="Qidirish (nom, kategoriya...)"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                style={{
                                    padding: '12px 20px 12px 45px',
                                    fontSize: '16px',
                                    borderRadius: '50px',
                                    border: '2px solid rgba(52, 152, 219, 0.3)',
                                    outline: 'none',
                                    width: '100%',
                                    transition: 'all 0.3s ease'
                                }}
                                onFocus={(e) => {
                                    e.target.style.borderColor = '#3498db'
                                    e.target.style.boxShadow = '0 0 15px rgba(52, 152, 219, 0.3)'
                                }}
                                onBlur={(e) => {
                                    e.target.style.borderColor = 'rgba(52, 152, 219, 0.3)'
                                    e.target.style.boxShadow = 'none'
                                }}
                            />
                        </div>
                    </div>
                    {filteredItems.length === 0 ? (
                        <div className="empty-state">
                            <h3>{searchTerm ? 'Hech narsa topilmadi' : 'Hozircha taomlar yo\'q'}</h3>
                            <p>{searchTerm ? 'Boshqa so\'z bilan qidiring' : 'Yuqoridagi tugmadan yangi taom qo\'shing'}</p>
                        </div>
                    ) : (
                        filteredItems.map(item => (
                            <div key={item._id || item.id} className="item-card">
                                {item.image && (
                                    <img
                                        src={item.image}
                                        alt={item.nameUz}
                                        style={{
                                            width: '100%',
                                            height: '200px',
                                            objectFit: 'cover',
                                            borderRadius: '10px',
                                            marginBottom: '15px'
                                        }}
                                    />
                                )}
                                <h3>{item.nameUz}</h3>
                                <p><strong>English:</strong> {item.name}</p>
                                <p><strong>Kategoriya:</strong> {item.category}</p>
                                <p><strong>Narxi:</strong> {item.price.toLocaleString()} so'm</p>
                                <p><strong>Tavsif:</strong> {item.descriptionUz}</p>
                                <div className="item-actions">
                                    <button onClick={() => handleEdit(item)} className="btn-primary" style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '8px',
                                        justifyContent: 'center'
                                    }}>
                                        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                                            <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z" />
                                        </svg>
                                        Tahrirlash
                                    </button>
                                    <button onClick={() => handleDelete(item._id || item.id)} className="btn-secondary" style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '8px',
                                        justifyContent: 'center'
                                    }}>
                                        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                                            <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z" />
                                        </svg>
                                        O'chirish
                                    </button>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </AdminLayout>
    )
}

export default AdminMenu
