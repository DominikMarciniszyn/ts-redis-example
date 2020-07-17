import redis from 'redis';


export default class RedisClient {
  private client: redis.RedisClient;

  constructor(port, host) {
    this.client = redis.createClient(port, host);
  }

  writeToRedis = (key: string, value: string, ttl = 60): void => {
    this.client.set(key, value, 'EX', ttl);
  }

  readFromRedis = async (key: string) => {
    this.client.get(key, () => {

    });

    await this.client.get(key, (error, reply) => {
      if (error) {
        throw new Error(error.message);
      }

      console.log(reply);
    });
  }
}
