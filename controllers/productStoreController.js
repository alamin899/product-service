import pool from '../config/db.js';

export const storeProduct = async (req, res) => {
    const { name, price, quantity } = req.body;
    let connection;

    try {
        connection = await pool.getConnection(); // get connection from pool

        await connection.execute(
            'INSERT INTO products (name, price, quantity) VALUES (?, ?, ?)',
            [name, price, quantity]
        );

        const [products] = await connection.execute('SELECT * FROM products ORDER BY id DESC');

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
    } finally {
        if (connection) connection.release();
    }
};
