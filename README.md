# 📝 Blog Post CRUD App

A simple and interactive blog platform where users can:

- ✍️ Create blog posts
- 📖 View a list of posts
- ✏️ Edit existing posts
- ❌ Delete posts
- 🖼️ Live preview uploaded images

This project is built with **HTML**, **CSS**, and **vanilla JavaScript**, using [`json-server`](https://github.com/typicode/json-server) to simulate a REST API backend.

---

## 🚀 Getting Started

### 1. Clone or Download the Project

```bash
git clone https://github.com/your-username/blog-post-app.git
cd blog-post-app
Or manually download and unzip the folder.

### 2 . installation
Make sure you have Node.js installed. Then install json-server globally:

bash
Copy
Edit
npm install -g json-server
### 3. Start the JSON Server
From the project root (where db.json is located), run:

bash
Copy
Edit
json-server --watch db.json --port 3001 --host 127.0.0.1
You should see:

nginx
Copy
Edit
Resources
http://127.0.0.1:3001/posts
This serves the mock API at: http://127.0.0.1:3001/posts

### 4. Start the Frontend
Use the Live Server extension in VS Code or run a simple HTTP server:

Open index.html with Live Server

Visit: http://127.0.0.1:5500/

⚠️ Important: Make sure the site is loaded over http://, not https:// — otherwise, fetch() will be blocked due to CORS or "Upgrade Required" errors.

📁 Project Structure
bash
Copy
Edit
.
├── index.html          # Main HTML layout
├── script.js           # JavaScript functionality (CRUD + preview)
├── styles.css          # Custom styling
├── db.json             # Mock backend data
└── README.md           # You're here!
🧪 Sample Post Format in db.json
json
Copy
Edit
{
  "posts": [
    {
      "id": 1,
      "title": "First Post",
      "author": "Jane Doe",
      "date": "2025-06-26",
      "image": "https://example.com/image.jpg",
      "content": "This is my first blog post."
    }
  ]
}
You can edit db.json manually or use the web interface to add/remove posts.

🛠 Features
Blog list in sidebar

Post detail view

Add, Edit, and Delete buttons

Live image preview on input

Mobile-responsive design (if CSS is customized)

🙋‍♀️ Author
Built with ❤️(love) by [Maggie]
This project was developed as part of a learning phase on working with frontend and mock APIs using json-server.