# Hello world server

## Introduction

In this exercise, you will create a simple Node.js server that responds with "Hello World" to any request.

## Instructions

1. Create a new file named `server.js` and write a script that creates a server using the `http` module.

2. The server should listen for requests on port `3000`.

3. When a request is received, the server should respond with a `200` status code and a `text/plain` content type.

4. The response body should contain the text "Hello World".

5. Test your server by making a request to `http://localhost:3000` using your browser or a tool like `curl`.

6. Accept a call /info that returns a json object to the client with the following structure:
```json
{
  "name": "John Doe",
  "age": 30,
  "city": "New York"
}
```