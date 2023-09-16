// arrow function with implicit return syntax
export default (): IConfig => ({
    port: parseInt(process.env.port, 10) || 3000,
    jwtSecret: process.env.secret,
    database: {
       connectionString: process.env.MongoUri
    }
})