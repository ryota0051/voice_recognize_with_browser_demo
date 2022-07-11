## これはなに

- ブラウザで音声認識を実施するでもアプリ

## 使用ライブラリ

- vosk-browser: vosk(https://alphacephei.com/vosk/)のブラウザ対応ライブラリ

## 環境構築方法

1. 下記コマンドで docker イメージを作成

   ```
   # docker compose v1の場合
   docker-compose build
   # docker compose v2の場合
   docker compose build
   ```

2. 下記コマンドで bash 経由にて npm パッケージをインストールする

   ```
   docker-compose run --rm react-app bash
   npm install
   ```

3. docker コンテナ起動

   ```
   docker-compose up
   ```

4. `localhost:3000`にアクセスし、初期化完了後に音声認識開始ボタンを押してマイクに話しかける(動作例は、下記)

![demo](demo.gif)
