const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const config = require('./config/dev');
const FakeDb = require('./fake-db');
const productRouters = require('./routes/products');
const userRouters = require('./routes/users');

const app = express();
app.use(bodyParser.json());
app.use('/api/v1/products',productRouters);
app.use('/api/v1/users',userRouters);

mongoose.connect(config.DB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true
  //useFindAndModify: false,
}).then(()=>{
  const fakeDb = new FakeDb();
  fakeDb.initDb();
});

// ポート番号の指定対策(指定がなければ3001を使用)
const PORT = process.env.PORT || '3001';

app.listen(PORT,()=>{
  console.log('Node.js is runnning');
})

