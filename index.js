const express = require('express');
const { Pool } = require('pg');
const dotenv = require('dotenv');

// Load environment variables from .env file
dotenv.config({ path: './dev.env' });

const app = express();
const port = process.env.PORT || 3000;

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
});

app.use(express.json());

// Route to get all products
app.get('/products', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM products');
        res.json(result.rows);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

// Route to get a product by its ID
app.get('/products/:id', async (req, res) => {
    const productId = req.params.id;
    try {
        const result = await pool.query('SELECT * FROM products WHERE id = $1', [productId]);
        if (result.rows.length > 0) {
            res.json(result.rows[0]);
        } else {
            res.status(404).send('Product not found');
        }
    } catch (error) {
        console.error('Error fetching product:', error);
        res.status(500).send('Server error');
    }
});
//route for creating a new product
app.post('/products', async (req, res) => {
    const { productThumbnail, productTitle, productDescription, productCost, onOffer } = req.body;
    try {
        const result = await pool.query(
            'INSERT INTO products (productThumbnail, productTitle, productDescription, productCost, onOffer) VALUES ($1, $2, $3, $4, $5) RETURNING *',
            [productThumbnail, productTitle, productDescription, productCost, onOffer]
        );
        res.status(201).json(result.rows[0]);
    } catch (error) {
        console.error('Error creating product:', error);
        res.status(500).send('Server error');
    }
});
//route for updating a product
app.put('/products/:id', async (req, res) => {
    const productId = req.params.id;
    const { productThumbnail, productTitle, productDescription, productCost, onOffer } = req.body;
    try {
        const result = await pool.query(
            'UPDATE products SET productThumbnail = $1, productTitle = $2, productDescription = $3, productCost = $4, onOffer = $5 WHERE id = $6 RETURNING *',
            [productThumbnail, productTitle, productDescription, productCost, onOffer, productId]
        );
        if (result.rows.length > 0) {
            res.json(result.rows[0]);
        } else {
            res.status(404).send('Product not found');
        }
    } catch (error) {
        console.error('Error updating product:', error);
        res.status(500).send('Server error');
    }
});
// DELETE a product by its ID
app.delete('/products/:id', async (req, res) => {
    const productId = req.params.id;
    try {
        const result = await pool.query('DELETE FROM products WHERE id = $ RETURNING *', [productId]);
        if (result.rows.length > 0) {
            res.json({ message: 'Product deleted successfully' });
        } else {
            res.status(404).send('Product not found');
        }
    } catch (error) {
        console.error('Error deleting product:', error);
        res.status(500).send('Server error');
    }
});


// Define a route handler for the root URL
app.get('/', (req, res) => {
    res.send('Welcome to the Smart Shop API');
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
