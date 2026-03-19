const mysql = require("mysql2");

// 1. Setup the connection - UPDATE THE PASSWORD BELOW
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Richard@16", // <-- CHANGE THIS to your actual MySQL password
  database: "neomart_db",
});

// 2. The Logic to check for "Wrong Input"
function loginUser(emailInput, passwordInput) {
  // We define 'sql' here so it is not 'undefined'
  const sql = "SELECT * FROM users WHERE email = ? AND password_hash = ?";

  connection.query(sql, [emailInput, passwordInput], (err, results) => {
    if (err) {
      // If your password above is wrong, this error will trigger
      console.error("Database Connection Error:", err.message);
      return;
    }

    if (results.length > 0) {
      // SUCCESS: The database found the user
      console.log("-----------------------------------------");
      console.log("SUCCESS: Welcome, " + results[0].full_name + "!");
      console.log("Redirecting to: new1.html");
      console.log("-----------------------------------------");
    } else {
      // THE "WRONG INPUT" LOGIC: No match found
      console.log("-----------------------------------------");
      console.log("LOGIN ERROR: Invalid email or password.");
      console.log("Please check your inputs and try again.");
      console.log("-----------------------------------------");
    }

    // Closes the connection after the check is done
    connection.end();
  });
}

// 3. Test the function
// Use the exact email and password you saved in your DBeaver table
loginUser("richardfrimpong905@gmail.com", "12345678");
