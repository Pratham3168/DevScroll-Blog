# 🚀 Deployment Restrictions & Checklist

## 🔴 Critical Issues Found & Fixed

### 1. **Environment Variable Mismatch** ✅ FIXED
**Problem:** 
- Code was using `process.env.CONNECTION_STRING`
- Documentation showed `MONGODB_URI`
- Deployment platforms set `MONGODB_URI` → MongoDB connection failed

**Solution:**
```javascript
// Now accepts BOTH (for backwards compatibility)
const mongoURI = process.env.MONGODB_URI || process.env.CONNECTION_STRING;
```

**Deploy Checklist:**
- [ ] Set `MONGODB_URI` (recommended) OR `CONNECTION_STRING` in platform env vars
- [ ] Verify at least ONE is set before deploying

---

### 2. **Missing NODE_ENV Default** ✅ FIXED
**Problem:**
- Some deployment platforms don't set `NODE_ENV` by default
- Cookie security depended on `NODE_ENV === 'production'`
- Cookies might not be sent correctly

**Solution:**
```javascript
// Now defaults to 'development' if not set
if (!process.env.NODE_ENV) {
  process.env.NODE_ENV = 'development';
}
```

**Deploy Checklist:**
- [ ] Always set `NODE_ENV=production` on deployment platforms
- [ ] App will warn if NODE_ENV is not set

---

### 3. **Cookie sameSite Configuration Bug** ✅ FIXED
**Problem:**
```javascript
// ❌ BEFORE: Redundant ternary always returns 'lax'
sameSite: process.env.NODE_ENV === 'production' ? 'lax' : 'lax',
```

**Solution:**
```javascript
// ✅ AFTER: Simplified to just 'lax'
sameSite: 'lax',
```

**Deploy Checklist:**
- [ ] Code is now simpler and more reliable

---

### 4. **No Environment Variable Validation** ✅ FIXED
**Problem:**
- App would crash after minutes if JWT_SECRET was missing
- Error messages weren't clear
- Difficult to debug deployment issues

**Solution:**
Added startup validation in `Server/src/index.js`:
```javascript
validateEnv() → Checks all required variables before starting server
```

**Deploy Checklist:**
- [ ] Server logs will show clear errors if env vars are missing
- [ ] App exits with code 1 if config is invalid

---

## 📋 Pre-Deployment Checklist

### Frontend (Vercel/Netlify)

- [ ] Verify `Client/vercel.json` exists (SPA routing)
- [ ] Verify `Client/public/_redirects` exists (Netlify routing)
- [ ] Set environment variables:
  ```
  VITE_API_URL = https://your-backend.com
  VITE_FIREBASE_API_KEY = your_key
  VITE_CLOUDINARY_CLOUD_NAME = your_name
  VITE_CLOUDINARY_UPLOAD_PRESET = your_preset
  ```
- [ ] Check build completes without errors
- [ ] Verify `VITE_API_URL` is NOT `undefined` in browser console

### Backend (Render/Railway/Railway)

**Mandatory Environment Variables:**
- [ ] `PORT` (optional, defaults to 2068 locally, auto on Render)
- [ ] `MONGODB_URI` (required - MongoDB connection string)
- [ ] `JWT_SECRET` (required - use strong random string)
- [ ] `NODE_ENV=production` (required for deployment)
- [ ] `FRONTEND_URL` (required - your Vercel/Netlify domain)

**Optional:**
- [ ] `CONNECTION_STRING` (alternative to MONGODB_URI, not needed if MONGODB_URI is set)

**Verification:**
```bash
# Before deploying, verify these exist:
echo $MONGODB_URI  # Should show connection string, not empty
echo $JWT_SECRET   # Should show secret key, not empty  
echo $NODE_ENV     # Should show "production"
echo $FRONTEND_URL # Should show your frontend domain
```

---

## 🔍 Deployment Verification Steps

### 1. After Deploying Frontend

```javascript
// In browser console
console.log(import.meta.env.VITE_API_URL);
// ✅ Should show: https://your-backend.com
// ❌ Should NOT show: undefined
```

### 2. After Deploying Backend

**Check Backend Logs for:**
```
✅ Environment: production
✅ All required environment variables are set
✅ MongoDB connected Successfully
```

**If you see errors:**
```
❌ CRITICAL: JWT_SECRET is not set
❌ CRITICAL: MongoDB URI is not configured
```
→ Add the missing variables to your deployment platform

### 3. Test from Frontend

```
1. Sign in with credentials
2. Go to DevTools → Application → Cookies
3. Look for cookie named "token"
4. Check "Secure" flag (should be ✅ on HTTPS)
5. Create a post
6. Check Network tab → POST /api/post/create
7. Status should be 201 (not 401 or 404)
```

---

## 🐛 Troubleshooting Deployment Failures

### Error: "MongoDB connection failed"
```
❌ Check: Is MONGODB_URI or CONNECTION_STRING set in deployment platform?
✅ Fix: Go to platform settings → Environment variables → add MONGODB_URI
```

### Error: "Unauthorized" or "401"
```
❌ Check: Is JWT_SECRET set?
✅ Fix: Add JWT_SECRET to environment variables
```

### Error: "Cannot find module 'dotenv'"
```
❌ Check: Did you run npm install in Server folder?
✅ Fix: Run: cd Server && npm install
```

