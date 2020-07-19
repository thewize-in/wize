const authConfig = {
    jwtSecret: process.env.JWT_SECRET,
    jwtTokenExpiryTime: process.env.JWT_TOKEN_EXPIRY_TIME,
    googleClientId: process.env.GOOGLE_CLIENT_ID,
    databaseConnectionUrl: process.env.DATABASE_CONNECTION_URL,
    clientOriginUrl: process.env.CLIENT_ORIGIN_URL,
    redisServerPort: parseInt(process.env.REDIS_SERVER_PORT),
    redisServerUrl: process.env.REDIS_SERVER_URL,
    sessionSecret: process.env.SESSION_SECRET,
    sessionExpiryTime: parseInt(process.env.SESSION_EXPIRAY_TIME),
};

export { authConfig };
