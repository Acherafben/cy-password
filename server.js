const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');

// استدعاء ملف الحماية الخاص بك
const applySecurity = require('./utils/securityConfig');

// استدعاء ملف الروابط
const authRoute = require('./routes/auth');

dotenv.config(); // تفعيل ملف .env

// إنشاء التطبيق
const app = express();

// الاتصال بقاعدة البيانات
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('Connected to DB!'))
    .catch(err => console.log(err));

// --- Middlewares ---
app.use(express.json()); // لفهم ملفات JSON
app.use(cors()); // للسماح للفرونت إند بالاتصال

// تركيب نظام الحماية الخاص بك (Rate Limit & Helmet)
applySecurity(app);

// --- Routes Middlewares ---
app.use('/api/user', authRoute);

// تشغيل السيرفر
app.listen(process.env.PORT || 5000, () => console.log('Server Up and Running!'));