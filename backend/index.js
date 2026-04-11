const express = require('express');
const bodyParser = require('body-parser');
const sqlite3 = require('sqlite3').verbose();

const app = express();
const PORT = 3000;

// Middleware
app.use(bodyParser.json());

// Initialize SQLite database
const db = new sqlite3.Database('./kdp_factory.db', (err) => {
  if (err) console.error('Database connection failed:', err.message);
  else console.log('Connected to SQLite database');
});

// Create tables
const createTables = () => {
  db.run(`CREATE TABLE IF NOT EXISTS projects (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    status TEXT NOT NULL,
    created_at TEXT DEFAULT CURRENT_TIMESTAMP
  )`);

  db.run(`CREATE TABLE IF NOT EXISTS outputs (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    project_id INTEGER NOT NULL,
    manuscript TEXT,
    cover_image TEXT,
    metadata TEXT,
    FOREIGN KEY(project_id) REFERENCES projects(id)
  )`);
};

createTables();

// Routes
app.get('/projects', (req, res) => {
  db.all('SELECT * FROM projects', [], (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      res.json(rows);
    }
  });
});

app.post('/projects', (req, res) => {
  const { name, status } = req.body;
  db.run(
    `INSERT INTO projects (name, status) VALUES (?, ?)`,
    [name, status],
    function (err) {
      if (err) {
        res.status(500).json({ error: err.message });
      } else {
        res.json({ id: this.lastID });
      }
    }
  );
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});