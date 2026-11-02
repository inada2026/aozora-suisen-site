/* 一番上の写真の吹き出し：女の子の口の位置を写真から計算して、
   吹き出しを顔のまわりに置き、しっぽを必ず口へ向ける。 */
(function(){
  var MOUTH = {x:520/1916, y:242/821};   // 元写真での口の位置（割合）
  var BODY_CX = 548/1916;                 // 女の子の体（髪〜かばん）の真ん中（割合）
  var R_SRC = 55/1916;                    // 顔の半分の幅（割合）
  var fig = document.querySelector('.fv-photo');
  if(!fig) return;
  var img = fig.querySelector('img');
  var says = fig.querySelectorAll('.fv-say');
  // 案B（?fv=b）：見出しの下に、丸い顔＋横長の吹き出しを3つ並べる。写真の吹き出しは出さない
  var CYCLE = false;
  var MODEB = /[?&]fv=b/.test(location.search);
  if(MODEB){ document.documentElement.classList.add('fvb'); }
  says.forEach(function(s){ if(!s.querySelector('.tail')){ var t=document.createElement('span'); t.className='tail'; t.setAttribute('aria-hidden','true'); s.appendChild(t);} });

  function layout(){
    // パソコン：写真の右端を画面の右端（スクロールバーの手前）にそろえる
    if(!window.matchMedia('(max-width:860px)').matches){
      var wr = fig.parentElement.getBoundingClientRect();
      var gap = Math.max(0, document.documentElement.clientWidth - wr.right);
      var want = (-gap) + 'px';
      if(fig.style.marginRight !== want) fig.style.marginRight = want;
    } else { fig.style.marginRight = ''; }
    // 動き（拡大・すべり込み）の影響を受けないよう、transform を無視する offset で測る
    var ir = {left:img.offsetLeft, top:img.offsetTop, width:img.offsetWidth, height:img.offsetHeight};
    var fr = {left:0, top:0, width:fig.offsetWidth, height:fig.offsetHeight};
    if(!ir.width) return;
    // 女の子が枠の真ん中より少し左に来るよう、写真の横位置を決める（体が枠で切れないように）
    var nw0 = img.naturalWidth || 1916, nh0 = img.naturalHeight || 821;
    var dw0 = Math.max(ir.width/nw0, ir.height/nh0)*nw0;
    if(dw0 > ir.width + 1){
      var EXT = Math.max(0, -(parseFloat(getComputedStyle(fig).marginLeft) || 0));   // 左へ広げた分
      var want = window.matchMedia('(max-width:860px)').matches ? 0.42 * ir.width : ir.width - 0.40 * (ir.width - EXT);
      var p = (BODY_CX*dw0 - want) / (dw0 - ir.width);
      p = Math.max(0, Math.min(1, p));
      var cur = getComputedStyle(img).objectPosition.split(' ');
      img.style.objectPosition = (p*100).toFixed(2) + '% ' + (cur[1] || '30%');
    }
    // パソコン：写真の左側だけを透かす。女の子（髪の左端）より手前で必ず不透明にして、女の子に青がかからないようにする
    (function(){
      var cs0 = getComputedStyle(img), pos0 = cs0.objectPosition.split(' ');
      var sc0 = Math.max(ir.width/nw0, ir.height/nh0), dw1 = nw0*sc0;
      var ox0 = (ir.width - dw1) * (parseFloat(pos0[0])/100);
      var girlL = ox0 + (390/1916) * dw1;            // 髪の左端
      if(!window.matchMedia('(max-width:860px)').matches){
        var A = Math.max(120, girlL - 30);
        var m = 'linear-gradient(90deg,transparent 0px,rgba(0,0,0,.12) '+(A*.3)+'px,rgba(0,0,0,.45) '+(A*.6)+'px,rgba(0,0,0,.85) '+(A*.85)+'px,#000 '+A+'px)';
        img.style.webkitMaskImage = m; img.style.maskImage = m;
      } else { img.style.webkitMaskImage = ''; img.style.maskImage = ''; }
    })();
    if(MODEB) return;   // 案Bは写真の位置だけ合わせ、写真の吹き出しは置かない
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
    var figL = fig.parentElement.getBoundingClientRect().right - fr.width + (parseFloat(fig.style.marginRight)||0) * -1;
    var W = Math.min(fr.width, document.documentElement.clientWidth - figL - 8), H = fr.height;   // 画面の右端（スクロールバーの手前）まで
    // 重なってはいけない物：顔（髪を含む）・見出しの各行・無料相談の文とボタン・先に置いた吹き出し
    var fb = fig.getBoundingClientRect();
    function rel(rc){ return {l:rc.left-fb.left, t:rc.top-fb.top, r:rc.right-fb.left, b:rc.bottom-fb.top}; }
    var face = {l:mx-2.3*r, t:my-1.9*r, r:mx+1.4*r, b:my+1.0*r};
    var obst = [];
    var h1 = document.getElementById('fv-title');
    if(h1 && !phone){ var rg = document.createRange(); rg.selectNodeContents(h1); [].forEach.call(rg.getClientRects(), function(lr){ obst.push(rel(lr)); }); }
    if(!phone){ ['.fv-free','.fv .cta-pair .btn'].forEach(function(q){ [].forEach.call(document.querySelectorAll(q), function(e){ obst.push(rel(e.getBoundingClientRect())); }); }); }
    var placed = [];
    function ov(a, b, m){ m = m||0; return Math.max(0, Math.min(a.r+m, b.r) - Math.max(a.l-m, b.l)) * Math.max(0, Math.min(a.b+m, b.b) - Math.max(a.t-m, b.t)); }
    function cost(x, y, w, h){
      var bx = {l:x, t:y, r:x+w, b:y+h}, c = 0;
      c += ov(bx, face, 6) * 100;                                   // 顔は絶対に隠さない
      obst.forEach(function(o){ c += ov(bx, o, 10) * 20; });
      placed.forEach(function(o){ c += ov(bx, o, 8) * 20; });
      if(y < 4) c += (4 - y) * w * 5; if(y + h > H - 4) c += (y + h - H + 4) * w * 5;
      if(x + w > W - 4) c += (x + w - W + 4) * h * 5;
      if(phone && x < 6) c += (6 - x) * h * 5;
      return c;
    }
    says.forEach(function(s, i0){
      var i = CYCLE ? (phone ? 0 : 1) : i0;
      var w = s.offsetWidth, h = s.offsetHeight, x, y;
      var C = !phone ? [
        // 頭の上 → 頭の右上
        [[mx + 0.3*r - w/2, my - 1.9*r - 16 - h], [mx + 0.9*r, my - 1.9*r - 16 - h], [mx - 0.6*r - w/2, my - 1.9*r - 16 - h]],
        // 顔の右 → 右下
        [[mx + 1.4*r + 30, my - 0.3*r - h/2], [mx + 1.4*r + 30, my + 0.9*r], [mx + 1.4*r + 30, my - 1.6*r - h/2]],
        // 顔の左横（少し離す） → あごの左 → 肩の左下 → 右下
        [[mx - 2.3*r - 34 - w, my - 0.4*r - h/2], [mx - 2.3*r - 24 - w, my + 1.0*r], [mx - 1.2*r - w, my + 1.8*r], [mx - 0.6*r - w, my + 2.6*r], [mx + 1.4*r + 30, my + 2.4*r]]
      ][i] : [
        [[mx + 2.6*r + 10, my - 3.2*r - h/2], [mx + 1.8*r + 10, my - 2.2*r - h], [mx - 2.6*r - w, my - 3.2*r - h/2]],
        [[mx - 1.6*r - w, my + 2.6*r], [mx - 2.6*r - w, my + 1.4*r], [mx - 1.0*r - w, my + 3.4*r]],
        [[mx + 2.6*r + 10, my + 1.8*r], [mx + 1.8*r + 10, my + 3.0*r], [mx + 2.6*r + 10, my + 0.4*r]]
      ][i];
      var best = null;
      C.forEach(function(c){
        var cx0 = c[0], cy0 = c[1];
        if(phone){ cx0 = Math.max(6, Math.min(cx0, W - w - 6)); cy0 = Math.max(6, Math.min(cy0, H - h - 6)); }
        else { cx0 = Math.min(cx0, W - w - 4); cy0 = Math.max(4, Math.min(cy0, H - h - 4)); }
        var k = cost(cx0, cy0, w, h);
        if(!best || k < best.k - 0.5) best = {x:cx0, y:cy0, k:k};
      });
      x = best.x; y = best.y;
      // 画面の右端からはみ出す分だけ左へ戻す（実際の表示位置で測る）
      var vr = document.documentElement.clientWidth - 8, fl = fig.getBoundingClientRect().left;
      if(fl + x + w > vr) x = Math.max(4, vr - fl - w);
      placed.push({l:x, t:y, r:x+w, b:y+h});
      s.style.left = x + 'px'; s.style.top = y + 'px'; s.style.right = 'auto';
      // しっぽ：吹き出しの縁で口にいちばん近い点に置き、口の方へ回す
      var t = s.querySelector('.tail'), pad = 16;
      var cx = Math.max(x+pad, Math.min(mx, x+w-pad)), cy = Math.max(y+pad, Math.min(my, y+h-pad));
      var dx = mx-cx, dy = my-cy;
      // 縁へ寄せる（内側の点を、口に近い方の辺へ）
      if(Math.abs(dx) > Math.abs(dy)) cx = dx>0 ? x+w : x; else cy = dy>0 ? y+h : y;
      var ang = Math.atan2(my-cy, mx-cx)*180/Math.PI;
      var dist = Math.hypot(mx-cx, my-cy);
      var L = phone ? 14 : (i===2 ? 40 : 24);
      L = Math.min(L, Math.max(8, dist - (phone ? 10 : 22)));   // 顔に刺さらない長さ
      var back = 5, rad = ang*Math.PI/180;                       // 付け根を吹き出しの内側へ少し入れる
      t.style.width = (L + back) + 'px';
      t.style.left = (cx - x - back*Math.cos(rad)) + 'px'; t.style.top = (cy - y - back*Math.sin(rad)) + 'px';
      t.style.transform = 'translateY(-50%) rotate(' + ang + 'deg)';
      s.style.transformOrigin = (cx - x) + 'px ' + (cy - y) + 'px';
    });
  }
  layout(); img.addEventListener('load', layout);
  [100,400,900,1600,3000].forEach(function(ms){ setTimeout(layout, ms); });
  window.addEventListener('resize', layout);
  if(window.ResizeObserver){ new ResizeObserver(function(){ layout(); }).observe(fig); }
  window.addEventListener('load', layout);
  if(document.fonts && document.fonts.ready) document.fonts.ready.then(layout);
})();
