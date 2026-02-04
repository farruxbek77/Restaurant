# Tez Deploy qilish (5 daqiqa)

## Render.com orqali (Eng oson usul)

### 1. GitHub ga yuklash

```bash
git add .
git commit -m "Ready for deployment"
git push origin main
```

### 2. Render.com ga kirish

1. https://render.com ga kiring
2. GitHub bilan login qiling
3. Repository ga ruxsat bering

### 3. Backend yaratish

1. **New +** → **Web Service**
2. Repository ni tanlang
3. Sozlamalar:
   - **Name**: `restaurant-backend`
   - **Build Command**: `npm install`
   - **Start Command**: `node server/index.js`
   - **Instance Type**: Free

4. **Environment Variables** qo'shing:
   ```
   MONGODB_URI=mongodb+srv://Farruxbek:8Fp0doAjtsahQqEJ@cluster0.xzesbhq.mongodb.net/?appName=Cluster0
   JWT_SECRET=super_secret_key_12345_change_this
   PORT=5000
   NODE_ENV=production
   ```

5. **Create Web Service** bosing
6. Deploy tugaguncha kuting (5-10 daqiqa)
7. URL ni nusxalang (masalan: `https://restaurant-backend.onrender.com`)

### 4. Frontend yaratish

1. **New +** → **Static Site**
2. Xuddi shu repository ni tanlang
3. Sozlamalar:
   - **Name**: `restaurant-frontend`
   - **Build Command**: `cd client && npm install && npm run build`
   - **Publish Directory**: `client/dist`

4. **Environment Variables** qo'shing:
   ```
   VITE_API_URL=https://restaurant-backend.onrender.com
   ```
   (Yuqorida nusxalangan backend URL ni qo'ying)

5. **Create Static Site** bosing
6. Deploy tugaguncha kuting (3-5 daqiqa)

### 5. Backend CORS ni yangilash

1. Backend service ga o'ting
2. **Shell** tugmasini bosing
3. Quyidagi buyruqni bajaring:

```bash
# server/index.js faylini yangilash kerak
# Frontend URL ni CORS ga qo'shish kerak
```

Yoki GitHub da `server/index.js` faylini yangilang:

```javascript
app.use(cors({
    origin: [
        'https://restaurant-frontend.onrender.com', // Frontend URL
        'http://localhost:5173'
    ],
    credentials: true
}));
```

Keyin commit va push qiling:
```bash
git add server/index.js
git commit -m "Update CORS for production"
git push
```

### 6. Database seed qilish

1. Backend service da **Shell** ni oching
2. Buyruqni bajaring:
```bash
npm run seed
```

### 7. Tayyor! 🎉

Frontend URL ni oching va saytingiz ishlayotganini ko'ring!

**Admin login:**
- Username: `admin`
- Password: `admin123`

---

## Muammolar?

### Backend ishlamayapti
- Logs ni tekshiring: Backend service → **Logs** tab
- MongoDB URI to'g'riligini tekshiring

### Frontend backend ga ulanmayapti
- Browser console ni oching (F12)
- Network tab da API requests ni tekshiring
- CORS xatosi bo'lsa, backend CORS sozlamalarini tekshiring

### Database bo'sh
- Backend Shell da `npm run seed` bajaring

---

## Keyingi qadamlar

1. **Custom domain qo'shish** (ixtiyoriy)
2. **SSL avtomatik ishlaydi** ✅
3. **Monitoring** - Render dashboard da

Omad! 🚀
