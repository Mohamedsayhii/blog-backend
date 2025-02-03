import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import routes from './routes/indexRouter.js';

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/posts', routes.posts);
app.use('/posts', routes.comments);
app.use('/auth', routes.auth);

app.listen(3000, console.log('express server is listening on port 3000'));
