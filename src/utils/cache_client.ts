import { createHandyClient, IHandyRedis } from 'handy-redis';

/**
 * Cache client class integrated with handy-redis library.
 * The API is to use in asynchronous code.
 */
export default class CacheClient {
  private client: IHandyRedis;
  private readonly VALUE_EXISTS = 1;

  /**
   * Create new cache client.
   *
   * @param port Port of the redis instance.
   * @param host Address of the redis instance.
   */
  constructor(port: number, host: string) {
    this.client = createHandyClient(port, host);
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
     await this.client.set(key, value, [ 'EX', ttl ]);
  }

  /**
   * Get value from cache
   *
   * @param key
   */
  readFromCache = async (key: string): Promise<string | null> => {
    return await this.client.get(key);
  }

  /**
   * Check if key is inside the redis.
   *
   * @param key Redis key.
   *
   * @returns True if key exists, false if don't.
   */
  isKeyInCache = async (key: string): Promise<boolean> => {
    const isKeyInCache = await this.client.exists(key);

    if (isKeyInCache !== this.VALUE_EXISTS) {
      return false;
    } else {
      return true;
    }
  }

  /**
   * Close connection to Redis.
   */
  closeConnection = async (): Promise<void> => {
    this.client.quit();
  }
};
