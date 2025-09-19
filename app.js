import express from 'express';
import dotenv from 'dotenv';
import productRoutes from './routes/routes.js';
import logMiddleware from './middlewares/logMiddleware.js';

dotenv.config();

const app = express();
app.use(express.json());
app.use(logMiddleware);

app.use('/api/products', productRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Product service running on port ${PORT}`));
