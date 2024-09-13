import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import path from 'path';
import { fileURLToPath } from 'url';

// Import routes
import postRoutes from './routes/postRoutes.js';

// Get the directory name for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = 3000;

// Connect to MongoDB
mongoose.connect('mongodb+srv://workforabhinavkumar:abhinav@cluster.3dbdr.mongodb.net/blogApp', {
})
.then(() => console.log('MongoDB connected'))
.catch(err => {
    console.error('MongoDB connection error:', err);
    process.exit(1); // Exit the process with failure code
});

// Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json()); // Add support for JSON payloads
app.use(express.static(path.join(__dirname, 'public'))); // Ensure static files are served correctly

// Set EJS as the templating engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Use routes
app.use(postRoutes);

// Error handling middleware
// app.use((req, res, next) => {
//     res.status(404).render('404'); // Render a custom 404 page if needed
// });

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
