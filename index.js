const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

app.get('/:dateString', (req, res) => {
  const dateString = req.params.dateString;
  let date;

  if (/^\d+$/.test(dateString)) {
    // If the input is a Unix timestamp
    date = new Date(parseInt(dateString));
  } else {
    // If the input is a natural language date string
    date = new Date(dateString);
  }

  if (isNaN(date.getTime())) {
    res.json({ error: 'Invalid date' });
  } else {
    res.json({ unix: date.getTime(), utc: date.toUTCString() });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
