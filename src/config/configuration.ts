// arrow function with implicit return syntax
export default (): IConfig => ({
    port: parseInt(process.env.port, 10) || 3000,
    database: {
       connectionString: process.env.MongoUri
    }
})