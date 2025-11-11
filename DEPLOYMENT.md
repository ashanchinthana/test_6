# Quick Deployment Guide

## Step-by-Step: Deploy Your Ticket System

### Step 1: Set Up MongoDB Atlas (Cloud Database) - FREE

1. Go to https://www.mongodb.com/cloud/atlas
2. Click "Try Free" and create an account
3. Create a new cluster (choose FREE tier)
4. Wait 3-5 minutes for cluster to be created
5. Click "Connect" → "Connect your application"
6. Copy the connection string (looks like: `mongodb+srv://username:password@cluster.mongodb.net/...`)
7. Replace `<password>` with your database password
8. Click "Network Access" → "Add IP Address" → "Allow Access from Anywhere" (0.0.0.0/0)
9. Click "Database Access" → "Add New Database User"
   - Username: `admin` (or your choice)
   - Password: Create a strong password (save it!)
   - Database User Privileges: "Read and write to any database"

**Save your connection string!** It looks like:
```
mongodb+srv://admin:yourpassword@cluster0.xxxxx.mongodb.net/ticketingDB?retryWrites=true&w=majority
```

---

### Step 2: Deploy to Render (Easiest - FREE)

1. **Push your code to GitHub:**
   - Create a GitHub account if you don't have one
   - Create a new repository
   - Upload your `ticket-system-backend` folder
   - Commit and push

2. **Deploy on Render:**
   - Go to https://render.com
   - Sign up/login (use GitHub to sign in)
   - Click "New +" → "Web Service"
   - Connect your GitHub repository
   - Or use "Public Git repository" and paste your repo URL

3. **Configure:**
   - **Name:** `ticket-booking-system` (or your choice)
   - **Environment:** `Node`
   - **Build Command:** `npm install`
   - **Start Command:** `npm start`
   - **Plan:** Free (512MB RAM)

4. **Add Environment Variables:**
   - Click "Environment"
   - Add: `MONGO_URI` = Your MongoDB Atlas connection string
   - Add: `NODE_ENV` = `production`

5. **Deploy:**
   - Click "Create Web Service"
   - Wait 5-10 minutes for first deployment

6. **Your site is live!**
   - URL: `https://your-app-name.onrender.com`
   - Share with friends: `https://your-app-name.onrender.com`
   - Admin: `https://your-app-name.onrender.com/admin.html`

---

### Step 3: Share with Friends

1. **User Link (for ticket submission):**
   ```
   https://your-app-name.onrender.com/
   ```

2. **Admin Links (keep private!):**
   ```
   https://your-app-name.onrender.com/admin.html
   https://your-app-name.onrender.com/approved.html
   https://your-app-name.onrender.com/rejected.html
   ```

---

## Alternative: Railway (Also Free)

1. Go to https://railway.app
2. Sign up with GitHub
3. "New Project" → "Deploy from GitHub repo"
4. Select your repository
5. Add Environment Variable: `MONGO_URI` = Your MongoDB Atlas string
6. Railway auto-detects and deploys
7. Done! Get your URL

---

## Testing After Deployment

1. **Test User Submission:**
   - Go to your live URL
   - Fill form with:
     - Name: Test User
     - User ID: 123456789012 (12 digits)
     - Payment Slip: Upload any image
   - Submit

2. **Test Admin Approval:**
   - Go to `/admin.html`
   - See pending ticket
   - Click "Approve"
   - Check `/approved.html` to see approved ticket

3. **Test Ticket View:**
   - After approval, user can view ticket at `/ticket.html?id=<ticketId>`

---

## Important Notes

⚠️ **File Storage Limitation:**
- Render/Railway free tier: Files in `uploads/` folder are temporary
- Files may be lost on server restart/redeploy
- **Solution:** For production, use cloud storage (Cloudinary, AWS S3)
- For small events, current setup works fine

⚠️ **Admin Security:**
- Admin pages have NO password protection
- Only share admin URLs with trusted people
- Consider adding authentication for production

⚠️ **MongoDB Atlas Free Tier:**
- 512MB storage (enough for thousands of tickets)
- Shared cluster (may be slower during peak times)
- Perfect for small/medium events

---

## Troubleshooting

**"Cannot connect to MongoDB":**
- Check connection string is correct
- Verify IP whitelist includes 0.0.0.0/0
- Check username/password

**"Files not uploading":**
- Check `uploads/` folder exists
- Verify file permissions
- For cloud hosting, files may reset on redeploy

**"Site not loading":**
- Check deployment logs in Render/Railway dashboard
- Verify environment variables are set
- Check MongoDB connection

---

## Next Steps (Optional Improvements)

1. **Add Admin Login:** Protect admin pages with password
2. **Cloud File Storage:** Use Cloudinary for persistent file storage
3. **Custom Domain:** Connect your own domain name
4. **Email Notifications:** Send emails when tickets are approved
5. **Analytics:** Track ticket submissions

---

## Support

- Render Docs: https://render.com/docs
- Railway Docs: https://docs.railway.app
- MongoDB Atlas Docs: https://docs.atlas.mongodb.com

Good luck with your event! 🎉

