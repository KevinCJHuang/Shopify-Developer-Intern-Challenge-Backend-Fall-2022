const express = require('express');
const connectDB = require('./config/db');

const app = express();

// Connect Database
connectDB();

// Init Middleware
app.use(express.json({ extended: false }));

// Listen on port 6000
const PORT = 6000;

app.listen(PORT, () => console.log(`server started on port ${PORT}`));

// app.use('/register', require('./routes/register'));
// app.use('/auth', require('./routes/auth'));
app.use('/inventory', require('./routes/inventory'));
app.use('/warehouse', require('./routes/warehouse'));
