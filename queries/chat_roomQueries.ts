import { querymap } from "../lib/types"
export const Room : querymap = {
  is_blocked : `select * from blocked_users where room_id = $2 and user_id = $1` ,
  insert_msg : `insert into messages (room_id , user_id ,content) values($1 , $2 , $3);` ,
  block_user : `insert into blocked_users (room_id , user_id) values ($1 , $2) ;` ,
  p_lift     : `insert into admins (room_id , user_id) values ($1 , $2);` ,
  insert_user : `insert into users (users_id , github_id , user_email , avatar_url) values ($1 , $2 , $3 , $4); ` , 
  check_user :	`select * from users where users_id = $1;`,

}
