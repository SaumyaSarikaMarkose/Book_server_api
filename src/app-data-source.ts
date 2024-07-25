import { DataSource } from "typeorm"


export const myDataSource = new DataSource({
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "root",
    password: "1234567",
    database: "bookManagement",
    entities: [__dirname + "/entity/*.ts"],
    logging: false,
    synchronize: false,
})