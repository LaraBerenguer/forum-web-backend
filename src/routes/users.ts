import { Router, RequestHandler } from 'express';
import { addUser, getUser } from "../controllers/user";

const router = Router();

router.get('/:id', getUser as RequestHandler);
router.post('/signup', addUser as RequestHandler);

export default router;