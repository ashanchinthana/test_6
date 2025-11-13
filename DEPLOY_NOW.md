# Deploy Now - Quick Steps

## Your MongoDB Connection String (Ready to Use)

```
mongodb+srv://ashanchinthana3_db_user:k4r1ODcx8Kk8Pw35@ticketbooking.2g8fiat.mongodb.net/ticketingDB?retryWrites=true&w=majority
```

**✅ This is your MONGO_URI for Render deployment**

---

## Step-by-Step: Deploy to Render

### Step 1: Go to Render
1. Open: **https://render.com**
2. Click **"Get Started for Free"**
3. Sign up with **GitHub** (use your GitHub account)

### Step 2: Create Web Service
1. Click **"New +"** (top right)
2. Select **"Web Service"**
3. If asked, connect your GitHub account
4. Find repository: **`ashanchinthana/test_6`**
5. Click **"Connect"**

### Step 3: Configure Settings
Fill these exactly:

- **Name:** `ticket-booking-system`
- **Environment:** `Node`
- **Region:** Choose closest to you
- **Branch:** `main`
- **Root Directory:** `ticket-system-backend` ⚠️ **CRITICAL!**
- **Build Command:** `npm install`
- **Start Command:** `npm start`
- **Plan:** **Free**

### Step 4: Add Environment Variables
Click **"Add Environment Variable"** and add:

**Variable 1:**
- **Key:** `MONGO_URI`
- **Value:** 
  ```
  mongodb+srv://ashanchinthana3_db_user:k4r1ODcx8Kk8Pw35@ticketbooking.2g8fiat.mongodb.net/ticketingDB?retryWrites=true&w=majority
  ```

**Variable 2:**
- **Key:** `NODE_ENV`
- **Value:** `production`

### Step 5: Deploy
1. Scroll down
2. Click **"Create Web Service"**
3. ⏳ Wait 5-10 minutes
4. Watch the build logs

### Step 6: Get Your Live URL
Once deployed, you'll see:
**"Your service is live at https://your-app-name.onrender.com"**

---

## ✅ After Deployment

### Test Your Site:
1. **User Page:** `https://your-app-name.onrender.com/`
2. **Admin Page:** `https://your-app-name.onrender.com/admin.html`

### Share with Friends:
- **Public Link:** `https://your-app-name.onrender.com/`
- **Admin Link (Keep Private):** `https://your-app-name.onrender.com/admin.html`

---

## ⚠️ Important Reminders

1. **Root Directory:** Must be `ticket-system-backend` (not root!)
2. **MongoDB Network Access:** Make sure `0.0.0.0/0` is allowed in MongoDB Atlas
3. **First Request:** May take 30 seconds (free tier spins up)

---

## 🎉 Done!

Your ticket booking system is now live!





