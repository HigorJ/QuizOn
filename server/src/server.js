import express from 'express';
import { createServer } from 'http';

import cors from 'cors';
import path from 'path';

import routes from './routes.js';
import ErrorConfig from './utils/ErrorConfig.js';
import { socketConfig, events } from './socket/Events.js';

const app = express();

app.use(cors());
app.use(express.json());
app.use(routes);
app.use(ErrorConfig);
app.use('/uploads', express.static(path.resolve(path.resolve(), 'uploads')));

const httpServer = createServer(app);

const io = socketConfig(httpServer);
events(io);

httpServer.listen(3333);