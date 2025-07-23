const express = require("express");
const router = express.Router();
const db = require("../db");

// Home - Form
router.get("/", (req, res) => {
  res.render("index", { error: null });
});

// Create user
router.post("/submit", (req, res) => {
  const { username, email, age, gender, password } = req.body;
  if (parseInt(age) < 18) {
    return res.render("index", { error: "Age must be 18 or above." });
  }
  const sql = "INSERT INTO users (username, email, age, gender, password) VALUES (?, ?, ?, ?, ?)";
  db.query(sql, [username, email, age, gender, password], (err) => {
    if (err) throw err;
    res.redirect("/dashboard");
  });
});

// Read - Dashboard
router.get("/dashboard", (req, res) => {
  db.query("SELECT * FROM users", (err, results) => {
    if (err) throw err;
    res.render("dashboard", { users: results });
  });
});

// Edit Form
router.get("/edit/:id", (req, res) => {
  db.query("SELECT * FROM users WHERE id = ?", [req.params.id], (err, result) => {
    if (err) throw err;
    res.render("edit", { user: result[0] });
  });
});

// Update User
router.post("/update/:id", (req, res) => {
  const { username, email, age, gender, password } = req.body;
  const sql = "UPDATE users SET username=?, email=?, age=?, gender=?, password=? WHERE id=?";
  db.query(sql, [username, email, age, gender, password, req.params.id], (err) => {
    if (err) throw err;
    res.redirect("/dashboard");
  });
});

// Delete User
router.get("/delete/:id", (req, res) => {
  db.query("DELETE FROM users WHERE id=?", [req.params.id], (err) => {
    if (err) throw err;
    res.redirect("/dashboard");
  });
});

module.exports = router;
