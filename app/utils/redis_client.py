import redis


class RedisClient:
    def __init__(self, port: int, host: str):
        self.client = redis.Redis(host=host, port=port, db=0)

    def writeToRedis(self, key: str, value: str) -> None:
        self.client.set(key, value)

    def readFromCache(self, key: str) -> str:
        return self.client.get(key)
