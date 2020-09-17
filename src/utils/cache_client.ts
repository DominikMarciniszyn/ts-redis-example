import { createHandyClient, IHandyRedis } from 'handy-redis';
import { config } from '../config';

/**
 * Cache client class integrated with handy-redis library.
 * The API is to use in asynchronous code.
 */
export default class CacheClient {
  private static client: IHandyRedis;
  private static cacheClient: CacheClient;
  private readonly VALUE_EXISTS = 1;

  /**
   * Create new cache client.
   *
   * @param port Port of the redis instance.
   * @param host Address of the redis instance.
   */
  private constructor() {
    CacheClient.client = createHandyClient(config.REDIS_PORT, config.REDIS_HOST);
  }

  /**
   * Get instance of the Cache Client.
   * Singleton pattern to prevent creating many instances of cache client.
   */
  public static getInstance(): CacheClient {
    if (!CacheClient.cacheClient) {
      CacheClient.cacheClient = new CacheClient();
    }

    return CacheClient.cacheClient;
  }

  /**
   * Save the value under given key to redis.
   * Recommended is to set up TTL because the default TTL is set to 60 seconds.
   *
   * @param key Redis key.
   * @param value Value to save in cache.
   * @param ttl TTL (time to live) of the key in redis.
   */
  writeToCache = async (key: string, value: string, ttl = 60): Promise<void> => {
     await CacheClient.client.set(key, value, [ 'EX', ttl ]);
  }

  /**
   * Get value from cache
   *
   * @param key
   */
  readFromCache = async (key: string): Promise<string | null> => {
    return CacheClient.client.get(key);
  }


  /**
   * Delete value from cache based on given key.
   *
   * @param key
   */
  deleteFromCache = async (key: string): Promise<void> => {
    await CacheClient.client.del(key);
  }

  /**
   * Check if key is inside the redis.
   *
   * @param key Redis key.
   *
   * @returns True if key exists, false if don't.
   */
  isKeyInCache = async (key: string): Promise<boolean> => {
    const isKeyInCache = await CacheClient.client.exists(key);

    return isKeyInCache === this.VALUE_EXISTS;
  }

  /**
   * Close connection to Redis.
   */
  closeConnection = async (): Promise<void> => {
    await CacheClient.client.quit();
  }
};
