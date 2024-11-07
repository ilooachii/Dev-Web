import express from "express";

import textRouter from "./routes/texts";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/texts", textRouter);

export default app;