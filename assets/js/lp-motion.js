// トップの動き：開いたら見出しが一行ずつ出て、写真がすべり込む。下へ読み進めると、ブロックが順番に入ってくる
// 「動きを減らす」設定の人には何もしない
(function () {
  if (!('IntersectionObserver' in window) || matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  var root = document.documentElement;
  root.classList.add('motion');

  // 最初の画面：見出しを<br>ごとに分けて、一行ずつ出す
  var h1 = document.querySelector('.fv h1');
  if (h1) {
    var parts = h1.innerHTML.split(/<br\s*\/?>/i);
    h1.innerHTML = parts.map(function (p, i) {
      return '<span class="fv-line" style="--d:' + (150 + i * 180) + 'ms">' + p + '</span>';
    }).join('');
  }
  var base = 150 + (h1 ? h1.children.length : 0) * 180;
  document.querySelectorAll('.fv-tags li, .fv-free, .fv .cta-pair, .fv-lead').forEach(function (el, i) {
    el.classList.add('fv-in');
    el.style.setProperty('--d', (base + i * 140) + 'ms');
  });

  // 読み進めたときの動き（どれを、どちらから、何番目に）
  var rules = [
    ['.worries h2, .about h2, .changes h2, .reasons h2, .price h2, .curri h2, .qa-videos h2, .teacher h2, .faq h2, .closing h2, #flow-title', 'up'],
    ['.case', 'up', 160],
    ['.turn .wrap > div', 'left'],
    ['.turn .wrap > figure', 'right'],
    ['.about li', 'left', 140],
    ['.band-grid > div', 'left'],
    ['.ring', 'spin'],
    ['.checks li', 'left', 110],
    ['.reason:nth-child(odd of .reason) .reason-media', 'left'],
    ['.reason:nth-child(even of .reason) .reason-media', 'right'],
    ['.reason > div:not(.reason-media)', 'up', 0, 150],
    ['.plan', 'up', 150],
    ['.loan', 'up'],
    ['.curri-box', 'pop'],
    ['.flow li', 'up', 150],
    ['.event-date', 'pop'],
    ['.event .wrap > div', 'right'],
    ['.qa-videos figure', 'up', 130],
    ['.teacher-main .face', 'pop'],
    ['.teacher-main > div:not(.face)', 'right'],
    ['.faq details', 'up', 80],
    ['.safety', 'up'],
    ['.closing .cta-pair', 'pop']
  ];
  var seen = new Set();
  rules.forEach(function (r) {
    var list;
    try { list = document.querySelectorAll(r[0]); } catch (e) { return; }
    list.forEach(function (el, i) {
      if (seen.has(el)) return;
      seen.add(el);
      el.setAttribute('data-anim', r[1]);
      var step = r[2] || 0, offset = r[3] || 0;
      // 同じ並びの中で何番目か（行が変わったら最初から数え直す）
      var k = 0, s = el.previousElementSibling;
      while (s && step) { if (s.matches(r[0])) k++; s = s.previousElementSibling; }
      el.style.setProperty('--d', (offset + k * step) + 'ms');
    });
  });
  // 前からある .reveal も同じ仕組みで出す
  document.querySelectorAll('.reveal:not([data-anim])').forEach(function (el) { el.setAttribute('data-anim', 'up'); });

  var io = new IntersectionObserver(function (es) {
    es.forEach(function (e) {
      if (!e.isIntersecting) return;
      e.target.classList.add('is-in');
      io.unobserve(e.target);
    });
  }, { rootMargin: '0px 0px -10% 0px', threshold: 0.15 });
  document.querySelectorAll('[data-anim], .mark').forEach(function (el) { io.observe(el); });

  // 数字を0から数え上げる（30年・16年・3,000名超）
  var nums = document.querySelectorAll('.fv-numbers b, .big-num');
  var nio = new IntersectionObserver(function (es) {
    es.forEach(function (e) {
      if (!e.isIntersecting) return;
      nio.unobserve(e.target);
      var node = e.target.firstChild;
      if (!node || node.nodeType !== 3) return;
      var m = node.nodeValue.match(/^([\d,]+)(.*)$/);
      if (!m) return;
      var end = parseInt(m[1].replace(/,/g, ''), 10), rest = m[2], comma = m[1].indexOf(',') >= 0;
      var t0 = null, dur = 1400;
      function tick(t) {
        if (!t0) t0 = t;
        var p = Math.min(1, (t - t0) / dur), v = Math.round(end * (1 - Math.pow(1 - p, 3)));
        node.nodeValue = (comma ? v.toLocaleString('ja-JP') : v) + rest;
        if (p < 1) requestAnimationFrame(tick);
      }
      requestAnimationFrame(tick);
    });
  }, { threshold: 0.6 });
  nums.forEach(function (el) { nio.observe(el); });
})();
