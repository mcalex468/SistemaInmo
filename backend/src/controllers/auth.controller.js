import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { config } from '../utils/config.js';

const users = [config.users.admin, config.users.agent].map(user => ({
  ...user,
  passwordHash: bcrypt.hashSync(user.password, 10)
}));

const sanitizeUser = (user) => ({ email: user.email, name: user.name, role: user.role });

const findUser = (email) => users.find(u => u.email === email);

export const login = async (req, res) => {
  const { email, password } = req.body;
  const user = findUser(email);
  if (!user) {
    return res.status(401).json({ message: 'Credenciales inválidas' });
  }
  const valid = await bcrypt.compare(password, user.passwordHash);
  if (!valid) {
    return res.status(401).json({ message: 'Credenciales inválidas' });
  }
  const token = jwt.sign({ email: user.email, role: user.role, name: user.name }, config.jwtSecret, { expiresIn: '8h' });
  res.json({ token, user: sanitizeUser(user) });
};

export const me = (req, res) => {
  const user = findUser(req.user.email);
  if (!user) {
    return res.status(404).json({ message: 'Usuario no encontrado' });
  }
  res.json(sanitizeUser(user));
};

export const updateMe = async (req, res) => {
  const { name, password } = req.body;
  const user = findUser(req.user.email);
  if (!user) {
    return res.status(404).json({ message: 'Usuario no encontrado' });
  }
  if (name) user.name = name;
  if (password) {
    user.passwordHash = await bcrypt.hash(password, 10);
  }
  res.json(sanitizeUser(user));
};
