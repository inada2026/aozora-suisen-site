> **2026-11-05 夜：VibeBoxへの引っ越しは取りやめ。** VibeBoxは公開先が 〜.inadog-ai.com になり、無料枠3MBにも入らない（サイトは約9MB）。当面は今の workers.dev の住所のまま、出すのは Windows 側だけ。Mac 側は push まで。本番は suisen.sakubuncafe.com（Xserver）へ、眞野先生のOKとログイン情報が揃ってから。以下は記録として残す。

# あおぞら作文教室 都立推薦サイト — VibeBoxへの引っ越し（2026-11-05 夕方版）

最初にこのファイルを全部読んでから作業してください。

## これは何か
- あおぞら作文教室（眞野玲子先生）の「都立高校推薦入試対策クラス」のサイト。制作・管理は株式会社inadog（稲田）。
- このリポジトリ（`inada2026/aozora-suisen-site` の **`renewal-2026-10-31` ブランチ**）の中身が、今いちばん新しい完成形そのもの（静的HTML・CSS・JS・画像）。ビルドは不要。
- 今の公開URL：https://aozora-cafe-suisen.site-v6.workers.dev/ （11/5夕方にWindowsから wrangler で正式公開。検索にも出し始めた。眞野先生・LINE・YouTubeの説明欄からもこのURLに来る）
- **このURLは変えてはいけない**。URLは「サイトの名前（aozora-cafe-suisen）」と「inadogのCloudflareのアカウント（site-v6）」の2つで決まる。VibeBoxから出すときも、出し先を inadog の Cloudflare アカウント、Worker の名前を aozora-cafe-suisen にすれば同じURLのまま入れ替わる。どちらかが違うと別のURLになるので、出す前に必ず確かめる
- 10/24に作った古い引っ越しパック（Windows `R:\ClaudeCode_inada\vibebox-hikkoshi\aozora-suisen-site\`、10/20版）は**古いので使わない**。

## やってほしいこと（作り直さず「移す」）
1. 見た目・文章・構成を**変えずに**、VibeBoxのプロジェクトとして載せる。ファイル名・フォルダ名もそのまま。
2. 公開先は inadog の Cloudflare。できれば今と同じ名前 **`aozora-cafe-suisen`**（URLが変わらないように）。同じ名前にできない場合は、新しいURLを稲田さんに伝える。
3. 公開範囲は **一般**（誰でも開ける）。眞野先生がログインなしで開けること。
4. **検索の設定は今のまま**。2026-11-05に正式公開した（眞野先生「公開しちゃってください」）。index・gakko・junbi・soudan は検索に出す。kouza・index-old・edogawa・joto・kohoku・theme4・zoom1029/・404 は noindex のまま。robots.txt は今の中身（Allow: / ＋ Disallow: /kakunin/ /zoom1029/ /kouza.html /index-old.html）のまま変えない。
5. 公開するのはサイトのファイルだけ。**この `VIBEBOX_START.md` と `.git` は公開しない**。
6. 載せたら、スマホ幅（390px）とPC幅（1280px）で `index.html` `gakko.html` `junbi.html` `soudan.html` を開き、横はみ出し・画像欠落・リンク切れが無いか見る。トップの料金の所で、横棒グラフが伸びること（画面に入ったとき）も見る。

## 引っ越したあとの決まり
- **直しはVibeBoxからだけ出す。** Windowsから wrangler で直接出すのはやめる（両方から出すと片方の直しが消える）。
- 正本はこのGitHubのブランチ。Windows側のClaudeが手伝うときも、ここを直してpushし、出すのはVibeBox側。

## ページの中身（参考）
- `index.html` トップ（推薦対策クラスの案内・料金・講師・FAQ）。料金の下に「塾代くらべ」の横棒グラフと「都立と私立、毎年かかるお金」（11/5追加）
- `gakko.html` 学校と費用／`junbi.html` 準備と支援／`soudan.html` 無料相談の予約／`404.html`
- `kouza.html` 受講生のページ、`edogawa.html` `joto.html` `kohoku.html` `theme4.html` 学校別の作文の原文、`zoom1029/`・`kakunin/` も含め、メニューに出ていないページも消さずにそのまま移す（URLを渡して使っているものがある）
- `index-old.html` 10/31より前のトップ（念のため残している）

## 変えてはいけないこと／書いてはいけないこと
- 文章・料金・写真・講師の紹介を勝手に直さない。合格実績・お客様の声・先生の経歴・数字を創作しない。
- LINEは推薦専用の `https://line.me/R/ti/p/@325uugff`。旧アカウントに戻さない。
- 無料相談の予約は HubSpot（`meetings-na2.hubspot.com/mano2/muryoumano30`）。確認中に実際の予約を入れない。
- 講師の「R・N」先生は、眞野先生の指示でイニシャル表記（11/4）。名前に戻さない。

## 未確定（勝手に埋めない）
- 正式公開のドメイン（sakubuncafe.com の下にするか等）と公開日。眞野先生のOKのあとで稲田さんが決める。
