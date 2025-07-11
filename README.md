# TodoList App

A full-stack Todo List application with user authentication and task management built with FastAPI (backend) and React (frontend).

## 🚀 Features

### Backend (FastAPI)
- **User Authentication**: JWT-based authentication with registration and login
- **Task Management**: Full CRUD operations for tasks
- **User-specific Tasks**: Each user can only see and manage their own tasks
- **RESTful API**: Clean, well-documented API endpoints
- **SQLite Database**: Lightweight database with SQLAlchemy ORM
- **CORS Support**: Configured for frontend integration

### Frontend (React)
- **Modern UI**: Beautiful, responsive design with glassmorphism effects
- **Authentication Flow**: Seamless login/register experience
- **Task Management**: Create, edit, delete, and mark tasks as complete
- **Real-time Updates**: Instant UI updates when tasks are modified
- **Protected Routes**: Automatic redirection based on authentication status
- **Mobile Responsive**: Works perfectly on all device sizes

## 🛠️ Tech Stack

### Backend
- **FastAPI** – Modern, fast web framework
- **SQLAlchemy** – SQL toolkit and ORM
- **SQLite** – Lightweight database
- **JWT** – JSON Web Tokens for authentication
- **Passlib** – Password hashing
- **Uvicorn** – ASGI server

### Frontend
- **React** – JavaScript library for building user interfaces
- **React Router** – Client-side routing
- **Axios** – HTTP client for API calls
- **CSS3** – Modern styling with gradients and animations
- **Vite** – Fast build tool

## 📦 Installation

### Prerequisites
- Python 3.8+
- Node.js 16+
- npm or yarn

### Backend Setup
1. **Navigate to backend directory:**
   ```bash
   cd backend
   ```
2. **Create virtual environment:**
   ```bash
   python -m venv venv
   ```
3. **Activate virtual environment:**
   ```bash
   # Windows
   venv\Scripts\activate
   # macOS/Linux
   source venv/bin/activate
   ```
4. **Install dependencies:**
   ```bash
   pip install -r requirements.txt
   ```
5. **Run the backend server:**
   ```bash
   python main.py
   ```
   The backend will be available at `http://localhost:8000`

### Frontend Setup
1. **Navigate to frontend directory:**
   ```bash
   cd frontend
   ```
2. **Install dependencies:**
   ```bash
   npm install
   ```
3. **Start the development server:**
   ```bash
   npm run dev
   ```
   The frontend will be available at `http://localhost:5173`

## 🔧 API Endpoints

### Authentication
- `POST /auth/register` – Register a new user
- `POST /auth/token` – Login and get access token

### User Management
- `GET /users/users/me/` – Get current user profile

### Task Management
- `GET /tasks` – Get all tasks for current user
- `POST /tasks` – Create a new task
- `PUT /tasks/{task_id}` – Update a task
- `DELETE /tasks/{task_id}` – Delete a task

## 🎯 Usage
1. **Register/Login**: Create an account or sign in with existing credentials
2. **Create Tasks**: Add new tasks with title and optional description
3. **Manage Tasks**: Edit, delete, or mark tasks as complete
4. **Stay Organized**: All tasks are automatically associated with your account

## 📁 Project Structure

```
ToDoList/
├── backend/
│   ├── main.py                # FastAPI application
│   ├── requirements.txt       # Python dependencies
│   ├── database.py            # Database configuration
│   ├── models.py              # SQLAlchemy models
│   ├── schemas.py             # Pydantic schemas
│   ├── auth/
│   │   └── auth_handler.py    # Authentication logic
│   └── routes/
│       ├── auth.py            # Authentication routes
│       └── user.py            # User routes
├── frontend/
│   ├── src/
│   │   ├── App.jsx            # Main application component
│   │   ├── api.js             # API functions
│   │   ├── contexts/
│   │   │   └── AuthContext.jsx # Authentication context
│   │   └── components/
│   │       ├── Dashboard.jsx  # Main dashboard
│   │       ├── Login.jsx      # Login component
│   │       ├── Register.jsx   # Register component
│   │       ├── Dashboard.css  # Dashboard styling
│   │       └── Auth.css       # Authentication styling
│   ├── package.json           # Node.js dependencies
│   └── vite.config.js         # Vite configuration
└── README.md                  # This file
```

## 🔒 Security Features
- **Password Hashing**: Passwords are hashed using bcrypt
- **JWT Tokens**: Secure token-based authentication
- **CORS Protection**: Configured for secure cross-origin requests
- **Input Validation**: All inputs are validated using Pydantic schemas

## 🚀 Deployment

### Backend Deployment
The backend can be deployed to platforms like:
- **Heroku**
- **Railway**
- **DigitalOcean App Platform**
- **AWS Lambda**

### Frontend Deployment
The frontend can be deployed to:
- **Vercel**
- **Netlify**
- **GitHub Pages**
- **Firebase Hosting**

## 🤝 Contributing
1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License
This project is licensed under the MIT License – see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments
- FastAPI for the excellent web framework
- React team for the amazing frontend library
- The open-source community for inspiration and tools
