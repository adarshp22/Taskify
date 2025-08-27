## 📌 Taskify
- * Deployment URL: https://taskify-ui-flax.vercel.app/
- Taskify is a simple **Task Management Application** built using:  
- **Frontend:** React 
- **Backend:** Node.js + Express  
- **Database:** MongoDB  


It allows users to:  
- Create tasks  
- View all tasks  
- Update tasks  
- Delete tasks  

Yes ✅, this project uses a **REST API** for communication between frontend and backend.  

---

## 🛠️ Installation & Setup  

### 1. Clone the repository  
```bash
git clone https://github.com/your-username/Taskify.git
cd Taskify
2. Backend Setup
bash
Copy code
cd backend
npm install
Create a .env file in the backend folder and add:

ini
Copy code
DB_URL=your_mongodb_connection_string
PORT=8080
Run backend:

bash
Copy code
npm start
3. Frontend Setup
bash
Copy code
cd frontend
npm install
npm start
📂 Project Structure
csharp
Copy code
Taskify/
│── backend/        # Express + MongoDB server
│   ├── models/     # Mongoose models
│   ├── routes/     # API routes (REST API)
│   ├── controllers # Task controllers
│   └── server.js   # Entry point
│
│── frontend/       # React app
│   ├── src/        # Components & API calls
│   └── public/     
│
└── README.md
🌐 API Endpoints (REST API)
Base URL: http://localhost:8080

Method	Endpoint	Description
GET	/tasks	Fetch all tasks
POST	/tasks	Create a new task
PUT	/tasks/:id	Update a task
DELETE	/tasks/:id	Delete a task

✨ Features
CRUD operations on tasks

REST API integration

MongoDB for data persistence

Responsive frontend with React

🤝 Contributing
Pull requests are welcome.














