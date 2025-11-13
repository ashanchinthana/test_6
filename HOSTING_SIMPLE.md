# Simple Hosting Guide - 3 Steps

## 🚀 Quick Deploy (5 minutes)

### Step 1: MongoDB Atlas (2 min)
1. Go to https://www.mongodb.com/cloud/atlas
2. Sign up FREE
3. Create cluster (FREE tier)
4. Click "Connect" → "Connect your application"
5. Copy connection string
6. Replace `<password>` with your password
7. Add database name: `ticketingDB`
8. Network Access → Add IP → `0.0.0.0/0` (Allow all)

**Your connection string:**
```
mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/ticketingDB
```

---

### Step 2: Deploy to Render (2 min)
1. Go to https://render.com
2. Sign up with GitHub
3. Click "New +" → "Web Service"
4. Connect repo: `ashanchinthana/test_6`
5. Settings:
   - **Build:** `npm install`
   - **Start:** `npm start`
6. Environment Variables:
   - `MONGO_URI` = Your MongoDB connection string
7. Click "Create Web Service"
8. Wait 5 minutes

---

### Step 3: Share Links (1 min)
✅ **User Link:** `https://your-app.onrender.com/`  
🔒 **Admin:** `https://your-app.onrender.com/admin.html` (keep private!)

---

## That's It! 🎉

Your site is live and friends can submit tickets!

---

## Need Help?

- **MongoDB Issues:** Check Network Access is `0.0.0.0/0`
- **Deploy Fails:** Check logs in Render dashboard
- **Connection Error:** Verify MONGO_URI is correct

---

## Optional: Make WhatsApp Clickable

In admin pages, WhatsApp numbers are shown. You can click them to open WhatsApp Web!

