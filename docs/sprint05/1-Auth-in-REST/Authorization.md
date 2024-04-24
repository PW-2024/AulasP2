# Authorization in REST APIs

## Introduction

Authorization is a critical component in securing REST APIs, ensuring that users have the correct permissions to access or perform actions on resources. Role-Based Access Control (RBAC) is widely used for efficient permission management across diverse systems.

## Role-Based Access Control (RBAC)

RBAC governs access to resources based on the roles assigned to users. Each role is associated with a set of permissions that define allowable actions on resources. This approach streamlines access management and restricts users to operations essential for their role.

### Example in Express.js

The following Express.js application demonstrates a practical implementation of RBAC:

```javascript
const express = require('express');
const jwt = require('jsonwebtoken');

const app = express();

const users = [
  { id: 1, name: 'Alice', role: 'admin' },
  { id: 2, name: 'Bob', role: 'user' },
];

// Middleware to authenticate and populate req.user with user data
app.use((req, res, next) => {
  const token = req.headers['Authorization']?.split(' ')[1];
  if (token) {
    try {
      const decoded = jwt.verify(token, 'your_secret_key');
      req.user = users.find(user => user.id === decoded.id);
      next();
    } catch (error) {
      return res.status(403).json({ message: 'Invalid token' });
    }
  } else {
    return res.status(401).json({ message: 'No token provided' });
  }
});

// Authentication middleware
const authenticate = (req, res, next) => {
  if (!req.user) {
    return res.status(401).json({ message: 'Unauthorized' });
  }
  next();
};

// Role checking middleware to enforce access control
const roleCheck = (role) => {
  return (req, res, next) => {

    if(!req.user) return res.status(401).json({ message: 'Unauthorized' };

    if (req.user.role === role) {
      next();
    } else {
      return res.status(403).json({ message: 'Access denied' });
    }
  };
};

app.get('/admin-protected-route', authMiddleware, roleCheck('admin'), (req, res) => {
  res.json(users);
});

app.listen(3000, () => {
  console.log('Server running on port 3000');
});
```

This setup validates user tokens and applies role-based access control, restricting the `/users` endpoint to administrators.

### Using Custom Middleware

Custom middleware can streamline the enforcement of role-based access:

```javascript
const checkRole = role => (req, res, next) => {
  if (req.user.role !== role) {
    return res.status(403).json({ message: 'Access denied' });
  }
  next();
};

app.get('/users', authenticate, checkRole('admin'), (req, res) => {
  res.json(users);
});
```

This modular approach allows easy integration and reuse of authorization checks across multiple routes.

### Using a Library

For more complex scenarios, the `express-jwt-permissions` library offers a robust solution for implementing RBAC:

```javascript
const express = require('express');
const guard = require('express-jwt-permissions')();

const app = express();

app.get('/approve-product', guard.check(['approve-product']), (req, res) => {
  res.json(users);
});

app.listen(3000, () => {
  console.log('Server running on port 3000');
});
```

The library simplifies permission checks, verifying if the user's JWT contains the required roles before granting access to specific endpoints.

## Conclusion

RBAC is an efficient and secure method to manage permissions in REST APIs. By assigning roles to users and permissions to roles, it ensures that access is appropriately restricted. With the integration of specialized libraries, implementing RBAC in Express.js applications can be significantly simplified, enhancing security and manageability.