import { Router } from 'express';
import * as authController from '../controllers/authController.js';

const authRouter = Router();

authRouter.post('/login', authController.login);
authRouter.post('/signup', authController.signup);

export default authRouter;
