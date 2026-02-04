import { useState, useEffect } from 'react'
import axios from 'axios'
import AdminLayout from '../../components/AdminLayout'
import './AdminPages.css'

const AdminMenu = () => {
    const [items, setItems] = useState([])
    const [filteredItems, setFilteredItems] = useState([])
    const [searchTerm, setSearchTerm] = useState('')
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
        // Scroll to form
        window.scrollTo({ top: 0, behavior: 'smooth' })
    }

    const resetForm = () => {
        setForm({
            name: '', nameUz: '', description: '', descriptionUz: '',
            price: '', category: 'Birinchi taomlar', image: '', available: true
        })
        setEditing(null)
    }

    return (
        <AdminLayout>
            <div className="admin-page">
                <h1>Menyu boshqaruvi</h1>

                <form onSubmit={handleSubmit} className="admin-form">
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
                        {editing && (
                            <button type="button" onClick={resetForm} className="btn-secondary">
                                Bekor qilish
                            </button>
                        )}
                    </div>
                </form>

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
                        <input
                            type="text"
                            placeholder="🔍 Qidirish (nom, kategoriya...)"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            style={{
                                padding: '12px 20px',
                                fontSize: '16px',
                                borderRadius: '50px',
                                border: '2px solid #e67e22',
                                outline: 'none',
                                minWidth: '300px',
                                transition: 'all 0.3s ease'
                            }}
                            onFocus={(e) => e.target.style.boxShadow = '0 0 15px rgba(230, 126, 34, 0.3)'}
                            onBlur={(e) => e.target.style.boxShadow = 'none'}
                        />
                    </div>
                    {filteredItems.length === 0 ? (
                        <div className="empty-state">
                            <h3>{searchTerm ? 'Hech narsa topilmadi' : 'Hozircha taomlar yo\'q'}</h3>
                            <p>{searchTerm ? 'Boshqa so\'z bilan qidiring' : 'Yuqoridagi formadan yangi taom qo\'shing'}</p>
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
                                    <button onClick={() => handleEdit(item)} className="btn-primary">
                                        ✏️ Tahrirlash
                                    </button>
                                    <button onClick={() => handleDelete(item._id || item.id)} className="btn-secondary">
                                        🗑️ O'chirish
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
