# 401 Unauthorized Error - Troubleshooting Guide

## 🔴 What 401 Means
Your request is reaching the server, but **authentication failed**. The backend is rejecting your request because:
- No authentication token was sent
- Token is invalid or expired
- Token is not being sent with cookies

---

## 🔍 Root Cause Analysis

### **Problem:** Cookie Settings Were Blocking Authentication

The issue was in `Server/src/controller/auth.controller.js`:

```javascript
// ❌ BEFORE (Broken in production)
.cookie("token", token, {
  httpOnly: true,
  secure: false,           // ← This causes 401 on HTTPS deployment
  sameSite: "strict",      // ← Too restrictive for cross-origin
  maxAge: 6 * 60 * 60 * 1000,
})
```

**Why this breaks:**
- **`secure: false`** on HTTPS: The browser won't send the cookie over HTTPS because it was set as insecure
- **`sameSite: "strict"`**: Won't send cookie on same-site requests in some scenarios

---

## ✅ The Fix Applied

```javascript
// ✅ AFTER (Works in dev and production)
.cookie("token", token, {
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production',  // ← True only in production
  sameSite: process.env.NODE_ENV === 'production' ? 'lax' : 'lax',
  maxAge: 6 * 60 * 60 * 1000,
})
```

---

## 🛠️ What We Fixed

| File | Issue | Solution |
|------|-------|----------|
| `Server/src/controller/auth.controller.js` | Cookie `secure: false` on HTTPS | Set `secure: process.env.NODE_ENV === 'production'` |
| `Server/src/controller/auth.controller.js` | `sameSite: "strict"` too restrictive | Changed to `sameSite: 'lax'` |
| `Client/src/Pages/createPost.jsx` | No 401-specific error handling | Added detailed 401 error messages |
| `Server/src/index.js` | CORS was already fixed | ✅ (Enhanced in previous fix) |

---

## 🧪 How to Verify the Fix

### Step 1: Clear Cookies
```javascript
// In browser console
document.cookie.split(";").forEach(c => {
  const eqPos = c.indexOf("=");
  const name = eqPos > -1 ? c.substr(0, eqPos).trim() : c.trim();
  document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/`;
});
```

### Step 2: Sign Out Completely
- Go to Dashboard → Settings → Sign Out

### Step 3: Sign In Again
- Fill in email and password
- Wait for redirect
- **Check Application tab** (DevTools → Application → Cookies)
- **Look for `name: token` cookie**
- Verify `Secure` checkbox status:
  - ✅ Development: Should be unchecked
  - ✅ Production: Should be checked

### Step 4: Create a Post
```
1. Click "Create Post"
2. Fill in all fields
3. Submit
4. Check Network tab → POST /api/post/create
5. Status should be 201, NOT 401
6. Check console for: "Post created successfully"
```

### Step 5: Check Network Request Headers
In DevTools → Network tab → Click on POST request to `/api/post/create`:
- Look for **Cookie** header in the request
- Should see: `Cookie: token=eyJhbGc...xxxxx`
- If missing → Backend won't receive token → 401 error

---

## 🐛 Still Getting 401?

### Checklist:

**1. Redis Environment Variable**
```bash
# Verify env is set correctly
NODE_ENV=production npm start
# OR
NODE_ENV=development npm start
```

**2. Check Cookies Are Being Stored**
```javascript
// In browser console after signing in
console.log(document.cookie)
// Should show: token=eyJhbGc...xxxxx
```

**3. Verify Credentials Are Being Sent**
```javascript
// In fetch call, must have:
fetch(url, {
  credentials: 'include',  // ← This is critical
  // ...
})
```

**4. Check JWT_SECRET is Set**
```bash
# Backend must have JWT_SECRET in environment
echo $JWT_SECRET
```

**5. Test Token Separately**
```bash
# Get your token from Application tab (copy the value)
TOKEN="your_token_here"

# Test if token works
curl https://devscroll-blog.onrender.com/api/post/create \
  -H "Cookie: token=$TOKEN" \
  -H "Content-Type: application/json" \
  -X POST \
  -d '{"title":"test","content":"test","category":"test"}'
```

---

## 📋 Complete 401 Fix Verification

Run this sequence:

```
1. Sign out completely
2. Clear cookies (see Step 1 above)
3. Refresh browser (Ctrl+F5)
4. Sign in again
5. Open DevTools → Application → Cookies
6. Verify token cookie exists and Secure flag is correct
7. Try creating a post
8. Check Network tab for 201 status
```

---

## 🔐 Security Notes

**Why these cookie settings are important:**

| Setting | Why |
|---------|-----|
| `httpOnly: true` | Prevents JavaScript from reading token (XSS protection) |
| `secure: true` (production) | Only sends cookie over HTTPS |
| `sameSite: 'lax'` | CSRF protection while allowing same-site requests |
| Auto-send with `credentials: 'include'` | Token is automatically sent with every request |

---

## 🚀 Deployment Reminder

Before deploying:

```bash
# 1. Make sure .env has NODE_ENV set
echo $NODE_ENV

# 2. Verify JWT_SECRET is set
echo $JWT_SECRET

# 3. Deploy changes
git push origin main

# 4. Test on deployment
# - Sign in
# - Create post
# - Check Network tab shows 201, not 401
```

---

## 📊 Expected Behavior

### Development (localhost:2068)
```
❌ Cookie secure flag: unchecked (because HTTP)
✅ sameSite: lax
✅ Token sent with requests
✅ Create post: 201 response
```

### Production (HTTPS)
```
✅ Cookie secure flag: CHECKED (because HTTPS)
✅ sameSite: lax
✅ Token sent with requests
✅ Create post: 201 response
```

---

## 🆘 Additional Debugging

If 401 still persists, add this to backend:

```javascript
// In Server/src/Middleware/verifyUser.js
const verifyToken = (req, res, next) => {
    const token = req.cookies?.token;
    
    // Debug logging
    console.log('🔍 Auth Debug:', {
      hasCookies: !!req.cookies,
      hasToken: !!token,
      cookies: Object.keys(req.cookies || {}),
      headers: req.headers.cookie,
      authorization: req.headers.authorization,
    });

    if (!token) {
      console.error('❌ No token found in cookies');
      return res.status(401).json({ message: 'Unauthorized - no token' });
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
      if (err) {
        console.error('❌ Token verification failed:', err.message);
        return res.status(401).json({ message: 'Unauthorized - invalid token' });
      }
      req.user = user;
      next();
    });
};
```

Then check backend logs when creating a post to see exactly what's happening.

