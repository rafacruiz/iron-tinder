
import User from '../models/user.model.js';
import Session from '../models/session.model.js';
import Match from '../models/match.model.js';

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
    res.json(req.session.user);
}

export async function profile(req, res) {
    
    if (req.params.id === 'me') {
        res.json(req.session.user);
    } else { 
        const user = await User.findById(req.params.id);

        if (!user) throw createError(404, 'User not found');

        res.json(user);
    }  
}

export async function update(req, res) {
    
    Object.assign(req.session.user, req.body);

    await req.session.user.save();

    res.json(req.session.user);
}

export async function suggestions(req, res) {

    const user = req.session.user;

    const criteria = {
        _id: { $ne: user.id, $nin: [...user.likedUsers, ...user.passedUsers] },
        age: { $gte: user.preferences.ageMin, $lte: user.preferences.ageMax },
    };
    
    if (user.preferences.gender !== "everyone") {
        criteria.gender = user.preferences.gender;
    }

    const suggestions = await User.find(criteria);

    res.json(suggestions);
}

export async function like(req, res) {
    
    const userLike = req.params.userId;
    const userCurrent = req.session.user;

    if (userCurrent.id.toString() === userLike.toString()) 
        throw createError(400, "You cannot pass yourself");

    const user = await User.findByIdAndUpdate(userCurrent, { $addToSet: { likedUsers: userLike } });

    if (!user) throw createError(404, 'User Not Found');

    const userTarget = await User.findById(userLike);

    if (userTarget.likedUsers.includes(userCurrent.id)) {
        const match = await Match.create({
            users: [userLike, userCurrent.id]
        });

        res.json({
            'liked': true,
            'match': true,
            'matchId': userLike
        });
        return;
    } 

    res.json({ 
        'liked': true, 
        'match': false 
    });
}

export async function pass(req, res) {
    const userLike = req.params.userId;
    const userCurrent = req.session.user;

    if (userCurrent.id.toString() === userLike.toString()) 
        throw createError(400, "You cannot pass yourself");

    const user = await User.findByIdAndUpdate(userCurrent, { $addToSet: { passedUsers: userLike } });

    if (!user) throw createError(404, 'User Not Found');

    res.json({ 'passed': true });
}