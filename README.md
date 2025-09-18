# AlgoAssist (Full MERN + OpenAI demo)
## Contents
- backend/  -> Express server (calls OpenAI if OPENAI_API_KEY is provided, otherwise mock responses)
- frontend/ -> Vite React frontend (Tailwind CDN used for styling)
## Quick start
1. Extract the zip and open in VS Code.
2. Start MongoDB (e.g., `mongod --dbpath /path/to/db` or use MongoDB Atlas).
3. Backend:
   - cd backend
   - npm install
   - copy .env.example to .env and set OPENAI_API_KEY if you have one.
   - npm start
4. Frontend:
   - cd frontend
   - npm install
   - npm run dev
5. Open the frontend (Vite will show the URL, usually http://localhost:5173).
