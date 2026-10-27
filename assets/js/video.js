// サムネイルを押したら、その話が始まる秒数から再生する
document.querySelectorAll('.video-facade').forEach(function(b){
  b.addEventListener('click',function(){
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
