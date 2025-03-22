const express = require('express');
const dotenv = require('dotenv');
const app = express();

dotenv.config();
app.use(express.json());

// 라우터 연결
app.use('/posts', require('./app/routes/postRoutes'));
app.use('/users', require('./app/routes/userRoutes'));
app.use('/comments', require('./app/routes/commentRoutes'));
app.use('/ads', require('./app/routes/adRoutes'));
app.use('/transactions', require('./app/routes/transactionRoutes'));

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
