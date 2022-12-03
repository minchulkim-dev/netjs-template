import { registerAs } from '@nestjs/config';

export default registerAs(
  'app',
  (): Record<string, any> => ({
    env: process.env.NODE_ENV || 'development',
    port: process.env.PORT || '3000',
  }),
);
