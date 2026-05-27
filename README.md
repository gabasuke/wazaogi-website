# Wazaogi Website

石垣島の「鉄板居酒屋 わざおぎ」公式サイトの Next.js 実装です。

## 起動

```bash
npm install
npm run dev
```

ブラウザで `http://127.0.0.1:3000/ja` または `http://127.0.0.1:3000/en` を開いてください。

## 予約 URL の差し替え

`lib/site.ts` の以下を本番 URL に変更してください。

- `line`
- `tabelog`
- `hotpepper`
- `instagram`

## 店舗情報の差し替え

住所、営業時間、電話番号は `lib/site.ts` にまとめています。

## 画像

`public/images/` に軽量な SVG ダミー画像を入れています。実写真に差し替える場合も同じファイル名にするか、`lib/site.ts` と各セクションの `src` を変更してください。
