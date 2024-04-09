# Filtering and Sorting in a REST API

In this document, we will discuss the importance of filtering and sorting in REST APIs and how they can be implemented to optimize the performance of your API.

## Why are filtering and sorting important?

When working with large datasets, it is common to have a large number of records returned by an API endpoint. Filtering and sorting allow users to narrow down the results to only the data they need and to order the results in a specific way.

Imagine fetching a list of products from an e-commerce application.

- The user may want to filter the products by category, price range, or availability.

- The user may want to sort the products by price, rating, or popularity.

By providing filtering and sorting options, you can improve the user experience and make it easier for users to find the information they need.


## Filtering

### How does filtering work?

Filtering in REST APIs allows users to query the API for specific information based on filter criteria. The API processes the filter query and returns the relevant results to the user.

### Implementing filtering in Express.js

In Express.js applications, you can implement filtering using query parameters. Here's an example of how you can implement filtering in an endpoint:

#### Filtering by category

```javascript
app.get('/products', (req, res) => {
  const { category } = req.query;

  // Fetch products from the database based on the category filter
  const products = Products.find({
    where: {
      category,
    },
  });

  res.json(products);
});
```

#### Filtering by price range

```javascript

app.get('/products', (req, res) => {
  const { minPrice, maxPrice } = req.query;

  // Fetch products from the database based on the price range filter
  const products = Products.find({
    where: {
      price: {
        [Op.gte]: minPrice,
        [Op.lte]: maxPrice,
      },
    },
  });

  res.json(products);
});
```

#### Advanced filtering case where we can filter by multiple optional fields

```javascript

app.get('/products', (req, res) => {
  const { category, minPrice, maxPrice } = req.query;

    // Build the filter object based on the query parameters
    const filter = {};
    if (category) {
        filter.category = category;
    }
    if (minPrice && maxPrice) {
        filter.price = {
            [Op.gte]: minPrice,
            [Op.lte]: maxPrice,
        };
    }

    // Fetch products from the database based on the filter
    const products = Products.find({
        where: filter,
    });

    res.json(products);
});

```

#### LHS Brackets

And although the previous presented solutions for filtering are perfectly fine, they are not very flexible. The filters above would only work for exact matches. The problem is that URL parameters only have a key and a value but filters can be composed of three components:

The field name
The operator
The filter value
LHS Brackets

One solution to the problem is the use of LHS brackets which are composed in this way

`field[operator]=value`

For example, if we want to filter products with a price greater than 100, we would use the following URL parameter:

`/products?price[gte]=100`

This way, we can easily extend our filtering capabilities to include more complex filters.

##### Implementing LHS Brackets in Express.js

```javascript

// express.js uses the qs library to parse query strings
const qs = require('qs');

app.get('/products', (req, res) => {
  const filters = req.query;

  // Express js does this behind the scenes
  const filter = qs.parse('price[gte]=10&price[lte]=100');

  // filter will be { price: { gte: 10, lte: 100 } }

  // Fetch products from the database based on the filter
  const products = Products.find({
    where: filter,
  });

  res.json(products);
});

```

## How does sorting work?

Sorting in REST APIs allows users to order the results based on a specific field or fields. The API processes the sort query and returns the results in the specified order.

### Implementing sorting in Express.js

In Express.js applications, you can implement sorting using query parameters. Here's an example of how you can implement sorting in an endpoint:

#### Sorting by a single field

```javascript

app.get('/products', (req, res) => {
  const {     
    sortBy = "title",
    orderBy = "asc",
  } = req.query;

  // Fetch products from the database and sort them based on the sortBy parameter
  const products = Products.find({
    order: [[sort_by, order_by]],
  });

  res.json(products);
});
```

#### Sorting by multiple fields

```javascript

app.get('/products', (req, res) => {
  const {     
    sortBy = "title,price",
    orderBy = "asc, desc",
  } = req.query;

  const sort_by = sortBy.split(',');
  const order_by = orderBy.split(',');
  const order = sort_by.map((field, index) => [field, order_by[index] || 'asc']);

  // Fetch products from the database and sort them based on the sortBy parameter
  const products = Products.find({
    order,
  });

  res.json(products);
});
```


