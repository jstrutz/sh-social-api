import dotenv from "dotenv"

import express, { Request, Response } from 'express';
import * as EmailValidator from 'email-validator';

import { buildClearbitClient } from './clearbit';
import { buildSqliteClient } from './sqlite';

dotenv.config()

async function start() {
  const PORT = process.env.PORT || 8000;
  const app = express();

  const clearbit = buildClearbitClient({ CLEARBIT_API_KEY: process.env.CLEARBIT_API_KEY });
  const db = await buildSqliteClient({ DB_FILE: process.env.DB_FILE });

  app.get('/profiles', async (req: Request, res: Response) => {
    const email = req.query.email as string;
    if (!EmailValidator.validate(email)) {
      res.status(400).send({ "error": "Invalid email address " });
      return;
    }

    const profile = await clearbit.search(email);
    if (!profile) {
      res.status(404).send({ "error": "Email not found" });
      return;
    }

    await db.run(
      `INSERT INTO profiles (email, clearbit_profile) VALUES (?, ?)
      ON CONFLICT (email) DO UPDATE SET view_count=view_count+1,clearbit_profile=?`, email, profile, profile);
    res.send(profile);
  });

  app.get('/views', async (req: Request, res: Response) => {
    res.send(await db.all("SELECT email, view_count FROM profiles ORDER BY view_count DESC"));
  });

  app.listen(PORT, () => {
    console.log(`⚡️[server]: Server is running at http://localhost:${PORT}`);
  });
}

start();
