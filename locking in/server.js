const express = require("express");
const mysql = require("mysql2");
const path = require("path");
const app = express();

// 1. Middleware
app.use(express.json());
// Serves your images, CSS, and HTML files automatically from your folder
app.use(express.static(path.join(__dirname)));

// 2. Database Connection
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Richard@16", // Your DBeaver password
  database: "neomart_db",
});

// Connect and check for errors
db.connect((err) => {
  if (err) {
    console.error("Database connection failed: " + err.stack);
    return;
  }
  console.log("Connected to MySQL Database.");
});

// 3. HOME ROUTE: Make the site start at Login automatically
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "login.html"));
});

// 4. REGISTER ROUTE: Add User Logic
app.post("/register", (req, res) => {
  const { full_name, email, password } = req.body;
  const sql =
    "INSERT INTO users (full_name, email, password_hash) VALUES (?, ?, ?)";

  db.query(sql, [full_name, email, password], (err, result) => {
    if (err) {
      console.error(err);
      return res
        .status(500)
        .json({ success: false, message: "Error adding user." });
    }
    res.json({ success: true, message: "Account created! You can now login." });
  });
});

// 5. LOGIN ROUTE: Check User Logic (CONFIRMED FIXED)
app.post("/login", (req, res) => {
  const { email, password } = req.body;
  const sql = "SELECT * FROM users WHERE email = ? AND password_hash = ?";

  db.query(sql, [email, password], (err, results) => {
    if (err) {
      return res.status(500).json({ success: false, message: "Server error." });
    }

    if (results.length > 0) {
      // 1. Grab the name from the database
      const userName = results[0].full_name || "Valued Customer";

      // 2. Send it back to the browser
      res.json({
        success: true,
        message: "Welcome back!",
        name: userName, // This is what the Shop page reads
        redirect: "new1.html",
      });
    } else {
      res.json({
        success: false,
        message: "Wrong Input: Invalid email or password.",
      });
    }
  });
});

// 6. START THE SERVER
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`NeoMart Server running at http://localhost:${PORT}`);
});
