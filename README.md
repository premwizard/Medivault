# MedVault

A secure medical records management application that allows users to safely store, manage, and share their health documents and medical records.

## Features

- **User Authentication**: Secure JWT-based authentication with bcryptjs password hashing
- **Medical Records Management**: Create, read, update, and delete medical records with file attachments
- **Privacy Controls**: Mark records as public or private
- **File Upload Support**: Attach documents and images to medical records
- **Rate Limiting**: Built-in protection against brute force and abuse
- **Security Headers**: Helmet.js for enhanced HTTP security
- **CORS Support**: Configured for both local development and production deployments
- **Responsive UI**: Modern React frontend with intuitive navigation
- **Data Visualization**: Charts to visualize health records over time

## Tech Stack

### Backend
- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JWT (JSON Web Tokens) + bcryptjs
- **Security**: Helmet.js, CORS, Rate Limiting, Input Validation

### Frontend
- **Library**: React 19+
- **Routing**: React Router DOM v7
- **HTTP Client**: Axios
- **Visualization**: Chart.js with react-chartjs-2
- **Styling**: CSS

## Getting Started

### Prerequisites
- Node.js (v14 or higher)
- MongoDB database
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/medvault.git
   cd medvault
   ```

2. **Install backend dependencies**
   ```bash
   cd backend
   npm install
   ```

3. **Install frontend dependencies**
   ```bash
   cd ../frontend
   npm install
   ```

### Configuration

1. **Create a `.env` file in the backend directory**
   ```
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret_key
   PORT=5000
   NODE_ENV=development
   ```

2. **Configure CORS origins** (in `backend/server.js`)
   - Update the CORS origins array with your frontend URL
   - Default: `http://localhost:3000` and production frontend URL

### Running the Application

1. **Start the backend server**
   ```bash
   cd backend
   npm start
   ```
   The server will run on `http://localhost:5000`

2. **Start the frontend (in a new terminal)**
   ```bash
   cd frontend
   npm start
   ```
   The frontend will open at `http://localhost:3000`

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user

### Records
- `GET /api/records` - Get all records
- `GET /api/records/:id` - Get a specific record
- `POST /api/records` - Create a new record
- `PUT /api/records/:id` - Update a record
- `DELETE /api/records/:id` - Delete a record

## Project Structure

```
medvault/
├── backend/
│   ├── controllers/        # Request handlers
│   ├── middleware/         # Custom middleware (auth, validation, error handling)
│   ├── models/             # MongoDB schemas
│   ├── routes/             # API route definitions
│   ├── utils/              # Utility functions
│   ├── uploads/            # File upload directory
│   ├── server.js           # Express server entry point
│   └── package.json
├── frontend/
│   ├── public/             # Static assets
│   ├── src/
│   │   ├── components/     # React components
│   │   ├── context/        # React context (auth state)
│   │   ├── images/         # Image assets
│   │   ├── App.js          # Main app component
│   │   └── index.js        # React entry point
│   └── package.json
└── package.json
```

## Security Features

- **Password Hashing**: Passwords hashed with bcryptjs
- **JWT Authentication**: Stateless authentication with JWT tokens
- **Input Validation**: Server-side validation of all inputs
- **Rate Limiting**: Protects against brute force attacks
- **CORS**: Configured origins for safe cross-origin requests
- **Security Headers**: Helmet.js implements security best practices
- **File Upload Handling**: Secure file upload with validation

## Development

### Available Scripts

**Backend:**
```bash
npm start    # Start the server
npm test     # Run tests
```

**Frontend:**
```bash
npm start    # Start development server
npm build    # Create production build
npm test     # Run tests
npm eject    # Eject from Create React App (irreversible)
```

## Deployment

### Backend Deployment
The backend can be deployed to any Node.js hosting service (Heroku, Railway, Vercel, AWS, etc.)

### Frontend Deployment
The frontend is configured for deployment to Vercel. Update the CORS origins in `backend/server.js` with your production URL.

## Error Handling

The application includes comprehensive error handling:
- Input validation middleware
- Custom error handler middleware
- User-friendly error responses
- Request logging for debugging

## Contributing

1. Create a new feature branch
2. Make your changes
3. Test thoroughly
4. Submit a pull request

## License

ISC

## Support

For issues or questions, please open an issue on the repository.
