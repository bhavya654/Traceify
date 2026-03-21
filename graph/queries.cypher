// Find all transfer paths up to 3 hops from a specific account
MATCH path = (a:Account {id: "ACC1001"})-[:TRANSFER*1..3]-(b:Account)
RETURN path

// Detect Circular Transactions (Cycles of 2 to 5 hops) returning to the exact same account
MATCH path = (a:Account)-[:TRANSFER*2..5]->(a)
RETURN path, [node in nodes(path) | node.id] AS AccountsInvolved
LIMIT 10

// Detect Rapid Layering across multiple accounts (suspiciously fast sequences)
MATCH (a:Account)-[r1:TRANSFER]->(b:Account)-[r2:TRANSFER]->(c:Account)
WHERE duration.inSeconds(datetime(r1.timestamp), datetime(r2.timestamp)).seconds < 3600
RETURN a.id, b.id, c.id, r1.amount, r2.amount
