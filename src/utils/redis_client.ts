import redis from 'redis';


export default class RedisClient {
  private client: redis.RedisClient;

  constructor(port, host) {
    this.client = redis.createClient(port, host);
  }

  writeToRedis = async (key: string, value: string, ttl = 60): Promise<void> => {
    this.client.set(key, value, 'EX', ttl);
  }

  readFromRedis = async (key: string): Promise<boolean> => {
    return this.client.get(key);
  }
}
