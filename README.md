# SMART-SHOP PRODUCTS API

## Setup Instructions

1. Clone the repository.
2. Run `npm install` to install dependencies.
3. Create a `.env` file in the root directory with the following content:
DATABASE_URL=postgresql://username
@localhost:5432/smartshop
4. Ensure PostgreSQL is running and the database is set up with the provided SQL script.
5. Start the server using `npm run dev`.

## API Endpoints

- **Get All Products**
- Method: GET
- URL: `/products`

- **Get a Single Product**
- Method: GET
- URL: `/products/:id`

- **Create a Product**
- Method: POST
- URL: `/products`
- Body (JSON):
 ```json
 {
   "productThumbnail": "https://example.com/img3.jpg",
   "productTitle": "Product 3",
   "productDescription": "Description for product 3",
   "productCost": 39.99,
   "onOffer": true
 }
 ```

- **Update a Product**
- Method: PUT
- URL: `/products/:id`
- Body (JSON):
 ```json
 {
   "productThumbnail": "https://example.com/img3.jpg",
   "productTitle": "Updated Product 3",
   "productDescription": "Updated description for product 3",
   "productCost": 49.99,
   "onOffer": false
 }
 ```

- **Delete a Product**
- Method: DELETE
- URL: `/products/:id`
