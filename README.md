# ts-redis-example

This is simple Redis client written in Typescript. The client has got few options:
- add to redis cache
- remove from redis cache
- check if the key exists in redis cache
- read value from redis cache

## How to run
- Install the package via ```npm install``` command
- Run tests via ```npm test``` command

## Additional notes
To perform local tests you need to have running redis instance.
The project must contain the .env file with values:
- REDIS_HOST=<address>
- REDIS_PORT=<port>
