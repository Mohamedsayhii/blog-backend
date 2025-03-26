import { Router } from 'express';
import * as commentsController from '../controllers/commentsController.js';

const commentsRouter = Router();

commentsRouter.get('/comments', commentsController.getAllComments);
commentsRouter.get('/:postId/comments', commentsController.getAllPostComments);
commentsRouter.post('/:postId/comments', commentsController.createComment);
commentsRouter.put(
	'/:postId/comments/:commentId',
	commentsController.updateComment
);
commentsRouter.delete(
	'/:postId/comments/:commentId',
	commentsController.deleteComment
);

export default commentsRouter;
