const express = require('express');

const app = express();

const users = [
  {
    id: 1,
    name: 'John Doe'
  },
  {
    id: 2,
    name: 'Jane Doe'
  }
];

// app.use(express.json());

app.use((request, response, next) => {
  const body = [];

  request.on('data', (data) => {
    body.push(data);
  });

  request.on('end', () => {
    const parsedBody = Buffer.concat(body).toString();
    console.log('parsedBody', typeof parsedBody);

    request.body = JSON.parse(parsedBody);
    next();
  });
});
// request
// response
// next
app.use((request, response, next) => {
  console.log('middleware 1');
  next();
});

app.use((request, response, next) => {
  console.log('middleware 2');
  next();
});

app.get('/users', (request, response) => {
  response.json(users);
});

app.post('/users', (request, response) => {
  console.log('request body', request.body);
});

app.listen(3000, () => {
  console.log('Server is listening on port 3000');
});
