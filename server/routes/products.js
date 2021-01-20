const express = require('express');
const Product = require('../model/product');
const router = express.Router();
const UserCtrl = require('../controllers/user');

router.post('/secret',UserCtrl.authMiddleware, (req,res)=>{
  return res.json({"sercret": true});
});

router.get('',(req,res)=>{
  Product.find({},(err,foundProducts)=>{
    return res.json(foundProducts);
  })
});

router.get('/:productId', UserCtrl.authMiddleware, (req,res)=>{
  const productId = req.params.productId;
  Product.findById(productId,(err,foundProduct)=>{
    if(err){
      return res.status(422).send({errors: [{title: 'product error', detail : 'product not found'}]})
    }
    return res.json(foundProduct);
  })
});


module.exports = router;