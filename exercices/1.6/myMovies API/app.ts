import express from "express";
import { requestCounterMiddleware } from "./utils/requestCounter";

import movieRouter from "./routes/movies";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/movies", movieRouter);
app.use(requestCounterMiddleware);

let getCounter = 0;
app.use((req, _res, next) => {
    if(req.method === 'GET') {
        getCounter++;
        console.log(`GET counter : ${getCounter}`);
    }
    next();
});


export default app;
