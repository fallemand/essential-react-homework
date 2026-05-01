import { Request, Response } from 'express';
import { Lottery } from './types';
const express = require('express');
const cors = require('cors');
const redis = require('redis');
const ulid = require('ulid');

// Types
type RequestBody<T> = {
  body: T;
};

type SuccessResponse<T> = {
  data: T;
};

type ErrorResponse = {
  error: string;
};

type BaseParams<IDType = number> = {
  id: IDType;
};

type APIResponse<T> = SuccessResponse<T> | ErrorResponse;

type ResponseStatus = 'Success' | 'Error';

type RegisterRequest = {
  lotteryId: string;
  name: string;
};

type RegisterResponse = {
  status: ResponseStatus;
};

// Redis setup

const { REDIS_URL } = process.env;
const client = redis.createClient({ url: REDIS_URL });
// This is going to write any Redis error to console.
client.on('error', (error: Error) => {
  console.error(error);
});

// Express setup

const app = express();
const port = 3000;
app.use(express.json({ limit: '10kb' }));

if (process.env.NODE_ENV === 'development') {
  // Enabling Cross-Origin Resource Sharing in development, as we run
  // the frontend and the backend code on different ports while developing.
  app.use(cors());
}

// API routes

app.get(
  '/lotteries',
  async (
    req: Request,
    res: Response<APIResponse<Lottery[]>>,
  ): Promise<void> => {
    try {
      const lotteryIds = await client.lRange('lotteries', 0, -1);

      const transaction = client.multi();
      lotteryIds.forEach((id: string) => transaction.hGetAll(`lottery.${id}`));
      const lotteries = await transaction.exec();

      res.json(lotteries);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to read the lotteries data' });
    }
  },
);

app.post(
  '/lotteries',
  async (
    req: Request<RequestBody<Lottery>>,
    res: Response<Lottery | ErrorResponse>,
  ): Promise<void> => {
    const { type, name, prize } = req.body;

    if (type !== 'simple') {
      res.status(422).json({ error: 'Invalid lottery type' });
      return;
    }

    if (typeof name !== 'string' || name.length < 3) {
      res.status(422).json({ error: 'Invalid lottery name' });
      return;
    }

    if (typeof prize !== 'string' || prize.length < 3) {
      res.status(422).json({ error: 'Invalid lottery prize' });
      return;
    }

    const id = ulid.ulid();
    const newLottery: Lottery = {
      id,
      name,
      prize,
      type,
      status: 'running',
    };

    try {
      await client
        .multi()
        .hSet(`lottery.${id}`, newLottery)
        .lPush('lotteries', id)
        .exec();

      res.json(newLottery);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to create the lottery' });
    }
  },
);

app.get(
  '/lottery/:id',
  async (
    req: Request<BaseParams>,
    res: Response<Lottery | ErrorResponse>,
  ): Promise<void> => {
    const { id } = req.params;

    try {
      const lottery = await client.hGetAll(`lottery.${id}`);

      if (!Object.keys(lottery).length) {
        res
          .status(404)
          .json({ error: 'A lottery with the given ID does not exist' });
        return;
      }

      res.json(lottery);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to read the lottery data' });
    }
  },
);

app.post(
  '/register',
  async (
    req: Request<RequestBody<RegisterRequest>>,
    res: Response<RegisterResponse | ErrorResponse>,
  ): Promise<void> => {
    const { lotteryId, name } = req.body;

    if (!lotteryId) {
      res.status(400).json({ error: 'Lottery ID must be provided' });
      return;
    }

    if (!name) {
      res.status(400).json({ error: "Participant's name must be provided" });
      return;
    }

    try {
      const lotteryStatus = await client.hGet(`lottery.${lotteryId}`, 'status');

      if (!lotteryStatus) {
        throw new Error("A lottery with the given ID doesn't exist");
      }

      if (lotteryStatus === 'finished') {
        throw new Error('A lottery with the given ID is already finished');
      }

      await client.lPush(`lottery.${lotteryId}.participants`, name);

      res.json({ status: 'Success' });
    } catch (error) {
      if (error instanceof Error) {
        console.error(error);
        res.status(500).json({
          error: `Failed to register for the lottery: ${error.message}`,
        });
      }
    }
  },
);

if (process.env.NODE_ENV === 'production') {
  // Serving the bundled frontend code together with the backend on the same port in production.
  app.use(express.static('client/dist'));
}

// Server start

app.listen(port, async () => {
  await client.connect();
  console.log(`Server listening on port ${port}`);
});
