interface IMongoDbConfig {
    connectionString: string
}

interface IConfig {
    port: number
    database: IMongoDbConfig
}