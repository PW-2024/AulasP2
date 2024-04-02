# ORM's, ODM's, OGM's ...

Object mappers are a common way to interact with databases in a more object-oriented way. They allow you to interact with the database using objects and methods, rather than writing raw SQL queries. This can make your code more readable and maintainable, as well as reducing the amount of boilerplate code you need to write.

Depending on the database you are using, you may need to use a different type of object mapper. For example, if you are using a relational database like MySQL or PostgreSQL, you will need to use an Object-Relational Mapper (ORM). If you are using a document database like MongoDB, you will need to use an Object-Document Mapper (ODM). If you are using a graph database like Neo4j, you will need to use an Object-Graph Mapper (OGM).


## Advantages of using an object mapper

There are several advantages to using an object mapper:

- **Simpler code**: Object mappers abstract away the complexity of interacting with the database, making your code simpler and easier to read.
- **Reduced boilerplate**: Object mappers handle common tasks like creating, updating, and deleting records, reducing the amount of boilerplate code you need to write.
- **Type safety**: Object mappers can provide type safety, ensuring that your code is less error-prone.
- **Database independence**: Object mappers can make your code more portable, as they can often work with multiple database systems.

## Disadvantages of using an object mapper

While object mappers can be useful, they also have some disadvantages:

- **Performance**: Object mappers can introduce overhead, which can impact the performance of your application.
- **Learning curve**: Object mappers can have a steep learning curve, especially if you are new to the technology.
- **Complexity**: Object mappers can add complexity to your codebase, especially for simple applications.
