# Restaurant Website - Deployment Guide

## Deploy qilish yo'riqnomasi

### 1-usul: Render.com (Tavsiya etiladi - Bepul)

#### A. Backend Deploy qilish

1. **Render.com ga kiring**: https://render.com
2. **New +** tugmasini bosing va **Web Service** tanlang
3. GitHub repository ni ulang
4. Quyidagi sozlamalarni kiriting:
   - **Name**: restaurant-backend
   - **Environment**: Node
   - **Build Command**: `npm install`
   - **Start Command**: `node server/index.js`
   - **Instance Type**: Free

5. **Environment Variables** qo'shing:
   ```
   MONGODB_URI=mongodb+srv://Farruxbek:8Fp0doAjtsahQqEJ@cluster0.xzesbhq.mongodb.net/?appName=Cluster0
   JWT_SECRET=your_super_secret_jwt_key_here_change_this
   PORT=5000
   NODE_ENV=production
   ```

6. **Create Web Service** tugmasini bosing

#### B. Frontend Deploy qilish

1. **New +** tugmasini bosing va **Static Site** tanlang
2. Xuddi shu repository ni tanlang
3. Quyidagi sozlamalarni kiriting:
   - **Name**: restaurant-frontend
   - **Build Command**: `cd client && npm install && npm run build`
   - **Publish Directory**: `client/dist`

4. **Environment Variables** qo'shing:
   ```
   VITE_API_URL=https://restaurant-backend.onrender.com
   ```

5. **Create Static Site** tugmasini bosing

#### C. Frontend ni Backend ga ulash

1. `client/vite.config.js` faylini yangilang:
```javascript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: process.env.VITE_API_URL || 'http://localhost:5000',
        changeOrigin: true
      }
    }
  }
})
```

2. Backend `server/index.js` da CORS sozlamalarini yangilang:
```javascript
app.use(cors({
  origin: ['https://restaurant-frontend.onrender.com', 'http://localhost:5173'],
  credentials: true
}));
```

---

### 2-usul: Vercel (Frontend) + Render (Backend)

#### A. Backend - Render.com

Yuqoridagi 1-usuldagi Backend qismini bajaring.

#### B. Frontend - Vercel

1. **Vercel.com ga kiring**: https://vercel.com
2. **New Project** tugmasini bosing
3. GitHub repository ni import qiling
4. Quyidagi sozlamalarni kiriting:
   - **Framework Preset**: Vite
   - **Root Directory**: `client`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`

5. **Environment Variables** qo'shing:
   ```
   VITE_API_URL=https://restaurant-backend.onrender.com
   ```

6. **Deploy** tugmasini bosing

---

### 3-usul: Railway.app (Oson va tez)

1. **Railway.app ga kiring**: https://railway.app
2. **New Project** tugmasini bosing
3. **Deploy from GitHub repo** tanlang
4. Repository ni tanlang
5. Avtomatik deploy boshlanadi
6. **Variables** bo'limida environment variables qo'shing:
   ```
   MONGODB_URI=mongodb+srv://...
   JWT_SECRET=your_secret_key
   PORT=5000
   ```

---

## Deploy qilishdan oldin tekshirish

1. **Build test qiling**:
```bash
cd client
npm run build
```

2. **Production rejimida test qiling**:
```bash
npm run start
```

3. **Environment variables tekshiring**:
   - `.env` faylida barcha kerakli o'zgaruvchilar borligini tekshiring
   - Production uchun yangi JWT_SECRET yarating

---

## Deploy qilgandan keyin

1. **Database seed qiling** (birinchi marta):
   - Render dashboard dan "Shell" ni oching
   - `npm run seed` buyrug'ini bajaring

2. **Admin login qiling**:
   - Username: `admin`
   - Password: `admin123`

3. **CORS sozlamalarini tekshiring**:
   - Frontend URL ni backend CORS ga qo'shing

---

## Muammolarni hal qilish

### Backend ishlamayapti
- Render logs ni tekshiring
- MongoDB URI to'g'riligini tekshiring
- Environment variables to'liqligini tekshiring

### Frontend backend ga ulanmayapti
- VITE_API_URL to'g'riligini tekshiring
- Backend CORS sozlamalarini tekshiring
- Network tab da API requests ni tekshiring

### Database bo'sh
- `npm run seed` buyrug'ini bajaring
- MongoDB Atlas da IP whitelist ni tekshiring (0.0.0.0/0 qo'shing)

---

## Qo'shimcha maslahatlar

1. **Custom domain qo'shish**:
   - Render/Vercel da "Custom Domain" bo'limiga o'ting
   - Domain providerda CNAME record qo'shing

2. **SSL sertifikat**:
   - Render va Vercel avtomatik SSL beradi
   - Hech narsa qilish shart emas

3. **Monitoring**:
   - Render dashboard da logs va metrics mavjud
   - Uptime monitoring uchun UptimeRobot.com ishlatishingiz mumkin

---

## Xavfsizlik

1. **JWT_SECRET ni o'zgartiring**:
   - Production uchun kuchli secret key yarating
   - Hech qachon GitHub ga commit qilmang

2. **MongoDB parolini himoyalang**:
   - Kuchli parol ishlating
   - IP whitelist sozlang

3. **Environment variables**:
   - Barcha sensitive ma'lumotlarni .env da saqlang
   - .gitignore da .env borligini tekshiring

---

## Yordam

Agar muammo bo'lsa:
1. Render/Vercel logs ni tekshiring
2. Browser console ni tekshiring
3. Network tab da API requests ni tekshiring

Omad tilayman! 🚀
