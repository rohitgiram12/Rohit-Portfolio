const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/contactForm', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.log(err));

// Define a schema and model
const messageSchema = new mongoose.Schema({
    name: String,
    email: String,
    subject: String,
    message: String,
});

const Message = mongoose.model('Message', messageSchema);

// Endpoint to handle form submission
app.post('/api/contact', (req, res) => {
    const newMessage = new Message(req.body);
    newMessage.save()
        .then(() => res.status(201).json({ message: 'Message sent successfully!' }))
        .catch(err => res.status(400).json({ error: 'Error sending message' }));
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});