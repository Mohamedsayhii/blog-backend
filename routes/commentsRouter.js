import { Router } from 'express';
import commentsController from '../controllers/commentsController';

const commentsRouter = Router();

commentsRouter.get('/:postId/comments', commentsController.getAllComments);
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
