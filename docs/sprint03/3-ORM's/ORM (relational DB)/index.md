# ORM (relational DB)

Object-Relational Mapping (ORM) is a programming technique that converts data between incompatible type systems using object-oriented programming languages. It creates a "virtual object database" that can be used within the programming language. ORM's are used to interact with relational databases, such as MySQL, PostgreSQL, and SQLite.

Short:
It does all the heavy lifting for you, so you don't have to write SQL queries by hand. It also provides a way to map your database tables to JavaScript objects, so you can work with them in a more object-oriented way.


Some popular ORM's for Node.js are:
- Sequelize
- TypeORM
- Prisma
- (...)

Here is an example of how you can use Sequelize to interact with a MySQL database:

```javascript
const { Sequelize, DataTypes } = require('sequelize');

const sequelize
    = new Sequelize
    ('database', 'username', 'password', {
        host: 'localhost',
        dialect: 'mysql'
    });

const User = sequelize.define('User', {
    // Model attributes are defined here
    firstName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    lastName: {
        type: DataTypes.STRING
        // allowNull defaults to true
    }
});

// fetching all users
const users = await User.findAll();

// creating a new user

const user = await User.create({
    firstName: 'John',
    lastName: 'Doe'
});

// updating a user

await User.update({ firstName: 'Jane' }, {
    where: {
        lastName: 'Doe'
    }
});

// deleting a user

await User.destroy({
    where: {
        lastName: 'Doe'
    }
});

```

## Core concepts in Sequelize

- **Models**: Models are JavaScript classes that represent database tables. They define the structure of the data that will be stored in the database.
Example:

```javascript

const User = sequelize.define('User', {
    // Model attributes are defined here
    firstName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    lastName: {
        type: DataTypes.STRING
        // allowNull defaults to true
    }
});

```



- **Associations**: Associations define the relationships between different models. For example, a user model might have an association with a post model, indicating that a user can have multiple posts.

```javascript
// 1-to-many association
User.hasMany(Post);
Post.belongsTo(User);

// then querying the posts of a user would look like this:
const user = await User.findByPk(1);
const posts = await user.getPosts();

// many-to-many association
User.belongsToMany(Project, { through: 'UserProject' });
Project.belongsToMany(User, { through: 'UserProject' });

// or with parameters

const UserProject = sequelize.define('UserProject', {
    role: Sequelize.STRING
});

User.belongsToMany(Project, { through: UserProject });
Project.belongsToMany(User, { through: UserProject });


// 1-to-1 association
User.hasOne(Profile);
Profile.belongsTo(User);

// self-association
User.belongsToMany(User, { as: 'Friends', through: 'Friendship' });

```

- **Migrations**: Migrations are scripts that define the structure of the database. They allow you to create, update, and delete tables and columns in the database.

- **Queries**: Queries are used to interact with the database. They allow you to fetch, create, update, and delete data in the database.

## Useful links:

- [Sequelize documentation](https://sequelize.org/)
- [TypeORM documentation](https://typeorm.io/)
- [Prisma documentation](https://www.prisma.io/)
- [Node.js ORM comparison](https://amplication.com/blog/top-6-orms-for-modern-nodejs-app-development)
