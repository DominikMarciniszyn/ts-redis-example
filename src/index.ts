import CacheClient from './utils/cache_client';


const main = async () => {
  const client = new CacheClient(6379, '127.0.0.1');
  const key = 'test-key';
  const value = 'The information for Redis...';

  await client.writeToCache(key, value);

  let message = await client.readFromCache(key);

  console.log(`The value in Redis for key: ${key} is ${message}`);

  let isInCache = await client.isKeyInCache(key);
  console.log(`Is the value in cache? ${isInCache}`);
}


main();
