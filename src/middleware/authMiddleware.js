import jwt from 'jsonwebtoken';
import { prisma } from '../config/db.js';

// Read the token from the request header and verify it
export const authMiddleware = async (req, res, next) => {
  //   console.log('authMiddleware called');
  //   try {
  //     const token = req.headers.authorization?.split(' ')[1];
  //     if (!token) {
  //       return res.status(401).json({ message: 'Unauthorized' });
  //     }
  //     const decoded = jwt.verify(token, process.env.JWT_SECRET);
  //     req.user = decoded;
  //     next();
  //   } catch (error) {
  //     res.status(401).json({ message: 'Invalid token' });
  //   }
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
  } else if (req.cookies?.jwtToken) {
    token = req.cookies.jwtToken;
  }
  if (!token) {
    return res
      .status(401)
      .json({ message: 'Unauthorized, No Token Found...!' });
  }

  try {
    // Verify the token and extract the user ID
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.id;

    // Fetch the user from the database using the extracted user ID
    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      return res.status(401).json({ error: 'Unauthorized, User Not Found' });
    }

    // Attach the user object to the request for use in subsequent middleware or route handlers
    req.user = user;
    next();
  } catch (error) {
    res.status(401).json({ error: 'Invalid token' });
  }
};
