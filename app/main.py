from utils.redis_client import RedisClient


if __name__ == '__main__':
    client = RedisClient(6379, '127.0.0.1')
    client.writeToRedis('py', 'This is value from Python client')

    messageFromRedis = client.readFromCache('py')
    print(f'Value from redis: {messageFromRedis}')
