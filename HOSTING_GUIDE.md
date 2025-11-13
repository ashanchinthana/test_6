# Complete Hosting Guide - MongoDB Atlas + Render

## 🎯 Step-by-Step: Host Your Ticket System

---

## Part 1: Set Up MongoDB Atlas (5 minutes)

### Step 1.1: Create MongoDB Atlas Account
1. Go to **https://www.mongodb.com/cloud/atlas**
2. Click **"Try Free"** or **"Sign Up"**
3. Sign up with Google/Email
4. Verify your email

### Step 1.2: Create a Free Cluster
1. After login, click **"Build a Database"**
2. Choose **"FREE"** tier (M0 Sandbox)
3. Select a **Cloud Provider** (AWS recommended)
4. Choose a **Region** closest to you
5. Click **"Create"**
6. ⏳ Wait 3-5 minutes for cluster to be created

### Step 1.3: Create Database User
1. In the **"Security"** section, click **"Database Access"**
2. Click **"Add New Database User"**
3. Choose **"Password"** authentication
4. Enter:
   - **Username:** `admin` (or your choice)
   - **Password:** Create a strong password (SAVE THIS!)
5. Set privileges: **"Read and write to any database"**
6. Click **"Add User"**

### Step 1.4: Set Network Access
1. In **"Security"** section, click **"Network Access"**
2. Click **"Add IP Address"**
3. Click **"Allow Access from Anywhere"** (adds `0.0.0.0/0`)
4. Click **"Confirm"**

### Step 1.5: Get Connection String
1. Go back to **"Database"** section
2. Click **"Connect"** on your cluster
3. Choose **"Connect your application"**
4. Select **"Node.js"** and version **"5.5 or later"**
5. Copy the connection string (looks like):
   ```
   mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority
   ```
6. **Replace `<username>`** with your database username (e.g., `admin`)
7. **Replace `<password>`** with your database password
8. **Add database name** before the `?`:
   ```
   mongodb+srv://admin:YourPassword@cluster0.xxxxx.mongodb.net/ticketingDB?retryWrites=true&w=majority
   ```

**✅ Save this connection string!** You'll need it in Part 2.

---

## Part 2: Deploy to Render (5 minutes)

### Step 2.1: Push Code to GitHub (if not already done)
1. Your code is already at: `https://github.com/ashanchinthana/test_6.git`
2. Make sure all changes are committed and pushed:
   ```bash
   cd ticket-system-backend
   git add .
   git commit -m "Ready for deployment"
   git push
   ```

### Step 2.2: Create Render Account
1. Go to **https://render.com**
2. Click **"Get Started for Free"**
3. Sign up with **GitHub** (recommended)
4. Authorize Render to access your GitHub

### Step 2.3: Create New Web Service
1. In Render dashboard, click **"New +"**
2. Select **"Web Service"**
3. Connect your GitHub account (if not connected)
4. Find and select repository: **`ashanchinthana/test_6`**
5. Click **"Connect"**

### Step 2.4: Configure Web Service
Fill in these settings:

- **Name:** `ticket-booking-system` (or your choice)
- **Environment:** `Node`
- **Region:** Choose closest to you
- **Branch:** `main` (or `master`)
- **Root Directory:** `ticket-system-backend` ⚠️ **IMPORTANT!**
- **Build Command:** `npm install`
- **Start Command:** `npm start`
- **Plan:** **Free** (512MB RAM)

### Step 2.5: Add Environment Variables
1. Scroll down to **"Environment Variables"** section
2. Click **"Add Environment Variable"**
3. Add these variables:

   **Variable 1:**
   - **Key:** `MONGO_URI`
   - **Value:** Your MongoDB Atlas connection string from Part 1.5
   - Example: `mongodb+srv://admin:YourPassword@cluster0.xxxxx.mongodb.net/ticketingDB?retryWrites=true&w=majority`

   **Variable 2:**
   - **Key:** `NODE_ENV`
   - **Value:** `production`

4. Click **"Create Web Service"**

### Step 2.6: Wait for Deployment
1. Render will start building your app
2. Watch the logs in real-time
3. ⏳ Wait 5-10 minutes for first deployment
4. You'll see: "Your service is live at https://your-app.onrender.com"

---

## Part 3: Test Your Live Site

### Step 3.1: Test User Submission
1. Go to: `https://your-app.onrender.com/`
2. Fill the form:
   - Name: Test User
   - User ID: 123456789012
   - WhatsApp: +94771234567
   - Payment Slip: Upload any image
3. Click Submit
4. Should see success message

### Step 3.2: Test Admin Panel
1. Go to: `https://your-app.onrender.com/admin.html`
2. You should see the pending ticket
3. Click "Approve" or "Reject"
4. Check approved/rejected pages

---

## 🎉 Your Site is Live!

### Share These Links:

**For Users (Public):**
```
https://your-app.onrender.com/
```

**For Admin (Keep Private!):**
```
https://your-app.onrender.com/admin.html
https://your-app.onrender.com/approved.html
https://your-app.onrender.com/rejected.html
```

---

## ⚠️ Important Notes

### 1. File Storage Limitation
- **Free tier:** Files in `uploads/` folder are temporary
- Files may be lost on server restart
- **For production:** Consider cloud storage (Cloudinary, AWS S3)

### 2. Admin Security
- Admin pages have **NO password protection**
- Only share admin URLs with trusted people
- Consider adding authentication for production

### 3. MongoDB Atlas Free Tier
- **512MB storage** (enough for thousands of tickets)
- **Shared cluster** (may be slower during peak times)
- Perfect for small/medium events

### 4. Render Free Tier
- **512MB RAM**
- **Spins down after 15 minutes of inactivity**
- **First request after spin-down takes ~30 seconds**
- Perfect for testing and small events

---

## 🔧 Troubleshooting

### Issue: "Cannot connect to MongoDB"
**Solution:**
- Check MongoDB Atlas Network Access includes `0.0.0.0/0`
- Verify username/password in connection string
- Check connection string format

### Issue: "Build failed"
**Solution:**
- Check Root Directory is set to `ticket-system-backend`
- Verify `package.json` exists
- Check build logs in Render dashboard

### Issue: "Site not loading"
**Solution:**
- Check deployment logs in Render
- Verify environment variables are set
- Wait 30 seconds after first request (free tier spin-up)

### Issue: "Files not uploading"
**Solution:**
- Check `uploads/` folder exists
- Files reset on redeploy (free tier limitation)
- Consider cloud storage for production

---

## 📝 Quick Checklist

Before deploying:
- [ ] MongoDB Atlas cluster created
- [ ] Database user created
- [ ] Network Access set to `0.0.0.0/0`
- [ ] Connection string saved
- [ ] Code pushed to GitHub
- [ ] Render account created
- [ ] Web service configured
- [ ] Environment variables added
- [ ] Root directory set to `ticket-system-backend`

After deploying:
- [ ] Site loads at Render URL
- [ ] User can submit ticket
- [ ] Admin can see pending tickets
- [ ] Admin can approve/reject
- [ ] Ticket number shows correctly

---

## 🚀 Next Steps (Optional)

1. **Custom Domain:** Connect your own domain name
2. **Email Notifications:** Send emails when tickets approved
3. **Admin Authentication:** Add password protection
4. **Cloud Storage:** Use Cloudinary for file persistence
5. **Analytics:** Track ticket submissions

---

## 📞 Need Help?

- **MongoDB Atlas Docs:** https://docs.atlas.mongodb.com
- **Render Docs:** https://render.com/docs
- **Check deployment logs** in Render dashboard

Good luck with your event! 🎉



