import express from 'express';
import routes from './routes';
import logRequests from './middlewares/requestsLogger';

const app = express();

app.use(logRequests);
app.use(express.json());
app.use(routes);

export { app };
