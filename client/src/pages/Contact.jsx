import Navbar from '../components/Navbar'
import './Contact.css'

const Contact = () => {
    return (
        <div>
            <Navbar />
            <div className="contact-container">
                <div className="contact-hero">
                    <h1>Biz bilan bog'laning</h1>
                    <p>Savollaringiz bormi? Biz sizga yordam berishga tayyormiz!</p>
                </div>

                <div className="contact-content">
                    <div className="contact-info">
                        <div className="info-card">
                            <div className="icon">📍</div>
                            <h3>Manzil</h3>
                            <p>Toshkent shahar, Amir Temur ko'chasi 123</p>
                        </div>

                        <div className="info-card">
                            <div className="icon">📞</div>
                            <h3>Telefon</h3>
                            <p>+998 90 123 45 67</p>
                            <p>+998 91 234 56 78</p>
                        </div>

                        <div className="info-card">
                            <div className="icon">📧</div>
                            <h3>Email</h3>
                            <p>info@restaurant.uz</p>
                            <p>support@restaurant.uz</p>
                        </div>

                        <div className="info-card">
                            <div className="icon">🕐</div>
                            <h3>Ish vaqti</h3>
                            <p>Dushanba - Yakshanba</p>
                            <p>09:00 - 23:00</p>
                        </div>
                    </div>

                    <div className="contact-form-section">
                        <h2>Xabar yuboring</h2>
                        <form className="contact-form">
                            <div className="form-group">
                                <input
                                    type="text"
                                    placeholder="Ismingiz"
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <input
                                    type="tel"
                                    placeholder="Telefon raqamingiz"
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <input
                                    type="email"
                                    placeholder="Email manzilingiz"
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <textarea
                                    placeholder="Xabaringiz"
                                    rows="5"
                                    required
                                ></textarea>
                            </div>
                            <button type="submit" className="submit-btn">
                                Yuborish
                            </button>
                        </form>
                    </div>
                </div>

                <div className="map-section">
                    <h2>Bizning joylashuv</h2>
                    <div className="map-placeholder">
                        <iframe
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2996.5979937638!2d69.24004931541826!3d41.31151597927097!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x38ae8b0cc379e9c3%3A0xa5a9323b4aa5cb98!2sAmir%20Temur%20Square!5e0!3m2!1sen!2s!4v1234567890123!5m2!1sen!2s"
                            width="100%"
                            height="250"
                            style={{ border: 0, borderRadius: '12px' }}
                            allowFullScreen=""
                            loading="lazy"
                        ></iframe>
                    </div>
                </div>

                <div className="social-section">
                    <h2>Ijtimoiy tarmoqlarda</h2>
                    <div className="social-links">
                        <a href="#" className="social-link facebook">
                            <span>📘</span> Facebook
                        </a>
                        <a href="#" className="social-link instagram">
                            <span>📷</span> Instagram
                        </a>
                        <a href="#" className="social-link telegram">
                            <span>✈️</span> Telegram
                        </a>
                        <a href="#" className="social-link youtube">
                            <span>📺</span> YouTube
                        </a>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Contact
