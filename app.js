import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import routes from './routes/indexRouter.js';
import errorHandler from './controllers/errorController.js';

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/posts', routes.posts);
app.use('/comments', routes.comments);
app.use('/auth', routes.auth);

app.use(errorHandler);

app.listen(3000, console.log('express server is listening on port 3000'));
