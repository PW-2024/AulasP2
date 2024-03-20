const http = require('http');

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

const server = http.createServer((request, response) => {
  const { method, url } = request;

  if (method === 'GET' && url === '/users') {
    response.writeHead(200, {
      'Content-Type': 'application/json'
    });

    response.end(JSON.stringify(users));

    return;
  }

  if (method === 'POST' && url === '/users') {
    console.log('request body', request.body);

    const body = [];
    request.on('data', (data) => {
      body.push(data);
    });

    request.on('end', () => {
      const parsedBody = Buffer.concat(body).toString();
      console.log('parsedBody', typeof parsedBody);

      const user = JSON.parse(parsedBody);
      users.push(user);

      response.writeHead(201, {
        'Content-Type': 'application/json'
      });

      response.end(JSON.stringify(user));
    });
  }

  response.writeHead(200, {
    'Content-Type': 'application/json'
  });

  response.end(
    JSON.stringify({
      method,
      url
    })
  );
});

server.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});
