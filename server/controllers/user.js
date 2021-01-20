const jwt = require('jsonwebtoken');
const config = require('../config/dev')
const User = require('../model/user')

function notAuthorized(res){
  return res.status(401).send({errors: [{title: 'Not Authrozed', detail : 'ログインしてください'}]})
}

exports.authMiddleware = function(req,res,next){
  // tokenを取得
  const token = req.headers.authorization;
  
  // tokenなし
  if(!token){
    return notAuthorized(res);
  }

  // tokenが有効か確認
  jwt.verify(token.split(' ')[1], config.SECRET,function(err,decodedToken){
    // 無効
    if(err){
      return res.status(401).send({errors: [{title: 'Not Authrozed', detail : '無効'}]})
    }
    // 有効→User確認
    User.findById(decodedToken.userId, function(err,foundUser){
      // userId関連（未定義とか？）でエラー
      if(err){
        return res.status(401).send({errors: [{title: 'Not Authrozed', detail : '無効'}]})
      }

      // ユーザーがいない
      if(!foundUser){
        return res.status(401).send({errors: [{title: 'Not Authrozed', detail : 'ユーザーがいません'}]})
      }

      // 問題なし
      next();
    })
  })
}