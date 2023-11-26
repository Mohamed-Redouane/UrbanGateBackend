// references : https://www.honeybadger.io/blog/javascript-authentication-guide/
import express from 'express';
import connectDB from './utils/mdbconfig.js';
import cors from 'cors'
import routes from './api/routes.js';

const app = express();
app.use(cors());  //helps control and secure cross origin requests between frontend and backend applications hosted on different domains(ports).
app.use(express.json());

//

connectDB().then(() => { // connect the server with the database
        console.log("Connected to the database")
    }).catch((err) => {
        console.error(err)
    })
    app.use(routes);  

    const PORT =  3000;
    app.listen(PORT, () => {
        console.log(`Server is running in ${PORT}`);
    });
    




