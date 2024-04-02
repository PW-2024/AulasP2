# Definition & Examples of ODM's

Object-Document Mapping (ODM) is a technique used to convert data between incompatible systems in a way that is transparent to the developer. Instead of using relational databases, ODM is typically used with NoSQL databases, such as MongoDB. It helps in mapping document data to object-oriented programming languages, which simplifies the integration of database interactions into application code.

Short:
ODM abstracts the complexities of interacting with document databases, allowing developers to work with data as if they were working with plain objects in their programming language. This eliminates the need for writing database-specific queries.

Some popular ODM's for Node.js with MongoDB are:

Mongoose
Mongoskin
Monk
(...)

Here is an example of how you can use Mongoose to interact with a MongoDB database:

```javascript
const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    // Schema definitions here
    firstName: {
        type: String,
        required: true
    },
    lastName: String
});

const User = mongoose.model('User', UserSchema);

// Connecting to MongoDB
mongoose.connect('mongodb://localhost/my_database', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

// fetching all users
const users = await User.find();

// creating a new user
const user = new User({
    firstName: 'John',
    lastName: 'Doe'
});
await user.save();

// updating a user
await User.findOneAndUpdate({ lastName: 'Doe' }, { firstName: 'Jane' });

// deleting a user
await User.findOneAndDelete({ lastName: 'Doe' });


```

## Core concepts in Mongoose

- **Schemas**: In Mongoose, schemas are used to define the structure of documents within a collection. They specify the types of fields, validation requirements, default values, and more.
Example:

```javascript

const UserSchema = new mongoose.Schema({
    // Schema definitions here
    firstName: {
        type: String,
        required: true
    },
    lastName: String
});

```

- **Nested Schemas**: Mongoose allows you to define nested schemas, which can be used to represent complex data structures.

```javascript

const AddressSchema = new mongoose.Schema({
    street: String,
    city: String,
    zip: String
});

const UserSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    address: AddressSchema
});

```

- **Populate**: Mongoose provides a `populate` method to fetch related documents from other collections. This is useful when you have relationships between documents.

```javascript

const UserSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    posts: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Post' }]
});

const PostSchema = new mongoose.Schema({
    title: String,
    content: String
});

const User = mongoose.model('User', UserSchema);
const Post = mongoose.model('Post', PostSchema);

const user = await User.findOne().populate('posts');

```

- **Models**: Models are constructors compiled from schemas. They represent documents in a collection and provide an interface for querying and manipulating data.

```javascript

const User = mongoose.model('User', UserSchema);

```

- **Queries**: Mongoose provides a rich set of query methods to interact with the database. You can use these methods to find, update, delete, and perform other operations on documents.

```javascript

const users = await User.find();

await User
    .findOneAndUpdate({ lastName: 'Doe' }, { firstName: 'Jane' });

await User
    .findOneAndDelete({ lastName: 'Doe' });

```

- **Object Ids**: Mongoose uses ObjectIds to uniquely identify documents in a collection. These are automatically generated when a new document is created.

```javascript

const Model = mongoose.model('Test', schema);

const doc = new Model();
doc._id instanceof mongoose.Types.ObjectId; // true

```


- **Middleware**: Mongoose middleware functions are functions that are executed before or after certain operations. They can be used to perform tasks like data validation, encryption, and more.

```javascript

UserSchema.pre('save', function(next) {
    // Perform some tasks before saving the document
    next();
});

```

## Useful links

- [Mongoose documentation](https://mongoosejs.com/docs/guide.html)
- [MongoDB documentation](https://docs.mongodb.com/manual/)



