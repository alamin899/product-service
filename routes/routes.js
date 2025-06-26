import express from 'express';
import { productList } from '../controllers/productFetchController.js';
import { storeProduct } from '../controllers/productStoreController.js';
import { validateMiddleware } from '../middlewares/validate.js';
import { verifyToken } from '../middlewares/authVerifyMiddleware.js';
import { productValidator } from '../validators/storeProductValidator.js';

const router = express.Router();

router.get('/', productList);
router.post('/', verifyToken,productValidator,validateMiddleware, storeProduct); // 👈 protected

export default router;
