# Online Ticket Booking System

A secure ticket purchasing system with manual admin approval workflow. Users submit their details and payment slips, and admins manually verify payments before generating tickets.

## Features

- ✅ User ticket submission with payment slip upload
- ✅ Admin approval/rejection workflow
- ✅ Sequential ticket numbering (starting from 1)
- ✅ View approved tickets with ticket image
- ✅ Delete approved/rejected tickets
- ✅ Beautiful UI with blurred background

## Tech Stack

- **Backend:** Node.js + Express.js
- **Database:** MongoDB (MongoDB Atlas for cloud)
- **File Upload:** Multer
- **Frontend:** HTML, CSS, JavaScript

## Prerequisites

- Node.js (v14 or higher)
- MongoDB (local or MongoDB Atlas account)
- Git

## Local Setup

1. **Clone or navigate to the project:**
   ```bash
   cd ticket-system-backend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set up MongoDB:**
   - **Option A (Local):** Install and run MongoDB locally
   - **Option B (Cloud):** Use MongoDB Atlas (recommended for hosting)

4. **Create `.env` file** (optional, for environment variables):
   ```env
   PORT=5000
   MONGO_URI=mongodb://localhost:27017/ticketingDB
   ```
   Or for MongoDB Atlas:
   ```env
   MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/ticketingDB
   ```

5. **Start the server:**
   ```bash
   npm run dev    # Development mode with auto-reload
   # or
   npm start      # Production mode
   ```

6. **Access the application:**
   - User form: `http://localhost:5000/`
   - Admin portal: `http://localhost:5000/admin.html`
   - Approved tickets: `http://localhost:5000/approved.html`
   - Rejected tickets: `http://localhost:5000/rejected.html`

## Deployment Guide

### Option 1: Render (Recommended - Free & Easy)

1. **Create MongoDB Atlas Database:**
   - Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
   - Sign up for free account
   - Create a new cluster (free tier available)
   - Create a database user
   - Whitelist IP: `0.0.0.0/0` (allow all IPs)
   - Get connection string: `mongodb+srv://username:password@cluster.mongodb.net/ticketingDB`

2. **Deploy to Render:**
   - Go to [Render](https://render.com)
   - Sign up/login
   - Click "New +" → "Web Service"
   - Connect your GitHub repository (or deploy from public repo)
   - Settings:
     - **Name:** ticket-booking-system
     - **Environment:** Node
     - **Build Command:** `npm install`
     - **Start Command:** `npm start`
   - Add Environment Variables:
     - `MONGO_URI` = Your MongoDB Atlas connection string
     - `PORT` = Leave empty (Render sets this automatically)
   - Click "Create Web Service"
   - Wait for deployment (5-10 minutes)

3. **Your site will be live at:** `https://your-app-name.onrender.com`

### Option 2: Railway

1. **Create MongoDB Atlas Database** (same as above)

2. **Deploy to Railway:**
   - Go to [Railway](https://railway.app)
   - Sign up/login
   - Click "New Project" → "Deploy from GitHub repo"
   - Select your repository
   - Add Environment Variable:
     - `MONGO_URI` = Your MongoDB Atlas connection string
   - Railway auto-detects Node.js and deploys
   - Your site will be live automatically

### Option 3: Heroku

1. **Create MongoDB Atlas Database** (same as above)

2. **Install Heroku CLI:**
   - Download from [Heroku](https://devcenter.heroku.com/articles/heroku-cli)

3. **Deploy:**
   ```bash
   heroku login
   heroku create your-app-name
   heroku config:set MONGO_URI="your-mongodb-atlas-connection-string"
   git push heroku main
   ```

### Option 4: DigitalOcean App Platform

1. **Create MongoDB Atlas Database** (same as above)

2. **Deploy:**
   - Go to [DigitalOcean](https://www.digitalocean.com)
   - Create App → Connect GitHub
   - Select repository
   - Add Environment Variable: `MONGO_URI`
   - Deploy

## Important Notes for Deployment

### 1. MongoDB Atlas Setup:
- **Free tier:** 512MB storage (enough for small events)
- **Connection String Format:**
  ```
  mongodb+srv://username:password@cluster.mongodb.net/ticketingDB?retryWrites=true&w=majority
  ```
- **Network Access:** Add `0.0.0.0/0` to allow all IPs (or your hosting provider's IP)

### 2. File Storage:
- **Current setup:** Files stored locally in `uploads/` folder
- **For production:** Consider using cloud storage (AWS S3, Cloudinary, etc.)
- **Temporary solution:** Render/Railway keep files, but they reset on redeploy
- **Better solution:** Use cloud storage service (see below)

### 3. Environment Variables:
Always set these in your hosting platform:
- `MONGO_URI` - MongoDB connection string
- `PORT` - Usually auto-set by hosting platform

### 4. Admin Access:
- Share the admin URLs with trusted admins only:
  - `https://your-site.com/admin.html`
  - `https://your-site.com/approved.html`
  - `https://your-site.com/rejected.html`

## Optional: Cloud File Storage (Recommended for Production)

For better file persistence, use cloud storage:

### Using Cloudinary (Free tier available):

1. Sign up at [Cloudinary](https://cloudinary.com)
2. Install: `npm install cloudinary multer-storage-cloudinary`
3. Update `routes/api.js` to use Cloudinary instead of local storage
4. Files will persist even if server restarts

## Project Structure

```
ticket-system-backend/
├── models/
│   └── ticket.js          # Mongoose ticket schema
├── routes/
│   └── api.js             # API endpoints
├── uploads/               # Payment slip storage (local)
├── public/                # Frontend files
│   ├── index.html         # User submission form
│   ├── admin.html         # Admin pending tickets
│   ├── approved.html      # Approved tickets
│   ├── rejected.html     # Rejected tickets
│   ├── ticket.html        # User ticket view
│   ├── background.jpg     # Background image
│   └── ticket.png         # Ticket template
├── server.js              # Express server
├── package.json           # Dependencies
└── .gitignore            # Git ignore rules
```

## API Endpoints

- `POST /api/submit` - Submit new ticket
- `GET /api/admin/pending` - Get pending tickets
- `GET /api/admin/approved` - Get approved tickets
- `GET /api/admin/rejected` - Get rejected tickets
- `POST /api/admin/approve/:id` - Approve ticket
- `POST /api/admin/reject/:id` - Reject ticket
- `DELETE /api/admin/ticket/:id` - Delete ticket
- `GET /api/ticket/:id` - Get ticket by ID

## Security Considerations

⚠️ **Important:** This is a basic implementation. For production use, consider:

1. **Admin Authentication:** Add login system for admin pages
2. **Rate Limiting:** Prevent spam submissions
3. **File Validation:** Validate file types and sizes
4. **HTTPS:** Always use HTTPS in production
5. **Input Sanitization:** Already implemented, but review
6. **CORS:** Configure CORS properly for your domain

## Troubleshooting

### MongoDB Connection Issues:
- Check your connection string
- Verify IP whitelist in MongoDB Atlas
- Check username/password are correct

### File Upload Issues:
- Check `uploads/` folder exists and has write permissions
- For cloud hosting, consider cloud storage

### Port Issues:
- Most hosting platforms set PORT automatically
- Don't hardcode port in production

## Support

For issues or questions, check:
- MongoDB Atlas documentation
- Your hosting platform's documentation
- Node.js/Express documentation

## License

ISC

