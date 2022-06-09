import express from 'express';
import cors from 'cors';
import routes from './routes';
import logRequest from './middlewares/requestsLogger';
import 'dotenv/config';

const app = express();

app.use(cors());
app.use(logRequest);
app.use(express.json());
app.use(routes);
export default app;
