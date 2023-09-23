import express from 'express';
import { PORT, mongoDBURL } from './config.js';
import mongoose from 'mongoose';
import bookRoutes from './routes/bookRoutes.js';
import cors from 'cors';

const app = express();

// Middleware for parsing request body
app.use(express.json());

//Middleware for handling Cors policy
/*
option 1: allow all origins with default of cors(*)

*/
app.use(cors());

// app.use(
// 	cors({
// 		origin: 'http://localhost:5173',
// 		methods: ['GET', 'POST', 'PUT', 'DELETE'],
// 		allowedHeaders: ['Content-Type'],
// 	})
// );

app.get('/', (request, response) => {
	console.log(request);
	return response.status(234).send('welcome to MERN');
});

app.use('/books', bookRoutes);

//connect database and run server
mongoose
	.connect(mongoDBURL)
	.then(() => {
		console.log('Connect to the database  successfully');
		app.listen(PORT, () => {
			console.log(`App is listening to port: ${PORT}`);
		});
	})
	.catch((err) => {
		console.log({erroMessage: err})
	});
