import pool from '../config/db.js';

export const productList = async (req, res) => {
    let connection;
    try {
        connection = await pool.getConnection();
        const [products] = await connection.execute('SELECT * FROM products');

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
    } finally {
        if (connection) connection.release();
    }
};
