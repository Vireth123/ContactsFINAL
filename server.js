const express = require('express');
const fs = require('fs');
const app = express();
const port = 3000;

// Parse incoming JSON request bodies
app.use(express.json());

// Endpoint to receive IP logs from the frontend
app.post('/logs', (req, res) => {
  const logData = req.body;

  // Create a log entry
  const logEntry = `
    IP: ${logData.ip}
    Country: ${logData.country}
    City: ${logData.city}
    Continent: ${logData.continent}
    Region: ${logData.region}
    ISP: ${logData.isp}
    Timestamp: ${new Date().toISOString()}
    -------------------------------
  `;

  // Append the log entry to the logs.txt file
  fs.appendFile('logs.txt', logEntry, (err) => {
    if (err) {
      console.error('Error writing to log file:', err);
      return res.status(500).send('Error saving log data');
    }

    console.log('Log saved');
    res.status(200).send('Log saved successfully');
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
