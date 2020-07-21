import CacheClient from '../src/utils/cache_client';


test('Check what is in the cache', async () => {
  let client = new CacheClient(6379, '127.0.0.1');
  const key = 'this-is-real-key';
  const value = 'this-is-real-value';
  await client.writeToCache(key, value);

  const data = await client.readFromCache(key);

  await expect(data).toBe(value);

  client.closeConnection();
});
