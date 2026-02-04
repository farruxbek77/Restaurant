const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const dotenv = require('dotenv');
const User = require('./models/User');
const MenuItem = require('./models/MenuItem');

dotenv.config();

const seedData = async () => {
    try {
        const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/restaurant';
        await mongoose.connect(MONGODB_URI);
        console.log('✅ MongoDB connected');

        // Admin user yaratish
        const existingAdmin = await User.findOne({ username: 'admin' });
        if (!existingAdmin) {
            const hashedPassword = await bcrypt.hash('admin123', 10);
            await User.create({
                username: 'admin',
                password: hashedPassword,
                role: 'admin'
            });
            console.log('✅ Admin user created: username=admin, password=admin123');
        } else {
            console.log('ℹ️  Admin user already exists');
        }

        // Menu items yaratish (agar bo'sh bo'lsa)
        const menuCount = await MenuItem.countDocuments();
        if (menuCount === 0) {
            const menuItems = [
                // Birinchi taomlar
                {
                    name: "Lagman",
                    nameUz: "Lag'mon",
                    description: "Noodle soup with vegetables and meat",
                    descriptionUz: "Sabzavot va go'shtli lag'mon",
                    price: 20000,
                    category: "Birinchi taomlar",
                    image: "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=400",
                    available: true
                },
                {
                    name: "Shurpa",
                    nameUz: "Sho'rva",
                    description: "Traditional meat soup with vegetables",
                    descriptionUz: "An'anaviy go'shtli sho'rva",
                    price: 15000,
                    category: "Birinchi taomlar",
                    image: "https://images.unsplash.com/photo-1588566565463-180a5b2090d2?w=400",
                    available: true
                },
                {
                    name: "Mastava",
                    nameUz: "Mastava",
                    description: "Rice soup with vegetables and meat",
                    descriptionUz: "Guruch va go'shtli sho'rva",
                    price: 12000,
                    category: "Birinchi taomlar",
                    image: "https://images.unsplash.com/photo-1547592166-23ac45744acd?w=400",
                    available: true
                },
                {
                    name: "Naryn",
                    nameUz: "Norin",
                    description: "Cold noodle dish with horse meat",
                    descriptionUz: "Sovuq lag'mon, qazi bilan",
                    price: 22000,
                    category: "Birinchi taomlar",
                    image: "https://images.unsplash.com/photo-1582878826629-29b7ad1cdc43?w=400",
                    available: true
                },

                // Ikkinchi taomlar
                {
                    name: "Plov",
                    nameUz: "Osh",
                    description: "Traditional Uzbek rice dish with meat and carrots",
                    descriptionUz: "An'anaviy o'zbek oshi go'sht va sabzi bilan",
                    price: 25000,
                    category: "Ikkinchi taomlar",
                    image: "https://images.unsplash.com/photo-1596040033229-a0b3b7e8e8e8?w=400",
                    available: true
                },
                {
                    name: "Shashlik",
                    nameUz: "Shashlik",
                    description: "Grilled meat skewers",
                    descriptionUz: "Qovurilgan go'sht",
                    price: 100000,
                    category: "Ikkinchi taomlar",
                    image: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=400",
                    available: true
                },
                {
                    name: "Manti",
                    nameUz: "Manti",
                    description: "Steamed dumplings with meat",
                    descriptionUz: "Bug'da pishirilgan go'shtli manti",
                    price: 18000,
                    category: "Ikkinchi taomlar",
                    image: "https://images.unsplash.com/photo-1496116218417-1a781b1c416c?w=400",
                    available: true
                },
                {
                    name: "Dimlama",
                    nameUz: "Dimlama",
                    description: "Stewed meat with vegetables",
                    descriptionUz: "Go'sht va sabzavotli qovurma",
                    price: 23000,
                    category: "Ikkinchi taomlar",
                    image: "https://images.unsplash.com/photo-1574484284002-952d92456975?w=400",
                    available: true
                },
                {
                    name: "Kebab",
                    nameUz: "Kabob",
                    description: "Grilled meat kebab",
                    descriptionUz: "Qovurilgan go'shtli kabob",
                    price: 20000,
                    category: "Ikkinchi taomlar",
                    image: "https://images.unsplash.com/photo-1603360946369-dc9bb6258143?w=400",
                    available: true
                },
                {
                    name: "Jiz",
                    nameUz: "Jiz",
                    description: "Fried meat with onions",
                    descriptionUz: "Piyoz bilan qovurilgan go'sht",
                    price: 19000,
                    category: "Ikkinchi taomlar",
                    image: "https://images.unsplash.com/photo-1529042410759-befb1204b468?w=400",
                    available: true
                },
                {
                    name: "Hasip",
                    nameUz: "Hasip",
                    description: "Traditional sausage with rice and meat",
                    descriptionUz: "Guruch va go'shtli an'anaviy kolbasa",
                    price: 17000,
                    category: "Ikkinchi taomlar",
                    image: "https://images.unsplash.com/photo-1607623814075-e51df1bdc82f?w=400",
                    available: true
                },

                // Salatlar
                {
                    name: "Achichuk Salad",
                    nameUz: "Achichuk salat",
                    description: "Fresh tomato and onion salad",
                    descriptionUz: "Pomidor va piyoz salati",
                    price: 8000,
                    category: "Salatlar",
                    image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400",
                    available: true
                },
                {
                    name: "Olivye",
                    nameUz: "Olivye",
                    description: "Russian potato salad",
                    descriptionUz: "Rus kartoshka salati",
                    price: 10000,
                    category: "Salatlar",
                    image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400",
                    available: true
                },
                {
                    name: "Caesar Salad",
                    nameUz: "Sezar salat",
                    description: "Classic Caesar salad with chicken",
                    descriptionUz: "Tovuqli klassik Sezar salati",
                    price: 15000,
                    category: "Salatlar",
                    image: "https://images.unsplash.com/photo-1550304943-4f24f54ddde9?w=400",
                    available: true
                },
                {
                    name: "Greek Salad",
                    nameUz: "Grek salati",
                    description: "Fresh Greek salad with feta cheese",
                    descriptionUz: "Feta pishloqli yangi Grek salati",
                    price: 14000,
                    category: "Salatlar",
                    image: "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=400",
                    available: true
                },
                {
                    name: "Tashkent Salad",
                    nameUz: "Toshkent salati",
                    description: "Traditional Tashkent salad with beef",
                    descriptionUz: "Mol go'shti bilan an'anaviy Toshkent salati",
                    price: 16000,
                    category: "Salatlar",
                    image: "https://images.unsplash.com/photo-1505253716362-afaea1d3d1af?w=400",
                    available: true
                },

                // Ichimliklar
                {
                    name: "Green Tea",
                    nameUz: "Ko'k choy",
                    description: "Traditional green tea",
                    descriptionUz: "An'anaviy ko'k choy",
                    price: 3000,
                    category: "Ichimliklar",
                    image: "https://images.unsplash.com/photo-1564890369478-c89ca6d9cde9?w=400",
                    available: true
                },
                {
                    name: "Black Tea",
                    nameUz: "Qora choy",
                    description: "Traditional black tea",
                    descriptionUz: "An'anaviy qora choy",
                    price: 3000,
                    category: "Ichimliklar",
                    image: "https://images.unsplash.com/photo-1576092768241-dec231879fc3?w=400",
                    available: true
                },
                {
                    name: "Kompot",
                    nameUz: "Kompot",
                    description: "Fruit drink",
                    descriptionUz: "Mevali ichimlik",
                    price: 5000,
                    category: "Ichimliklar",
                    image: "https://images.unsplash.com/photo-1546173159-315724a31696?w=400",
                    available: true
                },
                {
                    name: "Fresh Juice",
                    nameUz: "Fresh sharbat",
                    description: "Fresh fruit juice",
                    descriptionUz: "Yangi meva sharbati",
                    price: 8000,
                    category: "Ichimliklar",
                    image: "https://images.unsplash.com/photo-1600271886742-f049cd451bba?w=400",
                    available: true
                },
                {
                    name: "Ayran",
                    nameUz: "Ayron",
                    description: "Traditional yogurt drink",
                    descriptionUz: "An'anaviy yogurt ichimlik",
                    price: 4000,
                    category: "Ichimliklar",
                    image: "https://images.unsplash.com/photo-1623065422902-30a2d299bbe4?w=400",
                    available: true
                },
                {
                    name: "Mineral Water",
                    nameUz: "Mineral suv",
                    description: "Sparkling or still mineral water",
                    descriptionUz: "Gazli yoki gazsiz mineral suv",
                    price: 2000,
                    category: "Ichimliklar",
                    image: "https://images.unsplash.com/photo-1548839140-29a749e1cf4d?w=400",
                    available: true
                },

                // Shirinliklar
                {
                    name: "Somsa",
                    nameUz: "Somsa",
                    description: "Baked pastry with meat",
                    descriptionUz: "Go'shtli somsa",
                    price: 5000,
                    category: "Shirinliklar",
                    image: "https://images.unsplash.com/photo-1601050690597-df0568f70950?w=400",
                    available: true
                },
                {
                    name: "Chak-chak",
                    nameUz: "Chak-chak",
                    description: "Honey dessert",
                    descriptionUz: "Asalli shirinlik",
                    price: 7000,
                    category: "Shirinliklar",
                    image: "https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=400",
                    available: true
                },
                {
                    name: "Halva",
                    nameUz: "Halva",
                    description: "Sweet tahini dessert",
                    descriptionUz: "Shirin halva",
                    price: 6000,
                    category: "Shirinliklar",
                    image: "https://images.unsplash.com/photo-1571115177098-24ec42ed204d?w=400",
                    available: true
                },
                {
                    name: "Non",
                    nameUz: "Non",
                    description: "Traditional Uzbek bread",
                    descriptionUz: "An'anaviy o'zbek noni",
                    price: 2000,
                    category: "Shirinliklar",
                    image: "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=400",
                    available: true
                },
                {
                    name: "Baklava",
                    nameUz: "Pahlava",
                    description: "Sweet pastry with nuts and honey",
                    descriptionUz: "Yong'oq va asalli shirin pirog",
                    price: 9000,
                    category: "Shirinliklar",
                    image: "https://images.unsplash.com/photo-1519676867240-f03562e64548?w=400",
                    available: true
                },
                {
                    name: "Navat",
                    nameUz: "Navvot",
                    description: "Rock sugar candy",
                    descriptionUz: "Qand shirinlik",
                    price: 4000,
                    category: "Shirinliklar",
                    image: "https://images.unsplash.com/photo-1582058091505-f87a2e55a40f?w=400",
                    available: true
                },
                {
                    name: "Nisholda",
                    nameUz: "Nisholda",
                    description: "Whipped egg white dessert",
                    descriptionUz: "Tuxum oqi shirinligi",
                    price: 8000,
                    category: "Shirinliklar",
                    image: "https://images.unsplash.com/photo-1488477181946-6428a0291777?w=400",
                    available: true
                }
            ];

            await MenuItem.insertMany(menuItems);
            console.log(`✅ ${menuItems.length} menu items created`);
        } else {
            console.log('ℹ️  Menu items already exist');
        }

        console.log('\n🎉 Seed completed successfully!');
        process.exit(0);
    } catch (error) {
        console.error('❌ Seed error:', error);
        process.exit(1);
    }
};

seedData();
