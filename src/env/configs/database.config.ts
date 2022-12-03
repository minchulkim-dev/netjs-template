import { registerAs } from '@nestjs/config';

export default registerAs(
  'database',
  (): Record<string, any> => ({
    host: process.env.DATABASE_HOST || 'mongodb://localhost',
    port: process.env.DATABASE_PORT || 27017,
    name: process.env.DATABASE_NAME || 'test',
    user: process.env.DATABASE_USER || 'root',
    password: process.env.DATABASE_PASSWORD || 'example',
    options:
      process.env.NODE_ENV === 'development'
        ? 'authSource=admin&retryWrites=true&w=majority'
        : 'authSource=admin&readPreference=primary&ssl=true',
    debug: process.env.DATABASE_DEBUG === 'true' || false,
  }),
);
