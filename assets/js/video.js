// サムネイルを押したら、その話が始まる秒数から再生する
// 字幕は出さない（見る人のYouTubeの設定で自動の字幕がオンになっていても、再生が始まったら外す）
var ytReady = null;
function loadYT() {
  if (ytReady) return ytReady;
  ytReady = new Promise(function (resolve) {
    if (window.YT && window.YT.Player) { resolve(); return; }
    var prev = window.onYouTubeIframeAPIReady;
    window.onYouTubeIframeAPIReady = function () { if (prev) prev(); resolve(); };
    var s = document.createElement('script');
    s.src = 'https://www.youtube.com/iframe_api';
    document.head.appendChild(s);
  });
  return ytReady;
}
function captionsOff(p) {
  try { p.unloadModule('captions'); } catch (e) {}
  try { p.unloadModule('cc'); } catch (e) {}
}
document.querySelectorAll('.video-facade').forEach(function (b) {
  b.addEventListener('click', function () {
    // パソコンの中のファイルとして開いたときは、YouTubeが埋め込みを断る（エラー153）ので、YouTubeを別のタブで開く
    if (location.protocol === 'file:') { window.open('https://www.youtube.com/watch?v=' + b.dataset.id + '&t=' + b.dataset.start + 's', '_blank', 'noopener'); return; }
    var box = document.createElement('div');
    box.style.cssText = 'position:absolute;inset:0;width:100%;height:100%';
    var label = b.getAttribute('aria-label');
    b.replaceWith(box);
    loadYT().then(function () {
      var p = new YT.Player(box, {
        host: 'https://www.youtube-nocookie.com',
        videoId: b.dataset.id,
        width: '100%', height: '100%',
        playerVars: { start: +b.dataset.start, autoplay: 1, rel: 0, cc_load_policy: 0, playsinline: 1 },
        events: {
          onReady: function (e) { captionsOff(e.target); e.target.playVideo(); },
          onApiChange: function (e) { captionsOff(e.target); },
          onStateChange: function (e) { if (e.data === 1) captionsOff(e.target); }
        }
      });
      var f = p.getIframe && p.getIframe();
      if (f) { f.title = label; f.style.cssText = 'position:absolute;inset:0;width:100%;height:100%;border:0'; }
    });
  });
});
