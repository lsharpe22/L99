# AI Analytics Dashboard

A full-stack web application for tracking and visualizing AI innovation trends with JWT authentication and MySQL database.

## Features

- **JWT Authentication** - Secure login system
- **Dashboard** - AI developments summary with technical overview
- **Summary Page** - Bar chart showing AI innovations by type
- **Reports Page** - Line chart displaying monthly AI development trends
- **Protected Routes** - Authentication required for all pages
- **MySQL Database** - Hosted on Digital Ocean droplet

## Tech Stack

- **Backend**: Node.js, Express.js, MySQL, JWT, bcrypt
- **Frontend**: React.js, React Router, Chart.js
- **Database**: MySQL on Digital Ocean
- **Authentication**: JSON Web Tokens

## Setup

### Prerequisites
- Node.js installed
- Digital Ocean droplet with MySQL (see DATABASE_SETUP.md)

### Backend
```bash
cd backend
npm install
npm run dev
```
Server runs on http://localhost:5000

### Frontend
```bash
cd frontend
npm install
npm start
```
App runs on http://localhost:3000

## Login Credentials
- **Username**: lauren
- **Password**: lauren

## Database Setup
See `DATABASE_SETUP.md` for complete Digital Ocean MySQL setup instructions.

## API Endpoints
- `POST /api/login` - User authentication
- `GET /api/dashboard` - Dashboard data
- `GET /api/chart-data` - Bar chart data (AI innovations by type)
- `GET /api/trends-data` - Line chart data (monthly trends)

## Project Structure
```
L99/
├── backend/
│   ├── server.js          # Main server file
│   ├── auth.js            # JWT authentication
│   ├── db.js              # Database connection
│   └── package.json       # Backend dependencies
├── frontend/
│   ├── src/
│   │   ├── App.js         # Main app with routing
│   │   ├── Login.js       # Login component
│   │   ├── Dashboard.js   # Dashboard page
│   │   ├── Summary.js     # Bar chart page
│   │   ├── Reports.js     # Line chart page
│   │   └── Navigation.js  # Top menu
│   └── package.json       # Frontend dependencies
└── DATABASE_SETUP.md      # Database setup guide
```

## Data Sources
- [Simplilearn Generative AI News](https://www.simplilearn.com/generative-ai-news-article)
- [SD Times AI Updates](https://sdtimes.com/ai/september-2025-ai-updates-from-the-past-month/)