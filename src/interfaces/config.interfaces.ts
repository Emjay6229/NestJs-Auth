interface IMongoDbConfig {
    connectionString: string
}

interface IConfig {
    port: number
    jwtSecret: string
    database: IMongoDbConfig
}