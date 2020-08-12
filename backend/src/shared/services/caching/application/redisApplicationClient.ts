import redis from 'redis';

const redisApplicationClient = redis.createClient({ db: 1 });

redisApplicationClient.on('connect', () => {
    console.log('[redis application client]: Connected to redis server');
});

export { redisApplicationClient };
