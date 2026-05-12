# summer-internship-hackathon-2026-tech-avengers
Hackathon team repository for Tech Avengers - [hackindia-team:summer-internship-hackathon-2026:tech-avengers]

# 🏋️‍♂️ Gym Management System

A modern and secure **Gym Management System** built using the **MERN Stack** with QR-based attendance tracking, authentication, member management, and real-time gym access verification.

This project is designed to simplify gym operations for both gym owners and members through an intuitive and responsive interface.

---

# 🚀 Live Features

## 👤 User Features

* Secure User Registration & Login
* JWT Authentication
* QR-Based Gym Access
* Camera QR Scanner
* Upload QR From Gallery
* Automatic Entry & Exit Tracking
* Responsive Modern UI
* Attendance Verification System

---

## 🛠 Admin Features

* Admin Registration & Login
* Unique Gym Code System
* QR Code Generation
* View All Gym Members
* Member Count API
* Secure Cookie-Based Authentication
* Gym-Specific User Management

---

# 📷 QR Attendance System

The system uses a smart QR workflow for gym access management.

## 🔥 Workflow

1. Admin logs in
2. QR code is generated
3. User scans QR
4. Attendance automatically updates
5. Entry/Exit status changes dynamically

---

# 🧠 Tech Stack

## Frontend

* React.js
* Tailwind CSS
* Axios
* React Router DOM
* html5-qrcode

---

## Backend

* Node.js
* Express.js
* MongoDB
* Mongoose
* JWT
* bcryptjs
* QRCode

---

# 📂 Folder Structure

```bash
Gym-Management-System/
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── App.jsx
│   │   └── main.jsx
│   │
│   └── package.json
│
├── backend/
│   ├── controller/
│   ├── model/
│   ├── routes/
│   ├── middleware/
│   ├── app.js
│   ├── server.js
│   └── package.json
│
└── README.md
```

---

# ⚙️ Installation Guide

## 1️⃣ Clone Repository

```bash
git clone <your-repository-link>
```

---

## 2️⃣ Install Frontend Dependencies

```bash
cd frontend
npm install
```

---

## 3️⃣ Install Backend Dependencies

```bash
cd backend
npm install
```

---

# 🔐 Environment Variables

Create a `.env` file inside the backend folder.

```env
PORT=3000

MONGO_URI=your_mongodb_connection_string

JWT_SECRET=your_secret_key
```

---

# ▶️ Run Frontend

```bash
npm run dev
```

---

# ▶️ Run Backend

```bash
nodemon server.js
```

---

# 🔑 API Endpoints

# 👤 User Routes

| Method | Endpoint             | Description   |
| ------ | -------------------- | ------------- |
| POST   | `/api/auth/register` | Register User |
| POST   | `/api/auth/login`    | Login User    |

---

# 🛠 Admin Routes

| Method | Endpoint                | Description         |
| ------ | ----------------------- | ------------------- |
| POST   | `/api/auths/colab`      | Register Admin      |
| POST   | `/api/auths/colablogin` | Login Admin         |
| GET    | `/api/auths/colabcount` | Get All Gym Members |

---

# 📷 Attendance Routes

| Method | Endpoint           | Description               |
| ------ | ------------------ | ------------------------- |
| POST   | `/api/login/enter` | Scan QR & Mark Attendance |

---

# 🔒 Security Features

* JWT Authentication
* HTTP Only Cookies
* Secure Password Hashing
* Protected Routes
* Gym-Based User Isolation
* Cookie Security Configuration

---

# 📱 QR Code System

## QR Generation

QR codes are generated during:

* Admin Registration
* Admin Login

---

## QR Scanning

Users can:

* Scan using camera
* Upload QR image from gallery

---

# 📊 Attendance Logic

## Entry

If user is OUTSIDE:

* Entry time gets recorded
* Status becomes `INSIDE`

---

## Exit

If user is already INSIDE:

* Exit time gets recorded
* Status becomes `OUTSIDE`

---

# 🎨 UI Highlights

* Premium Dark Green Theme
* Glassmorphism Design
* Mobile Responsive Layout
* Smooth Animations
* Interactive QR Scanner Interface

---

# 🌟 Future Improvements

* Live Attendance Dashboard
* AI-Based Fraud Detection
* Membership Plans
* Online Payments
* Socket.io Real-Time Updates
* Face Recognition Attendance
* Workout Tracking
* Diet Planner Integration

---

# 👨‍💻 Developer

**Anand Raj**
** Saksham **

Passionate Full Stack Developer focused on building scalable and modern web applications.

---

# 📄 License

This project is licensed under the MIT License.

---

# ⭐ Support

If you liked this project, consider giving it a ⭐ on GitHub.

