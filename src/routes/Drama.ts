import {Router} from 'express';
import {
  createDrama,
  updateDrama,
  getDrama,
  getDramas,
  deleteDrama,
} from '../handlers/Drama';

const router = Router();

router.post('/dramas', createDrama);
router.patch('/dramas/:id', updateDrama);
router.get('/dramas', getDramas);
router.get('/dramas/:id', getDrama);
router.delete('/dramas/:id', deleteDrama);

export default router;
