# Neo4j

Neo4j is a graph database management system developed by Neo4j, Inc. It is an open-source NoSQL graph database implemented in Java and Scala. The developers describe Neo4j as "embedded, disk-based, fully transactional Java persistence engine that stores data structured in graphs rather than in tables".

## Neo4j Architecture

Neo4j's architecture is designed around the principles of graph theory, allowing for efficient representation and querying of complex networks of data. The core components include:

Store Files: Neo4j uses store files to persist graph data on disk. These files include nodes, relationships, properties, and indexes.
Transaction Log: For durability and consistency, Neo4j maintains a transaction log that records all changes to the database.
Caching: Neo4j uses memory caching to improve performance by keeping frequently accessed data in memory.
Clustering: Neo4j supports a clustered architecture through the use of Neo4j Fabric, which allows for scaling out and high availability.

## Graph Theory Basics

Understanding graph theory is crucial for working with Neo4j. Key concepts include:

- Node: The fundamental entity in a graph, representing objects such as people, products, or concepts.
Relationship: Connects nodes, representing how entities are related. Relationships in Neo4j are always directional and typed.
- Label: Used to group nodes into categories, making it easier to apply constraints and perform queries.
- Property: Key-value pairs attached to nodes and relationships, providing additional information about graph elements.

## Cypher Query Language

Cypher is a declarative graph query language that allows for expressive and efficient querying and manipulation of graph data. Key features include:

- Pattern Matching: Allows for expressing complex graph patterns that Neo4j will match against its graph database.
- Filtering: Cypher provides various ways to filter query results, including WHERE clauses and functions.
- Aggregation: Similar to SQL, Cypher supports aggregation functions to summarize data, such as COUNT, AVG, MAX, and MIN.

## Neo4j CRUD Operations

### Create

The CREATE clause is used to create nodes and relationships in the graph.

```cypher

CREATE (n:Person { name: 'John' })

```

```cypher

CREATE (n:Person { name: 'John' })-[:FRIEND]->(m:Person { name: 'Jane' })

```

### Read

The MATCH clause is used to query nodes and relationships in the graph.

```cypher

MATCH (n:Person:Active { name: 'John' })

```

```cypher

MATCH (n:Person { name: 'John' })-[:FRIEND]->(m:Person)

```

### Update

The SET clause is used to update nodes and relationships in the graph.

```cypher

MATCH (n:Person { name: 'John' })
SET n.age = 26
SET n:Active

```


### Delete

The DELETE clause is used to delete nodes and relationships in the graph.

```cypher

MATCH (n:Person { name: 'John' })
DELETE n

```

## Neo4j Indexes

Indexes are used to retrieve data from the database more quickly than otherwise. The users cannot see the indexes, they are just used to speed up searches/queries.

```cypher

CREATE INDEX ON :Person(name)

```

```cypher


CREATE INDEX ON :Person(name, age)

```




