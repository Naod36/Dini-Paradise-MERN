# Dini Paradise - Restaurant Landing Page

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
   MONGODB_URI=mongodb+srv://naodk36_db_user:<db_password>@cluster0.wel508t.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0


   NODE_ENV=development
   ```

3. **Start MongoDB** service (if running locally)

## 🔧 Available Scripts

### Root Level

- `npm run dev` - Start both frontend and backend in development mode
- `npm run server` - Start only the backend server
- `npm run client` - Start only the frontend client
- `npm run build` - Build the frontend for production
- `npm start` - Start the backend in production mode
- `npm run install-all` - Install all dependencies

### Backend (server/)

- `npm start` - Start the server
- `npm run dev` - Start the server with nodemon (auto-restart)

### Frontend (client/)

- `npm run dev` - Start Vite development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 🚨 Troubleshooting

### Node.js Version Issues

If you encounter Node.js version warnings, consider upgrading to Node.js 20.19+ or 22.12+.

### MongoDB Connection Issues

- Ensure MongoDB is running locally, or
- Update the `MONGODB_URI` in your `.env` file to point to your MongoDB instance
- The application will still run without MongoDB, but database features won't work

### Tailwind CSS Issues

If Tailwind styles aren't loading:

1. Ensure `@tailwindcss/postcss` is installed
2. Check that `postcss.config.js` is properly configured
3. Verify `tailwind.config.js` content paths

## 📝 Next Steps

To extend this application, consider adding:

1. **Menu Management**: CRUD operations for menu items
2. **Reservation System**: Table booking functionality
3. **User Authentication**: Customer accounts and login
4. **Payment Integration**: Online ordering and payments
5. **Admin Dashboard**: Content management system
6. **Image Upload**: Photo galleries and menu images

## 📄 License

This project is licensed under the ISC License.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

---

**Happy coding! 🍽️✨**
=======
>>>>>>> f502a8653b903797caad2a904a1ef771c89443b5
