import express from 'express'
import { currentUser } from '@mfrtickets/common';

const router = express.Router();

router.get('/api/users/currentuser',
  currentUser,
  (req, res) => {
    res.send({ currentUser: req.currentUser || null });
  });

// export router as currentUserRouter 
// because there will be different types of routers
export { router as currentUserRouter };