import {Router, Request, Response} from 'express';
import Drama from '../models/Drama';

const router = Router();

const dramas: Drama[] = [
  {
    id: 100001,
    title: 'Extraordinary Attorney Woo',
    year: 2022,
    rating: 10,
    createdOn: '2/14/2025',
    modifiedOn: '2/14/2025',
    deleted: false,
  },
  {
    id: 100002,
    title: 'The Glory',
    year: 2023,
    rating: 9.5,
    createdOn: '2/14/2025',
    modifiedOn: '2/14/2025',
    deleted: false,
  },
];

// Get all dramas
router.get('/dramas', (req: Request, res: Response) => {
  res.json(dramas);
});

// Get a drama by id
router.get('/dramas/:id', (req: Request, res: Response) => {
  const dramaID = parseInt(req.params.id);
  const drama = dramas.find(d => d.id === dramaID);
  if (drama) {
    res.json(drama);
  } else {
    res.status(404).json({message: 'Drama not found'});
  }
});

// Create a new drama
router.post('/dramas', (req: Request, res: Response) => {
  const newDrama: Drama = {
    id: dramas.length + 100000,
    title: req.body.title,
    year: parseInt(req.body.year),
    rating: parseInt(req.body.rating),
    createdOn: Date.now().toString(),
    modifiedOn: Date.now().toString(),
    deleted: false,
  };
  dramas.push(newDrama);
  res.status(201).json(newDrama);
});

export default router;
