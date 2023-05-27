export default {
  jwt: {
    token_secret: process.env.TOKEN_SECRET || 'token',
    token_expires_in: '1d',
    refresh_token_secret: process.env.REFRESH_TOKEN_SECRET || 'refresh_token',
    refresh_token_expires_in: '30d',
    refresh_token_expire_days: 30,
  },
};
