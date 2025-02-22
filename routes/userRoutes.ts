import * as express from 'express';
import { pool } from '../config/config';
import { Room } from '../queries/chat_roomQueries';
const router = express.Router();

const BASE_ROUTE = '/users';

//@ts-ignore
router.post('/adduser' , async (req , res) => {
	const client = await pool.connect();

	const {user_id , github_id , user_email , image_url} = req.body;

	try{
		const {rowCount} = await client.query(Room.check_user , [user_id]);
		//@ts-ignore
		if(rowCount > 0) return res.status(201).json({statusCode : 201 , msg : "user already exists in cr"});
		const response = await client.query(Room.insert_user , [user_id , github_id , user_email , image_url]);

		if(response != null) return res.status(201).json({statusCode : 201 , msg : "user added from cr"});

		return res.status(404).json({statusCode : 404 , msg : "client side error"});
	}
	catch(err) {

		console.error(err);

		return res.status(500).json({statusCode : 500 , msg : "Internal Server Error"});
	}
	finally{
		client.release();
	}
} );


const MODULE = {
	BASE_ROUTE , router
}

export default MODULE;
