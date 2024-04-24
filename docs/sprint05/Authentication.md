# Authentication in RESTful APIs

## But first, the /register endpoint for the API

Before having to deal with authentication, we need to have a way to register users in the system. This is done through the `/register` endpoint. The endpoint is a POST request that receives a JSON object with the following structure:

```json
{
    "username": "user",
    "password": "password"
}
```

In order to safeguard the passwords, they should be hashed before being stored in the database. The hashing algorithm used should be a secure one, such as bcrypt. The password should be hashed before being stored in the database.

### Simple example of how to hash a password using bcrypt

```javascript
const bcrypt = require('bcrypt');

const password = 'password';
const saltRounds = 10;

// register endpoint
bcrypt
  .hash(password, saltRounds)
  .then(hash => {
    console.log('Hash ', hash)
  })

// login endpoint
function validateUser(storedPasswordHash, insertedPassword) {
    bcrypt
        .compare(insertedPassword, storedPasswordHash)
        .then(res => {
            // handle Authentication
        })
        .catch(err => console.error(err.message))        
}

```

Bcrypt is a library that allows you to hash passwords using a secure algorithm. The `hash` function receives the password, the number of salt rounds, and a callback function. The callback function will receive an error if the hashing process fails, or the hashed password if it succeeds.

The number of salt rounds is a parameter that determines the complexity of the hashing algorithm. The higher the number of rounds, the more secure the hash will be, but it will also take longer to compute. A common value for the number of rounds is 10.

How bycrypt works is that it generates a random salt for each password, and then hashes the password with the salt. This way, even if two users have the same password, their hashes will be different.

## Introduction

This document explores various methods for authenticating users in RESTful APIs, detailing the implementation and security considerations for each authentication strategy.

## Stateless Nature of RESTful APIs

RESTful APIs are designed to be stateless, meaning the server does not retain any client state between requests. As such, each client request must include all necessary data for processing, including authentication details to verify the user's identity.

## User Authentication Overview

User authentication is crucial for any system requiring secure access to resources. This document outlines several common authentication methods used in RESTful APIs:

1. Basic Authentication
2. API Key Authentication
3. Token-based Authentication (Bearer Token)
4. Cookie-based Authentication (Session-based)

### Basic Authentication

Basic Authentication transmits credentials (username and password) with every request, typically encoded in base64. Due to the exposure of credentials in plain text, it should only be used over HTTPS to ensure encryption.

#### When to Use
- Internal, low-security APIs
- Non-sensitive data access
- Development and testing environments

#### Advantages
- Simple to implement
- Immediate compatibility with most HTTP clients

#### Disadvantages
- Low security, as credentials are easily exposed
- Not suitable for production environments with sensitive data

#### Implementation Guidelines
Include credentials in the HTTP `Authorization` header, encoded in base64. The server should decode and validate these credentials against its database or authentication service:

```http
GET /api/resource 
Host: example.com
Authorization: Basic dXNlcm5hbWU6cGFzc3dvcmQ=
```

Server-side pseudocode:

```javascript
const authHeader = req.headers.authorization;
const credentials = Buffer.from(authHeader.split(' ')[1], 'base64').toString().split(':');
const [username, password] = credentials;

if (username === storedUsername && password === storedPassword) {
    // User authenticated
} else {
    // Authentication failed, send 401 Unauthorized
}
```

### API Key Authentication

API Key Authentication uses a unique key provided to each user, offering a more secure alternative to basic authentication without requiring direct user credentials.

#### When to Use
- Public APIs
- Systems needing user-specific access without direct credentials

#### Advantages
- More secure than Basic Authentication
- Simplifies controlling and tracking API usage

#### Disadvantages
- Management overhead for API keys
- Potential security risks if keys are exposed

#### Implementation Guidelines
API keys can be sent as custom headers or query parameters. The server should validate each key against its database:

```http
GET /api/resource
Host: example.com
X-API-Key: your_api_key
```

Server-side pseudocode:

```javascript
const apiKey = req.headers['x-api-key'];
if (apiKey === storedApiKey) {
    // User authenticated
} else {
    // Authentication failed, send 401 Unauthorized
}
```

### Token-based Authentication (Bearer Token)

Token-based Authentication, particularly using JSON Web Tokens (JWT), offers a secure and scalable method to authenticate users and sessions.

#### When to Use
- Applications requiring high security
- Services providing stateless authentication

#### Advantages
- High security as tokens can encode user information and permissions
- Scalable and suitable for distributed systems

#### Disadvantages
- Complexity in token management and expiration
- Requires secure transmission mechanisms

#### Using JWT's for Token-based Authentication

JWTs are self-contained tokens that can encode user information and permissions. They consist of three parts: a header, payload, and signature. The server signs the token with a secret key to verify its authenticity.

#### Implementation Guidelines

1. **User Authentication**: After successful login, generate a JWT containing user information and permissions:

```javascript

const jwt = require('jsonwebtoken');

const generateAuthToken = (user) => {
  const payload = {
    id: user.id,
    email: user.email,
    role: user.role,
  };

  return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });
};

app.post('/login', (req, res) => {
  const { email, password } = req;

  const user = await UserModel.findByEmail(email);
  
  const isPwValid = await user.validatePassword(password);

  if (!isPwValid) throw UnauthorizedError();

  res.json(
    success(user, {
      token: generateAuthToken(user),
    })
  );
});

```

2. **Token Verification**: Middleware to verify the token before processing requests:

```javascript

const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
  const token = req.headers.authorization.split(' ')[1];

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) return res.status(401).json({ message: 'Unauthorized' });

    req.user = decoded;
    next();
  });
};

app.get('/api/resource', verifyToken, (req, res) => {
  res.json({ message: 'Protected Resource' });
});

```

### Cookie-based Authentication (Session-based)

Cookie-based Authentication manages sessions using tokens stored in cookies, ideal for applications where user sessions are common.

#### When to Use
- Web applications with user sessions
- Environments where persistent state is beneficial

#### Advantages
- Seamless integration with web browsers
- Enhanced security through HTTP-only and Secure flags in cookies

#### Disadvantages
- Vulnerability to cross-site request forgery (CSRF)
- Requires careful session management

#### Implementation Guidelines
Sessions are typically managed with middleware like `express-session` in Node.js. The session ID is stored in a cookie:

```http
GET /api/resource
Host: example.com
Cookie: sessionId=your_session_id
```

Server-side pseudocode using `express-session`:

```javascript
const express = require('express');
const session = require('express-session');
const User = require('./models/User');

app.use(session({
    secret: 'secret_key',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true, httpOnly: true }
}));

app.post('/login', (req, res) => {
    const { username, password } = req.body;

    const user = User.findByUsername(username);

    const isPwValid = await user.validatePassword(password);

    if (!isPwValid) throw UnauthorizedError();

    req.session.user = username;
    res.send('Logged in!');
});
```

## Conclusion

This document has detailed various authentication strategies for RESTful APIs, highlighting their usage scenarios, advantages, and implementation guidelines. The choice of authentication method depends on the specific security and operational requirements of each application.