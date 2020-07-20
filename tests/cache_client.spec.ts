import CacheClient from '../src/utils/cache_client';


test('Check what is in the cache', async () => {
  const client = new CacheClient(6379, '127.0.0.1');
  await client.writeToCache('this-is-real-key', 'this-is-real-value');

  const data = await client.readFromCache('test');

  await expect(data).toBe('value');
});
