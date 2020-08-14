import redis from 'redis';

const redisApplicationClient = redis.createClient({ db: 1 });

redisApplicationClient.on('connect', () => {
    console.log('[Redis application client]: Connected to redis server');
});

export { redisApplicationClient };
