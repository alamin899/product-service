import pool from '../config/db.js';

export const productList = async (req, res) => {
    try {
        const [products] = await pool.execute('SELECT * FROM products');

        res.json({
            message: "success",
            data: products,
            error: null,
        });
    } catch (err) {
        console.error('Fetch products error:', err.message);
        res.status(500).json({
            message: "Server error",
            data: null,
            error: err.message,
        });
    }
};
