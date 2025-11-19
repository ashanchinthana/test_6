# Fix Render Deployment Error

## Problem
Render can't find the `ticket-system-backend` folder.

## Solution: Update Render Settings

### Option 1: If files are at repo root (Recommended)
1. Go to Render dashboard
2. Click on your service
3. Go to **"Settings"** tab
4. Find **"Root Directory"**
5. **Clear it** (make it empty/blank)
6. Click **"Save Changes"**
7. Go to **"Manual Deploy"** → **"Deploy latest commit"**

### Option 2: If files are in subfolder
1. Go to Render dashboard
2. Click on your service  
3. Go to **"Settings"** tab
4. Find **"Root Directory"**
5. Set it to: `ticket-system-backend` (exactly this, no slashes)
6. Click **"Save Changes"**
7. Go to **"Manual Deploy"** → **"Deploy latest commit"**

---

## Quick Fix Steps:

1. **Render Dashboard** → Your Service → **Settings**
2. **Root Directory:** Try **EMPTY** first (clear the field)
3. **Save Changes**
4. **Manual Deploy** → **Deploy latest commit**
5. Wait for build

---

## If Still Fails:

Check your GitHub repo structure:
- Go to: https://github.com/ashanchinthana/test_6
- See if files are at root or in `ticket-system-backend` folder
- Match the Root Directory setting to the actual structure







