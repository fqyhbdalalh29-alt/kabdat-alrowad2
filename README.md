# منيو كبدة الرواد 2 | Al Rowad 2 Liver Menu

موقع منيو ثنائي اللغة (عربي / English) بدون أي مكتبات خارجية: بحث، أقسام، سلة طلب ترسل الطلب عبر واتساب، ويثبت على الجوال كتطبيق.
A bilingual, dependency-free restaurant menu with search, categories, a WhatsApp order cart, and installable PWA support.

## النشر على GitHub Pages | Deploy on GitHub Pages
1. أنشئ مستودع جديد على GitHub وارفع كل ملفات هذا المجلد. / Create a repo and upload everything in this folder.
2. من **Settings > Pages** اختر **Deploy from a branch** ثم الفرع `main` والمجلد `/ (root)`. / In **Settings > Pages** choose branch `main`, folder `/ (root)`.
3. بعد دقيقة يظهر الرابط: `https://USERNAME.github.io/REPO/`. / Your site goes live at that URL.

## التعديل | Editing
- **الأصناف والأسعار | Items and prices:** `js/menu-data.js`
- **الرقم والموقع والأكثر طلباً | Phone, map link, popular items:** `js/config.js`
- **الألوان والتصميم | Colors and styling:** `css/style.css` (المتغيرات في أول الملف / variables at the top)
- **الشعار | Logo:** استبدل `assets/logo.png` (خلفية شفافة) و`assets/icon-192.png` و`assets/icon-512.png`.

## تجربة محلية | Run locally
افتح `index.html` مباشرة، أو شغل خادم بسيط: `python3 -m http.server` ثم افتح `http://localhost:8000`.

## ملاحظات | Notes
- الخطوط تحمل من Google Fonts، فتحتاج اتصالاً بالإنترنت أول مرة.
- لتظهر صورة المعاينة عند مشاركة الرابط في واتساب، غيّر `og:image` في `index.html` إلى الرابط الكامل للصورة بعد النشر.
- Prices are in Saudi riyals (SAR). صناعة سعودية بكل فخر.
