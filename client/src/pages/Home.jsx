import { useState, useEffect } from 'react'
import Navbar from '../components/Navbar'
import axios from 'axios'
import './Home.css'

const Home = () => {
    const [reservation, setReservation] = useState({
        name: '', phone: '', date: '', time: '', guests: 2, message: ''
    })
    const [contact, setContact] = useState({
        name: '', email: '', subject: '', message: ''
    })
    const [menuItems, setMenuItems] = useState([])

    useEffect(() => {
        fetchMenu()
    }, [])

    const fetchMenu = async () => {
        try {
            const res = await axios.get('/api/menu')
            setMenuItems(res.data.slice(0, 8)) // 8 ta taom ko'rsatamiz (2 qator x 4 ustun)
        } catch (error) {
            console.error('Error fetching menu:', error)
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            await axios.post('/api/reservations', reservation)
            alert('Stol band qilish muvaffaqiyatli amalga oshirildi!')
            setReservation({ name: '', phone: '', date: '', time: '', guests: 2, message: '' })
        } catch (error) {
            console.error('Reservation error:', error)
            alert('Xatolik yuz berdi. Server ishlamayotgan bo\'lishi mumkin.')
        }
    }

    const handleContactSubmit = async (e) => {
        e.preventDefault()
        try {
            // Bu yerda contact form uchun API qo'shishingiz mumkin
            alert('Xabaringiz muvaffaqiyatli yuborildi!')
            setContact({ name: '', email: '', subject: '', message: '' })
        } catch (error) {
            console.error('Contact error:', error)
            alert('Xatolik yuz berdi.')
        }
    }

    return (
        <div>
            <Navbar />

            <section className="hero">
                <div className="hero-content">
                    <h1>Xush kelibsiz!</h1>
                    <p>Eng mazali taomlar va ajoyib xizmat. O'zbek milliy taomlarining noyob ta'mi va zamonaviy restoran madaniyatining uyg'unligi. Biz sizga unutilmas lazzat va samimiy muhit taqdim etamiz. Har bir taom sevgi bilan tayyorlanadi va professional oshpazlarimiz tomonidan eng sifatli mahsulotlardan foydalaniladi. Oilaviy muhit, qulay narxlar va ajoyib xizmat - bularning barchasi sizni kutmoqda!</p>
                    <a href="#reservation" className="btn-primary">Stol band qilish</a>
                </div>
            </section>

            <section className="about-section">
                <div className="container">
                    <h2>Biz haqimizda</h2>
                    <div className="about-content">
                        <div className="about-text">
                            <h3>O'zbekistonning eng yaxshi restaurantlari</h3>
                            <p>Biz 2010 yildan beri mijozlarimizga eng mazali va sifatli taomlarni taqdim etib kelmoqdamiz. Bizning oshpazlarimiz an'anaviy o'zbek oshxonasining barcha sirlarini bilishadi.</p>
                            <p>Har bir taom sevgi va g'amxo'rlik bilan tayyorlanadi. Biz faqat eng yangi va sifatli mahsulotlardan foydalanamiz.</p>
                            <div className="features">
                                <div className="feature-item">
                                    <div className="feature-icon">
                                        <svg width="50" height="50" viewBox="0 0 24 24" fill="none">
                                            <path d="M8.1 13.34L10.93 10.51L13.76 13.34L16.59 10.51L13.76 7.68L10.93 10.51L8.1 7.68L5.27 10.51L8.1 13.34ZM7 2L9 4H15L17 2H22V7L20 9V15L22 17V22H17L15 20H9L7 22H2V17L4 15V9L2 7V2H7Z" fill="#e67e22" />
                                        </svg>
                                    </div>
                                    <h4>Sifatli taomlar</h4>
                                    <p>Eng yaxshi mahsulotlar</p>
                                </div>
                                <div className="feature-item">
                                    <div className="feature-icon">
                                        <svg width="50" height="50" viewBox="0 0 24 24" fill="none">
                                            <path d="M12.5 1.5C10.73 1.5 9.45 3.46 9.04 5.5H15C14.55 3.46 13.27 1.5 12.5 1.5ZM19.5 9.5H17V8.5C17 6.57 15.43 5 13.5 5H11.5C9.57 5 8 6.57 8 8.5V9.5H5.5C4.67 9.5 4 10.17 4 11V20C4 20.83 4.67 21.5 5.5 21.5H19.5C20.33 21.5 21 20.83 21 20V11C21 10.17 20.33 9.5 19.5 9.5ZM10 8.5C10 7.67 10.67 7 11.5 7H13.5C14.33 7 15 7.67 15 8.5V9.5H10V8.5Z" fill="#f39c12" />
                                        </svg>
                                    </div>
                                    <h4>Professional oshpazlar</h4>
                                    <p>Tajribali mutaxassislar</p>
                                </div>
                                <div className="feature-item">
                                    <div className="feature-icon">
                                        <svg width="50" height="50" viewBox="0 0 24 24" fill="none">
                                            <path d="M13 2.03V2.05L13 4.05C17.39 4.59 20.5 8.58 19.96 12.97C19.5 16.61 16.64 19.5 13 19.93V21.93C18.5 21.38 22.5 16.5 21.95 11C21.5 6.25 17.73 2.5 13 2.03ZM11 2.06C9.05 2.25 7.19 3 5.67 4.26L7.1 5.74C8.22 4.84 9.57 4.26 11 4.06V2.06ZM4.26 5.67C3 7.19 2.25 9.04 2.05 11H4.05C4.24 9.58 4.8 8.23 5.69 7.1L4.26 5.67ZM2.06 13C2.26 14.96 3.03 16.81 4.27 18.33L5.69 16.9C4.81 15.77 4.24 14.42 4.06 13H2.06ZM7.1 18.37L5.67 19.74C7.18 21 9.04 21.79 11 22V20C9.58 19.82 8.23 19.25 7.1 18.37Z" fill="#3498db" />
                                        </svg>
                                    </div>
                                    <h4>Tez xizmat</h4>
                                    <p>30 daqiqada tayyor</p>
                                </div>
                            </div>
                        </div>
                        <div className="about-image">
                            <img src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=600" alt="Restaurant" />
                        </div>
                    </div>
                </div>
            </section>

            <section className="services-section">
                <div className="container">
                    <h2>Bizning xizmatlar</h2>
                    <div className="services-grid">
                        <div className="service-card">
                            <div className="service-icon">
                                <svg width="60" height="60" viewBox="0 0 24 24" fill="none">
                                    <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" fill="#e67e22" />
                                </svg>
                            </div>
                            <h3>Tadbirlar uchun</h3>
                            <p>To'y, yubiley va boshqa tadbirlar uchun maxsus xizmat</p>
                        </div>
                        <div className="service-card">
                            <div className="service-icon">
                                <svg width="60" height="60" viewBox="0 0 24 24" fill="none">
                                    <path d="M18 18.5C18.83 18.5 19.5 17.83 19.5 17C19.5 16.17 18.83 15.5 18 15.5C17.17 15.5 16.5 16.17 16.5 17C16.5 17.83 17.17 18.5 18 18.5ZM19.5 9.5H17V12H21.46L19.5 9.5ZM6 18.5C6.83 18.5 7.5 17.83 7.5 17C7.5 16.17 6.83 15.5 6 15.5C5.17 15.5 4.5 16.17 4.5 17C4.5 17.83 5.17 18.5 6 18.5ZM20 8L23 12V17H21C21 18.66 19.66 20 18 20C16.34 20 15 18.66 15 17H9C9 18.66 7.66 20 6 20C4.34 20 3 18.66 3 17H1V6C1 4.89 1.89 4 3 4H17V8H20Z" fill="#f39c12" />
                                </svg>
                            </div>
                            <h3>Yetkazib berish</h3>
                            <p>Shahar bo'ylab tez va bepul yetkazib berish xizmati</p>
                        </div>
                        <div className="service-card">
                            <div className="service-icon">
                                <svg width="60" height="60" viewBox="0 0 24 24" fill="none">
                                    <path d="M12 3V13.55C11.41 13.21 10.73 13 10 13C7.79 13 6 14.79 6 17C6 19.21 7.79 21 10 21C12.21 21 14 19.21 14 17V7H18V3H12Z" fill="#e74c3c" />
                                </svg>
                            </div>
                            <h3>Jonli musiqa</h3>
                            <p>Dam olish kunlari jonli musiqa dasturi</p>
                        </div>
                    </div>
                </div>
            </section>

            <section className="home-menu-section">
                <div className="container">
                    <h2>Bizning Menyu</h2>
                    <p className="section-subtitle">Eng mashhur taomlarimiz</p>
                    <div className="home-menu-grid">
                        {menuItems.map(item => (
                            <div key={item.id} className="home-menu-card">
                                {item.image && <img src={item.image} alt={item.nameUz} />}
                                <div className="home-menu-content">
                                    <h3>{item.nameUz}</h3>
                                    <p>{item.descriptionUz}</p>
                                    <div className="home-menu-price">{Number(item.price).toLocaleString()} so'm</div>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="menu-link-wrapper">
                        <a href="/menu" className="btn-primary">Barcha menyuni ko'rish</a>
                    </div>
                </div>
            </section>

            <section className="gallery-section">
                <div className="container">
                    <h2>Galereya</h2>
                    <div className="gallery-grid">
                        <div className="gallery-item">
                            <img src="https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=400" alt="Burger" />
                            <div className="gallery-content">
                                <h3>Burger</h3>
                                <p>Mazali go'sht va yangi sabzavotlar bilan tayyorlangan klassik burger</p>
                            </div>
                        </div>
                        <div className="gallery-item">
                            <img src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=400" alt="Salat" />
                            <div className="gallery-content">
                                <h3>Yangi Salat</h3>
                                <p>Toza sabzavotlar va maxsus sous bilan tayyorlangan sog'lom salat</p>
                            </div>
                        </div>
                        <div className="gallery-item">
                            <img src="https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=400" alt="Pizza" />
                            <div className="gallery-content">
                                <h3>Pizza</h3>
                                <p>Italyan uslubida tayyorlangan issiq va mazali pizza</p>
                            </div>
                        </div>
                        <div className="gallery-item">
                            <img src="https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=400" alt="Pancake" />
                            <div className="gallery-content">
                                <h3>Pancake</h3>
                                <p>Shirinlik va mevalar bilan bezatilgan yumshoq pancake</p>
                            </div>
                        </div>
                        <div className="gallery-item">
                            <img src="https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=400" alt="Salad Bowl" />
                            <div className="gallery-content">
                                <h3>Salad Bowl</h3>
                                <p>Turli xil sabzavotlar va protein bilan to'ldirilgan sog'lom taom</p>
                            </div>
                        </div>
                        <div className="gallery-item">
                            <img src="https://images.unsplash.com/photo-1565958011703-44f9829ba187?w=400" alt="Salad" />
                            <div className="gallery-content">
                                <h3>Aralash Salat</h3>
                                <p>Yangi sabzavotlar va maxsus dressing bilan tayyorlangan salat</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="testimonials-section">
                <div className="container">
                    <h2>Mijozlar fikrlari</h2>
                    <div className="testimonials-grid">
                        <div className="testimonial-card">
                            <div className="stars">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="#f39c12">
                                    <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
                                </svg>
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="#f39c12">
                                    <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
                                </svg>
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="#f39c12">
                                    <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
                                </svg>
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="#f39c12">
                                    <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
                                </svg>
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="#f39c12">
                                    <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
                                </svg>
                            </div>
                            <p>"Eng mazali osh! Xizmat ham ajoyib. Albatta qaytib kelamiz!"</p>
                            <h4>Aziz Rahimov</h4>
                        </div>
                        <div className="testimonial-card">
                            <div className="stars">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="#f39c12">
                                    <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
                                </svg>
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="#f39c12">
                                    <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
                                </svg>
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="#f39c12">
                                    <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
                                </svg>
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="#f39c12">
                                    <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
                                </svg>
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="#f39c12">
                                    <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
                                </svg>
                            </div>
                            <p>"Oilaviy muhit, shinam joy. Taomlar juda mazali va narxlar qulay."</p>
                            <h4>Dilnoza Karimova</h4>
                        </div>
                        <div className="testimonial-card">
                            <div className="stars">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="#f39c12">
                                    <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
                                </svg>
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="#f39c12">
                                    <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
                                </svg>
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="#f39c12">
                                    <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
                                </svg>
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="#f39c12">
                                    <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
                                </svg>
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="#f39c12">
                                    <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
                                </svg>
                            </div>
                            <p>"Professional xizmat va an'anaviy ta'm. Tavsiya qilaman!"</p>
                            <h4>Sardor Toshmatov</h4>
                        </div>
                    </div>
                </div>
            </section>

            <section id="reservation" className="reservation-section">
                <div className="container">
                    <h2>Bog'lanish</h2>
                    <div className="forms-container">
                        <div className="form-wrapper">
                            <h3>Stol band qilish</h3>
                            <form onSubmit={handleSubmit} className="reservation-form">
                                <input
                                    type="text"
                                    placeholder="Ismingiz"
                                    value={reservation.name}
                                    onChange={(e) => setReservation({ ...reservation, name: e.target.value })}
                                    required
                                />
                                <input
                                    type="tel"
                                    placeholder="Telefon raqam"
                                    value={reservation.phone}
                                    onChange={(e) => setReservation({ ...reservation, phone: e.target.value })}
                                    required
                                />
                                <input
                                    type="date"
                                    value={reservation.date}
                                    onChange={(e) => setReservation({ ...reservation, date: e.target.value })}
                                    required
                                />
                                <input
                                    type="time"
                                    value={reservation.time}
                                    onChange={(e) => setReservation({ ...reservation, time: e.target.value })}
                                    required
                                />
                                <input
                                    type="number"
                                    placeholder="Mehmonlar soni"
                                    min="1"
                                    value={reservation.guests}
                                    onChange={(e) => setReservation({ ...reservation, guests: e.target.value })}
                                    required
                                />
                                <textarea
                                    placeholder="Qo'shimcha xabar"
                                    value={reservation.message}
                                    onChange={(e) => setReservation({ ...reservation, message: e.target.value })}
                                />
                                <button type="submit" className="btn-primary">Yuborish</button>
                            </form>
                        </div>

                        <div className="form-wrapper">
                            <h3>Xabar yuborish</h3>
                            <form onSubmit={handleContactSubmit} className="contact-form">
                                <input
                                    type="text"
                                    placeholder="Ismingiz"
                                    value={contact.name}
                                    onChange={(e) => setContact({ ...contact, name: e.target.value })}
                                    required
                                />
                                <input
                                    type="email"
                                    placeholder="Email"
                                    value={contact.email}
                                    onChange={(e) => setContact({ ...contact, email: e.target.value })}
                                    required
                                />
                                <input
                                    type="text"
                                    placeholder="Mavzu"
                                    value={contact.subject}
                                    onChange={(e) => setContact({ ...contact, subject: e.target.value })}
                                    required
                                />
                                <textarea
                                    placeholder="Xabaringiz"
                                    value={contact.message}
                                    onChange={(e) => setContact({ ...contact, message: e.target.value })}
                                    required
                                />
                                <button type="submit" className="btn-primary">Yuborish</button>
                            </form>
                        </div>
                    </div>
                </div>
            </section>

            <section id="contact" className="contact-section">
                <div className="container">
                    <div className="footer-content">
                        <div className="footer-column">
                            <div className="footer-logo">
                                <div className="logo-with-icon">
                                    <svg width="40" height="40" viewBox="0 0 24 24" fill="white">
                                        <path d="M12.5 1.5C10.73 1.5 9.45 3.46 9.04 5.5H15C14.55 3.46 13.27 1.5 12.5 1.5ZM19.5 9.5H17V8.5C17 6.57 15.43 5 13.5 5H11.5C9.57 5 8 6.57 8 8.5V9.5H5.5C4.67 9.5 4 10.17 4 11V20C4 20.83 4.67 21.5 5.5 21.5H19.5C20.33 21.5 21 20.83 21 20V11C21 10.17 20.33 9.5 19.5 9.5ZM10 8.5C10 7.67 10.67 7 11.5 7H13.5C14.33 7 15 7.67 15 8.5V9.5H10V8.5Z" />
                                    </svg>
                                    <h3>Restaurant</h3>
                                </div>
                                <p>Eng mazali va sifatli taomlarni taqdim etuvchi ishonchli restoran</p>
                            </div>
                            <div className="social-links">
                                <a href="#" aria-label="Facebook">
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                                        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                                    </svg>
                                </a>
                                <a href="#" aria-label="Twitter">
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                                        <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                                    </svg>
                                </a>
                                <a href="#" aria-label="Instagram">
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                                        <path d="M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.012 8.333 0 8.74 0 12s.015 3.667.072 4.947c.06 1.277.261 2.148.558 2.913.306.788.717 1.459 1.384 2.126.667.666 1.336 1.079 2.126 1.384.766.296 1.636.499 2.913.558C8.333 23.988 8.74 24 12 24s3.667-.015 4.947-.072c1.277-.06 2.148-.262 2.913-.558.788-.306 1.459-.718 2.126-1.384.666-.667 1.079-1.335 1.384-2.126.296-.765.499-1.636.558-2.913.06-1.28.072-1.687.072-4.947s-.015-3.667-.072-4.947c-.06-1.277-.262-2.149-.558-2.913-.306-.789-.718-1.459-1.384-2.126C21.319 1.347 20.651.935 19.86.63c-.765-.297-1.636-.499-2.913-.558C15.667.012 15.26 0 12 0zm0 2.16c3.203 0 3.585.016 4.85.071 1.17.055 1.805.249 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.413 2.227.057 1.266.07 1.646.07 4.85s-.015 3.585-.074 4.85c-.061 1.17-.256 1.805-.421 2.227-.224.562-.479.96-.899 1.382-.419.419-.824.679-1.38.896-.42.164-1.065.36-2.235.413-1.274.057-1.649.07-4.859.07-3.211 0-3.586-.015-4.859-.074-1.171-.061-1.816-.256-2.236-.421-.569-.224-.96-.479-1.379-.899-.421-.419-.69-.824-.9-1.38-.165-.42-.359-1.065-.42-2.235-.045-1.26-.061-1.649-.061-4.844 0-3.196.016-3.586.061-4.861.061-1.17.255-1.814.42-2.234.21-.57.479-.96.9-1.381.419-.419.81-.689 1.379-.898.42-.166 1.051-.361 2.221-.421 1.275-.045 1.65-.06 4.859-.06l.045.03zm0 3.678c-3.405 0-6.162 2.76-6.162 6.162 0 3.405 2.76 6.162 6.162 6.162 3.405 0 6.162-2.76 6.162-6.162 0-3.405-2.76-6.162-6.162-6.162zM12 16c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm7.846-10.405c0 .795-.646 1.44-1.44 1.44-.795 0-1.44-.646-1.44-1.44 0-.794.646-1.439 1.44-1.439.793-.001 1.44.645 1.44 1.439z" />
                                    </svg>
                                </a>
                            </div>
                        </div>

                        <div className="footer-column">
                            <h4>Tez havolalar</h4>
                            <ul>
                                <li><a href="/">Bosh sahifa</a></li>
                                <li><a href="/menu">Menyu</a></li>
                                <li><a href="#reservation">Stol band qilish</a></li>
                                <li><a href="#about">Biz haqimizda</a></li>
                            </ul>
                        </div>

                        <div className="footer-column">
                            <h4>Xizmatlar</h4>
                            <ul>
                                <li><a href="#">Yetkazib berish</a></li>
                                <li><a href="#">Tadbirlar uchun</a></li>
                                <li><a href="#">Jonli musiqa</a></li>
                                <li><a href="#">Bolalar xonasi</a></li>
                            </ul>
                        </div>

                        <div className="footer-column">
                            <h4>Aloqa</h4>
                            <ul className="contact-info">
                                <li className="contact-item">
                                    <span className="icon">
                                        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                                            <path d="M12 2C8.13 2 5 5.13 5 9C5 14.25 12 22 12 22C12 22 19 14.25 19 9C19 5.13 15.87 2 12 2ZM12 11.5C10.62 11.5 9.5 10.38 9.5 9C9.5 7.62 10.62 6.5 12 6.5C13.38 6.5 14.5 7.62 14.5 9C14.5 10.38 13.38 11.5 12 11.5Z" />
                                        </svg>
                                    </span>
                                    <div className="contact-text">
                                        <div>Toshkent, O'zbekiston</div>
                                        <div>Amir Temur ko'chasi 108</div>
                                    </div>
                                </li>
                                <li className="contact-item">
                                    <span className="icon">
                                        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                                            <path d="M6.62 10.79C8.06 13.62 10.38 15.94 13.21 17.38L15.41 15.18C15.69 14.9 16.08 14.82 16.43 14.93C17.55 15.3 18.75 15.5 20 15.5C20.55 15.5 21 15.95 21 16.5V20C21 20.55 20.55 21 20 21C10.61 21 3 13.39 3 4C3 3.45 3.45 3 4 3H7.5C8.05 3 8.5 3.45 8.5 4C8.5 5.25 8.7 6.45 9.07 7.57C9.18 7.92 9.1 8.31 8.82 8.59L6.62 10.79Z" />
                                        </svg>
                                    </span>
                                    <div className="contact-text">
                                        <div>+998 90 123 45 67</div>
                                        <div>+998 91 234 56 78</div>
                                    </div>
                                </li>
                                <li className="contact-item">
                                    <span className="icon">
                                        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                                            <path d="M20 4H4C2.9 4 2.01 4.9 2.01 6L2 18C2 19.1 2.9 20 4 20H20C21.1 20 22 19.1 22 18V6C22 4.9 21.1 4 20 4ZM20 8L12 13L4 8V6L12 11L20 6V8Z" />
                                        </svg>
                                    </span>
                                    <span className="contact-text">info@restaurant.uz</span>
                                </li>
                            </ul>
                        </div>
                    </div>

                    <div className="footer-bottom">
                        <p>© 2026 Restaurant. Barcha huquqlar himoyalangan.</p>
                        <div className="footer-links">
                            <a href="#">Maxfiylik siyosati</a>
                            <span className="separator">|</span>
                            <a href="#">Foydalanish shartlari</a>
                            <span className="separator">|</span>
                            <a href="#">Cookie parametrlari</a>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default Home
