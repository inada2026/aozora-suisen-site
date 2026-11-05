# あおぞら作文教室 都立推薦サイト — VibeBoxへの引っ越し（2026-11-05版）

最初にこのファイルを全部読んでから作業してください。

## これは何か
- あおぞら作文教室（眞野玲子先生）の「都立高校推薦入試対策クラス」のサイト。制作・管理は株式会社inadog（稲田）。
- このリポジトリ（`inada2026/aozora-suisen-site` の **`renewal-2026-10-31` ブランチ**）の中身が、今いちばん新しい完成形そのもの（静的HTML・CSS・JS・画像）。ビルドは不要。
- 今の確認用URL：https://aozora-cafe-suisen.site-v6.workers.dev/ （Windowsから wrangler で直接出していた。眞野先生はこのURLで見ている）
- 10/24に作った古い引っ越しパック（Windows `R:\ClaudeCode_inada\vibebox-hikkoshi\aozora-suisen-site\`、10/20版）は**古いので使わない**。

## やってほしいこと（作り直さず「移す」）
1. 見た目・文章・構成を**変えずに**、VibeBoxのプロジェクトとして載せる。ファイル名・フォルダ名もそのまま。
2. 公開先は inadog の Cloudflare。できれば今と同じ名前 **`aozora-cafe-suisen`**（URLが変わらないように）。同じ名前にできない場合は、新しいURLを稲田さんに伝える。
3. 公開範囲は **一般**（誰でも開ける）。眞野先生がログインなしで開けること。
4. **検索に載らない設定を残す**（各ページの `noindex,nofollow` と `robots.txt` の `Disallow: /`）。正式公開の指示が出るまで外さない。
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
