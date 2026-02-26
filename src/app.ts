import express from 'express';
import cors from 'cors';
import passport from 'passport';
import './services/passport.service.js';
import authRoutes from './routes/auth.routes.js';
import categoryRoutes from './routes/category.routes.js';
import walletRoutes from './routes/wallet.routes.js';
import transactionRoutes from './routes/transaction.routes.js';

const app = express();

app.use(cors());
app.use(express.json());
app.use(passport.initialize());

app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok' });
});

app.use('/auth', authRoutes);
app.use('/categories', categoryRoutes);
app.use('/wallets', walletRoutes);
app.use('/transaction', transactionRoutes);

export default app;
