# CampVerse - Local Setup Guide for Windows

This guide will help you set up and run the CampVerse application on your Windows machine.

## 📋 Prerequisites

Before you begin, make sure you have the following installed:

1. **Python 3.8 or higher**
   - Download from: https://www.python.org/downloads/
   - During installation, check "Add Python to PATH"

2. **Node.js 16.x or higher**
   - Download from: https://nodejs.org/
   - Choose the LTS (Long Term Support) version

3. **Git** (optional, for version control)
   - Download from: https://git-scm.com/download/win

---

## 🚀 Installation Steps

### Step 1: Clone or Download the Project

If using Git:
```bash
git clone <repository-url>
cd campverse-project
```

Or download and extract the ZIP file, then open PowerShell/Command Prompt in the project folder.

---

### Step 2: Backend Setup (Django)

1. **Navigate to the backend directory:**
```bash
cd campverse_backend
```

2. **Create a virtual environment (recommended):**
```bash
python -m venv venv
```

3. **Activate the virtual environment:**
```bash
.\venv\Scripts\activate
```
You should see `(venv)` appear at the beginning of your command prompt.

4. **Install dependencies:**
```bash
pip install -r requirements.txt
```

5. **Run database migrations:**
```bash
python manage.py migrate
```

6. **Create a superuser (admin account):**
```bash
python manage.py createsuperuser
```
Follow the prompts to set username, email, and password.

7. **Start the Django development server:**
```bash
python manage.py runserver
```

The backend will be running at: **http://127.0.0.1:8000/**

✅ Keep this terminal window open while working on the frontend.

---

### Step 3: Frontend Setup (React + Vite)

1. **Open a NEW terminal/command prompt** (keep the backend server running)

2. **Navigate to the frontend directory:**
```bash
cd CampVerse
```

3. **Install Node.js dependencies:**
```bash
npm install
```

4. **Start the development server:**
```bash
npm run dev
```

The frontend will be running at: **http://localhost:5173/** (or another port shown in the terminal)

✅ Press `Ctrl + C` to stop the server when needed.

---

## 🎯 Accessing the Application

1. Open your web browser
2. Go to: **http://localhost:5173/**
3. You should see the CampVerse homepage

### Admin Panel Access

To access the Django admin panel:
1. Go to: **http://127.0.0.1:8000/admin/**
2. Login with the superuser credentials you created earlier

---

## 🛠️ Common Issues & Solutions

### Issue: Port already in use
**Solution:** Change the port:
```bash
# Backend
python manage.py runserver 8001

# Frontend
npm run dev -- --port 5174
```

### Issue: 'python' is not recognized
**Solution:** Make sure Python is added to your system PATH. Try:
```bash
py -m venv venv
```
instead of `python -m venv venv`

### Issue: CORS errors
**Solution:** The backend is configured to allow all origins (`CORS_ALLOW_ALL_ORIGINS = True`). If you face issues, ensure both servers are running.

### Issue: ModuleNotFoundError
**Solution:** Make sure your virtual environment is activated and dependencies are installed:
```bash
.\venv\Scripts\activate
pip install -r requirements.txt
```

### Issue: npm ERR! peer dependency missing
**Solution:** Use:
```bash
npm install --legacy-peer-deps
```

---

## 📁 Project Structure

```
campverse-project/
├── campverse_backend/          # Django Backend
│   ├── manage.py
│   ├── requirements.txt
│   ├── campverse/              # Main Django settings
│   ├── users/                  # User authentication
│   ├── college/                # College management
│   ├── marketplace/            # Marketplace feature
│   ├── lostfound/              # Lost & Found feature
│   ├── notices/                # Notices feature
│   └── feedback/               # Feedback feature
│
└── CampVerse/                  # React Frontend
    ├── package.json
    ├── src/
    │   ├── components/         # Reusable components
    │   ├── pages/              # Page components
    │   ├── layouts/            # Layout components
    │   └── api/                # API client
    └── public/                 # Static files
```

---

## 🔧 Development Commands

### Backend (campverse_backend/)
```bash
# Activate virtual environment
.\venv\Scripts\activate

# Run server
python manage.py runserver

# Create migrations
python manage.py makemigrations

# Apply migrations
python manage.py migrate

# Create superuser
python manage.py createsuperuser
```

### Frontend (CampVerse/)
```bash
# Development server with hot reload
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Run linter
npm run lint
```

---

## 🌐 API Endpoints

Once the backend is running, you can test these endpoints:

- **API Base URL:** http://127.0.0.1:8000/
- **Admin Panel:** http://127.0.0.1:8000/admin/
- **Users API:** http://127.0.0.1:8000/api/users/
- **Notices API:** http://127.0.0.1:8000/api/notices/
- **Marketplace API:** http://127.0.0.1:8000/api/marketplace/
- **Lost & Found API:** http://127.0.0.1:8000/api/lost-found/
- **Feedback API:** http://127.0.0.1:8000/api/feedback/

---

## 💡 Tips

1. **Always activate the virtual environment** before running backend commands
2. **Keep both terminals open** - one for backend, one for frontend
3. **Use Ctrl + C** to stop servers when shutting down
4. **Database file** is located at `campverse_backend/db.sqlite3` - don't delete it unless you want to reset data
5. **Media files** will be stored in `campverse_backend/media/` directory

---

## 🧪 Testing the Application

1. **Register a new account** on the frontend
2. **Login** with your credentials
3. **Explore features:**
   - View notices
   - Browse marketplace items
   - Check lost & found items
   - Submit feedback
   - Manage college information

---

## 🆘 Need Help?

If you encounter any issues:

1. Check that both servers are running
2. Verify the ports match what the frontend expects (check `CampVerse/src/components/api/client.js`)
3. Clear browser cache and try again
4. Check the browser console and terminal for error messages

---

## 📝 Notes

- This is a **development setup** - not suitable for production
- Debug mode is enabled (`DEBUG = True`)
- All CORS origins are allowed (for development convenience)
- SQLite is used for simplicity - consider PostgreSQL for production

---

**Happy Coding! 🎉**
