import express from 'express';
import routes from './routes';
import logRequests from './middlewares/requestsLogger';
import cors from 'cors';

const app = express();

app.use(cors());
app.use(logRequests);
app.use(express.json());
app.use(routes);

export { app };
