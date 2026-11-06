# MacのClaudeからWindowsのClaudeへの報告（2026-11-06 18:20）

MAC_SHIJISHO.md のとおり、推薦サイトを VibeBox から https://aozora-suisen.com/ で出しました。

## 開いたアドレス
- https://aozora-suisen.com/ （本番）
- https://www.aozora-suisen.com/ （同じサイト。転送ではなく同じ中身を返す）
- https://suisen.aozora-suisen.com/ （VibeBox が作った裏の住所。VibeBox の画面ではサブドメインなしの app を作れないため）

## VibeBox と Cloudflare の名前
- アドレス：aozora-suisen.com を inadog の Cloudflare で購入（1年 $11.17、自動更新オン、2027-11-06 まで）
- VibeBox の project：aozora-suisen（ドメイン aozora-suisen.com、環境名 aozora。inadog project が dev を使っているため別名にした）
- VibeBox の app：app-desktop-suisen（公開範囲 public）
- Cloudflare 上の Worker 名：vibe-box-aozora-app-desktop-suisen
- つなぎ方：suisen.aozora-suisen.com/* は VibeBox が入れた Route。aozora-suisen.com と www.aozora-suisen.com は、Cloudflare の画面で Custom Domain として足した
- 中身：このブランチの d9e7d0d。VibeBox の Deploy は wrangler.toml を上書きして [assets] が効かないため、サイトのファイルを app の src/site/ に取り込み、Worker から返している（VibeBox の workspace の commit 3f1634b）

## 確かめた結果
- 公開したファイル 103 個すべてを https://aozora-suisen.com/ から取り、このブランチのファイルと1バイトずつ比べて全部同じ
- タイトル「都立高校推薦入試対策クラス｜あおぞら作文教室」、200 で開く
- robots.txt は今までと同じ中身（Allow: / ＋ Disallow: /kakunin/ /zoom1029/ /kouza.html /index-old.html）
- index・gakko・junbi・soudan に robots の meta なし（検索に出る）、kouza などは noindex,nofollow のまま
- VIBEBOX_START.md・MAC_SHIJISHO.md・MAC_HOUKOKU.md・.nojekyll は 404（公開していない）
- URL の扱いは前の workers.dev と同じ：/gakko で gakko.html が開き、/gakko.html は /gakko へ 307、/zoom1029 は /zoom1029/ へ 307。ないページは 404.html を 404 で返す（前は空の 404 だった）

## まだのこと・困ったこと
- スマホ幅（390px）とPC幅（1280px）で画面を見る確認は、Mac 側ではできていない（画面を撮る道具がつながっていない）。中身はファイル単位で元と同じなので、見た目も workers.dev と同じはず。念のため、そちらか稲田さんのスマホで4ページを見てください
- 4ページの canonical は、まだ https://aozora-cafe-suisen.site-v6.workers.dev/… のまま（文章を直さない決まりなので触っていない）。workers.dev から新しい住所へ飛ばすなら、canonical も https://aozora-suisen.com/… に直すのがよい。直したらこのブランチに push してもらえれば、Mac 側で取り込んで VibeBox から出す
- VibeBox の中の AI は、許可の確認が多すぎて止めた。今回の取り込みは Mac の Claude Code が直接 workspace に書いた
- VibeBox の Deploy は Worker の Route を毎回入れ直すが、Custom Domain（aozora-suisen.com・www）には触らない作りであることを wrangler のコードで確かめた

## 次に Windows 側でやること
- 今の https://aozora-cafe-suisen.site-v6.workers.dev/ を、全ページ新しい住所へ自動で飛ばす（MAC_SHIJISHO.md のとおり Windows 側の作業）
