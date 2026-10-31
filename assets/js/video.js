// サムネイルを押したら、その話が始まる秒数から再生する
document.querySelectorAll('.video-facade').forEach(function(b){
  b.addEventListener('click',function(){
    // パソコンの中のファイルとして開いたときは、YouTubeが埋め込みを断る（エラー153）ので、YouTubeを別のタブで開く
    if(location.protocol==='file:'){window.open('https://www.youtube.com/watch?v='+b.dataset.id+'&t='+b.dataset.start+'s','_blank','noopener');return;}
    var f=document.createElement('iframe');
    f.src='https://www.youtube-nocookie.com/embed/'+b.dataset.id+'?start='+b.dataset.start+'&autoplay=1&rel=0';
    f.title=b.getAttribute('aria-label');
    f.allow='accelerometer;autoplay;clipboard-write;encrypted-media;gyroscope;picture-in-picture;web-share';
    f.allowFullscreen=true;
    f.referrerPolicy='strict-origin-when-cross-origin';
    f.style.cssText='position:absolute;inset:0;width:100%;height:100%;border:0';
    b.replaceWith(f);
  });
});
