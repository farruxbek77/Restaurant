const express = require('express');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 5000;
const JWT_SECRET = 'my_secret_key_12345';
const DB_FILE = path.join(__dirname, 'db.json');

// Middleware
app.use(cors());
app.use(express.json());

// Read database
const readDB = () => {
    try {
        const data = fs.readFileSync(DB_FILE, 'utf8');
        return JSON.parse(data);
    } catch (error) {
        return { users: [], menuItems: [], reservations: [], orders: [] };
    }
};

// Write database
const writeDB = (data) => {
    fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2));
};

// Auth middleware
const auth = (req, res, next) => {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    if (!token) {
        return res.status(401).json({ message: 'No token' });
    }
    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        req.user = decoded;
        next();
    } catch (err) {
        res.status(401).json({ message: 'Invalid token' });
    }
};

// Admin middleware
const adminAuth = (req, res, next) => {
    if (req.user.role !== 'admin') {
        return res.status(403).json({ message: 'Admin only' });
    }
    next();
};

// Health check
app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', message: 'Server is running' });
});

// AUTH ROUTES
app.post('/api/auth/register', async (req, res) => {
    try {
        const { username, password } = req.body;
        const db = readDB();

        if (db.users.find(u => u.username === username)) {
            return res.status(400).json({ message: 'User exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = {
            id: Date.now().toString(),
            username,
            password: hashedPassword,
            role: 'admin'
        };

        db.users.push(newUser);
        writeDB(db);

        res.status(201).json({ message: 'User created' });
    } catch (error) {
        res.status(500).json({ message: 'Error', error: error.message });
    }
});

app.post('/api/auth/login', async (req, res) => {
    try {
        const { username, password } = req.body;
        const db = readDB();

        const user = db.users.find(u => u.username === username);
        if (!user) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        const token = jwt.sign({ userId: user.id, role: user.role }, JWT_SECRET, { expiresIn: '24h' });
        res.json({ token, role: user.role, username: user.username });
    } catch (error) {
        res.status(500).json({ message: 'Error', error: error.message });
    }
});

// MENU ROUTES
app.get('/api/menu', (req, res) => {
    const db = readDB();
    res.json(db.menuItems);
});

app.get('/api/menu/:id', (req, res) => {
    const db = readDB();
    const item = db.menuItems.find(i => i.id === req.params.id);
    if (!item) return res.status(404).json({ message: 'Not found' });
    res.json(item);
});

app.post('/api/menu', auth, adminAuth, (req, res) => {
    const db = readDB();
    const newItem = { id: Date.now().toString(), ...req.body };
    db.menuItems.push(newItem);
    writeDB(db);
    res.status(201).json(newItem);
});

app.put('/api/menu/:id', auth, adminAuth, (req, res) => {
    const db = readDB();
    const index = db.menuItems.findIndex(i => i.id === req.params.id);
    if (index === -1) return res.status(404).json({ message: 'Not found' });

    db.menuItems[index] = { ...db.menuItems[index], ...req.body };
    writeDB(db);
    res.json(db.menuItems[index]);
});

app.delete('/api/menu/:id', auth, adminAuth, (req, res) => {
    const db = readDB();
    db.menuItems = db.menuItems.filter(i => i.id !== req.params.id);
    writeDB(db);
    res.json({ message: 'Deleted' });
});

// RESERVATION ROUTES
app.post('/api/reservations', (req, res) => {
    const db = readDB();
    const newReservation = {
        id: Date.now().toString(),
        ...req.body,
        status: 'pending',
        createdAt: new Date().toISOString()
    };
    db.reservations.push(newReservation);
    writeDB(db);
    res.status(201).json(newReservation);
});

app.get('/api/reservations', auth, adminAuth, (req, res) => {
    const db = readDB();
    res.json(db.reservations);
});

app.put('/api/reservations/:id', auth, adminAuth, (req, res) => {
    const db = readDB();
    const index = db.reservations.findIndex(r => r.id === req.params.id);
    if (index === -1) return res.status(404).json({ message: 'Not found' });

    db.reservations[index] = { ...db.reservations[index], ...req.body };
    writeDB(db);
    res.json(db.reservations[index]);
});

// ORDER ROUTES
app.post('/api/orders', (req, res) => {
    const db = readDB();
    const newOrder = {
        id: Date.now().toString(),
        ...req.body,
        status: 'pending',
        createdAt: new Date().toISOString()
    };
    db.orders.push(newOrder);
    writeDB(db);
    res.status(201).json(newOrder);
});

app.get('/api/orders', auth, adminAuth, (req, res) => {
    const db = readDB();
    res.json(db.orders);
});

app.put('/api/orders/:id', auth, adminAuth, (req, res) => {
    const db = readDB();
    const index = db.orders.findIndex(o => o.id === req.params.id);
    if (index === -1) return res.status(404).json({ message: 'Not found' });

    db.orders[index] = { ...db.orders[index], ...req.body };
    writeDB(db);
    res.json(db.orders[index]);
});

app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
    console.log(`📡 API: http://localhost:${PORT}/api`);
    console.log(`✅ No MongoDB needed - using JSON file`);
    console.log(`\n👤 Default admin: username="admin", password="admin123"`);
});
