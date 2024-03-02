# SQL (Relational database)

Relational databases are the most common type of database used in web development. They are based on the relational model of data, as proposed by E. F. Codd in 1970. A software system used to maintain relational databases is a relational database management system (RDBMS).

## Examples of RDBMS - Relational Database Management Systems

1. MySQL

2. PostgreSQL


## SQL in detail

SQL (Structured Query Language) is a domain-specific language used in programming and designed for managing data held in a relational database management system (RDBMS), or for stream processing in a relational data stream management system (RDSMS).
Example: MySQL

The following are the most common SQL commands and their usage organized by category:

### DDL (Data Definition Language)

The SQL DDL commands are used to create, modify, and drop the structure of the database objects.

```sql
CREATE TABLE table_name (
    column1 datatype, -- column definition, MySQL data types: https://www.w3schools.com/sql/sql_datatypes.asp
    column2 datatype,
    column3 datatype,
   ....
);
```

```sql

ALTER TABLE table_name
ADD column_name datatype;

```

```sql

DROP TABLE table_name;

```

### DML (Data Manipulation Language)

The SQL DML commands are used to insert, update, and delete the data from the database. 

```sql

INSERT INTO table_name (column1, column2, column3, ...)
VALUES (value1, value2, value3, ...);

```

```sql
UPDATE table_name
SET column1 = value1, column2 = value2, ...
WHERE condition;

```

```sql
DELETE FROM table_name
WHERE condition;

```


### DCL (Data Control Language)

The SQL DCL commands are used to grant and take back authority and privileges from the database users.

```sql
GRANT privilege_name
ON object_name
TO {user_name | PUBLIC | role_name};

```

```sql
REVOKE privilege_name
ON object_name
FROM {user_name | PUBLIC | role_name};

```

### TCL (Transaction Control Language)

The SQL TCL commands are used to manage the changes made by DML statements. The TCL commands are auto-committed. It means changes made by TCL command are permanent to the database.

```sql
COMMIT;

```

```sql
ROLLBACK;

```

```sql
SAVEPOINT savepoint_name;

```

```sql

ROLLBACK TO SAVEPOINT savepoint_name;

```

## SQL Joins

A SQL JOIN combines records from two tables. A JOIN locates related column values in the two tables. A query can contain zero, one, or multiple JOIN operations.

### INNER JOIN

The INNER JOIN keyword selects records that have matching values in both tables.

```sql
SELECT column_name(s)
FROM table1
INNER JOIN table2
ON table1.column_name = table2.column_name;

```

### LEFT JOIN

The LEFT JOIN keyword returns all records from the left table (table1), and the matched records from the right table (table2). The result is NULL from the right side if there is no match.

```sql
SELECT column_name(s)
FROM table1
LEFT JOIN table2
ON table1.column_name = table2.column_name;

```

### RIGHT JOIN

The RIGHT JOIN keyword returns all records from the right table (table2), and the matched records from the left table (table1). The result is NULL from the left side when there is no match.

```sql
SELECT column_name(s)
FROM table1
RIGHT JOIN table2
ON table1.column_name = table2.column_name;

```

### FULL JOIN

The FULL JOIN keyword returns all records when there is a match in either left (table1) or right (table2) table records.

```sql
SELECT column_name(s)
FROM table1
FULL JOIN table2
ON table1.column_name = table2.column_name
WHERE condition;

```

## SQL Functions

### Aggregate functions

Aggregate functions perform a calculation on a set of values and return a single value.

```sql
SELECT AVG(column_name)
FROM table_name;

```

```sql
SELECT COUNT(column_name)
FROM table_name;

```

```sql
SELECT MAX(column_name)
FROM table_name;

```

```sql
SELECT MIN(column_name)
FROM table_name;

```

```sql
SELECT SUM(column_name)
FROM table_name;

```

### Scalar functions

Scalar functions return a single value based on the input value.

```sql
SELECT UCASE(column_name)
FROM table_name;

```

```sql
SELECT LCASE(column_name)
FROM table_name;

```

```sql
SELECT MID(column_name, start, length)
FROM table_name;

```

```sql
SELECT LEN(column_name)
FROM table_name;

```

```sql
SELECT ROUND(column_name, decimals)
FROM table_name;

```

## SQL Constraints

Constraints are used to specify rules for the data in a table.

