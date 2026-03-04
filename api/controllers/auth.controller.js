
import User from '../models/user.model.js';
import Session from '../models/session.model.js';

import createError from 'http-errors';

export async function signup(req, res) {
    
    const user = await User.create(req.body);

    res.json(user);
}

export async function login(req, res) {
  
    const { email, password } = req.body;

    if (!email || !password ) throw createError(400, 'Fields required');

    const user = await User.findOne({ email });

    if (!user) throw createError(401, 'User not found');

    const match = await user.checkPassword(password);

    if (!match) throw createError(401, 'invalid password');

    const session = await Session.create({ user: user.id });

    res.cookie("sessionId", session.id, {
        httpOnly: true,
        secure: process.env.COOKIE_SECURE === "true",
        sameSite: process.env.COOKIE_SECURE === "true" ? "none" : undefined,
    });

  res.json(user);
}

export async function logout(req, res) {
    await Session.findByIdAndDelete(req.session.id);

    res.status(204).end();
}

export async function verify(req, res) {

    const sessionUser = await Session.findById(req.session.id).populate('user');

    res.json(sessionUser);
}