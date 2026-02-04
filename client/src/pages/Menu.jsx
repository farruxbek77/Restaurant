import { useState, useEffect } from 'react'
import Navbar from '../components/Navbar'
import axios from 'axios'
import './Menu.css'

const Menu = () => {
    const [menuItems, setMenuItems] = useState([])
    const [category, setCategory] = useState('all')

    useEffect(() => {
        fetchMenu()
    }, [])

    const fetchMenu = async () => {
        try {
            const res = await axios.get('/api/menu')
            console.log('Menu items received:', res.data)
            setMenuItems(res.data)
        } catch (error) {
            console.error('Error fetching menu:', error)
            setMenuItems([])
        }
    }

    const handleOrder = (item) => {
        const customerName = prompt('Ismingizni kiriting:')
        if (!customerName) return

        const phone = prompt('Telefon raqamingizni kiriting:')
        if (!phone) return

        const address = prompt('Manzilingizni kiriting:')
        if (!address) return

        const order = {
            customerName,
            phone,
            address,
            items: [{
                menuItem: item._id || item.id,
                menuItemName: item.nameUz,
                quantity: 1,
                price: Number(item.price)
            }],
            totalAmount: Number(item.price),
            status: 'pending',
            createdAt: new Date().toISOString()
        }

        axios.post('/api/orders', order)
            .then(() => {
                alert(`✅ Buyurtma qabul qilindi!\n\n${item.nameUz}\nNarxi: ${Number(item.price).toLocaleString()} so'm\n\nTez orada siz bilan bog'lanamiz!`)
            })
            .catch(error => {
                console.error('Order error:', error)
                alert('❌ Xatolik yuz berdi. Iltimos qaytadan urinib ko\'ring.')
            })
    }

    const categories = ['all', 'Birinchi taomlar', 'Ikkinchi taomlar', 'Salatlar', 'Ichimliklar', 'Shirinliklar']

    const filteredItems = category === 'all'
        ? menuItems
        : menuItems.filter(item => item.category === category)

    return (
        <div>
            <Navbar />
            <div className="menu-container">
                <h1>Bizning Menyu</h1>

                <div className="category-filter">
                    {categories.map(cat => (
                        <button
                            key={cat}
                            className={category === cat ? 'active' : ''}
                            onClick={() => setCategory(cat)}
                        >
                            {cat === 'all' ? 'Hammasi' : cat}
                        </button>
                    ))}
                </div>

                <div className="menu-grid">
                    {filteredItems.map((item, index) => (
                        <div key={item._id || item.id || index} className="menu-card">
                            {item.image && <img src={item.image} alt={item.nameUz} />}
                            <div className="menu-card-content">
                                <h3>{item.nameUz}</h3>
                                <p>{item.descriptionUz}</p>
                                <div className="price">{item.price.toLocaleString()} so'm</div>
                            </div>
                            <button
                                className="order-btn"
                                onClick={() => handleOrder(item)}
                            >
                                🛒 Buyurtma berish
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Menu
