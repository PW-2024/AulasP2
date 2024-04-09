# Optimizing API Responses:

## What is response normalization?

Response normalization in short is about making the API more readable and predictable for the client.

Response normalization is the process of transforming the response data from an API into a consistent and structured format. This ensures that the response data is easy to work with and understand for clients consuming the API.

In a REST API, response normalization typically involves formatting the data returned by the API endpoints in a consistent manner. This includes standardizing field names, data types, and structures across different endpoints.

## Why is response normalization important?

Response normalization is important for several reasons:

- **Consistency**: By normalizing the response data, you ensure that the API returns data in a consistent format. This makes it easier for clients to consume the API and work with the response data.

- **Predictability**: Clients can rely on the response data having a consistent structure, making it easier to parse and extract the information they need.

- **Simplicity**: Normalizing the response data simplifies the client-side code required to handle the API responses. Clients can expect a standard format for the data, reducing the complexity of the client-side logic.

- **Maintainability**: A normalized response format makes it easier to maintain and update the API over time. Changes to the data structure can be made consistently across all endpoints, reducing the risk of breaking client applications.

## Response metadata

In addition to the data returned by the API, response normalization often includes metadata that provides additional information about the response. This metadata can include details such as the status code, error messages, pagination information, and other relevant details.


## How to normalize responses in a REST API

```javascript
function error(message, statusCode = 500, errors = []) {
  return {
    message,
    code: statusCode,
    meta: {
      statusCode,
      error: true,
      errors,
      ...meta,
    },
  };
}

function success(data, statusCode = 200, meta = {}) {
  return {
    data,
    meta: {
      statusCode,
      error: false,
      ...meta,
    },
  };
}

app.get('/users', (req, res) => {
  const users = Users.findAll();
  res.json(success(users));
});

```

## Response patterns

### Success response in a normalized format with pagination information

```json
{
    "data": [
        {
            "id": 1,
            "name": "John Doe",
            "email": "john.doe@example.com"
        },
        {
            "id": 2,
            "name": "Jane Smith",
            "email": "jane.smith@example.com"
        }
    ],
    "meta": {
        "statusCode": 200,
        "error": false,
        "pagination": {
            "page": 1,
            "limit": 10,
            "total": 100
        }
    }
}
```

### Error response in a normalized format

```json
{
  "message": "Invalid request parameters",
  "code": 400,
  "meta": {
    "statusCode": 400,
    "error": true,
    "errors": [
      {
        "field": "email",
        "message": "Email is required",
      },
      {
        "field": "password",
        "message": "Password must be at least 6 characters",
      },
    ],
  }
}

```json
{
  "message": "Internal server error",
  "code": 500,
  "meta": {
    "statusCode": 500,
    "error": true,
    "errors": [],
  }
}
```
