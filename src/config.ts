import { config as loadEnv } from 'dotenv';
import { str, num, cleanEnv, CleanEnv } from 'envalid';

const dotEnvPath = process.env.NODE_ENV === 'test' ? '.env.test' : undefined;

export const config = cleanEnv(
  { ...loadEnv({ path: dotEnvPath }).parsed, ...process.env },
  {
    REDIS_PORT: num(),
    REDIS_HOST: str()
  },
);

export type AppConfig = Readonly<{
  REDIS_PORT: number,
  REDIS_HOST: string
}> & CleanEnv;
