# Traceify
A complete hackathon project scaffold encompassing a React Native mobile App, React web dashboard, Node.js backed driven by a Neo4j Graph Database, and an AI scoring Python microservice.

## Directory Structure
- `client-web/` - Bank Investigator Dashboard (React, Vite, D3/Force-Graph)
- `client-mobile/` - User Mobile App (React Native, Expo)
- `server/` - Backend Node/Express API with Neo4j connectivity
- `ai-service/` - Python FastAPI Microservice for Anomaly and Fraud Scoring
- `graph/` - Cypher setup files for Neo4j DB
- `docker-compose.yml` - Optional Docker environment setup (You may need to provide individual Dockerfiles inside each directory depending on deployment strategy).

## Getting Started Setup

### 1. Start Neo4j Local Database
Download Neo4j Desktop or use Docker:
```bash
docker run -d --name neo4j -p 7474:7474 -p 7687:7687 -e NEO4J_AUTH=neo4j/password neo4j:5.18.0
```
Run the seed file inside `graph/seed.cypher`.

### 2. Start AI Service (Python)
Ensure Python 3.9+ is installed.
```bash
cd ai-service
pip install -r requirements.txt
uvicorn app:app --reload
```

### 3. Start Backend Server (Node.js)
```bash
cd server
npm install
npm run dev
```

### 4. Start Client Web Dashboard
```bash
cd client-web
npm install
npm run dev
```

### 5. Start Client Mobile App
```bash
cd client-mobile
npm install
npx expo start
```

## Hackathon Highlights
- **Real-time graph visualization**: Shows up to 3-hops of fund flows instantly
- **Circular Pattern matching**: Built-in Cypher query detection for structuring layering
- **AI isolation scoring**: Connects to Python to score transaction batches
