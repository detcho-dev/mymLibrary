// firebase-config.js - متوافق مع Firebase v9 compat (للعمل مع login.html)

// إعلان المتغيرات عالمية لكي يمكن الوصول إليها في login.html
let firebaseConfig;
let app;
let auth;
let db;

// نحن نستخدم import للحصول على الوظائف، لكننا سنقوم بتهيئة التطبيق وإصدار المتغيرات عالمياً
// نستخدم CDN للنسخة القديمة (compat) التي تتوافق مع login.html
// هذا الملف سيُستخدم في login.html الذي يستدعي firebase-app-compat.js

// نحن نحتاج فقط لإصدار firebaseConfig وapp وauth وdb
// نستخدم window لجعلها متاحة عالمياً

// تهيئة Firebase باستخدام النمط القديم ( compat ) — هذا ما يتوقعه login.html
// لكننا سنقوم بإعدادها هنا لتجنب مشكلة الاستيراد

// هذا الكود سيعمل فقط إذا كان login.html قد حمل مكتبات compat أولاً
// لذلك نضعه داخل دالة ونستدعى بعد تحميل المكتبات

function initFirebase() {
    // تحقق من وجود.firebase
    if (typeof firebase === 'undefined') {
        console.error("Firebase SDK not loaded. Make sure to load firebase-app-compat.js and firebase-auth-compat.js first.");
        return;
    }

    // إعداد بيانات التهيئة
    firebaseConfig = {
        apiKey: "AIzaSyB1OVx-YSmPFeq3lp-gAGe576yG1RhMLYs",
        authDomain: "mymlibraryreads.firebaseapp.com",
        projectId: "mymlibraryreads",
        storageBucket: "mymlibraryreads.firebasestorage.app",
        messagingSenderId: "11947740896",
        appId: "1:11947740896:web:87482eb72210acdba50a85"
    };

    // تهيئة التطبيق
    app = firebase.initializeApp(firebaseConfig);

    // الحصول على المصادقة (Auth)
    auth = firebase.auth();

    // الحصول على Firestore (إذا كنت تحتاجه لاحقاً)
    // لكنك ذكرت أنك تستخدم Realtime DB، لذا سنستخدم database بدلاً من firestore
    // إذا كنت تستخدم Realtime Database، فاستخدم getDatabase بدلاً من getFirestore
    const { getDatabase } = require("https://www.gstatic.com/firebasejs/9.23.0/firebase-database-compat.js"); // ❗️ ملاحظة مهمة أدناه
    db = getDatabase(app); // هذا يعطيك Realtime Database

    // إصدار المتغيرات عالمياً
    window.firebaseConfig = firebaseConfig;
    window.app = app;
    window.auth = auth;
    window.db = db;

    console.log("Firebase initialized successfully with config, auth, and database.");
}

// نستدعي الدالة عند تحميل الملف
initFirebase();
