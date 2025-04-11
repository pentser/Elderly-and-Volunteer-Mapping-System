# Elderly and Volunteer Mapping System

A system designed to connect lonely elderly people with nearby volunteers using geographic mapping.

## Project Overview

This project is a web application that facilitates the connection between elderly people and volunteers in their vicinity. The system uses geographic mapping to match volunteers with elderly individuals who need assistance or companionship.

### Key Features

- **User Management**
  - Admin, Coordinator, and Volunteer roles
  - Secure authentication system
  - Profile management

- **Elderly Management**
  - Registration and profile management
  - Visit tracking
  - Status monitoring

- **Volunteer Management**
  - Registration and profile management
  - Location tracking
  - Visit scheduling

- **Geographic Features**
  - Real-time location tracking
  - Proximity-based matching
  - Interactive maps

## Project Structure

```
project-root/
├── server/                 # Backend (Node.js/Express)
│   ├── models/            # Database models
│   ├── routes/            # API routes
│   ├── middleware/        # Custom middleware
│   ├── config/            # Configuration files
│   └── server.js          # Server entry point
└── client/                # Frontend (React)
    ├── src/               # Source files
    └── public/            # Static files
```

## Team Members

- Backend Developer: [Your Name]
- Frontend Developer: [Team Member Name]
- GIS Developer: [Team Member Name]

## Setup Instructions

### Prerequisites

- Node.js (v14 or higher)
- MongoDB (v4.4 or higher)
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone [repository-url]
   ```

2. Install dependencies:
   ```bash
   # Install backend dependencies
   cd server
   npm install

   # Install frontend dependencies
   cd ../client
   npm install
   ```

3. Configure environment variables:
   - Create `.env` file in server directory
   - Add required environment variables

4. Start the development servers:
   ```bash
   # Start backend server
   cd server
   npm run dev

   # Start frontend server
   cd ../client
   npm start
   ```

## API Documentation

The backend API documentation is available in the server/README.md file.

## Development Guidelines

- Follow the established coding standards
- Create feature branches for new developments
- Write meaningful commit messages
- Update documentation as needed
- Test changes before pushing to main branch

## Security Considerations

- All passwords are hashed using bcrypt
- JWT tokens for authentication
- Role-based access control
- Input validation and sanitization
- Rate limiting on API endpoints

## Error Handling

- Console logging for development
- Structured error responses
- Error tracking and monitoring

## License

This project is licensed under the MIT License - see the LICENSE file for details.
