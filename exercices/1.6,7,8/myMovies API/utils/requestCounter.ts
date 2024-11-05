import { RequestHandler } from "express";

/* Middleware to count the number of requests (GET, POST, DELETE...) */
const stats: Record<string, number> = {};

const requestCounterMiddleware: RequestHandler = (req, _res, next) => {
  const currentOperation = `${req.method} ${req.path}`;
  const currentOperationCounter = stats[currentOperation];

  if (currentOperationCounter === undefined) {
    stats[currentOperation] = 0; // Initialise si non existant
  }

  stats[currentOperation] += 1; // Incrémente le compteur

  const statsMessage = `Request counter : \n${Object.keys(stats)
    .map((operation) => `- ${operation} : ${stats[operation]}`)
    .join("\n")}`;
  
  console.log(statsMessage); // Affiche le compteur des requêtes

  next(); // Passe à la prochaine étape
};

export { requestCounterMiddleware };