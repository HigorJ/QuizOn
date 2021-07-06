import express from 'express';
import routes from './routes.js';
import cors from 'cors';
import path from 'path';

const app = express();

app.use(cors());
app.use(express.json());
app.use(routes);

app.use((error, req, res, next) => {
    if(error && error.status) {
        res.status(error.status).json({
            error: error.message,
            status: error.status
        });
    } else {
        console.log(error);
        return res.status(500).json({ 
            error: "Try again later!", 
            status: 500 
        });
    }
});

app.use('/uploads', express.static(path.resolve(path.resolve(), 'uploads')));


app.listen(3333);