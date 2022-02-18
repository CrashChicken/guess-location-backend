import { env } from 'process';

export default () => ({
  //port: parseInt(process.env.PORT, 10) || 3000,
  jwt: {
    access: {
      secret: process.env.JWT_ACCESS_SECRET || 'verysecureaccesssecret',
      expiresIn: process.env.JWT_ACCESS_EXPIRE || '60s',
    },
    refresh: {
      secret: process.env.JWT_REFRESH_SECRET || 'verysecurerefreshsecret',
      expiresIn: process.env.JWT_REFRESH_EXPIRE || '120s',
    },
  },
  database: {
    host: process.env.DATABASE_HOST || '127.0.0.1',
    port: parseInt(process.env.DATABASE_PORT, 10) || 5432,
    user: process.env.DATABASE_USERNAME || 'location',
    password: process.env.DATABASE_PASSWORD || 'location',
    database: process.env.DATABASE_DATABASE || 'location',
  },
  aws: {
    accessKey: process.env.AWS_ACCESS_KEY,
    secretKey: process.env.AWS_SECRET_KEY,
    bucketRegion: process.env.AWS_BUCKET_REGION,
    bucketName: process.env.AWS_BUCKET_NAME,
  },
});
