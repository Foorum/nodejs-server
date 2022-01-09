import express, { Request, Response, Application } from 'express';

import * as cors from 'cors';
import * as helmet from 'helmet';

import { createServer } from 'http';
import { Server } from 'socket.io';

import methodOverride from 'method-override';
import mongoose from 'mongoose';
import { ApolloServer, gql } from 'apollo-server-express';

const db = mongoose.connection;
const app: Application = express();

const http = createServer(app);

const PORT = process.env.PORT || 8080;

let MongoDB_URI =
	process.env.mongoDB_URI || 'mongodb://127.0.0.1:27017/foorum-server';
mongoose.connect(MongoDB_URI, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
	useFindAndModify: false,
});

app.use(
	helmet.default({
		contentSecurityPolicy: false,
		crossOriginResourcePolicy: { policy: 'cross-origin' },
		crossOriginEmbedderPolicy: true,
		noSniff: true,
		xssFilter: true,
		hidePoweredBy: true,
	}),
);
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb' }));

app.use(methodOverride('_method'));
app.use(express.json());

app.use((req, res, next) => {
	res.header('Access-Control-Allow-Origin', '*');

	next();
});

app.get('/', (req: Request, res: Response): void => {
	res.send('Hello Typescript with Node.js!');
});

async function startServer() {
	await new Promise((resolve) => {
		console.log(`Server Running here 👉 http://localhost:${PORT}`);

		return http.listen({ port: PORT });
	})
		.then(() => {
			return { app };
		})

		.catch(() => {
			return { app };
		});
}

startServer();
