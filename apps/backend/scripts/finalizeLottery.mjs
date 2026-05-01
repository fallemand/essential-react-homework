import { createClient } from 'redis';
import random from 'random';

const { REDIS_URL } = process.env;
const client = createClient({ url: REDIS_URL });
client.on('error', (error) => {
  console.error(error);
});

async function finalizeLottery() {
  if (process.argv.length !== 3) {
    console.log('Incorrect usage. Usage: yarn finalize <lottery_id>');
    return;
  }

  const lotteryId = process.argv[2];

  try {
    await client.connect();
    const lotteryExists = await client.hExists(
      `lottery.${lotteryId}`,
      'status'
    );

    if (!lotteryExists) {
      throw new Error("A lottery with the given ID doesn't exist");
    }

    const lotteryStatus = await client.hGet(`lottery.${lotteryId}`, 'status');

    if (lotteryStatus === 'finished') {
      throw new Error('A lottery with the given ID is already finished');
    }

    const participants = await client.lRange(
      `lottery.${lotteryId}.participants`,
      0,
      -1
    );

    if (!participants.length) {
      throw new Error('A lottery with the given ID has no participants');
    }

    const winner = random.choice(participants);

    await client
      .multi()
      .hSet(`lottery.${lotteryId}`, 'winner', winner)
      .hSet(`lottery.${lotteryId}`, 'status', 'finished')
      .exec();

    console.log('Successfully finalized the lottery!');
    console.log('Participants:', participants);
    console.log('The lucky winner:', winner);
  } catch (e) {
    console.log('Error finalizing the lottery:', e.message);
  } finally {
    await client.disconnect();
  }
}

finalizeLottery();
