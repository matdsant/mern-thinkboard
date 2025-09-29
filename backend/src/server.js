import 'dotenv/config';
import express from 'express';
import notesRoutes from './routes/notesRoutes.js';
import { connectDB } from './config/db.js';
import rateLimiter from './middleware/rateLimiter.js';

const app = express();
const PORT = process.env.PORT || 5001;

// Middleware
app.use(express.json());
app.use(rateLimiter);

// Route
app.use('/api/notes', notesRoutes);

try {
  await connectDB();
  app.listen(PORT, () => {
    console.log(`Server started on PORT: ${PORT}`);
  });
} catch (error) {
  console.error('Application not started, failed to connect to Database.');
  process.exit(1);
}
