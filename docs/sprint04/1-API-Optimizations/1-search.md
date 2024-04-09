# Search in a REST API

```http
GET /products?term=iphone
```

## Introduction

In this document, we will discuss the importance of search functionality in REST APIs and how it can be implemented to optimize the performance of your API.

## Why is search important?

Search functionality is a common requirement in many applications. It allows users to find specific information quickly and efficiently. Without search functionality, users would have to manually browse through large datasets to find the information they need.

Imagine a scenario where a user wants to find a specific product in an e-commerce application. Without search functionality, the user would have to scroll through all the products to find the one they are looking for. This can be time-consuming and frustrating for the user.

## How does search work?

Search functionality in REST APIs allows users to query the API for specific information based on search criteria. The API processes the search query and returns the relevant results to the user.

## Implementing search in Express.js

In Express.js applications, you can implement search functionality using query parameters. Here's an example of how you can implement search in an endpoint:


### Simple search case

```javascript

app.get('/products', (req, res) => {
  // common query parameters for search: query, q, search, term,...
  const { term } = req.query;

  // Fetch products from the database based on the search query
  const products = Products.find({
    where: {
      title: {
        [Op.like]: `%${term}%`,
      },
    },
  });

  res.json(products);
});

```

### Advanced search case where we can filter by multiple fields

```javascript

app.get('/products', (req, res) => {
  // common query parameters for search: query, q, search, term,...
  const { term } = req.query;


  const products = Products.find({
   where = {
        [Op.or]: [
            { name: { [Op.like]: `%${term}%` } },
            { description: { [Op.like]: `%${term}%` } }
        ]
    }
  });

  res.json(products);
});

```