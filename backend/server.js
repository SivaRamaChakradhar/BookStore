const express = require('express');
const connectDB = require('./config/db');
const dotenv = require('dotenv');
const cors = require("cors")
    
dotenv.config();

const userRoutes = require('./routes/userRoutes.js');
const bookRoutes = require('./routes/bookRoutes.js');
const cartRoutes = require('./routes/cartRoutes.js');
const orderRoutes = require('./routes/orderRoutes.js');
const adminRoutes = require('./routes/adminRoutes.js');
const wishlistRoutes = require('./routes/wishlistRoutes.js');
const sellerRoutes = require('./routes/sellerRoutes.js');


const app = express();

app.use(express.json());

app.use(cors())

connectDB();

app.use('/api/users', userRoutes)
app.use('/api/books', bookRoutes)
app.use('/api/cart', cartRoutes)
app.use('/api/orders', orderRoutes)
app.use("/api/admin", adminRoutes);
app.use("/api/wishlist", wishlistRoutes);
app.use("/api/seller", sellerRoutes);

const PORT = process.env.PORT || 5001;

app.listen(PORT, ()=>{
    console.log(`Server is running on port ${PORT}`);
})