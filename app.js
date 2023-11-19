const express = require('express');
const fs = require('fs');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));


// Check if chatHistory.txt exists, and if not, create it
const chatHistoryFilePath = 'chatHistory.txt';
fs.access(chatHistoryFilePath, fs.constants.F_OK, (err) => {
  if (err) {
    fs.writeFile(chatHistoryFilePath, '', (err) => {
      if (err) {
        console.error('Error creating chatHistory.txt:', err);
      } else {
        console.log('chatHistory.txt created successfully');
      }
    });
  }
});

app.listen(3500, () => {
  console.log('Server is running on port 3500');
});

app.get('/', (req, res) => {
  // Read and display the chat messages from a file named 'chatHistory.txt'
  fs.readFile('chatHistory.txt', 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      res.send('No Chat Exists');
    } else {
      res.send(`
        ${data}
        <form action="/sendMessage" method="POST">
          <input id="message" name="message" type="text">
          <input id="username" type="hidden" name="username">
          <button type="submit">Send</button>
        </form>
      `);
    }
  });
});

app.post('/sendMessage', (req, res) => {
  const username = req.body.username ;
  const message = req.body.message;


  // Append the message to the chat history file
  fs.writeFile('chatHistory.txt', `${req.body.username}: ${req.body.message}\n`, { flag: 'a' }, (err) => {
    if (err) {
      console.error(err);
    }
    res.redirect('/');
  });
});

app.get('/login', (req, res) => {
  res.send(`
    <form action="/setUsername" method="POST">
      <input id="username" name="username" type="text" placeholder="Username">
      <button type="submit">Login</button>
    </form>
  `);
});

app.post('/setUsername', (req, res) => {
  const { username } = req.body;

  // Respond with a JavaScript snippet to set the username in localStorage and redirect to '/'
  res.send(`
    <script>
      localStorage.setItem('username', '${username}');
      window.location.href = '/';
    </script>
  `);
});
