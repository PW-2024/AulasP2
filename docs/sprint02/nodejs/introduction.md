# Introduction to Node.js

NodeJS is a javascript **runtime**. Javascript is a programming language that until now you have only seen running in the browser in order to manipulate the DOM.
However, NodeJS allows you to run javascript code also on the server (computers running somewhere on the internet) like a normal programming language.

## How does this work?

NodeJS is built on top of the V8 engine, which is the same engine that powers Google Chrome. The engine takes the javascript code and compiles it to machine code, which is the code that the computer can understand and execute. (Machine code)
V8 itself is written in C++ and is open source.

Basically Nodejs takes the v8 engine and adds some features to it, like the ability to interact with the **file system**, to **create servers**, to **interact with databases**, etc.

In short it allows you to write server-side code in javascript.

DOM features are not available in NodeJS, because it is not running in a browser environment and so there is no DOM to manipulate.


## Installation 

https://nodejs.org/en/download

Or better (nvm):

https://github.com/nvm-sh/nvm?tab=readme-ov-file#installing-and-updating

NVM will allow you to install multiple versions of NodeJS and switch between them easily - might be useful if you are working on different projects that require different versions of NodeJS.

## Ways of running NodeJS code

- **REPL** (Read-Eval-Print-Loop) - a simple interactive shell that allows you to run javascript code line by line. You can start it by typing `node` in the terminal.

R: Read - reads user's input
E: Eval - evaluates the user's input
P: Print - prints the result
L: Loop - loops back to the first step

- **Running a file** - you can write your code in a file and run it with the `node` command followed by the file name. For example `node myFile.js`


## Hello World

Let's start with a simple example. Create a file called `hello.js` and write the following code:

```javascript
console.log('Hello World');
```

Now run the file with the `node` command:

```bash
node hello.js
```

## Running a server with nodejs

```javascript
const http = require('http');

const server = http.createServer((req, res) => {
  res.writeHead(200, {'Content-Type': 'text/plain'});
  res.end('Hello World\n');

    // we can return anything we want here, for example an html file
    // res.writeHead(200, {'Content-Type': 'text/html'});
    // res.end('<h1>Hello World</h1>');

    // or a json
    // res.writeHead(200, {'Content-Type': 'application/json'});
    // res.end('{"message": "Hello World"}');

});

server.listen(3000, 'Server running at http://localhost:3000/');
```

In PHP for example, in order to run a server you would need to install a server like Apache or Nginx. With NodeJS you can create a server with just a few lines of code.

## NodeJS usecases

- **APIs** - you can create a server that listens for requests and sends back responses. This is useful for creating APIs that can be used by other applications.

- **Backend for web applications** - you can create a server that serves web pages and handles requests from the client.

- **Automation** - you can write scripts that automate tasks on your computer, like moving files, downloading files, etc.

- **Microservices** - you can create small services that do one thing and do it well, and then combine them to create a bigger application.

- **Real-time applications** - you can create applications that require real-time communication between the server and the client, like chat applications, games, etc.

- **Command line tools** - you can create command line tools that can be used to perform tasks from the terminal.

- **IoT** - you can write code that runs on small devices like Raspberry Pi, Arduino, etc.

- **Desktop applications** - you can create desktop applications using frameworks like Electron.


## Alternatives

- **PHP**
- **Python**
- **Ruby**
- **Java**


## NPM package manager

npm is the standard package manager for Node.js.

In September 2022 over 2.1 million packages were reported being listed in the npm registry, making it the biggest single language code repository on Earth, and you can be sure there is a package for (almost!) everything.

To start using npm on a project you can run `npm init` in the terminal. This will create a `package.json` file that will hold all the information about your project and its dependencies.

To install a package you can run `npm install packageName`. This will install the package and add it to the `package.json` file.

To install a package globally you can run `npm install -g packageName`. This will install the package globally on your computer and you will be able to use it from the terminal.



