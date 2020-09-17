import CacheClient from '../src/utils/cache_client';


describe('Test Redis Cache Client', () => {
  const client = new CacheClient(6379, '127.0.0.1');

  afterAll(async () => {
    await client.closeConnection();
  });

  test('Test of saving and writing, should return the same value as set', async () => {
    const key = 'this-is-real-key';
    const value = 'this-is-real-value';
    await client.writeToCache(key, value);

    const data = await client.readFromCache(key);

    await expect(data).toEqual(value);
  });

  test('Test if given key to read does not exist, should return null', async () => {
    const key = 'not-exist';
    const data = await client.readFromCache(key);

    await expect(data).toBeNull();
  });

  test('Test if key is inside redis, should return true', async () => {
    const key = 'key-to-add';
    const value = 'value-of-key-to-add';

    await client.writeToCache(key, value);
    const result = await client.isKeyInCache(key);

    await expect(result).toBe(true);
  });

  test('Test if key is inside redis, should return false', async () => {
    const key = 'key-which-does-not-exits';
    const result = await client.isKeyInCache(key);

    await expect(result).toBe(false);
  });
});
