import { Router } from 'express';
import postController from '../controllers/postController';

const postsRouter = Router();

postsRouter.get('/', postController.getAllPosts);
postsRouter.post('/', postController.createPost);
postsRouter.get('/:postId', postController.getPost);
postsRouter.put('/:postId', postController.updatePost);
postsRouter.delete('/:postId', postController.deletePost);

export default postsRouter;
