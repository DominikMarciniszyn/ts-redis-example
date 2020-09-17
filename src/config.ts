import { str, num, cleanEnv, CleanEnv } from 'envalid';


export const config = cleanEnv(
  process.env,
  {
    REDIS_PORT: num(),
    REDIS_HOST: str()
  },
);

export type AppConfig = Readonly<{
  REDIS_PORT: number,
  REDIS_HOST: string
}> & CleanEnv;
