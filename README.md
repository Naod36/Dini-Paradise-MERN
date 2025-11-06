# Dini Paradise - Restaurant Landing Page

[Demo](https://dini-paradise-frontend.onrender.com)

A beautiful restaurant landing page built with the MERN stack (MongoDB, Express.js, React, Node.js) and styled with Tailwind CSS.

## 🚀 Features

- **Modern Design**: Clean and responsive design with Tailwind CSS
- **MERN Stack**: Full-stack JavaScript application
- **Restaurant Theme**: Specifically designed for restaurant businesses
- **Responsive**: Mobile-first design that works on all devices
- **Fast Development**: Hot reload for both frontend and backend

<<<<<<< HEAD
## 📁 Project Structure

```
dini-paradise-mern/
├── client/                 # React frontend (Vite + Tailwind CSS)
│   ├── src/
│   │   ├── App.jsx        # Main React component
│   │   ├── index.css      # Tailwind CSS imports
│   │   └── main.jsx       # React entry point
│   ├── tailwind.config.js # Tailwind configuration
│   ├── postcss.config.js  # PostCSS configuration
│   └── package.json       # Frontend dependencies
├── server/                 # Express.js backend
│   ├── server.js          # Main server file
│   └── package.json       # Backend dependencies
├── package.json           # Root package.json with scripts
└── README.md             # This file
```

## 🛠️ Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (version 20.19+ or 22.12+ recommended)
- **npm** (comes with Node.js)
- **MongoDB** (optional - for full functionality)

## 📦 Installation

1. **Clone the repository** (if not already done):

   ```bash
   git clone <your-repo-url>
   cd "Dini Paradise MERN"
   ```

2. **Install all dependencies**:

   ```bash
   npm run install-all
   ```

   This will install dependencies for:

   - Root project (concurrently for running both servers)
   - Backend server (Express, Mongoose, CORS, dotenv)
   - Frontend client (React, Vite, Tailwind CSS)

## 🚀 Running the Application

### Development Mode (Recommended)

Run both frontend and backend simultaneously:

```bash
npm run dev
```

This will start:

- **Backend server** on `http://localhost:5000`
- **Frontend client** on `http://localhost:5173`

### Running Individual Services

**Backend only:**

```bash
npm run server
```

**Frontend only:**

```bash
npm run client
```

**Production build:**

```bash
npm run build
npm start
```

## 🌐 API Endpoints

The backend provides the following endpoints:

- `GET /` - Welcome message
- `GET /health` - Health check endpoint

## 🎨 Customization

### Colors

The project uses a custom color palette defined in `client/tailwind.config.js`:

- **Primary**: Orange/amber tones for warmth
- **Secondary**: Blue tones for contrast

### Fonts

- **Sans-serif**: Inter (for body text)
- **Serif**: Playfair Display (for headings)

### Contentmongodb:

Edit `client/src/App.jsx` to customize:

- Restaurant name and branding
- Menu items and descriptions
- Contact information
- Business hours

## 🗄️ Database Setup

The application is configured to connect to MongoDB. To set up:

1. **Install MongoDB** locally or use MongoDB Atlas (cloud)
2. **Create a `.env` file** in the `server/` directory:

   ```env
   PORT=5000
   MONGODB_URI=mongodb+srv

