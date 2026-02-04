# Restoran Sayti va Admin Panel

Zamonaviy restoran sayti va admin panel tizimi - MongoDB bilan to'liq backend.

## Texnologiyalar

**Frontend:**
- React 18
- React Router
- Axios
- Vite

**Backend:**
- Node.js
- Express
- MongoDB (Mongoose)
- JWT Authentication
- bcryptjs

## O'rnatish

### 1. Paketlarni o'rnatish

```bash
# Root papkada
npm install

# Client papkada
cd client
npm install
cd ..
```

### 2. Environment o'rnatish

`.env` fayl yarating (yoki `.env.example` dan nusxa oling):

```
PORT=5000
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/restaurant?retryWrites=true&w=majority
JWT_SECRET=your_secret_key_here
```

**Eslatma:** `.env.example` faylida tayyor MongoDB URI mavjud.

### 3. Dastlabki ma'lumotlarni yuklash

Admin user va boshlang'ich menu itemlarni yaratish uchun:

```bash
npm run seed
```

Bu quyidagilarni yaratadi:
- Admin user: username=`admin`, password=`admin123`
- Boshlang'ich menu itemlar

## Ishga tushirish

### Development rejimida

```bash
npm run dev
```

Bu ikkala serverni ham ishga tushiradi:
- Frontend: http://localhost:5173
- Backend: http://localhost:5000

### Alohida ishga tushirish

```bash
# Faqat backend (MongoDB)
npm run server

# Faqat backend (Simple JSON file - eski)
npm run server:simple

# Faqat frontend
npm run client
```

## Admin Panel

Admin panelga kirish: http://localhost:5173/admin/login

Default login ma'lumotlari:
- Username: `admin`
- Password: `admin123`

## Xususiyatlar

### Foydalanuvchi tomoni:
- Bosh sahifa
- Menyu ko'rish va buyurtma berish
- Stol bron qilish
- Aloqa ma'lumotlari

### Admin Panel:
- Dashboard (statistika)
- Menyu boshqaruvi (to'liq CRUD)
- Buyurtmalarni ko'rish va boshqarish
- Bronlarni ko'rish va tasdiqlash
- JWT autentifikatsiya

## Loyiha strukturasi

```
├── client/                 # React frontend
│   ├── src/
│   │   ├── components/    # Komponentlar
│   │   ├── pages/         # Sahifalar
│   │   └── pages/admin/   # Admin sahifalari
│   └── package.json
├── server/                # Express backend
│   ├── models/           # MongoDB modellar
│   ├── routes/           # API route'lar
│   ├── middleware/       # Middleware'lar
│   ├── index.js          # MongoDB server (asosiy)
│   ├── simple-server.js  # JSON file server (eski)
│   └── seed.js           # Dastlabki ma'lumotlar
└── package.json
```

## API Endpoints

### Auth
- POST `/api/auth/register` - Yangi admin yaratish
- POST `/api/auth/login` - Login

### Menu (to'liq CRUD)
- GET `/api/menu` - Barcha taomlar
- GET `/api/menu/:id` - Bitta taom
- POST `/api/menu` - Yangi taom (admin)
- PUT `/api/menu/:id` - Taomni yangilash (admin)
- DELETE `/api/menu/:id` - Taomni o'chirish (admin)

### Reservations
- POST `/api/reservations` - Yangi bron
- GET `/api/reservations` - Barcha bronlar (admin)
- PUT `/api/reservations/:id` - Bron statusini yangilash (admin)

### Orders
- POST `/api/orders` - Yangi buyurtma
- GET `/api/orders` - Barcha buyurtmalar (admin)
- PUT `/api/orders/:id` - Buyurtma statusini yangilash (admin)

## MongoDB Ma'lumotlar

Loyiha MongoDB Atlas (cloud) yoki local MongoDB bilan ishlaydi.

**Models:**
- User - Admin foydalanuvchilar
- MenuItem - Menyu taomlar
- Order - Buyurtmalar
- Reservation - Stol bronlari

Barcha ma'lumotlar MongoDB da saqlanadi va to'liq CRUD operatsiyalari qo'llab-quvvatlanadi.

## Deploy qilish

Saytni deploy qilish uchun batafsil yo'riqnomalar:

- **Tez yo'riqnoma**: [QUICK_DEPLOY.md](QUICK_DEPLOY.md) - 5 daqiqada deploy qiling
- **To'liq yo'riqnoma**: [DEPLOYMENT.md](DEPLOYMENT.md) - Barcha variantlar va sozlamalar

### Qisqacha:

1. GitHub ga yuklang
2. [Render.com](https://render.com) ga kiring
3. Backend va Frontend service yarating
4. Environment variables qo'shing
5. Deploy tugaguncha kuting
6. Tayyor! 🚀

Batafsil: [QUICK_DEPLOY.md](QUICK_DEPLOY.md) ni o'qing.

## Production URL

Deploy qilgandan keyin:
- Frontend: `https://restaurant-frontend.onrender.com`
- Backend: `https://restaurant-backend.onrender.com`
- Admin Panel: `https://restaurant-frontend.onrender.com/admin`

