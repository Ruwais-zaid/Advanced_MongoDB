import express, { Request, Response } from 'express';
import  connectToDatabase from './DB/connection';
import ApiRoutes from './routes/transactionapi';
import { performTransaction} from './logs/TransactionDB';

const PORT = 8000;

const app = express();


app.use(express.json());
app.use(express.urlencoded({ extended: false }));


connectToDatabase();
//performTransaction()

app.use('/api/v1', ApiRoutes);


app.get('/', (req: Request, res: Response) => {
    res.json({
        message: "Server is running",
    });
});


app.listen(PORT, () => {
    console.log(`🚀 Server is running on http://localhost:${PORT}`);
});
