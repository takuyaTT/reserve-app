# reserve-app

## 開発環境
### PC
MacBook Pro M1

### フロントエンド
Angular

### バックエンド
Node.js

### DB
MongoDB

## バージョン
* Angular
Angular CLI: 11.0.5  
@angular-devkit/architect:0.1100.5 (cli-only)  
@angular-devkit/core:11.0.5 (cli-only)  
@angular-devkit/schematics:11.0.5 (cli-only)  
@schematics/angular:11.0.5 (cli-only)  
@schematics/update:0.1100.5 (cli-only)  

* node  
14.15.3  

* npm  
6.14.9

## 実行確認方法(ローカル)
1. npm installを実行  
2. serverディレクトリに**config/dev.js**を作成
3. dev.jsにMongoDBの**URI**と**SECRET(ハッシュ)**を設定
4. ルートディレクトリで**npm run start-dev**を実行
5. serverディレクトリで**node index.js**を実行
6. localhost:4200でアクセス
