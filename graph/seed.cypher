// Seed file for Neo4j Database

// 1. Create Branches
CREATE (b1:Branch {name: 'Main Downtown'})
CREATE (b2:Branch {name: 'Westside'})

// 2. Create Users and Accounts
CREATE (u1:User {id: 'USR1', name: 'Alice Smith'})
CREATE (a1:Account {id: 'ACC1001', balance: 5000})
CREATE (u1)-[:OWNS]->(a1), (a1)-[:BELONGS_TO]->(b1)

CREATE (u2:User {id: 'USR2', name: 'Bob Jones'})
CREATE (a2:Account {id: 'ACC1002', balance: 1500})
CREATE (u2)-[:OWNS]->(a2), (a2)-[:BELONGS_TO]->(b1)

CREATE (u3:User {id: 'USR3', name: 'Charlie Davis'})
CREATE (a3:Account {id: 'ACC1003', balance: 8000})
CREATE (u3)-[:OWNS]->(a3), (a3)-[:BELONGS_TO]->(b2)

CREATE (u4:User {id: 'USR4', name: 'Eve Shady'})
CREATE (a4:Account {id: 'ACC1004', balance: 200})
CREATE (u4)-[:OWNS]->(a4), (a4)-[:BELONGS_TO]->(b2)

// 3. Create Transactions (Normal vs Circular)
CREATE (a1)-[:TRANSFER {amount: 500, timestamp: '2024-05-10T09:00:00Z'}]->(a2)
CREATE (a2)-[:TRANSFER {amount: 200, timestamp: '2024-05-10T10:30:00Z'}]->(a3)

// Circular Fraud Pattern Example
CREATE (a3)-[:TRANSFER {amount: 4500, timestamp: '2024-05-11T14:00:00Z'}]->(a4)
CREATE (a4)-[:TRANSFER {amount: 4400, timestamp: '2024-05-11T14:05:00Z'}]->(a1)
