# 🔧 Fix for 401 Unauthorized Errors

If you're getting **"Unauthorized: /api/notices/"** or **401 errors**, follow these steps:

---

## ✅ Quick Fix (Already Applied in Latest Version)

The latest version has already fixed this issue! Just pull the changes:

```bash
git pull origin main
```

Then restart your backend server.

---

## 📝 What Was Fixed

### 1. Backend Settings (`campverse_backend/campverse/settings.py`)

Added SessionAuthentication and CSRF trusted origins:

```python
CORS_ALLOW_ALL_ORIGINS = True
CORS_ALLOW_CREDENTIALS = True

# Add CSRF trusted origins for local development
CSRF_TRUSTED_ORIGINS = [
    'http://localhost:5173',
    'http://localhost:3000',
    'http://127.0.0.1:5173',
    'http://127.0.0.1:3000',
]

REST_FRAMEWORK = {
    'DEFAULT_AUTHENTICATION_CLASSES': [
        'rest_framework.authentication.TokenAuthentication',
        'rest_framework.authentication.SessionAuthentication',  # ← Added this
    ],
    'DEFAULT_PERMISSION_CLASSES': [
        'rest_framework.permissions.AllowAny',
    ],
}
```

### 2. Frontend API Client (`CampVerse/src/components/api/client.js`)

Added credentials to API requests:

```javascript
const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,  // ← Send cookies for CSRF
});
```

---

## 🚀 How to Apply the Fix Manually (If Needed)

If you have an older version, make these changes:

### Step 1: Update Backend

Open `campverse_backend/campverse/settings.py` and:

1. Add `SessionAuthentication` to `REST_FRAMEWORK` settings
2. Add `CSRF_TRUSTED_ORIGINS` list

### Step 2: Update Frontend

Open `CampVerse/src/components/api/client.js` and add:

```javascript
withCredentials: true,
```

to the axios.create() configuration.

### Step 3: Restart Servers

```bash
# Stop both servers (Ctrl+C)

# Restart backend
cd campverse_backend
python manage.py runserver

# In a new terminal, restart frontend
cd CampVerse
npm run dev
```

---

## ✨ Why This Works

- **SessionAuthentication** allows Django to use session cookies for authentication
- **CSRF_TRUSTED_ORIGINS** tells Django to accept requests from your frontend URL
- **withCredentials: true** makes the browser send cookies with API requests

---

## 🧪 Test It

After applying the fix:

1. Open browser at http://localhost:5173/
2. Check browser console - no more 401 errors!
3. All API calls should work ✅

---

**Problem Solved!** 🎉
