import { Router } from 'express';
import multer from 'multer';
import { authMiddleware } from '../middlewares/auth.middleware.js';
import { sakushare } from '../controllers/ai.controller.js';

const router = Router();
const upload = multer({ storage: multer.memoryStorage() });

router.use(authMiddleware);

// router.post('/sakunap', upload.single('receipt'), sakunap);
// router.post('/sakuvoice', sakuvoice);
router.post('/sakushare', upload.single('transfer'), sakushare);

export default router;
