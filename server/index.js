const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');

const config = require('./config');
const FakeDb = require('./fake-db');
const productRouters = require('./routes/products');
const userRouters = require('./routes/users');

const app = express();
app.use(bodyParser.json());
app.use('/api/v1/products',productRouters);
app.use('/api/v1/users',userRouters);

// DB接続
mongoose.connect(config.DB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true
}).then(()=>{
  if(process.env.NODE_ENV !== 'production'){
    const fakeDb = new FakeDb();
    //fakeDb.initDb();
  }
});

if(process.env.NODE_ENV === 'production'){
  const appPath = path.join(__dirname, '..','dist','reserve-app');
  app.use(express.static(appPath));
  app.get("*", function(req,res){
    res.sendFile(path.resolve(appPath, 'index.html'));
  })
}

// ポート番号の指定対策(指定がなければ3001を使用)
const PORT = process.env.PORT || '3001';

app.listen(PORT,()=>{
  console.log('Node.js is runnning');
})

