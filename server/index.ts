import express, {Express,Request, Response} from 'express';
import morgan from 'morgan';
import dotenv from 'dotenv';
import cors from "cors";
import './config/DB/connection'
import router from './routes';
import cookieParser from 'cookie-parser'
import auth from './middlewares/auth';
const app:Express = express();
const port = 5000;

app.use(express.json())
app.use(cookieParser())
dotenv.config();
app.use(express.urlencoded({ extended: true }))
app.use(morgan('combined'));
app.use(cors(
    {
        origin: ['http://localhost:3000','https://patient-health-dashboard-virid.vercel.app'],
        credentials: true
    }
));

app.get('/hello', (req:Request, res:Response) => {
    res.send('Hello, world!');
});

app.use('/api',auth, router);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

export default app;