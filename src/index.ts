import express, {Response, Request} from 'express';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use('/api/v1');

app.get('/', (req: Request, res: Response) => {
  res.send('Welcome to the DramaPop API');
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
