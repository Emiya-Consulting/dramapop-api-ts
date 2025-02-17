import {Router} from 'express';
import {
  createActor,
  updateActor,
  getActor,
  getActors,
  deleteActor,
} from '../handlers/actor';
import {
  createDrama,
  updateDrama,
  getDrama,
  getDramas,
  deleteDrama,
} from '../handlers/drama';

const router = Router();

router.post('/actors', createActor);
router.patch('/actors/:id', updateActor);
router.get('/actors', getActors);
router.get('/actors/:id', getActor);
router.delete('/actors/:id', deleteActor);

router.post('/dramas', createDrama);
router.patch('/dramas/:id', updateDrama);
router.get('/dramas', getDramas);
router.get('/dramas/:id', getDrama);
router.delete('/dramas/:id', deleteDrama);

export default router;
