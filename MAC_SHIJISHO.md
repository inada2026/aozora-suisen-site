# モンスターPC（Windows）のClaudeから、MacBook AirのClaudeへの指示書（2026-11-06）

あなた（MacのClaude Code）の仕事は、稲田さんの横について、あおぞら作文教室の推薦サイトを
**VibeBox から新しいアドレス https://aozora-suisen.com/ で出す**ところまで案内することです。
稲田さんはパソコンの専門用語が苦手です。**1回に1つの操作だけ**、押す場所をはっきり書いて案内してください。返事は日本語で。

## 前提（もう決まっていること。蒸し返さない）
- 眞野先生のOKは出ている（11/5 20:33「新しいアドレス、すごく良いです」）
- アドレスは aozora-suisen.com。inadog の Cloudflare で買う。費用は稲田さんが出す（年1,600円ほど）
- サイトの中身は、このリポジトリ `inada2026/aozora-suisen-site` の `renewal-2026-10-31` ブランチそのもの（約9MB）。**作り直さない・文章を直さない**
- 詳しい決まりは同じフォルダの `VIBEBOX_START.md`（先頭の「2026-11-06（最新）」が今の指示。その下の「Worker名 aozora-cafe-suisen・URLを変えない」は古い）

## 手順

### 1. アドレスを買う（稲田さんが自分で押す）
- MacのChromeで https://dash.cloudflare.com/ → inadog のアカウントで入る
- 左のメニュー「ドメインの登録」（Domain Registration）→「ドメインを登録」→ `aozora-suisen.com` を検索 → 購入
- **支払い・カード入力は稲田さん本人が押す。あなたは代わりに入力しない**
- 買えたら `dig +short NS aozora-suisen.com` で Cloudflare のネームサーバーが出るか確かめる（出るまで数分かかることがある）

### 2. VibeBox で新しい project を作る
- 稲田さんに VibeBox を開いてもらい、新しい project を作るボタンを押してもらう（画面の言葉は稲田さんに読み上げてもらうか、スクリーンショットを貼ってもらう）
- VibeBox の中の会話欄に、次の文を貼ってもらう。**あなたが `pbcopy` でクリップボードに入れてから「貼ってください」と言う**：

```
GitHub の inada2026/aozora-suisen-site を、ブランチ renewal-2026-10-31 で取ってきてください。
最初に VIBEBOX_START.md を全部読み、先頭の「2026-11-06（最新・これに従う）」のとおりに進めてください。
要点：サイトは作り直さず、そのまま全部載せる。出し先は inadog の Cloudflare。
住所は https://aozora-suisen.com/（www も同じ所へ）。今の workers.dev のサイトには触らない。
載せたら、スマホ幅とPC幅でトップ・学校・準備・相談の4ページを確かめて、結果を教えてください。
```

- VibeBox が許可や選択を求めてきたら、稲田さんに意味を一言で説明して押してもらう。公開範囲は「一般（誰でも見られる）」

### 3. 新しいアドレスにつながらなかったとき
- VibeBox が自分のアドレス（〜.inadog-ai.com など）で出しただけで aozora-suisen.com につながらなかったら、Cloudflare の画面でつなぐ：
  「Workers & Pages」→ VibeBox が作ったもの → 「設定」→「ドメインとルート」→「追加」→「カスタムドメイン」→ `aozora-suisen.com`（もう1回 `www.aozora-suisen.com`）
- これも押すのは稲田さん。あなたは押す場所を1つずつ伝える

### 4. 確かめる（あなたがやる）
```
curl -sI https://aozora-suisen.com/ | head -5
curl -s https://aozora-suisen.com/ | grep -o '<title>[^<]*'
curl -s https://aozora-suisen.com/robots.txt
curl -s -o /dev/null -w '%{http_code}\n' https://aozora-suisen.com/VIBEBOX_START.md   # 404 であること
```
- 200 で開く・タイトルが推薦対策クラスのもの・robots.txt が VIBEBOX_START.md に書いた中身・説明書が公開されていない、の4つ

### 5. Windows側へ返す
- 結果を `MAC_HOUKOKU.md` にまとめ（開いたアドレス・VibeBox の project 名・Cloudflare 上の名前・確かめた結果・困ったこと）、このブランチに commit して push する（`-q` は付けない。push 後に `git fetch` して origin と同じハッシュか確かめる）
- 稲田さんには「Windowsの方に『Macが終わった』と伝えてください」と言う。今のアドレス（workers.dev）を新しいアドレスへ自動で飛ばすのは Windows 側がやる

## やってはいけないこと
- 今の https://aozora-cafe-suisen.site-v6.workers.dev/ を消す・止める・上書きする（眞野先生のLINEやYouTubeから来ている）
- Mac から wrangler で直接出す（出すのは VibeBox だけ）
- 文章・料金・写真・合格実績を直す。眞野先生や大西さんに連絡する
- 稲田さんの代わりに支払い・パスワードを入力する
