import { Router } from 'express';
import * as commentsController from '../controllers/commentsController.js';

const commentsRouter = Router();

commentsRouter.get('/', commentsController.getAllComments);
commentsRouter.get('/:postId', commentsController.getAllPostComments);
commentsRouter.post('/:postId', commentsController.createComment);
commentsRouter.put('/:commentId', commentsController.updateComment);
commentsRouter.delete('/:commentId', commentsController.deleteComment);

export default commentsRouter;
