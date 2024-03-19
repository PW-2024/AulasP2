# Introduction to REST API's

## What is an API?

API stands for Application Programming Interface. It is a set of rules and protocols that allows different software applications to communicate with each other. It defines the methods and data formats that applications can use to request and exchange data. APIs are used to enable the integration of different systems and to allow them to work together.

## What is a REST(ful) API?

REST (Representational State Transfer) is an architectural style for designing applications. It relies on a stateless, client-server, cacheable **communications protocol**. REST applications use HTTP requests to perform four operations: GET (read), POST (create), PUT (update), and DELETE (delete). REST is a lightweight alternative to other web services, such as SOAP (Simple Object Access Protocol).

A system that complies with all the REST constraints is called a **RESTful** system.

## Constraints in a RESTful API

The REST architectural style describes six constraints. These constraints are:

REST defines 6 architectural constraints that make any web service – a truly RESTful API.

1. Uniform interface
2. Client-server
3. Stateless
4. Cacheable
5. Layered system
6. Code on demand (optional)

### 1. Uniform interface

As the constraint name itself applies, you MUST decide APIs interface for resources inside the system which are exposed to API consumers and follow religiously. A resource in the system should have only one logical URI, and that should provide a way to fetch related or additional data. It’s always better to synonymize a resource with a web page.

Any single resource should not be too large and contain each and everything in its representation. Whenever relevant, a resource should contain links (HATEOAS) pointing to relative URIs to fetch related information.

Also, the resource representations across the system should follow specific guidelines such as naming conventions, link formats, or data format (JSON).

All resources should be accessible through a common approach such as HTTP GET and similarly modified using a consistent approach.


### 2. Client-server

This constraint essentially means that client applications and server applications MUST be able to evolve separately without any dependency on each other. A client should know only resource URIs, and that’s all. Today, this is standard practice in web development, so nothing fancy is required from your side.

### 3. Stateless

The server should not store any client context session. The session state is kept entirely on the client. This constraint helps to scale the server and client interactions. It further helps to improve the visibility of interactions, reliability, and scalability.

### 4. Cacheable

As on the World Wide Web, clients and intermediaries can cache responses. Responses must, therefore, implicitly or explicitly define themselves as cacheable or not to prevent clients from reusing stale or inappropriate data in response to further requests.

In REST, caching shall be applied to resources when applicable, and then these resources MUST declare themselves cacheable. Caching can be implemented on the server or client side.

### 5. Layered system

REST allows you to use a layered system architecture where you deploy the APIs on server A, and store data on server B and authenticate requests in Server C, for example. This helps to improve the scalability of the system. The layered system helps to enforce security policies, load balancing, shared caches, and other cross-cutting concerns.


### 6. Code on demand (optional)

REST allows client functionality to be extended by downloading and executing code in the form of applets or scripts. This simplifies clients by reducing the number of features required to be pre-implemented.

## Key concepts in RESTful APIs

### API endpoints and resources

An API endpoint is a point at which an API can access the resources they need from a server. It is a server route that is used to retrieve different data from the API. An endpoint is a URL pattern used to retrieve data from the API. The endpoint is the URL of the server. Each endpoint is the location from which APIs can access the resources they need to carry out their function.

A resource is an object with a type, associated data, relationships to other resources, and a set of methods that operate on it. It is a fundamental concept used in the RESTful architecture. It can be any object, data, or service that can be accessed by the client.

### HTTP methods (GET, POST, PUT, DELETE, etc...)

HTTP defines a set of request methods to indicate the desired action to be performed for a given resource. Although they can also be nouns, these request methods are sometimes referred to as HTTP **verbs**.
The most common used methods in a RESTful API are:

- <span style="color:blue">**GET**</span>: Used for retrieving data from the server.

- <span style="color:green">**POST**</span>: Used for sending data to the server to create a new resource.

- <span style="color:orange">**PUT**</span>: Used for sending data to the server to update a resource.

- <span style="color:red">**DELETE**</span>: Used to delete a resource from the server.

And many others with more specific purposes:

- **PATCH**: The PATCH method is used to apply partial modifications to a resource.

- **HEAD**: The HEAD method asks for a response identical to that of a GET request, but without the response body. It is useful for retrieving meta-information written in response headers, without having to transport the entire content.

