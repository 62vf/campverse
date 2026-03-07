# 🚀 CampVerse - Quick Setup Guide

Get your CampVerse application running in 5 minutes!

---

## 📋 Prerequisites

Install these before starting:

1. **Python 3.8+** - [Download](https://www.python.org/downloads/)
2. **Node.js 16+** - [Download](https://nodejs.org/)
3. **Git** (optional) - [Download](https://git-scm.com/)

---

## ⚡ Quick Start

### Step 1: Clone the Repository

```bash
git clone https://github.com/62vf/campverse.git
cd campverse
```

---

### Step 2: Setup Backend (Django)

Open a terminal and run:

```bash
# Navigate to backend folder
cd campverse_backend

# Create virtual environment
python -m venv venv

# Activate virtual environment
# Windows:
.\venv\Scripts\activate
# Mac/Linux:
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Run database migrations
python manage.py migrate

# Create admin account (optional but recommended)
python manage.py createsuperuser

# Start the backend server
python manage.py runserver
```

✅ Backend is now running at: **http://127.0.0.1:8000/**

**Keep this terminal open!**

---

### Step 3: Setup Frontend (React)

Open a **NEW terminal** and run:

```bash
# Navigate to frontend folder
cd CampVerse

# Install dependencies
npm install

# Start the development server
npm run dev
```

✅ Frontend is now running at: **http://localhost:5173/**

---

## 🎉 You're Done!

Open your browser and go to: **http://localhost:5173/**

---

## 📱 What You Can Do Now

### Explore Features:
- 📊 **Dashboard** - View college statistics
- 📚 **Courses** - Manage academic courses
- 👨‍🏫 **Faculty** - Track teaching staff
- 📅 **Timetable** - Schedule classes
- 📋 **Attendance** - Mark student attendance
- 💰 **Fees** - Manage fee payments
- 🔔 **Notifications** - Real-time updates
- 🔍 **Search** - Find anything across the app

### Admin Panel:
Visit **http://127.0.0.1:8000/admin/** to access the Django admin panel.

---

## 🛠️ Common Issues

### ❌ "Port already in use"
**Solution:** Change the port:
```bash
# Backend
python manage.py runserver 8001

# Frontend  
npm run dev -- --port 5174
```

### ❌ "python not recognized"
**Solution:** Try using `py` instead:
```bash
py -m venv venv
```

### ❌ "ModuleNotFoundError"
**Solution:** Make sure virtual environment is activated:
```bash
# Windows
.\venv\Scripts\activate

# Mac/Linux
source venv/bin/activate
```

### ❌ "npm ERR!"
**Solution:** Clear cache and reinstall:
```bash
npm cache clean --force
rm -rf node_modules package-lock.json
npm install
```

---

## 📁 Project Structure

```
campverse/
├── campverse_backend/      # Django Backend API
│   ├── manage.py
│   ├── requirements.txt
│   ├── college/           # College management module
│   ├── users/             # User authentication
│   └── ...                # Other modules
│
└── CampVerse/             # React Frontend
    ├── src/
    │   ├── components/    # Reusable UI components
    │   ├── pages/         # Application pages
    │   └── api/          # API client
    └── package.json
```

---

## 🔑 Default Credentials

If you created a superuser:
- **Admin Panel:** http://127.0.0.1:8000/admin/
- Use the credentials you set during `createsuperuser`

---

## 💡 Tips

1. **Always activate venv** before running backend commands
2. **Keep both terminals open** while developing
3. **Hot reload** is enabled - changes update automatically
4. **Database file:** `campverse_backend/db.sqlite3` (SQLite)

---

## 🧪 Testing the App

1. **Add a Course** first (required for other features)
2. **Add Faculty** members
3. **Create Timetable** entries
4. **Mark Attendance**
5. **Add Fee Records**
6. **Check Notifications** 🔔
7. **Use Search** 🔍 to find items

---

## 📞 Need Help?

- Check both terminals for error messages
- Ensure both servers are running
- Verify ports match (backend: 8000, frontend: 5173)
- Clear browser cache if needed

---

## 🎯 Development Commands

### Backend
```bash
cd campverse_backend
.\venv\Scripts\activate  # Windows
source venv/bin/activate  # Mac/Linux

python manage.py runserver          # Start server
python manage.py makemigrations     # Create migrations
python manage.py migrate            # Apply migrations
python manage.py createsuperuser    # Create admin
```

### Frontend
```bash
cd CampVerse

npm run dev      # Development server
npm run build    # Production build
npm run preview  # Preview production build
npm run lint     # Run linter
```

---

**Happy Coding! 🎉**

Built with ❤️ using Django + React
