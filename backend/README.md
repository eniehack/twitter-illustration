# twitter-illustration/backend

## 環境変数

```bash
PORT=3030
TWITTER_BEARER_TOKEN=<BEARER_TOKEN>
```

## データ例

`data/works.json`

```json
[
  {
    "title": "ぼっち・ざ・ろっく！",
    "alias": ["ぼざろ"],
    "characters": ["後藤ひとり", "喜多郁代", "伊知地虹夏", "山田リョウ", "伊知地星歌", "廣井きくり"]
  },
  {
    "title": "まちカドまぞく",
    "alias": ["まぞく"],
    "characters": ["吉田優子", "千代田桃", "陽夏木ミカン"]
  },
  {
    "title": "やはり俺の青春ラブコメはまちがっている。",
    "alias": "俺ガイル",
    "characters": ["雪ノ下雪乃", "由比ヶ浜由比", "一色いろは", "平塚静"]
  },
  { "title": "C101", "characters": ["金曜日", "土曜日"] }
]
```

`data/common-tag.json`

```json
["公式", "創作", "二次創作", "R18", "漫画"]
```

## スクリプト

ツイートを一括で追加する（API Rate limit に注意）

```bash
# ["id", "id", ...] の形で JSON ファイルを指定
npx ts-node tools/register-tweets.ts <json>
```
