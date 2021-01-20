// Product変数にproductモジュールを紐付け
const Product = require('./model/product');

// クラス宣言で生成
class FakeDb {
  constructor(){
    this.products = [
      {
        coverimage: 'assets/img/original.jpg',
        name: 'Phone ',
        price: 699,
        description: '5Gの速さ。スマートフォンで最速のX14 Bionicチップ。エッジからエッジまで広がるOLEDディスプレイ。Phone 、登場。',
        heading1:'飛び抜けた5Gスピード',
        headingmessage1:'どれよりも早く、どれよりも優雅で、どの機種よりも快適。そんなPhoneです。',
        heading2:'飛び抜けたデザイン',
        headingmessage2:'どんな機種よりも飛び抜けたデザイン。そんなPhoneです。',
        heading3:'飛び抜けたカメラ',
        headingmessage3:'どの機種のカメラより、誰が撮っても素晴らしいクオリティー。そんなPhoneです。',
        heading4:'飛び抜けた値段',
        headingmessage4:'どのメーカーのSmartPhoneより高機能、なのにお手頃なプライス。'
      },
      {
        coverimage: 'assets/img/original.jpg',
        name: 'Phone Mini',
        price: 799,
        description: '5Gの速さ。スマートフォンで最速のX14 Bionicチップ。耐落下性能を4倍向上させるCeramic Shield。Phone Mini、登場。',
        heading1:'飛び抜けた5Gスピード',
        headingmessage1:'どれよりも早く、どれよりも優雅で、どの機種よりも快適。そんなPhone Miniです。',
        heading2:'飛び抜けたデザイン',
        headingmessage2:'どんな機種よりも飛び抜けたデザイン。そんなPhone Miniです。',
        heading3:'飛び抜けたカメラ',
        headingmessage3:'どの機種のカメラより、誰が撮っても素晴らしいクオリティー。そんなPhone Miniです。',
        heading4:'飛び抜けた値段',
        headingmessage4:'どのメーカーのSmartPhoneより高機能、なのにお手頃なプライス。'
      },
      {
        coverimage: 'assets/img/original.jpg',
        name: 'Phone Pro',
        price: 999,
        description: '5GをProで。暗い場所で撮った写真をつぎのレベルへ引き上げる、Proのカメラシステム。',
        heading1:'飛び抜けた5Gスピード',
        headingmessage1:'どれよりも早く、どれよりも優雅で、どの機種よりも快適。そんなPhone Proです。',
        heading2:'飛び抜けたデザイン',
        headingmessage2:'どんな機種よりも飛び抜けたデザイン。そんなPhone Proです。',
        heading3:'飛び抜けたカメラ',
        headingmessage3:'どの機種のカメラより、誰が撮っても素晴らしいクオリティー。そんなPhone Proです。',
        heading4:'飛び抜けた値段',
        headingmessage4:'どのメーカーのSmartPhoneより高機能、なのにお手頃なプライス。'
      },
      {
        coverimage: 'assets/img/original.jpg',
        name: 'Phone Pro Max',
        price: 1099,
        description: '暗い場所で撮った写真をつぎのレベルへ引き上げる。Phone Pro Maxなら、さらにその上の性能を持つカメラが使えます。',
        heading1:'飛び抜けた5Gスピード',
        headingmessage1:'どれよりも早く、どれよりも優雅で、どの機種よりも快適。そんなPhone Pro Maxです。',
        heading2:'飛び抜けたデザイン',
        headingmessage2:'どんな機種よりも飛び抜けたデザイン。そんなPhone Pro Maxです。',
        heading3:'飛び抜けたカメラ',
        headingmessage3:'どの機種のカメラより、誰が撮っても最高のクオリティー。そんなPhone Pro Maxです。',
        heading4:'飛び抜けた値段',
        headingmessage4:'どのメーカーのSmartPhoneより高機能、なのにお手頃なプライス。'
      }
    ]
  }

  // DBの中身削除と更新
  async initDb(){
    await this.clearnDb();
    this.pushProductsToDb();
  }

  // 非同期でDB中身削除
  async clearnDb(){
    await Product.deleteMany({})
  }

  // forEach文で繰り返し処理を行い、一つ一つのproductを生成するメソッド
  pushProductsToDb(){
    this.products.forEach((product)=>{
        const newProduct = new Product(product);
        newProduct.save();
      });
  }

  // 生成メソッドを呼び出し
  seeDb(){
    this.pushProductsToDb();
  }
}

module.exports = FakeDb;