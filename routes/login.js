app.use(express.json());

// Serve static files (HTML, CSS, JS)
app.use(express.static('public'));

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
// Handle the "/login" route:

app.post('/login', (req, res) => {
    const { username } = req.body;
    // Store the username in local storage (for simplicity, using in-memory storage)
    req.session = { username }; // Simulated session for storing username
    res.redirect('/');
  });
//Handle message sending ("/send-message"):

app.post('/send-message', (req, res) => {
    const { message } = req.body;
    const { username } = req.session; // Retrieve username from session (simulated)
  
    // Store the message in a file
    fs.appendFile('messages.txt', `${username}: ${message}\n`, (err) => {
      if (err) throw err;
      console.log('Message saved!');
      res.send('Message sent successfully');
    });
  });
//Retrieve Messages ("/get-messages"):
app.get('/get-messages', (req, res) => {
    // Read messages from the file
    fs.readFile('messages.txt', 'utf8', (err, data) => {
      if (err) throw err;
  
      // Format messages to include sender's username
      const messages = data.split('\n').filter(Boolean).map((line) => {
        const [username, message] = line.split(':');
        return { username: username.trim(), message: message.trim() };
      });
  
      res.json(messages);
    });
  });
  