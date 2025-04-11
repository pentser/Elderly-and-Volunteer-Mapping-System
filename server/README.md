# Backend Documentation

## Overview

The backend of the Elderly and Volunteer Mapping System is built using Node.js, Express, and MongoDB. It provides a RESTful API for the frontend application and handles all the business logic, data persistence, and security.

## Directory Structure

```
server/
├── models/            # Database models and schemas
│   ├── elderly.js     # Elderly person model
│   ├── volunteer.js   # Volunteer model
│   ├── visit.js       # Visit tracking model
│   └── user.js        # User authentication model
├── routes/            # API route handlers
│   ├── auth.js        # Authentication routes
│   ├── elderly.js     # Elderly management routes
│   ├── volunteer.js   # Volunteer management routes
│   └── visits.js      # Visit tracking routes
├── middleware/        # Custom middleware
│   ├── auth.js        # Authentication middleware
│   └── role.js        # Role-based authorization
├── config/            # Configuration files
│   └── db.js          # Database configuration
└── server.js          # Server entry point
```

## API Endpoints

### Authentication

- `POST /api/auth/login`
  - Description: User login
  - Request Body: { email, password }
  - Response: { token, user }

- `POST /api/auth/register`
  - Description: User registration
  - Request Body: { email, password, firstName, lastName, role }
  - Response: { token, user }

### Elderly Management

- `GET /api/elderly`
  - Description: Get all elderly people
  - Response: Array of elderly objects with status colors (gray, green, yellow, red)

- `POST /api/elderly`
  - Description: Create new elderly profile
  - Request Body: Elderly profile data
  - Response: Created elderly object

- `PUT /api/elderly/:id/status`
  - Description: Update elderly status
  - Request Body: { status: 'gray' | 'green' | 'yellow' | 'red' }
  - Response: Updated elderly object

### Volunteer Management

- `GET /api/volunteers`
  - Description: Get all volunteers
  - Response: Array of volunteer objects

- `POST /api/volunteers`
  - Description: Create new volunteer profile
  - Request Body: Volunteer profile data
  - Response: Created volunteer object

### Visit Tracking

- `GET /api/visits`
  - Description: Get all visits
  - Response: Array of visit objects

- `POST /api/visits`
  - Description: Create new visit record
  - Request Body: Visit data
  - Response: Created visit object

### Dashboard

- `GET /api/dashboard/stats`
  - Description: Get dashboard statistics
  - Access: Admin only
  - Response: {
    totalElderly: Number,
    totalVolunteers: Number,
    statusCounts: {
      gray: Number,
      green: Number,
      yellow: Number,
      red: Number
    },
    recentVisits: Array
  }

## Database Models

### User Model
```javascript
{
  email: String,
  password: String,
  firstName: String,
  lastName: String,
  role: String, // 'admin', 'volunteer'
  status: String // 'active', 'inactive'
}
```

### Elderly Model
```javascript
{
  firstName: String,
  lastName: String,
  address: {
    street: String,
    city: String,
    coordinates: [Number] // [longitude, latitude]
  },
  contactInfo: {
    phone: String,
    emergencyContact: String
  },
  status: String // 'gray', 'green', 'yellow', 'red'
}
```

### Volunteer Model
```javascript
{
  user: ObjectId, // Reference to User model
  availability: [String], // Days available
  preferredAreas: [String],
  currentLocation: {
    coordinates: [Number] // [longitude, latitude]
  }
}
```

### Visit Model
```javascript
{
  elderly: ObjectId, // Reference to Elderly model
  volunteer: ObjectId, // Reference to Volunteer model
  date: Date,
  duration: Number,
  notes: String,
  status: String // 'completed', 'scheduled', 'cancelled'
}
```

## Environment Variables

Create a `.env` file in the server directory with the following variables:

```
PORT=5000
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/database
JWT_SECRET=your-secret-key
```

## Error Handling

The backend uses a consistent error handling format:

```javascript
{
  success: false,
  message: "Error message",
  error: "Detailed error information (in development)"
}
```

## Security Measures

1. **Authentication**
   - JWT token-based authentication
   - Password hashing with bcrypt
   - Token expiration

2. **Authorization**
   - Role-based access control (Admin and Volunteer roles)
   - Admin has full access to all features
   - Volunteers have limited access based on their permissions
   - Route protection middleware

3. **Data Validation**
   - Input sanitization
   - Schema validation
   - Request body validation

## Development Guidelines

1. **Code Style**
   - Use meaningful variable names
   - Add comments for complex logic
   - Follow consistent indentation

2. **Error Handling**
   - Use try-catch blocks
   - Log errors appropriately
   - Return meaningful error messages

3. **Testing**
   - Test API endpoints
   - Verify error handling
   - Check security measures

## Deployment

1. **Prerequisites**
   - Node.js environment
   - MongoDB database
   - Environment variables

2. **Steps**
   - Install dependencies
   - Configure environment
   - Start the server

## Troubleshooting

Common issues and solutions:

1. **Database Connection**
   - Check MongoDB URI
   - Verify network access
   - Check database credentials

2. **Authentication**
   - Verify JWT secret
   - Check token expiration
   - Validate user credentials

3. **API Errors**
   - Check request format
   - Verify required fields
   - Validate data types