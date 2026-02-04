# Deployment Checklist ✅

Deploy qilishdan oldin tekshiring:

## Pre-deployment

- [ ] Barcha o'zgarishlar commit qilingan
- [ ] `.env` fayli `.gitignore` da
- [ ] MongoDB URI to'g'ri ishlayapti
- [ ] Local da test qilingan (`npm run dev`)
- [ ] Build xatosiz o'tayapti (`cd client && npm run build`)
- [ ] Admin login ishlayapti
- [ ] Barcha API endpoints ishlayapti

## GitHub

- [ ] Repository yaratilgan
- [ ] Code push qilingan
- [ ] `.env` fayli push qilinmagan (tekshiring!)

```bash
git add .
git commit -m "Ready for deployment"
git push origin main
```

## Render.com Backend

- [ ] Web Service yaratilgan
- [ ] Build command: `npm install`
- [ ] Start command: `node server/index.js`
- [ ] Environment variables qo'shilgan:
  - [ ] `MONGODB_URI`
  - [ ] `JWT_SECRET`
  - [ ] `PORT=5000`
  - [ ] `NODE_ENV=production`
- [ ] Deploy muvaffaqiyatli tugagan
- [ ] Health check ishlayapti (`/api/health`)
- [ ] Backend URL nusxalangan

## Render.com Frontend

- [ ] Static Site yaratilgan
- [ ] Build command: `cd client && npm install && npm run build`
- [ ] Publish directory: `client/dist`
- [ ] Environment variables qo'shilgan:
  - [ ] `VITE_API_URL` (backend URL)
- [ ] Deploy muvaffaqiyatli tugagan
- [ ] Frontend ochilayapti

## Post-deployment

- [ ] Frontend backend ga ulanayapti
- [ ] CORS sozlamalari to'g'ri
- [ ] Database seed qilingan (`npm run seed`)
- [ ] Admin login ishlayapti
- [ ] Menu ko'rinayapti
- [ ] Buyurtma berish ishlayapti
- [ ] Stol bron qilish ishlayapti
- [ ] Admin panel to'liq ishlayapti

## Testing

- [ ] Bosh sahifa ochilayapti
- [ ] Menu sahifasi ishlayapti
- [ ] Buyurtma berish ishlayapti
- [ ] Stol bron qilish ishlayapti
- [ ] Admin login ishlayapti
- [ ] Admin dashboard ochilayapti
- [ ] Menu CRUD ishlayapti
- [ ] Buyurtmalar ko'rinayapti
- [ ] Bronlar ko'rinayapti

## Security

- [ ] JWT_SECRET kuchli va unique
- [ ] MongoDB parol kuchli
- [ ] `.env` fayli GitHub da yo'q
- [ ] CORS faqat kerakli domainlarga ruxsat beradi
- [ ] Admin parol o'zgartirilgan (default `admin123` dan)

## Optional

- [ ] Custom domain qo'shilgan
- [ ] SSL ishlayapti (avtomatik)
- [ ] Monitoring sozlangan
- [ ] Backup strategiyasi mavjud

## URLs

Backend URL: `_______________________________`

Frontend URL: `_______________________________`

Admin Panel: `_______________________________/admin`

Admin Login:
- Username: `admin`
- Password: `_______________` (o'zgartiring!)

---

## Muammolar bo'lsa

1. **Logs tekshiring**: Render dashboard → Logs
2. **Browser console**: F12 → Console
3. **Network tab**: F12 → Network
4. **MongoDB Atlas**: IP whitelist (0.0.0.0/0)

## Yordam

- [QUICK_DEPLOY.md](QUICK_DEPLOY.md) - Tez yo'riqnoma
- [DEPLOYMENT.md](DEPLOYMENT.md) - To'liq yo'riqnoma
- Render docs: https://render.com/docs

---

Omad tilayman! 🚀
