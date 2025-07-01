import pool from '../config/db.js';

export const storeProduct = async (req, res) => {
    const { name, price,quantity } = req.body;

    try {
        await pool.execute(
            'INSERT INTO products (name, price,quantity) VALUES (?, ?, ?)',
            [name, price,quantity]
        );

        const [products] = await pool.execute('SELECT * FROM products order by id desc');
        res.status(201).json({
            message: "Product created successfully",
            data: products,
            error: null,
        });
    } catch (err) {
        console.error('Insert product error:', err.message);
        res.status(500).json({
            message: "Server error",
            data: null,
            error: err.message,
        });
    }
};
