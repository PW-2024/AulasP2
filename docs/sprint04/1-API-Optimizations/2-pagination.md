# Pagination in REST API

```http
GET /products?offset=0&limit=10
```


## Introduction

In this document, we will discuss the importance of pagination in REST APIs and how it can be implemented to optimize the performance of your API.

## Why is pagination important?

When working with large datasets, it is common to have a large number of records returned by an API endpoint. Returning all records at once can lead to performance issues, such as slow response times and high memory usage.

Imagine fetching a list of 10,000 records from a database.

- The response would be large, which can lead to slow response times.
- The client may not need all 10,000 records at once, which can lead to unnecessary data transfer and mobile data usage.
- The server may run out of memory if it tries to load all 10,000 records into memory at once and process them.


## How does pagination work?

Pagination is a technique used to break down large datasets into smaller, more manageable chunks. Instead of returning all records at once, the API returns a subset of records along with metadata that indicates the total number of records and the current page.

## Types of pagination

There are two common types of pagination:

- **Offset-based pagination**: This type of pagination uses an offset and limit to determine which subset of records to return. For example, to fetch records 11-20, you would use an offset of 10 and a limit of 10.

```http	
GET /products?page=1&limit=10
```

- **Cursor-based pagination**: This type of pagination uses a cursor to determine the subset of records to return. The cursor is a unique identifier that points to a specific record in the dataset. For example, to fetch records after a specific record, you would use the cursor of that record.



```http
GET /products?lastId=10&limit=10
```

When to use offset-based pagination:
- When the dataset has a stable order.
- When you need to jump to a specific page.

When to use cursor-based pagination:
- When the dataset is frequently updated.
- When you need to fetch records after a specific record.

## Implementing pagination in Express.js

In Express.js applications, you can implement pagination using query parameters. Here's an example of how you can implement offset-based pagination:


### Offset-based pagination

```javascript

app.get('/users', (req, res) => {
  const { page = 1, limit = 10 } = req.query;
  
  // if the limit is 10 then if we are in the 3rd page we should skip 20 records
  const offset = (page - 1) * limit;

  // page 1: offset = 0, limit = 10
  // page 2: offset = 10, limit = 10

  // Fetch records from the database using the offset and limit
  const users = Users.findAll({ offset, limit });

  res.json({
    users,
    page,
    limit,
  });
});

```

### Cursor-based pagination

```javascript
app.get('/users', (req, res) => {
  const { lastId, limit = 10 } = req.query;

  // Fetch records from the database using the cursor and limit
  const cursor = lastId || 0;
    return await User.findAll({
        limit: limit
        where: {
            id: {
                [Op.gt]: cursor
            }
        }
    });
});
```

## Client side techniques

- Paginated pages
- Infinite scrolling
- Load more button

