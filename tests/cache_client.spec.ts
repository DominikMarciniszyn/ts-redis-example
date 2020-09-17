import CacheClient from '../src/utils/cache_client';


describe('Test Redis Cache Client', () => {
  let cache: CacheClient;

  beforeAll(async () => {
    cache = CacheClient.getInstance();
  });

  afterAll(async () => {
    await cache.closeConnection();
  });

  it('Test of saving and writing, should return the same value as set', async () => {
    const key = 'this-is-real-key';
    const value = 'this-is-real-value';
    await cache.writeToCache(key, value);

    const data = await cache.readFromCache(key);

    await expect(data).toEqual(value);
  });

  it('Test if given key to read does not exist, should return null', async () => {
    const key = 'not-exist';
    const data = await cache.readFromCache(key);

    await expect(data).toBeNull();
  });

  it('Test if key is inside redis, should return true', async () => {
    const key = 'key-to-add';
    const value = 'value-of-key-to-add';

    await cache.writeToCache(key, value);
    const result = await cache.isKeyInCache(key);

    await expect(result).toBe(true);
  });

  it('Test if key is inside redis, should return false', async () => {
    const key = 'key-which-does-not-exits';
    const result = await cache.isKeyInCache(key);

    await expect(result).toBe(false);
  });

  it('Test if key-value was removed from cache', async () => {
    const key = 'key-to-remove';
    const value = 'value-of-key-to-remove';

    await cache.writeToCache(key, value, 120);
    await cache.deleteFromCache(key);
    const isKeyExists = await cache.isKeyInCache(key);

    await expect(isKeyExists).toBe(false);
  });

  it('Check the singleton pattern, should be only one Cache client instance', () => {
    const anotherCache = CacheClient.getInstance();

    expect(cache).toBeInstanceOf(CacheClient);
    expect(anotherCache).toBeInstanceOf(CacheClient);
    expect(cache).toBe(anotherCache);
  });
});
