# Captain Module

This module handles the operations related to the `Captain` entity, including registration, login, authentication, and management of captains and their vehicles.

---

## Features

1. **Captain Registration**
   - Validates input data.
   - Hashes passwords before saving to the database.
   - Stores captain details along with associated vehicle information.

2. **Captain Login**
   - Authenticates captains using email and password.
   - Issues a JWT token for authenticated sessions.

3. **Profile Management**
   - Retrieves the captain's profile.

4. **Logout**
   - Clears the token and blacklists it.

5. **Authentication Middleware**
   - Validates the authenticity of the JWT token.
   - Ensures requests are made by authorized captains.

---

## Schema Definition

The `Captain` schema is defined in `models/captain.model.js`:

### Schema Structure
```javascript
const captainSchema = mongoose.Schema({
    fullname: {
        firstname: {
            type: String,
            required: true,
            minlength: [3, 'Firstname must be at least 3 characters long']
        },
        lastname: {
            type: String,
            minlength: [3, 'Lastname must be at least 3 characters long']
        },
    },
    email: {
        type: String,
        required: true,
        unique: true,
        minlength: [5, 'Email must be at least 5 characters long']
    },
    password: {
        type: String,
        required: true,
        select: false
    },
    socketID: {
        type: String
    },
    status: {
        type: String,
        enum: ['active', 'inactive'],
        default: 'inactive',
    },
    vehicle: {
        color: {
            type: String,
            required: true,
            minlength: [3, 'Color must be at least 3 characters long']
        },
        plate: {
            type: String,
            required: true,
            minlength: [6, 'Plate Number must be at least 6 characters long']
        },
        capacity: {
            type: String,
            min: [1, 'Capacity must be at least one'],
            required: true,
        },
        vehicleType: {
            type: String,
            required: true,
            enum: ['car', 'bike', 'auto']
        },
        location: {
            ltd: {
                type: Number,
            },
            lng: {
                type: Number
            }
        }
    }
});
```

### Methods and Static Functions
- **`generateAuthToken`**: Generates a JWT token for the captain.
- **`comparePassword`**: Compares a plain-text password with the hashed password.
- **`hashedPassword`**: Hashes a plain-text password.

---

## Endpoints

### 1. Register Captain
**POST** `/api/captains/register`

**Request Body:**
```json
{
  "fullname": {
    "firstname": "John",
    "lastname": "Doe"
  },
  "email": "john.doe@example.com",
  "password": "securePassword",
  "vehicle": {
    "color": "Red",
    "plate": "ABC1234",
    "capacity": "4",
    "vehicleType": "car"
  }
}
```

**Validations:**
- First name must be at least 3 characters.
- Email must be valid.
- Password must be at least 6 characters.
- Vehicle details must conform to schema validations.

**Response:**
- **201**: Success with generated token and captain details.
  ```json
  {
    "message": "Registration successful",
    "data": {
      "id": "captainId123",
      "fullname": {
        "firstname": "John",
        "lastname": "Doe"
      },
      "email": "john.doe@example.com",
      "vehicle": {
        "color": "Red",
        "plate": "ABC1234",
        "capacity": "4",
        "vehicleType": "car"
      }
    },
    "token": "jwtTokenHere"
  }
  ```
- **400**: Errors in input validation or if captain already exists.
  ```json
  {
    "error": "Captain already exists"
  }
  ```

---

### 2. Login Captain
**POST** `/api/captains/login`

**Request Body:**
```json
{
  "email": "john.doe@example.com",
  "password": "securePassword"
}
```

**Response:**
- **200**: Success with generated token.
  ```json
  {
    "message": "Login successful",
    "token": "jwtTokenHere"
  }
  ```
- **401**: Invalid email or password.
  ```json
  {
    "error": "Invalid email or password"
  }
  ```

---

### 3. Get Captain Profile
**GET** `/api/captains/profile`

**Headers:**
- Authorization: Bearer `<token>`

**Response:**
- **200**: Success with captain details.
  ```json
  {
    "id": "captainId123",
    "fullname": {
      "firstname": "John",
      "lastname": "Doe"
    },
    "email": "john.doe@example.com",
    "vehicle": {
      "color": "Red",
      "plate": "ABC1234",
      "capacity": "4",
      "vehicleType": "car"
    }
  }
  ```
- **401**: Unauthorized access.
  ```json
  {
    "error": "Unauthorized"
  }
  ```

---

### 4. Logout Captain
**GET** `/api/captains/logout`

**Headers:**
- Authorization: Bearer `<token>`

**Response:**
- **200**: Success with logout confirmation.
  ```json
  {
    "message": "Logout successful"
  }
  ```
- **401**: Unauthorized access.
  ```json
  {
    "error": "Unauthorized"
  }
  ```

---

## Middleware

### Authentication Middleware
Located in `middlewares/auth.middleware.js`, the middleware:
- Validates the presence of a JWT token in cookies or headers.
- Verifies the token and ensures it's not blacklisted.
- Attaches the captain or user data to the request object for authorized access.

---

## Services

### Create Captain
Located in `services/captain.service.js`, this function creates a new captain with the provided data. It ensures that all required fields are filled and hashes the password before saving.

```javascript
module.exports.createCaptain = async ({
    firstname, lastname, email, password, color, plate, capacity, vehicleType
}) => {
    const captain = captainModel.create({
        fullname: { firstname, lastname },
        email,
        password,
        vehicle: { color, plate, capacity, vehicleType }
    });

    return captain;
};
```

