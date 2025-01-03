import cors from 'cors';
import express, { Application } from 'express';
import globalErrorHandler from './app/middlewares/globalErrorHandler';
import notFound from './app/middlewares/notFound';
import router from './app/router';

const app: Application = express();

//parsers
app.use(express.json());
app.use(
    cors({
        origin: [
            'http://localhost:5173',
        ],
        credentials: true,
    }),
);

// application routes
app.use('/api', router);

app.use(globalErrorHandler);

app.use('*', notFound);

export default app;
