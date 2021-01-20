const express = require('express');
const User = require('../model/user');
const router = express.Router();
const jwt = require('jsonwebtoken');
const config = require('../config/dev')

router.post('/login',(req,res)=>{
  const { email, password } = req.body;
  if(!email){
    // Invalid Error
    return res.status(422).send({errors: [{title: 'user error', detail : 'Eメールを正しく入力してください'}]})
  }
  if(!password){
    // Invalid Error
    return res.status(422).send({errors: [{title: 'user error', detail : 'パスワードを正しく入力してください'}]})
  }

  User.findOne({email},function(err,foundUser){
    if(err){
      // Error Message
      return res.status(422).send({errors: [{title: 'user error', detail : '認証中にエラーが発生しました'}]})
    }
    if(!foundUser){
      return res.status(422).send({errors: [{title: 'user error', detail : 'ユーザが存在しません'}]})
    }
    if(!foundUser.hasSamePassword(password)){
      return res.status(422).send({errors: [{title: 'user error', detail : 'パスワードが違います'}]})
    }

    // JWT発行
    const token = jwt.sign({
      userId: foundUser.id,
      username: foundUser.username
    }, config.SECRET,{ expiresIn: 60 * 30});

    return res.json(token);
  })

});

router.post('/register',(req,res)=>{
  const { username, email, password, confirmPassword} = req.body;
  /* 上は下と同じ意味
  const username = req.body.username;
  const email = req.body.email;
  const password = req.body.password;
  const confirmPassword = req.body.confirmPassword;
  */
  if(!username){
    // Invalid Error
    return res.status(422).send({errors: [{title: 'user error', detail : 'ユーザ名を入力してください'}]})

  }
  if(!email){
    // Invalid Error
    return res.status(422).send({errors: [{title: 'user error', detail : 'Eメールを正しく入力してください'}]})
  }
  if(!password){
    // Invalid Error
    return res.status(422).send({errors: [{title: 'user error', detail : 'パスワードを正しく入力してください'}]})
  }
  if(password !== confirmPassword){
    // Invalid Error
    return res.status(422).send({errors: [{title: 'user error', detail : 'パスワードを確認してください'}]})
  }
  
  User.findOne({email},(err,foundUser) => {
    if(foundUser){
      // Invalid Error
      return res.status(422).send({errors: [{title: 'user error', detail : 'ユーザが既に登録されています'}]})

    }
    if(err){
      // Error Message
      return res.status(422).send({errors: [{title: 'user error', detail : '認証中にエラーが発生しました'}]})
    }

    const user = new User({username,email,password});
    user.save((err)=>{
      if(err){
        // Error Message
        return res.status(422).send({errors: [{title: 'user error', detail : 'ユーザ作成に失敗しました'}]})
      }
        return res.json({"registerd":true});  
    })

  });
});


module.exports = router;