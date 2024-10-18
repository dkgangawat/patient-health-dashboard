import jwt, { Secret } from 'jsonwebtoken';
import { NextFunction, Request, Response } from "express";
import path from "path";
import User from '../models/userSchema';
// import User from '../models/userSchema';



const auth = async (req: Request, res: Response, next: NextFunction) => {
    if (path.basename(req.url) === 'login' ||
        path.basename(req.url) === 'register') {
        return next();
    }
    const token = req.headers['authorization']?.split(' ')[1];
    console.log("token" ,token)
    if (!token) {
        return res.status(401).json({ msg: 'No token, authorization denied' });
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET as Secret);
        const user = await User.findById((decoded as any)._id);
        if (!user) {
            return res.status(401).json({ msg: 'Invalid token' });
        }
        next();
    } catch (error) {
        console.error(error)
        console.error('something wrong with auth middleware');
        res.status(500).json({ msg: 'Invalid token or something went wrong' });
    }
}

export default auth;
