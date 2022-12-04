import { registerAs } from '@nestjs/config';

export default registerAs(
  'jwt',
  (): Record<string, any> => ({
    accessTokenSecretKey:
      process.env.JWT_ACCESS_TOKEN_SECRET || 'random_string_nkjnk',
    refreshTokenSecretKey:
      process.env.JWT_REFRESH_TOKEN_SECRET || 'random_string_nbnjka',
  }),
);
