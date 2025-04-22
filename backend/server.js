require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const fileupload = require('express-fileupload');

const apiRoutes = require('./src/routes');

mongoose.connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});
mongoose.Promise = global.Promise;

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));

const app = express();

app.use(cors());
app.use(fileupload());
app.use(express.static(__dirname + '/public'));
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use('/', apiRoutes);

// const authRoutes = require('./routes/auth');
// const userRoutes = require('./routes/user');
// const categoryRoutes = require('./routes/category');
// const productRoutes = require('./routes/product');
// const cartRoutes = require('./routes/cart');
// const paymentRoutes = require('./routes/payment');
// const orderRoutes = require('./routes/order');

// app.use('/api', authRoutes);
// app.use('/api', userRoutes);
// app.use('/api', categoryRoutes);
// app.use('/api', productRoutes);
// app.use('/api', cartRoutes);
// app.use('/api', paymentRoutes);
// app.use('/api', orderRoutes);

app.listen(process.env.PORT, () => {
    console.log(`Server is running on: ${process.env.BASE}`);
});