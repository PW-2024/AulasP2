# MongoDB 

## What is MongoDB?

MongoDB is a cross-platform document-oriented database program. Classified as a NoSQL database program, MongoDB uses JSON-like documents with optional schemas.

## What is a document?

A record in a MongoDB collection is a document, which is a data structure composed of field and value pairs. MongoDB documents are similar to JSON objects. The values of fields may include other documents, arrays, and arrays of documents.

## What is a collection?

A collection is a grouping of MongoDB documents. A collection is the equivalent of an RDBMS table. A collection exists within a single database. Collections do not enforce a schema. Documents within a collection can have different fields. Typically, all documents in a collection are of similar or related purpose.


## MongoDB CRUD Operations

### Create

The insert() method is used to insert documents into a collection.

```javascript

db.users.insert({
    name: "John",
    age: 25,
})
```


### Read

The find() method is used to query documents in a collection.

```javascript

db.collection('users').find({
    name: "John"
})
```

### Update

The update() method is used to update documents in a collection.

```javascript

db.collection('users').update(
    { name: "John" },
    { $set: { age: 26 } }
)
```

### Delete

The remove() method is used to delete documents from a collection.

```javascript
db.collection('users').remove({ name: "John" })
```

## MongoDB Indexes

Indexes are used to retrieve data from the database more quickly than otherwise. The users cannot see the indexes, they are just used to speed up searches/queries.

```javascript
db.collection('users').createIndex( { name: 1 } )
```

```javascript
db.collection('users').createIndex( { name: 1, age: -1 } )
```

Difference between 1 and -1: 1 is for ascending and -1 is for descending.


## MongoDB Aggregation

Aggregation operations process data records and return computed results. Aggregation operations group values from multiple documents together, and can perform a variety of operations on the grouped data to return a single result.

```javascript
db.collection('users').aggregate([
    { $group: { _id: "$name", total: { $sum: "$age" } } }
])
```

### Schema less but...

### Defining a mongo collection schema

```javascript
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  age: {
    type: Number,
    required: true
  }
});

module.exports = mongoose.model('User', userSchema);
```

## MongoDB Data Modeling

Data in MongoDB has a flexible schema. Collections do not enforce a schema. If you insert a document into a collection that does not exist, MongoDB will create the collection for you.

### Common modeling patterns

- Document Versioning
- Polymorphic Pattern
- Attribute Pattern
- Bucket Pattern
- Outlier Pattern
- Computed Pattern
- Subset Pattern
- Approximation Pattern

## MongoDB Transactions

In MongoDB, an operation on a single document is atomic. Because you can use embedded documents and arrays to capture relationships between data in a single document structure instead of normalizing across multiple documents and collections, this single-document atomicity obviates the need for distributed transactions for many practical use cases.

```javascript
 // For a replica set, include the replica set name and a seedlist of the members in the URI string; e.g.
  // const uri = 'mongodb://mongodb0.example.com:27017,mongodb1.example.com:27017/?replicaSet=myRepl'
  // For a sharded cluster, connect to the mongos instances; e.g.
  // const uri = 'mongodb://mongos0.example.com:27017,mongos1.example.com:27017/'
  const client = new MongoClient(uri);
  await client.connect();
  // Prereq: Create collections.
  await client
    .db('mydb1')
    .collection('foo')
    .insertOne({ abc: 0 }, { writeConcern: { w: 'majority' } });
  await client
    .db('mydb2')
    .collection('bar')
    .insertOne({ xyz: 0 }, { writeConcern: { w: 'majority' } });
  // Step 1: Start a Client Session
  const session = client.startSession();
  // Step 2: Optional. Define options to use for the transaction
  const transactionOptions = {
    readPreference: 'primary',
    readConcern: { level: 'local' },
    writeConcern: { w: 'majority' }
  };
  // Step 3: Use withTransaction to start a transaction, execute the callback, and commit (or abort on error)
  // Note: The callback for withTransaction MUST be async and/or return a Promise.
  try {
    await session.withTransaction(async () => {
      const coll1 = client.db('mydb1').collection('foo');
      const coll2 = client.db('mydb2').collection('bar');
      // Important:: You must pass the session to the operations
      await coll1.insertOne({ abc: 1 }, { session });
      await coll2.insertOne({ xyz: 999 }, { session });
    }, transactionOptions);
  } finally {
    await session.endSession();
    await client.close();
  }
```

## Data Modeling Specifics

Data in MongoDB has a flexible schema model, which means:

- Documents within a single collection are not required to have the same set of fields.

- A field's data type can differ between documents within a collection.

### Schema Design Process

The schema design process helps you prepare an effective schema for your application. Following the schema design process helps you identify what data your application needs and how to best organize your data to optimize performance.

Steps to design a schema:

#### Identify Application Workload

1. Identify the application’s needs: 
    - What are the most common operations performed by the application?
    - What are the most common read and write patterns?
    - What are the most common aggregation operations?

2. Create a workload table with your application's queries


#### Map Schema Relationships

Decide how to model relationships between entities.
Embed or reference? Or both with data duplication? 

1. Identify related data in your schema - Identify the data that your application queries and how entities relate to each other based on your workload table.

2. Create a schema map for your related data - Your schema map should show related data fields and the type of relationship between those fields (one-to-one, one-to-many, many-to-many). (ERD model)

3. Choose whether to embed related data or use references

#### Apply Schema Design Patterns

1. subset pattern - duplicated data
2. computed pattern - calculated data
3. bucket pattern - grouping data

