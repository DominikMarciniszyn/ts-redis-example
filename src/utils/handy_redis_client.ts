import { createHandyClient, IHandyRedis } from 'handy-redis';


export default class HandyClient {
  private client: IHandyRedis;

  constructor(port: number, host: string) {
    this.client = createHandyClient(port, host);
  }

  handyWriteToCache = async (key: string, value: string, ttl = 60) => {
     await this.client.set(key, value, [ 'EX', ttl ]);
  }

  handyReadFromCache = async (key: string) => {
    const value = await this.client.get(key);

    console.log(`Value from cache: ${value}`);

    return value;
  }
};
