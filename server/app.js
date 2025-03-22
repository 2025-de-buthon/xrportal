const express = require('express');
const app = express();
const dotenv = require('dotenv');
dotenv.config();
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./config/swagger');
const sequelize = require('./db');

const userRoutes = require('./routes/user');
const postRoutes = require('./routes/post');
const commentRoutes = require('./routes/comment');

const adRoutes = require('./routes/ad');
const transactionRoutes = require('./routes/transaction'); // 추가

app.use(express.json());

// Swagger API 문서 제공 (http://localhost:3000/api-docs)
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// 각 라우터를 prefix와 함께 등록
app.use('/users', userRoutes);
app.use('/posts', postRoutes);
app.use('/comments', commentRoutes);
app.use('/transactions', transactionRoutes); // 거래 내역 라우터 등록
// 기타 require 구문 위에


// 기존 라우터 등록 부분에 추가
app.use('/ads', adRoutes);


app.get('/', (req, res) => {
  res.send('Welcome to the Blockchain Blog API!');
});

// DB 동기화 후 서버 시작
sequelize.sync().then(() => {
  const port = process.env.PORT || 3000;
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
}).catch(err => {
  console.error("Error connecting to the database:", err);
});

module.exports = app;


