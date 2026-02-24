# 🚀 Deployment Setup Guide - DevScroll Blog

## Overview
This guide helps you deploy the DevScroll Blog application to Vercel or Netlify without 404 errors.

---

## 🔧 Critical Setup Instructions

### 1. **VERCEL DEPLOYMENT (Recommended)**

#### Step 1: Set Environment Variables in Vercel Dashboard
1. Go to **Project Settings → Environment Variables**
2. Add these variables:

```env
VITE_FIREBASE_API_KEY=AIzaSyB3lRfPRcRnQMz5XMwgBUVU-g2t7vvlXvM
VITE_CLOUDINARY_CLOUD_NAME=dvujchz0i
VITE_CLOUDINARY_UPLOAD_PRESET=blog_unsigned
VITE_API_URL=https://devscroll-blog.onrender.com
```

> ⚠️ **IMPORTANT:** Set the scope to `Production`, `Preview`, and `Development`

#### Step 2: Update Backend CORS
In `Server/src/index.js`, update the allowed origins with your Vercel domain:

```javascript
const VERCEL_URL = process.env.VERCEL_URL 
  ? `https://${process.env.VERCEL_URL}` 
  : "https://dev-scroll-blog.vercel.app";

const allowedOrigins = [
  "http://localhost:5173",
  "http://localhost:3000",
  VERCEL_URL
];
```

#### Step 3: Redeploy
The `vercel.json` file in Client folder will handle SPA routing automatically.

---

### 2. **NETLIFY DEPLOYMENT**

#### Step 1: Set Environment Variables in Netlify
1. Go to **Site settings → Build & deploy → Environment**
2. Add the same variables as Vercel

#### Step 2: Configure Build Settings
In **Site settings → Build & deploy**:
- **Build command:** `npm run build`
- **Publish directory:** `dist`

#### Step 3: Check _redirects
The `public/_redirects` file should exist (already created). This handles SPA routing.

#### Step 4: Update Backend CORS
In `Server/src/index.js`:

```javascript
const NETLIFY_URL = process.env.URL || "https://devscroll-blog.netlify.app";

const allowedOrigins = [
  "http://localhost:5173",
  "http://localhost:3000",
  NETLIFY_URL
];
```

---

## 🔍 Verifying Your Setup

### In Browser Console (Deployed Site):

```javascript
// Check if API_BASE is defined
console.log(import.meta.env.VITE_API_URL)  // Should show your API URL, not "undefined"
```

### Expected Output:
```
https://devscroll-blog.onrender.com
```

### If You See This ❌:
```
undefined
```
**→ Environment variables are NOT set in your deployment platform**

---

## ✅ Testing the Fix

### 1. **Test Post Creation**
- Click "Create Post"
- Fill in title, category, content
- Submit
- **Expected:** Redirects to `/post/your-post-slug` (NO 404)

### 2. **Test Comment Submission**
- Go to any post
- Write a comment
- Submit
- **Expected:** Comment appears instantly (NO 404)

### 3. **Check Browser Console**
- Right-click → Inspect → Console tab
- Create a post
- Look for these logs:
  ```
  POST https://devscroll-blog.onrender.com/api/post/create 201
  Post created successfully: {slug: "my-post-title"}
  ```

### 4. **Check Network Tab**
- Create a post
- Go to Network tab
- Filter by "XHR"
- Look for POST request to `/api/post/create`
- **Expected Status:** 201 or 200, NOT 404

---

## 🐛 Troubleshooting

### **Issue: Still getting 404 on post creation**

**Check 1:** Verify environment variables are set
```bash
# Both Vercel and Netlify should show these in build logs
echo $VITE_API_URL  # Must not be empty
```

**Check 2:** Test API directly
```bash
# Use curl to test backend API
curl https://devscroll-blog.onrender.com/api/post/getposts \
  -H "Content-Type: application/json"

# Should return: {"posts":[...], "totalPosts":...}
# Should NOT return: 404 Not Found
```

**Check 3:** Check CORS errors
- In browser console, look for CORS error messages
- If you see CORS errors, the frontend URL is NOT in backend allowedOrigins

**Check 4:** Verify API_BASE in frontend
```javascript
// In browser console
console.log(import.meta.env.VITE_API_URL)  // Must not be "undefined"
```

---

## 📝 Environment Variables Checklist

Before deploying, ensure:

- [ ] `VITE_API_URL` is set to your backend URL
- [ ] Backend has `FRONTEND_URL` environment variable for CORS
- [ ] `vercel.json` exists in Client folder (for Vercel)
- [ ] `public/_redirects` exists (for Netlify)
- [ ] Backend CORS includes your deployment domain
- [ ] `.env` file is in `.gitignore` (not committed)
- [ ] Build completes without errors
- [ ] No "undefined" environment variables in browser console

---

## 🔐 Security Notes

1. **Never commit `.env` file** - Keep it in `.gitignore`
2. **Environment variables should be set in platform, not hardcoded**
3. **Use production URLs for API_URL** - Change from localhost before deploying
4. **CORS should only allow your domain** - Don't use `*` (wildcard)

---

## 📞 Backend Deployment Notes

Your backend is on **Render** (`devscroll-blog.onrender.com`)

**Before deploying:** Ensure these environment variables are set on Render:
```
MONGODB_URI=your_mongodb_url
JWT_SECRET=your_secret
PORT=2068 (or whatever Render assigns)
NODE_ENV=production
FRONTEND_URL=https://your-vercel-or-netlify-url.com
```

---

## 🚀 Quick Deployment Checklist

### Vercel:
```bash
# 1. Push code to GitHub
git push origin main

# 2. In Vercel Dashboard:
# - Select your repo
# - Set environment variables (see step 1 above)
# - Click Deploy
# - Wait for build to complete

# 3. Update backend CORS with Vercel URL
```

### Netlify:
```bash
# 1. Push code to GitHub

# 2. In Netlify Dashboard:
# - Connect git repo
# - Set build command: npm run build
# - Set publish directory: dist
# - Set environment variables (see step 1 above)
# - Deploy

# 3. Update backend CORS with Netlify URL
```

---

## 🎯 Expected Behavior After Fix

| Scenario | Before | After |
|----------|--------|-------|
| Create post | 404 error | Redirects to `/post/slug` ✅ |
| Submit comment | 404 error | Comment appears instantly ✅ |
| Refresh post page | 404 error | Post loads correctly ✅ |
| Navigate to post directly | 404 error | Post loads correctly ✅ |

---

## Additional Resources

- [Vercel SPA Routing Docs](https://vercel.com/docs/project-configuration#rewrites)
- [Netlify Redirects Docs](https://docs.netlify.com/routing/redirects/)
- [React Router Deployment](https://reactrouter.com/en/main/guides/deferred-fetch-abis#fetchers-on-deployed-sites)

