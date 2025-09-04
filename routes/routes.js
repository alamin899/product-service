import express from 'express';
import { productList } from '../controllers/productFetchController.js';
import { storeProduct } from '../controllers/productStoreController.js';
import { validateMiddleware } from '../middlewares/validate.js';
import { verifyToken } from '../middlewares/authVerifyMiddleware.js';
import { productValidator } from '../validators/storeProductValidator.js';

const router = express.Router();

router.get('/cpu-heavy', (req, res) => {
  const calculateFibonacci = (n) => {
    if (n <= 1) return n;
    return calculateFibonacci(n - 1) + calculateFibonacci(n - 2);
  };

  const result = calculateFibonacci(40); // Adjust the number for higher/lower CPU usage
  res.json({ message: 'CPU-heavy task completed', result });
});

// RAM-heavy route: Simulates high memory usage by creating a large array
router.get('/ram-heavy', (req, res) => {
  const largeArray = Array(1e7).fill('RAM-heavy test'); // Creates an array with 10 million elements
  res.json({ message: 'RAM-heavy task completed', size: largeArray.length });
});
router.get('/', productList);
router.post('/', verifyToken,productValidator,validateMiddleware, storeProduct); // 👈 protected

export default router;
