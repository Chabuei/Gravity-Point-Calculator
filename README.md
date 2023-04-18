# name
Gravity Point Calculator

## Overview
![image](https://user-images.githubusercontent.com/102859047/232652208-4aa61b17-9b38-4109-8e81-2b9afcc6aa67.jpg)
モーションキャプチャから取得した身体座標と体重を基に、その身体重心を求めるプログラムです

## Requirement
"next": "13.3.0",
"react": "18.2.0",
"react-dom": "18.2.0"

## Usage
ルートディレクトリに入ったらnpm installを実行してnode_modulesを作成してください。作成が完了し次第、npm run devでプロジェクトを実行してください。

## Features
CSVファイルに体の各部位の身体座標が記録されています。そしてそれらを二次元配列に格納、処理したものをReact three fiber(Three.js)で表示しています(算出した重心は水色の軌跡で表示されます)。これらの処理は非常に重いので初期ロードには15-20秒弱の時間がかかります。

## Author
会津大学3年　石田栄心
