import { pool } from "../config/config";
import { crQueries } from "../queries";
import { datamap } from "../lib/types";
import { Socket } from "socket.io";
import axios from "axios";

const flask_toxicity_url = 'http://localhost:5000/check'
const join_room = async (socket : Socket, data : datamap  ) => {
  const { user_id, room_id } = data;
  console.log(user_id , room_id);
  const client = await pool.connect();

  try {

    //const { rowCount } = await client.query(crQueries.is_blocked, [user_id, room_id]);

    if (true) {
      socket.join(room_id);
      console.log(`user joined the room`);
    }
    else { console.log(`the user: [${user_id}] is blocked in this room`); return; }
  }
  catch (err) {
    console.error(err);
    return;
  }
  finally {
    client.release();
  }
}

const send_message = async (socket : Socket, data : datamap , io : any) => {
  const { user_id, room_id, msg  , user_email} = data;
  console.log(user_id + " " + room_id + " " + msg);
  const message = {text : msg};
  const client = await pool.connect();
  try {
    const isPg = await axios.post(flask_toxicity_url , {text : msg , mail_address : user_email});
    if(!isPg.data.toxic) {
      io.to(room_id).emit('message', { user_id, msg });
      const { rows, rowCount } = await client.query(crQueries.insert_msg, [room_id, user_id, message]);
    }
    else{
      let m = `message from ${user_id} is not safe for community hence deleted`;
      io.to(room_id).emit('message' , {user_id , m});
    }

  }
  catch (err) { console.error(err); return; }

  finally {  client.release(); }
}

const block_user = async (socket : Socket, data : datamap , io : any) => {

  const { user_id, room_id } = data;
  const client = await pool.connect();
  try {
    const { rows, rowCount } = await client.query(crQueries.block_user, [room_id, user_id]);
    if (rows !== null) io.to(room_id).emit('alert', { msg: `user${user_id} has been blocked from the room : ${room_id}` });
  }
  catch (err) { console.error(err);return; }
  
  finally { client.release(); }

}

const privelege_lift = async (socket : Socket , data : datamap) =>  { 
  const {user_id , room_id} = data;
  const client = await pool.connect();
  try{
      const {rows , rowCount} = await client.query(crQueries.p_lift , [room_id , user_id]) ;

  }
  catch (err) { console.error(err); return; }

  finally { client.release(); }

}

const disconnect = async (socket : Socket) => { console.log(`user disconnected`); } 

const MODULE : any = { join_room , send_message , block_user , privelege_lift , disconnect };
export default MODULE;
