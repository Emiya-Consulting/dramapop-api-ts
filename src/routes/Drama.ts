import {Router} from 'express';
import {getAllDramas, createDrama} from '../handlers/Drama';

const router = Router();

router.get('/dramas', getAllDramas);
router.post('/dramas', createDrama);

export default router;
