import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import cors from 'cors';
import {Response , Express } from 'express';
import cookieParser from 'cookie-parser';
import {Server} from 'socket.io';
import { createServer } from 'http';
import { SockerController } from '../controllers';
import { UserRoute } from '../routes';
const app : Express = express();
const allowedOrigins : string  = "*";
const corsOptions = {
    origin : allowedOrigins ,
    methods : "GET,POST,PUT,PATCH,HEAD,DELETE",
    credentials : true ,
    optionsSuccessStatus : 200

}
app.use(express.json());
app.use(cors(corsOptions));
app.use(cookieParser());

const PORT = process.env.PORT || 9696 ;

app.get('/' , (_ , res : Response) => { res.status(200).json({msg : 'working.....'}) });

app.use(UserRoute.BASE_ROUTE ,UserRoute.router);
const server = createServer(app);

const io = new Server(server , {
  cors : {
    origin : allowedOrigins,
    credentials : true 
  }
});

server.listen(PORT , () => { console.log(`[server]: i am running at http://localhost/${PORT}`) }) ;

io.on('connection' , (socket) => {

  console.log(`user-connected: ${socket.id}`);

  socket.on('joinRoom' , (data) => SockerController.join_room(socket , data));
  socket.on('message' , (data) => SockerController.send_message(socket , data , io)) ;
  socket.on('block_user' , (data) => SockerController.block_user(socket , data)) ;
  socket.on('priviledge_lift' , (data) => SockerController.priviledge_lift(socket , data)) ;
  socket.on('disconnect' , () => SockerController.disconnect(socket)) ;

});





