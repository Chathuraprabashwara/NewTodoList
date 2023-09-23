import express from 'express';
import { Book } from '../model/bookModel.js';

const router = express.Router();

// Route for Save a new Book
router.post('/', async (request, response) => {
	try {
		if (
			!request.body.title ||
			!request.body.author ||
			!request.body.publishYear
		) {
			return response.status(400).send({
				message: 'Send all required fields: title,aurthor,publishYear',
			});
		}
		const newBook = {
			title: request.body.title,
			author: request.body.author,
			publishYear: request.body.publishYear,
		};

		const book = await Book.create(newBook);
		return response.status(201).send(book);
	} catch (error) {
		console.log(error.message);
		response.status(500).send({ message: error.message });
	}
});

//Route for Get All Books from database
router.get('/', async (req, res) => {
	try {
		const books = await Book.find({});
		return res.status(200).json({
			count: books.length,
			data: books,
		});
	} catch (error) {
		console.log(error.message);
		res.status(500).send({ message: error.message });
	}
});

//Route for Get one Book from database by id
router.get('/:id', async (req, res) => {
	try {
		const { id } = req.params;

		const book = await Book.findById(id);
		return res.status(200).json(book);
	} catch (error) {
		console.log(error.message);
		res.status(500).send({ message: error.message });
	}
});

//Route for update Book from database by id
router.put('/:id', async (req, res) => {
	try {
		if (!req.body.title || !req.body.author || !req.body.publishYear) {
			return response.status(400).send({
				message: 'Send all required fields: title,aurthor,publishYear',
			});
		}
		const { id } = req.params;
		const result = await Book.findByIdAndUpdate(id, req.body);

		if (!result) {
			return res.status(404).json({ message: 'Book not Found' });
		}

		return res
			.status(200)
			.send({ message: 'Book Upadate Successfully', data: req.body });
	} catch (error) {
		console.log(error.message);
		res.status(500).send({ message: error.message });
	}
});

// delete book
router.delete('/:id', async (req, res) => {
	try {
		const { id } = req.params;
		const result = await Book.findByIdAndDelete(id);

		if (!result) {
			return res.status(404).json({ message: 'Book not Found' });
		}

		res
			.status(200)
			.send({ message: 'Delete message Successfully', deleteBook: result });
	} catch (error) {
		console.log(error.message);
		res.status(500).send({ message: error.message });
	}
});

export default router;