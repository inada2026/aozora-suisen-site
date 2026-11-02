/* 一番上の写真の吹き出し：女の子の口の位置を写真から計算して、
   吹き出しを顔のまわりに置き、しっぽを必ず口へ向ける。 */
(function(){
  var MOUTH = {x:520/1916, y:242/821};   // 元写真での口の位置（割合）
  var R_SRC = 55/1916;                    // 顔の半分の幅（割合）
  var fig = document.querySelector('.fv-photo');
  if(!fig) return;
  var img = fig.querySelector('img');
  var says = fig.querySelectorAll('.fv-say');
  var CYCLE = /[?&]fv=b/.test(location.search);
  if(CYCLE){ fig.querySelector('.fv-says').classList.add('cycle'); }
  says.forEach(function(s){ if(!s.querySelector('.tail')){ var t=document.createElement('span'); t.className='tail'; t.setAttribute('aria-hidden','true'); s.appendChild(t);} });

  function layout(){
    // 動き（拡大・すべり込み）の影響を受けないよう、transform を無視する offset で測る
    var ir = {left:img.offsetLeft, top:img.offsetTop, width:img.offsetWidth, height:img.offsetHeight};
    var fr = {left:0, top:0, width:fig.offsetWidth, height:fig.offsetHeight};
    if(!ir.width) return;
    var cs = getComputedStyle(img);
    var nw = img.naturalWidth || 1916, nh = img.naturalHeight || 821;
    var sc = Math.max(ir.width/nw, ir.height/nh), dw = nw*sc, dh = nh*sc;
    var pos = cs.objectPosition.split(' ');
    var px = parseFloat(pos[0])/100, py = parseFloat(pos[1]||'50')/100;
    var ox = (ir.width-dw)*px, oy = (ir.height-dh)*py;
    var mx = ir.left - fr.left + ox + MOUTH.x*dw;
    var my = ir.top - fr.top + oy + MOUTH.y*dh;
    var r = R_SRC*dw;
    var phone = window.matchMedia('(max-width:860px)').matches;
    var W = fr.width, H = fr.height;
    says.forEach(function(s, i0){
      var i = CYCLE ? (phone ? 0 : 1) : i0;
      var w = s.offsetWidth, h = s.offsetHeight, x, y;
      if(!phone){
        if(i===0){ x = mx + 0.3*r - w/2; y = my - 1.75*r - 18 - h; }      // 頭の上
        else if(i===1){ x = mx + 1.8*r + 26; y = my - 0.3*r - h/2; }      // 顔の右
        else { x = mx - 1.4*r - w; y = my + 1.1*r; }                      // あごの左下
        x = Math.min(x, W - w - 4); y = Math.max(y, 4);
      } else {
        if(i===0){ x = mx + 1.6*r + 12; y = my - 2.2*r - h/2 + 6; }        // 頭の右上
        else if(i===1){ x = mx - 1.6*r - w; y = my + 2.6*r; }             // 左下
        else { x = mx + 2.2*r + 12; y = my + 1.6*r; }                     // 右下
        x = Math.max(6, Math.min(x, W - w - 6)); y = Math.max(6, Math.min(y, H - h - 6));
      }
      s.style.left = x + 'px'; s.style.top = y + 'px'; s.style.right = 'auto';
      // しっぽ：吹き出しの縁で口にいちばん近い点に置き、口の方へ回す
      var t = s.querySelector('.tail'), pad = 16;
      var cx = Math.max(x+pad, Math.min(mx, x+w-pad)), cy = Math.max(y+pad, Math.min(my, y+h-pad));
      var dx = mx-cx, dy = my-cy;
      // 縁へ寄せる（内側の点を、口に近い方の辺へ）
      if(Math.abs(dx) > Math.abs(dy)) cx = dx>0 ? x+w : x; else cy = dy>0 ? y+h : y;
      var ang = Math.atan2(my-cy, mx-cx)*180/Math.PI;
      t.style.left = (cx - x) + 'px'; t.style.top = (cy - y) + 'px';
      t.style.transform = 'translate(-50%,-50%) rotate(' + (ang-45) + 'deg)';
      s.style.transformOrigin = (cx - x) + 'px ' + (cy - y) + 'px';
    });
  }
  layout(); img.addEventListener('load', layout);
  if(CYCLE){
    var k = 0; says[0].classList.add('on');
    setInterval(function(){ says[k].classList.remove('on'); k = (k+1) % says.length; says[k].classList.add('on'); }, 3200);
  }
  [100,400,900,1600,3000].forEach(function(ms){ setTimeout(layout, ms); });
  window.addEventListener('resize', layout);
  window.addEventListener('load', layout);
  if(document.fonts && document.fonts.ready) document.fonts.ready.then(layout);
})();
