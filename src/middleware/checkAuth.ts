import jwt from 'express-jwt';

export default jwt({ secret: process.env.TOKEN_SECRET as string });
