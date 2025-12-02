const router = require('express').Router();
const Vault = require('../models/Vault');
const verify = require('./verifyToken'); // استدعاء البواب

// 1. رابط إضافة باسوورد جديد (محمي بـ verify)
router.post('/add', verify, async (req, res) => {
    
    // إنشاء عنصر جديد في الخزنة
    const newEntry = new Vault({
        userId: req.user._id, // نأخذ الآيدي من التوكن مباشرة
        siteName: req.body.siteName,
        siteUrl: req.body.siteUrl,
        encryptedData: req.body.encryptedData, // البيانات المشفرة القادمة من الفرونت
        iv: req.body.iv
    });

    try {
        const savedEntry = await newEntry.save();
        res.send({ id: savedEntry._id, message: "Password Saved Securely!" });
    } catch (err) {
        res.status(400).send(err);
    }
});

// 2. رابط جلب كل الباسووردات الخاصة بالمستخدم فقط
router.get('/all', verify, async (req, res) => {
    // ابحث في الخزنة عن العناصر التي يملكها هذا المستخدم فقط
    const vaults = await Vault.find({ userId: req.user._id });
    res.json(vaults);
});

module.exports = router;