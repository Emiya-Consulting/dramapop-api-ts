import express, {Response, Request} from 'express';
import router from './routes/Drama';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use('/api/v1', router);

app.get('/', (req: Request, res: Response) => {
  res.send('Welcome to the DramaPop API');
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
