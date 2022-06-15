import express from 'express'
import 'express-async-errors'
import { json } from 'body-parser'
import cookieSession from 'cookie-session';
import { currentUser, errorHandler } from '@mfrtickets/common';
import { NotFoundError } from '@mfrtickets/common';
import { createTicketRouter } from './routes/new';
import { showTicketRouter } from './routes/show';
import { indexTicketRouter } from './routes';
import { updateTicketRouter } from './routes/update';

const app = express();
app.set('trust proxy', true); // set express to trust ingress nginx proxy
app.use(json());

// cookie session middlware
app.use(
  cookieSession({
    signed: false, // dont encrypt because we will use JWT in cookies
    secure: process.env.NODE_ENV !== 'test' // cookies will only be used in HTTPS connection
  })
);

app.use(errorHandler);
app.use(currentUser);

// routes
app.use(createTicketRouter);
app.use(showTicketRouter);
app.use(indexTicketRouter);
app.use(updateTicketRouter);

app.all('*', async () => {
  throw new NotFoundError();
});


export { app };