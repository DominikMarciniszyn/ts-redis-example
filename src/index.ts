// NODE-REDIS CLIENT
// import RedisClient from './utils/redis_client';


// const client = new RedisClient(6379, '127.0.0.1');
// client.writeToRedis('new-test0', 'My value awesome 1');
// console.log('After write to cache');
// client.readFromRedis('new-test0');



// HANDY-REDIS CLIENT
import HandyClient from './utils/handy_redis_client';

const client = new HandyClient(6379, '127.0.0.1');

client.handyWriteToCache('ala', 'ma kota w redisie');

let x = client.handyReadFromCache('ala');

console.log(`Why my value of X is not what I expect? ${x}`);
