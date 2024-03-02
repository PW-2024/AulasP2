# Redis

Redis is key-value database. It is an open-source, in-memory data structure store, used as a database, cache, and message broker.

It is commonly used for caching, real-time analytics, messaging, and queuing.



## Redis Data Types
Redis supports different kinds of data types:

- Strings: The most basic type of Redis value. Redis Strings are binary safe, meaning they can contain any kind of data, e.g., a JPEG image or a serialized Ruby object.

- Lists: A collection of string elements sorted according to the order of insertion. They are essentially linked lists, which means that even if you have millions of elements, adding a new element at the head or tail of the list is a constant-time operation.

- Sets: An unordered collection of strings that allows you to add, remove, and test for the existence of members in O(1) time complexity.

- Sorted Sets: Similar to Sets but with a score associated with each element, allowing them to be sorted from the smallest to the greatest score.

- Hashes: A collection of key-value pairs, perfect for representing objects.

- Bitmaps and HyperLogLogs: These are specialized data types for counting unique elements in a set or for probabilistic counting functions.

- Streams: A data type introduced in Redis 5.0, which is a log-like data structure that provides append-only semantics for sequences of messages.

## Redis Commands
Redis commands are used to interact with the data stored in Redis. Here's a look at some basic commands for each Redis data type:

### Strings
```bash
SET key value
GET key
```

### Lists
```bash
LPUSH key value
RPUSH key value
LPOP key
```

### Sets
```bash
SADD key member
SMEMBERS key
SISMEMBER key member
```

### Sorted Sets
```bash
ZADD key score member
ZRANGE key start stop [WITHSCORES]
```

### Hashes
```bash
HSET key field value
HGET key field
```

### Keys
```bash
DEL key
EXISTS key
```

## Redis Persistence
Redis offers a range of persistence options:

### RDB (Redis Database): 
The RDB persistence performs point-in-time snapshots of your dataset at specified intervals.

### AOF (Append Only File): 
The AOF persistence logs every write operation received by the server, that will be played again at server startup, reconstructing the original dataset.


## Redis Transactions
Redis transactions allow the execution of a group of commands in a single step, with two important guarantees: All the commands in a transaction are serialized and executed sequentially. A Redis transaction is atomic, which means that either all of the commands or none are processed.

## Redis Pub/Sub
Redis Pub/Sub is a messaging pattern where senders (publishers) do not send messages directly to receivers (subscribers). Instead, published messages are characterized into channels without knowledge of what (if any) subscribers there may be.

## Redis Security
Redis includes a few security features such as command renaming and disabling, and basic authentication. Redis does not support encryption.

## Redis Clustering
Redis Cluster provides a way to run a Redis installation where data is automatically sharded across multiple Redis nodes. It provides high availability and scalability.

## Redis Sentinel
Redis Sentinel provides high availability for Redis. It monitors Redis instances, providing automatic failover if a master instance is not working correctly.

Redis is known for its flexibility, performance, and wide language support. It's used in various use cases such as caching, session storage, real-time analytics, and more.