### Cookies not sending (401 errors)
```
❌ Check: Is NODE_ENV set to "production"?
✅ Fix: Add NODE_ENV=production to platform env vars
```

### CORS errors
```
❌ Check: Is FRONTEND_URL set correctly?
✅ Fix: Add FRONTEND_URL with exact domain (https://...)
✅ Fix: Make sure URL matches your deployed frontend
```

---

## 📊 Environment Variable Reference

| Variable | Type | Where | Notes |
|----------|------|-------|-------|
| `VITE_API_URL` | String | Frontend .env | Must be production backend URL |
| `VITE_FIREBASE_API_KEY` | String | Frontend .env | From Firebase console |
| `VITE_CLOUDINARY_CLOUD_NAME` | String | Frontend .env | From Cloudinary dashboard |
| `VITE_CLOUDINARY_UPLOAD_PRESET` | String | Frontend .env | From Cloudinary dashboard |
| `MONGODB_URI` | String | Backend platform | MongoDB connection string |
| `JWT_SECRET` | String | Backend platform | Use strong random value |
| `NODE_ENV` | String | Backend platform | Set to "production" |
| `FRONTEND_URL` | String | Backend platform | Your Vercel/Netlify domain with https:// |
| `PORT` | Number | Backend platform | Auto-assigned by platform, or set to 2068 |

---

## ✅ Complete Deployment Flow

```
1. Code is ready
   ↓
2. Frontend env vars set (Vercel/Netlify)
   ↓
3. Backend env vars set (Render/Railway/etc)
   ├─ MONGODB_URI ✓
   ├─ JWT_SECRET ✓
   ├─ NODE_ENV=production ✓
   ├─ FRONTEND_URL ✓
   └─ CORS updated with FRONTEND_URL ✓
   ↓
4. Push to GitHub
   ↓
5. Platform auto-deploys
   ↓
6. Verify logs show:
   ├─ "✅ All required environment variables are set"
   ├─ "✅ MongoDB connected Successfully"
   └─ "Server is Listening on PORT"
   ↓
7. Test from frontend
   ├─ Sign in → Get to dashboard
   ├─ Create post → Redirects to /post/slug
   ├─ Add comment → Comment appears
   └─ All API calls show 200/201, not 401/404
   ↓
8. 🎉 Deployment successful!
```

---

## 🚨 Common Mistakes to Avoid

| Mistake | Impact | Fix |
|---------|--------|-----|
| Forgot to set `MONGODB_URI` | Server crashes after startup | Add to platform env vars |
| `NODE_ENV` not set to "production" | Cookies insecure, 401 errors | Explicitly set NODE_ENV=production |
| `FRONTEND_URL` incorrect or missing | CORS blocks all requests | Set exact domain with https:// |
| Used `MONGODB_URI` in .env but `CONNECTION_STRING` in code | MongoDB won't connect | Both are now supported, but use MONGODB_URI |
| Forgot `credentials: 'include'` in fetch | Cookies won't be sent | All fetch calls in code already have this |
| `.env` file committed to git | Secrets exposed | Keep .env in .gitignore |
| Used hardcoded URLs instead of env vars | Breaks on deployment | All hardcoded URLs already replaced with API_BASE |

---

## 🔐 Security Best Practices

### JWT_SECRET Generation
```bash
# Generate a strong 32-character secret
openssl rand -base64 32

# Example output:
# 9j4k3L2mN5pQrStUvWxYz1aB2cD3eF4gH5iJ6kL7mN8o
```

### Never commit .env
```bash
# Verify .env is in .gitignore
cat .gitignore | grep "^.env"
# Should show: .env
```

### Rotate JWT_SECRET periodically
- Change JWT_SECRET every 3-6 months
- Previous sessions will require re-login
- This is normal and secure

### Use different secrets for dev and production
```
Development: simple-secret-for-testing
Production: openssl rand -base64 32 (strong random)
```

---

## 📞 Quick Fixes

> "My backend won't start after deploying"

Check logs for:
```
Missing: JWT_SECRET
Missing: MONGODB_URI
```
→ Add both to platform environment variables

---

> "Getting 401 Unauthorized"

Check:
1. Is `NODE_ENV=production` set?
2. Is `JWT_SECRET` set?
3. Are cookies being sent? (Check DevTools → Network → Cookies header)

---

> "Getting 404 on post creation"

Check:
1. Is `FRONTEND_URL` set correctly?
2. Is `Client/vercel.json` deployed?
3. Is `Client/public/_redirects` deployed?

---

> "MongoDB connection error"

Check:
```
1. Is MONGODB_URI set? (echo $MONGODB_URI)
2. Is URI format correct?
   ✓ mongodb+srv://user:pass@cluster.mongodb.net/dbname
   ✗ Just the username/password
3. Are IP restrictions open? (MongoDB Atlas → Network Access)
```

---

## 🎯 Success Criteria

Your deployment is successful when:

- [ ] Frontend builds without warnings
- [ ] Backend logs show "✅ All required environment variables are set"
- [ ] Backend logs show "✅ MongoDB connected Successfully"
- [ ] Can sign in from deployed frontend
- [ ] Can create a post → redirects to /post/slug
- [ ] Can add comment → appears instantly
- [ ] No 401, 404, CORS errors in browser console
- [ ] Network tab shows 200/201 responses, not 4xx/5xx

