# API Documentation

## Authentication

### Register
- **POST** `/api/auth/register`
- **Body**:
  ```json
  {
    "email": "string (valid email format)",
    "password": "string (min 6 characters)",
    "firstName": "string",
    "lastName": "string",
    "address": {
      "street": "string",
      "houseNo": "string",
      "city": "string"
    },
    "workAddress": {
      "street": "string",
      "houseNo": "string",
      "city": "string"
    },
    "phone": "string (Israeli format)",
    "comments": "string"
  }
  ```
- **Response**:
  ```json
  {
    "success": true,
    "token": "string",
    "user": {
      "id": "string",
      "email": "string",
      "firstName": "string",
      "lastName": "string",
      "role": "admin" | "volunteer",
      "address": {
        "street": "string",
        "houseNo": "string",
        "city": "string"
      },
      "workAddress": {
        "street": "string",
        "houseNo": "string",
        "city": "string"
      },
      "phone": "string",
      "comments": "string"
    }
  }
  ```

### Login
- **POST** `/api/auth/login`
- **Body**:
  ```json
  {
    "email": "string",
    "password": "string"
  }
  ```
- **Response**:
  ```json
  {
    "success": true,
    "token": "string",
    "user": {
      "id": "string",
      "email": "string",
      "firstName": "string",
      "lastName": "string",
      "role": "admin" | "volunteer",
      "address": {
        "street": "string",
        "houseNo": "string",
        "city": "string"
      },
      "workAddress": {
        "street": "string",
        "houseNo": "string",
        "city": "string"
      },
      "phone": "string",
      "comments": "string",
      "lastLogin": "date"
    }
  }
  ```

### Get Current User
- **GET** `/api/auth/me`
- **Headers**: `Authorization: Bearer <token>`
- **Response**:
  ```json
  {
    "success": true,
    "user": {
      "id": "string",
      "email": "string",
      "firstName": "string",
      "lastName": "string",
      "role": "admin" | "volunteer",
      "status": "active" | "inactive",
      "address": {
        "street": "string",
        "houseNo": "string",
        "city": "string"
      },
      "workAddress": {
        "street": "string",
        "houseNo": "string",
        "city": "string"
      },
      "phone": "string",
      "comments": "string",
      "lastLogin": "date",
      "createdAt": "date",
      "updatedAt": "date"
    }
  }
  ```

## Elderly Management

### Get All Elderly
- **GET** `/api/elderly`
- **Response**:
  ```json
  {
    "success": true,
    "data": [
      {
        "id": "string",
        "firstName": "string",
        "lastName": "string",
        "address": {
          "street": "string",
          "city": "string",
          "coordinates": [longitude, latitude]
        },
        "contactInfo": {
          "phone": "string",
          "emergencyContact": "string"
        },
        "medicalInformation": "string",
        "status": "green" | "yellow" | "red",
        "notes": "string",
        "comments": "string",
        "createdAt": "date",
        "updatedAt": "date"
      }
    ]
  }
  ```

### Get Elderly by ID
- **GET** `/api/elderly/:id`
- **Response**: Single elderly object

### Get Elderly by Status
- **GET** `/api/elderly/status/:status`
- **Status Values**: "green", "yellow", "red"

### Create Elderly (Admin Only)
- **POST** `/api/elderly`
- **Headers**: `Authorization: Bearer <token>`
- **Body**:
  ```json
  {
    "firstName": "string",
    "lastName": "string",
    "address": {
      "street": "string",
      "city": "string",
      "coordinates": [longitude, latitude]
    },
    "contactInfo": {
      "phone": "string",
      "emergencyContact": "string"
    },
    "medicalInformation": "string",
    "status": "green" | "yellow" | "red",
    "notes": "string",
    "comments": "string"
  }
  ```

### Update Elderly (Admin Only)
- **PUT** `/api/elderly/:id`
- **Headers**: `Authorization: Bearer <token>`
- **Body**: Updated elderly object

### Update Status (Admin Only)
- **PUT** `/api/elderly/:id/status`
- **Headers**: `Authorization: Bearer <token>`
- **Body**:
  ```json
  {
    "status": "green" | "yellow" | "red"
  }
  ```

### Delete Elderly (Admin Only)
- **DELETE** `/api/elderly/:id`
- **Headers**: `Authorization: Bearer <token>`

## Volunteer Management

### Get All Volunteers
- **GET** `/api/volunteers`
- **Response**:
  ```json
  [
    {
      "_id": "string",
      "user": {
        "id": "string",
        "email": "string",
        "firstName": "string",
        "lastName": "string",
        "role": "volunteer"
      },
      "address": {
        "street": "string",
        "houseNo": "string",
        "city": "string"
      },
      "phone": "string",
      "comments": "string",
      "createdAt": "date",
      "updatedAt": "date"
    }
  ]
  ```

### Get Volunteer by ID
- **GET** `/api/volunteers/:id`
- **Response**: Single volunteer object

### Create Volunteer (Admin Only)
- **POST** `/api/volunteers`
- **Headers**: `Authorization: Bearer <token>`
- **Body**:
  ```json
  {
    "email": "string",
    "password": "string",
    "firstName": "string",
    "lastName": "string",
    "address": {
      "street": "string",
      "houseNo": "string",
      "city": "string"
    },
    "phone": "string",
    "comments": "string"
  }
  ```

### Update Volunteer (Admin Only)
- **PUT** `/api/volunteers/:id`
- **Headers**: `Authorization: Bearer <token>`
- **Body**: Updated volunteer object

### Delete Volunteer (Admin Only)
- **DELETE** `/api/volunteers/:id`
- **Headers**: `Authorization: Bearer <token>`

## Status Colors
- Green: Normal status
- Yellow: Needs attention
- Red: Urgent attention required

## Error Responses
All error responses follow this format:
```json
{
  "success": false,
  "message": "Error message in Hebrew",
  "error": "Detailed error (only in development)"
}
```

## Status Codes
- 200: Success
- 201: Created
- 400: Bad Request
- 401: Unauthorized
- 403: Forbidden
- 404: Not Found
- 500: Server Error

## Validation Rules
1. Email:
   - Required
   - Valid email format
   - Unique
   - Lowercase
   - Trimmed

2. Password:
   - Required
   - Minimum 6 characters

3. Phone (Israeli format):
   - Required
   - Format: 0[2-9] followed by 7-8 digits

4. Address:
   - Required
   - Contains street, houseNo, and city

5. Work Address:
   - Optional
   - Contains street, houseNo, and city

## Security
1. All protected routes require JWT token in Authorization header
2. Tokens expire after 1 day
3. Passwords are hashed using bcrypt
4. Error details are only shown in development environment

## Required Frontend Implementation
1. Authentication:
   - Login form
   - Registration form (admin only)
   - Token storage and management
   - Protected route handling

2. Elderly Management:
   - Elderly list view
   - Elderly details view
   - Status color indicators
   - Map integration for coordinates
   - Admin controls for CRUD operations
   - Medical information display
   - Comments section

3. Volunteer Management:
   - Volunteer list view
   - Volunteer details view
   - Address information display
   - Phone and comments sections
   - Admin controls for CRUD operations

4. Status Management:
   - Status color coding
   - Status update interface (admin only)
   - Status filtering

5. Map Integration:
   - Display elderly locations
   - Color-coded markers based on status
   - Click handlers for details 