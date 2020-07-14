import RedisClient from './utils/redis_client';


const client = new RedisClient(6379, '127.0.0.1');

client.writeToRedis('new-test0', 'My value awesome 1');

