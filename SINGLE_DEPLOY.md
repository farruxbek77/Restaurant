# Bitta Service da Deploy qilish (Backend + Frontend)

Bu usulda backend va frontend bitta Render service da ishlaydi.

## ✅ Afzalliklari:
- Faqat 1 ta service kerak
- CORS muammosi yo'q
- Oson sozlash
- Bepul (1 ta free instance)

## 📋 Qadamlar:

### 1. GitHub ga push qiling

```bash
git add .
git commit -m "Configure for single deployment"
git push origin main
```

### 2. Render.com ga kiring

👉 https://render.com

### 3. Web Service yarating

1. **New +** → **Web Service**
2. Repository: `farruxbek77/Restaurant` ni tanlang
3. Sozlamalar:

```
Name: restaurant-app
Region: Oregon (US West) yoki Frankfurt (Europe)
Branch: main
Root Directory: (bo'sh qoldiring)
Runtime: Node
Build Command: npm run deploy
Start Command: npm start
Instance Type: Free
```

### 4. Environment Variables qo'shing

```
MONGODB_URI
mongodb+srv://Farruxbek:8Fp0doAjtsahQqEJ@cluster0.xzesbhq.mongodb.net/?appName=Cluster0

JWT_SECRET
my_super_secret_jwt_key_2024_change_this

PORT
10000

NODE_ENV
production
```

⚠️ **Muhim:** Render.com da PORT ni 10000 qilish kerak (Render default)

### 5. Create Web Service

**Create Web Service** tugmasini bosing va deploy tugaguncha kuting (10-15 daqiqa).

### 6. Database seed qiling

Deploy tugagach:

1. Service sahifasida **Shell** tugmasini bosing
2. Quyidagi buyruqni bajaring:

```bash
npm run seed
```

### 7. Tayyor! 🎉

URL ni oching (masalan: `https://restaurant-app.onrender.com`)

**Admin Panel:** `https://restaurant-app.onrender.com/admin`

**Login:**
- Username: `admin`
- Password: `admin123`

---

## 🔧 Local da test qilish

Production rejimida test qilish:

```bash
# Build qiling
npm run deploy

# Production rejimida ishga tushiring
NODE_ENV=production npm start
```

Keyin brauzerda: http://localhost:5000

---

## 📊 Render.com sozlamalari

### Build Command nima qiladi:
```bash
npm run deploy
```

Bu buyruq:
1. Root da `npm install` (backend packages)
2. `cd client && npm install` (frontend packages)
3. `npm run build` (frontend build)
4. Frontend `client/dist` papkaga build bo'ladi

### Start Command nima qiladi:
```bash
npm start
```

Bu buyruq:
1. `node server/index.js` ni ishga tushiradi
2. Backend API `/api/*` da ishlaydi
3. Frontend static files serve qilinadi
4. Barcha boshqa route'lar `index.html` ga yo'naltiriladi

---

## 🌐 URL Structure

Bitta URL dan hamma narsa ishlaydi:

```
https://restaurant-app.onrender.com/          → Frontend (Home)
https://restaurant-app.onrender.com/menu      → Frontend (Menu)
https://restaurant-app.onrender.com/admin     → Frontend (Admin)
https://restaurant-app.onrender.com/api/menu  → Backend API
https://restaurant-app.onrender.com/api/auth  → Backend API
```

---

## 🔍 Muammolarni hal qilish

### Frontend ko'rinmayapti
- Render logs ni tekshiring
- Build muvaffaqiyatli tugaganini tekshiring
- `client/dist` papka yaratilganini tekshiring

### API ishlamayapti
- `/api/health` endpoint ni tekshiring
- MongoDB URI to'g'riligini tekshiring
- Environment variables to'liqligini tekshiring

### Build xatosi
- Local da `npm run deploy` bajaring
- Xatolarni tuzating
- Qayta push qiling

---

## 💡 Maslahatlar

1. **Free instance limitations:**
   - 15 daqiqa ishlatilmasa, uxlaydi
   - Birinchi request sekin bo'lishi mumkin (cold start)
   - 750 soat/oy bepul

2. **Performance:**
   - Static files CDN orqali serve qilinadi
   - Gzip compression avtomatik
   - SSL bepul

3. **Monitoring:**
   - Render dashboard da logs va metrics
   - Health check: `/api/health`

---

## 🚀 Keyingi qadamlar

1. **Custom domain qo'shish** (ixtiyoriy)
2. **Admin parolni o'zgartirish**
3. **Monitoring sozlash**

Omad tilayman! 🎉
