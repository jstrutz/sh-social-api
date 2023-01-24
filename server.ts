import dotenv from "dotenv"

import express, { Express, Request, Response } from 'express';

import { buildClearbitClient } from './clearbit';
import { sqlite } from './sqlite';

dotenv.config()

function validatedProfileEmail(email?: string) : string {
  // TODO validate
  return email || "";
}

async function start() {
  const PORT = process.env.PORT || 8000;
  const app = express();

  const clearbit = buildClearbitClient({ CLEARBIT_API_KEY: process.env.CLEARBIT_API_KEY });
  const db = sqlite({ DB_FILE: process.env.DB_FILE });

  app.get('/profiles', async (req: Request, res: Response) => {
    const email = validatedProfileEmail(req.query.email as string);
    const profile = await clearbit.search(email);
    if (profile) {
      res.send(profile);
    }
    else {
      res.status(404).send({ "error": "Email not found" });
    }
  });

  app.get('/views', (req: Request, res: Response) => {
    res.send([
      
      { email: 'a@a.com', count: 2 }, { email: 'b@b.com', count: 1 }
    ]);
  });

  app.listen(PORT, () => {
    console.log(`⚡️[server]: Server is running at http://localhost:${PORT}`);
  });
}

start();
