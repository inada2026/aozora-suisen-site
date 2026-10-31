// 動画：こちらで作ったサムネイルを押したら、その話の始まりからすぐ再生する
// しくみ：動画が画面に近づいたら、サムネイルの「下」にYouTubeを先に読み込んでおく。
// サムネイルは押しても下へ素通りする（押した指はYouTubeに直接届く）ので、iPhoneでも1回でその場で再生が始まる。
// 再生が始まったらサムネイルを消す。字幕は出さない。
(function () {
  var facades = [].slice.call(document.querySelectorAll('.video-facade'));
  if (!facades.length) return;

  // パソコンの中のファイルとして開いたときは、YouTubeが埋め込みを断る（エラー153）ので、YouTubeを別のタブで開く
  if (location.protocol === 'file:') {
    facades.forEach(function (b) {
      b.addEventListener('click', function () {
        window.open('https://www.youtube.com/watch?v=' + b.dataset.id + '&t=' + b.dataset.start + 's', '_blank', 'noopener');
      });
    });
    return;
  }

  var apiReady = new Promise(function (resolve) {
    if (window.YT && window.YT.Player) { resolve(); return; }
    var prev = window.onYouTubeIframeAPIReady;
    window.onYouTubeIframeAPIReady = function () { if (prev) prev(); resolve(); };
    var s = document.createElement('script');
    s.src = 'https://www.youtube.com/iframe_api';
    document.head.appendChild(s);
  });

  function captionsOff(p) {
    try { p.unloadModule('captions'); } catch (e) {}
    try { p.unloadModule('cc'); } catch (e) {}
  }

  function prepare(b, playNow) {
    if (b._prepared) return b._prepared;
    var wrap = b.parentNode;
    if (getComputedStyle(wrap).position === 'static') wrap.style.position = 'relative';
    var holder = document.createElement('div');
    holder.style.cssText = 'position:absolute;inset:0;width:100%;height:100%;z-index:0';
    var inner = document.createElement('div');
    holder.appendChild(inner);
    wrap.insertBefore(holder, b);
    // サムネイルはYouTubeの上にかぶせておく
    b.style.position = 'absolute';
    b.style.inset = '0';
    b.style.zIndex = '1';
    b.style.transition = 'opacity .35s';
    b._prepared = apiReady.then(function () {
      return new Promise(function (resolve) {
        var player = new YT.Player(inner, {
          host: 'https://www.youtube-nocookie.com',
          videoId: b.dataset.id,
          width: '100%', height: '100%',
          playerVars: { start: +b.dataset.start, autoplay: playNow ? 1 : 0, rel: 0, cc_load_policy: 0, playsinline: 1, modestbranding: 1 },
          events: {
            onReady: function (e) {
              var f = e.target.getIframe();
              f.title = b.getAttribute('aria-label') || '動画';
              f.style.cssText = 'position:absolute;inset:0;width:100%;height:100%;border:0';
              captionsOff(e.target);
              // 用意ができたら、サムネイルは押しても下のYouTubeに素通りさせる
              b.style.pointerEvents = 'none';
              if (playNow) e.target.playVideo();
              resolve(e.target);
            },
            onApiChange: function (e) { captionsOff(e.target); },
            onStateChange: function (e) {
              if (e.data === 1 || e.data === 3) { // 再生中・読み込み中になったらサムネイルを消す
                captionsOff(e.target);
                b.style.opacity = '0';
                setTimeout(function () { b.style.display = 'none'; }, 400);
              }
            }
          }
        });
      });
    });
    return b._prepared;
  }

  // 画面に近づいたら先に用意する
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (es) {
      es.forEach(function (e) { if (e.isIntersecting) { io.unobserve(e.target); prepare(e.target, false); } });
    }, { rootMargin: '800px 0px' });
    facades.forEach(function (b) { io.observe(b); });
  } else {
    facades.forEach(function (b) { prepare(b, false); });
  }

  // 用意が間に合う前に押されたときは、その場で読み込んで再生する
  facades.forEach(function (b) {
    b.addEventListener('click', function () {
      if (!b._prepared) { prepare(b, true); return; }
      b._prepared.then(function (p) { try { p.playVideo(); } catch (e) {} });
    });
  });
})();
