import { Router, RequestHandler } from 'express';
import { logUser, createUser } from "../controllers/auth";

const router = Router();

router.post('/signup', createUser as RequestHandler);
router.post('/login', logUser as RequestHandler);

export default router;