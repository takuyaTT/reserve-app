const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');

const UserScheme = new Schema({
  username: {
    type: String, 
    required: true, 
    max:[60,'ユーザー名は最大60文字までです']
  },
  email: {
    type: String, 
    required: true, 
    lowercase:true,
    max:[60,'最大60文字までです'],
    unique: true
  },
  password: {
    type: String, 
    required: true, 
    max:[30,'パスワードは最大30文字までです'],
    min:[6,'パスワードは6文字以上で入力してください']
  }
});

// パスワードチェックメソッド
UserScheme.methods.hasSamePassword = function(inputPassword){
  const user = this;
  return bcrypt.compareSync(inputPassword,user.password);
};

// saveする前に実行する
UserScheme.pre('save',function(next){
  const user = this;
  const saltRounds = 10;

  bcrypt.genSalt(saltRounds, function(err, salt) {
    bcrypt.hash(user.password, salt, function(err, hash) {
        // Store hash in your password DB.
        user.password = hash;
        next();
    });
});
})

module.exports = mongoose.model('user',UserScheme);