### NOT NULL

The NOT NULL constraint enforces a column to not accept NULL values.

```sql
CREATE TABLE table_name (
    column1 datatype NOT NULL,
    column2 datatype,
    column3 datatype,
   ....
);

```

### UNIQUE

The UNIQUE constraint ensures that all values in a column are different.

```sql
CREATE TABLE table_name (
    column1 datatype UNIQUE,
    column2 datatype,
    column3 datatype,
   ....
);

```

### PRIMARY KEY

The PRIMARY KEY constraint uniquely identifies each record in a table.

```sql
CREATE TABLE table_name (
    column1 datatype PRIMARY KEY,
    column2 datatype,
    column3 datatype,
   ....
);

```

### FOREIGN KEY

The FOREIGN KEY constraint is used to prevent actions that would destroy links between tables.

```sql
CREATE TABLE table_name (
    column1 datatype,
    column2 datatype,
    column3 datatype,
    FOREIGN KEY (column1) REFERENCES another_table(column1)
);

```

### CHECK

The CHECK constraint ensures that all values in a column satisfy certain conditions.

```sql
CREATE TABLE table_name (
    column1 datatype,
    column2 datatype,
    column3 datatype,
    CHECK (column1 > 0)
);

```

### DEFAULT

The DEFAULT constraint is used to set a default value for a column.

```sql
CREATE TABLE table_name (
    column1 datatype DEFAULT default_value,
    column2 datatype,
    column3 datatype,
   ....
);

```

## SQL Indexes

Indexes are used to retrieve data from the database more quickly than otherwise. The users cannot see the indexes, they are just used to speed up searches/queries.

```sql
CREATE INDEX index_name
ON table_name (column1, column2, ...);

```

```sql
DROP INDEX table_name.index_name;

``` 

## SQL Views

A view is a virtual table based on the result-set of an SQL statement. A view contains rows and columns, just like a real table. The fields in a view are fields from one or more real tables in the database.

```sql
CREATE VIEW view_name AS
SELECT column1, column2
FROM table_name
WHERE condition;

```

```sql
DROP VIEW view_name;

```

## SQL Triggers

A trigger is a set of SQL statements that automatically "fires" when a specific event occurs in a database.
Supported by: MySQL, SQL Server, PostgreSQL, and Oracle.

```sql
CREATE TRIGGER trigger_name
BEFORE INSERT ON table_name
FOR EACH ROW
BEGIN
    -- trigger code example:
    INSERT INTO log_table VALUES (NEW.column1, 'inserted');
END;

```

```sql
END;

```

```sql
DROP TRIGGER trigger_name;

```

## SQL Transactions

A transaction is a single unit of work. If a transaction is successful, all of the data modifications made during the transaction are committed and become a permanent part of the database. If a transaction encounters errors and must be canceled or rolled back, then all of the data modifications are erased.

Also known as ACID properties:

- Atomicity
- Consistency
- Isolation
- Durability

Full example:
```sql
START TRANSACTION;
INSERT INTO table1 VALUES (1, 'a');
-- Savepoint is used to set a point in the transaction to which you can later roll back.
SAVEPOINT savepoint1;
INSERT INTO table1 VALUES (2, 'b');
-- Rollback is used to undo the changes made by the transaction and restore the database to the state before the transaction began.  Rollback is only called if the transaction is not committed.
ROLLBACK TO SAVEPOINT savepoint1;
COMMIT;

```

## Modeling Techniques

### Physical model

A physical data model is a representation of a data design that takes into account the facilities and constraints of a given database management system.

### Normalization

Normalization is a database design technique that reduces data redundancy and eliminates undesirable characteristics like Insertion, Update and Deletion Anomalies. Normalization rules simplified:

1. First Normal Form

All rows must be unique. (identified by a primary key)
Each cell must contain a single value. No repeating groups or arrays.
Each value should be non divisible. (atomic) firstName, lastName instead of full name

2. Second Normal Form

First Normal Form should be achieved.
No partial dependencies. (no calculated fields) - example total_price = price * quantity

3. Third Normal Form

Second Normal Form should be achieved.
No transitive dependencies. All fields are dependent on the primary/composite key.


### Denormalization

Denormalization is a database optimization technique in which we add redundant data to one or more tables. This can help us avoid costly joins in a relational database.
