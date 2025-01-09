import { Router } from 'express';

const authRouter = Router();

authRouter.post('/', authController.login);
authRouter.post('/', authController.signup);

export default authRouter;