- **OPTIONS**: The OPTIONS method is used to describe the communication options for the target resource.


### Query parameters and URL structure

Query parameters are used to filter the data returned by the API. They are added to the end of the URL and are separated from the URL by a question mark. They are used to specify the data that should be returned by the API. For example, if you want to retrieve all the users with the name "John", you can use a query parameter to filter the data.

### Responses & status codes & error handling

When a RESTful API is called, the server will return a response. The response is composed of a status code and a response body. The status code indicates the success or failure of the request. The response body contains the data requested by the client.

### Status codes

Commonly used groups of status codes in RESTful APIs are:

- **2xx Success**: The action was successfully received, understood, and accepted.
- **3xx Redirection**: Further action must be taken in order to complete the request.
- **4xx Client Error**: The request contains bad syntax or cannot be fulfilled.
- **5xx Server Error**: The server failed to fulfill an apparently valid request.

Some of the most common status codes are:

- <span style="color:green">**200 OK**</span>: The request was successful.
- <span style="color:green">**201 Created**</span>: The request was successful and a new resource was created.
- <span style="color:orange">**301 Moved Permanently**</span>: The requested resource has been permanently moved to a new location.
- <span style="color:orange">**302 Found**</span>: The requested resource has been temporarily moved to a different location.
- <span style="color:orange">**304 Not Modified**</span>: The client can use cached data as the response has not been modified.
- <span style="color:orange">**307 Temporary Redirect**</span>: The requested resource has been temporarily moved to a different location.
- <span style="color:red">**308 Permanent Redirect**</span>: The requested resource has been permanently moved to a different location.
- <span style="color:red">**400 Bad Request**</span>: The request was invalid.
- <span style="color:red">**401 Unauthorized**</span>: The request did not include the necessary authentication credentials.
- <span style="color:red">**403 Forbidden**</span>: The server understood the request, but is refusing to fulfill it.
- <span style="color:red">**404 Not Found**</span>: The requested resource could not be found.
- <span style="color:red">**500 Internal Server Error**</span>: The server encountered an unexpected condition that prevented it from fulfilling the request.

### Authentication and authorization

Authentication is the process of verifying the identity of a user. Authorization is the process of verifying what the user has access to. In RESTful APIs, authentication and authorization are handled using tokens. A token is a piece of data that is used to authenticate a user. It is usually a long string of characters that is sent along with each request to the server. The server then verifies the token and sends back the requested data if the token is valid.

## Best practices for designing RESTful APIs

When designing RESTful APIs, there are some best practices that should be followed:

- **Use nouns instead of verbs in endpoint URLs**: The URL should contain the name of the resource that the API interacts with. It should not contain the action that the API performs.

- **Use plural nouns**: The URL should contain the plural form of the resource name.

- **Use sub-resources for relations**: If a resource is related to another resource, the URL should contain the parent resource and the child resource.

- **Use HTTP methods**: Use HTTP methods to operate on the resource. For example, use GET to retrieve a resource, POST to create a new resource, PUT to update a resource, and DELETE to delete a resource.

- **Be consistent**: Use the same URL structure for all resources. This makes the API easier to understand and use.

- **Handle errors gracefully**: When an error occurs, return an appropriate HTTP status code and an error message.

- **Use pagination for large data sets**: If an API returns a large data set, use pagination to limit the amount of data returned.

- **Version your API**: If you make breaking changes to your API, version it so that existing clients are not affected.

- **Document your API**: Provide clear and complete documentation for your API so that developers can easily understand and use it.

- **Use consistent naming conventions**: Use consistent naming conventions for your API. For example, use camel case for JSON keys.

- **Use plural nouns**: Use plural nouns for resource names.

- **Use query parameters for filtering**: Use query parameters to filter the data returned by the API.

- **Use HATEOAS**: Use HATEOAS (Hypermedia as the Engine of Application State) to provide links to related resources in the response.

- **Use JSON as the default format**: Use JSON as the default format for request and response data.

- **Use HTTP status codes**: Use appropriate HTTP status codes to indicate the success or failure of a request.

- **Use HTTP headers**: Use HTTP headers to provide additional information about the request or response.

- **Use HTTP caching**: Use HTTP caching to improve the performance of the API.

- **Use rate limiting**: Use rate limiting to prevent abuse of the API.
