import redis from 'redis';
const redisSessionClient = redis.createClient({ db: 0 });

redisSessionClient.on('connect', () => {
    console.log(`[Redis Session Client]: Connected to redis server`);
});

export { redisSessionClient };
