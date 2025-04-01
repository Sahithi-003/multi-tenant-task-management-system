import Redis from "ioredis";
const redis = new Redis();

export const cacheGet = async (key: string) => {
  const data = await redis.get(key);
  return data ? JSON.parse(data) : null;
};

export const cacheSet = async (key: string, value: any, ttl = 60) => {
  await redis.set(key, JSON.stringify(value), "EX", ttl);
};
