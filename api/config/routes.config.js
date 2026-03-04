import { Router } from "express";
import createHttpError from "http-errors";

import * as User from '../controllers/auth.controller.js';

const router = Router();

router.post('/auth/signup', User.signup);
router.post('/auth/login', User.login);
router.delete('/auth/logout', User.logout);
router.get('/auth/verify', User.verify);

router.get('/profile/:id', User.profile);
router.patch('/profile', User.update);

router.use((req, res) => {
  throw new createHttpError(404, "Route Not Found");
});

export default router;

// TODO: Import Router from express
// TODO: Import your controllers
// TODO: Define all API routes:
//
//   Profile:
//     PATCH  /profile
//
//   Suggestions:
//     GET    /suggestions
//
//   Likes:
//     POST   /likes/:userId
//     POST   /pass/:userId
//
//   Matches:
//     GET    /matches
//
//   Messages:
//     GET    /messages/:matchId
//     POST   /messages/:matchId
//
// TODO: Add a catch-all route that throws a 404 error
// TODO: Export the router
