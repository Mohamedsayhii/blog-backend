import { Router } from 'express';
import * as postController from '../controllers/postController.js';

const postsRouter = Router();

postsRouter.get('/', postController.getAllPosts);
postsRouter.post('/', postController.createPost);
postsRouter.get('/:postId', postController.getPost);
postsRouter.put('/:postId', postController.updatePost);
postsRouter.delete('/:postId', postController.deletePost);

export default postsRouter;
