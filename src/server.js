import Hapi from '@hapi/hapi'
import routes from "./routes";
import {db} from "./routes/database";



let server
const start = async () => {
    server = Hapi.server({
        port:8081,
        host:'localhost',
    })
   routes.forEach(route => server.route(route));
    db.connect()
    await server.start();
    console.log(`server is listening on ${server.info.uri}`);

}



process.on('SIGINT', async () => {
    console.log('Stopping server ...')
    await server.stop({timeout: 10000});
    db.end();
    console.log('Server  stopped');
    process.exit(0);
})

start()