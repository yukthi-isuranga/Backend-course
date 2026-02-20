import { prisma } from '../config/db.js';
import bcrypt from 'bcrypt';

const register = async (req, res) => {
  const body = req.body;
  const { name, email, password } = body;

  // check if user already exists
  const existingUser = await prisma.user.findUnique({
    where: { email },
  });
  if (existingUser) {
    return res.status(400).json({ message: 'User already exists' });
  }
  // Hash the password before storing it in the database
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  // Create the new user in the database with the hashed password
  const newUser = await prisma.user.create({
    data: {
      email,
      password: hashedPassword,
      name,
    },
  });

  //   res.json({ message: 'User registered successfully', body });
  res
    .status(201)
    .json({ status: 'User registered successfully', user: newUser });
};

const login = async (req, res) => {
  const body = req.body;
  const { email, password } = body;

  // check if user exists
  const existingUser = await prisma.user.findUnique({
    where: { email },
  });
  if (!existingUser) {
    return res.status(400).json({ message: 'Invalid email or password' });
  }

  // Compare the provided password with the hashed password in the database
  const isPasswordValid = await bcrypt.compare(password, existingUser.password);
  if (!isPasswordValid) {
    return res.status(400).json({ message: 'Invalid email or password xxxxx' });
  }

  // If login is successful, you can generate a token or set a session here
  res.json({ message: 'Login successful', user: existingUser });
};
export { register, login };
