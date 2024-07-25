import { myDataSource } from "./app-data-source";
import "reflect-metadata"; 
import {createExpressServer,Action } from "routing-controllers";
import { LoggingMiddleware } from "./middlewares/sample.middleware";
import { authChecker } from "./middlewares/jwt.middleware";



async function initializeDataSource() {
    try {
        await myDataSource.initialize();
        console.log("Data Source has been initialized!");
    } catch (error) {
        console.error("Error during Data Source initialization:", error);
        process.exit(1); 
    }
}


initializeDataSource().then(() => {
    const app = createExpressServer({
        routePrefix: "/api/v1",
        controllers: [__dirname + '/controllers/*.ts'], 
        middlewares: [LoggingMiddleware],
        authorizationChecker: authChecker,
        validation: true
    })
    
    app.listen(3000, () => {
        console.log('\x1b[38;5;2m',"Server is running on port 3000 ........................",'\x1b[0m');
    });
});