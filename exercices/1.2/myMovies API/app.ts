import express, { RequestHandler } from "express";


import filmsRouter from "./routes/films";

const app = express();

let getRequestCounter = 0;

const countGetRequests: RequestHandler = (req, _res, next) => {
    if (req.method === 'GET') {
        getRequestCounter++;
        console.log(`GET counter: ${getRequestCounter}`);
    }
    next();  // Passe au middleware suivant ou à la route
};

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/films", filmsRouter);
app.use(countGetRequests);

export default app;
