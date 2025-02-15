import express, {Response, Request} from 'express';
import routes from './routes/Drama';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use('/api/v1', routes);

app.get('/', (req: Request, res: Response) => {
  res.send('Welcome to the DramaPop API');
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
