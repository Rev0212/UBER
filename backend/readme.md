
# BACKEND API Endpoints Documentation

## User API Endpoints

## Overview

This API provides functionality for user registration and authentication. It includes the following endpoints:

- **POST /user/register**: Allows a new user to register
- **POST /user/login**: Allows user to log in
- **GET /user/profile**: Retrieves user profile
- **GET /user/logout**: Logs out the user

### Technologies Used

- **Node.js**
- **Express.js**
- **Mongoose** (MongoDB ODM)
- **bcrypt** (for password hashing)
- **jsonwebtoken** (for token generation)
- **express-validator** (for request validation)

---

## API Endpoints

### 1. **POST /user/register**

Registers a new user.

#### **Request**

**URL:** `/user/register`

**Method:** POST

**Headers:**

```json
{
  "Content-Type": "application/json"
}
```

**Body Parameters:**

```json
{
  "fullname": {
    "firstname": "string (min: 3 characters, required)",
    "lastname": "string (optional, min: 3 characters)"
  },
  "email": "string (valid email format, required)",
  "password": "string (min: 6 characters, required)"
}
```

**Example:**

```json
{
  "fullname": {
    "firstname": "John",
    "lastname": "Doe"
  },
  "email": "john.doe@example.com",
  "password": "securepassword123"
}
```

#### **Response**

**Success (201 Created):**

```json
{
  "token": "string (JWT token)",
  "user": {
    "_id": "string",
    "fullname": {
      "firstname": "string",
      "lastname": "string"
    },
    "email": "string",
    "socketID": "string (if available)"
  }
}
```

**Example:**

```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "_id": "63f9e1241d4c1e0014d8b0d9",
    "fullname": {
      "firstname": "John",
      "lastname": "Doe"
    },
    "email": "john.doe@example.com",
    "socketID": ""
  }
}
```

**Error (400 Bad Request):**

```json
{
  "errors": [
    {
      "msg": "Invalid Email",
      "param": "email",
      "location": "body"
    },
    {
      "msg": "First name must be at least 3 char long",
      "param": "fullname.firstname",
      "location": "body"
    }
  ]
}
```

### 2. **POST /user/login**

Authenticates a user and generates a JWT token.

#### **Request**

**URL:** `/user/login`

**Method:** POST

**Headers:**

```json
{
  "Content-Type": "application/json"
}
```

**Body Parameters:**

```json
{
  "email": "string (valid email format)",
  "password": "string"
}
```

**Example:**

```json
{
  "email": "john.doe@example.com",
  "password": "securepassword123"
}
```

#### **Response**

**Success (200 OK):**

```json
{
  "token": "string (JWT token)",
  "user": {
    "_id": "string",
    "fullname": {
      "firstname": "string",
      "lastname": "string"
    },
    "email": "string"
  }
}
```

### 3. **GET /user/profile**

Retrieves the authenticated user's profile.

#### **Request**

**URL:** `/user/profile`

**Method:** GET

**Headers:**
- Authorization: Bearer [JWT Token]

#### **Response**

**Success (200 OK):**

```json
{
  "_id": "string",
  "fullname": {
    "firstname": "string",
    "lastname": "string"
  },
  "email": "string"
}
```

### 4. **GET /user/logout**

Logs out the authenticated user.

#### **Request**

**URL:** `/user/logout`

**Method:** GET

**Headers:**
- Authorization: Bearer [JWT Token]

#### **Response**

**Success (200 OK):**

```json
{
  "message": "Logged out"
}
```

---

## Validation Rules

- `email`: Must be in valid email format
- `fullname.firstname`: Must be a string with at least 3 characters
- `password`: Must be a string with at least 6 characters

---

## Internal Modules and Functions

### **Controller (user.controllers.js)**

- **registerUser**: Handles user registration logic, including validation, password hashing, and token generation
- **loginUser**: Authenticates user and generates JWT token
- **getUserProfile**: Retrieves authenticated user's profile
- **logoutUser**: Invalidates user's current token

### **Model (user.model.js)**

- Schema definition for the `User` model, including methods:
  - `generateAuthToken`: Generates a JWT for the user
  - `comparePassword`: Compares plain text and hashed passwords
  - `hashedPassword`: Hashes a given password

### **Service (user.service.js)**

- **createUser**: Creates a new user in the database, ensuring all required fields are provided

---

## Setup and Environment Variables

Ensure the following environment variables are set:

- `JWT_SECRET`: Used to sign JWT tokens
- `MONGO_URI`: MongoDB connection string

---

## Error Handling

Errors are returned as JSON objects with a status code and message:

**Validation Error (400):**

```json
{
  "errors": [
    {
      "msg": "Password must be at least 6 characters long",
      "param": "password",
      "location": "body"
    }
  ]
}
```

**Authentication Error (401):**

```json
{
  "message": "Invalid email or password"
}
```

**Server Error (500):**

```json
{
  "error": "Internal Server Error"
}
```