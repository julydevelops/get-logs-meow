import express from 'express';
import logsRouter from './routes/logs.router';
import { errorHandler } from './middlerware/errorHandler';

const app = express();
const PORT = process.env.PORT || 5001;

app.use(express.json());

app.use('/api/logs', logsRouter);

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});