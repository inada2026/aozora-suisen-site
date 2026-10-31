// 確認用：眞野さんに見ていただきたい所に赤い枠と入力欄を出す（本番の公開では、このファイルを外す）
(function () {
  // ?kakunin=1 を付けて開いたときだけ出す（付けないURLは、ふつうのページ）
  if (!/[?&]kakunin=1/.test(location.search)) return;
  var ITEMS = [
    { id: 'k01', at: '.fv', how: 'after', title: '一番上の見出しと、白い帯の言葉',
      ask: '「自分には何もない」と言うお子さんにも／推薦の材料は毎日の中にあります／書く前に話すから、書くことが見つかる。眞野さんならどう言いますか？' },
    { id: 'k02', at: '.fv', how: 'after', title: '一番上の女の子の写真',
      ask: 'いまはAIで作ったイメージの絵です。使ってよい写真（教室や、生徒さんの後ろ姿など）があれば教えてください。' },
    { id: 'k04', at: '.cases', how: 'after', title: '悩み3つの下の説明',
      ask: '「 」の中は総合サイトの講座案内の言葉です。下の説明文はこちらで書きました。眞野さんの言い方に直すなら？' },
    { id: 'k05', at: '.band-grid', how: 'after', title: '「教室がすること」の説明と3つの輪',
      ask: 'こちらで書いた説明と図です。授業の進め方として合っていますか？' },
    { id: 'k06', at: '#reasons .reason:nth-of-type(1)', how: 'after', title: '選ばれる理由1「書く前に、話す」',
      ask: '説明文はこちらで書きました。写真は総合サイトの推薦クラスの写真です。載せて大丈夫ですか？' },
    { id: 'k07', at: '#reasons .reason:nth-of-type(2)', how: 'after', title: '選ばれる理由2の説明文',
      ask: 'こちらで書いた説明です。直したいところがあれば。' },
    { id: 'k08', at: '#reasons .reason:nth-of-type(4)', how: 'after', title: '選ばれる理由4（親子では話しにくいことも）',
      ask: '説明文はこちらで書きました。動画は読書感想文の回の一部です。推薦のページに使って大丈夫ですか？' },
    { id: 'k15', at: '#price .howto', how: 'after', title: '推薦クラスを受けられる教室',
      ask: 'チラシと料金のところには「五反野本校・アルーク阿佐ヶ谷校」とあり、講師紹介には北千住・成城学園前も出てきます。推薦クラスは、どの教室で受けられますか？' },
    { id: 'k09', at: '#price .plans4', how: 'after', title: '料金',
      ask: '総合サイトにある今年度のチラシの料金です。チラシを直している途中と伺いました。値段は変わりますか？' },
    { id: 'k16', at: '.howbook', how: 'after', title: '予約画面のアイコン（左上の「M」）',
      ask: '予約画面の左上のアイコンが「M」の1文字になっています。実際にZoomでお話を伺う眞野さんの顔写真（このページでも使っている写真）にした方が、「この人と話すんだ」と安心して予約していただけると思います。HubSpotの設定で変えられるようなのですが、こちらでは触れないので、お願いできますか？扇塚さんにお願いするのがよければ、そのようにおっしゃってください。' },
    { id: 'k10', at: '.qa-videos .grid', how: 'after', title: '動画4本の質問の書き方',
      ask: '動画の中の質問をもとに書きました。言い方を直したいところがあれば。' },
    { id: 'k11', at: '.teacher-main', how: 'after', title: '先生の紹介',
      ask: '総合サイトと研修のページから書きました。研修のページには「作文講師歴16年」と「13年以上の生徒指導経験」の両方があります。どちらが正しいですか？ほかに直したいところも。' },
    { id: 'k12', at: '#faq .narrow', how: 'append', title: 'よくある質問',
      ask: '質問はこちらで選びました。保護者の方から実際によく聞かれる質問があれば教えてください。' },
    { id: 'k13', at: '.closing .wrap', how: 'append', title: '最後の呼びかけ',
      ask: '「まだ決めていなくても お話を聞かせてください」。眞野さんならどう呼びかけますか？' },
    { id: 'k14', at: '.closing', how: 'after', title: 'ページ全体の長さ',
      ask: '申し込みまで迷わず進めるように、わざと1枚にまとめています。ただ長いので、似ているところは削ったほうが読み疲れしない、という考えもあります。削ってよさそうな所はありますか？このままでもよければ「今のままでいい」を押してください。' }
  ];
  var KEY = 'suisen-kakunin-v1';
  var saved = {};
  try { saved = JSON.parse(localStorage.getItem(KEY) || '{}'); } catch (e) {}
  function save() { try { localStorage.setItem(KEY, JSON.stringify(saved)); } catch (e) {} update(); }

  var css = document.createElement('style');
  css.textContent = [
    '.kk-mark{outline:4px dashed #e00000;outline-offset:6px;border-radius:4px}',
    '.kk-box{position:relative;z-index:3;margin:22px auto;max-width:900px;background:#fff;border:3px solid #e00000;border-radius:10px;padding:16px 18px;color:#1f2a44;text-align:left;font-size:16px;line-height:1.7;box-shadow:0 6px 18px rgba(0,0,0,.12)}',
    '.fv-copy .kk-box{margin:18px 0 0}',
    '.kk-head{display:flex;align-items:center;gap:10px;font-weight:700;margin-bottom:6px}',
    '.kk-no{background:#e00000;color:#fff;border-radius:999px;padding:0 12px;font-size:14px}',
    '.kk-ask{margin:0 0 10px;font-size:15px}',
    '.kk-box textarea{width:100%;min-height:76px;border:2px solid #c8c8c8;border-radius:8px;padding:10px;font:inherit;font-size:16px}',
    '.kk-box textarea:focus{border-color:#f28c00;outline:none}',
    '.kk-btns{display:flex;gap:8px;margin-top:8px;flex-wrap:wrap}',
    '.kk-btns button{font:inherit;font-size:14px;font-weight:700;border-radius:999px;padding:6px 16px;cursor:pointer;border:2px solid #1f2a44;background:#fff;color:#1f2a44}',
    '.kk-btns .kk-ok.on,.kk-btns .kk-done.on{background:#1e7d3a;border-color:#1e7d3a;color:#fff}',
    '.kk-btns .kk-done{background:#f28c00;border-color:#f28c00;color:#fff}',
    '.kk-sub{margin:12px 0 6px;font-size:14px;color:#5b5b5b}',
    '.kk-state{margin:8px 0 0;font-size:14px;font-weight:700;color:#1e7d3a}',
    '.kk-box.kk-fin{border-color:#1e7d3a}',
    '.kk-panel{position:fixed;right:12px;bottom:12px;z-index:30;background:#1f2a44;color:#fff;border-radius:12px;padding:12px 14px;box-shadow:0 8px 24px rgba(0,0,0,.3);font-size:14px;max-width:320px}',
    '.kk-panel b{display:block;font-size:15px;margin-bottom:6px}',
    '.kk-panel a,.kk-panel button{display:block;width:100%;margin-top:6px;text-align:center;font:inherit;font-weight:700;border-radius:999px;padding:8px;cursor:pointer;text-decoration:none;border:0}',
    '.kk-panel .kk-line{background:#06c755;color:#fff}',
    '.kk-panel .kk-copy{background:transparent;color:#fff;font-weight:400;font-size:12px;text-decoration:underline;padding:4px}',
    '.kk-steps{margin:4px 0 6px;padding-left:1.3em;font-size:13px;line-height:1.6}',
    '.kk-steps li{margin:0 0 4px}',
    '.kk-panel .kk-hide{background:transparent;color:#fff;font-weight:700;font-size:14px;padding:6px;border:1px solid rgba(255,255,255,.6)!important}',
    '@media (max-width:860px){.kk-panel{left:8px;right:8px;bottom:78px;max-width:none}}'
  ].join('\n');
  document.head.appendChild(css);

  // 先に全部の場所を見つけてから入れる（入れた枠で順番がずれないように）
  var targets = ITEMS.map(function (it) { return document.querySelector(it.at); });
  ITEMS.forEach(function (it, i) {
    var el = targets[i];
    if (!el) return;
    if (it.how !== 'append') el.classList.add('kk-mark');
    var box = document.createElement('div');
    box.className = 'kk-box';
    box.innerHTML = '<div class="kk-head"><span class="kk-no">確認 ' + (i + 1) + '</span>' + it.title + '</div>' +
      '<p class="kk-ask">' + it.ask + '</p>' +
      '<div class="kk-btns"><button type="button" class="kk-ok">今のままでいい</button></div>' +
      '<p class="kk-sub">直してほしいときは、下に書いてから「書いた内容で直してほしい」を押してください。</p>' +
      '<textarea placeholder="ここをクリックして書いてください。音声入力できます。"></textarea>' +
      '<div class="kk-btns"><button type="button" class="kk-done">書いた内容で直してほしい</button></div>' +
      '<p class="kk-state"></p>';
    var ta = box.querySelector('textarea'), ok = box.querySelector('.kk-ok'), done = box.querySelector('.kk-done'), st = box.querySelector('.kk-state');
    var s = saved[it.id] || {};
    ta.value = s.text || '';
    function paint() {
      var v = saved[it.id] || {};
      box.classList.toggle('kk-fin', !!(v.done || v.ok));
      ok.classList.toggle('on', !!v.ok);
      done.classList.toggle('on', !!v.done);
      if (v.ok) st.textContent = '✓ 回答済み（今のままでいい）。あとからでも変えられます。';
      else if (v.done) st.textContent = '✓ 回答済み（書いた内容で直します）。あとからでも変えられます。';
      else if ((v.text || '').trim()) st.textContent = '書いた内容はこの画面に残っています。書き終わったら「書いた内容で直してほしい」を押してください。';
      else st.textContent = '';
    }
    function put(o) { saved[it.id] = Object.assign({ text: ta.value }, saved[it.id] || {}, o, { text: ta.value }); save(); paint(); }
    ta.addEventListener('input', function () { put({ done: false, ok: false }); });
    done.addEventListener('click', function () { if (!ta.value.trim()) { ta.focus(); st.textContent = '先に答えを入力してください。'; return; } put({ done: true, ok: false }); });
    ok.addEventListener('click', function () { var on = !(saved[it.id] || {}).ok; put({ ok: on, done: false }); });
    paint();
    if (it.how === 'append') el.appendChild(box);
    else { var ref = el._kkLast || el; ref.parentNode.insertBefore(box, ref.nextSibling); el._kkLast = box; }
  });

  var panel = document.createElement('div');
  panel.className = 'kk-panel';
  panel.innerHTML = '<b>確認（<span class="kk-count">0</span>/' + ITEMS.length + ' 回答済み）</b>' +
    '<ol class="kk-steps"><li>赤枠のところをクリックして答えてください。音声入力できます。今のままでよければ「今のままでいい」を、直してほしいときは書いてから「書いた内容で直してほしい」を押してください。</li><li>全部終わったら、下の「答えをLINEで稲田に送る」のボタンを押してください。LINEが開くので、稲田を選んで送ってください。</li><li>この案内が画面を覆って見にくいと思いますので、読み終わったら、いちばん下の「小さくする」を押してください。答えを送るときに、また「開く」で出せます。</li></ol>' +
    '<a class="kk-line" href="#" target="_blank" rel="noopener">答えをLINEで稲田に送る</a>' +
    '<button type="button" class="kk-copy">LINEが開かないときは、ここを押して答えをコピー</button>' +
    '<button type="button" class="kk-hide">小さくする</button>';
  document.body.appendChild(panel);

  function summary() {
    var lines = ['【推薦サイト 眞野さんの確認】'];
    ITEMS.forEach(function (it, i) {
      var s = saved[it.id] || {};
      var v = (s.text || '').trim();
      if (!v && !s.ok) return;
      lines.push('確認' + (i + 1) + '（' + it.title + '）：' + (s.ok ? '今のままでいい' : (v || '')));
    });
    return lines.join('\n');
  }
  function update() {
    var n = ITEMS.filter(function (it) { var s = saved[it.id] || {}; return s.done || s.ok; }).length;
    panel.querySelector('.kk-count').textContent = n;
    panel.querySelector('.kk-line').href = 'https://line.me/R/share?text=' + encodeURIComponent(summary());
  }
  panel.querySelector('.kk-copy').addEventListener('click', function () {
    var t = summary();
    (navigator.clipboard ? navigator.clipboard.writeText(t) : Promise.reject()).then(function () {
      panel.querySelector('.kk-copy').textContent = 'コピーしました。LINEに貼り付けて送ってください';
    }, function () { window.prompt('この文をコピーしてください', t); });
  });
  panel.querySelector('.kk-hide').addEventListener('click', function () {
    var shown = panel.dataset.min !== '1';
    panel.dataset.min = shown ? '1' : '0';
    [].forEach.call(panel.querySelectorAll('.kk-line,.kk-copy'), function (x) { x.style.display = shown ? 'none' : ''; });
    this.textContent = shown ? '開く' : '小さくする';
    var st = panel.querySelector('.kk-steps'); if (st) st.style.display = shown ? 'none' : '';
  });
  update();
})();
