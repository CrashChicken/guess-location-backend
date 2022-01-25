export default () => ({
  //port: parseInt(process.env.PORT, 10) || 3000,
  database: {
    //type: process.env.DATABASE_CONNECTION || 'postgres',
    host: process.env.DATABASE_HOST || '127.0.0.1',
    port: parseInt(process.env.DATABASE_PORT, 10) || 5432,
    user: process.env.DATABASE_USERNAME || 'location',
    password: process.env.DATABASE_PASSWORD || 'location',
    database: process.env.DATABASE_DATABASE || 'location',
  },
});
